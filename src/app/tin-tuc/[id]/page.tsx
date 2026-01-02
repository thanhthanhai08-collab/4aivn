// src/app/news/[id]/page.tsx
"use client";

import { useEffect, useState, Fragment, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Globe, MessageSquare, User, Bookmark, Share2 } from "lucide-react";
import type { NewsArticle, Comment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

const renderContent = (article: NewsArticle) => {
  if (!article || !article.content) return null;

  // Regex để tìm các placeholder như [CHART_1], [IMAGE:...] và các placeholder cũ
  const combinedRegex = /(\[CHART_(\d+)\]|\[IMAGE:.*?\]|\[BENCHMARK_CHART\]|\[ACTIVITIES_CHART\]|\[SATISFACTION_CHART\]|\[PROFITABILITY_CHART\]|\[NANO_BANANA_CHART\]|\[IMAGE_EDITING_CHART\]|\[BROWSER_MARKET_SHARE_CHART\]|\[AI_BROWSER_MARKET_GROWTH_CHART\]|\[AI_BROWSER_FOCUS_CHART\]|\[HUMAN_ROBOT_COLLABORATION_CHART\]|\[ATLAS_SECURITY_CHART\]|\[GPT5_V1_TOKEN_CHART\]|\[SIMA2_BENCHMARK_CHART\]|\[GEMINI_3_BENCHMARK_CHART\])/g;

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
      if (article.id === 'openai-gpt-oss-ra-mat') {
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
        <div key={`${index}-img`} className="my-6 lg:my-8">
          <Image
            src={src}
            alt={alt}
            width={750}
            height={420}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            
          />
        </div>
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
    // Use `updateDoc` to avoid creating a new document if it doesn't exist
    await updateDoc(newsDocRef, { viewCount: increment(1) });
  } catch (error) {
    if ((error as any).code === 'not-found') {
        // If the document doesn't exist, create it with a view count of 1.
        // This is a fallback, a an article should always exist to be viewed.
        await setDoc(newsDocRef, { viewCount: 1 }, { merge: true });
    } else {
        console.error("Failed to increment view count:", error);
    }
  }
}

function NewsDetailContent({ params }: { params: { id: string } }) {
  const { id } = params;
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
    const fetchArticleData = async () => {
        if (!id) return;
        
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
            
            // --- OPTIMIZED SUMMARY LOGIC ---
            if (data.summary) {
                setSummary(data.summary); // Use existing summary
            } else {
                // Generate summary if it doesn't exist
                summarizeNewsArticle({ articleContent: fetchedArticle.content })
                  .then(async (res) => {
                      const newSummary = res.summary;
                      setSummary(newSummary);
                      // Save the new summary back to Firestore
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
            
            // 1. QUERY TIN MỚI NHẤT (Loại bỏ bài hiện tại)
            const latestNewsQuery = query(
                collection(db, "news"),
                where("post", "==", true),
                orderBy("publishedAt", "desc"),
                limit(4) // Lấy dư 1 để dự phòng trường hợp trùng bài hiện tại
            );

            // 2. QUERY BÀI VIẾT LIÊN QUAN (Theo Tag)
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
                // Nếu không có tag, lấy các bài cũ hơn bài hiện tại một chút
                relatedQuery = query(
                    collection(db, "news"),
                    where("post", "==", true),
                    orderBy("publishedAt", "desc"),
                    limit(4)
                );
            }

            // Chạy cả 2 query cùng lúc để tăng tốc độ load trang
            const [latestSnapshot, relatedSnapshot] = await Promise.all([
                getDocs(latestNewsQuery),
                getDocs(relatedQuery)
            ]);

            // Xử lý dữ liệu Tin mới nhất
            const latestData = latestSnapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    publishedAt: doc.data().publishedAt.toDate().toISOString(),
                } as NewsArticle))
                .filter(item => item.id !== id) // Lọc bỏ bài đang xem
                .slice(0, 3); // Lấy đúng 3 bài

            setLatestNews(latestData);

            // Xử lý dữ liệu Bài viết liên quan
            const relatedData = relatedSnapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    publishedAt: doc.data().publishedAt.toDate().toISOString(),
                } as NewsArticle))
                .filter(item => item.id !== id) // Lọc bỏ bài đang xem
                .slice(0, 3); // Lấy đúng 3 bài

            setRelatedNews(relatedData);

        } else {
          setArticle(null); // Article not found or not posted
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
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <article>
              <header className="mb-8">
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/tin-tuc"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang Tin tức</Link>
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
                  
                />
              )}
              
              {summary ? (
                  <Card className="mb-8 bg-accent/50 border-primary/20">
                      <CardHeader>
                          <CardTitle className="text-xl font-headline">Tóm tắt nhanh</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-base text-muted-foreground">{summary}</p>
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

              <div className="text-foreground text-base md:text-lg leading-relaxed space-y-6 prose prose-lg max-w-none">
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
                <CardTitle className="flex items-center text-2xl font-headline">
                  <MessageSquare className="mr-3 h-6 w-6" /> Thảo luận ({comments.length})
                </CardTitle>
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
                    <Link key={related.id} href={`/tin-tuc/${related.id}`} className="block group border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <div className="relative w-24 h-24 shrink-0">
                          <Image
                            src={related.imageUrl}
                            alt={related.title}
                            fill
                            className="object-cover rounded-md transition-transform group-hover:scale-105"
                            sizes="96px"
                            
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
              <Card className="bg-accent/50 text-center p-6">
                  <CardTitle className="mb-2 leading-snug">Nâng cấp quy trình làm việc của bạn</CardTitle>
                  <CardDescription className="mb-4">Khám phá chatbot AI có thể cung cấp các công cụ AI phù hợp cho bạn</CardDescription>
                  <Button asChild>
                      <Link href="/tro-chuyen">Khám phá chatbot AI</Link>
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

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  return <NewsDetailContent params={params} />;
}

    