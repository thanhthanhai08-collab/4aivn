// src/app/models/[id]/page.tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star, Heart, CheckCircle, ArrowLeft, Share2, CalendarDays, BrainCircuit, Code, BookOpen, User, DollarSign, Zap, Timer, Layers } from "lucide-react";
import type { AIModel, NewsArticle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { AppLayout } from "@/components/layout/app-layout";
import { generateAiModelDescription } from "@/ai/flows/ai-model-description-generator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  setModelRating,
  toggleModelFavorite,
  getUserProfileData,
  getAggregateRating
} from "@/lib/user-data-service";
import { O3PerformanceInsightsChart } from "@/components/models/o3-performance-insights-chart";
import { O3DetailedBenchmarkCharts } from "@/components/models/o3-detailed-benchmark-charts";
import { NewsCard } from "@/components/news/news-card";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where, type Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";


function ModelDetailContent({ id }: { id: string }) {
  const [model, setModel] = useState<AIModel | null>(null);
  const [allModels, setAllModels] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [aggregateRating, setAggregateRating] = useState({ totalStars: 0, ratingCount: 0 });
  const [enhancedDescription, setEnhancedDescription] = useState<string | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const modelsSnapshot = await getDocs(collection(db, 'models'));
        const modelsList = modelsSnapshot.docs.map(doc => {
            const data = doc.data();
            const releaseDateTimestamp = data.releaseDate as Timestamp;
            return { 
                id: doc.id, 
                ...data,
                releaseDate: releaseDateTimestamp ? releaseDateTimestamp.toDate().toLocaleDateString('vi-VN') : undefined,
            } as AIModel
        });
        setAllModels(modelsList);
      } catch (error) {
        console.error("Error fetching all models:", error);
      }
    };
    fetchModels();
  }, []);

  useEffect(() => {
    if (allModels.length === 0) return;

    const foundModel = allModels.find((m) => m.id === id);
    
    if (foundModel) {
      setModel(foundModel);

      // Fetch related news from Firestore
      const fetchRelatedNews = async () => {
          const newsQuery = query(
              collection(db, "news"),
              where('title', '>=', foundModel.name),
              where('title', '<=', foundModel.name + '\uf8ff'),
              limit(3)
          );
          const newsSnapshot = await getDocs(newsQuery);
          const newsData = newsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              publishedAt: doc.data().publishedAt.toDate().toISOString(),
          } as NewsArticle));
          setRelatedNews(newsData);
      };
      
      fetchRelatedNews();


      if (currentUser) {
        getUserProfileData(currentUser.uid).then(userData => {
          setIsFavorite(userData.favoriteModels?.includes(id) || false);
          setCurrentRating(userData.ratedModels?.[id] || 0);
        });
      }

      getAggregateRating("models", id).then(setAggregateRating);

      if (foundModel.description && foundModel.description.length < 100 && foundModel.description.length > 0 && id !== 'gemini-2.5-pro') {
        generateAiModelDescription({ 
            name: foundModel.name, 
            type: foundModel.type, 
            developer: foundModel.developer,
            link: foundModel.link 
        })
          .then(output => setEnhancedDescription(output.description))
          .catch(err => console.error("Failed to generate AI model description:", err));
      }
    }
    setIsLoading(false);
  }, [id, currentUser, allModels]);

  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để lưu mục yêu thích.", variant: "destructive" });
      return;
    }
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState); 

    try {
        await toggleModelFavorite(currentUser.uid, id, isFavorite);
        toast({ title: newFavoriteState ? "Đã thêm vào Yêu thích" : "Đã xóa khỏi Yêu thích" });
    } catch (error) {
        console.error("Failed to update favorite status:", error);
        setIsFavorite(!newFavoriteState); 
        toast({ title: "Lỗi", description: "Không thể cập nhật mục yêu thích.", variant: "destructive" });
    }
  };

  const handleRating = async (rating: number) => {
    if (!currentUser || !model) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để đánh giá model.", variant: "destructive" });
      return;
    }

    const oldRating = currentRating;
    const oldAggregate = { ...aggregateRating };

    setCurrentRating(rating);
    setAggregateRating(prev => {
        let newTotalStars = prev.totalStars - oldRating + rating;
        let newRatingCount = prev.ratingCount;
        if(oldRating === 0) {
            newRatingCount += 1;
        }
        return { totalStars: newTotalStars, ratingCount: newRatingCount };
    });

    try {
      await setModelRating(currentUser.uid, model.id, rating);
      toast({ title: "Đã gửi đánh giá", description: `Bạn đã đánh giá ${model.name} ${rating} sao.` });
    } catch(error) {
      console.error("Failed to save rating:", error);
      setCurrentRating(oldRating); 
      setAggregateRating(oldAggregate);
      toast({ title: "Lỗi", description: "Không thể lưu đánh giá của bạn.", variant: "destructive" });
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


  if (isLoading) {
    return (
      <AppLayout>
        <div className="container py-8">
          <Skeleton className="h-8 w-1/4 mb-4" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="h-16 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <Skeleton className="h-48 w-full mb-6" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!model) {
    return (
      <AppLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy model AI</h1>
          <Button asChild variant="link" className="mt-4">
            <Link href="/bang-xep-hang">Quay lại Bảng xếp hạng</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const averageRating = aggregateRating.ratingCount > 0 ? (aggregateRating.totalStars / aggregateRating.ratingCount) : 0;
  
  // Specific layout for some models
  if (['openai-o3', 'grok-4', 'qwen3-next-80b-a3b-reasoning', 'gemini-2.5-pro', 'gpt-5-mini-medium', 'gpt-5-high', 'qwen3-235b-reasoning', 'gpt-5-medium', 'deepseek-r1-jan25', 'deepseek-v3.1-terminus-reasoning', 'gemini-2.5-flash-reasoning', 'gpt-5-low', 'gpt-oss-120b-high', 'gpt-5-nano-high', 'claude-4.5-haiku-thinking', 'claude-4.5-sonnet', 'claude-4.5-sonnet-thinking', 'grok-3-mini-reasoning-high', 'grok-4-fast-reasoning', 'seed-oss-36b-instruct', 'llama-nemotron-super-49b-v1-5-reasoning', 'gpt-oss-20b-high', 'gpt-5-codex-high', 'qwen3-max', 'deepseek-v3.2-exp', 'qwen3-vl-235b-a22b-reasoning', 'claude-4.1-opus-thinking', 'gpt-5-nano-medium', 'gemini-3-pro', 'gpt-5-1-high', 'grok-4.1-fast-reasoning', 'gpt-5-mini-high'].includes(model.id)) {
    return (
      <AppLayout>
        <div className="container py-8 md:py-12">
            <div className="grid md:grid-cols-3 gap-8 items-start mb-8">
                <div className="md:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="flex items-center space-x-4">
                                <Image src={model.logoUrl} alt={`${model.name} logo`} width={64} height={64} className="rounded-lg" data-ai-hint="logo company" />
                                <div>
                                    <h1 className="text-3xl font-bold font-headline">{model.name}</h1>
                                    <p className="text-muted-foreground">{model.developer}</p>
                                </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                <Button variant="outline" onClick={handleFavoriteToggle}>
                                    <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                                    {isFavorite ? "Đã thích" : "Yêu thích"}
                                </Button>
                                <Button variant="outline" onClick={handleShare}>
                                    <Share2 className="mr-2 h-4 w-4" /> Chia sẻ
                                </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground max-w-4xl whitespace-pre-line">{model.description}</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-1 space-y-6 md:sticky md:top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-headline">Đánh giá model này</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => handleRating(star)} aria-label={`Đánh giá ${star} sao`} className="group">
                                <Star
                                    className={`h-7 w-7 cursor-pointer transition-all duration-200 group-hover:fill-amber-300 group-hover:text-amber-400 ${
                                    star <= currentRating ? "fill-amber-400 text-amber-500" : "text-gray-300"
                                    }`}
                                />
                                </button>
                            ))}
                            </div>
                             <p className="text-sm text-muted-foreground">Đánh giá của bạn: {currentRating > 0 ? `${currentRating} sao` : "Chưa đánh giá"}</p>
                            {averageRating > 0 && <p className="text-sm text-muted-foreground mt-1">Trung bình: {averageRating.toFixed(1)} sao ({aggregateRating.ratingCount} đánh giá)</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <div className="space-y-12">
                 {/* Specifications */}
                <Card>
                    <CardHeader>
                    <CardTitle>Thông số mô hình</CardTitle>
                    <CardDescription>Thông tin kỹ thuật và phiên bản được phát hành.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
                        <div className="flex items-start space-x-3">
                            <User className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <p className="font-semibold">Nhà phát triển</p>
                                <p className="text-muted-foreground">{model.developer}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Layers className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <p className="font-semibold">Hỗ trợ đa phương thức</p>
                                <p className="text-muted-foreground">{model.multimodal ? 'Có' : 'Không'}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <BrainCircuit className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <p className="font-semibold">Chỉ số thông minh</p>
                                <p className="text-muted-foreground">{model.intelligenceScore}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <BookOpen className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <p className="font-semibold">Độ dài ngữ cảnh (Context window)</p>
                                <p className="text-muted-foreground">{model.contextLengthToken}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <DollarSign className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <p className="font-semibold">Giá trung bình (USD/1M token)</p>
                                <p className="text-muted-foreground">${model.pricePerMillionTokens?.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Zap className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <p className="font-semibold">Tốc độ (token/s)</p>
                                <p className="text-muted-foreground">{model.speedTokensPerSecond?.toFixed(1) || 'N/A'}</p>
                            </div>
                        </div>
                         <div className="flex items-start space-x-3">
                            <Timer className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <p className="font-semibold">Độ trễ (s)</p>
                                <p className="text-muted-foreground">{model.latencyFirstChunkSeconds?.toFixed(2) || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CalendarDays className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <p className="font-semibold">Ngày phát hành</p>
                                <p className="text-muted-foreground">{model.releaseDate || 'N/A'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                 {model.benchmarks && model.benchmarks.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold font-headline mb-2">Thống kê hiệu suất</h2>
                        <p className="text-muted-foreground mb-6">Chỉ số thông minh của model sẽ được tính trung bình của các điểm benchmark này</p>
                        <O3PerformanceInsightsChart benchmarkData={model.benchmarks} />
                    </section>
                 )}
                
                <section>
                <h2 className="text-2xl font-bold font-headline mb-2">Điểm chuẩn chi tiết</h2>
                <p className="text-muted-foreground mb-6">So sánh {model.name} với các mô hình hàng đầu khác trong các lĩnh vực cụ thể.</p>
                 <O3DetailedBenchmarkCharts modelId={model.id} allModels={allModels} />
                </section>

                {relatedNews.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold font-headline mb-6 text-center">Bài viết liên quan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {relatedNews.map((article) => (
                        <NewsCard key={article.id} article={article} />
                      ))}
                    </div>
                  </section>
                )}
            </div>
        </div>
      </AppLayout>
    );
  }

  // Default layout for other models
  const descriptionToDisplay = enhancedDescription || model.description;

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Button variant="outline" asChild className="mb-6">
          <Link href="/bang-xep-hang"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại Bảng xếp hạng</Link>
        </Button>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Image src={model.logoUrl} alt={`Logo ${model.name}`} width={64} height={64} className="rounded-lg" data-ai-hint="logo company" />
                    <div>
                      <CardTitle className="text-3xl font-headline">{model.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{model.type}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                     <Button variant="outline" onClick={handleFavoriteToggle} aria-label={isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"} className="flex-grow sm:flex-grow-0">
                       <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                       {isFavorite ? "Đã thích" : "Yêu thích"}
                     </Button>
                     <Button variant="outline" onClick={handleShare} className="flex-grow sm:flex-grow-0">
                       <Share2 className="mr-2 h-4 w-4" /> Chia sẻ
                     </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed whitespace-pre-line">{descriptionToDisplay}</CardDescription>
              </CardContent>
            </Card>
            
            {model.features && model.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">Tính năng chính</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {model.features.map((feature, index) => {
                      const isSubItem = feature.startsWith("• ");
                      return (
                        <li key={index} className="flex items-start">
                          {!isSubItem ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          ) : (
                            <div className="w-[1.75rem] shrink-0"></div>
                          )}
                          <span className="text-card-foreground">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6 md:sticky md:top-24">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-headline">Đánh giá Model này</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => handleRating(star)} aria-label={`Đánh giá ${star} sao`}>
                      <Star
                        className={`h-7 w-7 cursor-pointer transition-colors ${
                          star <= currentRating ? "fill-amber-400 text-amber-500" : "text-gray-300 hover:text-amber-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Đánh giá của bạn: {currentRating > 0 ? `${currentRating} sao` : "Chưa đánh giá"}</p>
                {averageRating > 0 && <p className="text-sm text-muted-foreground mt-1">Trung bình: {averageRating.toFixed(1)} sao ({aggregateRating.ratingCount} đánh giá)</p>}
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Chi tiết</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Nhà phát triển:</span>
                        <span>{model.developer}</span>
                    </div>
                     <Separator />
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Loại Model:</span>
                        <Badge variant="outline">{model.type}</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Đa phương thức:</span>
                        <span>{model.multimodal ? 'Có' : 'Không'}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Ngày phát hành:</span>
                        <span>{model.releaseDate || 'N/A'}</span>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// This is the Server Component that fetches the ID and passes it to the Client Component.
export default function ModelDetailPage({ params }: { params: { id: string } }) {
  return <ModelDetailContent id={params.id} />;
}
