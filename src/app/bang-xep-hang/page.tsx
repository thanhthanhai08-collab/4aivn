// src/app/rankings/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { RankingsTable } from "@/components/rankings/rankings-table";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tool, AIModel } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTools } from "@/lib/mock-tools";
import { mockLovableTool } from "@/lib/mock-tools2";
import { mockOpalTool } from "@/lib/mock-tools3";
import { db } from "@/lib/firebase";
import { collection, getDocs, type Timestamp, query, orderBy } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const combinedMockTools = [...mockTools, ...mockLovableTool, ...mockOpalTool];

export default function RankingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [allTools, setAllTools] = useState<Tool[]>(combinedMockTools);
  const [allModels, setAllModels] = useState<AIModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Build the multi-orderBy query for models
        const modelsQuery = query(
          collection(db, "models"),
          orderBy("intelligenceScore", "desc"),
          orderBy("contextLengthToken", "desc"),
          orderBy("pricePerMillionTokens", "asc"),
          orderBy("latencyFirstChunkSeconds", "asc"),
          orderBy("speedTokensPerSecond", "desc")
        );

        const [toolsSnapshot, modelsSnapshot] = await Promise.all([
          getDocs(collection(db, "tools")),
          getDocs(modelsQuery) // Use the sorted query
        ]);

        // Process models (data is already sorted by Firestore)
        const dbModels = modelsSnapshot.docs.map(doc => {
            const data = doc.data();
            const releaseDateTimestamp = data.releaseDate as Timestamp;
            return { 
                id: doc.id, 
                ...data,
                releaseDate: releaseDateTimestamp ? releaseDateTimestamp.toDate().toLocaleDateString('vi-VN') : undefined,
            } as AIModel
        });

        // Process tools (and apply ratings)
        const toolRatings: { [id: string]: { totalStars: number; ratingCount: number } } = {};
        toolsSnapshot.forEach(doc => {
          const data = doc.data();
          toolRatings[doc.id] = { totalStars: data.totalStars || 0, ratingCount: data.ratingCount || 0 };
        });
        
        setAllTools(combinedMockTools.map(tool => ({ ...tool, ...toolRatings[tool.id] })));
        setAllModels(dbModels);

      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to mock/unsorted data on error
        setAllTools(combinedMockTools); 
        setAllModels([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredModels = useMemo(() => {
    // Data is already sorted from Firestore, just need to filter by search term
    return allModels.filter(model => 
      (model.name && model.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (model.description && model.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [allModels, searchTerm]);

  const filteredTools = useMemo(() => {
    // Tools still need client-side sorting as they don't have a complex sort order from Firestore
    const filtered = allTools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered.sort((a, b) => {
        const ratingA = a.ratingCount && a.ratingCount > 0 ? (a.totalStars || 0) / a.ratingCount : -1;
        const ratingB = b.ratingCount && b.ratingCount > 0 ? (b.totalStars || 0) / b.ratingCount : -1;
        if (ratingB !== ratingA) return ratingB - ratingA;
        
        const countA = a.ratingCount ?? 0;
        const countB = b.ratingCount ?? 0;
        if (countB !== countA) return countB - countA;
        
        return a.name.localeCompare(b.name);
    });
  }, [allTools, searchTerm]);

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold text-foreground">
            Bảng xếp hạng AI
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            So sánh các công cụ và mô hình AI hàng đầu dựa trên hiệu suất và đánh giá của cộng đồng.
          </p>
        </header>

        <div className="flex flex-col items-center space-y-8">
            <div className="w-full max-w-lg relative">
                <Input 
                    type="search"
                    placeholder="Tìm kiếm model hoặc công cụ..."
                    className="pl-10 h-11"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            <Tabs defaultValue="models" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
                <TabsTrigger 
                    value="models" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:border data-[state=inactive]:border-border data-[state=active]:border data-[state=active]:border-primary"
                >
                    Model AI
                </TabsTrigger>
                <TabsTrigger 
                    value="tools" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:border data-[state=inactive]:border-border data-[state=active]:border data-[state=active]:border-primary"
                >
                    Công cụ AI
                </TabsTrigger>
              </TabsList>
              <TabsContent value="models" className="mt-6">
                {isLoading ? (
                  <Skeleton className="h-[400px] w-full rounded-lg" />
                ) : (
                  <RankingsTable items={filteredModels} itemType="model" />
                )}
              </TabsContent>
              <TabsContent value="tools" className="mt-6">
                 {isLoading ? (
                  <Skeleton className="h-[400px] w-full rounded-lg" />
                ) : (
                  <RankingsTable items={filteredTools} itemType="tool" />
                )}
              </TabsContent>
            </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
