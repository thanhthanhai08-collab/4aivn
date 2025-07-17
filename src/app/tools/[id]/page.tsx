// src/app/tools/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star, Heart, CheckCircle, ArrowLeft } from "lucide-react";
import { mockTools as initialMockTools } from "@/lib/mock-tools";
import type { Tool, NewsArticle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { AppLayout } from "@/components/layout/app-layout";
import { generateAiToolDescription } from "@/ai/flows/ai-tool-description-generator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  setToolRating,
  toggleToolFavorite,
  getUserProfileData,
  getAggregateRating,
} from "@/lib/user-data-service";
import { doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { mockNews } from "@/lib/mock-news";


export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [tool, setTool] = useState<Tool | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [aggregateRating, setAggregateRating] = useState({ totalStars: 0, ratingCount: 0 });
  const [enhancedDescription, setEnhancedDescription] = useState<string | null>(null);
  
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Find tool directly from mock-data to ensure it's always up-to-date.
    const foundTool = initialMockTools.find((t) => t.id === id);
    
    if (foundTool) {
      setTool(foundTool);
      
      // Find related news articles
      const filteredNews = mockNews.filter(article => 
        article.title.toLowerCase().includes(foundTool.name.toLowerCase()) || 
        article.content.toLowerCase().includes(foundTool.name.toLowerCase())
      ).slice(0, 3); // Limit to 3 articles
      setRelatedNews(filteredNews);

      if (currentUser) {
        // Load user-specific data from Firestore
        getUserProfileData(currentUser.uid).then(userData => {
          setIsFavorite(userData.favoriteTools?.includes(id) || false);
          setCurrentRating(userData.ratedTools?.[id] || 0);
        });
      }

      // Fetch aggregate rating data from Firestore
      const toolDocRef = doc(db, "tools", id);
      getAggregateRating(toolDocRef).then(setAggregateRating);

      if (foundTool.description.length < 100 && foundTool.description.length > 0) {
        generateAiToolDescription({ name: foundTool.name, context: foundTool.context, link: foundTool.link })
          .then(output => setEnhancedDescription(output.description))
          .catch(err => console.error("Failed to generate AI description:", err));
      }
    }
    setIsLoading(false);
  }, [id, currentUser]);

  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để lưu mục yêu thích.", variant: "destructive" });
      return;
    }
    
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState); // Optimistic UI update

    try {
        await toggleToolFavorite(currentUser.uid, id, isFavorite);
        toast({ title: newFavoriteState ? "Đã thêm vào Yêu thích" : "Đã xóa khỏi Yêu thích" });
    } catch (error) {
        console.error("Failed to update favorite status:", error);
        setIsFavorite(!newFavoriteState); // Revert on error
        toast({ title: "Lỗi", description: "Không thể cập nhật mục yêu thích.", variant: "destructive" });
    }
  };

  const handleRating = async (rating: number) => {
    if (!currentUser || !tool) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để đánh giá công cụ.", variant: "destructive" });
      return;
    }

    const oldRating = currentRating;
    const oldAggregate = { ...aggregateRating };

    // Optimistic UI update
    setCurrentRating(rating);
    setAggregateRating(prev => {
        let newTotalStars = prev.totalStars - oldRating + rating;
        let newRatingCount = prev.ratingCount;
        if(oldRating === 0) { // It's a new rating
            newRatingCount += 1;
        }
        return { totalStars: newTotalStars, ratingCount: newRatingCount };
    });

    try {
      await setToolRating(currentUser.uid, tool.id, rating);
      toast({ title: "Đã gửi đánh giá", description: `Bạn đã đánh giá ${tool.name} ${rating} sao.` });

    } catch(error) {
      console.error("Failed to save rating:", error);
      // Revert UI on error
      setCurrentRating(oldRating); 
      setAggregateRating(oldAggregate);
      toast({ title: "Lỗi", description: "Không thể lưu đánh giá của bạn.", variant: "destructive" });
    }
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

  if (!tool) {
    return (
      <AppLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy công cụ</h1>
          <Button asChild variant="link" className="mt-4">
            <Link href="/tools">Quay lại trang Công cụ</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const descriptionToDisplay = enhancedDescription || tool.description;
  const averageRating = aggregateRating.ratingCount > 0 ? (aggregateRating.totalStars / aggregateRating.ratingCount) : 0;

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Button variant="outline" asChild className="mb-6">
          <Link href="/tools"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang Công cụ</Link>
        </Button>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <Image src={tool.logoUrl} alt={`Logo ${tool.name}`} width={64} height={64} className="rounded-lg" data-ai-hint="logo company" />
                    <div>
                      <CardTitle className="text-3xl font-headline">{tool.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{tool.context}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                     <Button variant="outline" onClick={handleFavoriteToggle} aria-label={isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}>
                       <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                       {isFavorite ? "Đã thích" : "Yêu thích"}
                     </Button>
                     <Button asChild>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer">
                          Truy cập trang <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed whitespace-pre-line">{descriptionToDisplay}</CardDescription>
              </CardContent>
            </Card>
            
            {tool.features && tool.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">Tính năng chính</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 md:sticky md:top-24">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-headline">Đánh giá công cụ này</CardTitle>
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
                        <span className="text-muted-foreground">Xếp hạng:</span>
                        <span>#{tool.ranking || 'Chưa có'}</span>
                    </div>
                     <Separator />
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Danh mục:</span>
                        <Badge variant="outline">{tool.context}</Badge>
                    </div>
                    <Separator />
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Trang web chính thức:</span>
                        <Button variant="link" size="sm" asChild className="p-0 h-auto">
                            <a href={tool.link} target="_blank" rel="noopener noreferrer" className="truncate max-w-[150px]">
                                {tool.link.replace(/^https?:\/\//, '')}
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {relatedNews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Bài viết liên quan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedNews.map((article) => (
                    <Link key={article.id} href={`/news/${article.id}`} className="flex items-start space-x-3 group border-b pb-3 last:border-b-0 last:pb-0">
                      <Image src={article.imageUrl} alt={article.title} width={64} height={64} className="rounded-md object-cover aspect-square" data-ai-hint={article.dataAiHint} />
                      <div>
                        <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
