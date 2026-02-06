
// src/app/profile/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolCard } from "@/components/tools/tool-card";
import { NewsCard } from "@/components/news/news-card";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ModelCard } from "@/components/models/model-card";
import type { AIModel, Tool, NewsArticle, UserProfileData } from "@/lib/types";
import {
  Dialog,
    DialogContent,
      DialogHeader,
        DialogTitle,
          DialogTrigger,
          } from "@/components/ui/dialog";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { getUserProfileData } from "@/lib/user-data-service";
import { collection, getDocs, query, where, documentId, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

const sortToolsByRating = (tools: Tool[]) => {
    return tools.sort((a, b) => {
            const ratingA = a.averageRating ?? -1;
                    const ratingB = b.averageRating ?? -1;
                            if (ratingB !== ratingA) return ratingB - ratingA;

                                    const countA = a.ratingCount ?? 0;
                                            const countB = b.ratingCount ?? 0;
                                                    if (countB !== countA) return countB - countA;

                                                            return (a.name || "").localeCompare(b.name || "");
                                                                });
                                                                };

export default function ProfilePage() {
  const { currentUser, isLoading, logout } = useAuth();
    const router = useRouter();
      const { toast } = useToast();
        const [ratedModels, setRatedModels] = useState<AIModel[]>([]);
          const [ratedTools, setRatedTools] = useState<Tool[]>([]);
            const [favoriteTools, setFavoriteTools] = useState<Tool[]>([]);
              const [favoriteModels, setFavoriteModels] = useState<AIModel[]>([]);
                const [bookmarkedNews, setBookmarkedNews] = useState<NewsArticle[]>([]);
                  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
                    const [isFetchingData, setIsFetchingData] = useState(true);
                      const [bio, setBio] = useState("");

    const fetchAllData = useCallback(async () => {
        if (!currentUser) return;
        
        setIsFetchingData(true);
        try {
            const userData = await getUserProfileData(currentUser.uid);
            setBio(userData.bio || "");
            
            const [modelsSnapshot, toolsSnapshot] = await Promise.all([
                getDocs(query(collection(db, "models"), where("post", "==", true))),
                getDocs(query(
                    collection(db, "tools"),
                    where("post", "==", true),
                    orderBy("averageRating", "desc"),
                    orderBy("ratingCount", "desc"),
                    orderBy("__name__")
                )),
            ]);

            const allDbModels = modelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AIModel));
            const allDbTools = toolsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tool));

            const ratedModelIds = Object.keys(userData.ratedModels || {});
            setRatedModels(
                allDbModels
                    .filter(model => ratedModelIds.includes(model.id))
                    .map(model => ({ ...model, myRating: userData.ratedModels?.[model.id] }))
            );

            const ratedToolIds = Object.keys(userData.ratedTools || {});
            const userRatedTools = allDbTools
                .filter(tool => ratedToolIds.includes(tool.id))
                .map(tool => ({ ...tool, myRating: userData.ratedTools?.[tool.id]?.rating }));
            setRatedTools(userRatedTools);

            setFavoriteModels(
                allDbModels.filter(model => (userData.favoriteModels || []).includes(model.id))
            );
            
            const userFavoriteTools = allDbTools.filter(tool => (userData.favoriteTools || []).includes(tool.id));
            setFavoriteTools(userFavoriteTools);
            
            const bookmarkedIds = userData.bookmarkedNews || [];
            if (bookmarkedIds.length > 0) {
                const newsQuery = query(
                    collection(db, "news"), 
                    where("post", "==", true),
                    where(documentId(), "in", bookmarkedIds)
                );
                const newsSnapshot = await getDocs(newsQuery);
                const userBookmarkedNews = newsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    publishedAt: doc.data().publishedAt.toDate().toISOString(),
                } as NewsArticle));
                setBookmarkedNews(userBookmarkedNews);
            } else {
                setBookmarkedNews([]);
            }
        } catch (error) {
            console.error("Failed to fetch user profile data:", error);
            toast({
                title: "Lỗi tải dữ liệu",
                description: "Không thể tải dữ liệu hồ sơ của bạn. Vui lòng thử lại.",
                variant: "destructive"
            });
        } finally {
            setIsFetchingData(false);
        }
    }, [currentUser, toast]);
    
    useEffect(() => {
        if (!isLoading && !currentUser) {
            router.push("/dang-nhap");
        } else if (currentUser) {
            fetchAllData();
        }
    }, [currentUser, isLoading, router, fetchAllData]);

    const handleLogout = async () => {
        await logout();
        toast({ title: "Đã đăng xuất", description: "Bạn đã đăng xuất thành công." });
        router.push("/");
    };
                      
    const getInitials = (name: string | null | undefined) => {
        if (!name) return "N";
        const names = name.split(' ');
        if (names.length > 1) {
          return names[0][0] + names[names.length - 1][0];
        }
        return name.substring(0, 2);
    };

    if (isLoading || !currentUser || isFetchingData) {
        return (
            <AppLayout>
                <div className="container py-12">
                    <div className="flex flex-col items-center space-y-4 mb-12">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <Skeleton className="h-10 w-1/4 mb-4" />
                            <Skeleton className="h-40 w-full rounded-lg" />
                        </div>
                        <div>
                            <Skeleton className="h-10 w-1/4 mb-4" />
                            <Skeleton className="h-40 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="container py-8 md:py-12">
                <Card className="w-full max-w-6xl mx-auto shadow-lg">
                    <CardHeader className="bg-muted/30 p-6">
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-primary">
                                <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || "Người dùng"} />
                                <AvatarFallback className="text-3xl">{getInitials(currentUser.displayName)}</AvatarFallback>
                            </Avatar>
                            <div className="text-center sm:text-left">
                                <CardTitle className="text-3xl font-headline">{currentUser.displayName}</CardTitle>
                                <CardDescription className="text-lg">{currentUser.email}</CardDescription>
                                {bio && <p className="text-base text-muted-foreground mt-2 text-center sm:text-left">{bio}</p>}
                            </div>
                            <div className="sm:ml-auto flex flex-col sm:items-end space-y-2">
                                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <Edit3 className="mr-2 h-4 w-4" /> Chỉnh sửa Hồ sơ
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
                                        </DialogHeader>
                                        <EditProfileForm onSuccess={() => {
                                            setIsEditDialogOpen(false);
                                            fetchAllData(); // Refetch data on success
                                        }} />
                                    </DialogContent>
                                </Dialog>
                                <Button variant="destructive" size="sm" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold font-headline mb-4">Công cụ yêu thích</h2>
                            {favoriteTools.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {favoriteTools.map((tool, index) => (
                                        <ToolCard key={tool.id} tool={tool} rank={index + 1} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Bạn chưa yêu thích công cụ nào.</p>
                            )}
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold font-headline mb-4">Model AI yêu thích</h2>
                            {favoriteModels.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {favoriteModels.map((model) => (
                                        <ModelCard key={model.id} model={model as AIModel} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Bạn chưa yêu thích model AI nào.</p>
                            )}
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold font-headline mb-4">Công cụ AI đã đánh giá</h2>
                            {ratedTools.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {ratedTools.map((tool, index) => (
                                        <ToolCard key={tool.id} tool={tool} rank={index + 1}/>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Bạn chưa đánh giá công cụ AI nào.</p>
                            )}
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold font-headline mb-4">Model AI đã đánh giá</h2>
                            {ratedModels.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {ratedModels.map((model) => (
                                        <ModelCard key={model.id} model={model as AIModel} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Bạn chưa đánh giá model AI nào.</p>
                            )}
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold font-headline mb-4">Tin tức đã lưu</h2>
                            {bookmarkedNews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {bookmarkedNews.map((article) => (
                                        <NewsCard key={article.id} article={article} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Bạn chưa lưu tin tức nào.</p>
                            )}
                        </section>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
