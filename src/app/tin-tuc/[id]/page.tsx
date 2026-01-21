
// src/app/tin-tuc/[id]/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsListItem } from "@/components/news/news-list-item";
import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/lib/types";
import { collection, getDocs, orderBy, query, limit, startAfter, where, doc, getDoc, type QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, ArrowLeft, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const PAGE_SIZE = 12;

function NewsCategoryContent({ params }: { params: { id: string }}) {
    const { id: categoryId } = params;
    const [isLoading, setIsLoading] = useState(true);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [category, setCategory] = useState<{ id: string; name: string } | null>(null);
    const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            if (!categoryId) return;
            
            setIsLoading(true);
            setArticles([]);
            setLastDoc(null);
            setLatestNews([]);

            let currentCategory: { id: string; name: string } | null = null;
            try {
                const categoryDocRef = doc(db, "news-category", categoryId);
                const categoryDocSnap = await getDoc(categoryDocRef);

                if (categoryDocSnap.exists()) {
                    currentCategory = { id: categoryId, name: categoryDocSnap.data().name };
                    setCategory(currentCategory);
                } else {
                    const fallbackName = categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    currentCategory = { id: categoryId, name: fallbackName };
                    setCategory(currentCategory);
                    console.warn(`Category document with ID "${categoryId}" not found.`);
                }
            } catch (error) {
                console.error("Error fetching category:", error);
                setIsLoading(false);
                return;
            }
            
            try {
                const articlesRef = collection(db, "news");
                const articlesQuery = query(
                    articlesRef,
                    where("post", "==", true),
                    where("category", "array-contains", currentCategory),
                    orderBy("publishedAt", "desc"),
                    limit(PAGE_SIZE)
                );

                const latestNewsQuery = query(
                    collection(db, "news"),
                    where("post", "==", true),
                    orderBy("publishedAt", "desc"),
                    limit(3)
                );

                const [articlesSnapshot, latestNewsSnapshot] = await Promise.all([
                    getDocs(articlesQuery),
                    getDocs(latestNewsQuery)
                ]);

                const newsData = articlesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    publishedAt: doc.data().publishedAt.toDate().toISOString(),
                } as NewsArticle));

                setArticles(newsData);
                const lastVisible = articlesSnapshot.docs[articlesSnapshot.docs.length - 1];
                setLastDoc(lastVisible);
                setHasMore(articlesSnapshot.docs.length === PAGE_SIZE);

                const latestNewsData = latestNewsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    publishedAt: doc.data().publishedAt.toDate().toISOString(),
                } as NewsArticle));
                setLatestNews(latestNewsData);

            } catch (error) {
                console.error("Error fetching articles by category:", error);
                setHasMore(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [categoryId]);

    const handleLoadMore = async () => {
        if (!lastDoc || !hasMore || isMoreLoading || !category) return;
        
        setIsMoreLoading(true);
        try {
            const articlesRef = collection(db, "news");
            const q = query(
                articlesRef,
                where("post", "==", true),
                where("category", "array-contains", category),
                orderBy("publishedAt", "desc"),
                startAfter(lastDoc),
                limit(PAGE_SIZE)
            );

            const querySnapshot = await getDocs(q);
            const newData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                publishedAt: doc.data().publishedAt.toDate().toISOString(),
            } as NewsArticle));

            setArticles(prev => [...prev, ...newData]);
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastDoc(lastVisible);
            setHasMore(querySnapshot.docs.length === PAGE_SIZE);
        } catch(error) {
            console.error("Error loading more articles:", error);
        } finally {
            setIsMoreLoading(false);
        }
    };
    
    return (
        <AppLayout>
            <div className="container py-8 md:py-12">
                <header className="mb-8 md:mb-12 text-center">
                    {isLoading ? (
                        <Skeleton className="h-12 w-1/2 mx-auto" />
                    ) : (
                        <>
                         <p className="text-primary font-semibold mb-2">Danh mục tin tức</p>
                         <h1 className="text-4xl font-headline font-bold text-foreground">{category?.name}</h1>
                        </>
                    )}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <Button variant="outline" size="sm" asChild className="mb-8">
                            <Link href="/tin-tuc"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang Tin tức</Link>
                        </Button>
                        {isLoading ? (
                            <div className="space-y-8">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                        <Skeleton className="md:col-span-1 h-40 w-full rounded-lg" />
                                        <div className="md:col-span-3 space-y-3">
                                            <Skeleton className="h-6 w-3/4" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-2/3" />
                                            <Skeleton className="h-8 w-1/4 mt-2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-xl text-muted-foreground">Chưa có bài viết nào trong danh mục này.</p>
                                <Button asChild variant="link" className="mt-4">
                                    <Link href="/tin-tuc">Xem tất cả tin tức</Link>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-8">
                                    {articles.map((article) => (
                                        <NewsListItem key={article.id} article={article} />
                                    ))}
                                </div>
                                {hasMore && (
                                    <div className="text-center pt-8 mt-8">
                                        <Button onClick={handleLoadMore} disabled={isMoreLoading} size="lg">
                                        {isMoreLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Tải thêm
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <aside className="lg:col-span-4 mt-8 lg:mt-0 lg:sticky lg:top-24 h-fit space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-headline font-bold text-primary">Tin mới nhất</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {latestNews.map((related) => (
                                <Link key={related.id} href={`/${related.id}`} className="block group border-b pb-4 last:border-b-0 last:pb-0">
                                    <div className="flex items-start space-x-4">
                                        <div className="relative w-24 aspect-video shrink-0 overflow-hidden rounded-md">
                                            <Image
                                                src={related.imageUrl}
                                                alt={related.title}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-110 duration-300"
                                                sizes="96px"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-3 mb-2">
                                                {related.title}
                                            </h4>
                                            <div className="flex items-center text-[11px] text-muted-foreground mt-auto">
                                                <CalendarDays className="mr-1 h-3 w-3" />
                                                <span>
                                                    {format(new Date(related.publishedAt), "dd/MM/yyyy", { locale: vi })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                ))}
                            </CardContent>
                        </Card>
                        <Card className="bg-accent/50 text-center p-6">
                            <h3 className="text-xl font-bold mb-2 leading-snug text-foreground">Nâng cấp quy trình làm việc của bạn</h3>
                            <p className="mb-4 text-sm text-muted-foreground">Khám phá chatbot AI có thể cung cấp các công cụ AI phù hợp cho bạn</p>
                            <Button asChild>
                                <Link href="/tro-chuyen">Khám phá chatbot AI</Link>
                            </Button>
                        </Card>
                    </aside>
                </div>
            </div>
        </AppLayout>
    );
}

export default function NewsCategoryPage({ params }: { params: { id: string } }) {
    // Suspense Boundary is good practice for pages using useSearchParams or other client hooks
    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
            <NewsCategoryContent params={params} />
        </Suspense>
    )
}
