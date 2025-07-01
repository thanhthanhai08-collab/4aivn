// src/components/news/news-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight, Bookmark } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/lib/types";
import { format } from "date-fns";
import { vi } from 'date-fns/locale';
import { useState, useEffect, type MouseEvent } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (currentUser) {
      // Sync with localStorage on mount and when article.id or user changes
      const bookmarkedIds: string[] = JSON.parse(localStorage.getItem(`cleanAINewsBookmarks_${currentUser.uid}`) || "[]");
      setIsBookmarked(bookmarkedIds.includes(article.id));
    } else {
      setIsBookmarked(false);
    }
  }, [article.id, currentUser]);

  const handleBookmarkToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation which is the default behavior of parent
    e.stopPropagation();

    if (!currentUser) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để lưu tin tức.",
        variant: "destructive",
      });
      return;
    }

    const key = `cleanAINewsBookmarks_${currentUser.uid}`;
    // Read the LATEST state from localStorage inside the handler
    let bookmarkedIds: string[] = JSON.parse(localStorage.getItem(key) || "[]");
    const isCurrentlyBookmarked = bookmarkedIds.includes(article.id);

    if (isCurrentlyBookmarked) {
      bookmarkedIds = bookmarkedIds.filter(id => id !== article.id);
      toast({ title: "Đã xóa khỏi tin tức đã lưu" });
    } else {
      bookmarkedIds.push(article.id);
      toast({ title: "Đã lưu tin tức thành công" });
    }

    localStorage.setItem(key, JSON.stringify(bookmarkedIds));
    // Update the state to re-render the icon
    setIsBookmarked(!isCurrentlyBookmarked);
  };

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden group">
      <Link href={`/news/${article.id}`} className="block">
        {article.imageUrl && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image 
              src={article.imageUrl} 
              alt={article.title} 
              layout="fill" 
              objectFit="cover" 
              className="rounded-t-lg transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={article.dataAiHint || "technology abstract"}
            />
          </div>
        )}
      </Link>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-headline line-clamp-2">
           <Link href={`/news/${article.id}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <CardDescription className="text-sm line-clamp-3">{article.content}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="text-xs text-muted-foreground">
          <p>{article.source}</p>
          <div className="flex items-center">
            <CalendarDays className="h-3 w-3 mr-1" />
            {format(new Date(article.publishedAt), "d MMM, yyyy", { locale: vi })}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleBookmarkToggle} aria-label="Lưu tin tức">
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-primary text-primary")} />
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/news/${article.id}`}>
              Đọc thêm <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
