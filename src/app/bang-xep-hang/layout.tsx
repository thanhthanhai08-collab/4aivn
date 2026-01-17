import type { Metadata } from "next";

// Thay đổi URL này thành tên miền chính thức của bạn
const BASE_URL = "https://studio--clean-ai-hub.us-central1.hosted.app";

export const metadata: Metadata = {
  title: "Bảng xếp hạng các công cụ AI tốt nhất hiện nay",
  description: "Bảng xếp hạng cập nhật liên tục các mô hình ngôn ngữ (LLM AI) dựa trên hiệu năng, diểm thông minh, độ trễ và đánh giá người dùng.",
  alternates: {
    canonical: `${BASE_URL}/bang-xep-hang`,
  },
};

export default function RankingsLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Bảng xếp hạng",
        "item": `${BASE_URL}/bang-xep-hang`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
