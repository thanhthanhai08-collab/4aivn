import type { Metadata } from "next";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

// This should be your actual domain
const BASE_URL = "https://studio--clean-ai-hub.us-central1.hosted.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  if (!id) return { title: "Bài viết không tồn tại" };

  try {
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
  if (!id) return <>{children}</>;
  
  const docRef = doc(db, "news", id);
  const docSnap = await getDoc(docRef);
  const article = docSnap.exists() ? docSnap.data() : null;

  if (!article || !article.post) return <>{children}</>;

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
       {
        "@type": "ListItem",
        "position": 3,
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
}
