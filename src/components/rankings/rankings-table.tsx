// src/components/rankings/rankings-table.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Tool, AIModel } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink } from "lucide-react";

interface RankingsTableProps<T extends Tool | AIModel> {
  items: T[];
  itemType: 'tool' | 'model';
}

const renderStars = (rating?: number) => {
  if (rating === undefined || rating === null) return <span className="text-xs text-muted-foreground">Chưa có</span>;
  
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.4 && rating % 1 < 0.9; 
  const roundedRatingForDisplay = Math.round(rating * 10) / 10;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={`full-${i}`} className="h-4 w-4 fill-amber-400 text-amber-500" />;
        }
        if (i === fullStars && halfStar) {
           if ( i < rating ) { 
             return <Star key={`dec-${i}`} className="h-4 w-4 fill-amber-400 text-amber-500" />;
           }
        }
        return <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />;
      })}
      <span className="ml-1.5 text-xs font-medium text-foreground">({roundedRatingForDisplay.toFixed(1)})</span>
    </div>
  );
};


export function RankingsTable<T extends Tool | AIModel>({ items, itemType }: RankingsTableProps<T>) {
  const sortedItems = [...items]
    .sort((a, b) => (b.userRating ?? -1) - (a.userRating ?? -1));

  let rank = 0;
  let lastRating = Infinity;

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">Hạng</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>{itemType === 'tool' ? 'Hạng mục' : 'Nhà phát triển'}</TableHead>
            <TableHead className="text-center">Đánh giá</TableHead>
            <TableHead className="text-right">Liên kết</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item, index) => {
            if (item.userRating !== undefined && item.userRating !== null) {
               if (item.userRating < lastRating) {
                rank = index + 1;
                lastRating = item.userRating;
              } else if (item.userRating === lastRating) {
                // Keep same rank for ties
              }
            } else {
              // Items without rating are listed last without a rank number
            }
            
            const currentRankDisplay = item.userRating !== undefined && item.userRating !== null ? rank : '-';

            return (
            <TableRow key={item.id}>
              <TableCell className="text-center font-medium">{currentRankDisplay}</TableCell>
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
                    {itemType === 'tool' ? (
                      <Link href={`/tools/${item.id}`} className="font-medium hover:underline hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    ) : (
                       <Link href={`/models/${item.id}`} className="font-medium hover:underline hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    )}
                    <span className="text-xs text-muted-foreground truncate max-w-[200px] hidden sm:block">{item.description.substring(0,50)}{item.description.length > 50 ? '...' : ''}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {itemType === 'tool' ? (
                  <Badge variant="outline">{(item as Tool).context}</Badge>
                ) : (
                  <span className="text-sm">{(item as AIModel).developer}</span>
                )}
              </TableCell>
              <TableCell className="text-center">
                {renderStars(item.userRating)}
              </TableCell>
              <TableCell className="text-right">
                {item.link && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {itemType === 'tool' ? 'Truy cập' : 'Chi tiết'}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
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
