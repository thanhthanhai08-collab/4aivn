import type { Metadata } from "next";

const BASE_URL = "https://4aivn.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  const title = isEn
    ? "AI News & Latest Updates | 4AIVN"
    : "Tin tức AI & Cập nhật mới nhất | 4AIVN";

  const description = isEn
    ? "A collection of articles, news, analysis, and the latest trends in Artificial Intelligence (AI) in Vietnam and worldwide. Continuously updated at 4AIVN."
    : "Tổng hợp các bài viết, tin tức, phân tích và xu hướng mới nhất về Trí tuệ nhân tạo (AI) tại Việt Nam và thế giới. Cập nhật liên tục tại 4AIVN.";

  const ogDescription = isEn
    ? "Explore insightful articles about AI, from tool reviews and technical guides to trends shaping the future."
    : "Khám phá các bài viết sâu sắc về AI, từ đánh giá công cụ, hướng dẫn kỹ thuật đến các xu hướng định hình tương lai.";

  const canonicalUrl = isEn ? `${BASE_URL}/en/news` : `${BASE_URL}/tin-tuc`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'vi': `${BASE_URL}/tin-tuc`,
        'en': `${BASE_URL}/en/news`,
      }
    },
    openGraph: {
      title,
      description: ogDescription,
      url: canonicalUrl,
      siteName: "4AIVN",
      type: "website",
    },
  };
}

export default async function NewsLayout({
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
        "name": isEn ? "News" : "Tin tức",
        "item": isEn ? `${BASE_URL}/en/news` : `${BASE_URL}/tin-tuc`,
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
