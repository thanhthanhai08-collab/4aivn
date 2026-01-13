// src/app/login/page.tsx
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AppLayout>
      <div className="container flex min-h-[calc(100vh-var(--header-height)-var(--footer-height)-2rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md shadow-xl bg-card/90 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Chào mừng đến với 4AIVN</CardTitle>
            <CardDescription>
              Đăng nhập để truy cập hồ sơ, đánh giá công cụ và lưu mục yêu thích.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Chưa có tài khoản?{" "}
              <Link href="/dang-ky" className="font-medium text-primary hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
