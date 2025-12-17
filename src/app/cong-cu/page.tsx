
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
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

export default function ToolsPage() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get('search_query') || "";
  const initialCategory = searchParams.get('category') || "all";
  
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [allTools, setAllTools] = useState<Tool[]>([]);

  useEffect(() => {
    setMounted(true);
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const toolsCollectionRef = collection(db, "tools");
        // Query directly sorted from Firestore using the composite index
        const toolsQuery = query(
          toolsCollectionRef, 
          orderBy("averageRating", "desc"),
          orderBy("ratingCount", "desc"),
          orderBy("__name__") // Corresponds to document ID for name sorting
        );
        
        const toolsSnapshot = await getDocs(toolsQuery);
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
  
  // Update category if URL query changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = useMemo(() => {
    const toolCategories = new Set(allTools.map(tool => tool.context).filter(Boolean));
    return Array.from(toolCategories).sort((a, b) => a.localeCompare(b));
  }, [allTools]);

  const filteredTools = useMemo(() => {
    // The `allTools` array is already sorted by Firestore. We just need to filter.
    return allTools.filter((tool) => {
      const matchesSearch = searchTerm === "" || 
                            (tool.name && tool.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || tool.context === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allTools]);

  if (!mounted) {
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

        {isLoading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        ) : filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} rank={index + 1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              {initialSearchQuery || selectedCategory !== 'all'
                ? `Không tìm thấy công cụ nào phù hợp với tiêu chí của bạn.`
                : "Không tìm thấy công cụ nào."}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
