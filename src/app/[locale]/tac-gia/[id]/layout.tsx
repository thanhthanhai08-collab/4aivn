import type { Metadata, ResolvingMetadata } from "next";
import { getAuthor } from "@/lib/get-author";
import { ReactNode } from "react";
import { AppLayout } from "@/components/layout/app-layout";

import { getTranslations } from "next-intl/server";

type Props = {
  children: ReactNode;
  params: Promise<{ id: string, locale: string }>;
};

const BASE_URL = "https://4aivn.com";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const authorId = resolvedParams.id;
  const locale = resolvedParams.locale;

  const t = await getTranslations({ locale, namespace: "authorDetail" });

  if (!authorId || authorId.includes('.')) {
    return { title: t("authorNotFound") };
  }

  const author = await getAuthor(authorId);

  if (!author) {
    return {
      title: `${t("authorNotFound")} | 4AIVN`,
      description: t("authorNotFoundDesc"),
    };
  }

  // Get current locale from params to set correct SEO canonical
  const tSeo = await getTranslations({ locale, namespace: "common" }); // fallback if needed, but we can hardcode logic for now
  
  const siteName = "4AIVN";
  const title = locale === "en" 
    ? `Author ${author.name} - Latest AI Articles | ${siteName}`
    : `Tác giả ${author.name} - Các bài viết AI mới nhất | ${siteName}`;
    
  const description = author.bio || (locale === "en" 
    ? `Explore in-depth AI articles and insights by ${author.name} on ${siteName}.`
    : `Khám phá các bài báo, bài viết AI chuyên sâu được thực hiện bởi chuyên gia ${author.name} trên ${siteName}.`);
  const imageUrl = author.avatarUrl || '/og-image.jpg';
  const canonicalUrl = locale === 'en' ? `${BASE_URL}/en/author/${authorId}` : `${BASE_URL}/tac-gia/${authorId}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'vi-VN': `${BASE_URL}/tac-gia/${authorId}`,
        'en-US': `${BASE_URL}/en/author/${authorId}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "profile",
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function AuthorDetailLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const authorId = resolvedParams.id;
  const locale = resolvedParams.locale;
  const canonicalUrl = locale === 'en' ? `${BASE_URL}/en/author/${authorId}` : `${BASE_URL}/tac-gia/${authorId}`;

  let author = null;
  let breadcrumbSchema = null;
  let personSchema = null;

  try {
    if (authorId && !authorId.includes('.')) {
      author = await getAuthor(authorId);
    }

    if (author) {
      // 1. Schema Breadcrumb chuẩn Google
      breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": locale === 'en' ? "Home" : "Trang chủ",
            "item": locale === 'en' ? `${BASE_URL}/en` : `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": author.name,
            "item": canonicalUrl,
          },
        ],
      };

      // 2. Schema Person (Tác giả)
      personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": author.name,
        "url": canonicalUrl,
        "image": author.avatarUrl,
        "description": author.bio,
        "jobTitle": "Author",
        "worksFor": {
          "@type": "Organization",
          "name": "4AIVN"
        }
      };
    }
  } catch (error) {
    console.error(`Error in AuthorDetailLayout for id: ${authorId}`, error);
  }

  return (
    <AppLayout>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
      {children}
    </AppLayout>
  );
}
