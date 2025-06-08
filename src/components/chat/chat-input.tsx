// src/components/chat/chat-input.tsx
"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 border-t">
      <Input
        type="text"
        placeholder="Nhập tin nhắn của bạn..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isLoading}
        className="flex-grow"
        aria-label="Ô nhập tin nhắn chat"
      />
      <Button type="submit" disabled={isLoading || !inputValue.trim()} aria-label="Gửi tin nhắn">
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
