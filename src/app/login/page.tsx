// src/app/login/page.tsx
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AppLayout>
      <div className="container flex min-h-[calc(100vh-var(--header-height)-var(--footer-height)-2rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Welcome Back!</CardTitle>
            <CardDescription>
              Login to access your profile, rate tools, and save favorites.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="#" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
              {" "} (Feature coming soon!)
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
