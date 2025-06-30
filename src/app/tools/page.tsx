
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

export default function ToolsPage() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get('search_query') || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Update searchTerm if URL query changes
  useEffect(() => {
    setSearchTerm(initialSearchQuery);
  }, [initialSearchQuery]);

  const categories = useMemo(() => {
    // Get existing categories from tools
    const existingCategoriesFromTools = new Set(mockTools.map(tool => tool.context));

    // Add "Model AI" to the set
    existingCategoriesFromTools.add("Model AI");

    // Convert set to array and sort for consistent order (e.g., alphabetically)
    const allCategories = Array.from(existingCategoriesFromTools).sort((a, b) => a.localeCompare(b));
    
    return allCategories;
  }, []);

  const sortedTools = useMemo(() => {
    const filtered = mockTools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || tool.context === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    // Sort the filtered results by ranking
    return filtered.sort((a, b) => (a.ranking ?? Infinity) - (b.ranking ?? Infinity));
  }, [searchTerm, selectedCategory]);

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
            {sortedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
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
