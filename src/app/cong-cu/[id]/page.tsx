// src/app/cong-cu/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star, Heart, CheckCircle, ArrowLeft, ThumbsUp, Sparkles, PlusCircle, LayoutGrid } from "lucide-react";
import { mockTools as initialMockTools } from "@/lib/mock-tools";
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
import {
  setToolRating,
  toggleToolFavorite,
  getUserProfileData,
  getAggregateRating,
  getAllToolReviews,
  type UserToolRating,
  type ToolReview,
} from "@/lib/user-data-service";
import { Textarea } from "@/components/ui/textarea";
import { ToolCardSmall } from "@/components/tools/tool-card-small";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";


const ReviewsList = ({ reviews }: { reviews: ToolReview[] }) => {
    if (reviews.length === 0) {
        return <p className="text-muted-foreground text-center py-4">Chưa có bài đánh giá nào có nội dung.</p>;
    }

    const getInitials = (name: string | null | undefined) => {
        if (!name) return "ẨD";
        const names = name.split(' ');
        if (names.length > 1) {
            return names[0][0] + names[names.length - 1][0];
        }
        return name.substring(0, 2);
    };

    return (
        <div className="space-y-6">
            {reviews.map(review => (
                <div key={review.userId} className="flex items-start space-x-4">
                     <Avatar className="h-10 w-10 border">
                        <AvatarImage src={review.userPhotoURL || ""} alt={review.userName || ""} />
                        <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                            <p className="font-semibold">{review.userName || 'Người dùng ẩn danh'}</p>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-muted-foreground italic">"{review.text}"</p>
                    </div>
                </div>
            ))}
        </div>
    );
};


function ToolDetailContent({ id }: { id: string }) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [allReviews, setAllReviews] = useState<ToolReview[]>([]);
  const [aggregateRating, setAggregateRating] = useState({ totalStars: 0, ratingCount: 0 });
  const [enhancedDescription, setEnhancedDescription] = useState<string | null>(null);
  const [ranking, setRanking] = useState<number | null>(null);
  
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const allCategories = Array.from(new Set(initialMockTools.map(t => t.context)));

  const categoryIcons: { [key: string]: string } = {
    'Tạo hình ảnh': '🎨',
    'AI Agent': '🤖',
    'Tự động hóa': '⚙️',
    'API truy xuất dữ liệu web': '🌐',
    'Hỗ trợ viết': '✍️',
    'Tạo video': '🎬',
    'Code cho Web app': '💻',
    'Model AI': '🧠'
  };

  const featuredTools = initialMockTools.filter(t => ['midjourney', 'sora-ai', 'gpt-image-1'].includes(t.id));
  const similarTools = initialMockTools.filter(t => t.id !== id && t.context === tool?.context).slice(0, 4);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const foundTool = initialMockTools.find((t) => t.id === id);
      
      if (foundTool) {
        setTool(foundTool);
        
        // Fetch all tool ratings to calculate rank
        const toolsSnapshot = await getDocs(collection(db, "tools"));
        const toolRatings: { [id: string]: { totalStars: number; ratingCount: number } } = {};
        toolsSnapshot.forEach(doc => {
            const data = doc.data();
            toolRatings[doc.id] = { totalStars: data.totalStars || 0, ratingCount: data.ratingCount || 0 };
        });

        const allToolsWithRatings = initialMockTools.map(tool => ({
            ...tool,
            ...toolRatings[tool.id]
        }));
        
        // Sort tools to find rank
        let denseRank = 0;
        let lastSignature = "";
        const sortedTools = allToolsWithRatings.sort((a, b) => {
            const ratingA = a.ratingCount && a.ratingCount > 0 ? (a.totalStars || 0) / a.ratingCount : a.userRating || -Infinity;
            const ratingB = b.ratingCount && b.ratingCount > 0 ? (b.totalStars || 0) / b.ratingCount : b.userRating || -Infinity;
            if (ratingB !== ratingA) return ratingB - ratingA;
            const countA = a.ratingCount ?? 0;
            const countB = b.ratingCount ?? 0;
            if (countB !== countA) return countB - countA;
            return a.name.localeCompare(b.name);
        });

        // Calculate dense rank
        const rank = sortedTools.findIndex(t => t.id === id);
        if (rank !== -1) {
            let denseRank = 0;
            let lastSignature = "";
            for (let i = 0; i <= rank; i++) {
                const item = sortedTools[i];
                const averageRating = item.ratingCount && item.ratingCount > 0 ? (item.totalStars || 0) / item.ratingCount : item.userRating || -Infinity;
                const currentSignature = [averageRating, item.ratingCount || 0].join('-');
                if(currentSignature !== lastSignature) {
                    denseRank = i + 1;
                }
                lastSignature = currentSignature;
                if (item.id === id) {
                    setRanking(denseRank);
                    break;
                }
            }
        } else {
            setRanking(null);
        }

        // Fetch aggregate rating for the current tool
        const aggregateData = toolRatings[id] || { totalStars: 0, ratingCount: 0 };
        setAggregateRating(aggregateData);

        // Fetch all user reviews for this tool
        getAllToolReviews(id).then(setAllReviews);

        // Fetch user-specific data only if logged in
        if (currentUser) {
          getUserProfileData(currentUser.uid).then(userData => {
            setIsFavorite(userData.favoriteTools?.includes(id) || false);
          });
        }

        // Generate enhanced description if needed
        if (foundTool.description.length < 100 && foundTool.description.length > 0) {
          generateAiToolDescription({ name: foundTool.name, context: foundTool.context, link: foundTool.link })
            .then(output => setEnhancedDescription(output.description))
            .catch(err => console.error("Failed to generate AI description:", err));
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id, currentUser]);

  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để lưu mục yêu thích.", variant: "destructive" });
      return;
    }
    
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState); 

    try {
        await toggleToolFavorite(currentUser.uid, id, isFavorite);
        toast({ title: newFavoriteState ? "Đã thêm vào Yêu thích" : "Đã xóa khỏi Yêu thích" });
    } catch (error) {
        console.error("Failed to update favorite status:", error);
        setIsFavorite(!newFavoriteState); 
        toast({ title: "Lỗi", description: "Không thể cập nhật mục yêu thích.", variant: "destructive" });
    }
  };

  const handleSubmitReview = async () => {
    if (!currentUser || !tool) {
      toast({ title: "Yêu cầu đăng nhập", description: "Vui lòng đăng nhập để đánh giá công cụ.", variant: "destructive" });
      return;
    }
    if (currentRating === 0) {
      toast({ title: "Thiếu đánh giá", description: "Vui lòng chọn số sao để đánh giá.", variant: "destructive" });
      return;
    }

    try {
      await setToolRating(
        currentUser.uid, 
        tool.id, 
        currentRating, 
        reviewText, 
        currentUser.displayName, 
        currentUser.photoURL
      );
      toast({ title: "Đã gửi đánh giá", description: `Bạn đã đánh giá ${tool.name} ${currentRating} sao.` });

      // Refetch all reviews to include the new one
      getAllToolReviews(id).then(setAllReviews);

      // Refetch aggregate rating
      getAggregateRating("tools", id).then(setAggregateRating);
      
      // Reset form after successful submission
      setCurrentRating(0);
      setReviewText("");

    } catch(error) {
      console.error("Failed to save rating:", error);
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
            <Link href="/cong-cu">Quay lại trang Công cụ</Link>
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
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header section */}
            <section>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-4">
                      <Image src={tool.logoUrl} alt={`${tool.name} logo`} width={64} height={64} className="rounded-lg" />
                      <div>
                           <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold font-headline">{tool.name}</h1>
                           </div>
                          <p className="text-muted-foreground">{tool.context}</p>
                      </div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                      <Button variant="outline" onClick={handleFavoriteToggle}>
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

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Star className={`h-4 w-4 ${averageRating > 0 ? 'text-amber-500 fill-amber-400' : 'text-gray-400'}`} />
                  <span className="font-semibold text-foreground">{averageRating > 0 ? averageRating.toFixed(1) : 'Chưa có'}</span>
                  <span>({aggregateRating.ratingCount} đánh giá)</span>
                </div>
                 {ranking && (
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-foreground">Xếp hạng: #{ranking}</span>
                    </div>
                )}
              </div>

              <div className="space-y-4">
                  <p className="text-lg text-foreground/80 whitespace-pre-line">{descriptionToDisplay}</p>
              </div>
            </section>
            
            <Separator />
            
            {/* Video/Image Showcase */}
            {(tool.videoUrl || tool.imageUrl) && (
                <section>
                    <div className="overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                       {tool.videoUrl ? (
                           <iframe
                            src={tool.videoUrl}
                            title={`Video giới thiệu ${tool.name}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full aspect-video"
                          ></iframe>
                       ) : tool.imageUrl ? (
                          <div className="relative w-full aspect-video">
                             <Image 
                               src={tool.imageUrl}
                               alt={`Ảnh giới thiệu ${tool.name}`}
                               layout="fill"
                               className="object-cover"
                               data-ai-hint="tool interface"
                             />
                           </div>
                       ) : null}
                    </div>
                </section>
            )}
            
            {/* What is tool? */}
             {tool.longDescription && (
                <section>
                    <h2 className="text-2xl font-bold font-headline mb-4">N8n là gì?</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: tool.longDescription }} />
                </section>
            )}

            {/* Key Features */}
            {tool.features && tool.features.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold font-headline mb-4">Tính năng chính</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            
            {/* Use Cases */}
             {tool.useCases && (
                <section>
                    <h2 className="text-2xl font-bold font-headline mb-4">Trường hợp sử dụng</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                      {tool.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                </section>
            )}
            
            {/* Who is it for? */}
             {tool.whoIsItFor && (
                <section>
                    <h2 className="text-2xl font-bold font-headline mb-4">Đối tượng phù hợp</h2>
                    <div className="flex flex-wrap gap-2">
                      {tool.whoIsItFor.map((target, index) => (
                        <Badge key={index} variant="outline" className="text-base py-1">{target}</Badge>
                      ))}
                    </div>
                </section>
            )}
            
            {/* Pricing */}
            {tool.pricingPlans && (
                <section>
                    <h2 className="text-2xl font-bold font-headline mb-4">Các gói dịch vụ</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: tool.pricingPlans }}/>
                </section>
            )}
            
            {/* Rating & Reviews Section */}
            <section>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold font-headline">Đánh giá & Nhận xét</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Rating Form */}
                        <div className="bg-muted/30 p-6 rounded-lg">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                <h3 className="text-lg font-semibold">Bạn đánh giá {tool.name} như thế nào?</h3>
                                <div className="flex items-center space-x-1 shrink-0">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} onClick={() => setCurrentRating(star)} aria-label={`Rate ${star} stars`} className="group">
                                            <Star
                                                className={`h-7 w-7 cursor-pointer transition-all duration-200 group-hover:fill-amber-300 group-hover:text-amber-400 ${
                                                star <= currentRating ? "fill-amber-400 text-amber-500" : "text-gray-300"
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Textarea 
                                placeholder="Viết đánh giá của bạn (tùy chọn)"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                            <div className="flex justify-end mt-4">
                                <Button onClick={handleSubmitReview}>
                                    Gửi đánh giá
                                </Button>
                            </div>
                        </div>
                        
                        <Separator />

                        {/* All Reviews List */}
                        <div>
                             <h3 className="text-2xl font-bold font-headline mb-4">Tất cả bài đánh giá</h3>
                             <ReviewsList reviews={allReviews} />
                        </div>
                    </CardContent>
                </Card>
            </section>


             {/* CTA */}
            <section>
                 <Card className="bg-primary text-primary-foreground text-center p-8">
                    <CardTitle className="mb-2 leading-snug">Nâng cấp quy trình làm việc của bạn</CardTitle>
                    <p className="mb-4 text-primary-foreground/80">Đăng nhập để nhận tin tức và đánh giá bất cứ công cụ AI nào bạn yêu thích</p>
                    <Button variant="secondary" size="lg" asChild>
                       <Link href="/dang-ky">Tạo tài khoản miễn phí</Link>
                    </Button>
                 </Card>
            </section>
            
            {/* Similar Tools */}
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Công cụ tương tự {tool.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {similarTools.map(t => <ToolCardSmall key={t.id} tool={t} />)}
              </div>
            </section>
            
            {/* Complementary Tools */}
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Khám phá các công cụ bổ sung hoạt động cùng với {tool.name} để tối ưu hóa quy trình làm việc của bạn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {initialMockTools.slice(8, 11).map(t => <ToolCardSmall key={t.id} tool={t} />)}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Sparkles className="mr-2 h-5 w-5 text-amber-500"/> Công cụ nổi bật</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  {featuredTools.map(t => (
                    <Link key={t.id} href={`/cong-cu/${t.id}`} className="flex items-center space-x-3 group">
                       <Image src={t.logoUrl} alt={t.name} width={40} height={40} className="rounded-md"/>
                       <div>
                          <p className="font-semibold group-hover:text-primary">{t.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{t.description}</p>
                       </div>
                    </Link>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LayoutGrid className="mr-2 h-5 w-5 text-primary" />
                  Danh mục công cụ AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                 {allCategories.map(cat => (
                     <Button key={cat} variant="ghost" className="w-full justify-start text-base" asChild>
                        <Link href={`/cong-cu?category=${encodeURIComponent(cat)}`}>
                           <span className="mr-3 text-lg">{categoryIcons[cat] || '✨'}</span> {cat}
                        </Link>
                     </Button>
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
      </div>
    </AppLayout>
  );
}

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  return <ToolDetailContent id={params.id} />;
}
    
