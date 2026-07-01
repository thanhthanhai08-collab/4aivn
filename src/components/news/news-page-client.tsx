"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { NewsArticle } from "@/lib/types";
import { getLocalizedSlug } from "@/lib/i18n-helpers";
import { NewsListItem } from "@/components/news/news-list-item";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 15;

function QuickViewItem({ article, locale }: { article: NewsArticle; locale: string }) {
  const slug = getLocalizedSlug(article.slug || article.id, locale) || article.id;
  return (
    <div className="group flex items-center space-x-4">
      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
      <div className="flex-grow">
        <Link href={`/${slug}` as any} className="line-clamp-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">
          {article.title}
        </Link>
      </div>
      <Link href={`/${slug}` as any} className="w-24 flex-shrink-0" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
          <Image src={article.imageUrl} alt="" fill className="object-cover transition-transform duration-300 group-hover:scale-110" sizes="96px" />
        </div>
      </Link>
    </div>
  );
}

export function NewsPageClient({ articles }: { articles: NewsArticle[] }) {
  const locale = useLocale();
  const t = useTranslations("news");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleArticles = articles.slice(0, visibleCount);
  const [featuredArticle, secondaryArticle, ...remainingArticles] = visibleArticles;
  const quickViewArticles = articles.slice(2, 9);
  const hasMore = visibleCount < articles.length;

  if (articles.length === 0) {
    return (
      <div className="py-16 text-center" role="status">
        <p className="text-xl text-muted-foreground">{t("empty")}</p>
      </div>
    );
  }

  const articleHref = (article: NewsArticle) => {
    const slug = getLocalizedSlug(article.slug || article.id, locale) || article.id;
    return `/${slug}` as any;
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="space-y-8 lg:col-span-3">
        {featuredArticle && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            <article className="group relative flex flex-col overflow-hidden rounded-lg shadow-lg md:col-span-3">
              <Link href={articleHref(featuredArticle)} className="relative block aspect-[16/9]">
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                />
              </Link>
              <div className="flex flex-grow flex-col bg-card p-4">
                <h2 className="flex-grow text-2xl font-bold font-headline leading-tight text-foreground">
                  <Link href={articleHref(featuredArticle)} className="transition-colors hover:text-primary">{featuredArticle.title}</Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{t("byAuthor", { author: featuredArticle.author || "" })}</p>
              </div>
            </article>

            {secondaryArticle && (
              <article className="flex flex-col justify-between rounded-lg border bg-card p-4 md:col-span-2">
                <div className="space-y-3">
                  <Link href={articleHref(secondaryArticle)} className="group relative block aspect-[16/9] overflow-hidden rounded-md">
                    <Image
                      src={secondaryArticle.imageUrl}
                      alt={secondaryArticle.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                    />
                  </Link>
                  <div>
                    <h2 className="mb-2 text-xl font-bold font-headline leading-tight">
                      <Link href={articleHref(secondaryArticle)} className="hover:text-primary">{secondaryArticle.title}</Link>
                    </h2>
                    <p className="mb-1 text-sm text-muted-foreground">{t("byAuthor", { author: secondaryArticle.author || "" })}</p>
                    <p className="line-clamp-3 text-sm text-foreground/80">{secondaryArticle.content.replace(/<[^>]*>/g, "")}</p>
                  </div>
                </div>
                <Button asChild variant="link" className="mt-4 self-start p-0">
                  <Link href={articleHref(secondaryArticle)}>{t("readMore")} →</Link>
                </Button>
              </article>
            )}
          </div>
        )}

        <nav aria-label={locale === "en" ? "News categories" : "Chuyên mục tin tức"} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Link href={{ pathname: "/tin-tuc/[id]", params: { id: "danh-gia" } }} className="flex min-h-24 items-center justify-center rounded-lg bg-chart-1 px-3 text-center text-lg font-bold text-white shadow-md transition-transform hover:-translate-y-1">{t("categories.review")}</Link>
          <Link href={{ pathname: "/tin-tuc/[id]", params: { id: "huong-dan" } }} className="flex min-h-24 items-center justify-center rounded-lg bg-chart-2 px-3 text-center text-lg font-bold text-white shadow-md transition-transform hover:-translate-y-1">{t("categories.guide")}</Link>
          <Link href={{ pathname: "/tin-tuc/[id]", params: { id: "vibe-coding" } }} className="flex min-h-24 items-center justify-center rounded-lg bg-chart-3 px-3 text-center text-lg font-bold text-white shadow-md transition-transform hover:-translate-y-1">{t("categories.vibeCoding")}</Link>
          <Link href={{ pathname: "/tin-tuc/[id]", params: { id: "xu-huong" } }} className="flex min-h-24 items-center justify-center rounded-lg bg-chart-4 px-3 text-center text-lg font-bold text-white shadow-md transition-transform hover:-translate-y-1">{t("categories.trending")}</Link>
        </nav>

        <div className="space-y-8 border-t pt-8">
          {remainingArticles.map((article) => <NewsListItem key={article.id} article={article} />)}
        </div>

        {hasMore && (
          <div className="pt-4 text-center">
            <Button onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} size="lg">
              {t("loadMoreBtn")}
            </Button>
          </div>
        )}
      </div>

      <aside className="lg:col-span-1" aria-labelledby="quick-view-title">
        <div className="sticky top-24 rounded-lg border bg-card p-6">
          <h2 id="quick-view-title" className="mb-4 text-xl font-bold font-headline">{t("quickView")}</h2>
          <div className="space-y-5">
            {quickViewArticles.map((article) => <QuickViewItem key={article.id} article={article} locale={locale} />)}
          </div>
        </div>
      </aside>
    </div>
  );
}
