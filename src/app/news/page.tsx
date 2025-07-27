// src/app/news/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockNews } from "@/lib/mock-news";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
  const secondaryArticles = mockNews.slice(1, 3);
  const popularArticles = mockNews.slice(3, 7);
  const otherArticles = mockNews.slice(7);

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
            {/* Top section with Featured and Popular */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Main Content Area */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Featured Article */}
                {featuredArticle && (
                  <div className="md:col-span-2">
                    <Link href={`/news/${featuredArticle.id}`} className="group block">
                      <div className="relative w-full aspect-[16/9] mb-4 overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src={featuredArticle.imageUrl}
                          alt={featuredArticle.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 66vw"
                          priority
                          data-ai-hint={featuredArticle.dataAiHint}
                        />
                        <div className="absolute top-4 left-4 bg-primary/80 text-primary-foreground py-2 px-4 rounded-md font-bold text-lg tracking-wider">
                          FEATURED
                        </div>
                      </div>
                      <p className="text-sm text-primary font-semibold mb-2 uppercase">
                        {featuredArticle.source}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold font-headline mb-3 group-hover:text-primary transition-colors">
                        {featuredArticle.title}
                      </h2>
                       <p className="text-sm text-muted-foreground">
                        {format(new Date(featuredArticle.publishedAt), "d MMMM, yyyy", { locale: vi })}
                      </p>
                    </Link>
                  </div>
                )}
                {/* Secondary Articles */}
                {secondaryArticles.map(article => (
                    <div key={article.id}>
                        <Link href={`/news/${article.id}`} className="group block">
                             <div className="relative w-full aspect-[16/9] mb-4 overflow-hidden rounded-lg shadow-md">
                                <Image
                                src={article.imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                data-ai-hint={article.dataAiHint}
                                />
                            </div>
                            <p className="text-sm text-primary font-semibold mb-1 uppercase">{article.source}</p>
                             <h3 className="text-lg font-bold font-headline mb-2 group-hover:text-primary transition-colors line-clamp-3">
                                {article.title}
                            </h3>
                             <p className="text-xs text-muted-foreground">
                                {format(new Date(article.publishedAt), "d MMMM, yyyy", { locale: vi })}
                            </p>
                        </Link>
                    </div>
                ))}
              </div>

              {/* Popular Sidebar */}
              <aside className="lg:col-span-1 bg-gray-900 text-white p-6 rounded-lg shadow-xl">
                 <h3 className="text-2xl font-headline font-bold text-primary mb-6">XEM NHANH</h3>
                 <div className="space-y-5">
                    {popularArticles.map(article => (
                      <Link key={article.id} href={`/news/${article.id}`} className="block group border-b border-gray-700 pb-5 last:border-b-0 last:pb-0">
                        <div className="flex items-start space-x-4">
                            <div className="relative w-20 h-20 shrink-0">
                                <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    fill
                                    className="object-cover rounded-md"
                                    sizes="80px"
                                    data-ai-hint={article.dataAiHint}
                                />
                            </div>
                            <div>
                                <p className="text-xs text-primary font-semibold mb-1 uppercase">{article.source}</p>
                                <h4 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors line-clamp-3">{article.title}</h4>
                            </div>
                        </div>
                      </Link>
                    ))}
                 </div>
              </aside>
            </section>
            
            <Separator className="my-12" />

            {/* Other Articles List */}
            {otherArticles.length > 0 && (
                <section>
                    <h3 className="text-3xl font-headline font-bold text-center mb-10 text-foreground">Tin tức khác</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {otherArticles.map((article) => (
                          <div key={article.id} className="bg-card rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl">
                            <Link href={`/news/${article.id}`} className="group block">
                                <div className="relative w-full h-48">
                                    <Image
                                        src={article.imageUrl}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        data-ai-hint={article.dataAiHint}
                                    />
                                </div>
                                <div className="p-4">
                                     <p className="text-xs text-primary font-semibold mb-2 uppercase">{article.source}</p>
                                     <h4 className="text-lg font-bold font-headline mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {descriptionText(article.content)}
                                    </p>
                                </div>
                            </Link>
                          </div>
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
