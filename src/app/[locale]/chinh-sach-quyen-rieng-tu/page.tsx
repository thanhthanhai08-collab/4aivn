// src/app/privacy-policy/page.tsx
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');
  const t = useTranslations('privacyPolicy');
  const locale = useLocale();

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'vi-VN'));
  }, [locale]);

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline text-center">
              {t('title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-foreground leading-relaxed">
            <p className="text-muted-foreground text-center">
              {t('lastUpdated', { date: lastUpdated })}
            </p>

            <h2>{t('section1Title')}</h2>
            <p>{t('section1Content')}</p>

            <h2>{t('section2Title')}</h2>
            <p>{t('section2Content')}</p>
            <ul>
              <li>{t('section2Item1')}</li>
              <li>{t('section2Item2')}</li>
              <li>{t('section2Item3')}</li>
              <li>{t('section2Item4')}</li>
            </ul>

            <h2>{t('section3Title')}</h2>
            <p>{t('section3Content')}</p>

            <h2>{t('section4Title')}</h2>
            <p>{t('section4Content')}</p>

             <h2>{t('section5Title')}</h2>
            <p>{t('section5Content')}</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
