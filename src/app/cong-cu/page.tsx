
// src/app/tools/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToolCard } from "@/components/tools/tool-card";
import { ToolFilters } from "@/components/tools/tool-filters";
import type { Tool } from "@/lib/types";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function ToolsPage() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get('search_query') || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [allTools, setAllTools] = useState<Tool[]>([]);

  useEffect(() => {
    setMounted(true);
    
    const fetchData = async () => {
      try {
        const toolsSnapshot = await getDocs(collection(db, "tools"));
        const dbTools = toolsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Tool));
        setAllTools(dbTools);
      } catch (error) {
        console.error("Error fetching tools:", error);
        setAllTools([]); // Fallback to empty array on error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Update searchTerm if URL query changes
  useEffect(() => {
    setSearchTerm(initialSearchQuery);
  }, [initialSearchQuery]);

  const categories = useMemo(() => {
    const toolCategories = new Set(allTools.map(tool => tool.context));
    toolCategories.add("Model AI"); // Keep this if needed for filter consistency across app
    return Array.from(toolCategories).sort((a, b) => a.localeCompare(b));
  }, [allTools]);

  const sortedTools = useMemo(() => {
    const filtered = allTools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || tool.context === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    
    return filtered.sort((a, b) => {
        const ratingA = a.ratingCount && a.ratingCount > 0 ? (a.totalStars || 0) / a.ratingCount : -1;
        const ratingB = b.ratingCount && b.ratingCount > 0 ? (b.totalStars || 0) / b.ratingCount : -1;

        if (ratingB !== ratingA) return ratingB - ratingA;
        
        const countA = a.ratingCount ?? 0;
        const countB = b.ratingCount ?? 0;
        if (countB !== countA) return countB - countA;
        
        return a.name.localeCompare(b.name);
    });
  }, [searchTerm, selectedCategory, allTools]);

  if (!mounted && !initialSearchQuery) {
     return (
      <AppLayout>
        <div className="container py-8">
          <Skeleton className="h-12 w-1/3 mb-4" />
          <Skeleton className="h-32 w-full mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-headline font-bold text-foreground">Thư mục Công cụ AI</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Khám phá và so sánh một loạt các công cụ AI.
          </p>
        </header>

        <ToolFilters
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          initialSearchTerm={searchTerm}
        />

        {isLoading && !initialSearchQuery ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        ) : sortedTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} rank={index + 1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              {initialSearchQuery && !sortedTools.length ? `Không tìm thấy kết quả nào cho "${initialSearchQuery}".` : "Không tìm thấy công cụ nào phù hợp với tiêu chí của bạn."}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
