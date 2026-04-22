
// src/components/news/news-card.tsx
"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { CalendarDays, ArrowRight, Bookmark, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/lib/types";
import { format } from "date-fns";
import { vi } from 'date-fns/locale';
import { enUS } from 'date-fns/locale/en-US';
import { useState, useEffect, type MouseEvent } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { toggleNewsBookmark, getUserProfileData } from "@/lib/user-data-service";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedSlug } from "@/lib/i18n-helpers";

interface NewsCardProps {
  article: NewsArticle;
}

const getAuthorInitials = (name?: string) => {
  if (!name) return "";
  const names = name.split(' ');
  if (names.length > 1) {
    return names[0][0] + names[names.length - 1][0];
  }
  return name.substring(0, 2);
};

export function NewsCard({ article }: NewsCardProps) {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const locale = useLocale();
  const tNewsDetail = useTranslations("newsDetail");
  const tNews = useTranslations("news");

  useEffect(() => {
    // Sync with Firestore on mount and when article.id or user changes
    if (currentUser) {
      getUserProfileData(currentUser.uid).then(userData => {
        setIsBookmarked(userData.bookmarkedNews?.includes(article.id) || false);
      });
    } else {
      setIsBookmarked(false);
    }
  }, [article.id, currentUser]);

  const handleBookmarkToggle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation which is the default behavior of parent
    e.stopPropagation();

    if (!currentUser) {
      toast({
        title: tNewsDetail("loginRequired"),
        description: tNewsDetail("loginRequiredDesc"),
        variant: "destructive",
      });
      return;
    }
    
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState); // Optimistic UI update

    try {
      await toggleNewsBookmark(currentUser.uid, article.id, isBookmarked);
      toast({ title: newBookmarkState ? tNewsDetail("bookmarkSuccess") : tNewsDetail("bookmarkRemoved") });
    } catch (error) {
      console.error("Failed to update bookmark:", error);
      setIsBookmarked(!newBookmarkState); // Revert on error
      toast({ title: tNewsDetail("error"), description: tNewsDetail("bookmarkError"), variant: "destructive" });
    }
  };
  
  // Remove HTML and [IMAGE:...] tags for the summary display
  const descriptionText = article.content
    .replace(/<[^>]*>|\[IMAGE:.*?\]/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  const slug = getLocalizedSlug(article.slug || article.id, locale) || article.id;

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden group hover:-translate-y-1">
      <Link href={`/${slug}` as any} className="block">
        {article.imageUrl && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image 
              src={article.imageUrl} 
              alt={article.title} 
              fill
              className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              
            />
          </div>
        )}
      </Link>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-headline line-clamp-2">
           <Link href={`/${slug}` as any} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <CardDescription className="text-sm line-clamp-3">{descriptionText}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="text-xs text-muted-foreground flex items-center space-x-2">
            {article.author && (
                <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span className="font-medium">{article.author}</span>
                    <span className="text-gray-400">•</span>
                </div>
            )}
            <div className="flex items-center space-x-1">
                <CalendarDays className="h-3 w-3" />
                <span suppressHydrationWarning>{format(new Date(article.publishedAt), "d MMM, yyyy", { locale: locale === 'en' ? enUS : vi })}</span>
            </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleBookmarkToggle} aria-label={tNewsDetail("bookmark")}>
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-primary text-primary")} />
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/${slug}` as any}>
              {tNews("readMore")} <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
