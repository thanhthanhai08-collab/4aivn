
// src/components/news/news-list-item.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { NewsArticle } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Bookmark, User } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState, useEffect, type MouseEvent } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { toggleNewsBookmark, getUserProfileData } from "@/lib/user-data-service";

const getAuthorInitials = (name?: string) => {
  if (!name) return "";
  const names = name.split(' ');
  if (names.length > 1) {
    return names[0][0] + names[names.length - 1][0];
  }
  return name.substring(0, 2);
};

export function NewsListItem({ article }: { article: NewsArticle }) {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getUserProfileData(currentUser.uid).then(userData => {
        setIsBookmarked(userData.bookmarkedNews?.includes(article.id) || false);
      });
    } else {
      setIsBookmarked(false);
    }
  }, [article.id, currentUser]);
  
  const handleBookmarkToggle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để lưu tin tức.",
        variant: "destructive",
      });
      return;
    }

    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);

    try {
      await toggleNewsBookmark(currentUser.uid, article.id, isBookmarked);
      toast({ title: newBookmarkState ? "Đã lưu tin tức thành công" : "Đã xóa khỏi tin tức đã lưu" });
    } catch (error) {
      console.error("Failed to update bookmark:", error);
      setIsBookmarked(!newBookmarkState);
      toast({ title: "Lỗi", description: "Không thể cập nhật tin tức đã lưu.", variant: "destructive" });
    }
  };

  const descriptionText = article.content
    .replace(/<[^>]*>|\[IMAGE:.*?\]/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return (
    <article className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center group">
      <Link href={`/${article.id}`} className="md:col-span-1 block overflow-hidden rounded-lg">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={400}
          height={250}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
        />
      </Link>
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold font-headline mb-2 leading-tight">
          <Link href={`/${article.id}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </h2>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {descriptionText}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-3">
             <Avatar className="h-8 w-8">
               <AvatarImage src={article.authorImageUrl} alt={article.author} />
              <AvatarFallback>{getAuthorInitials(article.author)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-2">
                <span className="font-semibold text-foreground">{article.author}</span>
                <span className="text-gray-400">•</span>
                <div className="flex items-center space-x-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{format(new Date(article.publishedAt), "d MMM, yyyy", { locale: vi })}</span>
                </div>
            </div>
          </div>
           <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleBookmarkToggle} aria-label="Lưu tin tức">
            <Bookmark className={cn("h-5 w-5 text-muted-foreground", isBookmarked && "fill-primary text-primary")} />
          </Button>
        </div>
      </div>
    </article>
  );
}
