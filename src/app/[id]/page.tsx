import { notFound } from "next/navigation";
import { getArticle, getLatestNews, getRelatedNews } from "@/lib/get-article";
import { NewsDetailClient } from "@/components/news/news-detail-client";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id || id.includes('.')) {
    notFound();
  }

  const article = await getArticle(id);
  
  if (!article || !article.post) {
    notFound();
  }

  const [latestNews, relatedNews] = await Promise.all([
    getLatestNews(id),
    getRelatedNews(article)
  ]);

  return (
    <NewsDetailClient 
      article={article} 
      latestNews={latestNews} 
      relatedNews={relatedNews} 
    />
  );
}
