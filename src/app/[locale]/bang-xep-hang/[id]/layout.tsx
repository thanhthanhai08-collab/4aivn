import { getModel } from "@/lib/get-model";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string; locale: string }>;
};

const BASE_URL = "https://4aivn.com";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id, locale } = await params;
  const isEn = locale === 'en';
  
  if (!id || id.includes('.')) {
      return { title: isEn ? 'Model not found' : 'Không tìm thấy model' };
  }

  const model = await getModel(id);

  if (!model) {
      return {
          title: isEn ? 'AI model not found' : 'Không tìm thấy mô hình AI',
          description: isEn
            ? 'The AI model you are looking for does not exist or has been removed.'
            : 'Mô hình AI bạn tìm kiếm không tồn tại hoặc đã bị xóa.',
      };
  }

  const title = isEn
    ? `${model.name} - Specs & Reviews`
    : `${model.name} - Thông số và Đánh giá`;

  const description = model.description || (isEn
    ? `Detailed review, specifications, and performance of the ${model.name} AI model.`
    : `Đánh giá chi tiết, thông số kỹ thuật và hiệu năng của mô hình AI ${model.name}.`);

  const ogTitle = isEn
    ? `${model.name} - Specs & Reviews | 4AIVN`
    : `${model.name} - Thông số và Đánh giá | 4AIVN`;

  const ogDescription = model.description || (isEn
    ? `Detailed review, specifications, and benchmarks of the ${model.name} AI model.`
    : `Đánh giá chi tiết, thông số kỹ thuật và điểm chuẩn của mô hình AI ${model.name}.`);

  const canonicalUrl = isEn ? `${BASE_URL}/en/rankings/${id}` : `${BASE_URL}/bang-xep-hang/${id}`;

  return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'vi': `${BASE_URL}/bang-xep-hang/${id}`,
          'en': `${BASE_URL}/en/rankings/${id}`,
        }
      },
      openGraph: {
          title: ogTitle,
          description: ogDescription,
          url: canonicalUrl,
          siteName: "4AIVN",
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
          title: ogTitle,
          description: ogDescription,
          images: [model.logoUrl || '/og-image.jpg'],
      },
  };
}

export default async function ModelDetailLayout({ children, params }: Props) {
  const { id, locale } = await params;
  const isEn = locale === 'en';

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
          "name": isEn ? "Home" : "Trang chủ",
          "item": isEn ? `${BASE_URL}/en` : `${BASE_URL}/`,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": isEn ? "AI Rankings" : "Bảng xếp hạng AI",
          "item": isEn ? `${BASE_URL}/en/rankings` : `${BASE_URL}/bang-xep-hang`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": model.name,
          "item": isEn ? `${BASE_URL}/en/rankings/${id}` : `${BASE_URL}/bang-xep-hang/${id}`,
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
