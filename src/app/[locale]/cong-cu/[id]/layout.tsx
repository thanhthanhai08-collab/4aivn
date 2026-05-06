import type { Metadata, ResolvingMetadata } from "next";
import { getTool } from "@/lib/get-tool";

// Định nghĩa kiểu dữ liệu cho props
type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string; locale: string }>;
};

const BASE_URL = "https://4aivn.com";

// 1. Hàm tạo Metadata động (Tiêu đề tab trình duyệt, mô tả SEO, ảnh chia sẻ)
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id, locale } = await params;
  const isEn = locale === 'en';
  
  if (!id || id.includes('.')) {
    return {
      title: isEn ? "Tool not found" : "Công cụ không tồn tại",
    };
  }

  const tool = await getTool(id, locale);

  if (!tool) {
    return {
      title: isEn ? "Tool not found" : "Không tìm thấy công cụ",
      description: isEn
        ? "The tool you are looking for does not exist."
        : "Công cụ bạn tìm kiếm không tồn tại.",
    };
  }

  const imageUrl = tool.imageUrl ? (tool.imageUrl.startsWith('http') ? tool.imageUrl : `${BASE_URL}${tool.imageUrl}`) : undefined;
  const title = isEn
    ? `${tool.name} - Detailed Features & Community Reviews`
    : `${tool.name} - Tính năng chi tiết và đánh giá từ cộng đồng`;
  const description = tool.description 
      ? tool.description.slice(0, 160) // Cắt ngắn mô tả cho chuẩn SEO
      : isEn
        ? `Explore the features of ${tool.name}, an AI tool in the ${tool.context} category.`
        : `Khám phá tính năng của ${tool.name}, một công cụ AI thuộc nhóm ${tool.context}.`;

  const canonicalUrl = isEn ? `${BASE_URL}/en/tools/${id}` : `${BASE_URL}/cong-cu/${id}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'vi': `${BASE_URL}/cong-cu/${id}`,
        'en': `${BASE_URL}/en/tools/${id}`,
      }
    },
    openGraph: {
      title: tool.name,
      description: tool.description,
      url: canonicalUrl,
      siteName: "4AIVN",
      images: imageUrl ? [{ url: imageUrl }] : [], // Sử dụng imageUrl
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    }
  };
}

// 2. Component Layout chính (Server Component)
export default async function ToolDetailLayout({ children, params }: Props) {
  const { id, locale } = await params;
  const isEn = locale === 'en';

  if (!id || id.includes('.')) {
      return <>{children}</>;
  }

  // Fetch dữ liệu trên Server để tạo Schema bằng react.cache helper
  const tool = await getTool(id, locale);

  // Nếu không có dữ liệu thì chỉ render children (để page.tsx xử lý lỗi 404 sau)
  if (!tool) return <>{children}</>;

  // --- CẤU HÌNH SCHEMA JSON-LD ---
  
  // A. Schema Breadcrumb (Đầy đủ 4 cấp cho Google)
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
        "name": isEn ? "AI Tools" : "Công cụ AI",
        "item": isEn ? `${BASE_URL}/en/tools` : `${BASE_URL}/cong-cu`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.context,
        "item": isEn
          ? `${BASE_URL}/en/tools?category=${encodeURIComponent(tool.context)}`
          : `${BASE_URL}/cong-cu?category=${encodeURIComponent(tool.context)}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": tool.name,
        "item": isEn ? `${BASE_URL}/en/tools/${id}` : `${BASE_URL}/cong-cu/${id}`,
      },
    ],
  };

  // B. Schema SoftwareApplication (Để hiện sao đánh giá & thông tin ứng dụng trên Google)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": tool.context,
    "operatingSystem": "Web",
    "description": tool.description,
    "image": tool.imageUrl, // Sử dụng imageUrl
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tool.averageRating || "0",
      "reviewCount": tool.ratingCount || "0",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "VND"
    }
  };

  return (
    <>
      {/* Chèn JSON-LD vào đầu trang - Người dùng không thấy, Google thấy */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      {/* Render nội dung trang chi tiết (page.tsx) */}
      {children}
    </>
  );
}
