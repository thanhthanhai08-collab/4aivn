// src/components/chat/chat-messages.tsx
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoadingAiResponse: boolean;
}

export function ChatMessages({ messages, isLoadingAiResponse }: ChatMessagesProps) {
  return (
    <div className="space-y-4 p-4 flex-1 overflow-y-auto bg-muted/30">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex items-end space-x-2",
            message.sender === "user" ? "justify-end" : "justify-start"
          )}
        >
          {message.sender === "ai" && (
            <Avatar className="h-8 w-8 self-start">
              <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
            </Avatar>
          )}

          {/* Message Bubble */}
          <div
            className={cn(
              "flex flex-col max-w-xs lg:max-w-md rounded-lg shadow overflow-hidden",
              message.sender === "user"
                ? "bg-primary text-primary-foreground rounded-br-none"
                : "bg-card text-card-foreground rounded-bl-none"
            )}
          >
            {/* Attachments rendering */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="space-y-1">
                {message.attachments.map((att, index) => {
                  const isImage = att.mimeType.startsWith("image/");
                  
                  if (isImage) {
                    return (
                      <div key={index} className="relative aspect-video w-full">
                        <Image 
                          src={att.url} 
                          alt={att.name} 
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover" 
                        />
                      </div>
                    );
                  } else { // Handle other file types like PDF/DOCX
                    return (
                      <div key={index} className={cn("p-3", message.text && "border-b border-black/10 dark:border-white/10")}>
                        <Link 
                          href={att.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={cn(
                            "flex items-center gap-2 no-underline hover:underline",
                            message.sender === 'user' 
                              ? 'text-primary-foreground hover:text-primary-foreground/90' 
                              : 'text-primary'
                          )}
                        >
                          <FileText className="h-5 w-5 flex-shrink-0" />
                          <span className="truncate text-sm font-medium">{att.name}</span>
                        </Link>
                      </div>
                    );
                  }
                })}
              </div>
            )}
            
            {/* Text message rendering */}
            {message.text && (
              <div className={cn(
                  "p-3",
                  message.sender === 'ai' && "prose-sm prose-p:my-0 prose-ul:my-0 prose-ol:my-0 prose-li:my-0 text-foreground"
                )}>
                {message.sender === 'ai' ? (
                  <ReactMarkdown>
                    {message.text}
                  </ReactMarkdown>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                )}
              </div>
            )}
          </div>

          {message.sender === "user" && (
            <Avatar className="h-8 w-8 self-start">
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
