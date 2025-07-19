// src/app/auth-action/page.tsx
"use client";

import { useState, useEffect, type FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { confirmPasswordReset, verifyPasswordResetCode, applyActionCode } from "firebase/auth";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

function AuthActionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [mode, setMode] = useState<string | null>(null);
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  useEffect(() => {
    const actionCode = searchParams.get("oobCode");
    const action = searchParams.get("mode");
    
    if (!actionCode || !action) {
      setError("Liên kết không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.");
      setIsLoading(false);
      return;
    }

    setOobCode(actionCode);
    setMode(action);

    const handleAction = async () => {
        try {
            switch (action) {
                case 'resetPassword':
                    const userEmail = await verifyPasswordResetCode(auth, actionCode);
                    setEmail(userEmail);
                    break;
                case 'verifyEmail':
                    await applyActionCode(auth, actionCode);
                    setVerificationSuccess(true);
                    toast({
                        title: "Xác minh thành công",
                        description: "Email của bạn đã được xác minh. Đang chuyển hướng đến hồ sơ của bạn...",
                    });
                    setTimeout(() => {
                        router.push('/profile');
                    }, 3000);
                    return;
                default:
                    throw new Error("Hành động không được hỗ trợ.");
            }
        } catch (err) {
            console.error("Invalid action code:", err);
            setError("Liên kết không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu một liên kết mới.");
        } finally {
            setIsLoading(false);
        }
    };
    
    handleAction();
  }, [searchParams, router, toast]);

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
    
    if (verificationSuccess) {
      return (
        <div className="text-center space-y-2">
            <p>Email của bạn đã được xác minh thành công!</p>
            <p className="text-muted-foreground text-sm">Bạn sẽ được chuyển hướng đến trang hồ sơ của mình ngay bây giờ.</p>
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary mt-4" />
        </div>
      );
    }

    if (mode === 'resetPassword') {
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
    }

    return null; // Should not be reached if logic is correct
  };

  const getTitle = () => {
    if (isLoading) return "Đang xử lý...";
    if (error) return "Đã xảy ra lỗi";
    if (mode === 'resetPassword') return "Đặt lại mật khẩu của bạn";
    if (mode === 'verifyEmail') return "Đang xác minh Email...";
    return "Hành động không xác định";
  };


  return (
    <AppLayout>
      <div className="container flex min-h-[calc(100vh-var(--header-height)-var(--footer-height)-2rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">{getTitle()}</CardTitle>
            {email && !error && mode === 'resetPassword' && (
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


export default function AuthActionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthActionContent />
    </Suspense>
  );
}
