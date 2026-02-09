// src/app/admin/preview/model/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star, Heart, CheckCircle, ArrowLeft, Share2, CalendarDays, BrainCircuit, Code, BookOpen, User, DollarSign, Zap, Timer, Layers } from "lucide-react";
import type { AIModel, NewsArticle, BenchmarkData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  setModelRating,
  toggleModelFavorite,
  getUserProfileData,
} from "@/lib/user-data-service";
import { O3PerformanceInsightsChart } from "@/components/models/o3-performance-insights-chart";
import { O3DetailedBenchmarkCharts } from "@/components/models/o3-detailed-benchmark-charts";
import { NewsListItem } from "@/components/news/news-list-item";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where, type Timestamp, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ModelCard } from "@/components/models/model-card";
import { useParams } from "next/navigation";

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

function ModelPreviewContent() {
  const params = useParams();
  const id = params.id as string;
  const [model, setModel] = useState<AIModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  const [sameDeveloperModels, setSameDeveloperModels] = useState<AIModel[]>([]);
  
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    const modelDocRef = doc(db, "models", id);

    // Set up a real-time listener for the model document
    const unsubscribe = onSnapshot(modelDocRef, async (docSnap) => {
        // We DON'T check for `post === true` in preview mode
        if (docSnap.exists()) {
            const data = docSnap.data();
            const releaseDateTimestamp = data.releaseDate as Timestamp;
            
            let benchmarksData: BenchmarkData[] = [];
            const benchmarksColRef = collection(db, "models", id, "benchmarks");
            const benchmarksSnapshot = await getDocs(benchmarksColRef);
            benchmarksData = benchmarksSnapshot.docs.map(doc => {
                const docData = doc.data();
                const score = typeof docData.score === 'string' ? parseFloat(docData.score) : docData.score;
                return {
                    name: docData.name,
                    score: isNaN(score) ? 0 : score,
                };
            });

            const foundModel = {
                id: docSnap.id,
                ...data,
                releaseDate: releaseDateTimestamp ? releaseDateTimestamp.toDate().toLocaleDateString('vi-VN') : undefined,
                benchmarks: benchmarksData,
            } as AIModel;

            setModel(foundModel);

            // Fetch related data for a full preview experience
            if (foundModel.name) {
                const newsQuery = query(
                    collection(db, "news"),
                    where("post", "==", true),
                    where('tag', 'array-contains', foundModel.name),
                    orderBy("publishedAt", "desc"),
                    limit(3)
                );
                const newsSnapshot = await getDocs(newsQuery);
                const newsData = newsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    publishedAt: doc.data().publishedAt.toDate().toISOString(),
                } as NewsArticle));
                setRelatedNews(newsData);
            }

            if (data.developer) {
                const sameDevQuery = query(
                    collection(db, "models"),
                    where('developer', '==', data.developer),
                    where('post', '==', true),
                    limit(7)
                );
                const devSnap = await getDocs(sameDevQuery);
                const devModels = devSnap.docs
                    .map(d => ({ 
                        id: d.id, 
                        ...d.data(),
                        releaseDate: (d.data().releaseDate as Timestamp)?.toDate().toLocaleDateString('vi-VN'),
                    } as AIModel))
                    .filter(m => m.id !== id)
                    .slice(0, 6);
                setSameDeveloperModels(devModels);
            }
            setIsLoading(false);
        } else {
            console.error("Model not found!");
            setIsLoading(false);
            setModel(null);
        }
    }, (error) => {
        console.error("Error listening to model data:", error);
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  // These effects remain the same as they are user-specific
  useEffect(() => {
    if (currentUser && id) {
      getUserProfileData(currentUser.uid).then(userData => {
        setIsFavorite(userData.favoriteModels?.includes(id) || false);
      });
    } else {
      setIsFavorite(false);
    }
  }, [currentUser, id]);

  useEffect(() => {
    if (currentUser && id) {
        const userRatingRef = doc(db, "models", id, "ratings", currentUser.uid);
        const unsubscribe = onSnapshot(userRatingRef, (docSnap) => {
            if (docSnap.exists()) {
                setCurrentRating(docSnap.data().starRating || 0);
            } else {
                setCurrentRating(0);
            }
        });
        return () => unsubscribe();
    } else {
        setCurrentRating(0);
    }
  }, [currentUser, id]);

  // Action handlers can be kept for a realistic preview
  const handleFavoriteToggle = async () => { /* ... implementation from original file ... */ };
  const handleRating = async (rating: number) => { /* ... implementation from original file ... */ };
  const handleShare = () => { /* ... implementation from original file ... */ };


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
           <p className="text-muted-foreground">Model này có thể không tồn tại hoặc đã bị xóa.</p>
          <Button asChild variant="link" className="mt-4">
            <Link href="/admin">Quay lại trang Quản trị</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="fixed top-0 left-0 w-full bg-yellow-400 text-yellow-900 text-center p-2 z-[101] font-semibold">
          Chế độ xem trước
      </div>
      <div className="container py-8 md:py-12 mt-10">
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang Quản trị
          </Link>
        </Button>
        
        <div className="grid md:grid-cols-3 gap-8 items-start mb-8">
              <div className="md:col-span-2 space-y-8">
                  <Card>
                      <CardHeader>
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                              <div className="flex items-center space-x-4">
                              <Image src={model.logoUrl} alt={`${model.name} logo`} width={64} height={64} className="rounded-lg" priority />
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
                          {(model.averageRating ?? 0) > 0 && <p className="text-sm text-muted-foreground mt-1">Trung bình: {(model.averageRating ?? 0).toFixed(1)} sao ({model.ratingCount || 0} đánh giá)</p>}
                      </CardContent>
                  </Card>
              </div>
          </div>
          
          <div className="space-y-12">
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

export default function ModelPreviewPage() {
  return <ModelPreviewContent />;
}
