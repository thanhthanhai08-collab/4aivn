// src/app/news/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockNews } from "@/lib/mock-news";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsCard } from "@/components/news/news-card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getAuthorInitials = (name?: string) => {
  if (!name) return "";
  const names = name.split(' ');
  if (names.length > 1) {
    return names[0][0] + names[names.length - 1][0];
  }
  return name.substring(0, 2);
};


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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-[400px] w-full" />
            </div>
            <div className="lg:col-span-1 space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  const featuredArticle = mockNews.length > 0 ? mockNews[0] : null;
  const quickViewArticles = mockNews.slice(1, 4); // Next 3 articles for quick view
  const otherArticles = mockNews.slice(4); // The rest of the articles

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
        ) : mockNews.length > 0 ? (
          <div>
            {/* Top section with Featured and Quick View */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Featured Article */}
              <div className="lg:col-span-2">
                {featuredArticle && (
                  <Link href={`/news/${featuredArticle.id}`} className="group block">
                    <div className="relative w-full aspect-[16/9] mb-4 overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={featuredArticle.imageUrl}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        priority
                        data-ai-hint={featuredArticle.dataAiHint}
                      />
                    </div>
                    <p className="text-sm text-primary font-semibold mb-2">
                        {featuredArticle.source} • {format(new Date(featuredArticle.publishedAt), "d MMMM, yyyy", { locale: vi })}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold font-headline mb-3 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-base text-muted-foreground line-clamp-3">
                       {descriptionText(featuredArticle.content)}
                    </p>
                  </Link>
                )}
              </div>
              
              {/* Quick View Sidebar */}
              <aside className="lg:col-span-1 space-y-4">
                 <h3 className="text-xl font-headline font-bold text-foreground">Xem nhanh</h3>
                 {quickViewArticles.map(article => (
                   <Link key={article.id} href={`/news/${article.id}`} className="flex items-start space-x-4 group border-b pb-4 last:border-b-0 last:pb-0">
                      <Image src={article.imageUrl} alt={article.title} width={80} height={80} className="rounded-md object-cover aspect-square" data-ai-hint={article.dataAiHint} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-3">{article.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{format(new Date(article.publishedAt), "d MMM, yyyy", { locale: vi })}</p>
                      </div>
                    </Link>
                 ))}
              </aside>
            </section>
            
            <Separator className="my-12" />

            {/* Other Articles List */}
            {otherArticles.length > 0 && (
                <section>
                    <h3 className="text-3xl font-headline font-bold text-center mb-10 text-foreground">Tin tức khác</h3>
                    <div className="space-y-12 max-w-4xl mx-auto">
                      {otherArticles.map((article) => (
                          <Link key={article.id} href={`/news/${article.id}`} className="group grid md:grid-cols-3 gap-6 items-center">
                              <div className="md:col-span-1 w-full h-48 relative overflow-hidden rounded-lg shadow-md">
                                  <Image
                                      src={article.imageUrl}
                                      alt={article.title}
                                      fill
                                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                                      sizes="(max-width: 768px) 100vw, 33vw"
                                      data-ai-hint={article.dataAiHint}
                                  />
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                  <h4 className="text-xl font-bold font-headline group-hover:text-primary transition-colors line-clamp-2">
                                      {article.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                      {descriptionText(article.content)}
                                  </p>
                                   {article.author && (
                                    <div className="flex items-center space-x-2 pt-2">
                                      <Avatar className="h-8 w-8">
                                        {/* Assuming author might have a photoURL in the future */}
                                        <AvatarImage src="" alt={article.author} />
                                        <AvatarFallback>{getAuthorInitials(article.author)}</AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm font-medium text-foreground">{article.author}</span>
                                    </div>
                                  )}
                              </div>
                          </Link>
                      ))}
                    </div>
                </section>
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