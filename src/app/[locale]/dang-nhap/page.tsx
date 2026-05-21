// src/app/dang-nhap/page.tsx
"use client";

import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("login");

  return (
    <AppLayout>
      <div className="container flex min-h-[calc(100vh-var(--header-height)-var(--footer-height)-2rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md shadow-xl bg-gradient-to-br from-background to-primary/10 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">{t("title")}</CardTitle>
            <CardDescription>
              {t("description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {t("noAccount")}{" "}
              <Link href="/dang-ky" className="font-medium text-primary hover:underline">
                {t("signupLink")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
