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
  const secondaryArticle = mockNews.length > 1 ? mockNews[1] : null;
  const quickViewArticles = mockNews.slice(2, 7);
  const otherArticles = mockNews.slice(7);

  const descriptionText = (content: string) => content
    .replace(/<[^>]*>|\[IMAGE:.*?\]/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();


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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        ) : mockNews.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Section */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Featured Article */}
                {featuredArticle && (
                  <Link href={`/news/${featuredArticle.id}`} className="group block col-span-1">
                    <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={featuredArticle.imageUrl}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        data-ai-hint={featuredArticle.dataAiHint}
                      />
                    </div>
                    <h2 className="text-2xl font-bold font-headline mb-2 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">{featuredArticle.author || featuredArticle.source}</p>
                  </Link>
                )}
                {/* Secondary Article */}
                {secondaryArticle && (
                  <div className="col-span-1 flex flex-col space-y-4">
                     <Link href={`/news/${secondaryArticle.id}`} className="group block">
                        <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg shadow-lg">
                           <Image
                            src={secondaryArticle.imageUrl}
                            alt={secondaryArticle.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            data-ai-hint={secondaryArticle.dataAiHint}
                           />
                        </div>
                        <h3 className="text-lg font-bold font-headline group-hover:text-primary transition-colors">
                            {secondaryArticle.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                           {descriptionText(secondaryArticle.content)}
                        </p>
                     </Link>
                  </div>
                )}
              </div>
              {/* Quick View Sidebar */}
              <aside className="lg:col-span-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold font-headline">Xem nhanh</h3>
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link href="/news">Xem tất cả</Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {quickViewArticles.map((article) => (
                    <Link key={article.id} href={`/news/${article.id}`} className="group flex items-center space-x-4 border-b pb-3 last:border-b-0 last:pb-0">
                      <p className="flex-1 font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </p>
                      <div className="relative w-24 h-16 rounded-md overflow-hidden shrink-0">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover"
                           sizes="96px"
                           data-ai-hint={article.dataAiHint}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
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
