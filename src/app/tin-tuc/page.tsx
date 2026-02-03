// src/app/tin-tuc/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsListItem } from "@/components/news/news-list-item";
import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/lib/types";
import { collection, getDocs, orderBy, query, limit, startAfter, where, type QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

const QuickViewItem = ({ article }: { article: NewsArticle }) => (
    <div className="flex items-center space-x-4 group">
        <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></span>
        <div className="flex-grow">
            <Link href={`/${article.id}`} className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-2">{article.title}</Link>
        </div>
        <Link href={`/${article.id}`} className="flex-shrink-0 w-24">
            <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="96px"
                    
                />
            </div>
        </Link>
    </div>
);

const PAGE_SIZE = 15;

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const newsCollection = collection(db, "news");
      const newsQuery = query(
        newsCollection, 
        where("post", "==", true),
        orderBy("publishedAt", "desc"), 
        limit(PAGE_SIZE)
      );
      const querySnapshot = await getDocs(newsQuery);
      
      const newsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt.toDate().toISOString(),
        } as NewsArticle;
      });

      setAllNews(newsData);
      
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastVisible);
      
      if (querySnapshot.docs.length < PAGE_SIZE) {
        setHasMore(false);
      }

    } catch (error) {
      console.error("Error fetching news from Firestore:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNews();
  }, []);

  const handleLoadMore = async () => {
    if (!lastDoc || !hasMore) return;
    
    setIsMoreLoading(true);
    try {
        const newsCollection = collection(db, "news");
        const newsQuery = query(
            newsCollection, 
            where("post", "==", true),
            orderBy("publishedAt", "desc"), 
            startAfter(lastDoc),
            limit(PAGE_SIZE)
        );

        const querySnapshot = await getDocs(newsQuery);
        const newData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                publishedAt: data.publishedAt.toDate().toISOString(),
            } as NewsArticle;
        });

        setAllNews(prev => [...prev, ...newData]);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastDoc(lastVisible);

        if (querySnapshot.docs.length < PAGE_SIZE) {
            setHasMore(false);
        }
    } catch(error) {
        console.error("Error loading more news:", error);
    } finally {
        setIsMoreLoading(false);
    }
  };


  const [featuredArticle, secondaryArticle, ...remainingArticles] = allNews;
  const quickViewArticles = allNews.slice(2, 9);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container py-8">
          <Skeleton className="h-12 w-1/2 mb-12 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-lg" />
              ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        {/* Breadcrumb Section */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm font-medium overflow-x-auto scrollbar-hide pb-2 hidden">
          <ol className="flex items-center text-muted-foreground whitespace-nowrap">
            {/* Cấp 1: Trang chủ */}
            <li className="flex items-center">
              <Link href="/" className="hover:text-primary transition-colors">
                Trang chủ
              </Link>
            </li>
            
            {/* Cấp 2: Tin tức (Cấp hiện tại) */}
            <li className="flex items-center before:content-['/'] before:mx-2 before:text-muted-foreground/30 text-foreground font-semibold">
              {isLoading ? (
                <Skeleton className="h-4 w-16" />
              ) : (
                <span>Tin tức</span>
              )}
            </li>
          </ol>
        </nav>
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl font-headline font-bold text-foreground">Tin tức & Cập nhật AI</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Luôn cập nhật những diễn biến mới nhất trong thế giới AI.
          </p>
        </header>

        {allNews.length === 0 && !isLoading ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Chưa có bài viết nào để hiển thị.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-8">
                {featuredArticle && (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        <div className="group relative rounded-lg overflow-hidden shadow-lg flex flex-col md:col-span-3">
                           <Link href={`/${featuredArticle.id}`} className="block aspect-[16/9] relative">
                                <Image
                                    src={featuredArticle.imageUrl}
                                    alt={featuredArticle.title}
                                    fill
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                           </Link>
                           <div className="p-4 bg-card flex-grow flex flex-col">
                                <h2 className="text-2xl font-bold font-headline text-foreground leading-tight flex-grow">
                                     <Link href={`/${featuredArticle.id}`} className="hover:text-primary transition-colors">{featuredArticle.title}</Link>
                                </h2>
                                <p className="text-sm text-muted-foreground mt-2">Bởi {featuredArticle.author}</p>
                           </div>
                        </div>
                        
                        {secondaryArticle && (
                            <div className="p-4 rounded-lg bg-card border flex flex-col justify-between md:col-span-2">
                                <div className="space-y-3">
                                     <Link href={`/${secondaryArticle.id}`} className="block aspect-[16/9] relative rounded-md overflow-hidden group">
                                         <Image
                                            src={secondaryArticle.imageUrl}
                                            alt={secondaryArticle.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            priority // Thêm thuộc tính này vào đây
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                         />
                                     </Link>
                                    <div>
                                        <h2 className="text-xl font-bold font-headline mb-2">
                                            <Link href={`/${secondaryArticle.id}`} className="hover:text-primary">{secondaryArticle.title}</Link>
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-1">Bởi {secondaryArticle.author}</p>
                                        <p className="text-sm text-foreground/80 line-clamp-3">{secondaryArticle.content.replace(/<[^>]*>/g, "")}</p>
                                    </div>
                                </div>
                                <Button asChild variant="link" className="p-0 self-start mt-4">
                                    <Link href={`/${secondaryArticle.id}`}>Đọc thêm &rarr;</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <Link href="/tin-tuc/danh-gia" className="group flex h-24 items-center justify-center rounded-lg bg-chart-1 text-center font-bold text-white shadow-lg transition-transform hover:-translate-y-1">
                        <span className="text-lg">Đánh giá</span>
                    </Link>
                    <Link href="/tin-tuc/huong-dan" className="group flex h-24 items-center justify-center rounded-lg bg-chart-2 text-center font-bold text-white shadow-lg transition-transform hover:-translate-y-1">
                        <span className="text-lg">Hướng dẫn</span>
                    </Link>
                    <Link href="/tin-tuc/vibe-coding" className="group flex h-24 items-center justify-center rounded-lg bg-chart-3 text-center font-bold text-white shadow-lg transition-transform hover:-translate-y-1">
                        <span className="text-lg">Vibe coding</span>
                    </Link>
                    <Link href="/tin-tuc/xu-huong" className="group flex h-24 items-center justify-center rounded-lg bg-chart-4 text-center font-bold text-white shadow-lg transition-transform hover:-translate-y-1">
                        <span className="text-lg">Xu hướng</span>
                    </Link>
                </div>
                
                {/* Remaining articles list */}
                <div className="space-y-8 pt-8 border-t">
                    {remainingArticles.map((article) => (
                        <NewsListItem key={article.id} article={article} />
                    ))}
                </div>

                {hasMore && (
                  <div className="text-center pt-4">
                    <Button onClick={handleLoadMore} disabled={isMoreLoading} size="lg">
                      {isMoreLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Đọc thêm
                    </Button>
                  </div>
                )}
            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1">
                <div className="p-6 rounded-lg bg-card border sticky top-24">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold font-headline">Xem nhanh</h3>
                    </div>
                    <div className="space-y-5">
                        {quickViewArticles.map((article) => (
                            <QuickViewItem key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
