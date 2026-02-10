
import type { Metadata } from "next";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const dynamic = 'force-dynamic';

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

// This should be your actual domain
const BASE_URL = "https://4aivn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  try {
    if (!id || id.includes('.')) {
      return {
        title: "Bài viết không tồn tại",
        robots: "noindex, nofollow",
      };
    }

    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists() || !docSnap.data().post) {
      return {
        title: "Bài viết không tồn tại",
        robots: "noindex, nofollow",
      };
    }

    const article = docSnap.data();
    const description = article.summary?.slice(0, 160) || article.content?.replace(/<[^>]*>/g, "").slice(0, 160);

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
        images: article.imageUrl ? [{ url: article.imageUrl }] : [],
        type: "article",
        publishedTime: article.publishedAt?.toDate ? article.publishedAt.toDate().toISOString() : new Date().toISOString(),
        authors: [article.author || "4AIVN"],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: description,
        images: article.imageUrl ? [article.imageUrl] : [],
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
  const { id } = params;

  try {
    if (!id || id.includes('.')) {
      return <>{children}</>;
    }
  
    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);
    const article = docSnap.exists() ? docSnap.data() : null;

    if (!article || !article.post) return <>{children}</>;

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
            "name": article.category[0].name,
            "item": `${BASE_URL}/tin-tuc/${article.category[0].id}`,
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
        "datePublished": article.publishedAt?.toDate ? article.publishedAt.toDate().toISOString() : new Date().toISOString(),
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
