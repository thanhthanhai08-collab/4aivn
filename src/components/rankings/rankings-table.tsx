// src/components/rankings/rankings-table.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Tool, AIModel } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper function to parse context length strings (e.g., "1m", "200k") into numbers
const parseContextLength = (tokenStr?: string): number => {
  if (!tokenStr) return -Infinity;
  const lower = tokenStr.toLowerCase();
  if (lower.endsWith('m')) {
    return parseFloat(lower.replace('m', '')) * 1000000;
  }
  if (lower.endsWith('k')) {
    return parseFloat(lower.replace('k', '')) * 1000;
  }
  return parseFloat(lower) || -Infinity;
};

interface RankingsTableProps<T extends Tool | AIModel> {
  items: T[];
  itemType: 'tool' | 'model';
}

export function RankingsTable<T extends Tool | AIModel>({ items, itemType }: RankingsTableProps<T>) {

  const sortedItems = [...items]
    .sort((a, b) => {
      const ratingA = a.ratingCount && a.ratingCount > 0 ? (a.totalStars || 0) / a.ratingCount : a.userRating || -Infinity;
      const ratingB = b.ratingCount && b.ratingCount > 0 ? (b.totalStars || 0) / b.ratingCount : b.userRating || -Infinity;

      if (itemType === 'model') {
        const modelA = a as AIModel;
        const modelB = b as AIModel;

        // 1. Sort by intelligenceScore (descending)
        const intelA = modelA.intelligenceScore ?? -Infinity;
        const intelB = modelB.intelligenceScore ?? -Infinity;
        if (intelB !== intelA) return intelB - intelA;

        // 2. Sort by contextLengthToken (descending)
        const contextA = parseContextLength(modelA.contextLengthToken);
        const contextB = parseContextLength(modelB.contextLengthToken);
        if (contextB !== contextA) return contextB - contextA;

        // 3. Sort by pricePerMillionTokens (ascending)
        const priceA = modelA.pricePerMillionTokens ?? Infinity;
        const priceB = modelB.pricePerMillionTokens ?? Infinity;
        if (priceA !== priceB) return priceA - priceB;
        
        // 4. Sort by userRating (descending)
        if (ratingB !== ratingA) return ratingB - ratingA;
        
        return modelA.name.localeCompare(modelB.name);

      } else { // Tool sorting: by ranking property
        const rankA = (a as Tool).ranking ?? Infinity;
        const rankB = (b as Tool).ranking ?? Infinity;
        if (rankA !== rankB) {
            return rankA - rankB;
        }
        return a.name.localeCompare(b.name);
      }
    });
  
  let denseRank = 0;
  let lastSignature = "";

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm h-[calc(100vh-320px)] relative">
      <Table>
        <TableHeader className="sticky top-0 z-10">
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[50px] text-center">Hạng</TableHead>
            <TableHead className="min-w-[200px]">{itemType === 'tool' ? 'Tên công cụ AI' : 'Tên model AI'}</TableHead>

            {itemType === 'tool' ? (
              <>
                <TableHead className="min-w-[150px]">Hạng mục</TableHead>
                <TableHead className="min-w-[150px]">Nhà phát triển</TableHead>
              </>
            ) : (
              <>
                <TableHead className="min-w-[120px]">Nhà phát triển</TableHead>
                <TableHead className="text-center min-w-[120px]">Độ dài ngữ cảnh<br/>(token)</TableHead>
                <TableHead className="text-center min-w-[100px]">Chỉ số<br/>thông minh</TableHead>
                <TableHead className="text-center min-w-[140px]">Giá trung bình<br/>(USD/1M token)</TableHead>
                <TableHead className="text-right min-w-[100px]">Tốc độ<br/>(tok/s)</TableHead>
                <TableHead className="text-right min-w-[100px]">Độ trễ<br/>(s)</TableHead>
              </>
            )}

            <TableHead className="text-center min-w-[120px]">Đánh giá</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item, index) => {
            const averageRating = item.ratingCount && item.ratingCount > 0 
              ? (item.totalStars || 0) / item.ratingCount 
              : item.userRating || 0;

            if (itemType === 'model') {
              const modelItem = item as AIModel;
              const currentSignature = [
                modelItem.intelligenceScore,
                parseContextLength(modelItem.contextLengthToken),
                modelItem.pricePerMillionTokens,
                averageRating,
              ].join('-');

              if (currentSignature !== lastSignature) {
                denseRank = index + 1;
              }
              lastSignature = currentSignature;
            }

            return (
            <TableRow 
                key={item.id} 
                className={cn(
                    "border-b transition-colors data-[state=selected]:bg-muted",
                    "hover:bg-primary hover:text-primary-foreground",
                    "[&>td>a]:hover:text-primary-foreground",
                    index % 2 === 0 ? "bg-accent/50" : ""
                )}
            >
              <TableCell className="text-center font-medium">
                {itemType === 'model' ? denseRank : (item as Tool).ranking || '-'}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Image
                    src={item.logoUrl}
                    alt={`Logo ${item.name}`}
                    width={32}
                    height={32}
                    className="rounded-md object-contain"
                    data-ai-hint="logo company"
                  />
                  <div className="flex flex-col">
                    <Link href={`/${itemType === 'tool' ? 'cong-cu' : 'mo-hinh'}/${item.id}`} className="font-medium hover:underline transition-colors">
                        {item.name}
                    </Link>
                    <span className="text-xs text-muted-foreground truncate max-w-[200px] hidden sm:block">{item.description.substring(0,50)}{item.description.length > 50 ? '...' : ''}</span>
                  </div>
                </div>
              </TableCell>
              
              {itemType === 'tool' ? (
                <>
                  <TableCell>
                    <Badge variant="outline">{(item as Tool).context}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{(item as Tool).developer}</span>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>
                    <span className="text-sm">{(item as AIModel).developer}</span>
                  </TableCell>
                  <TableCell className="text-center">{(item as AIModel).contextLengthToken || '-'}</TableCell>
                  <TableCell className="text-center">{(item as AIModel).intelligenceScore !== undefined ? (item as AIModel).intelligenceScore : '-'}</TableCell>
                  <TableCell className="text-center">
                    {(item as AIModel).pricePerMillionTokens !== undefined ? `$${(item as AIModel).pricePerMillionTokens.toFixed(2)}` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {(item as AIModel).speedTokensPerSecond !== undefined ? (item as AIModel).speedTokensPerSecond.toFixed(1) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
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
