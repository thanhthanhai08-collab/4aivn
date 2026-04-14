import type { Metadata } from "next";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { redirect } from "next/navigation";

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

    let q = query(collection(db, "news-category"), where(`slug.${locale}`, "==", id));
    let querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Fallback: check if they used the other locale's slug
      const otherLocale = locale === 'en' ? 'vi' : 'en';
      const fallbackQ = query(collection(db, "news-category"), where(`slug.${otherLocale}`, "==", id));
      querySnapshot = await getDocs(fallbackQ);
    }
    
    let category = null;
    let categoryName = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    let categoryDesc = locale === 'en' ? `Latest articles and news about ${categoryName}. Continuously updated at 4AIVN.` : `Tổng hợp các bài viết, tin tức mới nhất về ${categoryName}. Cập nhật liên tục tại 4AIVN.`;

    if (!querySnapshot.empty) {
      category = querySnapshot.docs[0].data();
      if (category.name) {
        categoryName = typeof category.name === 'string' ? category.name : (category.name[locale] || category.name['vi']);
      }
      if (category.description) {
        categoryDesc = typeof category.description === 'string' ? category.description : (category.description[locale] || category.description['vi']);
      }
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
    
        let categoryName = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
        let q = query(collection(db, "news-category"), where(`slug.${locale}`, "==", id));
        let querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            const otherLocale = locale === 'en' ? 'vi' : 'en';
            const fallbackQ = query(collection(db, "news-category"), where(`slug.${otherLocale}`, "==", id));
            querySnapshot = await getDocs(fallbackQ);

            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data();
                const correctSlug = docData.slug?.[locale];
                if (correctSlug && correctSlug !== id) {
                    redirect(`/${locale === 'en' ? 'en/news' : 'tin-tuc'}/${correctSlug}`);
                }
            }
        }

        if (!querySnapshot.empty) {
            const category = querySnapshot.docs[0].data();
            if(category.name) {
                categoryName = typeof category.name === 'string' ? category.name : (category.name[locale] || category.name['vi']);
            }
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
