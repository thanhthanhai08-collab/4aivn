// src/app/[id]/page.tsx
"use client";

import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Globe, MessageSquare, User, Bookmark, Share2 } from "lucide-react";
import type { NewsArticle, Comment } from "@/lib/types";
import { Button } from "@/components/ui/button";
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
import { GptOssBenchmarkChart } from "@/components/news/gpt-oss-benchmark-chart";
import { AiVietUsageChart } from "@/components/news/ai-viet-usage-chart";
import { AiActivitiesChart } from "@/components/news/AiActivitiesChart";
import { toggleNewsBookmark, getUserProfileData } from "@/lib/user-data-service";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AiSatisfactionChart } from "@/components/news/AiSatisfactionChart";
import { ProfitabilityChart } from "@/components/news/ProfitabilityChart";
import { GeminiFlashImageBenchmarkChart } from "@/components/news/gemini-flash-image-benchmark-chart";
import { ImageEditingBenchmarkChart } from "@/components/news/image-editing-benchmark-chart";
import { BrowserMarketShareChart } from "@/components/news/browser-market-share-chart";
import { AiBrowserMarketGrowthChart } from "@/components/news/ai-browser-market-growth-chart";
import { AiBrowserFocusChart } from "@/components/news/ai-browser-focus-chart";
import { HumanRobotCollaborationChart } from "@/components/news/human-robot-collaboration-chart";
import { AtlasSecurityBenchmarkChart } from "@/components/news/atlas-security-benchmark-chart";
import { Gpt5V1TokenChart } from "@/components/news/Gpt5V1TokenChart";
import { Sima2BenchmarkChart } from "@/components/news/Sima2BenchmarkChart";
import { Gemini3BenchmarkChart } from "@/components/news/Gemini3BenchmarkChart";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DynamicChart } from "@/components/news/charts/DynamicChart";
import { useParams } from "next/navigation";

const renderContent = (article: NewsArticle) => {
  if (!article || !article.content) return null;

  // Regex to find placeholders like [CHART_1], [IMAGE:...] and legacy placeholders
  const combinedRegex = /(\[CHART_(?:\d+)\]|\[IMAGE:.*?\]|\[BENCHMARK_CHART\]|\[ACTIVITIES_CHART\]|\[SATISFACTION_CHART\]|\[PROFITABILITY_CHART\]|\[NANO_BANANA_CHART\]|\[IMAGE_EDITING_CHART\]|\[BROWSER_MARKET_SHARE_CHART\]|\[AI_BROWSER_MARKET_GROWTH_CHART\]|\[AI_BROWSER_FOCUS_CHART\]|\[HUMAN_ROBOT_COLLABORATION_CHART\]|\[ATLAS_SECURITY_CHART\]|\[GPT5_V1_TOKEN_CHART\]|\[SIMA2_BENCHMARK_CHART\]|\[GEMINI_3_BENCHMARK_CHART\])/g;

  const parts = article.content.split(combinedRegex).filter(part => part);

  return parts.map((part, index) => {
    const chartMatch = part.match(/^\[CHART_(\d+)\]$/);
    if (chartMatch) {
      const chartIndex = parseInt(chartMatch[1], 10) - 1; // [CHART_1] -> index 0
      const chartConfig = article.charts?.[chartIndex];
      if (chartConfig) {
        return <DynamicChart key={`${article.id}-chart-${chartIndex}`} config={chartConfig} />;
      }
      return null;
    }
    
    if (part === '[GEMINI_3_BENCHMARK_CHART]') {
      return <Gemini3BenchmarkChart key={`${index}-gemini3-chart`} />;
    }
    if (part === '[SIMA2_BENCHMARK_CHART]') {
      return <Sima2BenchmarkChart key={`${index}-sima2-chart`} />;
    }
    if (part === '[GPT5_V1_TOKEN_CHART]') {
      return <Gpt5V1TokenChart key={`${index}-gpt5-token-chart`} />;
    }
    if (part === '[ATLAS_SECURITY_CHART]') {
      return <AtlasSecurityBenchmarkChart key={`${index}-atlas-security-chart`} />;
    }
    if (part === '[HUMAN_ROBOT_COLLABORATION_CHART]') {
      return <HumanRobotCollaborationChart key={`${index}-human-robot-chart`} />;
    }
    if (part === '[AI_BROWSER_FOCUS_CHART]') {
      return <AiBrowserFocusChart key={`${index}-ai-browser-focus-chart`} />;
    }
    if (part === '[BROWSER_MARKET_SHARE_CHART]') {
      return <BrowserMarketShareChart key={`${index}-browser-chart`} />;
    }
    if (part === '[AI_BROWSER_MARKET_GROWTH_CHART]') {
      return <AiBrowserMarketGrowthChart key={`${index}-market-growth-chart`} />;
    }
    if (part === '[BENCHMARK_CHART]') {
      if (article.id === 'openai-mo-cua-ai-voi-gpt-oss-ma-nguon-mo') {
        return <GptOssBenchmarkChart key={`${index}-chart`} />;
      }
      if (article.id === 'ai-viet-2025-bao-cao') {
        return <AiVietUsageChart key={`${index}-chart`} />;
      }
      return null;
    }
    
    if (part === '[ACTIVITIES_CHART]') {
        if (article.id === 'ai-viet-2025-bao-cao') {
            return <AiActivitiesChart key={`${index}-activities-chart`} />;
        }
        return null;
    }
    
    if (part === '[SATISFACTION_CHART]') {
        if (article.id === 'ai-viet-2025-bao-cao') {
            return <AiSatisfactionChart key={`${index}-satisfaction-chart`} />;
        }
        return null;
    }

    if (part === '[PROFITABILITY_CHART]') {
        if (article.id === 'sieu-loi-nhuan-cho-nvidia-voi-may-chu-ai-nvidia-gb200-nvl72') {
            return <ProfitabilityChart key={`${index}-profit-chart`} />;
        }
        return null;
    }
    
    if (part === '[NANO_BANANA_CHART]') {
        if (article.id === 'google-ra-mat-gemini-2-5-flash-image') {
            return <GeminiFlashImageBenchmarkChart key={`${index}-gemini-chart`} />;
        }
        return null;
    }
    
    if (part === '[IMAGE_EDITING_CHART]') {
        if (article.id === 'google-ra-mat-gemini-2-5-flash-image') {
            return <ImageEditingBenchmarkChart key={`${index}-image-edit-chart`} />;
        }
        return null;
    }

    const imageMatch = part.match(/^\[IMAGE:(.*?)\|(.*?)\|(.*?)\]$/);
    if (imageMatch) {
      const [, src, alt, hint] = imageMatch;
      return (
        // Thêm class 'not-prose' để đảm bảo Tailwind Typography không can thiệp linh tinh
        <figure key={`${index}-img`} className="not-prose w-full my-6 lg:my-8
     flex flex-col items-center justify-center">
          
          {/* Container cho ảnh */}
          <div className="relative w-full"> 
            <Image
              src={src}
              alt={alt}
              width={750}
              height={420}
              className="rounded-lg shadow-lg w-full h-auto object-cover border border-border/50" 
            />
          </div>
    
          {/* Container cho chú thích (chỉ hiện khi có nội dung) */}
          {hint && hint.trim() !== "" && (
            <figcaption className="mt-4 text-center text-base text-muted-foreground italic leading-relaxed max-w-[90%] mx-auto">
              {hint}
            </figcaption>
          )}
        </figure>
      );
    }
    
    const trimmedPart = part.trim();
    if (trimmedPart.startsWith('<') || trimmedPart.includes('</p>') || trimmedPart.includes('</h')) {
      return <div key={`${index}-html`} dangerouslySetInnerHTML={{ __html: trimmedPart }} />;
    } else if (trimmedPart) {
      return trimmedPart.split('\n').map((line, lineIndex) => (
        line.trim() ? <p key={`${index}-p-${lineIndex}`}>{line}</p> : null
      )).filter(Boolean);
    }
    
    return null;
  });
};

async function incrementNewsViewCount(newsId: string): Promise<void> {
  if (!newsId) return;
  const newsDocRef = doc(db, "news", newsId);
  try {
    await updateDoc(newsDocRef, { viewCount: increment(1) });
  } catch (error) {
    if ((error as any).code === 'not-found') {
        await setDoc(newsDocRef, { viewCount: 1 }, { merge: true });
    } else {
        console.error("Failed to increment view count:", error);
    }
  }
}

function NewsDetailContent() {
  const params = useParams();
  const id = params.id as string;
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !id) {
        setIsLoading(false);
        return;
    }

    const fetchArticleData = async () => {
        incrementNewsViewCount(id);

        setIsLoading(true);
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().post === true) {
            const data = docSnap.data();
            const fetchedArticle = {
                id: docSnap.id,
                ...data,
                publishedAt: data.publishedAt.toDate().toISOString(),
            } as NewsArticle;

            setArticle(fetchedArticle);
            
            if (data.summary) {
                setSummary(data.summary);
            } else {
                summarizeNewsArticle({ articleContent: fetchedArticle.content })
                  .then(async (res) => {
                      const newSummary = res.summary;
                      setSummary(newSummary);
                      try {
                          await updateDoc(docRef, { summary: newSummary });
                      } catch (updateError) {
                          console.error("Failed to save summary:", updateError);
                      }
                  })
                  .catch(err => console.error("Error summarizing article:", err));
            }

            if (currentUser) {
                getUserProfileData(currentUser.uid).then(userData => {
                    setIsBookmarked(userData.bookmarkedNews?.includes(id) || false);
                });
            }
            
            const latestNewsQuery = query(
                collection(db, "news"),
                where("post", "==", true),
                orderBy("publishedAt", "desc"),
                limit(4)
            );

            let relatedQuery;
            if (fetchedArticle.tag && fetchedArticle.tag.length > 0) {
                relatedQuery = query(
                    collection(db, "news"),
                    where("post", "==", true),
                    where("tag", "array-contains-any", fetchedArticle.tag),
                    orderBy("publishedAt", "desc"),
                    limit(4) 
                );
            } else {
                relatedQuery = query(
                    collection(db, "news"),
                    where("post", "==", true),
                    orderBy("publishedAt", "desc"),
                    limit(4)
                );
            }

            const [latestSnapshot, relatedSnapshot] = await Promise.all([
                getDocs(latestNewsQuery),
                getDocs(relatedQuery)
            ]);

            const latestData = latestSnapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    publishedAt: doc.data().publishedAt.toDate().toISOString(),
                } as NewsArticle))
                .filter(item => item.id !== id)
                .slice(0, 3);

            setLatestNews(latestData);

            const relatedData = relatedSnapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    publishedAt: doc.data().publishedAt.toDate().toISOString(),
                } as NewsArticle))
                .filter(item => item.id !== id)
                .slice(0, 3);

            setRelatedNews(relatedData);

        } else {
          setArticle(null);
        }
        setIsLoading(false);
    };

    fetchArticleData();
  }, [id, currentUser]);

  useEffect(() => {
    if (!id) return;
    const unsubscribe = getComments(id, (fetchedComments) => {
      setComments(fetchedComments);
    });
    return () => unsubscribe();
  }, [id]);
  
  const handleBookmarkToggle = async () => {
    if (!currentUser) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để lưu tin tức.", variant: "destructive" });
      return;
    }
    
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);

    try {
      await toggleNewsBookmark(currentUser.uid, id, isBookmarked);
      toast({ title: newBookmarkState ? "Đã lưu tin tức thành công" : "Đã xóa khỏi tin tức đã lưu" });
    } catch (error) {
      console.error("Failed to update bookmark:", error);
      setIsBookmarked(!newBookmarkState);
      toast({ title: "Lỗi", description: "Không thể cập nhật tin tức đã lưu.", variant: "destructive" });
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Đã sao chép liên kết",
        description: "Liên kết đến trang này đã được sao chép vào bộ nhớ tạm.",
      });
    }).catch(err => {
      console.error('Failed to copy link: ', err);
      toast({
        title: "Lỗi",
        description: "Không thể sao chép liên kết.",
        variant: "destructive",
      });
    });
  };

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
          <p className="text-muted-foreground">Bài viết này có thể không tồn tại hoặc chưa được xuất bản.</p>
          <Button asChild variant="link" className="mt-4">
            <Link href="/tin-tuc">Quay lại trang Tin tức</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        {article && (
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm font-medium overflow-x-auto scrollbar-hide pb-2 hidden">
              <ol className="flex items-center text-muted-foreground whitespace-nowrap">
                <li className="flex items-center">
                  <Link href="/" className="hover:text-primary transition-colors">
                    Trang chủ
                  </Link>
                </li>
                
                <li className="flex items-center before:content-['/'] before:mx-2 before:text-muted-foreground/30">
                  <Link href="/tin-tuc" className="hover:text-primary transition-colors">
                    Tin tức
                  </Link>
                </li>

                {article.category && article.category.length > 0 && (
                  <li className="flex items-center before:content-['/'] before:mx-2 before:text-muted-foreground/30">
                    <Link 
                      href={`/tin-tuc/${article.category[0].id}`} 
                      className="hover:text-primary transition-colors"
                    >
                      {article.category[0].name}
                    </Link>
                  </li>
                )}

                <li className="flex items-center before:content-['/'] before:mx-2 before:text-muted-foreground/30">
                  <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-md">
                    {article.title}
                  </span>
                </li>
              </ol>
            </nav>
        )}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <article>
              <header className="mb-8">
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/tin-tuc"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang tin tức</Link>
                    </Button>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" onClick={handleBookmarkToggle}>
                            <Bookmark className={cn("mr-2 h-4 w-4", isBookmarked && "fill-primary text-primary")} />
                            {isBookmarked ? "Đã lưu" : "Lưu tin tức"}
                        </Button>
                        <Button variant="outline" onClick={handleShare}>
                            <Share2 className="mr-2 h-4 w-4" /> Chia sẻ
                        </Button>
                    </div>
                 </div>
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
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              )}
              
              {summary ? (
                  <Card className="mb-8 bg-accent/50 border-primary/20">
                      <CardHeader>
                          <h2 className="text-2xl font-headline font-bold">Tóm tắt nhanh</h2>
                      </CardHeader>
                      <CardContent>
                          <p className="text-lg text-muted-foreground">{summary}</p>
                      </CardContent>
                  </Card>
              ) : (
                <div className="mb-8 p-6 bg-accent/50 border-primary/20 rounded-lg">
                    <Skeleton className="h-5 w-1/3 mb-4"/>
                    <Skeleton className="h-4 w-full mb-2"/>
                    <Skeleton className="h-4 w-full mb-2"/>
                    <Skeleton className="h-4 w-3/4"/>
                </div>
              )}

              <div className="text-foreground text-lg leading-relaxed space-y-6 prose prose-lg max-w-none">
                {renderContent(article)}
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

            <Card className="mt-12">
              <CardHeader>
                <h2 className="flex items-center text-2xl font-headline font-bold">
                  <MessageSquare className="mr-3 h-6 w-6" /> Thảo luận ({comments.length})
                </h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentUser ? (
                  <CommentForm articleId={id} onCommentAdded={handleCommentAdded} />
                ) : (
                  <div className="text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-md">
                    <Link href="/dang-nhap" className="font-semibold text-primary hover:underline">Đăng nhập</Link> để tham gia thảo luận.
                  </div>
                )}
                <Separator />
                <CommentList comments={comments} />
              </CardContent>
            </Card>
          </div>

          <aside className="lg:col-span-4 mt-8 lg:mt-0 lg:sticky lg:top-24 h-fit space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline font-bold text-primary">Tin mới nhất</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {latestNews.map((related) => (
                  <Link key={related.id} href={`/${related.id}`} className="block group border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start space-x-4">
                      <div className="relative w-24 aspect-video shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={related.imageUrl}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-110 duration-300"
                          sizes="96px"
                        />
                      </div>
                      
                      <div className="flex flex-col justify-between">
                        <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-3 mb-2">
                          {related.title}
                        </h4>
                        
                        <div className="flex items-center text-[11px] text-muted-foreground mt-auto">
                          <CalendarDays className="mr-1 h-3 w-3" />
                          <span>
                            {format(new Date(related.publishedAt), "dd/MM/yyyy", { locale: vi })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
              <Card className="bg-accent/50 text-center p-6">
                  <h3 className="text-xl font-bold mb-2 leading-snug text-foreground">Khám phá bảng xếp hạng</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Giúp bạn so sánh các model, công cụ AI trực quan nhất</p>
                  <Button asChild>
                      <Link href="/bang-xep-hang">Khám phá</Link>
                  </Button>
              </Card>
          </aside>
        </div>

        {relatedNews.length > 0 && (
          <section className="mt-16 pt-12 border-t">
            <h2 className="text-3xl font-headline font-bold text-center mb-10 text-foreground">
              Các bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}
      </div>
    </AppLayout>
  );
}

export default function NewsDetailPage() {
  return <NewsDetailContent />;
}
