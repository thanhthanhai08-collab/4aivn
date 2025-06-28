// src/app/tools/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star, Heart, CheckCircle, ArrowLeft } from "lucide-react";
import { mockTools as initialMockTools } from "@/lib/mock-data";
import type { Tool } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { AppLayout } from "@/components/layout/app-layout";
import { generateAiToolDescription } from "@/ai/flows/ai-tool-description-generator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";


export default function ToolDetailPage({ params: paramsAsPromise }: { params: { id: string } }) {
  const params = use(paramsAsPromise); 
  const { id } = params;

  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [enhancedDescription, setEnhancedDescription] = useState<string | null>(null);
  
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Find tool directly from mock-data.ts to ensure it's always up-to-date.
    const foundTool = initialMockTools.find((t) => t.id === id);
    
    if (foundTool) {
      setTool(foundTool);
      
      // Load favorite status from localStorage
      const favoriteToolIds: string[] = JSON.parse(localStorage.getItem("cleanAIFavoriteTools") || "[]");
      setIsFavorite(favoriteToolIds.includes(id));
      
      // Load user-specific rating from localStorage for display
      const storedRatings = JSON.parse(localStorage.getItem("cleanAIToolRatings") || "{}");
      setCurrentRating(storedRatings[id] || 0);

      if (foundTool.description.length < 100 && foundTool.description.length > 0) {
        generateAiToolDescription({ name: foundTool.name, context: foundTool.context, link: foundTool.link })
          .then(output => setEnhancedDescription(output.description))
          .catch(err => console.error("Failed to generate AI description:", err));
      }
    }
    setIsLoading(false);
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!currentUser) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để lưu mục yêu thích.", variant: "destructive" });
      return;
    }
    
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    try {
        let favoriteToolIds: string[] = JSON.parse(localStorage.getItem("cleanAIFavoriteTools") || "[]");
        if (newFavoriteState) {
            if (!favoriteToolIds.includes(id)) {
                favoriteToolIds.push(id);
            }
        } else {
            favoriteToolIds = favoriteToolIds.filter(toolId => toolId !== id);
        }
        localStorage.setItem("cleanAIFavoriteTools", JSON.stringify(favoriteToolIds));
    } catch (error) {
        console.error("Failed to save favorite status to localStorage", error);
    }

    toast({ title: newFavoriteState ? "Đã thêm vào Yêu thích" : "Đã xóa khỏi Yêu thích" });
  };

  const handleRating = (rating: number) => {
     if (!currentUser) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để đánh giá công cụ.", variant: "destructive" });
      return;
    }
    if (!tool) return;

    // Get old rating to see if user is re-rating or rating for the first time
    const storedUserRatings = JSON.parse(localStorage.getItem("cleanAIToolRatings") || "{}");
    const oldRatingForTool = storedUserRatings[id] as number | undefined;

    let newRatingCount = tool.ratingCount || 0;
    const currentTotalRatingPoints = (tool.userRating || 0) * newRatingCount;
    let newTotalRatingPoints;

    if (oldRatingForTool !== undefined) {
      // User is changing their rating
      newTotalRatingPoints = currentTotalRatingPoints - oldRatingForTool + rating;
    } else {
      // User is rating for the first time
      newTotalRatingPoints = currentTotalRatingPoints + rating;
      newRatingCount += 1;
    }
    
    const newAverageRating = newRatingCount > 0 ? newTotalRatingPoints / newRatingCount : 0;

    setCurrentRating(rating);

    // Update the local state of the tool for immediate UI feedback.
    // Note: This average rating will reset on page load as the data source is mock-data.ts
    const updatedTool: Tool = {
      ...tool,
      userRating: newAverageRating,
      ratingCount: newRatingCount,
    };
    setTool(updatedTool);
    
    // Save/update the specific rating for this user in localStorage
    try {
        storedUserRatings[id] = rating;
        localStorage.setItem("cleanAIToolRatings", JSON.stringify(storedUserRatings));
    } catch (error) {
        console.error("Failed to save rating to localStorage", error);
    }

    toast({ title: "Đã gửi đánh giá", description: `Bạn đã đánh giá ${tool?.name} ${rating} sao.` });
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
                {tool.userRating && <p className="text-sm text-muted-foreground mt-1">Trung bình: {tool.userRating.toFixed(1)} sao</p>}
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
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
