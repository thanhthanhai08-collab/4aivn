// src/components/profile/edit-profile-form.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";

interface EditProfileFormProps {
  onSuccess: () => void;
}

export function EditProfileForm({ onSuccess }: EditProfileFormProps) {
  const { currentUser, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const locale = useLocale();
  const isEn = locale === "en";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    displayName: string;
    bio: string;
  }>({
    displayName: "",
    bio: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        displayName: currentUser.displayName || "",
        bio: currentUser.bio || "",
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!formData.displayName.trim()) {
      toast({
        title: isEn ? "Invalid name" : "Tên không hợp lệ",
        description: isEn ? "Display name cannot be empty." : "Tên hiển thị không được để trống.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await updateUserProfile({
        displayName: formData.displayName,
        bio: formData.bio,
      });

      toast({ title: isEn ? "Changes saved" : "Đã lưu thay đổi" });
      onSuccess();
    } catch (error) {
      console.error("Profile update error: ", error);
      toast({
        title: isEn ? "Save error" : "Lỗi khi lưu",
        description: isEn ? "Failed to update your profile." : "Không thể cập nhật hồ sơ của bạn.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">{isEn ? "Your name" : "Tên của bạn"}</Label>
          <Input
            id="displayName"
            value={formData.displayName}
            onChange={(e) => setFormData((p) => ({ ...p, displayName: e.target.value }))}
            placeholder={isEn ? "Example: Alex" : "Ví dụ: Hoàng"}
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">{isEn ? "Bio" : "Tiểu sử"}</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData((p) => ({ ...p, bio: e.target.value }))}
            placeholder={isEn ? "A little about yourself..." : "Một chút về bản thân..."}
            className="resize-none h-24"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isEn ? "Save changes" : "Lưu thay đổi"}
      </Button>
    </form>
  );
}
