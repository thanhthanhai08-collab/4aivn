// src/components/chat/chat-messages.tsx
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoadingAiResponse: boolean;
}

export function ChatMessages({ messages, isLoadingAiResponse }: ChatMessagesProps) {
  return (
    <div className="space-y-4 p-4 h-[calc(100vh-200px)] overflow-y-auto bg-muted/30 rounded-lg">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex items-end space-x-2",
            message.sender === "user" ? "justify-end" : "justify-start"
          )}
        >
          {message.sender === "ai" && (
            <Avatar className="h-8 w-8">
              <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
            </Avatar>
          )}
          <div
            className={cn(
              "max-w-xs lg:max-w-md p-3 rounded-lg shadow",
              message.sender === "user"
                ? "bg-primary text-primary-foreground rounded-br-none"
                : "bg-card text-card-foreground rounded-bl-none"
            )}
          >
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          </div>
           {message.sender === "user" && (
            <Avatar className="h-8 w-8">
              <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
      {isLoadingAiResponse && (
        <div className="flex items-end space-x-2 justify-start">
           <Avatar className="h-8 w-8">
             <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
           </Avatar>
          <div className="max-w-xs lg:max-w-md p-3 rounded-lg shadow bg-card text-card-foreground rounded-bl-none">
            <div className="flex space-x-1">
              <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-75"></span>
              <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-150"></span>
              <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-200"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
