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

const AdBanner = () => (
  <div className="my-8 text-center">
    <Link href="#" target="_blank" rel="noopener noreferrer">
      <Image
        src="https://placehold.co/800x200.png"
        alt="Quảng cáo"
        width={800}
        height={200}
        className="mx-auto rounded-md shadow-md"
        data-ai-hint="advertisement banner"
      />
    </Link>
  </div>
);


const renderContent = (content: string) => {
  const contentParts = content.split(/(<p>.*?<\/p>|<ul>.*?<\/ul>|<h2>.*?<\/h2>|<h3>.*?<\/h3>|<blockquote>.*?<\/blockquote>)/g).filter(part => part.trim() !== '');

  const adInsertionIndex = Math.floor(contentParts.length / 2);

  const imageRegex = /\[IMAGE:(.*?)\|(.*?)\|(.*?)\]/g;

  return contentParts.flatMap((part, index) => {
    const elements = [];
    const subParts = part.split(/(\[IMAGE:.*?\])/g).filter(p => p.trim() !== '');

    subParts.forEach((subPart, subIndex) => {
        const imageMatch = subPart.match(/\[IMAGE:(.*?)\|(.*?)\|(.*?)\]/);
        if (imageMatch) {
            const [, src, alt, hint] = imageMatch;
            elements.push(
                <div key={`${index}-img-${subIndex}`} className="my-6 lg:my-8">
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
        } else if (subPart.trim().startsWith('<')) {
            elements.push(<div key={`${index}-html-${subIndex}`} dangerouslySetInnerHTML={{ __html: subPart }} />);
        } else {
            elements.push(<p key={`${index}-p-${subIndex}`}>{subPart}</p>);
        }
    });

    if (index === adInsertionIndex) {
        elements.push(<AdBanner key={`ad-${index}`} />);
    }

    return elements;
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
      setComments(fetchedComments);
    });
    return () => unsubscribe();
  }, [id]);

  const handleCommentAdded = (newComment: Comment) => {
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
  
  const latestNews = mockNews.filter(a => a.id !== article.id).slice(0, 3);


  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <article>
              <header className="mb-8">
                <Button variant="outline" size="sm" asChild className="mb-6">
                  <Link href="/news"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang Tin tức</Link>
                </Button>
                 <p className="text-sm text-primary font-semibold mb-2 uppercase">
                  {article.source}
                </p>
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
          <aside className="lg:col-span-4 mt-8 lg:mt-0 lg:sticky lg:top-24 h-fit">
             <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-headline font-bold text-primary">Tin mới nhất</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {latestNews.map(related => (
                    <Link key={related.id} href={`/news/${related.id}`} className="block group border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <div className="relative w-24 h-24 shrink-0">
                          <Image
                            src={related.imageUrl}
                            alt={related.title}
                            fill
                            className="object-cover rounded-md transition-transform group-hover:scale-105"
                            sizes="96px"
                            data-ai-hint={related.dataAiHint}
                          />
                        </div>
                        <div>
                          <p className="text-xs text-primary font-semibold mb-1 uppercase">{related.source}</p>
                          <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-3">{related.title}</h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
          </aside>
        </div>

        {/* Latest Articles */}
        <section className="mt-16 pt-12 border-t">
           <h2 className="text-3xl font-headline font-bold text-center mb-10 text-foreground">
            Các bài viết liên quan
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
