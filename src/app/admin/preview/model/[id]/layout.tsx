import type { Metadata } from "next";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

// Thay đổi URL này thành domain thật của bạn
const BASE_URL = "https://studio--clean-ai-hub.us-central1.hosted.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const docRef = doc(db, "models", id);
  const docSnap = await getDoc(docRef);
  const model = docSnap.exists() ? docSnap.data() : null;

  if (!model) return { title: "Model không tồn tại" };

  return {
    title: `[Xem trước] ${model.name}`,
    description: model.description?.slice(0, 160) || `Xem chi tiết đánh giá model AI ${model.name}.`,
    robots: "noindex, nofollow", // Prevent search engines from indexing preview pages
    alternates: {
      canonical: `${BASE_URL}/bang-xep-hang/${id}`,
    },
    openGraph: {
      title: `${model.name} - Thông số và đánh giá hiệu năng`,
      description: model.description?.slice(0, 160),
      url: `${BASE_URL}/bang-xep-hang/${id}`,
      siteName: "4AIVN",
      images: model.logoUrl ? [{ url: model.logoUrl }] : [],
      type: "article",
    },
  };
}

export default async function ModelPreviewLayout({ children, params }: Props) {
  const { id } = params;
  const docRef = doc(db, "models", id);
  const docSnap = await getDoc(docRef);
  const model = docSnap.exists() ? docSnap.data() : null;

  if (!model) return <>{children}</>;

  // 1. Schema Breadcrumb chuẩn Google
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Bảng xếp hạng AI",
        "item": `${BASE_URL}/bang-xep-hang`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": model.name,
        "item": `${BASE_URL}/bang-xep-hang/${id}`,
      },
    ],
  };

  // 2. Schema SoftwareApplication (Để hiện sao đánh giá trên kết quả tìm kiếm)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": model.name,
    "applicationCategory": "Artificial Intelligence",
    "operatingSystem": "All",
    "description": model.description,
    "image": model.logoUrl,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": model.averageRating || "5",
      "reviewCount": model.ratingCount || "1",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {children}
    </>
  );
}
