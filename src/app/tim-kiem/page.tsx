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
       <Skeleton className="h-14 w-full max-w-2xl mx-auto rounded-full" />
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-8">
        <div className="lg:col-span-2 space-y-6">
           <Skeleton className="h-40 w-full rounded-2xl" />
           <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
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

  useEffect(() => {
    if (!initialQuery) {
      setIsLoading(false);
      setResults([]);
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
      {/* ẨN THANH TÌM KIẾM TRÊN MENU */}
      <style jsx global>{`
        header [data-search-container], 
        header .search-trigger,
        header form[role="search"] { 
          display: none !important; 
        }
      `}</style>

      {/* Search Bar - Giao diện tròn, không dấu X, không hiệu ứng trượt */}
      <div className="mb-16 max-w-2xl mx-auto">
        <form onSubmit={handleSearchSubmit} className="relative w-full group">
          <div className="relative flex items-center shadow-md rounded-full overflow-hidden bg-background border-2 border-primary/10 focus-within:border-primary transition-all duration-300">
            <Search className="absolute left-5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Tìm kiếm tin tức, bài viết..."
              className="h-14 pl-14 pr-36 rounded-full border-none focus-visible:ring-0 text-lg bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              type="submit" 
              className="absolute right-1.5 h-11 rounded-full px-8 font-semibold shadow-sm"
            >
              Tìm kiếm
            </Button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cột chính */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-primary" />
              {initialQuery ? 'Kết quả tìm kiếm' : 'Tin tức mới nhất'}
            </h1>
            {initialQuery && !isLoading && (
              <span className="text-sm font-medium text-muted-foreground bg-accent px-3 py-1 rounded-full">
                {results.length} kết quả
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-40 w-full rounded-2xl" />
            </div>
          ) : error ? (
            <div className="p-10 text-center border-2 border-dashed border-destructive/20 rounded-2xl bg-destructive/5 text-destructive">
              <p className="font-bold">Lỗi kết nối máy chủ</p>
              <p className="text-sm">Vui lòng kiểm tra lại đường truyền và thử lại.</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-6">
              {results.map((item) => (
                <Link key={item.id} href={`/tin-tuc/${item.id}`} className="block group">
                  <Card className="rounded-2xl border-primary/5 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col sm:flex-row h-full">
                      {item.imageUrl && (
                        <div className="sm:w-48 relative aspect-video sm:aspect-square overflow-hidden shrink-0">
                          <Image 
                            src={item.imageUrl} 
                            alt="" 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 200px" 
                          />
                        </div>
                      )}
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {item.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                            {item.summary}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-primary/40" />
                           <time className="text-[11px] font-bold text-muted-foreground/80 tracking-wider">
                            {new Date(item.publishedAt).toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' })}
                          </time>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : initialQuery ? (
            <div className="py-20 text-center bg-accent/20 rounded-3xl border-2 border-dashed border-primary/10">
              <p className="text-lg text-muted-foreground">Không tìm thấy nội dung cho "<span className="text-foreground font-semibold">{initialQuery}</span>"</p>
              <p className="text-sm text-muted-foreground mt-1">Hãy thử tìm kiếm với các từ khóa ngắn gọn hơn.</p>
            </div>
          ) : (
            <div className="py-20 text-center opacity-40">
               <Search className="w-16 h-16 mx-auto mb-4" />
               <p className="text-lg">Khám phá kho tri thức AI tại 4AIVN</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="sticky top-24">
            <Card className="rounded-3xl border-primary/10 bg-gradient-to-br from-background to-primary/5 shadow-inner">
              <CardHeader>
                <CardTitle className="text-lg">Tìm kiếm ở nơi khác?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Bạn đang tìm kiếm công cụ AI hay muốn trò chuyện với trợ lý ảo? Hãy thử ở đây:</p>
                <Button asChild variant="secondary" className="w-full justify-start gap-3 rounded-xl h-14 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Link href={`/cong-cu?search_query=${encodeURIComponent(searchTerm)}`}>
                    <Wrench className="w-5 h-5" />
                    <span className="font-bold">Tìm trong công cụ</span>
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full justify-start gap-3 rounded-xl h-14 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Link href="/tro-chuyen">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-bold">Tìm với chatbot</span>
                  </Link>
                </Button>
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
