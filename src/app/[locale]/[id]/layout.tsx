
import type { Metadata } from "next";
import { getArticleBySlug } from "@/lib/get-article";
import { getLocalizedSlug } from "@/lib/i18n-helpers";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string; locale: string }>;
};

// This should be your actual domain
const BASE_URL = "https://4aivn.com";

function truncateDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function formatSchemaDate(value: unknown): string | undefined {
  const date = value instanceof Date
    ? value
    : value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function"
      ? value.toDate()
      : typeof value === "string" || typeof value === "number"
        ? new Date(value)
        : undefined;

  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return undefined;

  const localDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  const pad = (number: number) => String(number).padStart(2, "0");

  return `${localDate.getUTCFullYear()}-${pad(localDate.getUTCMonth() + 1)}-${pad(localDate.getUTCDate())}`
    + `T${pad(localDate.getUTCHours())}:${pad(localDate.getUTCMinutes())}:${pad(localDate.getUTCSeconds())}+07:00`;
}

function getArticleSeoData(article: {
  summary?: string;
  content?: string;
  imageUrl?: string;
}) {
  const descriptionSource = article.summary || article.content?.replace(/<[^>]*>/g, "") || "";
  const imageUrl = article.imageUrl
    ? (article.imageUrl.startsWith("http") ? article.imageUrl : `${BASE_URL}${article.imageUrl}`)
    : undefined;

  return {
    description: truncateDescription(descriptionSource),
    imageUrl,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;

  try {
    if (!id) {
      return {
        title: locale === 'en' ? "Article not found" : "Bài viết không tồn tại",
        robots: "noindex, nofollow",
      };
    }

    const article = await getArticleBySlug(id, locale);

    if (!article) {
      return {
        title: locale === 'en' ? "Article not found" : "Bài viết không tồn tại",
        robots: "noindex, nofollow",
      };
    }


    const { description, imageUrl } = getArticleSeoData(article);

    const slugVi = getLocalizedSlug(article.slug || article.id, 'vi') || article.id;
    const slugEn = getLocalizedSlug(article.slug || article.id, 'en') || article.id;
    const viUrl = `${BASE_URL}/${slugVi}`;
    const enUrl = `${BASE_URL}/en/${slugEn}`;
    const hasEnglishTranslation = article.hasEnglishTranslation === true;
    const canonicalUrl = locale === 'en' && hasEnglishTranslation ? enUrl : viUrl;

    return {
      title: article.title,
      description: description,
      alternates: {
        canonical: canonicalUrl,
        languages: hasEnglishTranslation
          ? { 'vi': viUrl, 'en': enUrl, 'x-default': enUrl }
          : { 'vi': viUrl, 'x-default': viUrl },
      },
      openGraph: {
        title: article.title,
        description: description,
        url: canonicalUrl,
        siteName: "4AIVN",
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: "article",
        publishedTime: article.publishedAt,
        authors: [article.author || "4AIVN"],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for news article:", error);
    return {
      title: locale === 'en' ? "Error" : "Lỗi",
      description: locale === 'en' ? "Could not load data for this article." : "Không thể tải dữ liệu cho bài viết này."
    };
  }
}

export default async function NewsDetailLayout({ children, params }: Props) {
  const { id, locale } = await params;

  try {
    if (!id) {
      return <>{children}</>;
    }
  
    const article = await getArticleBySlug(id, locale);

    if (!article) return <>{children}</>;

    const hasCategory = article.category && article.category.length > 0 && article.category[0].id;

    const isEn = locale === 'en';
    const { description, imageUrl } = getArticleSeoData(article);
    const slugVi = getLocalizedSlug(article.slug || article.id, 'vi') || article.id;
    const slugEn = getLocalizedSlug(article.slug || article.id, 'en') || slugVi;
    const canonicalUrl = isEn && article.hasEnglishTranslation
      ? `${BASE_URL}/en/${slugEn}`
      : `${BASE_URL}/${slugVi}`;
    const hasFaq = article.faq && article.faq.length > 0;
    const datePublished = formatSchemaDate(article.publishedAt);
    const dateModified = formatSchemaDate(article.updatedAt) || datePublished;
    const authorUrl = article.authorId
      ? (isEn ? `${BASE_URL}/en/author/${article.authorId}` : `${BASE_URL}/tac-gia/${article.authorId}`)
      : undefined;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": isEn ? "Home" : "Trang chủ",
          "item": isEn ? `${BASE_URL}/en` : BASE_URL,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": isEn ? "News" : "Tin tức",
          "item": isEn ? `${BASE_URL}/en/news` : `${BASE_URL}/tin-tuc`,
        },
        ...(hasCategory ? [
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.category![0].name,
            "item": isEn ? `${BASE_URL}/en/news/${article.category![0].id}` : `${BASE_URL}/tin-tuc/${article.category![0].id}`,
          }
        ] : []),
        {
          "@type": "ListItem",
          "position": hasCategory ? 4 : 3,
          "name": article.title,
          "item": canonicalUrl,
        },
      ],
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.title,
        "image": imageUrl ? [imageUrl] : [],
        "datePublished": datePublished,
        "dateModified": dateModified,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        "author": [{
          "@type": "Person",
          "name": article.author || "4AIVN",
          ...(authorUrl ? { "url": authorUrl } : {}),
        }],
        "publisher": {
            "@type": "Organization",
            "name": "4AIVN",
            "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/icon-192.png`
            }
        },
        "description": description
    };

    const faqSchema = hasFaq ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.faq!.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    } : null;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        {children}
      </>
    );
  } catch (error) {
      console.error(`Error in NewsDetailLayout for id: ${id}`, error);
      return <>{children}</>;
  }
}
