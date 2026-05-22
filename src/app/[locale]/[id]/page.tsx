import { notFound } from "next/navigation";
import { getArticleBySlug, getLatestNews, getRelatedNews } from "@/lib/get-article";
import { NewsDetailClient } from "@/components/news/news-detail-client";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;

  if (!id || id.includes('.')) {
    notFound();
  }

  const article = await getArticleBySlug(id, locale);
  
  if (!article || !article.post) {
    notFound();
  }

  const [latestNews, relatedNews] = await Promise.all([
    getLatestNews(article.id, locale),
    getRelatedNews(article, locale)
  ]);

  return (
    <NewsDetailClient 
      article={article} 
      latestNews={latestNews} 
      relatedNews={relatedNews} 
    />
  );
}
