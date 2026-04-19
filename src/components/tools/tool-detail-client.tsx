"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ExternalLink, Star, Heart, CheckCircle, Sparkles, Newspaper, ArrowLeft } from "lucide-react";
import type { Tool, NewsArticle, ToolReview } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { AppLayout } from "@/components/layout/app-layout";
import { useToast } from "@/hooks/use-toast";
import {
  setToolRating,
  toggleToolFavorite,
  getUserProfileData,
  getAllToolReviews,
  incrementToolViewCount,
} from "@/lib/user-data-service";
import { Textarea } from "@/components/ui/textarea";
import { ToolCardSmall } from "@/components/tools/tool-card-small";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

const ReviewsList = ({ reviews }: { reviews: ToolReview[] }) => {
    const t = useTranslations("toolDetail");
    if (reviews.length === 0) {
        return <p className="text-muted-foreground text-center py-4">{t("noReviews")}</p>;
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
                            <p className="font-semibold">{review.userName || t("anonymousUser")}</p>
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

interface Props {
  tool: Tool;
  adData: { linkAff: string; bannerAdsUrl: string } | null;
  relatedNews: NewsArticle[];
  ranking: number | null;
  complementaryTools: Tool[];
  similarTools: Tool[];
  featuredTools: Tool[];
  initialReviews: ToolReview[];
}

export function ToolDetailClient({
  tool,
  adData,
  relatedNews,
  ranking,
  complementaryTools,
  similarTools,
  featuredTools,
  initialReviews
}: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [allReviews, setAllReviews] = useState<ToolReview[]>(initialReviews);
  const t = useTranslations("toolDetail");
  
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (tool.id) {
        incrementToolViewCount(tool.id);
    }
  }, [tool.id]);

  // Effect for user-specific data (favorite, my rating)
  useEffect(() => {
    if (!currentUser || !tool.id) {
        setIsFavorite(false);
        return;
    }
    const fetchUserData = async () => {
        try {
            const userData = await getUserProfileData(currentUser.uid);
            setIsFavorite(userData.favoriteTools?.includes(tool.id) || false);
        } catch (error) {
            console.error("Failed to fetch user data for tool page:", error);
        }
    };
    fetchUserData();
  }, [tool.id, currentUser]);


  const handleFavoriteToggle = async () => {
    if (!currentUser || !tool.id) {
      toast({ title: t("loginToFav"), description: t("loginToFavDesc"), variant: "destructive" });
      return;
    }
    
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState); 

    try {
        await toggleToolFavorite(currentUser.uid, tool.id, isFavorite);
        toast({ title: newFavoriteState ? t("favAdded") : t("favRemoved") });
    } catch (error) {
        console.error("Failed to update favorite status:", error);
        setIsFavorite(!newFavoriteState); 
        toast({ title: t("error"), description: t("favError"), variant: "destructive" });
    }
  };

  const handleSubmitReview = async () => {
    if (!currentUser || !tool.id) {
      toast({ title: t("loginToReview"), description: t("loginToReviewDesc"), variant: "destructive" });
      return;
    }
    if (currentRating === 0) {
      toast({ title: t("missingRating"), description: t("missingRatingDesc"), variant: "destructive" });
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
      toast({ title: t("reviewSent"), description: t("reviewSentDesc", { name: tool.name, rating: currentRating }) });

      // Manually refetch reviews list after submission.
      getAllToolReviews(tool.id).then(setAllReviews);
      
      // Reset review input after successful submission
      setCurrentRating(0);
      setReviewText("");

    } catch(error) {
      console.error("Failed to save rating:", error);
      toast({ title: t("error"), description: t("reviewError"), variant: "destructive" });
    }
  };

  const averageRating = tool.averageRating || 0;

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Button variant="outline" size="sm" asChild className="mb-6">
            <Link href="/cong-cu"><ArrowLeft className="mr-2 h-4 w-4" /> {t("backToTools")}</Link>
        </Button>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header section */}
            <section>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-4">
                      <Image src={tool.logoUrl || ''} alt={`${tool.context} ${tool.name} logo`} width={64} height={64} className="rounded-lg" priority />
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
                         {isFavorite ? t("favorited") : t("favorite")}
                      </Button>
                      <Button asChild>
                         <a href={tool.link} target="_blank" rel="noopener noreferrer">
                          {t("visitPage")} <ExternalLink className="ml-2 h-4 w-4" />
                         </a>
                      </Button>
                  </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Star className={`h-4 w-4 ${averageRating > 0 ? 'text-amber-500 fill-amber-400' : 'text-gray-400'}`} />
                  <span className="font-semibold text-foreground">{averageRating > 0 ? averageRating.toFixed(1) : t("noRating")}</span>
                  <span>{t("reviewCount", { count: tool.ratingCount || 0 })}</span>
                </div>
                 {ranking && (
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-foreground">{t("ranking", { rank: ranking })}</span>
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
                            alt={`Ảnh giới thiệu ${tool.context} ${tool.name}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 800px"
                            priority
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
                       <h2 className="text-2xl font-bold font-headline">Đánh giá & nhận xét</h2>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="bg-muted/30 p-6 rounded-lg">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                <h3 className="text-lg font-semibold">Bạn đánh giá {tool.name} như thế nào?</h3>
                                <div className="flex items-center space-x-1 shrink-0">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      type="button"
                                      onClick={() => setCurrentRating(star)}
                                      onMouseEnter={() => setHoverRating(star)}
                                      onMouseLeave={() => setHoverRating(0)}
                                      aria-label={`Rate ${star} stars`}
                                      className="group outline-none"
                                    >
                                      <Star
                                        className={`h-7 w-7 cursor-pointer transition-all duration-150 ${
                                          star <= (hoverRating || currentRating)
                                            ? "fill-amber-400 text-amber-500 scale-110" 
                                            : "text-gray-300 scale-100"
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

            {adData?.bannerAdsUrl && (
              <section>
                <a 
                  href={adData.linkAff || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer sponsored" 
                  className="relative block w-full aspect-[4/1] group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all border"
                >
                  <Image
                    src={adData.bannerAdsUrl} 
                    alt="Quảng cáo tài trợ"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 800px" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-[10px] opacity-70 bg-white/50 backdrop-blur-sm">
                      Tài trợ
                    </Badge>
                  </div>
                </a>
              </section>
            )}
            
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
                <h2 className="text-2xl font-bold font-headline mb-4">Khám phá các công cụ bổ sung hoạt động cùng với {tool.name}</h2>
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
                <h2 className="flex items-center"><Sparkles className="mr-2 h-5 w-5 text-amber-500"/> Công cụ nổi bật</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                  {featuredTools.map(t => (
                    <Link key={t.id} href={{ pathname: '/cong-cu/[id]', params: { id: t.id } }} className="flex items-center space-x-3 group">
                       <Image src={t.logoUrl || ''} alt={t.name} width={40} height={40} className="rounded-md"/>
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
                  <h2 className="flex items-center"><Newspaper className="mr-2 h-5 w-5 text-primary"/> Tin tức liên quan</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedNews.map((article) => (
                      <Link key={article.id} href={{ pathname: '/tin-tuc/[id]', params: { id: article.id } }} className="flex items-center space-x-3 group">
                         <div className="relative w-16 h-16 shrink-0">
                            <Image src={article.imageUrl || ''} alt={article.title} fill className="rounded-md object-cover" sizes="64px"/>
                         </div>
                         <div>
                            <p className="font-semibold text-sm leading-tight group-hover:text-primary line-clamp-2">{article.title}</p>
                         </div>
                      </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card className="bg-accent/50 text-center p-6">
                <h3 className="text-xl font-bold mb-2 leading-snug text-foreground">
                    Khám phá bảng xếp hạng
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                    Giúp bạn so sánh các model, công cụ AI trực quan nhất
                </p>
                <Button asChild>
                    <Link href="/bang-xep-hang">Khám phá</Link>
                </Button>
            </Card>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
