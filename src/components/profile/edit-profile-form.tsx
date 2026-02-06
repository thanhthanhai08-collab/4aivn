// src/components/profile/edit-profile-form.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Loader2, Camera, Upload, Trash2 } from "lucide-react";

interface EditProfileFormProps {
  onSuccess: () => void;
}

export function EditProfileForm({ onSuccess }: EditProfileFormProps) {
  const { currentUser, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<{
    displayName: string;
    photoURL: string | null;
    bio: string;
  }>({
    displayName: "",
    photoURL: null,
    bio: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        displayName: currentUser.displayName || "",
        photoURL: currentUser.photoURL || null,
        bio: "", // Bio will be fetched from Firestore
      });
      
      const userDocRef = doc(db, "user-data", currentUser.uid);
      getDoc(userDocRef).then(snap => {
        if (snap.exists() && snap.data().bio) {
          setFormData(prev => ({ ...prev, bio: snap.data().bio }));
        }
      });
    }
  }, [currentUser]);
  
  const getInitials = (name: string | null | undefined) => {
    if (!name || !name.trim()) return "?";
    const names = name.trim().split(' ');
    if (names.length > 1) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `avatars/${currentUser.uid}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setFormData(prev => ({ ...prev, photoURL: url }));
      toast({ title: "Đã tải ảnh lên thành công" });
    } catch (error) {
      console.error("Upload error: ", error);
      toast({ title: "Lỗi tải lên", description: "Không thể tải ảnh lên. Vui lòng thử lại.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photoURL: null }));
    toast({ title: "Đã gỡ ảnh", description: "Ảnh đại diện của bạn sẽ được gỡ sau khi lưu." });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    if (!formData.displayName.trim()) {
        toast({ title: "Tên không hợp lệ", description: "Tên hiển thị không được để trống.", variant: "destructive"});
        return;
    }

    setIsSubmitting(true);
    try {
      // Update displayName and photoURL in Auth
      await updateUserProfile({ 
        displayName: formData.displayName, 
        photoURL: formData.photoURL 
      });

      // Update bio in Firestore
      await setDoc(doc(db, "user-data", currentUser.uid), { 
        bio: formData.bio 
      }, { merge: true });
      
      toast({ title: "Đã lưu thay đổi" });
      onSuccess();
    } catch (error) {
      console.error("Profile update error: ", error);
      toast({ title: "Lỗi khi lưu", description: "Không thể cập nhật hồ sơ của bạn.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative cursor-pointer group">
              <Avatar className="h-24 w-24 border-4 border-background shadow-xl ring-2 ring-primary/20 transition group-hover:ring-primary">
                <AvatarImage src={formData.photoURL || undefined} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                  {getInitials(formData.displayName)}
                </AvatarFallback>
              </Avatar>
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white h-8 w-8" />
              </div>

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-full">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="center" className="w-56">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Tải ảnh mới lên
            </DropdownMenuItem>
            
            {formData.photoURL && (
              <DropdownMenuItem 
                onClick={handleRemovePhoto}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Gỡ ảnh hiện tại
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Thay đổi ảnh</p>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/jpeg,image/png,image/webp,image/gif" 
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">Tên của bạn</Label>
          <Input 
            id="displayName"
            value={formData.displayName} 
            onChange={e => setFormData(p => ({ ...p, displayName: e.target.value }))}
            placeholder="Ví dụ: Hoàng"
            disabled={isSubmitting || isUploading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Tiểu sử</Label>
          <Textarea 
            id="bio"
            value={formData.bio} 
            onChange={e => setFormData(p => ({ ...p, bio: e.target.value }))}
            placeholder="Một chút về bản thân..."
            className="resize-none h-24"
            disabled={isSubmitting || isUploading}
          />
        </div>
      </div>

      <Button type="submit" className="w-full font-bold" disabled={isSubmitting || isUploading}>
        {isSubmitting || isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Lưu thay đổi
      </Button>
    </form>
  );
}
