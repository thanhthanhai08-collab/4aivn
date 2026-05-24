// src/components/auth/user-nav.tsx
"use client";

import { Link } from "@/i18n/routing";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import type { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface UserNavProps {
  user: User;
}

export function UserNav({ user }: UserNavProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === "en";

  const handleLogout = async () => {
    await logout();
    router.push("/"); 
  };
  
  const getInitials = (email: string | null | undefined) => {
    if (!email) return "?";
    return email.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 ring-2 ring-primary/50">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || (isEn ? "User" : "Người dùng")} />
            <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName || (isEn ? "User" : "Người dùng")}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/ho-so" className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>{isEn ? "Edit Profile" : "Chỉnh sửa hồ sơ"}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isEn ? "Log out" : "Đăng xuất"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
