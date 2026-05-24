import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://4aivn.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  const title = isEn
    ? "Smart AI Chatbot | 4AIVN"
    : "Chatbot AI Thông Minh | 4AIVN";

  const description = isEn
    ? "Experience the next-generation AI virtual assistant, supporting all questions and smart data processing at 4AIVN."
    : "Trải nghiệm trợ lý ảo AI thế hệ mới, hỗ trợ giải đáp mọi thắc mắc và xử lý dữ liệu thông minh tại 4AIVN.";

  const ogTitle = isEn
    ? "Smart AI Chatbot - 4AIVN"
    : "Chatbot AI Thông Minh - 4AIVN";

  const ogDescription = isEn
    ? "Powerful AI interaction tool, supporting answering and data processing."
    : "Công cụ tương tác AI mạnh mẽ, hỗ trợ giải đáp và xử lý dữ liệu cho người Việt.";

  const canonicalUrl = isEn ? `${BASE_URL}/en/chatbot` : `${BASE_URL}/chatbot`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'vi': `${BASE_URL}/chatbot`,
        'en': `${BASE_URL}/en/chatbot`,
      }
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: "4AIVN",
      type: "website",
    },
  };
}

export default async function ChatbotLayout({ children, params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  const chatbotJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "4AIVN Chatbot",
    "url": isEn ? `${BASE_URL}/en/chatbot` : `${BASE_URL}/chatbot`,
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "description": isEn
      ? "Smart AI virtual assistant supporting users to interact and ask questions about 4AIVN."
      : "Trợ lý ảo AI thông minh hỗ trợ người dùng tương tác và hỏi đáp các thông tin về 4AIVN.",
    "browserRequirements": "Requires JavaScript and a modern web browser.",
    "featureList": isEn
      ? [
          "Natural Language Processing (NLP)",
          "Instant 24/7 Question Answering",
          "English and Vietnamese Support",
          "Smart Data Analysis"
        ]
      : [
          "Xử lý ngôn ngữ tự nhiên (NLP)",
          "Giải đáp câu hỏi tức thì 24/7",
          "Hỗ trợ tiếng Việt",
          "Phân tích dữ liệu thông minh"
        ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chatbotJsonLd) }}
      />
      {children}
    </>
  );
}
