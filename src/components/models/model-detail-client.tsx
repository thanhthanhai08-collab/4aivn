"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("modelDetail");
  
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
      toast({ title: t("loginToFav"), description: t("loginToFavDesc"), variant: "destructive" });
      return;
    }
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState); 

    try {
        await toggleModelFavorite(currentUser.uid, model.id, isFavorite);
        toast({ title: newFavoriteState ? t("favAdded") : t("favRemoved") });
    } catch (error) {
        console.error("Failed to update favorite status:", error);
        setIsFavorite(!newFavoriteState); 
        toast({ title: t("error"), description: t("favError"), variant: "destructive" });
    }
  };

  const handleRating = async (rating: number) => {
    if (!currentUser) {
      toast({ title: t("loginToReview"), description: t("loginToReviewDesc"), variant: "destructive" });
      return;
    }

    try {
      await setModelRating(currentUser.uid, model.id, rating, currentRating);
      toast({ title: t("reviewSent"), description: t("reviewSentDesc", { name: model.name, rating }) });
    } catch(error) {
      console.error("Failed to save rating:", error);
      toast({ title: t("error"), description: t("reviewError"), variant: "destructive" });
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: t("copiedLink"),
        description: t("copiedLinkDesc"),
      });
    }).catch(err => {
      console.error('Failed to copy link: ', err);
      toast({
        title: t("error"),
        description: t("copyError"),
        variant: "destructive",
      });
    });
  };

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link href="/bang-xep-hang">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("backToRankings")}
          </Link>
        </Button>
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm font-medium hidden">
          <ol className="flex items-center text-muted-foreground">
            <li className="flex items-center">
              <Link 
                href="/" 
                className="hover:text-primary transition-colors"
              >
                {t("home")}
              </Link>
            </li>
            
            <li className="flex items-center before:content-['/'] before:mx-2 before:text-muted-foreground/30">
              <Link 
                href="/bang-xep-hang" 
                className="hover:text-primary transition-colors"
              >
                {t("rankings")}
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
                                  {isFavorite ? t("favorited") : t("favorite")}
                              </Button>
                              <Button variant="outline" onClick={handleShare}>
                                  <Share2 className="mr-2 h-4 w-4" /> {t("share")}
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
                          <CardTitle className="text-xl font-headline">{t("rateModel")}</CardTitle>
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
                           <p className="text-sm text-muted-foreground">{t("yourRating")} {currentRating > 0 ? `${currentRating} sao` : t("notRated")}</p>
                          {(model.averageRating ?? 0) > 0 && <p className="text-sm text-muted-foreground mt-1">{t("averageRating", { avg: (model.averageRating ?? 0).toFixed(1), count: model.ratingCount || 0 })}</p>}
                      </CardContent>
                  </Card>
              </div>
          </div>
          
          <div className="space-y-12">
               {/* Specifications */}
              <Card>
                  <CardHeader>
                  <CardTitle>{t("specs")}</CardTitle>
                  <CardDescription>{t("specsDesc")}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
                      <div className="flex items-start space-x-3">
                          <User className="h-5 w-5 mt-1 text-primary" />
                          <div>
                              <p className="font-semibold">{t("developer")}</p>
                              <p className="text-muted-foreground">{model.developer}</p>
                          </div>
                      </div>
                      <div className="flex items-start space-x-3">
                          <Layers className="h-5 w-5 mt-1 text-primary" />
                          <div>
                              <p className="font-semibold">{t("multimodal")}</p>
                              <p className="text-muted-foreground">{model.multimodal ? t("yes") : t("no")}</p>
                          </div>
                      </div>
                      <div className="flex items-start space-x-3">
                          <BrainCircuit className="h-5 w-5 mt-1 text-primary" />
                          <div>
                              <p className="font-semibold">{t("intelligenceScore")}</p>
                              <p className="text-muted-foreground">{model.intelligenceScore}</p>
                          </div>
                      </div>
                      <div className="flex items-start space-x-3">
                          <BookOpen className="h-5 w-5 mt-1 text-primary" />
                          <div>
                              <p className="font-semibold">{t("contextWindow")}</p>
                              <p className="text-muted-foreground">{formatContextLength(model.contextLengthToken as number)}</p>
                          </div>
                      </div>
                      <div className="flex items-start space-x-3">
                          <DollarSign className="h-5 w-5 mt-1 text-primary" />
                          <div>
                              <p className="font-semibold">{t("pricePer1M")}</p>
                              <p className="text-muted-foreground">${model.pricePerMillionTokens?.toFixed(2)}</p>
                          </div>
                      </div>
                      <div className="flex items-start space-x-3">
                          <Zap className="h-5 w-5 mt-1 text-primary" />
                          <div>
                              <p className="font-semibold">{t("speed")}</p>
                              <p className="text-muted-foreground">{model.speedTokensPerSecond?.toFixed(1) || t("na")}</p>
                          </div>
                      </div>
                       <div className="flex items-start space-x-3">
                          <Timer className="h-5 w-5 mt-1 text-primary" />
                          <div>
                              <p className="font-semibold">{t("latency")}</p>
                              <p className="text-muted-foreground">{model.latencyFirstChunkSeconds?.toFixed(2) || t("na")}</p>
                          </div>
                      </div>
                      <div className="flex items-start space-x-3">
                          <CalendarDays className="h-5 w-5 mt-1 text-primary" />
                          <div>
                              <p className="font-semibold">{t("releaseDate")}</p>
                              <p className="text-muted-foreground">{model.releaseDate || t("na")}</p>
                          </div>
                      </div>
                  </CardContent>
              </Card>
              
               {model.benchmarks && model.benchmarks.length > 0 && (
                  <section>
                      <h2 className="text-2xl font-bold font-headline mb-2">{t("stats")}</h2>
                      <p className="text-muted-foreground mb-6">{t("statsDesc")}</p>
                      <O3PerformanceInsightsChart benchmarkData={model.benchmarks} />
                  </section>
               )}
              
              <section>
                <h2 className="text-2xl font-bold font-headline mb-2">{t("benchmarks")}</h2>
                <p className="text-muted-foreground mb-6">{t("benchmarksDesc", { name: model.name })}</p>
                <O3DetailedBenchmarkCharts currentModel={model} />
              </section>

              {sameDeveloperModels.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold font-headline mb-6">{t("otherModels", { developer: model.developer })}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sameDeveloperModels.map((devModel) => (
                      <ModelCard key={devModel.id} model={devModel} />
                    ))}
                  </div>
                </section>
              )}

              {relatedNews.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold font-headline mb-6">{t("relatedArticles")}</h2>
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
