// src/components/rankings/rankings-table.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Tool, AIModel } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";


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
  const { currentUser } = useAuth();
  const { toast } = useToast();
  // Store the user's rating for this session. Key: itemId, Value: rating
  const [sessionRatings, setSessionRatings] = useState<Record<string, number>>({});

  // This is a mock function. In a real app, this would trigger a backend update
  // and the new average would be fetched or calculated.
  const handleRating = (itemId: string, itemName: string, newRating: number) => {
    if (!currentUser) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để đánh giá.",
        variant: "destructive",
      });
      return;
    }
    
    // Update the state to reflect the user's choice for this session
    setSessionRatings(prev => ({
      ...prev,
      [itemId]: newRating
    }));
    
    toast({
      title: "Đã gửi đánh giá",
      description: `Cảm ơn bạn đã đánh giá ${itemName} ${newRating} sao.`,
    });
    // Note: The overall average displayed and the ranking won't change in this mock-up.
  };

  const sortedItems = [...items]
    .sort((a, b) => {
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
        const ratingA = a.userRating ?? -Infinity;
        const ratingB = b.userRating ?? -Infinity;
        if (ratingB !== ratingA) return ratingB - ratingA;
        
        return modelA.name.localeCompare(modelB.name);

      } else { // Tool sorting: by userRating only, then by name
        const ratingA = a.userRating ?? -Infinity;
        const ratingB = b.userRating ?? -Infinity;
         if (ratingB !== ratingA) return ratingB - ratingA;
        return a.name.localeCompare(b.name);
      }
    });
  
  let denseRank = 0;
  let lastSignature = "";

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">Hạng</TableHead>
            <TableHead className="min-w-[250px]">{itemType === 'tool' ? 'Tên công cụ AI' : 'Tên model AI'}</TableHead>
            <TableHead className="min-w-[100px]">{itemType === 'tool' ? 'Hạng mục' : 'Nhà phát triển'}</TableHead>
            {itemType === 'model' && (
              <>
                <TableHead className="text-center min-w-[150px]" dangerouslySetInnerHTML={{ __html: "Độ dài ngữ cảnh <br> (token)" }} />
                <TableHead className="text-center min-w-[100px]">Chỉ số thông minh</TableHead>
                <TableHead className="text-center min-w-[160px]" dangerouslySetInnerHTML={{ __html: "Giá trung bình<br> (USD/1M token)" }} />
                <TableHead className="text-right min-w-[100px]">Tốc độ (tok/s)</TableHead>
                <TableHead className="text-right min-w-[100px]">Độ trễ (s)</TableHead>
              </>
            )}
            <TableHead className="text-center min-w-[140px]">Đánh giá của bạn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item) => {
            let currentSignature: string;
            if (itemType === 'model') {
              const modelItem = item as AIModel;
              currentSignature = [
                modelItem.intelligenceScore,
                parseContextLength(modelItem.contextLengthToken),
                modelItem.pricePerMillionTokens,
                modelItem.userRating,
              ].join('-');
            } else {
              currentSignature = String(item.userRating ?? -Infinity);
            }

            if (currentSignature !== lastSignature) {
              denseRank++;
            }
            lastSignature = currentSignature;

            const modelItemForDetails = item as AIModel; 
            const userRatingForThisItem = sessionRatings[item.id] || 0; // The user's vote in this session
            const averageRating = item.userRating ?? 0;

            return (
            <TableRow key={item.id}>
              <TableCell className="text-center font-medium">{denseRank}</TableCell>
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
                  <TableCell className="text-center">
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
                 <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center space-x-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => handleRating(item.id, item.name, star)} aria-label={`Đánh giá ${star} sao`}>
                          <Star
                          className={`h-5 w-5 cursor-pointer transition-colors ${
                              star <= userRatingForThisItem ? "fill-amber-400 text-amber-500" : "text-gray-300 hover:text-amber-300"
                          }`}
                          />
                      </button>
                      ))}
                  </div>
                  {averageRating > 0 && <span className="text-xs text-muted-foreground">TB: {averageRating.toFixed(1)}</span>}
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