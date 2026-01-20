import type { Metadata } from "next";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

const BASE_URL = "https://studio--clean-ai-hub.us-central1.hosted.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  if (!id) return { title: "Danh mục không tồn tại" };

  try {
    const docRef = doc(db, "news-category", id); // Assuming 'news-category' collection
    const docSnap = await getDoc(docRef);
    const category = docSnap.exists() ? docSnap.data() : null;
    const categoryName = category?.name || id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return {
      title: `Tin tức về ${categoryName} | 4AIVN`,
      description: `Tổng hợp các bài viết, tin tức mới nhất về ${categoryName}. Cập nhật liên tục tại 4AIVN.`,
      alternates: {
        canonical: `${BASE_URL}/tin-tuc/${id}`,
      },
      openGraph: {
        title: `Tin tức về ${categoryName}`,
        description: `Tổng hợp các bài viết, tin tức mới nhất về ${categoryName}.`,
        url: `${BASE_URL}/tin-tuc/${id}`,
        siteName: "4AIVN",
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error generating metadata for news category:", error);
    return {
      title: "Danh mục tin tức",
      description: "Tổng hợp tin tức theo danh mục."
    };
  }
}

export default async function NewsCategoryLayout({ children, params }: Props) {
    const { id } = params;
    if (!id) return <>{children}</>;
    
    let categoryName = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    try {
        const docRef = doc(db, "news-category", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const category = docSnap.data();
            if(category.name) categoryName = category.name;
        }
    } catch (error) {
        console.error("Could not fetch category name for schema:", error);
    }

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
        {
            "@type": "ListItem",
            "position": 3,
            "name": categoryName,
            "item": `${BASE_URL}/tin-tuc/${id}`,
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
