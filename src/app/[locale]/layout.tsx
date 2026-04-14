import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth-context';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: '4AIVN - Khám phá bảng xếp hạng model và công cụ AI',
  description: "Khám phá bảng xếp hạng AI, cập nhật công cụ và tin tức AI mới nhất. 4AIVN chia sẻ những gì thực sự hữu ích để bạn dùng AI hiệu quả hơn trong công việc hàng ngày.",

  manifest: '/manifest.json',

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  openGraph: {
    title: '4AIVN - Khám phá bảng xếp hạng model và công cụ AI',
    description: "Khám phá bảng xếp hạng AI, cập nhật công cụ và tin tức AI mới nhất. 4AIVN chia sẻ những gì thực sự hữu ích để bạn dùng AI hiệu quả hơn trong công việc hàng ngày.",
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
    description: "Khám phá bảng xếp hạng AI, cập nhật công cụ và tin tức AI mới nhất. 4AIVN chia sẻ những gì thực sự hữu ích để bạn dùng AI hiệu quả hơn trong công việc hàng ngày.",
    images: ['https://4aivn.com/icon-512.png'],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for the locale
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-CS448T4W5H" />
      </body>
    </html>
  );
}
