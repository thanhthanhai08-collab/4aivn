// src/components/auth/signup-form.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { FirebaseError } from "firebase/app";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { registerWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleEmailSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Đăng ký thất bại",
        description: "Mật khẩu và xác nhận mật khẩu không khớp.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      await registerWithEmail(email, password);
      toast({
        title: "Đăng ký Thành công!",
        description: "Vui lòng kiểm tra email của bạn để hoàn tất quá trình xác minh.",
        duration: 7000,
      });
      router.push("/dang-nhap"); 
    } catch (error) {
      console.error("Email signup error:", error);
      let description = "Đã có lỗi xảy ra. Vui lòng thử lại.";
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          description = "Email này đã được sử dụng. Vui lòng sử dụng một email khác.";
        } else if (error.code === 'auth/weak-password') {
          description = "Mật khẩu quá yếu. Vui lòng chọn mật khẩu khác mạnh hơn."
        }
        else {
          description = "Lỗi đăng ký. Vui lòng kiểm tra lại thông tin của bạn.";
        }
      } else if (error instanceof Error) {
        description = error.message;
      }
      toast({
        title: "Đăng ký thất bại",
        description: description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleEmailSignup} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="password">Mật khẩu</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="confirm-password">Xác nhận Mật khẩu</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          disabled={isLoading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Đăng ký
      </Button>
    </form>
  );
}
