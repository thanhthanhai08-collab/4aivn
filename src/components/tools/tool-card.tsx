
// src/components/tools/tool-card.tsx
"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ExternalLink, Star, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/lib/types";
import { useState, useEffect, type MouseEvent } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { toggleToolFavorite, getUserProfileData } from "@/lib/user-data-service";
import { useTranslations } from "next-intl";

interface ToolCardProps {
  tool: Tool;
  rank?: number;
}

export function ToolCard({ tool, rank }: ToolCardProps) {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const t = useTranslations("toolCard");

  useEffect(() => {
    if (currentUser) {
      getUserProfileData(currentUser.uid).then(userData => {
        setIsFavorite(userData.favoriteTools?.includes(tool.id) || false);
      });
    } else {
      setIsFavorite(false);
    }
  }, [tool.id, currentUser]);
  
  const handleFavoriteToggle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      toast({
        title: t("loginRequired"),
        description: t("loginRequiredDesc"),
        variant: "destructive",
      });
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

  const averageRating = tool.ratingCount && tool.ratingCount > 0 
    ? (tool.totalStars || 0) / tool.ratingCount 
    : 0;

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden hover:-translate-y-1 relative group/card">
       <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteToggle}
              className="h-8 w-8 rounded-full bg-background/60 backdrop-blur-sm transition-opacity"
              aria-label={t("favorite")}
            >
              <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
            </Button>
            {rank !== undefined && (
              <Badge 
                variant="default"
                className="!rounded-full !px-2.5 !py-1 text-sm font-bold"
                style={{
                    backgroundColor: 'rgba(11, 105, 255, 0.9)', 
                    backdropFilter: 'blur(4px)',
                }}
              >
                #{rank}
              </Badge>
            )}
        </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Image 
              src={tool.logoUrl} 
              alt={`Logo ${tool.name}`} 
              width={48} 
              height={48} 
              className="rounded-md object-contain"
               
            />
            <div>
              <CardTitle className="text-xl font-headline group-hover:text-primary">
                <Link href={{ pathname: '/cong-cu/[id]', params: { id: tool.id } }} className="hover:underline">
                  {tool.name}
                </Link>
              </CardTitle>
              <Badge variant="outline" className="mt-1">{tool.context}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardDescription className="text-sm line-clamp-3">{tool.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="flex-grow">
          {tool.myRating !== undefined ? (
            <div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 transition-colors ${
                      star <= (tool.myRating || 0)
                        ? "fill-amber-400 text-amber-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {t("yourRating", { rating: tool.myRating })}
              </p>
            </div>
          ) : averageRating > 0 ? (
            <div className="flex items-center text-sm">
                <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-500" />
                <span className="text-muted-foreground">{averageRating.toFixed(1)}</span>
            </div>
          ) : (
            <div className="h-5" /> // Placeholder to keep height consistent
          )}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={{ pathname: '/cong-cu/[id]', params: { id: tool.id } }}>
            {t("viewDetail")}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
