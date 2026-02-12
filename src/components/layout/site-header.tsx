
// src/components/layout/site-header.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, MessageSquare, Newspaper, X, Home, TrendingUp, Search as SearchIcon, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/auth/user-nav";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState, type FormEvent } from "react";
import { Logo } from "@/components/logo";

const navItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/cong-cu", label: "Công cụ AI", icon: LayoutGrid },
  { href: "/bang-xep-hang", label: "Bảng xếp hạng", icon: TrendingUp },
  { href: "/tin-tuc", label: "Tin tức AI", icon: Newspaper },
  { href: "/chatbot", label: "Chatbot", icon: MessageSquare },
];

interface SiteHeaderProps {
  hideSearch?: boolean;
}

export function SiteHeader({ hideSearch = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isLoading } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // Clear search term after navigation
      if (isSheetOpen) setIsSheetOpen(false); // Close sheet on mobile after search
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-6 w-6" />
          <span className="font-bold font-headline sm:inline-block text-lg">
            4AIVN
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80 font-medium",
                pathname === item.href ? "text-primary font-semibold" : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          {/* Desktop Search */}
          {!hideSearch && (
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
              <Input 
                type="search" 
                placeholder="Tìm kiếm..." 
                className="h-9 pr-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9 text-muted-foreground">
                <SearchIcon className="h-4 w-4" />
                <span className="sr-only">Tìm kiếm</span>
              </Button>
            </form>
          )}

          {isClient && !isLoading && (currentUser ? (
            <UserNav user={currentUser} />
          ) : (
            <Button asChild size="sm">
              <Link href="/dang-nhap">Đăng nhập</Link>
            </Button>
          ))}
          {isClient && isLoading && (
             <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div> // Skeleton for login button
          )}

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Mở/Đóng Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="pr-0" 
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
               <SheetHeader>
                <SheetTitle className="sr-only">Menu chính</SheetTitle>
              </SheetHeader>
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setIsSheetOpen(false)}>
                <Logo className="h-6 w-6" />
                <span className="font-bold font-headline sm:inline-block text-lg">
                  4AIVN
                </span>
              </Link>
              
              {/* Mobile Search */}
              {!hideSearch && (
                <form onSubmit={handleSearchSubmit} className="mb-4 px-2">
                  <div className="relative">
                    <Input 
                      type="search" 
                      placeholder="Tìm kiếm..." 
                      className="h-10 pr-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-10 w-10 text-muted-foreground">
                      <SearchIcon className="h-5 w-5" />
                      <span className="sr-only">Tìm kiếm</span>
                    </Button>
                  </div>
                </form>
              )}

              <div className="flex flex-col space-y-3 px-2">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                       onClick={() => setIsSheetOpen(false)}
                      className={cn(
                        "flex items-center space-x-2 p-2 rounded-md hover:bg-accent font-medium",
                        pathname === item.href ? "bg-accent text-primary font-semibold" : "text-foreground/70"
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
