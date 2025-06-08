// src/components/news/news-card.tsx
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/lib/types";
import { format } from "date-fns";
import { vi } from 'date-fns/locale';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      {article.imageUrl && (
        <div className="relative w-full h-48">
          <Image 
            src={article.imageUrl} 
            alt={article.title} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-t-lg"
            data-ai-hint={article.dataAiHint || "technology abstract"}
          />
        </div>
      )}
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-headline line-clamp-2 hover:text-primary">
           <Link href={article.link} target="_blank" rel="noopener noreferrer">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <CardDescription className="text-sm line-clamp-3">{article.content}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div className="text-xs text-muted-foreground">
          <p>{article.source}</p>
          <div className="flex items-center">
            <CalendarDays className="h-3 w-3 mr-1" />
            {format(new Date(article.publishedAt), "d MMM, yyyy", { locale: vi })}
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={article.link} target="_blank" rel="noopener noreferrer">
            Đọc thêm <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
