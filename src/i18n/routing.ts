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

    // Hồ sơ và tác giả
    '/ho-so': { vi: '/ho-so', en: '/profile' },
    '/tac-gia/[id]': { vi: '/tac-gia/[id]', en: '/author/[id]' },

    // Các trang cần dịch URL
    '/chatbot': { vi: '/chatbot', en: '/chatbot' },
    '/dang-nhap': { vi: '/dang-nhap', en: '/signin' },
    '/dang-ky': { vi: '/dang-ky', en: '/signup' },
    '/tim-kiem': { vi: '/tim-kiem', en: '/search' },
    '/gioi-thieu': { vi: '/gioi-thieu', en: '/about' },
    '/lien-he': { vi: '/lien-he', en: '/contact' },
    '/chinh-sach-quyen-rieng-tu': { vi: '/chinh-sach-quyen-rieng-tu', en: '/privacy-policy' },
    '/dieu-khoan-dich-vu': { vi: '/dieu-khoan-dich-vu', en: '/terms-of-service' },
    '/dieu-khoan-su-dung-ai': { vi: '/dieu-khoan-su-dung-ai', en: '/ai-terms-of-use' },
    '/chinh-sach-cookie': { vi: '/chinh-sach-cookie', en: '/cookie-policy' },
    
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
