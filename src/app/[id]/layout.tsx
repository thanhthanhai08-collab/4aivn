
import type { Metadata } from "next";
import { getArticle } from "@/lib/get-article";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

// This should be your actual domain
const BASE_URL = "https://4aivn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    if (!id || id.includes('.')) {
      return {
        title: "Bài viết không tồn tại",
        robots: "noindex, nofollow",
      };
    }

    const article = await getArticle(id);

    if (!article) {
      return {
        title: "Bài viết không tồn tại",
        robots: "noindex, nofollow",
      };
    }


    const description = article.summary?.slice(0, 160) || article.content?.replace(/<[^>]*>/g, "").slice(0, 160);
    const imageUrl = article.imageUrl ? (article.imageUrl.startsWith('http') ? article.imageUrl : `${BASE_URL}${article.imageUrl}`) : undefined;

    return {
      title: article.title,
      description: description,
      alternates: {
        canonical: `${BASE_URL}/${id}`,
      },
      openGraph: {
        title: article.title,
        description: description,
        url: `${BASE_URL}/${id}`,
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
      title: "Lỗi",
      description: "Không thể tải dữ liệu cho bài viết này."
    };
  }
}

export default async function NewsDetailLayout({ children, params }: Props) {
  const { id } = await params;

  try {
    if (!id || id.includes('.')) {
      return <>{children}</>;
    }
  
    const article = await getArticle(id);

    if (!article) return <>{children}</>;

    const hasCategory = article.category && article.category.length > 0 && article.category[0].id;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": BASE_URL,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tin tức",
          "item": `${BASE_URL}/tin-tuc`,
        },
        ...(hasCategory ? [
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.category![0].name,
            "item": `${BASE_URL}/tin-tuc/${article.category![0].id}`,
          }
        ] : []),
        {
          "@type": "ListItem",
          "position": hasCategory ? 4 : 3,
          "name": article.title,
          "item": `${BASE_URL}/${id}`,
        },
      ],
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.title,
        "image": [article.imageUrl],
        "datePublished": article.publishedAt,
        "author": [{
          "@type": "Person",
          "name": article.author || "4AIVN",
        }],
        "publisher": {
            "@type": "Organization",
            "name": "4AIVN",
            "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/logo.png`
            }
        },
        "description": article.summary?.slice(0, 160) || article.content?.replace(/<[^>]*>/g, "").slice(0, 160)
    };

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
        {children}
      </>
    );
  } catch (error) {
      console.error(`Error in NewsDetailLayout for id: ${id}`, error);
      return <>{children}</>;
  }
}
