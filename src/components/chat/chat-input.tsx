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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          title: "File quá lớn",
          description: "Vui lòng chọn file có dung lượng nhỏ hơn 4MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null); // No preview for non-image files
      }
    }
  };

  const handleRemoveFile = () => {
    if(previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() || selectedFile) {
      onSendMessage(inputValue.trim(), selectedFile || undefined);
      setInputValue("");
      handleRemoveFile();
    }
  };

  return (
    <div className="space-y-2">
        {selectedFile && (
            <div className="relative w-full p-2 border rounded-md flex items-center justify-between group bg-muted/50">
                {previewUrl ? (
                     <div className="flex items-center gap-2 overflow-hidden">
                        <Image src={previewUrl} alt="Xem trước ảnh" width={40} height={40} objectFit="cover" className="rounded-md border" />
                         <span className="text-sm text-muted-foreground truncate">{selectedFile.name}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 overflow-hidden">
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground truncate">{selectedFile.name}</span>
                    </div>
                )}
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-background/80 hover:bg-destructive/20" onClick={handleRemoveFile}>
                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
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
                aria-label="Đính kèm file"
            >
                <Paperclip className="h-5 w-5" />
            </Button>
            <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,application/pdf,.docx"
            />
            <Input
                type="text"
                placeholder="Nhập tin nhắn của bạn..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-grow h-11"
                aria-label="Ô nhập tin nhắn chat"
            />
            <Button type="submit" disabled={isLoading || (!inputValue.trim() && !selectedFile)} aria-label="Gửi tin nhắn" size="icon" className="h-11 w-11 shrink-0">
                <Send className="h-5 w-5" />
            </Button>
        </form>
    </div>
  );
}
