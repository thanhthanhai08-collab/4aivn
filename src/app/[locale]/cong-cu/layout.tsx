import type { Metadata } from "next";

const BASE_URL = "https://4aivn.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  const title = isEn
    ? "AI Tools Directory by 4AIVN - Reviews & Ratings"
    : "Kho công cụ AI của 4AIVN - Tổng hợp và đánh giá";

  const description = isEn
    ? "A comprehensive list of hundreds of AI tools, categorized and reviewed in detail. Find AI tools for writing, design, coding, and marketing."
    : "Danh sách hàng trăm công cụ AI được phân loại, đánh giá chi tiết. Tìm kiếm công cụ AI hỗ trợ viết lách, thiết kế, lập trình và marketing hiệu quả.";

  const ogDescription = isEn
    ? "Explore the world of AI with a daily-updated list of tools."
    : "Khám phá thế giới AI với danh sách công cụ được cập nhật mỗi ngày.";

  const canonicalUrl = isEn ? `${BASE_URL}/en/tools` : `${BASE_URL}/cong-cu`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'vi': `${BASE_URL}/cong-cu`,
        'en': `${BASE_URL}/en/tools`,
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

export default async function ToolsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

  // Schema Breadcrumb: Giúp Google hiểu đây là trang danh mục cấp 2
  const jsonLd = {
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
        "name": isEn ? "AI Tools" : "Tất cả công cụ",
        "item": isEn ? `${BASE_URL}/en/tools` : `${BASE_URL}/cong-cu`,
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
