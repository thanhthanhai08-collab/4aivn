import { MetadataRoute } from "next";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 86400; // 24 tiếng — tiết kiệm hơn

const BASE_URL = "https://4aivn.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicUrls: MetadataRoute.Sitemap = [];

  try {
    // 1. Lấy Tin tức (Collection: news)
    const newsSnap = await getDocs(collection(db, "news"));
    newsSnap.forEach((doc) => {
      const data = doc.data();
      if (data.post) { // Chỉ lấy các bài đã xuất bản
        dynamicUrls.push({
          url: `${BASE_URL}/${doc.id}`,
          lastModified: data.publishedAt?.toDate?.() || new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        });
      }
    });

    // 2. Lấy Danh mục tin tức (Collection: news-category)
    const catSnap = await getDocs(collection(db, "news-category"));
    catSnap.forEach((doc) => {
      dynamicUrls.push({
        url: `${BASE_URL}/tin-tuc/${doc.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // 3. Lấy Công cụ AI (Collection: tools)
    const toolsSnap = await getDocs(collection(db, "tools"));
    toolsSnap.forEach((doc) => {
      dynamicUrls.push({
        url: `${BASE_URL}/cong-cu/${doc.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });

    // 4. Lấy Bảng xếp hạng Models (Collection: models)
    const modelsSnap = await getDocs(collection(db, "models"));
    modelsSnap.forEach((doc) => {
      dynamicUrls.push({
        url: `${BASE_URL}/bang-xep-hang/${doc.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });

    // 5. Lấy Tác giả (Collection: authors)
    const authorsSnap = await getDocs(collection(db, "authors"));
    authorsSnap.forEach((doc) => {
      dynamicUrls.push({
        url: `${BASE_URL}/tac-gia/${doc.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });

  } catch (error) {
    console.error("Lỗi khi tạo sitemap động:", error);
  }

  // KẾT HỢP TRANG TĨNH VÀ TRANG ĐỘNG
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/tin-tuc`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/cong-cu`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/bang-xep-hang`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/chatbot`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/gioi-thieu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/chinh-sach-quyen-rieng-tu`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...dynamicUrls,
  ];
}
