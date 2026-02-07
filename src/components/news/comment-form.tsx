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
import type { Comment } from "@/lib/types";

interface CommentFormProps {
  articleId: string;
  onCommentAdded: (comment: Comment) => void;
}

export function CommentForm({ articleId, onCommentAdded }: CommentFormProps) {
  const { currentUser } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const getInitials = (email: string | null | undefined) => {
    if (!email) return "?";
    return email.charAt(0).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !commentText.trim()) return;

    setIsSubmitting(true);
    const trimmedText = commentText.trim();

    // Optimistic update: create a temporary comment to show in the UI immediately
    const optimisticComment: Comment = {
      id: `optimistic-${Date.now()}`, // Temporary ID
      articleId,
      userId: currentUser.uid,
      userName: currentUser.displayName,
      userEmail: currentUser.email,
      userPhotoURL: currentUser.photoURL,
      text: trimmedText,
      createdAt: new Date(), // Use client-side date for immediate display
    };

    // Update the parent component's state
    onCommentAdded(optimisticComment);
    
    // Clear the textarea after adding the comment to the UI
    setCommentText("");

    try {
      // Perform the actual server action in the background
      await addComment(articleId, currentUser, trimmedText);
      // Success is handled by the real-time listener updating the comment list.
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Lỗi",
        description: "Không thể đăng bình luận. Vui lòng thử lại.",
        variant: "destructive",
      });
      // A more advanced implementation might remove the optimistic comment on error.
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
        <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || ""} />
        <AvatarFallback>{getInitials(currentUser.email)}</AvatarFallback>
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
