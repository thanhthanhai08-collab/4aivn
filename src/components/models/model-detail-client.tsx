"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ArrowLeft, Share2, CalendarDays, BrainCircuit, BookOpen, User, DollarSign, Zap, Timer, Layers } from "lucide-react";
import type { AIModel, NewsArticle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { AppLayout } from "@/components/layout/app-layout";
import { useToast } from "@/hooks/use-toast";
import {
  setModelRating,
  toggleModelFavorite,
  getUserProfileData,
} from "@/lib/user-data-service";
import { O3PerformanceInsightsChart } from "@/components/models/o3-performance-insights-chart";
import { O3DetailedBenchmarkCharts } from "@/components/models/o3-detailed-benchmark-charts";
import { NewsListItem } from "@/components/news/news-list-item";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ModelCard } from "@/components/models/model-card";

// Helper function to format context length for display
const formatContextLength = (tokenValue?: number): string => {
  if (tokenValue === undefined || tokenValue === null) return '-';
  if (tokenValue >= 1000000) {
      return `${tokenValue / 1000000}m`;
  }
  if (tokenValue >= 1000) {
      return `${tokenValue / 1000}k`;
  }
  return String(tokenValue);
};

interface Props {
  model: AIModel;
  relatedNews: NewsArticle[];
  sameDeveloperModels: AIModel[];
}

export function ModelDetailClient({ model, relatedNews, sameDeveloperModels }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  const { currentUser } = useAuth();
  const { toast } = useToast();

  // Effect for user-specific data (favorite status)
  useEffect(() => {
    if (currentUser && model.id) {
      getUserProfileData(currentUser.uid).then(userData => {
        setIsFavorite(userData.favoriteModels?.includes(model.id) || false);
      });
    } else {
      setIsFavorite(false);
    }
  }, [currentUser, model.id]);

  // Effect for user's rating (real-time)
  useEffect(() => {
    if (currentUser && model.id) {
        const userRatingRef = doc(db, "models", model.id, "ratings", currentUser.uid);
        const unsubscribe = onSnapshot(userRatingRef, (docSnap) => {
            if (docSnap.exists()) {
                setCurrentRating(docSnap.data().starRating || 0);
            } else {
                setCurrentRating(0);
            }
        }, (error) => {
            console.error("Error listening to user rating:", error);
            setCurrentRating(0);
        });

        // Cleanup listener when id or currentUser changes
        return () => unsubscribe();
    } else {
        // Reset rating if user logs out or id changes
        setCurrentRating(0);
    }
  }, [currentUser, model.id]);


  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để lưu mục yêu thích.", variant: "destructive" });
      return;
    }
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState); 

    try {
        await toggleModelFavorite(currentUser.uid, model.id, isFavorite);
        toast({ title: newFavoriteState ? "Đã thêm vào mục yêu thích" : "Đã xóa khỏi mục yêu thích" });
    } catch (error) {
        console.error("Failed to update favorite status:", error);
        setIsFavorite(!newFavoriteState); 
        toast({ title: "Lỗi", description: "Không thể cập nhật mục yêu thích.", variant: "destructive" });
    }
  };

  const handleRating = async (rating: number) => {
    if (!currentUser) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để đánh giá model.", variant: "destructive" });
      return;
    }

    try {
      await setModelRating(currentUser.uid, model.id, rating, currentRating);
      toast({ title: "Đã gửi đánh giá", description: `Bạn đã đánh giá ${model.name} ${rating} sao.` });
    } catch(error) {
      console.error("Failed to save rating:", error);
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

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link href="/bang-xep-hang">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại bảng xếp hạng
          </Link>
        </Button>
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm font-medium hidden">
          <ol className="flex items-center text-muted-foreground">
            <li className="flex items-center">
              <Link 
                href="/" 
                className="hover:text-primary transition-colors"
              >
                Trang chủ
              </Link>
            </li>
            
            <li className="flex items-center before:content-['/'] before:mx-2 before:text-muted-foreground/30">
              <Link 
                href="/bang-xep-hang" 
                className="hover:text-primary transition-colors"
              >
                Bảng xếp hạng
              </Link>
            </li>

            <li className="flex items-center before:content-['/'] before:mx-2 before:text-muted-foreground/30">
              <span className="text-foreground font-semibold">
                {model.name}
              </span>
            </li>
          </ol>
        </nav>

          <div className="grid md:grid-cols-3 gap-8 items-start mb-8">
              <div className="md:col-span-2 space-y-8">
                  <Card>
                      <CardHeader>
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                              <div className="flex items-center space-x-4">
                              <Image src={model.logoUrl || ''} alt={`${model.name} logo`} width={64} height={64} className="rounded-lg" priority />
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
                          <div className="flex items-center space-x-1 mb-2" onMouseLeave={() => setHoverRating(0)}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star} 
                                    onClick={() => handleRating(star)} 
                                    onMouseEnter={() => setHoverRating(star)}
                                    aria-label={`Đánh giá ${star} sao`} 
                                    className="group outline-none"
                                >
                                <Star
                                    className={`h-7 w-7 cursor-pointer transition-all duration-150 ${
                                    star <= (hoverRating || currentRating) 
                                    ? "fill-amber-400 text-amber-500 scale-110" 
                                    : "text-gray-300"
                                    }`}
                                />
                                </button>
                            ))}
                          </div>
                           <p className="text-sm text-muted-foreground">Đánh giá của bạn: {currentRating > 0 ? `${currentRating} sao` : "Chưa đánh giá"}</p>
                          {(model.averageRating ?? 0) > 0 && <p className="text-sm text-muted-foreground mt-1">Trung bình: {(model.averageRating ?? 0).toFixed(1)} sao ({model.ratingCount || 0} đánh giá)</p>}
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
                              <p className="text-muted-foreground">{formatContextLength(model.contextLengthToken as number)}</p>
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
                <O3DetailedBenchmarkCharts currentModel={model} />
              </section>

              {sameDeveloperModels.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold font-headline mb-6">Các mô hình khác từ {model.developer}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sameDeveloperModels.map((devModel) => (
                      <ModelCard key={devModel.id} model={devModel} />
                    ))}
                  </div>
                </section>
              )}

              {relatedNews.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold font-headline mb-6">Bài viết liên quan</h2>
                  <div className="space-y-8">
                    {relatedNews.map((article) => (
                      <NewsListItem key={article.id} article={article} />
                    ))}
                  </div>
                </section>
              )}
          </div>
      </div>
    </AppLayout>
  );
}
