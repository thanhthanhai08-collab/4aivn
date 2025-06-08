// src/app/tools/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star, Heart, CheckCircle, ArrowLeft } from "lucide-react";
import { mockTools, mockUser } from "@/lib/mock-data";
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


export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [enhancedDescription, setEnhancedDescription] = useState<string | null>(null);
  
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const foundTool = mockTools.find((t) => t.id === params.id);
    if (foundTool) {
      setTool(foundTool);
      setIsFavorite(foundTool.isFavorite || false);
      setCurrentRating(foundTool.userRating || 0);

      // Optionally generate AI description
      // For demo, let's assume we always try to generate if description is short
      if (foundTool.description.length < 100) { 
        generateAiToolDescription({ name: foundTool.name, context: foundTool.context, link: foundTool.link })
          .then(output => setEnhancedDescription(output.description))
          .catch(err => console.error("Failed to generate AI description:", err));
      }
    }
    setIsLoading(false);
  }, [params.id]);

  const handleFavoriteToggle = () => {
    if (!currentUser) {
      toast({ title: "Login Required", description: "Please log in to save favorites.", variant: "destructive" });
      return;
    }
    setIsFavorite(!isFavorite);
    // Here you would typically update backend
    toast({ title: isFavorite ? "Removed from Favorites" : "Added to Favorites" });
  };

  const handleRating = (rating: number) => {
     if (!currentUser) {
      toast({ title: "Login Required", description: "Please log in to rate tools.", variant: "destructive" });
      return;
    }
    setCurrentRating(rating);
    // Here you would typically update backend
    toast({ title: "Rating Submitted", description: `You rated ${tool?.name} ${rating} stars.` });
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
          <h1 className="text-2xl font-bold">Tool not found</h1>
          <Button asChild variant="link" className="mt-4">
            <Link href="/tools">Back to Tools</Link>
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
          <Link href="/tools"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools</Link>
        </Button>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <Image src={tool.logoUrl} alt={`${tool.name} logo`} width={64} height={64} className="rounded-lg" data-ai-hint="logo company" />
                    <div>
                      <CardTitle className="text-3xl font-headline">{tool.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{tool.context}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                     <Button variant="outline" onClick={handleFavoriteToggle} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                       <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                       {isFavorite ? "Favorited" : "Favorite"}
                     </Button>
                     <Button asChild>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer">
                          Visit Site <ExternalLink className="ml-2 h-4 w-4" />
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
                  <CardTitle className="text-2xl font-headline">Key Features</CardTitle>
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
                <CardTitle className="text-xl font-headline">Rate this Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => handleRating(star)} aria-label={`Rate ${star} stars`}>
                      <Star
                        className={`h-7 w-7 cursor-pointer transition-colors ${
                          star <= currentRating ? "fill-amber-400 text-amber-500" : "text-gray-300 hover:text-amber-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Your rating: {currentRating > 0 ? `${currentRating} stars` : "Not rated yet"}</p>
                {tool.userRating && <p className="text-sm text-muted-foreground mt-1">Average: {tool.userRating.toFixed(1)} stars</p>}
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Ranking:</span>
                        <span>#{tool.ranking || 'N/A'}</span>
                    </div>
                     <Separator />
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <Badge variant="outline">{tool.context}</Badge>
                    </div>
                    <Separator />
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Official Website:</span>
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
