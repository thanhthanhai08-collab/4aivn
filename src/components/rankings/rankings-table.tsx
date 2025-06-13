
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
    .sort((a, b) => {
      if (itemType === 'model') {
        const modelA = a as AIModel;
        const modelB = b as AIModel;

        // Primary sort: intelligenceScore (descending), undefined/null last
        const intelA = modelA.intelligenceScore ?? -Infinity;
        const intelB = modelB.intelligenceScore ?? -Infinity;
        if (intelB !== intelA) {
          return intelB - intelA;
        }

        // Secondary sort: userRating (descending), undefined/null last
        const ratingA = modelA.userRating ?? -Infinity;
        const ratingB = modelB.userRating ?? -Infinity;
        return ratingB - ratingA;
      } else { // Tool: sort by userRating only
        const ratingA = a.userRating ?? -Infinity;
        const ratingB = b.userRating ?? -Infinity;
        return ratingB - ratingA;
      }
    });

  let denseRankNumber = 0; 
  let lastProcessedIntelScore = Number.POSITIVE_INFINITY;
  let lastProcessedUserRating = Number.POSITIVE_INFINITY; // For models
  let lastProcessedToolUserRating = Number.POSITIVE_INFINITY; // For tools


  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">Hạng</TableHead>
            <TableHead className="min-w-[250px]">Tên</TableHead>
            <TableHead className="min-w-[120px]">{itemType === 'tool' ? 'Hạng mục' : 'Nhà phát triển'}</TableHead>
            {itemType === 'model' && (
              <>
                <TableHead className="text-center min-w-[120px]" dangerouslySetInnerHTML={{ __html: "Độ dài ngữ cảnh <br> (token)" }} />
                <TableHead className="text-center min-w-[100px]">Thông minh</TableHead>
                <TableHead className="text-right min-w-[100px]" dangerouslySetInnerHTML={{ __html: "Giá trung bình<br> (USD/1M token)" }} />
                <TableHead className="text-right min-w-[100px]">Tốc độ (tok/s)</TableHead>
                <TableHead className="text-right min-w-[100px]">Độ trễ (s)</TableHead>
              </>
            )}
            <TableHead className="text-center min-w-[120px]">Đánh giá</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item) => {
            let rankToDisplay: string | number = '-';
            const currentItemIsModel = itemType === 'model';
            
            if (currentItemIsModel) {
              const modelItem = item as AIModel;
              // Only assign rank if intelligenceScore is defined for models, otherwise it remains '-'
              if (modelItem.intelligenceScore !== undefined && modelItem.intelligenceScore !== null) {
                  const currentIntel = modelItem.intelligenceScore;
                  const currentUserRating = modelItem.userRating ?? -Infinity; // Use -Infinity for undefined ratings in comparison

                  if (currentIntel < lastProcessedIntelScore || 
                      (currentIntel === lastProcessedIntelScore && currentUserRating < lastProcessedUserRating)) {
                      denseRankNumber++;
                  }
                  rankToDisplay = denseRankNumber;
                  lastProcessedIntelScore = currentIntel;
                  lastProcessedUserRating = currentUserRating;
              }
            } else { // Tool itemType
              if (item.userRating !== undefined && item.userRating !== null) {
                  if (item.userRating < lastProcessedToolUserRating) {
                      denseRankNumber++; 
                  }
                  rankToDisplay = denseRankNumber;
                  lastProcessedToolUserRating = item.userRating;
              }
            }
            
            const modelItemForDetails = item as AIModel; 

            return (
            <TableRow key={item.id}>
              <TableCell className="text-center font-medium">{rankToDisplay}</TableCell>
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
                  <span className="text-sm">{modelItemForDetails.developer}</span>
                )}
              </TableCell>
              {itemType === 'model' && (
                <>
                  <TableCell className="text-center">{modelItemForDetails.contextLengthToken || '-'}</TableCell>
                  <TableCell className="text-center">{modelItemForDetails.intelligenceScore !== undefined ? modelItemForDetails.intelligenceScore : '-'}</TableCell>
                  <TableCell className="text-right">
                    {modelItemForDetails.pricePerMillionTokens !== undefined ? `$${modelItemForDetails.pricePerMillionTokens.toFixed(2)}` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {modelItemForDetails.speedTokensPerSecond !== undefined ? modelItemForDetails.speedTokensPerSecond.toFixed(1) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {modelItemForDetails.latencyFirstChunkSeconds !== undefined ? modelItemForDetails.latencyFirstChunkSeconds.toFixed(2) : '-'}
                  </TableCell>
                </>
              )}
              <TableCell className="text-center">
                {renderStars(item.userRating)}
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
