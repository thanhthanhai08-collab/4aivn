'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, BrainCircuit, BookOpen, DollarSign, Zap, Timer } from 'lucide-react';
import type { Tool, AIModel } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface RankingsDisplayProps {
  items: (Tool | AIModel)[];
  itemType: 'tool' | 'model';
}

const formatContextLength = (tokenValue?: number | string): string => {
  if (tokenValue === undefined || tokenValue === null) return '-';
  // If it's a string, it's likely pre-formatted (e.g., '1m', '400k')
  if (typeof tokenValue === 'string') return tokenValue;
  if (tokenValue >= 1000000) {
    return `${tokenValue / 1000000}m`;
  }
  if (tokenValue >= 1000) {
    return `${tokenValue / 1000}k`;
  }
  return String(tokenValue);
};

export function RankingsDisplay({ items, itemType }: RankingsDisplayProps) {
  if (itemType === 'model') {
    const models = items as AIModel[];
    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] p-2 text-center">#</TableHead>
              <TableHead>Tên Model</TableHead>
              <TableHead className="text-center hidden md:table-cell"><BrainCircuit className="inline-block h-4 w-4 mr-1" />Điểm IS</TableHead>
              <TableHead className="text-center hidden md:table-cell"><BookOpen className="inline-block h-4 w-4 mr-1" />Ngữ cảnh</TableHead>
              <TableHead className="text-center hidden lg:table-cell"><DollarSign className="inline-block h-4 w-4 mr-1" />Giá ($/1M)</TableHead>
              <TableHead className="text-center hidden lg:table-cell"><Zap className="inline-block h-4 w-4 mr-1" />Tốc độ (t/s)</TableHead>
              <TableHead className="text-center hidden lg:table-cell"><Timer className="inline-block h-4 w-4 mr-1" />Độ trễ (s)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model, index) => (
              <TableRow key={model.id} className="hover:bg-accent">
                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                <TableCell>
                  <Link href={`/bang-xep-hang/${model.id}`} className="flex items-center gap-3 group">
                    <Image src={model.logoUrl} alt={model.name} width={28} height={28} className="rounded-md" />
                    <div>
                      <p className="font-semibold group-hover:text-primary">{model.name}</p>
                      <p className="text-xs text-muted-foreground">{model.developer}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-center font-semibold hidden md:table-cell">{model.intelligenceScore ?? '-'}</TableCell>
                <TableCell className="text-center hidden md:table-cell">{formatContextLength(model.contextLengthToken)}</TableCell>
                <TableCell className="text-center hidden lg:table-cell">{model.pricePerMillionTokens?.toFixed(2) ?? '-'}</TableCell>
                <TableCell className="text-center hidden lg:table-cell">{model.speedTokensPerSecond?.toFixed(1) ?? '-'}</TableCell>
                <TableCell className="text-center hidden lg:table-cell">{model.latencyFirstChunkSeconds?.toFixed(2) ?? '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (itemType === 'tool') {
    const tools = items as Tool[];
    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] p-2 text-center">#</TableHead>
              <TableHead>Tên Công cụ</TableHead>
              <TableHead className="hidden md:table-cell">Mô tả</TableHead>
              <TableHead className="text-center">Đánh giá</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.map((tool, index) => {
              const averageRating = tool.averageRating ?? 0;
              return (
                <TableRow key={tool.id} className="hover:bg-accent">
                  <TableCell className="font-medium text-center">{index + 1}</TableCell>
                  <TableCell>
                    <Link href={`/cong-cu/${tool.id}`} className="flex items-center gap-3 group">
                      <Image src={tool.logoUrl} alt={tool.name} width={28} height={28} className="rounded-md" />
                      <div>
                        <p className="font-semibold group-hover:text-primary">{tool.name}</p>
                        <p className="text-xs text-muted-foreground">{tool.context}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground line-clamp-2 hidden md:table-cell">{tool.description}</TableCell>
                  <TableCell className="text-center">
                    {averageRating > 0 ? (
                      <div className="flex items-center justify-center gap-1 font-semibold">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-400" />
                        {averageRating.toFixed(1)}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  return null;
}
