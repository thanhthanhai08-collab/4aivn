// src/components/layout/site-footer.tsx
import Link from "next/link";
import { ShieldCheck, Facebook, Twitter, Linkedin } from "lucide-react";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/tools", label: "Công cụ AI" },
  { href: "/rankings", label: "Bảng xếp hạng" },
  { href: "/news", label: "Tin tức AI" },
];

const legalItems = [
  { href: "#", label: "Điều khoản dịch vụ" },
  { href: "#", label: "Chính sách bảo mật" },
  { href: "#", label: "Liên hệ" },
];

const socialLinks = [
  { href: "#", label: "Facebook", icon: Facebook },
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "LinkedIn", icon: Linkedin },
];

export function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border/60 py-12 md:py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & Social */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <span className="font-bold font-headline text-xl text-foreground">
                Clean AI Hub
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Người hướng dẫn đáng tin cậy của bạn trong bối cảnh trí tuệ nhân tạo không ngừng phát triển.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Điều hướng
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Pháp lý
            </h4>
            <ul className="space-y-3">
              {legalItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Placeholder / Could be Newsletter in future */}
           <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Về Chúng Tôi
            </h4>
            <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Câu chuyện</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Đội ngũ</Link></li>
                 <li><Link href="/chat" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Chat Demo</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border/60 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Clean AI Hub. Mọi quyền được bảo lưu. Xây dựng bằng Next.js và Firebase.
          </p>
        </div>
      </div>
    </footer>
  );
}
