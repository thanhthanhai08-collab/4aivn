// src/app/news/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Globe } from "lucide-react";
import { mockNews } from "@/lib/mock-data";
import type { NewsArticle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { vi } from 'date-fns/locale';
import { summarizeNewsArticle } from "@/ai/flows/summarize-news-article";

export default function NewsDetailPage({ params: paramsAsPromise }: { params: { id: string } }) {
  const params = use(paramsAsPromise); 
  const { id } = params;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    const foundArticle = mockNews.find((a) => a.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      // Generate a summary if the content is long
      if (foundArticle.content.length > 200) {
        summarizeNewsArticle({ articleContent: foundArticle.content })
          .then(output => setSummary(output.summary))
          .catch(err => console.error("Failed to generate summary:", err));
      }
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container py-8 md:py-12">
          <Skeleton className="h-8 w-1/4 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
        </div>
      </AppLayout>
    );
  }

  if (!article) {
    return (
      <AppLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy bài viết</h1>
          <Button asChild variant="link" className="mt-4">
            <Link href="/news">Quay lại trang Tin tức</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container py-8 md:py-12 max-w-4xl mx-auto">
        <Button variant="outline" asChild className="mb-8">
          <Link href="/news"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang Tin tức</Link>
        </Button>
        
        <article>
          <header className="mb-8">
            <Badge variant="secondary" className="mb-2">{article.source}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">{article.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>Xuất bản vào {format(new Date(article.publishedAt), "d MMMM, yyyy", { locale: vi })}</span>
            </div>
          </header>

          {article.imageUrl && (
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={800}
              height={450}
              className="rounded-lg shadow-lg mb-8 w-full object-cover"
              data-ai-hint={article.dataAiHint || "technology abstract"}
            />
          )}
          
          {summary && (
              <Card className="mb-8 bg-accent/50 border-primary/20">
                  <CardHeader>
                      <CardTitle className="text-xl font-headline">Tóm tắt nhanh</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-base text-muted-foreground">{summary}</p>
                  </CardContent>
              </Card>
          )}


          <div className="text-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
            {article.content}
          </div>

          <footer className="mt-12 pt-6 border-t">
              <p className="text-sm text-muted-foreground">Đọc bài viết gốc tại:</p>
              <Button asChild variant="link" className="p-0 h-auto text-base">
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                    {article.source} <Globe className="ml-2 h-4 w-4" />
                </a>
              </Button>
          </footer>
        </article>
      </div>
    </AppLayout>
  );
}