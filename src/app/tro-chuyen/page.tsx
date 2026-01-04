// src/app/chat/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import type { ChatMessage } from "@/lib/types";
import { AppLayout } from "@/components/layout/app-layout";
import { useToast } from "@/hooks/use-toast";
import { Plus, MessageSquare, History, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";

/**
 * Helper: Chuyển file ảnh sang chuỗi Base64 tinh khiết (không gồm prefix data:...)
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
  // --- STATE ---
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [historySessions, setHistorySessions] = useState<{ id: string; lastMsg: string }[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>(`chat_${Date.now()}`);
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  
  const { toast } = useToast();
  const userId = "user_demo_123"; // ID người dùng giả định

  // --- SIDEBAR LOGIC ---
  const fetchHistory = useCallback(async () => {
    setIsHistoryLoading(true);
    try {
      // Lấy 20 tin nhắn gần nhất từ sub-collection để làm lịch sử xem trước
      const q = query(
        collection(db, "chatbot", userId, "messages"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      const querySnapshot = await getDocs(q);
      const sessions = querySnapshot.docs
        .filter(doc => doc.data().role === 'user') // Chỉ lấy tin nhắn user làm tiêu đề
        .map(doc => ({
          id: doc.id,
          lastMsg: doc.data().content.substring(0, 35) + "..."
        }));
      setHistorySessions(sessions);
    } catch (e) {
      console.error("Lỗi lấy lịch sử:", e);
    } finally {
      setIsHistoryLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchHistory();
    // Chào mừng mặc định
    setMessages([{
      id: "initial",
      text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
      sender: "ai",
      timestamp: Date.now()
    }]);
  }, [fetchHistory]);

  const startNewChat = () => {
    setActiveChatId(`chat_${Date.now()}`);
    setMessages([{
      id: `greeting-${Date.now()}`,
      text: "Đã bắt đầu phiên chat mới. Bạn cần hỗ trợ gì không?",
      sender: "ai",
      timestamp: Date.now(),
    }]);
  };

  // --- CHAT STREAMING LOGIC ---
  const handleSendMessage = async (text: string, image?: File) => {
    if (!text.trim() && !image) return;

    const timestamp = Date.now();
    let imageInfo = null;
    let previewUrl = "";

    // Xử lý ảnh xem trước
    if (image) {
      imageInfo = await fileToBase64(image);
      previewUrl = URL.createObjectURL(image);
    }

    // 1. Cập nhật tin nhắn User
    const newUserMessage: ChatMessage = {
      id: `user-${timestamp}`,
      text,
      imageUrl: previewUrl,
      sender: "user",
      timestamp,
    };

    // 2. Tạo placeholder cho tin nhắn AI (Sẽ được điền dần bởi SSE)
    const aiMsgId = `ai-${Date.now()}`;
    const newAiMessage: ChatMessage = {
      id: aiMsgId,
      text: "", // Rỗng để bắt đầu stream
      sender: "ai",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newUserMessage, newAiMessage]);
    setIsLoadingAiResponse(true);

    try {
      const response = await fetch("https://asia-southeast1-clean-ai-hub.cloudfunctions.net/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          userId: userId,
          chatId: activeChatId,
          imageBase64: imageInfo?.base64,
          mimeType: imageInfo?.mimeType,
        }),
      });

      if (!response.body) throw new Error("Không nhận được luồng dữ liệu");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = ""; // Lưu trữ văn bản stream nhận được

      // Vòng lặp đọc Stream (SSE)
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Giải mã byte chunk thành text
        const chunk = decoder.decode(value, { stream: true });
        
        // Tách các dòng SSE (định dạng: data: {...})
        const lines = chunk.split("\n\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.replace("data: ", "").trim();
            if (jsonStr === '{"done":true}') break;

            try {
              const data = JSON.parse(jsonStr);
              if (data.text) {
                accumulatedText += data.text;
                
                // CẬP NHẬT TRẠNG THÁI UI: Tối ưu chỉ cập nhật tin nhắn cuối
                setMessages((prev) => {
                  const newArr = [...prev];
                  const lastIdx = newArr.length - 1;
                  if (newArr[lastIdx].id === aiMsgId) {
                    newArr[lastIdx] = { ...newArr[lastIdx], text: accumulatedText };
                  }
                  return newArr;
                });
              }
            } catch (parseError) {
              // Bỏ qua nếu gói tin JSON bị lỗi do cắt chunk
            }
          }
        }
      }
      
      // Hoàn tất chat, làm mới sidebar
      fetchHistory();

    } catch (error) {
      console.error("Chat Error:", error);
      toast({
        title: "Lỗi kết nối",
        description: "Không thể lấy phản hồi từ AI. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAiResponse(false);
      // Dọn dẹp URL ảnh tạm để tránh rò rỉ bộ nhớ
      if (previewUrl) setTimeout(() => URL.revokeObjectURL(previewUrl), 5000);
    }
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
        
        {/* SIDEBAR: Lịch sử Chat */}
        <aside className="w-72 border-r bg-muted/20 flex-col hidden lg:flex">
          <div className="p-4 border-b">
            <button 
              onClick={startNewChat}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl hover:shadow-md transition-all font-semibold active:scale-95"
            >
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
                <div 
                  key={session.id}
                  className="group flex items-center gap-3 p-3 rounded-xl hover:bg-accent cursor-pointer transition-all border border-transparent hover:border-border overflow-hidden"
                >
                  <MessageSquare size={16} className="text-primary shrink-0" />
                  <span className="text-sm truncate font-medium">{session.lastMsg}</span>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* MAIN AREA: Khung Chat */}
        <main className="flex-grow flex flex-col relative w-full overflow-hidden">
          <header className="h-14 border-b flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h1 className="font-bold text-lg">4AIVN Assistant</h1>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              ID: {activeChatId}
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
