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
import { useTranslations } from "next-intl";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { registerWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("signup");

  const handleEmailSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: t("signupFailed"),
        description: t("passwordMismatch"),
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      await registerWithEmail(email, password);
      toast({
        title: t("signupSuccess"),
        description: t("signupSuccessDesc"),
        duration: 7000,
      });
      router.push("/dang-nhap"); 
    } catch (error) {
      console.error("Email signup error:", error);
      let description = t("genericError");
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          description = t("emailInUse");
        } else if (error.code === 'auth/weak-password') {
          description = t("weakPassword");
        }
        else {
          description = t("registrationError");
        }
      } else if (error instanceof Error) {
        description = error.message;
      }
      toast({
        title: t("signupFailed"),
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
        <Label htmlFor="email">{t("email")}</Label>
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
        <Label htmlFor="password">{t("password")}</Label>
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
        <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
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
        {t("signupBtn")}
      </Button>
    </form>
  );
}
