import { MetadataRoute } from "next";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 86400; // 24 tiếng

const BASE_URL = "https://4aivn.com";

type SitemapOptions = { lastModified?: Date; changeFrequency?: any; priority?: number };

// Tạo 2 entry: một cho VI, một cho EN — cả hai đều có alternates hreflang
function createEntries(
  viPath: string,
  enPath: string,
  options: SitemapOptions
): MetadataRoute.Sitemap {
  const cleanVi = viPath.startsWith("/") ? viPath : `/${viPath}`;
  const cleanEn = enPath.startsWith("/") ? enPath : `/${enPath}`;

  const urlVi = cleanVi === "/" ? BASE_URL : `${BASE_URL}${cleanVi}`;
  const urlEn = cleanEn === "/" ? `${BASE_URL}/en` : `${BASE_URL}/en${cleanEn}`;

  const alternates = {
    languages: {
      vi: urlVi,
      en: urlEn,
    },
  };

  const shared = {
    lastModified: options.lastModified || new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates,
  };

  return [
    { url: urlVi, ...shared },
    { url: urlEn, ...shared },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicUrls: MetadataRoute.Sitemap = [];

  try {
    // 1. Lấy Tin tức (Collection: news) -> slug VI và EN riêng
    const newsSnap = await getDocs(collection(db, "news"));
    newsSnap.forEach((doc) => {
      const data = doc.data();
      if (data.post) {
        // Lấy slug theo từng locale: bài cũ slug là string, bài mới slug là { vi, en }
        const slugField = data.slug;
        let slugVi: string;
        let slugEn: string;

        if (slugField && typeof slugField === 'object' && 'vi' in slugField) {
          // Bài mới: slug có cả vi và en
          slugVi = slugField.vi || doc.id;
          slugEn = slugField.en || slugField.vi || doc.id;
        } else if (typeof slugField === 'string' && slugField) {
          // Bài cũ: slug chỉ là string tiếng Việt
          slugVi = slugField;
          slugEn = slugField; // dùng chung slug VI cho EN nếu chưa có bản EN
        } else {
          // Fallback về document ID
          slugVi = doc.id;
          slugEn = doc.id;
        }

        dynamicUrls.push(...createEntries(
          `/${slugVi}`,
          `/${slugEn}`,
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
      dynamicUrls.push(...createEntries(
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
      dynamicUrls.push(...createEntries(
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
      dynamicUrls.push(...createEntries(
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
      dynamicUrls.push(...createEntries(
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

  // KẾT HỢP TRANG TĨNH VÀ TRANG ĐỘNG (mỗi createEntries trả về [vi, en])
  return [
    ...createEntries('/', '/', { changeFrequency: 'daily', priority: 1.0 }),
    ...createEntries('/tin-tuc', '/news', { changeFrequency: 'daily', priority: 0.9 }),
    ...createEntries('/cong-cu', '/tools', { changeFrequency: 'daily', priority: 0.9 }),
    ...createEntries('/bang-xep-hang', '/rankings', { changeFrequency: 'daily', priority: 0.9 }),
    ...createEntries('/chatbot', '/chatbot', { changeFrequency: 'monthly', priority: 0.7 }),
    ...createEntries('/gioi-thieu', '/about', { changeFrequency: 'monthly', priority: 0.5 }),
    ...createEntries('/cau-hoi-thuong-gap', '/faq', { changeFrequency: 'monthly', priority: 0.6 }),
    ...createEntries('/lien-he', '/contact', { changeFrequency: 'monthly', priority: 0.5 }),
    ...createEntries('/chinh-sach-quyen-rieng-tu', '/privacy-policy', { changeFrequency: 'yearly', priority: 0.3 }),
    ...createEntries('/dieu-khoan-dich-vu', '/terms-of-service', { changeFrequency: 'yearly', priority: 0.3 }),
    ...createEntries('/dieu-khoan-su-dung-ai', '/ai-terms-of-use', { changeFrequency: 'yearly', priority: 0.3 }),
    ...createEntries('/chinh-sach-cookie', '/cookie-policy', { changeFrequency: 'yearly', priority: 0.3 }),
    ...dynamicUrls,
  ];
}
