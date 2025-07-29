// src/app/rankings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { RankingsTable } from "@/components/rankings/rankings-table";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tool, AIModel } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTools } from "@/lib/mock-tools";
import { mockAIModels } from "@/lib/mock-models";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function RankingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [allTools, setAllTools] = useState<Tool[]>(mockTools);
  const [allModels, setAllModels] = useState<AIModel[]>(mockAIModels);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toolsSnapshot, modelsSnapshot] = await Promise.all([
            getDocs(collection(db, "tools")),
            getDocs(collection(db, "models"))
        ]);

        const toolRatings: { [id: string]: { totalStars: number; ratingCount: number } } = {};
        toolsSnapshot.forEach(doc => {
          const data = doc.data();
          toolRatings[doc.id] = { totalStars: data.totalStars || 0, ratingCount: data.ratingCount || 0 };
        });

        const modelRatings: { [id: string]: { totalStars: number; ratingCount: number } } = {};
        modelsSnapshot.forEach(doc => {
            const data = doc.data();
            modelRatings[doc.id] = { totalStars: data.totalStars || 0, ratingCount: data.ratingCount || 0 };
        });
        
        setAllTools(mockTools.map(tool => ({ ...tool, ...toolRatings[tool.id] })));
        setAllModels(mockAIModels.map(model => ({ ...model, ...modelRatings[model.id] })));

      } catch (error) {
        console.error("Error fetching ratings:", error);
        setAllTools(mockTools); // Fallback to mock data
        setAllModels(mockAIModels);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-headline font-bold text-foreground">
            Bảng xếp hạng AI
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            So sánh các công cụ và mô hình AI hàng đầu dựa trên hiệu suất và đánh giá của cộng đồng.
          </p>
        </header>

        <Tabs defaultValue="models" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
            <TabsTrigger value="models">Model AI</TabsTrigger>
            <TabsTrigger value="tools">Công cụ AI</TabsTrigger>
          </TabsList>
          <TabsContent value="models">
            {isLoading ? (
              <Skeleton className="h-96 w-full rounded-lg" />
            ) : (
              <RankingsTable items={allModels} itemType="model" />
            )}
          </TabsContent>
          <TabsContent value="tools">
             {isLoading ? (
              <Skeleton className="h-96 w-full rounded-lg" />
            ) : (
              <RankingsTable items={allTools} itemType="tool" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
