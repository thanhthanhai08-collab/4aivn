// src/components/layout/language-switcher.tsx
"use client";

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const locales = [
  { code: 'vi' as const, label: 'VI', fullLabel: 'Tiếng Việt' },
  { code: 'en' as const, label: 'EN', fullLabel: 'English' },
];

import { useParams } from 'next/navigation';

interface LanguageSwitcherProps {
  iconOnly?: boolean;
}

export function LanguageSwitcher({ iconOnly = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('languageSwitcher');

  const currentLocale = locales.find(l => l.code === locale) || locales[0];
  const alternateLocale = locales.find(l => l.code !== locale) || locales[1];

  function handleLocaleChange(newLocale: 'vi' | 'en') {
    // Lưu vào localStorage cho lần sau
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', newLocale);
    }

    startTransition(() => {
      // @ts-expect-error -- Using dynamic pathname and params returned from hooks
      router.replace({ pathname, params }, { locale: newLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={iconOnly ? "icon" : "sm"}
          className={iconOnly ? "h-9 w-9" : "h-9 px-2 text-sm font-medium gap-1.5"}
          disabled={isPending}
          aria-label={t('switchTo', { language: alternateLocale.fullLabel })}
        >
          <Globe className="h-4 w-4" />
          {!iconOnly && <span>{currentLocale.label}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onClick={() => handleLocaleChange(loc.code)}
            className={locale === loc.code ? 'bg-accent font-semibold' : ''}
          >
            <span className="mr-2 font-medium">{loc.label}</span>
            {loc.fullLabel}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
