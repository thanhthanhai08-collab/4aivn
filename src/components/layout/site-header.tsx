// src/components/layout/site-header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageSquare, Newspaper, ShieldCheck, LayoutGrid, X, Home, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/auth/user-nav";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/tools", label: "Công cụ AI", icon: LayoutGrid },
  { href: "/rankings", label: "Bảng xếp hạng", icon: TrendingUp },
  { href: "/news", label: "Tin tức AI", icon: Newspaper },
  { href: "/chat", label: "Chat Demo", icon: MessageSquare },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { currentUser, isLoading } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block text-lg">
            Clean AI Hub
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {isClient && !isLoading && (currentUser ? (
            <UserNav user={currentUser} />
          ) : (
            <Button asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
          ))}
          {isClient && isLoading && (
             <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div>
          )}


          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Mở/Đóng Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setIsSheetOpen(false)}>
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline sm:inline-block text-lg">
                  Clean AI Hub
                </span>
              </Link>
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                       onClick={() => setIsSheetOpen(false)}
                      className={cn(
                        "flex items-center space-x-2 p-2 rounded-md hover:bg-accent",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "text-foreground/70"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
