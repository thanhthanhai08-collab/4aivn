import { getTranslations } from "next-intl/server";
import { AppLayout } from "@/components/layout/app-layout";
import { NewsPageClient } from "@/components/news/news-page-client";
import { getAllArticles } from "@/lib/get-article";

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [articles, t] = await Promise.all([
    getAllArticles(locale),
    getTranslations({ locale, namespace: "news" }),
  ]);

  return (
    <AppLayout>
      <main className="container py-8 md:py-12">
        <header className="mb-8 text-center md:mb-12">
          <h1 className="text-4xl font-headline font-bold text-foreground">{t("title")}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{t("subtitle")}</p>
        </header>
        <NewsPageClient articles={articles} />
      </main>
    </AppLayout>
  );
}
