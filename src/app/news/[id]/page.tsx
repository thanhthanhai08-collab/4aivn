// src/app/news/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Globe, MessageSquare, User } from "lucide-react";
import { mockNews } from "@/lib/mock-news";
import type { NewsArticle, Comment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { vi } from 'date-fns/locale';
import { summarizeNewsArticle } from "@/ai/flows/summarize-news-article";
import { NewsCard } from "@/components/news/news-card";
import { useAuth } from "@/contexts/auth-context";
import { getComments } from "@/lib/comments-service";
import { CommentForm } from "@/components/news/comment-form";
import { CommentList } from "@/components/news/comment-list";
import { Separator } from "@/components/ui/separator";

const renderContent = (content: string) => {
  const contentParts = content.split(/(\[IMAGE:.*?\])/g).filter(part => part.trim() !== '');

  return contentParts.map((part, index) => {
    const imageMatch = part.match(/\[IMAGE:(.*?)\|(.*?)\|(.*?)\]/);
    if (imageMatch) {
      const [, src, alt, hint] = imageMatch;
      return (
        <div key={index} className="my-6 lg:my-8">
          <Image
            src={src}
            alt={alt}
            width={750}
            height={420}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            data-ai-hint={hint}
          />
        </div>
      );
    }
    
    if (part.trim().startsWith('<')) {
      return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    }
    
    return <p key={index}>{part}</p>;
  });
};


export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { currentUser } = useAuth();

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const foundArticle = mockNews.find((a) => a.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      if (foundArticle.content.length > 200) {
        summarizeNewsArticle({ articleContent: foundArticle.content.replace(/\[IMAGE:.*?\]/g, '') })
          .then(output => setSummary(output.summary))
          .catch(err => console.error("Failed to generate summary:", err));
      }
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const unsubscribe = getComments(id, (fetchedComments) => {
      // When real-time data arrives, it becomes the source of truth,
      // automatically replacing any optimistic updates.
      setComments(fetchedComments);
    });
    return () => unsubscribe();
  }, [id]);

  const handleCommentAdded = (newComment: Comment) => {
    // Optimistically add the new comment to the list for instant UI feedback.
    setComments(prevComments => [newComment, ...prevComments]);
  };

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
  
  const relatedNews = mockNews.filter(a => a.id !== article.id).slice(0, 5);
  const latestNews = mockNews.filter(a => a.id !== article.id).slice(0, 3);


  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article>
              <header className="mb-8">
                <Button variant="outline" size="sm" asChild className="mb-6">
                  <Link href="/news"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang Tin tức</Link>
                </Button>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">{article.title}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    {article.author && (
                      <div className="flex items-center">
                        <User className="mr-1.5 h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                    )}
                   <div className="flex items-center">
                     <CalendarDays className="mr-2 h-4 w-4" />
                     <span>Xuất bản vào {format(new Date(article.publishedAt), "d MMMM, yyyy", { locale: vi })}</span>
                   </div>
                </div>
              </header>

              {article.imageUrl && (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={800}
                  height={450}
                  className="rounded-lg shadow-lg mb-8 w-full object-cover"
                  priority
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

              <div className="text-foreground text-base md:text-lg leading-relaxed space-y-6 prose prose-lg max-w-none">
                {renderContent(article.content)}
              </div>

              <footer className="mt-12 pt-6 border-t">
                  {article.link && (
                    <div className="flex items-center space-x-1">
                      <p className="text-sm text-muted-foreground">Nguồn:</p>
                      <Button asChild variant="link" className="p-0 h-auto text-base">
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                            {article.source} <Globe className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  )}
              </footer>
            </article>

            {/* Comments Section */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-headline">
                  <MessageSquare className="mr-3 h-6 w-6" /> Thảo luận ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentUser ? (
                  <CommentForm articleId={id} onCommentAdded={handleCommentAdded} />
                ) : (
                  <div className="text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-md">
                    <Link href="/login" className="font-semibold text-primary hover:underline">Đăng nhập</Link> để tham gia thảo luận.
                  </div>
                )}
                <Separator />
                <CommentList comments={comments} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-24 h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-headline">Tin tức nổi bật</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 {relatedNews.map(related => (
                  <Link key={related.id} href={`/news/${related.id}`} className="flex items-center space-x-4 group border-b pb-4 last:border-b-0 last:pb-0">
                    <Image src={related.imageUrl} alt={related.title} width={64} height={64} className="rounded-md object-cover aspect-square" data-ai-hint={related.dataAiHint} />
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">{related.title}</h3>
                  </Link>
                ))}
              </CardContent>
            </Card>
             <Card className="p-4 text-center bg-muted/30">
                <p className="text-sm text-muted-foreground">Không gian quảng cáo</p>
                <div className="w-full h-64 bg-muted rounded-md mt-2 flex items-center justify-center">
                    <span className="text-muted-foreground/50">300x250</span>
                </div>
            </Card>
          </aside>
        </div>

        {/* Latest Articles */}
        <section className="mt-16 pt-12 border-t">
           <h2 className="text-3xl font-headline font-bold text-center mb-10 text-foreground">
            Các bài viết mới nhất
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
