
// src/app/cong-cu/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star, Heart, CheckCircle, Sparkles, LayoutGrid, Newspaper } from "lucide-react";
import type { Tool, NewsArticle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  setToolRating,
  toggleToolFavorite,
  getUserProfileData,
  getAllToolReviews,
  incrementToolViewCount,
  type ToolReview,
} from "@/lib/user-data-service";
import { Textarea } from "@/components/ui/textarea";
import { ToolCardSmall } from "@/components/tools/tool-card-small";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, limit, query, where, doc, onSnapshot, type Timestamp } from "firebase/firestore";
import { NewsCard } from "@/components/news/news-card";

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
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  const [ranking, setRanking] = useState<number | null>(null);
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([]);
  const [similarTools, setSimilarTools] = useState<Tool[]>([]);
  const [complementaryTools, setComplementaryTools] = useState<Tool[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const categoryIcons: { [key: string]: string } = {
    'Tạo hình ảnh': '🎨', 'AI Agent': '🤖', 'Tự động hóa': '⚙️', 'API truy xuất dữ liệu web': '🌐',
    'Hỗ trợ viết': '✍️', 'Tạo video': '🎬', 'Code cho Web app': '💻', 'Model AI': '🧠',
    'Tạo giọng nói': '🗣️', 'AI tìm kiếm': '🔍', 'Trình duyệt AI': '🌐', 'Tạo nhạc AI': '🎵',
  };

  // Effect for public tool data (real-time)
  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    incrementToolViewCount(id);

    const toolDocRef = doc(db, "tools", id);
    const unsubscribe = onSnapshot(toolDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const foundTool = { id: docSnap.id, ...docSnap.data() } as Tool;
        setTool(foundTool);
      } else {
        setTool(null);
      }
      setIsLoading(false);
    }, (error) => {
        console.error("Error fetching tool data:", error);
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  // Effect for other data (reviews, related items, etc.) - fetched once after tool loads
  useEffect(() => {
    if (!tool) return;

    const fetchRelatedData = async () => {
        try {
            const allToolsQuery = query(
                collection(db, "tools"),
                orderBy("averageRating", "desc"),
                orderBy("ratingCount", "desc"),
                orderBy("__name__")
            );

            // Fetch featured tools based on viewCount
            const featuredToolsQuery = query(
                collection(db, "tools"),
                orderBy("viewCount", "desc"),
                orderBy("__name__", "asc"),
                limit(4) 
            );

            const [allToolsSnapshot, featuredToolsSnapshot, newsSnapshot, allReviewsData, allToolsDataForCategories] = await Promise.all([
                getDocs(allToolsQuery),
                getDocs(featuredToolsQuery),
                getDocs(query(collection(db, "news"), where('title', '>=', tool.name), where('title', '<=', tool.name + '\uf8ff'), limit(3))),
                getAllToolReviews(tool.id),
                getDocs(collection(db, "tools")),
            ]);

            const sortedTools = allToolsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tool));
            const currentRank = sortedTools.findIndex(t => t.id === tool.id);
            setRanking(currentRank !== -1 ? currentRank + 1 : null);

            const allTools = allToolsDataForCategories.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tool));
            setAllCategories(Array.from(new Set(allTools.map(t => t.context).filter(Boolean))).sort());
            setSimilarTools(allTools.filter(t => t.id !== tool.id && t.context === tool.context).slice(0, 4));
            setComplementaryTools(allTools.filter(t => t.id !== tool.id && t.context !== tool.context).slice(8, 11));
            
            // Set featured tools, excluding the current one, and limit to 3.
            setFeaturedTools(featuredToolsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Tool)).filter(t => t.id !== tool.id).slice(0, 3));
            
            setRelatedNews(newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), publishedAt: (doc.data().publishedAt as Timestamp).toDate().toISOString() } as NewsArticle)));
            setAllReviews(allReviewsData);

        } catch (error) {
            console.error("Error fetching related data for tool:", error);
        }
    };
    fetchRelatedData();
  }, [tool]);

  // Effect for user-specific data (favorite, my rating)
  useEffect(() => {
    if (!currentUser || !id) {
        setIsFavorite(false);
        return;
    }
    const fetchUserData = async () => {
        try {
            const userData = await getUserProfileData(currentUser.uid);
            setIsFavorite(userData.favoriteTools?.includes(id) || false);
        } catch (error) {
            console.error("Failed to fetch user data for tool page:", error);
        }
    };
    fetchUserData();
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
        toast({ title: newFavoriteState ? "Đã thêm vào mục yêu thích" : "Đã xóa khỏi mục yêu thích" });
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

      // Manually refetch reviews list after submission.
      getAllToolReviews(id).then(setAllReviews);
      
      // Reset review input after successful submission
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

  const averageRating = tool.averageRating || 0;

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
                  <span>({tool.ratingCount || 0} đánh giá)</span>
                </div>
                 {ranking && (
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-foreground">Xếp hạng: #{ranking}</span>
                    </div>
                )}
              </div>

              <div className="space-y-4">
                  <p className="text-lg text-foreground/80 whitespace-pre-line">{tool.description}</p>
              </div>
            </section>
            
            <Separator />
            
            {(tool.videoUrl || tool.imageUrl) && (
              <section>
                  <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
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
                        <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
                          <Image
                            src={tool.imageUrl}
                            alt={`Ảnh giới thiệu ${tool.name}`}
                            fill
                            className="object-cover"
                            
                          />
                        </div>
                      ) : null}
                  </div>
              </section>
            )}
            
             {tool.longDescription && (
                <section>
                    <h2 className="text-2xl font-bold font-headline mb-4">{tool.name} là gì?</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: tool.longDescription }} />
                </section>
            )}

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
            
             {tool.useCases && tool.useCases.length > 0 && (
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
            
             {tool.whoIsItFor && tool.whoIsItFor.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold font-headline mb-4">Đối tượng phù hợp</h2>
                    <div className="flex flex-wrap gap-2">
                      {tool.whoIsItFor.map((target, index) => (
                        <Badge key={index} variant="outline" className="text-base py-1">{target}</Badge>
                      ))}
                    </div>
                </section>
            )}
            
            {tool.pricingPlans && tool.pricingPlans.length > 0 && (
              <section>
                  <h2 className="text-2xl font-bold font-headline mb-4">Các gói dịch vụ</h2>
                  <div className="prose max-w-none">
                      <ul>
                          {tool.pricingPlans.map((plan, index) => (
                              <li key={index}>{plan}</li>
                          ))}
                      </ul>
                  </div>
              </section>
            )}
            
            <section>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold font-headline">Đánh giá & Nhận xét</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
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

                        <div>
                             <h3 className="text-2xl font-bold font-headline mb-4">Tất cả bài đánh giá</h3>
                             <ReviewsList reviews={allReviews} />
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section>
                 <Card className="bg-primary text-primary-foreground text-center p-8">
                    <CardTitle className="mb-2 leading-snug">Nâng cấp quy trình làm việc của bạn</CardTitle>
                    <p className="mb-4 text-primary-foreground/80">Đăng nhập để nhận tin tức và đánh giá bất cứ công cụ AI nào bạn yêu thích</p>
                    <Button variant="secondary" size="lg" asChild>
                       <Link href="/dang-ky">Tạo tài khoản miễn phí</Link>
                    </Button>
                 </Card>
            </section>
            
            {similarTools.length > 0 && (
                <section>
                <h2 className="text-2xl font-bold font-headline mb-4">Công cụ tương tự {tool.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {similarTools.map(t => <ToolCardSmall key={t.id} tool={t} />)}
                </div>
                </section>
            )}
            
            {complementaryTools.length > 0 && (
                <section>
                <h2 className="text-2xl font-bold font-headline mb-4">Khám phá các công cụ bổ sung hoạt động cùng với {tool.name} để tối ưu hóa quy trình làm việc của bạn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {complementaryTools.map(t => <ToolCardSmall key={t.id} tool={t} />)}
                </div>
                </section>
            )}
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
                          <p className="text-sm text-muted-foreground">{t.context}</p>
                       </div>
                    </Link>
                  ))}
              </CardContent>
            </Card>

            {relatedNews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Newspaper className="mr-2 h-5 w-5 text-primary"/> Tin tức liên quan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedNews.map((article) => (
                      <Link key={article.id} href={`/tin-tuc/${article.id}`} className="flex items-center space-x-3 group">
                         <div className="relative w-16 h-16 shrink-0">
                            <Image src={article.imageUrl} alt={article.title} fill className="rounded-md object-cover"/>
                         </div>
                         <div>
                            <p className="font-semibold text-sm leading-tight group-hover:text-primary line-clamp-2">{article.title}</p>
                         </div>
                      </Link>
                  ))}
                </CardContent>
              </Card>
            )}

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
  const { id } = params;
  return <ToolDetailContent id={id} />;
}
