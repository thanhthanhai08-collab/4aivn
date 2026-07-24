"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Languages, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const DISMISSED_KEY = "language-suggestion-dismissed";
const PREFERRED_LOCALE_KEY = "preferred-locale";

export function LanguageSuggestionBanner() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (locale !== "vi") return;

    const dismissed = localStorage.getItem(DISMISSED_KEY) === "en";
    const preferredLocale = localStorage.getItem(PREFERRED_LOCALE_KEY);
    const browserLocale = navigator.languages?.[0] || navigator.language;
    const prefersEnglish =
      preferredLocale === "en" ||
      (!preferredLocale && browserLocale.toLowerCase().startsWith("en"));

    if (!dismissed && preferredLocale !== "vi" && prefersEnglish) {
      setIsVisible(true);
    }
  }, [locale]);

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "en");
    setIsVisible(false);
  }

  function switchToEnglish() {
    localStorage.setItem(PREFERRED_LOCALE_KEY, "en");
    localStorage.setItem(DISMISSED_KEY, "en");

    const alternate = document.querySelector<HTMLLinkElement>(
      'link[rel="alternate"][hreflang="en"]'
    );

    if (alternate?.href) {
      const target = new URL(alternate.href);
      window.location.assign(
        `${window.location.origin}${target.pathname}${target.search}${target.hash}`
      );
      return;
    }

    // Pages without a genuine English alternate should not create a fake
    // translated URL. Send the visitor to the English homepage instead.
    window.location.assign("/en");
  }

  if (!isVisible) return null;

  return (
    <aside
      className="border-b border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-50"
      aria-label="English language suggestion"
    >
      <div className="container flex min-h-10 max-w-screen-2xl items-center justify-center gap-2 px-3 py-1.5 sm:gap-3">
        <Languages className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden="true" />
        <p className="text-center text-xs font-medium sm:text-sm">
          Prefer English? View this page in English.
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-7 shrink-0 border-blue-300 bg-white px-2.5 text-xs text-blue-950 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-50 dark:hover:bg-blue-800"
          onClick={switchToEnglish}
        >
          View in English
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-7 w-7 shrink-0 text-blue-800 hover:bg-blue-100 hover:text-blue-950 dark:text-blue-200 dark:hover:bg-blue-900 dark:hover:text-white"
          onClick={dismiss}
          aria-label="Dismiss language suggestion"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}
