// src/app/signup/page.tsx
"use client";

import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function SignupPage() {
  const t = useTranslations("signup");

  return (
    <AppLayout>
      <div className="container flex min-h-[calc(100vh-var(--header-height)-var(--footer-height)-2rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">{t("title")}</CardTitle>
            <CardDescription>
              {t("description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {t("hasAccount")}{" "}
              <Link href="/dang-nhap" className="font-medium text-primary hover:underline">
                {t("loginLink")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
