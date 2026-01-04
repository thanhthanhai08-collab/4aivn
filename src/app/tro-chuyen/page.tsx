// src/app/chat/page.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import type { ChatMessage } from "@/lib/types";
import { AppLayout } from "@/components/layout/app-layout";
import { useToast } from "@/hooks/use-toast";
import { Plus, MessageSquare, History, Loader2 } from "lucide-react";
import { db, auth } from "@/lib/firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import { 
  collection, query, orderBy, getDocs, limit, 
  writeBatch, doc 
} from "firebase/firestore";

/**
 * Helper: Chuyển file sang Base64
 */
const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function ChatPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [historySessions, setHistorySessions] = useState<{ id: string; lastMsg: string }[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const { toast } = useToast();
  const isInitialMount = useRef(true);

  // --- LOGIC 1: MERGE HỢP NHẤT LỊCH SỬ ---
  const mergeHistory = async (anonId: string, realUid: string) => {
    try {
      const anonMsgsRef = collection(db, "chatbot", anonId, "messages");
      const snapshot = await getDocs(anonMsgsRef);

      if (snapshot.empty) return;

      const batch = writeBatch(db);
      const realMsgsRef = collection(db, "chatbot", realUid, "messages");

      snapshot.docs.forEach((oldDoc) => {
        const data = oldDoc.data();
        const newDocRef = doc(realMsgsRef);
        batch.set(newDocRef, {
          ...data,
          mergedFrom: anonId,
          createdAt: data.createdAt,
        });
      });

      await batch.commit();
      localStorage.removeItem("anonymous_chat_id");
      
      toast({ title: "Đã đồng bộ lịch sử chat vào tài khoản của bạn." });
    } catch (e) {
      console.error("Lỗi Merge:", e);
    }
  };

  // --- LOGIC 2: THEO DÕI AUTH & USERID ---
  useEffect(() => {
    setIsMounted(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const anonId = localStorage.getItem("anonymous_chat_id");

      if (user) {
        if (anonId && anonId.startsWith("demo_")) {
          await mergeHistory(anonId, user.uid);
        }
        setCurrentUserId(user.uid);
      } else {
        if (!anonId) {
          const newAnonId = `demo_${Math.random().toString(36).substring(2, 11)}`;
          localStorage.setItem("anonymous_chat_id", newAnonId);
          setCurrentUserId(newAnonId);
        } else {
          setCurrentUserId(anonId);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // --- LOGIC 3: LẤY LỊCH SỬ SIDEBAR ---
  const fetchHistory = useCallback(async () => {
    if (!currentUserId) return;
    setIsHistoryLoading(true);
    try {
      const q = query(
        collection(db, "chatbot", currentUserId, "messages"),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const sessionsMap = new Map();

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const cId = data.chatId || "legacy";
        if (!sessionsMap.has(cId) && data.role === "user") {
          sessionsMap.set(cId, {
            id: cId,
            lastMsg: data.content.substring(0, 30) + "...",
          });
        }
      });
      setHistorySessions(Array.from(sessionsMap.values()));
    } catch (e) {
      console.error("Fetch history error:", e);
    } finally {
      setIsHistoryLoading(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    if (isMounted && currentUserId && isInitialMount.current) {
      isInitialMount.current = false;
      fetchHistory();
      setActiveChatId(`chat_${Date.now()}`);
      setMessages([{
        id: "initial",
        text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
        sender: "ai",
        timestamp: Date.now(),
      }]);
    }
  }, [isMounted, currentUserId, fetchHistory]);

  const startNewChat = () => {
    setActiveChatId(`chat_${Date.now()}`);
    setMessages([{
      id: `greeting-${Date.now()}`,
      text: "Đã bắt đầu phiên chat mới. Bạn cần hỗ trợ gì không?",
      sender: "ai",
      timestamp: Date.now(),
    }]);
  };

  // --- LOGIC 4: GỬI TIN NHẮN & SSE ---
  const handleSendMessage = async (text: string, image?: File) => {
    if (!text.trim() && !image) return;

    const timestamp = Date.now();
    let imageInfo = null;
    let previewUrl = "";

    if (image) {
      imageInfo = await fileToBase64(image);
      previewUrl = URL.createObjectURL(image);
    }

    const newUserMessage: ChatMessage = {
      id: `user-${timestamp}`,
      text,
      imageUrl: previewUrl,
      sender: "user",
      timestamp,
    };

    const aiMsgId = `ai-${Date.now()}`;
    const newAiMessage: ChatMessage = { id: aiMsgId, text: "", sender: "ai", timestamp: Date.now() };

    setMessages((prev) => [...prev, newUserMessage, newAiMessage]);
    setIsLoadingAiResponse(true);

    try {
      const response = await fetch("https://asia-southeast1-clean-ai-hub.cloudfunctions.net/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          userId: currentUserId,
          chatId: activeChatId,
          imageBase64: imageInfo?.base64,
          mimeType: imageInfo?.mimeType,
        }),
      });

      if (!response.body) throw new Error("Stream error");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.replace("data: ", "").trim();
            if (jsonStr === '{"done":true}') break;
            try {
              const data = JSON.parse(jsonStr);
              if (data.text) {
                accumulatedText += data.text;
                setMessages((prev) => {
                  const newArr = [...prev];
                  const idx = newArr.findIndex((m) => m.id === aiMsgId);
                  if (idx !== -1) newArr[idx] = { ...newArr[idx], text: accumulatedText };
                  return newArr;
                });
              }
            } catch (e) {}
          }
        }
      }
      fetchHistory(); // Refresh sidebar sau khi chat xong
    } catch (error) {
      console.error(error);
      toast({ title: "Lỗi", description: "Không thể kết nối với AI.", variant: "destructive" });
    } finally {
      setIsLoadingAiResponse(false);
      if (previewUrl) setTimeout(() => URL.revokeObjectURL(previewUrl), 5000);
    }
  };

  if (!isMounted) return null;

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
        {/* SIDEBAR */}
        <aside className="w-72 border-r bg-muted/20 flex-col hidden lg:flex">
          <div className="p-4 border-b">
            <button onClick={startNewChat} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl hover:shadow-md transition-all font-semibold active:scale-95">
              <Plus size={20} /> Chat mới
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-3 space-y-2">
            <div className="flex items-center gap-2 px-2 py-2 text-muted-foreground text-xs font-bold uppercase tracking-wider">
              <History size={14} /> Gần đây
            </div>
            {isHistoryLoading ? (
              <div className="flex justify-center p-4"><Loader2 className="animate-spin text-muted-foreground" /></div>
            ) : (
              historySessions.map((session) => (
                <div key={session.id} className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${activeChatId === session.id ? 'bg-accent border-border' : 'border-transparent hover:bg-accent'}`}>
                  <MessageSquare size={16} className="text-primary shrink-0" />
                  <span className="text-sm truncate font-medium">{session.lastMsg}</span>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* MAIN CHAT */}
        <main className="flex-grow flex flex-col relative w-full overflow-hidden">
          <header className="h-14 border-b flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h1 className="font-bold text-lg">4AIVN Assistant</h1>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              USER: {currentUserId.substring(0, 8)}... | SESSION: {activeChatId.substring(5, 13)}
            </div>
          </header>
          
          <div className="flex-grow overflow-hidden flex flex-col max-w-5xl mx-auto w-full">
            <div className="flex-grow overflow-hidden relative">
              <ChatMessages messages={messages} isLoadingAiResponse={isLoadingAiResponse} />
            </div>
            <div className="p-4 md:p-6 bg-gradient-to-t from-background via-background to-transparent">
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoadingAiResponse} />
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}