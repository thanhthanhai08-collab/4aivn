import type { Metadata } from "next";

// 1. Metadata: Hiển thị trên Google và Tab trình duyệt
export const metadata: Metadata = {
  title: "Kho công cụ AI của 4AIVN - Tổng hợp và đánh giá",
  description: "Danh sách hàng trăm công cụ AI được phân loại, đánh giá chi tiết. Tìm kiếm công cụ AI hỗ trợ viết lách, thiết kế, lập trình và marketing hiệu quả.",
  openGraph: {
    title: "Kho công cụ AI của 4AIVN - Tổng hợp và đánh giá",
    description: "Khám phá thế giới AI với danh sách công cụ được cập nhật mỗi ngày.",
    type: "website",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Schema Breadcrumb: Giúp Google hiểu đây là trang danh mục cấp 2
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": "https://studio--clean-ai-hub.us-central1.hosted.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tất cả công cụ",
        "item": "https://studio--clean-ai-hub.us-central1.hosted.app/cong-cu",
      },
    ],
  };

  return (
    <>
      {/* Script này chỉ chạy ở trang /cong-cu và các trang con, nhưng trang con [id] sẽ ghi đè schema của nó lên nếu cần */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
