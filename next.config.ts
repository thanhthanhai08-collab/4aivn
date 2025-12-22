import type { NextConfig } from 'next';

// Nạp các biến môi trường
import('dotenv').then(dotenv => dotenv.config());

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 1. Cấu hình REWRITES để tạo URL thân thiện SEO
  async rewrites() {
    return [
      {
        /**
         * Biến đường dẫn /image/ thành cổng kết nối đến Storage.
         * Ví dụ: /image/models/gemini.png -> https://firebasestorage.googleapis.com/.../o/models%2Fgemini.png
         */
        source: '/image/:path*',
        destination: `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/:path*`,
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

export default nextConfig;
