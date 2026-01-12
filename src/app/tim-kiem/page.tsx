// src/app/tim-kiem/page.tsx
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Newspaper, Wrench, MessageSquare } from "lucide-react";

// --- SKELETON LOADING ---
function SearchSkeleton() {
  return (
    <div className="container py-8 md:py-12 space-y-6">
      <Skeleton className="h-10 w-1/3 mb-8" />
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
  const query = searchParams.get("q");
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `https://asia-southeast1-clean-ai-hub.cloudfunctions.net/searchNews?q=${encodeURIComponent(query)}`
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
  }, [query]);

  return (
    <div className="container py-8 md:py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-headline font-bold text-foreground flex items-center gap-3">
          <Search className="text-primary" />
          Kết quả tìm kiếm {query ? "cho:" : ""} <span className="text-primary">{query || ""}</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CỘT TRÁI: HIỂN THỊ KẾT QUẢ TIN TỨC (FUNCTION) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-muted-foreground" />
            Tin tức & Bài viết
          </h2>

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
            <div className="grid gap-4">
              {results.map((item) => (
                <Card key={item.id} className="hover:border-primary/50 transition-colors overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                        {item.imageUrl && (
                            <div className="sm:w-1/3 md:w-1/4 relative min-h-[150px] sm:min-h-full">
                                <Link href={`/tin-tuc/${item.id}`} className="block h-full">
                                    <Image 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        fill 
                                        className="object-cover" 
                                        sizes="(max-width: 640px) 100vw, 25vw"
                                    />
                                </Link>
                            </div>
                        )}
                        <div className="flex-1 p-4">
                            <p className="text-xs text-muted-foreground mb-1">
                                {new Date(item.publishedAt).toLocaleDateString("vi-VN")}
                            </p>
                            <CardTitle className="text-lg leading-tight mb-2">
                                <Link href={`/tin-tuc/${item.id}`} className="hover:text-primary transition-colors">
                                {item.title}
                                </Link>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {item.summary}
                            </p>
                        </div>
                    </div>
                </Card>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center border rounded-lg bg-accent/20">
              <p className="text-muted-foreground">Không tìm thấy bài viết nào phù hợp với từ khóa này.</p>
            </div>
          ) : (
            <p className="text-muted-foreground">Nhập từ khóa để tìm kiếm tin tức.</p>
          )}
        </div>

        {/* CỘT PHẢI: GỢI Ý CHUYỂN HƯỚNG */}
        <div className="space-y-6">
          <Card className="sticky top-24 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Tìm ở nơi khác?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Bạn đang tìm kiếm công cụ AI hay xem thứ hạng các sản phẩm? Hãy thử các lối tắt sau:
              </p>
              
              <div className="flex flex-col gap-3">
                {/* NÚT SANG TRANG CÔNG CỤ */}
                <Button asChild variant="outline" className="justify-start gap-2 h-auto py-3">
                  <Link href={`/cong-cu?search_query=${encodeURIComponent(query || "")}`}>
                    <Wrench className="w-4 h-4 text-primary" />
                    <div className="text-left">
                      <div className="font-bold">Tìm trong Công cụ</div>
                      <div className="text-[10px] opacity-70 italic">Tìm ứng dụng, phần mềm AI</div>
                    </div>
                  </Link>
                </Button>

                {/* NÚT SANG TRANG CHATBOT */}
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
            <CardFooter className="pt-2 border-t text-[11px] text-muted-foreground">
              Bạn cũng có thể chat với AI ở góc màn hình để nhận gợi ý chính xác hơn.
            </CardFooter>
          </Card>
        </div>
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
