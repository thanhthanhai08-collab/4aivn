import type { Metadata } from "next";

const BASE_URL = "https://studio--clean-ai-hub.us-central1.hosted.app";

export const metadata: Metadata = {
  title: "Tin tức AI & Cập nhật mới nhất | 4AIVN",
  description: "Tổng hợp các bài viết, tin tức, phân tích và xu hướng mới nhất về Trí tuệ nhân tạo (AI) tại Việt Nam và thế giới. Cập nhật liên tục tại 4AIVN.",
  alternates: {
    canonical: `${BASE_URL}/tin-tuc`,
  },
  openGraph: {
    title: "Tin tức AI & Cập nhật mới nhất | 4AIVN",
    description: "Khám phá các bài viết sâu sắc về AI, từ đánh giá công cụ, hướng dẫn kỹ thuật đến các xu hướng định hình tương lai.",
    url: `${BASE_URL}/tin-tuc`,
    siteName: "4AIVN",
    type: "website",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
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
