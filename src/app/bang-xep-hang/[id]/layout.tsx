import { getModel } from "@/lib/get-model";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

const BASE_URL = "https://4aivn.com";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  if (!id || id.includes('.')) {
      return { title: 'Không tìm thấy model' };
  }

  const model = await getModel(id);

  if (!model) {
      return {
          title: 'Không tìm thấy mô hình AI',
          description: 'Mô hình AI bạn tìm kiếm không tồn tại hoặc đã bị xóa.',
      };
  }

  return {
      title: `${model.name} - Thông số và Đánh giá`,
      description: model.description || `Đánh giá chi tiết, thông số kỹ thuật và hiệu năng của mô hình AI ${model.name}.`,
      openGraph: {
          title: `${model.name} - Thông số và Đánh giá | 4AIVN`,
          description: model.description || `Đánh giá chi tiết, thông số kỹ thuật và điểm chuẩn của mô hình AI ${model.name}.`,
          type: 'article',
          images: [
              {
                  url: model.logoUrl || '/og-image.jpg',
                  width: 1200,
                  height: 630,
                  alt: model.name,
              },
          ],
      },
      twitter: {
          card: 'summary_large_image',
          title: `${model.name} - Thông số và Đánh giá | 4AIVN`,
          description: model.description || `Đánh giá chi tiết, thông số kỹ thuật và hiệu năng của mô hình AI ${model.name}.`,
          images: [model.logoUrl || '/og-image.jpg'],
      },
  };
}

export default async function ModelDetailLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    if (!id || id.includes('.')) {
      return <>{children}</>;
    }

    const model = await getModel(id);

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

    // 2. Schema SoftwareApplication
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
  } catch (error) {
    console.error(`Error in ModelDetailLayout for id: ${id}`, error);
    return <>{children}</>;
  }
}
