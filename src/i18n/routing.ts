import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'as-needed', // vi không prefix, en có /en/
  pathnames: {
    // Trang chủ
    '/': '/',

    // Tin tức (đã có)
    '/tin-tuc': { vi: '/tin-tuc', en: '/news' },
    '/tin-tuc/[id]': { vi: '/tin-tuc/[id]', en: '/news/[id]' },

    // Công cụ AI
    '/cong-cu': { vi: '/cong-cu', en: '/tools' },
    '/cong-cu/[id]': { vi: '/cong-cu/[id]', en: '/tools/[id]' },

    // Bảng xếp hạng
    '/bang-xep-hang': { vi: '/bang-xep-hang', en: '/rankings' },
    '/bang-xep-hang/[id]': { vi: '/bang-xep-hang/[id]', en: '/rankings/[id]' },

    // Các trang không cần dịch URL (giữ nguyên cho cả 2 locale)
    '/chatbot': '/chatbot',
    '/dang-nhap': '/dang-nhap',
    '/dang-ky': '/dang-ky',
    '/tim-kiem': '/tim-kiem',
    '/gioi-thieu': '/gioi-thieu',
    '/lien-he': '/lien-he',
    '/chinh-sach-quyen-rieng-tu': '/chinh-sach-quyen-rieng-tu',
    '/dieu-khoan-dich-vu': '/dieu-khoan-dich-vu',
    '/dieu-khoan-su-dung-ai': '/dieu-khoan-su-dung-ai',
    '/chinh-sach-cookie': '/chinh-sach-cookie',
    '/admin': '/admin',
    '/admin/preview/[id]': '/admin/preview/[id]',
    '/admin/preview/tool/[id]': '/admin/preview/tool/[id]',
    '/admin/preview/model/[id]': '/admin/preview/model/[id]',
  }
});

// Lightweight wrappers around Next.js navigation APIs
// that handle locale-aware routing
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
