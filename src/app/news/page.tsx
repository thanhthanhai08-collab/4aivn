// src/app/news/page.tsx
"use client";

import { useState, useEffect } from "react";
import { NewsCard } from "@/components/news/news-card";
import { mockNews } from "@/lib/mock-data";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";


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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
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
