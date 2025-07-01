// src/app/reset-password/page.tsx
"use client";

import { useState, useEffect, type FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [oobCode, setOobCode] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (!code) {
      setError("Thiếu mã đặt lại mật khẩu. Vui lòng thử lại từ email của bạn.");
      setIsLoading(false);
      return;
    }

    setOobCode(code);

    verifyPasswordResetCode(auth, code)
      .then((userEmail) => {
        setEmail(userEmail);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Invalid reset code:", err);
        setError("Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu một liên kết mới.");
        setIsLoading(false);
      });
  }, [searchParams]);

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu xác nhận không khớp.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword.length < 6) {
        toast({
            title: "Lỗi",
            description: "Mật khẩu phải có ít nhất 6 ký tự.",
            variant: "destructive",
        });
        return;
    }

    if (!oobCode) return;

    setIsUpdating(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast({
        title: "Thành công",
        description: "Mật khẩu của bạn đã được đặt lại. Vui lòng đăng nhập.",
      });
      router.push("/login");
    } catch (err) {
      console.error("Password reset failed:", err);
      toast({
        title: "Đặt lại mật khẩu thất bại",
        description: "Không thể đặt lại mật khẩu của bạn. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />;
    }

    if (error) {
      return (
        <div className="text-center">
          <p className="text-destructive">{error}</p>
          <Button asChild variant="link" className="mt-4">
            <Link href="/login">Quay lại trang Đăng nhập</Link>
          </Button>
        </div>
      );
    }

    return (
      <form onSubmit={handlePasswordReset} className="space-y-4">
        <div>
          <Label htmlFor="newPassword">Mật khẩu mới</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={isUpdating}
          />
        </div>
        <div>
          <Label htmlFor="confirmNewPassword">Xác nhận mật khẩu mới</Label>
          <Input
            id="confirmNewPassword"
            type="password"
            placeholder="••••••••"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            disabled={isUpdating}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isUpdating}>
          {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lưu thay đổi
        </Button>
      </form>
    );
  };

  return (
    <AppLayout>
      <div className="container flex min-h-[calc(100vh-var(--header-height)-var(--footer-height)-2rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Đặt lại mật khẩu của bạn</CardTitle>
            {email && !error && (
              <CardDescription>
                Cho {email}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}


export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}