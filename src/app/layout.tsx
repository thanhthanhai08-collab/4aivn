import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: '4AIVN - Khám phá bảng xếp hạng model và công cụ AI',
  description: 'Luôn cập nhật tin tức AI và các model công cụ AI mới nhất ngoài ra còn có trải nghiệm chatbot cho người dùng.',
  icons: {
    icon: '/image/logo-4aivn.svg',
    apple: '/image/logo-4aivn.svg',
  },
  openGraph: {
    title: '4AIVN - Khám phá bảng xếp hạng model và công cụ AI',
    description: 'Luôn cập nhật tin tức AI và các model công cụ AI mới nhất ngoài ra còn có trải nghiệm chatbot cho người dùng.',
    images: [
      {
        url: '/image/logo-4aivn.svg',
        width: 512,
        height: 512,
        alt: '4AIVN Logo',
      },
    ],
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
