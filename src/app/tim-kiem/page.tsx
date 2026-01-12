// src/app/tim-kiem/page.tsx
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense, type FormEvent } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Newspaper, Wrench, MessageSquare, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


// --- SKELETON LOADING ---
function SearchSkeleton() {
  return (
    <div className="container py-8 md:py-12 space-y-6">
      <Skeleton className="h-12 w-full max-w-lg mx-auto rounded-full" />
      <Skeleton className="h-8 w-1/4" />
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  imageUrl?: string;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(!!initialQuery);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Effect for slide-in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Effect to fetch search results
    if (!initialQuery) {
        setIsLoading(false);
        return;
    };

    const fetchResults = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `https://asia-southeast1-clean-ai-hub.cloudfunctions.net/searchNews?q=${encodeURIComponent(initialQuery)}`
        );
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search Error:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [initialQuery]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="container py-8 md:py-12">
      {/* Search Bar */}
      <div className={cn(
          "mb-12 max-w-2xl mx-auto transition-all duration-700 ease-out transform",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      )}>
        <form onSubmit={handleSearchSubmit} className="relative w-full shadow-lg">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm tin tức, bài viết..."
            className="h-14 pl-14 pr-28 rounded-full text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full h-10 px-6">
            Tìm kiếm
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Results Column */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-primary" />
            Kết quả từ Tin tức & Bài viết
          </h1>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : error ? (
             <div className="p-8 text-center border border-destructive/50 rounded-lg bg-destructive/10 text-destructive">
              <p className="font-semibold">Lỗi kết nối</p>
              <p>Không thể tải kết quả tìm kiếm. Vui lòng thử lại sau.</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-6">
              {results.map((item) => (
                <Link key={item.id} href={`/tin-tuc/${item.id}`} className="block group">
                  <Card className="hover:border-primary/50 transition-colors duration-300 overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      {item.imageUrl && (
                        <div className="sm:w-1/3 md:w-1/4 relative min-h-[150px] sm:min-h-full overflow-hidden">
                          <Image 
                            src={item.imageUrl} 
                            alt={item.title} 
                            fill 
                            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
                            sizes="(max-width: 640px) 100vw, 25vw"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-4 flex flex-col">
                        <CardTitle className="text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
                          {item.summary}
                        </p>
                        <p className="text-xs text-muted-foreground mt-3">
                          {new Date(item.publishedAt).toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : initialQuery ? (
            <div className="p-8 text-center border rounded-lg bg-accent/20">
              <p className="text-muted-foreground">Không tìm thấy bài viết nào phù hợp với từ khóa này.</p>
            </div>
          ) : (
            <p className="text-muted-foreground">Nhập từ khóa để bắt đầu tìm kiếm.</p>
          )}
        </div>

        {/* Sidebar for other search options */}
        <aside className="space-y-6">
          <div className="sticky top-24">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Tìm ở nơi khác?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Bạn đang tìm kiếm công cụ AI hay xem thứ hạng các sản phẩm? Hãy thử các lối tắt sau:
                </p>
                
                <div className="flex flex-col gap-3">
                  <Button asChild variant="outline" className="justify-start gap-2 h-auto py-3">
                    <Link href={`/cong-cu?search_query=${encodeURIComponent(searchTerm || "")}`}>
                      <Wrench className="w-4 h-4 text-primary" />
                      <div className="text-left">
                        <div className="font-bold">Tìm trong công cụ</div>
                        <div className="text-[10px] opacity-70 italic">Tìm ứng dụng, phần mềm AI</div>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="justify-start gap-2 h-auto py-3">
                    <Link href="/tro-chuyen">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <div className="text-left">
                        <div className="font-bold">Tìm với chatbot</div>
                        <div className="text-[10px] opacity-70 italic">Nhận gợi ý chính xác hơn từ AI</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <AppLayout>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResultsContent />
      </Suspense>
    </AppLayout>
  );
}
