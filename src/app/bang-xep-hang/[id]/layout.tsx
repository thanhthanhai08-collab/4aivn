
import type { Metadata } from "next";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

// Thay đổi URL này thành domain thật của bạn
const BASE_URL = "https://4aivn.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  
  try {
    if (!id || id.includes('.')) {
      return { title: "Model không tồn tại" };
    }
  
    const docRef = doc(db, "models", id);
    const docSnap = await getDoc(docRef);
    const model = docSnap.exists() ? docSnap.data() : null;

    if (!model) return { title: "Model không tồn tại" };

    return {
      title: `${model.name} - Thông số & Đánh giá hiệu năng`,
      description: model.description?.slice(0, 160) || `Xem chi tiết đánh giá model AI ${model.name}.`,
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
  } catch (error) {
      console.error(`Error generating metadata for model: ${id}`, error);
      return { title: "Lỗi tải dữ liệu" };
  }
}

export default async function ModelDetailLayout({ children, params }: Props) {
  const { id } = params;

  try {
    if (!id || id.includes('.')) {
      return <>{children}</>;
    }

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
          "item": `${BASE_URL}/bang-xep-hang/${id}`, // Thêm URL trang hiện tại để chuẩn SEO
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
        "ratingValue": model.averageRating || "5", // Fallback nếu chưa có review
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
  } catch (error) {
    console.error(`Error in ModelDetailLayout for id: ${id}`, error);
    return <>{children}</>;
  }
}
