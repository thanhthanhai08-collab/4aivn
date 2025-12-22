// src/components/rankings/rankings-table.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Tool, AIModel } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
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
                    
                  />
                  <div className="flex flex-col">
                    <Link href={itemType === 'model' ? `/mo-hinh/${item.id}` : `/cong-cu/${item.id}`} className="font-medium hover:underline transition-colors">
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
