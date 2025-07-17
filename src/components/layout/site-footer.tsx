
// src/components/layout/site-footer.tsx
import Link from "next/link";
import { ShieldCheck, Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/tools", label: "Công cụ AI" },
  { href: "/rankings", label: "Bảng xếp hạng" },
  { href: "/news", label: "Tin tức AI" },
  { href: "/chat", label: "Chat Demo" },
];

const featuredTopics = [
  { href: "/privacy-policy", label: "Chính sách quyền riêng tư" },
  { href: "/terms-of-service", label: "Điều khoản dịch vụ" },
  { href: "/ai-terms-of-use", label: "Điều khoản sử dụng AI" },
  { href: "/cookie-policy", label: "Chính sách Cookies" },
];

const socialMediaLinks = [
  { href: "#", label: "Facebook", icon: Facebook },
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "LinkedIn", icon: Linkedin },
  { href: "#", label: "YouTube", icon: Youtube },
];

export function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border/60 py-12 md:py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 mb-3">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <span className="font-bold font-headline text-xl text-primary">
                Clean AI Hub
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nguồn thông tin hàng đầu của bạn về những đột phá, xu hướng và phân tích chuyên sâu trong lĩnh vực Trí Tuệ Nhân Tạo.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialMediaLinks.map((item) => (
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

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-5">
              Liên Kết Nhanh
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
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

          {/* Column 3: Information */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-5">
              Thông tin
            </h4>
            <ul className="space-y-3">
              {featuredTopics.map((item) => (
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
          
          {/* Column 4: Contact */}
           <div>
            <h4 className="text-base font-semibold text-foreground mb-5">
              Liên Hệ
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start">
                    <Mail className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary/80" />
                    <span>Email: CleanAIhub@gmail.com</span>
                </li>
                 <li className="flex items-start">
                    <Phone className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary/80" />
                    <span>Điện thoại: 0973.490.497</span>
                </li>
                 <li className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary/80" />
                    <span>Địa chỉ: Làng Vàng Cổ Bi, Xã Gia Lâm, TP. Hà Nội</span>
                </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border/60 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Clean AI Hub. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
