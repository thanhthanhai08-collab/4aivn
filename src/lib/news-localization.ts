import type { NewsArticle } from "@/lib/types";

export type NewsLanguage = "vi" | "en";
type LocalizedField = string | { vi?: string; en?: string } | undefined;

export function getLocalizedField(field: LocalizedField, language: NewsLanguage = "vi") {
  if (typeof field === "string") return field;
  return field?.[language] || field?.vi || field?.en || "";
}

export function hasLocalizedNews(article: NewsArticle) {
  return typeof article.title === "object" || typeof article.summary === "object" || typeof article.content === "object";
}

export function getLocalizedNews(article: NewsArticle, language: NewsLanguage = "vi") {
  return {
    title: getLocalizedField(article.title, language),
    summary: getLocalizedField(article.summary, language),
    content: getLocalizedField(article.content, language),
  };
}
