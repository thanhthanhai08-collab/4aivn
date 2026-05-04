// src/components/news/comment-list.tsx
"use client";

import type { Comment } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { useTranslations, useLocale } from 'next-intl';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  const t = useTranslations('newsDetail');
  const locale = useLocale();
  const dateLocale = locale === 'en' ? enUS : vi;

  const getInitials = (email: string | null | undefined, name: string | null | undefined) => {
    if (email) return email.charAt(0).toUpperCase();
    if (name) return name.charAt(0).toUpperCase();
    return "?";
  };
  
  if (comments.length === 0) {
    return <p className="text-muted-foreground text-sm py-8 text-center">{t('emptyComments')}</p>;
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-4">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={comment.userPhotoURL || undefined} alt={comment.userName || "User"} />
            <AvatarFallback>{getInitials(comment.userEmail, comment.userName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-sm">{comment.userName || "Người dùng ẩn danh"}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: dateLocale })}
              </p>
            </div>
            <p className="text-sm text-foreground whitespace-pre-wrap">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
