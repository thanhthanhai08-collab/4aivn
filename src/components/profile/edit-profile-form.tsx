// src/components/profile/edit-profile-form.tsx
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  displayName: z.string().min(2, {
    message: "Tên hiển thị phải có ít nhất 2 ký tự.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditProfileFormProps {
  onSuccess: () => void; // Callback to close the dialog
}


export function EditProfileForm({ onSuccess }: EditProfileFormProps) {
  const { currentUser, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: currentUser?.displayName || "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      await updateUserProfile({ displayName: data.displayName });
      toast({
        title: "Cập nhật thành công",
        description: "Hồ sơ của bạn đã được cập nhật.",
      });
      onSuccess(); // Close the dialog on success
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Cập nhật thất bại",
        description: (error as Error).message || "Không thể cập nhật hồ sơ của bạn.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên hiển thị</FormLabel>
              <FormControl>
                <Input placeholder="Tên của bạn" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lưu thay đổi
        </Button>
      </form>
    </Form>
  );
}
