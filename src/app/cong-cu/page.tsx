// src/app/tools/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToolCard } from "@/components/tools/tool-card";
import { ToolFilters } from "@/components/tools/tool-filters";
import { mockTools } from "@/lib/mock-tools";
import type { Tool } from "@/lib/types";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ToolsPage() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get('search_query') || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [allTools, setAllTools] = useState<Tool[]>(mockTools);


  useEffect(() => {
    setMounted(true);
    
    const fetchData = async () => {
      try {
        const toolsSnapshot = await getDocs(collection(db, "tools"));
        const toolRatings: { [id: string]: { totalStars: number; ratingCount: number } } = {};
        toolsSnapshot.forEach(doc => {
          const data = doc.data();
          toolRatings[doc.id] = { totalStars: data.totalStars || 0, ratingCount: data.ratingCount || 0 };
        });
        
        setAllTools(mockTools.map(tool => ({
          ...tool,
          ...toolRatings[tool.id]
        })));

      } catch (error) {
        console.error("Error fetching tool ratings:", error);
        setAllTools(mockTools); // Fallback to mock data
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
    // Get existing categories from tools
    const existingCategoriesFromTools = new Set(allTools.map(tool => tool.context));

    // Add "Model AI" to the set
    existingCategoriesFromTools.add("Model AI");

    // Convert set to array and sort for consistent order (e.g., alphabetically)
    const allCategories = Array.from(existingCategoriesFromTools).sort((a, b) => a.localeCompare(b));
    
    return allCategories;
  }, [allTools]);

  const sortedTools = useMemo(() => {
    const filtered = allTools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || tool.context === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    // Sort by average rating (desc), then by rating count (desc), then by name (asc)
    return filtered.sort((a, b) => {
        const ratingA = a.ratingCount && a.ratingCount > 0 ? (a.totalStars || 0) / a.ratingCount : a.userRating || -Infinity;
        const ratingB = b.ratingCount && b.ratingCount > 0 ? (b.totalStars || 0) / b.ratingCount : b.userRating || -Infinity;

        if (ratingB !== ratingA) return ratingB - ratingA;
        
        const countA = a.ratingCount ?? 0;
        const countB = b.ratingCount ?? 0;
        if (countB !== countA) return countB - countA;
        
        return a.name.localeCompare(b.name);
    });
  }, [searchTerm, selectedCategory, allTools]);

  if (!mounted && !initialSearchQuery) { // Added !initialSearchQuery to prevent skeleton flash if search is active
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
          initialSearchTerm={searchTerm} // Pass current searchTerm
        />

        {isLoading && !initialSearchQuery ? ( // Also check initialSearchQuery here
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
