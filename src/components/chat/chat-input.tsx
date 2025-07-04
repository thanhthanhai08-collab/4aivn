// src/components/chat/chat-input.tsx
"use client";

import { useState, type FormEvent, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  onSendMessage: (message: string, image?: File) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit for Gemini
        toast({
          title: "Ảnh quá lớn",
          description: "Vui lòng chọn ảnh có dung lượng nhỏ hơn 4MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if(previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() || selectedImage) {
      onSendMessage(inputValue.trim(), selectedImage || undefined);
      setInputValue("");
      handleRemoveImage();
    }
  };

  return (
    <div className="p-4 border-t space-y-2">
        {previewUrl && (
            <div className="relative w-24 h-24 mb-2 group">
                <Image src={previewUrl} alt="Xem trước ảnh" layout="fill" objectFit="cover" className="rounded-md border" />
                <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive/80 text-destructive-foreground hover:bg-destructive" onClick={handleRemoveImage}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                aria-label="Đính kèm ảnh"
            >
                <Paperclip className="h-5 w-5" />
            </Button>
            <Input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
            />
            <Input
                type="text"
                placeholder="Nhập tin nhắn của bạn..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-grow"
                aria-label="Ô nhập tin nhắn chat"
            />
            <Button type="submit" disabled={isLoading || (!inputValue.trim() && !selectedImage)} aria-label="Gửi tin nhắn">
                <Send className="h-5 w-5" />
            </Button>
        </form>
    </div>
  );
}
