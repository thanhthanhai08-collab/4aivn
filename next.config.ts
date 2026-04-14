import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // 1. Redirect 308 từ URL tác giả cũ sang mới (giữ SEO)
  async redirects() {
    return [
      {
        source: '/tin-tuc/tac-gia/:id',
        destination: '/tac-gia/:id',
        permanent: true,
      },
    ];
  },

  // 2. Cấu hình REWRITES để tạo URL thân thiện SEO
  async rewrites() {
    return [
      {
        /**
         * Biến đường dẫn /image/ thành cổng kết nối đến Storage.
         * Ví dụ: /image/models/gemini.png -> https://firebasestorage.googleapis.com/.../o/models%2Fgemini.png
         */
        source: '/image/:path*',
        destination: 'https://firebasestorage.googleapis.com/v0/b/clean-ai-hub.firebasestorage.app/o/:path*?alt=media',
      },
    ];
  },

  images: {
    // Tắt unoptimized để Next.js tự động nén ảnh sang WebP/AVIF giúp tải nhanh hơn
    unoptimized: false, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'agents-download.skywork.ai',
        port: '',
        pathname: '/**',
      },
      // 2. Cho phép Next.js tối ưu ảnh từ mọi Bucket trên Firebase Storage
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

export default withNextIntl(nextConfig);
