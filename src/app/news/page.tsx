// src/app/news/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockNews } from "@/lib/mock-news";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/news/news-card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const descriptionText = (content: string) => content
    .replace(/<[^>]*>|\[IMAGE:.*?\]/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  if (!mounted) {
    return (
      <AppLayout>
        <div className="container py-8">
          <Skeleton className="h-12 w-1/2 mb-12 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  const featuredArticle = mockNews.length > 0 ? mockNews[0] : null;
  const otherArticles = mockNews.slice(1);

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-headline font-bold text-foreground">Tin tức & Cập nhật AI</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Luôn cập nhật những diễn biến mới nhất trong thế giới Trí tuệ Nhân tạo.
          </p>
        </header>

        {isLoading ? (
          <div>
            <Skeleton className="h-[500px] w-full rounded-lg mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ) : mockNews.length > 0 && featuredArticle ? (
          <div>
            {/* Featured Article Section */}
            <section className="mb-16">
              <Link href={`/news/${featuredArticle.id}`} className="group block">
                <div className="relative w-full aspect-[16/8] mb-6 overflow-hidden rounded-xl shadow-2xl">
                  <Image
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                    data-ai-hint={featuredArticle.dataAiHint}
                  />
                </div>
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-primary font-semibold mb-2">
                        {featuredArticle.source} • {format(new Date(featuredArticle.publishedAt), "d MMMM, yyyy", { locale: vi })}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto line-clamp-3">
                       {descriptionText(featuredArticle.content)}
                    </p>
                </div>
              </Link>
            </section>

            {/* Other Articles Grid */}
            {otherArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherArticles.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Hiện tại không có tin tức nào.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}