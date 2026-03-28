"use client";

import Image from "next/image";
import type { Author, NewsArticle } from "@/lib/types";
import { NewsCard } from "@/components/news/news-card";
import { Card, CardContent } from "@/components/ui/card";
import { User, CalendarDays, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface Props {
  author: Author;
  initialArticles: NewsArticle[];
}

export function AuthorDetailClient({ author, initialArticles }: Props) {
  return (
    <div className="container py-8 md:py-12">
      {/* Author Profile Header */}
      <Card className="mb-12 overflow-hidden border-none shadow-xl bg-gradient-to-br from-primary/5 to-background">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-startGap-8 gap-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background shadow-lg shrink-0">
              <Image
                src={author.avatarUrl || "/og-image.jpg"}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-grow text-center md:text-left space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-2">
                  {author.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Tác giả tại 4AIVN</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>Tham gia từ {format(new Date(author.createdAt), "MMMM yyyy", { locale: vi })}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>{initialArticles.length} bài viết</span>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">
                {author.bio}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Author's Articles */}
      <section>
        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-8 text-foreground pb-2 border-b">
          Tất cả bài viết của {author.name}
        </h2>
        
        {initialArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground text-lg">Tác giả này chưa có bài viết nào được đăng tải.</p>
          </div>
        )}
      </section>
    </div>
  );
}
