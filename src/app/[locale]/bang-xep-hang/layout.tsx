import type { Metadata } from "next";

const BASE_URL = "https://4aivn.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  const title = isEn
    ? "Best AI Tools & Models Rankings | 4AIVN"
    : "Bảng xếp hạng các công cụ AI tốt nhất hiện nay";

  const description = isEn
    ? "Continuously updated rankings of AI language models (LLMs) based on performance, intelligence scores, latency, and user reviews."
    : "Bảng xếp hạng cập nhật liên tục các mô hình ngôn ngữ (LLM AI) dựa trên hiệu năng, diểm thông minh, độ trễ và đánh giá người dùng.";

  const canonicalUrl = isEn ? `${BASE_URL}/en/rankings` : `${BASE_URL}/bang-xep-hang`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'vi': `${BASE_URL}/bang-xep-hang`,
        'en': `${BASE_URL}/en/rankings`,
      }
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "4AIVN",
      type: "website",
    },
  };
}

export default async function RankingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

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
        "name": isEn ? "Rankings" : "Bảng xếp hạng",
        "item": isEn ? `${BASE_URL}/en/rankings` : `${BASE_URL}/bang-xep-hang`,
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
