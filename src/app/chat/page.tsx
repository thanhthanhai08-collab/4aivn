// src/app/chat/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import type { ChatMessage } from "@/lib/types";
import { AppLayout } from "@/components/layout/app-layout";
import { demoChatbot } from "@/ai/flows/demo-chatbot";
import { useToast } from "@/hooks/use-toast";

const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initial greeting from AI
    setMessages([
      {
        id: "initial-ai-greeting",
        text: "Xin chào! Tôi là chatbot demo của Clean AI Hub. Tôi có thể giúp gì cho bạn về các công cụ hoặc tin tức AI hôm nay? Bạn cũng có thể gửi một hình ảnh.",
        sender: "ai",
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const handleSendMessage = async (text: string, image?: File) => {
    const timestamp = Date.now();
    const imageUrl = image ? URL.createObjectURL(image) : undefined;
    
    const newUserMessage: ChatMessage = {
      id: `user-${timestamp}`,
      text,
      imageUrl,
      sender: "user",
      timestamp: timestamp,
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoadingAiResponse(true);

    try {
      const imageDataUri = image ? await fileToDataUri(image) : undefined;
      
      const chatHistoryForAI = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        // For simplicity, history sent to AI doesn't include past images
        content: msg.text
      }));
      
      const aiResponse = await demoChatbot({ 
        message: text, 
        image: imageDataUri, 
        chatHistory: chatHistoryForAI 
      });
      
      const newAiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: aiResponse.response,
        sender: "ai",
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);

    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorAiMessage: ChatMessage = {
        id: `ai-error-${Date.now()}`,
        text: "Xin lỗi, tôi đã gặp lỗi. Vui lòng thử lại.",
        sender: "ai",
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, errorAiMessage]);
      toast({
        title: "Lỗi Chatbot",
        description: "Không thể nhận được phản hồi từ AI. Vui lòng kiểm tra kết nối của bạn hoặc thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAiResponse(false);
      // Revoke the object URL to avoid memory leaks
      if(imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    }
  };

  return (
    <AppLayout>
      <div className="container py-8 md:py-12 flex flex-col h-[calc(100vh-var(--header-height)-var(--footer-height)-4rem)] max-h-[800px] "> {/* Adjust height based on header/footer */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold text-foreground">Chatbot AI Demo</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Tương tác với AI của chúng tôi để tìm hiểu thêm về các công cụ và tin tức AI.
          </p>
        </header>
        <div className="flex-grow flex flex-col bg-card shadow-lg rounded-lg overflow-hidden">
          <ChatMessages messages={messages} isLoadingAiResponse={isLoadingAiResponse} />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoadingAiResponse} />
        </div>
      </div>
    </AppLayout>
  );
}
