
// src/components/layout/site-footer.tsx
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";

const quickLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/cong-cu", label: "Công cụ AI" },
  { href: "/bang-xep-hang", label: "Bảng xếp hạng" },
  { href: "/tin-tuc", label: "Tin tức AI" },
  { href: "/chatbot", label: "Chatbot" },
];

const featuredTopics = [
  { href: "/chinh-sach-quyen-rieng-tu", label: "Chính sách quyền riêng tư" },
  { href: "/dieu-khoan-dich-vu", label: "Điều khoản dịch vụ" },
  { href: "/dieu-khoan-su-dung-ai", label: "Điều khoản sử dụng AI" },
  { href: "/chinh-sach-cookie", label: "Chính sách Cookies" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/lien-he", label: "Liên hệ" },
];

const socialMediaLinks = [
  { href: "https://www.facebook.com/4aivn", label: "Facebook", icon: Facebook },
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
              <Logo className="h-7 w-7" />
              <span className="font-bold font-headline text-xl text-primary">
                4AIVN
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nguồn thông tin hàng đầu của bạn về những đột phá, xu hướng và phân tích chuyên sâu trong lĩnh vực trí tuệ nhân tạo.
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
              Liên kết nhanh
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
              Liên hệ
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start">
                    <Mail className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary/80" />
                    <span>Email: 4aivn@gmail.com</span>
                </li>
                 <li className="flex items-start">
                    <Phone className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary/80" />
                    <span>Điện thoại: 0973.490.497</span>
                </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border/60 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} 4AIVN. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
