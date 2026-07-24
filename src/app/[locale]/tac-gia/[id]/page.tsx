import { getAuthor, getAuthorArticles } from "@/lib/get-author";
import { AuthorDetailClient } from "@/components/news/author-detail-client";
import { notFound } from "next/navigation";

export default async function AuthorPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const resolvedParams = await params;
  const authorId = resolvedParams.id;
  const locale = resolvedParams.locale;
  
  const author = await getAuthor(authorId, locale);

  if (!author) {
    notFound();
  }

  const initialArticles = await getAuthorArticles(authorId, locale);

  return <AuthorDetailClient author={author} initialArticles={initialArticles} />;
}
