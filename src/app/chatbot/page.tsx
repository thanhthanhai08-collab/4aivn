// src/app/chatbot/page.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import type { ChatMessage, ChatAttachment } from "@/lib/types";
import { AppLayout } from "@/components/layout/app-layout";
import { useToast } from "@/hooks/use-toast";
import { Plus, MessageSquare, History, Loader2, ArrowDown } from "lucide-react";
import { db, auth, storage } from "@/lib/firebase"; 
import { ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { 
  collection, query, orderBy, getDocs, limit, 
  doc, getDoc, writeBatch, where
} from "firebase/firestore";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default function ChatPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [historySessions, setHistorySessions] = useState<{ id: string; lastMsg: string }[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>(""); 
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

  const mergeHistory = useCallback(async (anonId: string, newUserId: string) => {
    try {
      const anonMessagesRef = collection(db, "chatbot", anonId, "messages");
      const anonMessagesSnap = await getDocs(anonMessagesRef);

      if (anonMessagesSnap.empty) {
        localStorage.removeItem("anonymous_chat_id");
        return;
      };

      const batch = writeBatch(db);

      for (const messageDoc of anonMessagesSnap.docs) {
        const messageId = messageDoc.id;
        const messageData = messageDoc.data();
        const newUserMessageRef = doc(db, "chatbot", newUserId, "messages", messageId);
        batch.set(newUserMessageRef, messageData);

        const anonHistoryRef = collection(messageDoc.ref, "history");
        const anonHistorySnap = await getDocs(anonHistoryRef);
        anonHistorySnap.forEach(historyDoc => {
          const newHistoryRef = doc(collection(newUserMessageRef, "history"), historyDoc.id);
          batch.set(newHistoryRef, historyDoc.data());
          batch.delete(historyDoc.ref);
        });

        batch.delete(messageDoc.ref);
      }

      await batch.commit();
      localStorage.removeItem("anonymous_chat_id");
      toast({ title: "Lịch sử trò chuyện đã được đồng bộ." });
    } catch (error) {
      console.error("Lỗi khi đồng bộ lịch sử chat:", error);
      toast({ title: "Lỗi đồng bộ", description: "Không thể đồng bộ lịch sử chat của bạn.", variant: "destructive" });
    }
  }, [toast]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoadingAiResponse, scrollToBottom]);
  
  useEffect(() => {
    setIsMounted(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const anonId = localStorage.getItem("anonymous_chat_id");
      if (user) {
        if (anonId) {
          await mergeHistory(anonId, user.uid);
        }
        setCurrentUserId(user.uid);
      } else {
        if (anonId) {
          setCurrentUserId(anonId);
        } else {
          const newAnonId = `guest_${Date.now()}`;
          localStorage.setItem("anonymous_chat_id", newAnonId);
          setCurrentUserId(newAnonId);
        }
      }
    });
    return () => unsubscribe();
  }, [mergeHistory]);

  // --- LOGIC 1: LẤY DANH SÁCH PHIÊN CHAT (SIDEBAR) ---
  const fetchHistory = useCallback(async () => {
    if (!currentUserId) return;
    setIsHistoryLoading(true);
    try {
      const q = query(
        collection(db, "chatbot", currentUserId, "messages"),
        orderBy("updatedAt", "desc"), 
        limit(20)
      );
      const querySnapshot = await getDocs(q);
      const sessionPromises = querySnapshot.docs.map(async (doc) => {
          const historyQuery = query(collection(doc.ref, 'history'), where('role', '==', 'user'), orderBy('timestamp', 'desc'), limit(1));
          const historySnapshot = await getDocs(historyQuery);
          const lastQuestion = historySnapshot.docs[0]?.data().parts[0]?.text || "Phiên chat mới";
          return {
            id: doc.id,
            lastMsg: lastQuestion.substring(0, 30) + (lastQuestion.length > 30 ? "..." : ""),
          };
      });
      const sessions = await Promise.all(sessionPromises);
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

    setMessages([]);
    setActiveChatId(mId);
    setIsLoadingAiResponse(true);

    try {
        const historyRef = collection(db, "chatbot", currentUserId, "messages", mId, "history");
        const q = query(historyRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(q);
        
        const formattedMessages: ChatMessage[] = [];
        querySnapshot.forEach(doc => {
            const data = doc.data();
            formattedMessages.push({
                id: doc.id,
                text: data.parts[0]?.text || '',
                sender: data.role === 'user' ? 'user' : 'ai',
                timestamp: data.timestamp?.toDate()?.getTime() || Date.now(),
                attachments: data.attachments || [],
            });
        });
        setMessages(formattedMessages);
      
    } catch (e) {
      console.error("Lỗi tải lịch sử:", e);
      toast({ title: "Lỗi", description: "Không thể tải phiên chat này.", variant: "destructive" });
    } finally {
      setIsLoadingAiResponse(false);
    }
  };

  const startNewChat = useCallback(() => {
    const newId = `msg_${Date.now()}`;
    setActiveChatId(newId);
    setMessages([
      { 
        id: `init-${newId}`, 
        text: "Xin chào! Tôi là trợ lý AI của 4AIVN. Tôi có thể giúp gì cho bạn?", 
        sender: "ai", 
        timestamp: Date.now() 
      }
    ]);
  }, []);
  
  useEffect(() => {
    if (isMounted && currentUserId) {
        fetchHistory();
        if (!activeChatId) {
            startNewChat();
        }
    }
  }, [isMounted, currentUserId, activeChatId, startNewChat, fetchHistory]);

  // --- LOGIC 3: GỬI TIN NHẮN (SSE) ---
  const handleSendMessage = async (text: string, file?: File) => {
    if (!text.trim() && !file) return;

    const currentMessagesId = activeChatId;
    
    // Show user message with local preview immediately
    const previewUrl = file ? URL.createObjectURL(file) : "";
    const userAttachments: ChatAttachment[] = file ? [{ name: file.name, mimeType: file.type, url: previewUrl }] : [];
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, text, sender: "user", timestamp: Date.now(), attachments: userAttachments };
    
    const aiMsgId = `ai-${Date.now()}`;
    const aiPlaceholder: ChatMessage = { id: aiMsgId, text: "", sender: "ai", timestamp: Date.now() };

    setMessages((prev) => [...prev, userMsg, aiPlaceholder]);
    setIsLoadingAiResponse(true);

    let attachmentPayload: { path: string, mimeType: string, fileName: string } | null = null;
    
    try {
        if (file) {
            // Upload file to Firebase Storage
            const uniqueFileName = `${Date.now()}_${file.name || 'upload'}`;
            const filePath = `chatbot/${currentUserId}/${currentMessagesId}/${uniqueFileName}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            attachmentPayload = { path: filePath, mimeType: file.type, fileName: file.name };
        }

        const MAX_RETRIES = 5;
        let currentRetry = 0;
        let waitTime = 1000;
        let success = false;

        while (currentRetry < MAX_RETRIES && !success) {
          try {
            const response = await fetch("https://asia-southeast1-clean-ai-hub.cloudfunctions.net/chatbot", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                message: text,
                userId: currentUserId,
                messagesId: currentMessagesId,
                attachment: attachmentPayload,
              }),
            });

            if (response.status === 429) throw new Error("RATE_LIMIT");
            if (!response.body) throw new Error("GENERAL_ERROR");

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
                  const jsonStr = line.substring(5).trim();
                  if (!jsonStr) continue; // Skip empty data lines

                  try {
                    const data = JSON.parse(jsonStr);
                    
                    if (data.done === true) continue;

                    if ((data.error && data.error === "QUOTA_EXCEEDED")) {
                        throw new Error("RATE_LIMIT");
                    }
                    if (data.text) {
                      accumulatedText += data.text;
                      setMessages((prev) => prev.map(m => m.id === aiMsgId ? { ...m, text: accumulatedText } : m));
                    }
                  } catch (e: any) {
                     if (e.message === "RATE_LIMIT") throw e;
                     // Ignore JSON parsing errors for incomplete chunks
                     console.warn("SSE JSON parsing error:", e);
                  }
                }
              }
            }
            success = true;
            fetchHistory(); 

          } catch (error: any) {
            if (error.message === "RATE_LIMIT") {
              currentRetry++;
              if (currentRetry < MAX_RETRIES) {
                toast({ title: `Hệ thống bận (Lần thử ${'${currentRetry}'}/${'${MAX_RETRIES}'})`, description: `Đang kết nối lại sau ${'${waitTime}' / 1000} giây...`});
                await delay(waitTime);
                waitTime *= 2;
              } else {
                toast({ title: "Thông báo", description: "Hệ thống đang quá tải hoặc hết hạn mức. Vui lòng thử lại sau 1 phút.", variant: "destructive"});
                setMessages(prev => prev.slice(0, -2)); 
                break;
              }
            } else {
              console.error(error);
              toast({ title: "Lỗi", description: "Có lỗi xảy ra khi kết nối với AI.", variant: "destructive" });
              setMessages(prev => prev.slice(0, -2));
              break; 
            }
          }
        }
    } catch(uploadError) {
        console.error("File upload error:", uploadError);
        toast({ title: "Lỗi", description: "Không thể tải tệp lên.", variant: "destructive" });
        setMessages(prev => prev.slice(0, -2)); // Remove user message and AI placeholder
    } finally {
        setIsLoadingAiResponse(false);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
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
                  <span className={`text-sm truncate ${activeChatId === session.id ? "font-bold" : "font-medium text-muted-foreground"}`}>
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

            {isLoadingAiResponse && messages.length > 2 && (
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
