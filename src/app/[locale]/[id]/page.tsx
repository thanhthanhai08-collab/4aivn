import { notFound, permanentRedirect } from "next/navigation";
import { getArticleBySlug, getLatestNews, getRelatedNews } from "@/lib/get-article";
import { NewsDetailClient } from "@/components/news/news-detail-client";
import { getLocalizedSlug } from "@/lib/i18n-helpers";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;

  if (!id) {
    notFound();
  }

  const article = await getArticleBySlug(id, locale);
  
  if (!article || !article.post) {
    notFound();
  }

  const slugVi = getLocalizedSlug(article.slug || article.id, "vi") || article.id;
  const slugEn = getLocalizedSlug(article.slug || article.id, "en") || slugVi;

  // A copied Vietnamese body is not an English edition. Keep one indexable URL
  // until an actual translation has been published.
  if (locale === "en" && !article.hasEnglishTranslation) {
    permanentRedirect(`/${slugVi}`);
  }

  // Consolidate legacy/wrong-locale slugs to one permanent URL per language.
  if (locale === "en" && id !== slugEn) {
    permanentRedirect(`/en/${slugEn}`);
  }

  if (locale === "vi" && article.hasEnglishTranslation && slugEn !== slugVi && id === slugEn) {
    permanentRedirect(`/en/${slugEn}`);
  }

  if (locale === "vi" && id !== slugVi) {
    permanentRedirect(`/${slugVi}`);
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
