// src/app/tim-kiem/page.tsx
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// --- SKELETON LOADING ---
function SearchSkeleton() {
  return (
    <div className="container py-8 md:py-12">
      <Skeleton className="h-10 w-1/3 mb-8" />
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  );
}

// --- COMPONENT CON CHỨA LOGIC CHÍNH ---
function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or processing for search results
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Shorter delay for search results page
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="container py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-foreground">
          Kết quả tìm kiếm {query ? "cho:" : ""} <span className="text-primary">{query || ""}</span>
        </h1>
      </header>

      {isLoading ? (
        <div>
          <Skeleton className="h-8 w-1/4 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      ) : query ? (
        <div className="space-y-6">
          <Card className="bg-accent/50 border-primary/30">
            <CardHeader>
              <CardTitle className="text-xl">Tìm kiếm Nâng cao & Gợi ý</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nếu bạn muốn tìm kiếm nâng cao điều gì trên website 4AIVN thì bạn có thể chat trực tiếp với trợ lý AI của chúng tôi ở góc phải màn hình. Điều đó có thể nâng cao trải nghiệm web đó. Còn nếu bạn muốn tìm kiếm công cụ AI thì hoàn toàn có thể sử dụng đường dẫn dưới đây.
              </p>
            </CardContent>
            <CardFooter>
               <Button asChild>
                <Link href={`/cong-cu?search_query=${encodeURIComponent(query)}`}>
                  Tìm kiếm "{query}" trong Công cụ AI
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <p className="text-xl text-muted-foreground text-center py-10">
          Vui lòng nhập một cụm từ vào ô tìm kiếm ở đầu trang để bắt đầu.
        </p>
      )}
    </div>
  );
}

// --- COMPONENT CHÍNH (EXPORT DEFAULT) ---
export default function SearchResultsPage() {
  return (
    <AppLayout>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResultsContent />
      </Suspense>
    </AppLayout>
  );
}
