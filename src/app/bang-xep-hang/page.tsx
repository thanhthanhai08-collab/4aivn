// src/app/bang-xep-hang/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tool, AIModel } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/firebase";
import { collection, getDocs, type Timestamp, query, orderBy, where } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Star, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Helper function to format context length for display
const formatContextLength = (tokenValue?: number): string => {
    if (tokenValue === undefined || tokenValue === null) return '-';
    if (tokenValue >= 1000000) {
        return `${tokenValue / 1000000}m`;
    }
    if (tokenValue >= 1000) {
        return `${tokenValue / 1000}k`;
    }
    return String(tokenValue);
};

interface RankingsTableProps<T extends Tool | AIModel> {
  items: T[];
  itemType: 'tool' | 'model';
}

export function RankingsTable<T extends Tool | AIModel>({ items, itemType }: RankingsTableProps<T>) {
  // Items are pre-sorted by the parent component
  const sortedItems = items;
 
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[50px] text-center">Hạng</TableHead>
            <TableHead className="min-w-[200px] text-center">{itemType === 'tool' ? 'Tên công cụ AI' : 'Tên model AI'}</TableHead>

            {itemType === 'tool' ? (
              <>
                <TableHead className="min-w-[150px] text-center">Hạng mục</TableHead>
                <TableHead className="min-w-[150px] text-center">Nhà phát triển</TableHead>
              </>
            ) : (
              <>
                <TableHead className="min-w-[120px] text-center">Nhà phát triển</TableHead>
                <TableHead className="text-center min-w-[120px]">Độ dài ngữ cảnh<br/>(token)</TableHead>
                <TableHead className="text-center min-w-[100px]">Chỉ số<br/>thông minh</TableHead>
                <TableHead className="text-center min-w-[140px]">Giá trung bình<br/>(USD/1M token)</TableHead>
                <TableHead className="text-center min-w-[100px]">Tốc độ<br/>(token/s)</TableHead>
                <TableHead className="text-center min-w-[100px]">Độ trễ<br/>(s)</TableHead>
              </>
            )}

            <TableHead className="text-center min-w-[120px]">Đánh giá</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item, index) => {
            const averageRating = item.ratingCount && item.ratingCount > 0
              ? item.averageRating || ((item.totalStars || 0) / item.ratingCount)
              : 0;
           
            return (
            <TableRow
                key={item.id}
                className={cn(
                    "border-b transition-colors data-[state=selected]:bg-muted hover:bg-primary hover:text-primary-foreground",
                    "[&>td>a]:hover:text-primary-foreground",
                    index % 2 === 0 ? "bg-accent/50" : ""
                )}
            >
              <TableCell className="text-center font-medium">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Image
                    src={item.logoUrl}
                    alt={`Logo ${item.name}`}
                    width={32}
                    height={32}
                    className="rounded-md object-contain"
                    priority={index < 5}
                  />
                  <div className="flex flex-col">
                    <Link href={itemType === 'model' ? `/bang-xep-hang/${item.id}` : `/cong-cu/${item.id}`} className="font-medium hover:underline transition-colors">
                        {item.name}
                    </Link>
                    <span className="text-xs text-muted-foreground truncate max-w-[200px] hidden sm:block">{item.description.substring(0,50)}{item.description.length > 50 ? '...' : ''}</span>
                  </div>
                </div>
              </TableCell>
             
              {itemType === 'tool' ? (
                <>
                  <TableCell className="text-center">
                    <Badge variant="outline">{(item as Tool).context}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">{(item as Tool).developer}</span>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="text-center">
                    <span className="text-sm">{(item as AIModel).developer}</span>
                  </TableCell>
                  <TableCell className="text-center">{formatContextLength((item as AIModel).contextLengthToken as number)}</TableCell>
                  <TableCell className="text-center">{(item as AIModel).intelligenceScore !== undefined ? (item as AIModel).intelligenceScore : '-'}</TableCell>
                  <TableCell className="text-center">
                    {(item as AIModel).pricePerMillionTokens !== undefined ? `$${(item as AIModel).pricePerMillionTokens.toFixed(2)}` : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {(item as AIModel).speedTokensPerSecond !== undefined ? (item as AIModel).speedTokensPerSecond.toFixed(1) : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {(item as AIModel).latencyFirstChunkSeconds !== undefined ? (item as AIModel).latencyFirstChunkSeconds.toFixed(2) : '-'}
                  </TableCell>
                </>
              )}

              <TableCell>
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= averageRating
                            ? "fill-amber-400 text-amber-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  {averageRating > 0 && (
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      ({averageRating.toFixed(1)})
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
       {sortedItems.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          Không có {itemType === 'tool' ? 'công cụ' : 'model'} nào để hiển thị.
        </div>
      )}
    </div>
  );
}

export default function RankingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [allModels, setAllModels] = useState<AIModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelsQuery = query(
          collection(db, "models"),
          where("post", "==", true), // Added post filter
          orderBy("intelligenceScore", "desc"),
          orderBy("contextLengthToken", "desc"),
          orderBy("pricePerMillionTokens", "asc"),
          orderBy("latencyFirstChunkSeconds", "asc"),
          orderBy("speedTokensPerSecond", "desc")
        );

        // Updated tools query to use the composite index and filter by post == true
        const toolsQuery = query(
          collection(db, "tools"),
          where("post", "==", true),
          orderBy("averageRating", "desc"),
          orderBy("ratingCount", "desc"),
          orderBy("__name__")
        );

        const [toolsSnapshot, modelsSnapshot] = await Promise.all([
          getDocs(toolsQuery),
          getDocs(modelsQuery)
        ]);

        const dbModels = modelsSnapshot.docs.map(doc => {
            const data = doc.data();
            const releaseDateTimestamp = data.releaseDate as Timestamp;
            return { 
                id: doc.id, 
                ...data,
                releaseDate: releaseDateTimestamp ? releaseDateTimestamp.toDate().toLocaleDateString('vi-VN') : undefined,
            } as AIModel
        });
        
        const dbTools = toolsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Tool));

        setAllTools(dbTools);
        setAllModels(dbModels);

      } catch (error) {
        console.error("Error fetching data:", error);
        setAllTools([]); 
        setAllModels([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredModels = useMemo(() => {
    return allModels.filter(model => 
      (model.name && model.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (model.description && model.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [allModels, searchTerm]);

  const filteredTools = useMemo(() => {
    // Data is already sorted by Firestore. We just need to filter by search term.
    return allTools.filter(tool => 
      (tool.name && tool.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [allTools, searchTerm]);

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm font-medium hidden">
            <ol className="flex items-center text-muted-foreground">
            <li className="flex items-center">
                <Link 
                href="/" 
                className="hover:text-primary transition-colors"
                >
                Trang chủ
                </Link>
            </li>
            
            <li className="flex items-center before:content-['/'] before:mx-2 before:text-muted-foreground/30">
                <span className="text-foreground font-semibold">
                Bảng xếp hạng
                </span>
            </li>
            </ol>
        </nav>
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold text-foreground">
            Bảng xếp hạng AI
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            So sánh các công cụ và mô hình AI hàng đầu dựa trên hiệu suất và đánh giá của cộng đồng.
          </p>
        </header>

        <div className="flex flex-col items-center space-y-8">
            <div className="w-full max-w-lg relative">
                <Input 
                    type="search"
                    placeholder="Tìm kiếm model hoặc công cụ..."
                    className="pl-10 h-11"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            <Tabs defaultValue="models" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
                <TabsTrigger 
                    value="models" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:border data-[state=inactive]:border-border data-[state=active]:border data-[state=active]:border-primary"
                >
                    Model AI
                </TabsTrigger>
                <TabsTrigger 
                    value="tools" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:border data-[state=inactive]:border-border data-[state=active]:border data-[state=active]:border-primary"
                >
                    Công cụ AI
                </TabsTrigger>
              </TabsList>
              <TabsContent value="models" className="mt-6">
                {isLoading ? (
                  <Skeleton className="h-[400px] w-full rounded-lg" />
                ) : (
                  <RankingsTable items={filteredModels} itemType="model" />
                )}
              </TabsContent>
              <TabsContent value="tools" className="mt-6">
                 {isLoading ? (
                  <Skeleton className="h-[400px] w-full rounded-lg" />
                ) : (
                  <RankingsTable items={filteredTools} itemType="tool" />
                )}
              </TabsContent>
            </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
