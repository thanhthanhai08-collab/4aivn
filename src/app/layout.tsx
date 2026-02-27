import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: '4AIVN - Khám phá bảng xếp hạng model và công cụ AI',
  description: 'Luôn cập nhật tin tức AI và các model công cụ AI mới nhất ngoài ra còn có trải nghiệm chatbot cho người dùng.',
  
  manifest: '/manifest.json', // Kết nối file manifest

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }, // Thêm favicon SVG chuẩn SEO
      // { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }, 
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }, //
    ],
  },

  openGraph: {
    title: '4AIVN - Khám phá bảng xếp hạng model và công cụ AI',
    description: 'Cập nhật tin tức và công cụ AI mới nhất.',
    url: 'https://4aivn.com',
    siteName: '4AIVN',
    images: [
      {
        url: 'https://4aivn.com/icon-512.png',
        width: 512,
        height: 512,
        alt: '4AIVN Logo',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  
  twitter: {
    card: 'summary', 
    title: '4AIVN - Khám phá bảng xếp hạng model và công cụ AI',
    description: 'Cập nhật tin tức và công cụ AI mới nhất.',
    images: ['https://4aivn.com/icon-512.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Ưu tiên khai báo icon Apple trực tiếp để các trình duyệt cũ nhận diện tốt hơn */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        <GoogleAnalytics gaId="G-CS448T4W5H" /> 
      </body>
    </html>
  );
}
