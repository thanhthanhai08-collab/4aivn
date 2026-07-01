"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Star } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import type { AIModel, Tool } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const formatContextLength = (tokenValue?: number): string => {
  if (tokenValue === undefined || tokenValue === null) return "-";
  if (tokenValue >= 1_000_000) return `${tokenValue / 1_000_000}m`;
  if (tokenValue >= 1_000) return `${tokenValue / 1_000}k`;
  return String(tokenValue);
};

interface RankingsTableProps<T extends Tool | AIModel> {
  items: T[];
  itemType: "tool" | "model";
}

function RankingsTable<T extends Tool | AIModel>({ items, itemType }: RankingsTableProps<T>) {
  const locale = useLocale();

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[50px] text-center">{locale === "en" ? "Rank" : "Hạng"}</TableHead>
            <TableHead className="min-w-[200px] text-center">
              {itemType === "tool"
                ? locale === "en" ? "AI Tool Name" : "Tên công cụ AI"
                : locale === "en" ? "AI Model Name" : "Tên model AI"}
            </TableHead>
            {itemType === "tool" ? (
              <>
                <TableHead className="min-w-[150px] text-center">{locale === "en" ? "Category" : "Hạng mục"}</TableHead>
                <TableHead className="min-w-[150px] text-center">{locale === "en" ? "Developer" : "Nhà phát triển"}</TableHead>
              </>
            ) : (
              <>
                <TableHead className="min-w-[120px] text-center">{locale === "en" ? "Developer" : "Nhà phát triển"}</TableHead>
                <TableHead className="min-w-[120px] text-center">{locale === "en" ? "Context Length" : "Độ dài ngữ cảnh"}<br />(token)</TableHead>
                <TableHead className="min-w-[100px] text-center">{locale === "en" ? "Intelligence Score" : "Chỉ số thông minh"}</TableHead>
                <TableHead className="min-w-[140px] text-center">{locale === "en" ? "Avg. Price" : "Giá trung bình"}<br />(USD/1M token)</TableHead>
                <TableHead className="min-w-[100px] text-center">{locale === "en" ? "Speed" : "Tốc độ"}<br />(token/s)</TableHead>
                <TableHead className="min-w-[100px] text-center">{locale === "en" ? "Latency" : "Độ trễ"}<br />(s)</TableHead>
              </>
            )}
            <TableHead className="min-w-[120px] text-center">{locale === "en" ? "Rating" : "Đánh giá"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => {
            const averageRating = item.ratingCount && item.ratingCount > 0
              ? item.averageRating || (item.totalStars || 0) / item.ratingCount
              : 0;
            const rank = item.rank ?? index + 1;

            return (
              <TableRow
                key={item.id}
                className={cn(
                  "border-b transition-colors hover:bg-primary hover:text-primary-foreground",
                  "[&>td>a]:hover:text-primary-foreground",
                  index % 2 === 0 && "bg-accent/50"
                )}
              >
                <TableCell className="text-center font-medium">{rank}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image src={item.logoUrl} alt={`Logo ${item.name}`} width={32} height={32} className="rounded-md object-contain" priority={index < 3} />
                    <div className="flex flex-col">
                      <Link
                        href={itemType === "model"
                          ? { pathname: "/bang-xep-hang/[id]", params: { id: item.id } }
                          : { pathname: "/cong-cu/[id]", params: { id: item.id } }}
                        className="font-medium hover:underline"
                      >
                        {item.name}
                      </Link>
                      <span className="hidden max-w-[200px] truncate text-xs text-muted-foreground sm:block">
                        {item.description?.slice(0, 50)}{(item.description?.length ?? 0) > 50 ? "…" : ""}
                      </span>
                    </div>
                  </div>
                </TableCell>
                {itemType === "tool" ? (
                  <>
                    <TableCell className="text-center"><Badge variant="outline">{(item as Tool).context}</Badge></TableCell>
                    <TableCell className="text-center text-sm">{(item as Tool).developer}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="text-center text-sm">{(item as AIModel).developer}</TableCell>
                    <TableCell className="text-center">{formatContextLength((item as AIModel).contextLengthToken as number)}</TableCell>
                    <TableCell className="text-center">{(item as AIModel).intelligenceScore ?? "-"}</TableCell>
                    <TableCell className="text-center">{typeof (item as AIModel).pricePerMillionTokens === "number" ? `$${(item as AIModel).pricePerMillionTokens!.toFixed(2)}` : "-"}</TableCell>
                    <TableCell className="text-center">{typeof (item as AIModel).speedTokensPerSecond === "number" ? (item as AIModel).speedTokensPerSecond!.toFixed(1) : "-"}</TableCell>
                    <TableCell className="text-center">{typeof (item as AIModel).latencyFirstChunkSeconds === "number" ? (item as AIModel).latencyFirstChunkSeconds!.toFixed(2) : "-"}</TableCell>
                  </>
                )}
                <TableCell>
                  <div className="flex items-center justify-center space-x-2" aria-label={`${averageRating.toFixed(1)} / 5`}>
                    <div className="flex" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={cn("h-5 w-5", star <= averageRating ? "fill-amber-400 text-amber-500" : "text-gray-300")} />
                      ))}
                    </div>
                    {averageRating > 0 && <span className="text-xs text-muted-foreground sm:text-sm">({averageRating.toFixed(1)})</span>}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {items.length === 0 && (
        <p className="p-8 text-center text-muted-foreground" role="status">
          {locale === "en" ? "No matching results." : "Không có kết quả phù hợp."}
        </p>
      )}
    </div>
  );
}

export function RankingsPageClient({ tools, models }: { tools: Tool[]; models: AIModel[] }) {
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase(locale);

  const filteredModels = useMemo(() => models.filter((model) =>
    normalizedSearch === "" || model.name?.toLocaleLowerCase(locale).includes(normalizedSearch) || model.description?.toLocaleLowerCase(locale).includes(normalizedSearch)
  ), [locale, models, normalizedSearch]);

  const filteredTools = useMemo(() => tools.filter((tool) =>
    normalizedSearch === "" || tool.name?.toLocaleLowerCase(locale).includes(normalizedSearch) || tool.description?.toLocaleLowerCase(locale).includes(normalizedSearch)
  ), [locale, normalizedSearch, tools]);

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative w-full max-w-lg">
        <label htmlFor="ranking-search" className="sr-only">{locale === "en" ? "Search models or tools" : "Tìm kiếm model hoặc công cụ"}</label>
        <Input
          id="ranking-search"
          type="search"
          placeholder={locale === "en" ? "Search models or tools…" : "Tìm kiếm model hoặc công cụ…"}
          className="h-11 pl-10"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="mx-auto grid w-full grid-cols-2 md:w-1/2">
          <TabsTrigger value="models" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            {locale === "en" ? "AI Models" : "Model AI"}
          </TabsTrigger>
          <TabsTrigger value="tools" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            {locale === "en" ? "AI Tools" : "Công cụ AI"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="models" className="mt-6"><RankingsTable items={filteredModels} itemType="model" /></TabsContent>
        <TabsContent value="tools" className="mt-6"><RankingsTable items={filteredTools} itemType="tool" /></TabsContent>
      </Tabs>
    </div>
  );
}
