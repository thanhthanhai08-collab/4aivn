import { MetadataRoute } from "next";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 86400; // 24 tiếng

const BASE_URL = "https://4aivn.com";

// Helper function to build alternate URLs
function createEntry(viPath: string, enPath: string, options: { lastModified?: Date, changeFrequency?: any, priority?: number }): MetadataRoute.Sitemap[0] {
  // Ensure paths start with /
  const cleanVi = viPath.startsWith('/') ? viPath : `/${viPath}`;
  const cleanEn = enPath.startsWith('/') ? enPath : `/${enPath}`;
  
  // For root path, cleanVi is '/' and cleanEn is '/'. 
  const urlVi = cleanVi === '/' ? BASE_URL : `${BASE_URL}${cleanVi}`;
  const urlEn = cleanEn === '/' ? `${BASE_URL}/en` : `${BASE_URL}/en${cleanEn}`;
  
  return {
    url: urlVi,
    lastModified: options.lastModified || new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: {
        vi: urlVi,
        en: urlEn,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicUrls: MetadataRoute.Sitemap = [];

  try {
    // 1. Lấy Tin tức (Collection: news) -> routes to /[id] or /en/[id]
    const newsSnap = await getDocs(collection(db, "news"));
    newsSnap.forEach((doc) => {
      const data = doc.data();
      if (data.post) {
        dynamicUrls.push(createEntry(
          `/${doc.id}`,
          `/${doc.id}`,
          {
            lastModified: data.publishedAt?.toDate?.() || new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
          }
        ));
      }
    });

    // 2. Lấy Danh mục tin tức (Collection: news-category) -> routes to /tin-tuc/[id] or /en/news/[id]
    const catSnap = await getDocs(collection(db, "news-category"));
    catSnap.forEach((doc) => {
      dynamicUrls.push(createEntry(
        `/tin-tuc/${doc.id}`,
        `/news/${doc.id}`,
        {
          changeFrequency: 'monthly',
          priority: 0.7,
        }
      ));
    });

    // 3. Lấy Công cụ AI (Collection: tools) -> routes to /cong-cu/[id] or /en/tools/[id]
    const toolsSnap = await getDocs(collection(db, "tools"));
    toolsSnap.forEach((doc) => {
      dynamicUrls.push(createEntry(
        `/cong-cu/${doc.id}`,
        `/tools/${doc.id}`,
        {
          changeFrequency: 'weekly',
          priority: 0.7,
        }
      ));
    });

    // 4. Lấy Bảng xếp hạng Models (Collection: models) -> /bang-xep-hang/[id] or /en/rankings/[id]
    const modelsSnap = await getDocs(collection(db, "models"));
    modelsSnap.forEach((doc) => {
      dynamicUrls.push(createEntry(
        `/bang-xep-hang/${doc.id}`,
        `/rankings/${doc.id}`,
        {
          changeFrequency: 'weekly',
          priority: 0.9,
        }
      ));
    });

    // 5. Lấy Tác giả (Collection: authors) -> /tac-gia/[id] or /en/author/[id]
    const authorsSnap = await getDocs(collection(db, "authors"));
    authorsSnap.forEach((doc) => {
      dynamicUrls.push(createEntry(
        `/tac-gia/${doc.id}`,
        `/author/${doc.id}`,
        {
          changeFrequency: 'monthly',
          priority: 0.6,
        }
      ));
    });

  } catch (error) {
    console.error("Lỗi khi tạo sitemap động:", error);
  }

  // KẾT HỢP TRANG TĨNH VÀ TRANG ĐỘNG
  return [
    createEntry('/', '/', { changeFrequency: 'daily', priority: 1.0 }),
    createEntry('/tin-tuc', '/news', { changeFrequency: 'daily', priority: 0.9 }),
    createEntry('/cong-cu', '/tools', { changeFrequency: 'daily', priority: 0.9 }),
    createEntry('/bang-xep-hang', '/rankings', { changeFrequency: 'daily', priority: 0.9 }),
    createEntry('/chatbot', '/chatbot', { changeFrequency: 'monthly', priority: 0.7 }),
    createEntry('/gioi-thieu', '/about', { changeFrequency: 'monthly', priority: 0.5 }),
    createEntry('/lien-he', '/contact', { changeFrequency: 'monthly', priority: 0.5 }),
    createEntry('/chinh-sach-quyen-rieng-tu', '/privacy-policy', { changeFrequency: 'yearly', priority: 0.3 }),
    createEntry('/dieu-khoan-dich-vu', '/terms-of-service', { changeFrequency: 'yearly', priority: 0.3 }),
    createEntry('/dieu-khoan-su-dung-ai', '/ai-terms-of-use', { changeFrequency: 'yearly', priority: 0.3 }),
    createEntry('/chinh-sach-cookie', '/cookie-policy', { changeFrequency: 'yearly', priority: 0.3 }),
    ...dynamicUrls,
  ];
}
