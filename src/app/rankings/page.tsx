
// src/app/rankings/page.tsx
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTools } from "@/lib/mock-tools";
import { mockAIModels } from "@/lib/mock-models";
import type { AIModel, Tool } from "@/lib/types";
import { RankingsTable } from "@/components/rankings/rankings-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function RankingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const allModels: AIModel[] = mockAIModels;
  const allTools: Tool[] = mockTools;


  useEffect(() => {
    setMounted(true);
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Shorter delay for tabbed content
    return () => clearTimeout(timer);
  }, []);

  const filteredModels = useMemo(() => {
    if (!searchTerm.trim()) return allModels;
    return allModels.filter(model =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allModels]);

  const filteredTools = useMemo(() => {
    if (!searchTerm.trim()) return allTools;
    return allTools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allTools]);

  if (!mounted) {
    return (
      <AppLayout>
        <div className="container py-8 md:py-12">
          <Skeleton className="h-12 w-1/2 mb-4 mx-auto" />
          <Skeleton className="h-8 w-3/4 mb-8 mx-auto" />
          <Skeleton className="h-11 w-full max-w-lg mx-auto mb-8" />
          <Skeleton className="h-10 w-1/3 mb-8" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold text-foreground">Bảng xếp hạng AI</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Khám phá các Model AI và Công cụ AI hàng đầu dựa trên đánh giá của cộng đồng.
          </p>
        </header>

        <div className="relative mb-8 max-w-lg mx-auto">
          <Input
            type="search"
            placeholder="Tìm kiếm model hoặc công cụ..."
            className="h-11 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>

        <Tabs defaultValue="models" className="w-full p-4 md:p-6 rounded-xl bg-gradient-to-br from-accent/60 via-accent/30 to-accent/10 shadow-lg">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 md:mx-auto mb-8 bg-background/70 backdrop-blur-sm">
            <TabsTrigger 
              value="models" 
              className="text-foreground/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
            >
              Model AI
            </TabsTrigger>
            <TabsTrigger 
              value="tools" 
              className="text-foreground/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
            >
              Công cụ AI
            </TabsTrigger>
          </TabsList>
          <TabsContent value="models">
            {isLoading ? (
                <Skeleton className="h-96 w-full rounded-lg bg-background/50" />
            ) : (
              <RankingsTable items={filteredModels} itemType="model" />
            )}
          </TabsContent>
          <TabsContent value="tools">
            {isLoading ? (
              <Skeleton className="h-96 w-full rounded-lg bg-background/50" />
            ) : (
              <RankingsTable items={filteredTools} itemType="tool" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
