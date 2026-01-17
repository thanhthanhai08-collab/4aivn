// src/app/cong-cu/page.tsx
"use client";

import { useState, useMemo, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ToolCard } from "@/components/tools/tool-card";
import { ToolFilters } from "@/components/tools/tool-filters";
import type { Tool } from "@/lib/types";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit, where, startAfter, type QueryDocumentSnapshot } from "firebase/firestore";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

const PAGE_SIZE = 100;

// --- SKELETON LOADING ---
function ToolsSkeleton() {
  return (
    <div className="container py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-headline font-bold text-foreground">Tổng hợp các công cụ AI</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Khám phá và so sánh một loạt các công cụ AI.
        </p>
      </header>
      <Skeleton className="h-40 w-full mb-8 rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// --- COMPONENT CON CHỨA LOGIC CHÍNH ---
function ToolsContent() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get('search_query') || "";
  const initialCategory = searchParams.get('category') || "all";
  
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const fetchTools = useCallback(async (isFirstLoad = false) => {
    if (isFirstLoad) {
      setIsLoading(true);
      setLastDoc(null);
      setAllTools([]);
    } else if (isMoreLoading || !hasMore) {
      return;
    } else {
      setIsMoreLoading(true);
    }
  
    try {
      const toolsRef = collection(db, "tools");
      let q = query(
        toolsRef,
        where("post", "==", true),
        orderBy("averageRating", "desc"),
        orderBy("ratingCount", "desc"),
        orderBy("__name__")
      );
  
      if (selectedCategory !== "all") {
        q = query(q, where("context", "==", selectedCategory));
      }
      
      if (isFirstLoad) {
         q = query(q, limit(PAGE_SIZE));
      } else if (lastDoc) {
         q = query(q, startAfter(lastDoc), limit(PAGE_SIZE));
      }
  
      const snapshot = await getDocs(q);
      const newTools = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tool));
  
      if (isFirstLoad) {
        setAllTools(newTools);
      } else {
        setAllTools(prev => [...prev, ...newTools]);
      }
  
      const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(newLastDoc);
      setHasMore(snapshot.docs.length === PAGE_SIZE);

    } catch (error) {
      console.error("Error fetching tools:", error);
    } finally {
      if (isFirstLoad) setIsLoading(false);
      setIsMoreLoading(false);
    }
  }, [selectedCategory, lastDoc, isMoreLoading, hasMore]);
  
  // Effect for initial load and filter changes
  useEffect(() => {
    fetchTools(true);
  }, [selectedCategory]); // Re-fetch when category changes. Search is client-side.

  // Effect for infinite scroll
  useEffect(() => {
    if (inView && !isMoreLoading && hasMore) {
      fetchTools(false);
    }
  }, [inView, fetchTools, isMoreLoading, hasMore]);
  
  useEffect(() => { setSearchTerm(initialSearchQuery); }, [initialSearchQuery]);
  useEffect(() => { setSelectedCategory(initialCategory); }, [initialCategory]);

  const categories = useMemo(() => {
    // Note: This won't have all categories until all tools are loaded.
    // For a full category list, it's better to fetch them from a separate 'categories' collection in Firestore.
    // However, for this implementation, we'll build it from the loaded tools.
    const toolCategories = new Set(allTools.map(tool => tool.context).filter(Boolean));
    return Array.from(toolCategories).sort((a, b) => a.localeCompare(b));
  }, [allTools]);

  const filteredTools = useMemo(() => {
    // Search term filtering is done on the client-side after data is fetched.
    return allTools.filter((tool) => {
      return searchTerm === "" || 
             (tool.name && tool.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
             (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }, [searchTerm, allTools]);

  return (
    <div className="container py-8">
      {/* BREADCRUMB CHO TRANG DANH SÁCH */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm font-medium">
        <ol className="flex items-center text-muted-foreground">
          <li className="flex items-center">
            <Link 
              href="/" 
              className="hover:text-primary transition-colors flex items-center group"
            >
              Trang chủ
            </Link>
          </li>
          <li className="flex items-center before:content-['/'] before:mx-2 before:text-muted-foreground/30">
            <span className="text-foreground font-semibold">
              Tất cả công cụ
            </span>
          </li>
        </ol>
      </nav>

      <header className="mb-12 text-center">
        <h1 className="text-4xl font-headline font-bold text-foreground">Tổng hợp các công cụ AI</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Khám phá và so sánh một loạt các công cụ AI.
        </p>
      </header>

      <ToolFilters
        categories={categories}
        onSearchChange={setSearchTerm}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          // When category changes, we trigger a full reload.
          fetchTools(true);
        }}
        initialSearchTerm={searchTerm}
      />

      {isLoading ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredTools.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} rank={index + 1} />
            ))}
          </div>
          <div ref={ref} className="flex justify-center items-center py-8">
            {isMoreLoading && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
          </div>
        </>
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
  );
}

// --- COMPONENT CHÍNH (EXPORT DEFAULT) ---
export default function ToolsPage() {
  return (
    <AppLayout>
      <Suspense fallback={<ToolsSkeleton />}>
        <ToolsContent />
      </Suspense>
    </AppLayout>
  );
}
