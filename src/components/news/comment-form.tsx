// src/components/news/comment-form.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { addComment } from "@/lib/comments-actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CommentFormProps {
  articleId: string;
}

export function CommentForm({ articleId }: CommentFormProps) {
  const { currentUser } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "";
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment(articleId, currentUser, commentText);
      setCommentText(""); // Clear textarea on success
      toast({
        title: "Thành công",
        description: "Bình luận của bạn đã được đăng.",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Lỗi",
        description: "Không thể đăng bình luận. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return null; // Should be handled by parent component, but as a safeguard
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-start space-x-4">
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || ""} />
        <AvatarFallback>{getInitials(currentUser.displayName)}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <Textarea
          placeholder="Viết bình luận của bạn..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isSubmitting}
          rows={3}
          className="mb-2"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !commentText.trim()}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Đăng bình luận
          </Button>
        </div>
      </div>
    </form>
  );
}
