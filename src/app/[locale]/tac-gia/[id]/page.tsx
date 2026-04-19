import { getAuthor, getAuthorArticles } from "@/lib/get-author";
import { AuthorDetailClient } from "@/components/news/author-detail-client";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function AuthorPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const resolvedParams = await params;
  const authorId = resolvedParams.id;
  const locale = resolvedParams.locale;
  
  const t = await getTranslations({ locale, namespace: "authorDetail" });

  const author = await getAuthor(authorId);

  if (!author) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">{t("authorNotFound")}</h1>
        <p className="text-muted-foreground">{t("authorNotFoundDesc")}</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/tin-tuc">{t("backToNews")}</Link>
        </Button>
      </div>
    );
  }

  const initialArticles = await getAuthorArticles(authorId);

  return <AuthorDetailClient author={author} initialArticles={initialArticles} />;
}
