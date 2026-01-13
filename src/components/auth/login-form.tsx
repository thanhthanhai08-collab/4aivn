// src/components/auth/login-form.tsx
"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { FirebaseError } from "firebase/app";

// Simple SVG for Google icon
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);


export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { loginWithEmail, loginWithGoogle, sendPasswordReset, currentUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect if user is already logged in
    if (currentUser) {
      router.push("/ho-so");
    }
  }, [currentUser, router]);

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsEmailLoading(true);
    try {
      await loginWithEmail(email, password);
      // Successful login will trigger onAuthStateChanged, which will handle the redirect.
    } catch (error) {
      console.error("Email login error:", error);
      let description = "Vui lòng kiểm tra thông tin đăng nhập của bạn và thử lại.";
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          description = "Email hoặc mật khẩu không chính xác. Vui lòng thử lại.";
        }
      }
      toast({ 
        title: "Đăng nhập thất bại", 
        description: description, 
        variant: "destructive" 
      });
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      // Successful login will trigger onAuthStateChanged, which will handle the redirect.
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, so we don't show an error.
        // It's a user action, not a system error.
        console.log("Google sign-in popup closed by user.");
      } else {
        console.error("Google login error:", error);
        toast({
          title: "Đăng nhập Google thất bại",
          description: "Không thể bắt đầu quá trình đăng nhập bằng Google. Vui lòng thử lại.",
          variant: "destructive",
        });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast({
        title: "Yêu cầu Email",
        description: "Vui lòng nhập địa chỉ email của bạn để đặt lại mật khẩu.",
        variant: "destructive",
      });
      return;
    }
    try {
      await sendPasswordReset(email);
      toast({
        title: "Đã gửi Email đặt lại mật khẩu",
        description: "Vui lòng kiểm tra hộp thư đến của bạn để làm theo hướng dẫn.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Lỗi",
        description: (error as Error).message || "Không thể gửi email đặt lại mật khẩu.",
        variant: "destructive",
      });
    }
  };

  // While redirecting, or if already logged in, render nothing.
  if (currentUser) {
    return null;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isEmailLoading || isGoogleLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isEmailLoading || isGoogleLoading}
          />
          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-sm font-medium"
              onClick={handlePasswordReset}
              disabled={isEmailLoading || isGoogleLoading}
            >
              Quên mật khẩu?
            </Button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isEmailLoading || isGoogleLoading}>
          {isEmailLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Đăng nhập bằng Email
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gradient-to-br from-background to-primary/10 text-primary-foreground px-4 py-1">
            Hoặc tiếp tục với
          </span>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isEmailLoading || isGoogleLoading}>
        {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <GoogleIcon />
        )}
        Google
      </Button>
    </div>
  );
}
