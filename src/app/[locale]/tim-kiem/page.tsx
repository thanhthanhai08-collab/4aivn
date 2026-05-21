// src/app/tim-kiem/page.tsx
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/routing";
import { useEffect, useState, Suspense, type FormEvent } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Newspaper, Wrench, MessageSquare, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("search");

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
      router.push(`/tim-kiem?q=${encodeURIComponent(searchTerm.trim())}` as any);
    }
  };

  return (
    <div className="container py-8 md:py-12">
      {/* Search Bar - Giao diện tròn, không dấu X, không hiệu ứng trượt */}
      <div className="mb-16 max-w-2xl mx-auto">
        <form onSubmit={handleSearchSubmit} className="relative w-full group">
          <div className="relative flex items-center shadow-md rounded-full overflow-hidden bg-background border-2 border-primary/10 focus-within:border-primary transition-all duration-300">
            <Search className="absolute left-5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder={t("search_placeholder")}
              className="h-14 pl-14 pr-36 rounded-full border-none focus-visible:ring-0 text-lg bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              type="submit" 
              className="absolute right-1.5 h-11 rounded-full px-8 font-semibold shadow-sm"
            >
              {t("btn_search")}
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
              {initialQuery ? t("search_results") : t("latest_news")}
            </h1>
            {initialQuery && !isLoading && (
              <span className="text-sm font-medium text-muted-foreground bg-accent px-3 py-1 rounded-full">
                {t("results_count", { count: results.length })}
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
              <p className="font-bold">{t("connection_error")}</p>
              <p className="text-sm">{t("connection_error_desc")}</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((item) => (
                <Link key={item.id} href={`/${item.id}` as any} className="block group">
                  <Card className="rounded-xl border-primary/5 hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                    <div className="flex items-center">
                      {item.imageUrl && (
                        <div className="w-40 sm:w-48 relative aspect-[16/9] overflow-hidden shrink-0">
                          <Image 
                            src={item.imageUrl} 
                            alt="" 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 160px, 192px" 
                          />
                        </div>
                      )}
                      <div className="flex-1 p-4 flex flex-col justify-center">
                          <CardTitle className="text-base sm:text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {item.title}
                          </CardTitle>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2 mb-2 leading-relaxed">
                            {item.summary}
                          </p>
                        <div className="flex items-center gap-2 mt-auto">
                           <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                           <time className="text-[10px] font-semibold text-muted-foreground/80 tracking-wider uppercase">
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
              <p className="text-lg text-muted-foreground">{t("not_found")} "<span className="text-foreground font-semibold">{initialQuery}</span>"</p>
              <p className="text-sm text-muted-foreground mt-1">{t("try_shorter")}</p>
            </div>
          ) : (
            <div className="py-20 text-center opacity-40">
               <Search className="w-16 h-16 mx-auto mb-4" />
               <p className="text-lg">{t("explore_knowledge")}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="sticky top-24">
            <Card className="rounded-3xl border-primary/10 bg-gradient-to-br from-background to-primary/5 shadow-inner">
              <CardHeader>
                <CardTitle className="text-lg">{t("search_elsewhere")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{t("search_elsewhere_desc")}</p>
                <Button asChild variant="secondary" className="w-full justify-start gap-3 rounded-xl h-14 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Link href={`/cong-cu?search_query=${encodeURIComponent(searchTerm)}` as any}>
                    <Wrench className="w-5 h-5" />
                    <span className="font-bold">{t("search_in_tools")}</span>
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full justify-start gap-3 rounded-xl h-14 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Link href="/chatbot">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-bold">{t("search_with_chatbot")}</span>
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
    <AppLayout hideHeaderSearch={true}>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResultsContent />
      </Suspense>
    </AppLayout>
  );
}
