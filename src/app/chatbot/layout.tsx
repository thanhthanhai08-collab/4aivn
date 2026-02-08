import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

// Định nghĩa BASE_URL để đồng bộ với toàn bộ hệ thống
const BASE_URL = "https://4aivn.com";

// 1. Cấu hình Metadata đồng bộ (SEO alternates, OpenGraph, Canonical)
export const metadata: Metadata = {
  title: "Chatbot AI Thông Minh | 4AIVN",
  description: "Trải nghiệm trợ lý ảo AI thế hệ mới, hỗ trợ giải đáp mọi thắc mắc và xử lý dữ liệu thông minh tại 4AIVN.",
  alternates: {
    canonical: `${BASE_URL}/chatbot`,
  },
  openGraph: {
    title: "Chatbot AI Thông Minh - 4AIVN",
    description: "Công cụ tương tác AI mạnh mẽ, hỗ trợ giải đáp và xử lý dữ liệu cho người Việt.",
    url: `${BASE_URL}/chatbot`,
    siteName: "4AIVN",
    type: "website",
  },
};

// 2. Cấu hình Layout và JSON-LD WebApplication
export default function ChatbotLayout({ children }: Props) {
  
  const chatbotJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "4AIVN Chatbot",
    "url": `${BASE_URL}/chatbot`,
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "description": "Trợ lý ảo AI thông minh hỗ trợ người dùng tương tác và hỏi đáp các thông tin về 4AIVN.",
    "browserRequirements": "Requires JavaScript and a modern web browser.",
    "featureList": [
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
