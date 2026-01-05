// src/app/chat/page.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import type { ChatMessage } from "@/lib/types";
import { AppLayout } from "@/components/layout/app-layout";
import { useToast } from "@/hooks/use-toast";
import { Plus, MessageSquare, History, Loader2, ArrowDown } from "lucide-react";
import { db, auth } from "@/lib/firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import { 
  collection, query, orderBy, getDocs, limit, 
  doc, getDoc, writeBatch
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
  const [activeChatId, setActiveChatId] = useState<string>(""); // Đây đóng vai trò là messagesId
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoadingAiResponse, scrollToBottom]);
  
  // --- LOGIC AUTH & MERGE ---
  const mergeHistory = async (anonId: string, realUid: string) => {
    try {
      const anonMsgsRef = collection(db, "chatbot", anonId, "messages");
      const snapshot = await getDocs(anonMsgsRef);

      if (snapshot.empty) return;

      const batch = writeBatch(db);
      
      snapshot.docs.forEach((oldDoc) => {
        // Chuyển dữ liệu từ doc cũ sang doc mới với ID cũ
        const newDocRef = doc(db, "chatbot", realUid, "messages", oldDoc.id);
        batch.set(newDocRef, oldDoc.data());
        // Xóa doc cũ
        batch.delete(oldDoc.ref);
      });

      await batch.commit();
      localStorage.removeItem("anonymous_chat_id");
      
      toast({ title: "Đã đồng bộ lịch sử chat vào tài khoản của bạn." });
    } catch (e) {
      console.error("Lỗi Merge:", e);
    }
  };

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
          const newAnonId = `demo_${Date.now()}`;
          localStorage.setItem("anonymous_chat_id", newAnonId);
          setCurrentUserId(newAnonId);
        } else {
          setCurrentUserId(anonId);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // --- LOGIC 1: LẤY DANH SÁCH PHIÊN CHAT (SIDEBAR) ---
  const fetchHistory = useCallback(async () => {
    if (!currentUserId) return;
    setIsHistoryLoading(true);
    try {
      const q = query(
        collection(db, "chatbot", currentUserId, "messages"),
        orderBy("updatedAt", "desc"), // Sắp xếp theo thời gian cập nhật mới nhất
        limit(20)
      );
      const querySnapshot = await getDocs(q);
      const sessions = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const lastQuestion = data.questions?.[data.questions.length - 1] || "Phiên chat mới";
        return {
          id: doc.id,
          lastMsg: lastQuestion.substring(0, 30) + (lastQuestion.length > 30 ? "..." : ""),
        };
      });
      setHistorySessions(sessions);
    } catch (e) {
      console.error("Lỗi lấy sidebar:", e);
    } finally {
      setIsHistoryLoading(false);
    }
  }, [currentUserId]);

  // --- LOGIC 2: TẢI CHI TIẾT 1 PHIÊN CHAT ---
  const loadSession = async (mId: string) => {
    if (!currentUserId || mId === activeChatId) return;

    setActiveChatId(mId);
    setIsLoadingAiResponse(true);

    try {
      const docRef = doc(db, "chatbot", currentUserId, "messages", mId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const qs = data.questions || [];
        const ans = data.answers || [];

        const formattedMessages: ChatMessage[] = [];
        qs.forEach((q: string, i: number) => {
          formattedMessages.push({
            id: `q-${mId}-${i}`,
            text: q,
            sender: "user",
            timestamp: Date.now(),
          });
          if (ans[i]) {
            formattedMessages.push({
              id: `a-${mId}-${i}`,
              text: ans[i],
              sender: "ai",
              timestamp: Date.now(),
            });
          }
        });
        setMessages(formattedMessages);
      }
    } catch (e) {
      console.error("Lỗi tải tin nhắn:", e);
      toast({ title: "Lỗi", description: "Không thể tải lịch sử phiên này.", variant: "destructive" });
    } finally {
      setIsLoadingAiResponse(false);
    }
  };

  useEffect(() => {
    if (isMounted && currentUserId) {
      fetchHistory();
      if (!activeChatId) {
        const newId = `msg_${Date.now()}`;
        setActiveChatId(newId);
        setMessages([{ id: "init", text: "Xin chào! Tôi có thể giúp gì cho bạn?", sender: "ai", timestamp: Date.now() }]);
      }
    }
  }, [isMounted, currentUserId, fetchHistory, activeChatId]);

  const startNewChat = () => {
    const newId = `msg_${Date.now()}`;
    setActiveChatId(newId);
    setMessages([{ id: `greeting-${Date.now()}`, text: "Đã bắt đầu phiên chat mới.", sender: "ai", timestamp: Date.now() }]);
  };

  // --- LOGIC 3: GỬI TIN NHẮN (SSE) ---
  const handleSendMessage = async (text: string, image?: File) => {
    if (!text.trim() && !image) return;

    const currentMessagesId = activeChatId;
    let imageInfo = image ? await fileToBase64(image) : null;
    const previewUrl = image ? URL.createObjectURL(image) : "";

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, text, imageUrl: previewUrl, sender: "user", timestamp: Date.now() };
    const aiMsgId = `ai-${Date.now()}`;
    const aiPlaceholder: ChatMessage = { id: aiMsgId, text: "", sender: "ai", timestamp: Date.now() };

    setMessages((prev) => [...prev, userMsg, aiPlaceholder]);
    setIsLoadingAiResponse(true);

    try {
      const response = await fetch("https://asia-southeast1-clean-ai-hub.cloudfunctions.net/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          userId: currentUserId,
          messagesId: currentMessagesId,
          imageBase64: imageInfo?.base64,
          mimeType: imageInfo?.mimeType,
        }),
      });

      if (response.status === 429) {
        throw new Error("Rate limit exceeded");
      }

      if (!response.body) throw new Error("No response body");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          reader.releaseLock();
          break;
        }

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
                setMessages((prev) => prev.map(m => m.id === aiMsgId ? { ...m, text: accumulatedText } : m));
              }
            } catch (e) {
                // Ignore parsing errors which can happen with chunked data
            }
          }
        }
      }
      fetchHistory(); // Cập nhật lại sidebar
    } catch (error: any) {
        if (error.message === "Rate limit exceeded") {
            toast({
            title: "Hết hạn mức miễn phí",
            description: "Bạn đã gửi quá nhiều tin nhắn. Vui lòng đợi một lát rồi thử lại nhé!",
            variant: "destructive"
            });
            setMessages(prev => prev.slice(0, -1));
        } else {
            console.error(error);
            toast({ title: "Lỗi", description: "Không thể kết nối với AI.", variant: "destructive" });
            setMessages(prev => prev.slice(0, -1));
        }
    } finally {
      setIsLoadingAiResponse(false);
      if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
      }
    }
  };

  if (!isMounted) return null;

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
        {/* SIDEBAR */}
        <aside className="w-72 border-r bg-muted/20 flex-col hidden lg:flex">
          <div className="p-4 border-b">
            <button onClick={startNewChat} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl hover:opacity-90 transition-all font-semibold active:scale-95">
              <Plus size={20} /> Chat mới
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-3 space-y-1">
            <div className="px-2 py-2 text-muted-foreground text-xs font-bold uppercase flex items-center gap-2">
              <History size={14} /> Gần đây
            </div>
            {isHistoryLoading ? (
              <div className="flex justify-center p-4"><Loader2 className="animate-spin text-muted-foreground" /></div>
            ) : (
              historySessions.map((session) => (
                <div 
                  key={session.id} 
                  onClick={() => loadSession(session.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                    activeChatId === session.id ? 'bg-accent border-primary/20 shadow-sm' : 'border-transparent hover:bg-accent/50'
                  }`}
                >
                  <MessageSquare size={16} className={activeChatId === session.id ? "text-primary" : "text-muted-foreground"} />
                  <span className={`text-sm truncate ${activeChatId === session.id ? "font-bold text-primary-foreground" : "font-medium text-muted-foreground"}`}>
                    {session.lastMsg}
                  </span>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* MAIN CHAT */}
        <main className="flex-grow flex flex-col relative w-full overflow-hidden">
          <header className="h-14 border-b flex items-center px-6 bg-background/50 backdrop-blur-sm z-10">
              <h1 className="font-bold text-lg">AI Assistant</h1>
          </header>
          
          <div className="flex-grow overflow-hidden flex flex-col max-w-5xl mx-auto w-full relative">
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4">
              <ChatMessages messages={messages} isLoadingAiResponse={isLoadingAiResponse} />
            </div>

            {isLoadingAiResponse && (
              <button 
                onClick={scrollToBottom}
                className="absolute bottom-24 right-8 p-2 bg-primary text-primary-foreground rounded-full shadow-lg animate-bounce z-20"
              >
                <ArrowDown size={18} />
              </button>
            )}

            <div className="p-4 md:p-6 bg-background border-t">
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoadingAiResponse} />
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
