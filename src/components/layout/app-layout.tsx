// src/components/layout/app-layout.tsx
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LanguageSuggestionBanner } from "@/components/layout/language-suggestion-banner";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

interface AppLayoutProps {
  children: ReactNode;
  hideHeaderSearch?: boolean;
}

export function AppLayout({ children, hideHeaderSearch = false }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <LanguageSuggestionBanner />
      <SiteHeader hideSearch={hideHeaderSearch} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <Toaster />
      <FirebaseErrorListener />
    </div>
  );
}
