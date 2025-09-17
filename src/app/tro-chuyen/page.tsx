// src/app/chat/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import type { ChatMessage } from "@/lib/types";
import { AppLayout } from "@/components/layout/app-layout";
import { demoChatbot } from "@/ai/flows/demo-chatbot";
import { processImageForChat } from "@/ai/flows/process-image-for-chat";
import { useToast } from "@/hooks/use-toast";
import { removeMarkdown } from "@/lib/utils";

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
        text: "Xin chào! Tôi là chatbot của 4AIVN. Tôi có thể giúp gì cho bạn về các công cụ, mô hình hoặc tin tức AI có trên trang web này?",
        sender: "ai",
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const handleSendMessage = async (text: string, image?: File) => {
    const timestamp = Date.now();
    let dataUri: string | undefined;

    if (image) {
      dataUri = await fileToDataUri(image);
    }
    
    const newUserMessage: ChatMessage = {
      id: `user-${timestamp}`,
      text,
      // Use the data URI directly for the preview to avoid creating object URLs
      imageUrl: dataUri,
      sender: "user",
      timestamp: timestamp,
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoadingAiResponse(true);

    try {
      let imageUrlForWebhook: string | undefined = dataUri;

      // If there's an image, process it first to get a "Gemini-processed" URI
      if (dataUri) {
          try {
              const processedImage = await processImageForChat({ photoDataUri: dataUri });
              // The `processImageForChat` flow returns the original URI, but this step ensures it has been processed by Gemini
              imageUrlForWebhook = processedImage.imageUri; 
          } catch (processError) {
              console.error("Error processing image:", processError);
              toast({
                  title: "Lỗi xử lý ảnh",
                  description: "Không thể xử lý hình ảnh của bạn qua AI. Vui lòng thử lại.",
                  variant: "destructive",
              });
              setIsLoadingAiResponse(false);
              return; // Stop if image processing fails
          }
      }
      
      // The `demoChatbot` flow now accepts an optional imageUrl.
      const aiResponse = await demoChatbot({ 
        message: text,
        imageUrl: imageUrlForWebhook,
      });
      
      const newAiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: removeMarkdown(aiResponse.response),
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
