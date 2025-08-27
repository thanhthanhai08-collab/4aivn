// src/components/news/news-list-item.tsx
import Link from "next/link";
import Image from "next/image";
import type { NewsArticle } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getAuthorInitials = (name?: string) => {
  if (!name) return "";
  const names = name.split(' ');
  if (names.length > 1) {
    return names[0][0] + names[names.length - 1][0];
  }
  return name.substring(0, 2);
};

export function NewsListItem({ article }: { article: NewsArticle }) {
  // Remove HTML and [IMAGE:...] tags for the summary display
  const descriptionText = article.content
    .replace(/<[^>]*>|\[IMAGE:.*?\]/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return (
    <article className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center group">
      <Link href={`/tin-tuc/${article.id}`} className="md:col-span-1 block overflow-hidden rounded-lg">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={400}
          height={250}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={article.dataAiHint}
        />
      </Link>
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold font-headline mb-2 leading-tight">
          <Link href={`/tin-tuc/${article.id}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </h2>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {descriptionText}
        </p>
        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
          <Avatar className="h-8 w-8">
             <AvatarImage src={`/image/authors/${article.author?.toLowerCase().replace(' ', '-')}.jpg`} alt={article.author} />
            <AvatarFallback>{getAuthorInitials(article.author)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-foreground">{article.author}</span>
        </div>
      </div>
    </article>
  );
}
