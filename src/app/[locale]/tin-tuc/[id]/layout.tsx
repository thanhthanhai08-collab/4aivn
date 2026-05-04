import type { Metadata } from "next";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string; locale: string }>;
};

const BASE_URL = "https://4aivn.com";

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  
  try {
    if (!id || id.includes('.')) {
      return { title: "Danh mục không tồn tại" };
    }

    const docRef = doc(db, "news-category", id);
    const docSnap = await getDoc(docRef);
    
    let categoryName = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    let categoryDesc = locale === 'en' ? `Latest articles and news about ${categoryName}. Continuously updated at 4AIVN.` : `Tổng hợp các bài viết, tin tức mới nhất về ${categoryName}. Cập nhật liên tục tại 4AIVN.`;

    const categoryMapping: Record<string, string> = {
        'danh-gia': 'review',
        'huong-dan': 'guide',
        'vibe-coding': 'vibeCoding',
        'xu-huong': 'trending'
    };

    if (docSnap.exists()) {
      const category = docSnap.data();
      if (category.name) {
        categoryName = category.name;
      }
      if (category.description) {
        categoryDesc = category.description;
      }
    }

    try {
        const t = await getTranslations({ locale, namespace: 'news.categories' });
        if (categoryMapping[id]) {
            categoryName = t(categoryMapping[id] as any);
        }
    } catch (e) {
        // fallback to db name
    }

    return {
      title: locale === 'en' ? `${categoryName} News | 4AIVN` : `Tin tức về ${categoryName} | 4AIVN`,
      description: categoryDesc,
      alternates: {
        canonical: `${BASE_URL}/${locale === 'en' ? 'en/news' : 'tin-tuc'}/${id}`,
      },
      openGraph: {
        title: locale === 'en' ? `${categoryName} News` : `Tin tức về ${categoryName}`,
        description: categoryDesc,
        url: `${BASE_URL}/${locale === 'en' ? 'en/news' : 'tin-tuc'}/${id}`,
        siteName: "4AIVN",
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error generating metadata for news category:", error);
    return {
      title: locale === 'en' ? "News Category" : "Danh mục tin tức",
      description: locale === 'en' ? "News aggregation by category." : "Tổng hợp tin tức theo danh mục."
    };
  }
}

export default async function NewsCategoryLayout({ children, params }: Props) {
    const { id, locale } = await params;
    
    try {
        if (!id || id.includes('.')) {
            return <>{children}</>;
        }
    
        const docRef = doc(db, "news-category", id);
        const docSnap = await getDoc(docRef);
        
        let categoryName = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        if (docSnap.exists()) {
            const category = docSnap.data();
            if(category.name) {
                categoryName = category.name;
            }
        }

        const categoryMapping: Record<string, string> = {
            'danh-gia': 'review',
            'huong-dan': 'guide',
            'vibe-coding': 'vibeCoding',
            'xu-huong': 'trending'
        };

        try {
            const t = await getTranslations({ locale, namespace: 'news.categories' });
            if (categoryMapping[id]) {
                categoryName = t(categoryMapping[id] as any);
            }
        } catch (e) {
            // fallback to db name
        }

        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": locale === 'en' ? "Home" : "Trang chủ",
                "item": BASE_URL,
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": locale === 'en' ? "News" : "Tin tức",
                "item": `${BASE_URL}/${locale === 'en' ? 'en/news' : 'tin-tuc'}`,
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": categoryName,
                "item": `${BASE_URL}/${locale === 'en' ? 'en/news' : 'tin-tuc'}/${id}`,
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
    } catch(error) {
        console.error(`Error in NewsCategoryLayout for id: ${id}`, error);
        return <>{children}</>;
    }
}
