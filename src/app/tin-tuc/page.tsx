// src/app/tin-tuc/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockNews } from "@/lib/mock-news";
import { mockNews2 } from "@/lib/mock-news2";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsListItem } from "@/components/news/news-list-item";
import { Button } from "@/components/ui/button";

const allMockNews = [...mockNews, ...mockNews2].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

const QuickViewItem = ({ article }: { article: any }) => (
    <div className="flex items-center space-x-4 group">
        <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></span>
        <div className="flex-grow">
            <Link href={`/tin-tuc/${article.id}`} className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-2">{article.title}</Link>
        </div>
        <Link href={`/tin-tuc/${article.id}`} className="flex-shrink-0 w-24">
            <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="96px"
                    data-ai-hint={article.dataAiHint || "news thumbnail"}
                />
            </div>
        </Link>
    </div>
);

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

  const featuredArticle = allMockNews.find(a => a.id === 'nvidia-gb200-profit');
  const secondaryArticle = allMockNews.find(a => a.id === 'google-ra-mat-gemini-2-5-flash-image');
  const quickViewArticles = allMockNews.filter(a => ![featuredArticle?.id, secondaryArticle?.id].includes(a.id)).slice(0, 6);
  const remainingArticles = allMockNews.filter(a => ![featuredArticle?.id, secondaryArticle?.id].includes(a.id));


  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl font-headline font-bold text-foreground">Tin tức & Cập nhật AI</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Luôn cập nhật những diễn biến mới nhất trong thế giới Trí tuệ Nhân tạo.
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Skeleton className="lg:col-span-3 h-[400px] w-full rounded-lg" />
            <div className="space-y-4">
                 {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div className="flex-grow space-y-2">
                             <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                 ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-8">
                {featuredArticle && (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        <div className="group relative rounded-lg overflow-hidden shadow-lg flex flex-col md:col-span-3">
                           <Link href={`/tin-tuc/${featuredArticle.id}`} className="block aspect-[4/3] relative">
                                <Image
                                    src={featuredArticle.imageUrl}
                                    alt={featuredArticle.title}
                                    fill
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    priority
                                />
                           </Link>
                           <div className="p-4 bg-card flex-grow flex flex-col">
                                <h2 className="text-2xl font-bold font-headline text-foreground leading-tight flex-grow">
                                     <Link href={`/tin-tuc/${featuredArticle.id}`} className="hover:text-primary transition-colors">{featuredArticle.title}</Link>
                                </h2>
                                <p className="text-sm text-muted-foreground mt-2">Bởi {featuredArticle.author}</p>
                           </div>
                        </div>
                        
                        {secondaryArticle && (
                            <div className="p-4 rounded-lg bg-card border flex flex-col justify-between md:col-span-2">
                                <div className="space-y-3">
                                     <Link href={`/tin-tuc/${secondaryArticle.id}`} className="block aspect-[16/9] relative rounded-md overflow-hidden group">
                                         <Image
                                            src={secondaryArticle.imageUrl}
                                            alt={secondaryArticle.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                         />
                                     </Link>
                                    <div>
                                        <h2 className="text-xl font-bold font-headline mb-2">
                                            <Link href={`/tin-tuc/${secondaryArticle.id}`} className="hover:text-primary">{secondaryArticle.title}</Link>
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-1">Bởi {secondaryArticle.author}</p>
                                        <p className="text-sm text-foreground/80 line-clamp-3">{secondaryArticle.content.replace(/<[^>]*>/g, "")}</p>
                                    </div>
                                </div>
                                <Button asChild variant="link" className="p-0 self-start mt-4">
                                    <Link href={`/tin-tuc/${secondaryArticle.id}`}>Đọc thêm &rarr;</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                
                {/* Remaining articles list */}
                <div className="space-y-8 pt-8 border-t">
                    {remainingArticles.map((article) => (
                        <NewsListItem key={article.id} article={article} />
                    ))}
                </div>
            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1">
                <div className="p-6 rounded-lg bg-card border sticky top-24">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold font-headline">Xem nhanh</h3>
                    </div>
                    <div className="space-y-5">
                        {quickViewArticles.map((article) => (
                            <QuickViewItem key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
