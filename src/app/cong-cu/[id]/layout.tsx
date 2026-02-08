import type { Metadata } from "next";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Định nghĩa kiểu dữ liệu cho props
type Props = {
  children: React.ReactNode;
  params: { id: string };
};

// 1. Hàm tạo Metadata động (Tiêu đề tab trình duyệt, mô tả SEO, ảnh chia sẻ)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  
  const docRef = doc(db, "tools", id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return {
      title: "Không tìm thấy công cụ",
      description: "Công cụ bạn tìm kiếm không tồn tại.",
    };
  }

  const tool = docSnap.data();

  return {
    title: `${tool.name} - Tính năng chi tiết và đánh giá từ cộng đồng`,
    description: tool.description 
      ? tool.description.slice(0, 160) // Cắt ngắn mô tả cho chuẩn SEO
      : `Khám phá tính năng của ${tool.name}, một công cụ AI thuộc nhóm ${tool.context}.`,
    openGraph: {
      title: tool.name,
      description: tool.description,
      images: tool.imageUrl ? [tool.imageUrl] : [], // Sử dụng imageUrl
    },
  };
}

// 2. Component Layout chính (Server Component)
export default async function ToolDetailLayout({ children, params }: Props) {
  const { id } = params;

  // Fetch dữ liệu trên Server để tạo Schema
  const docRef = doc(db, "tools", id);
  const docSnap = await getDoc(docRef);
  const tool = docSnap.exists() ? docSnap.data() : null;

  // Nếu không có dữ liệu thì chỉ render children (để page.tsx xử lý lỗi 404 sau)
  if (!tool) return <>{children}</>;

  // Thay thế bằng domain thực tế của bạn
  const appDomain = "https://4aivn.com";

  // --- CẤU HÌNH SCHEMA JSON-LD ---
  
  // A. Schema Breadcrumb (Đầy đủ 4 cấp cho Google)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": appDomain,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Công cụ AI",
        "item": `${appDomain}/cong-cu`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.context,
        "item": `${appDomain}/cong-cu?category=${encodeURIComponent(tool.context)}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": tool.name,
        "item": `${appDomain}/cong-cu/${id}`,
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
