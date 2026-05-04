
// src/components/layout/site-footer.tsx
import { Link } from "@/i18n/routing";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const ThreadsIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19.29 17.25c-1.05 1.39-2.73 2.33-4.63 2.58-3.23.42-6.24-1.37-7.39-4.38-.57-1.49-.6-3.08-.1-4.57.85-2.52 3.14-4.22 5.79-4.22 1.57 0 3.01.61 4.09 1.63.85.8 1.41 1.86 1.6 3.04.18 1.1-.01 2.21-.54 3.19-.54 1-1.42 1.76-2.48 2.14-.8.29-1.68.32-2.5.09-1.04-.3-1.87-1.04-2.28-2.03-.31-.76-.36-1.59-.15-2.39.27-1.05.95-1.93 1.89-2.43.7-.37 1.49-.53 2.28-.46 1.05.09 1.99.59 2.59 1.39.31.41.53.88.65 1.37" />
  </svg>
);

import { Logo } from "@/components/logo";
import { useTranslations } from "next-intl";

const quickLinks = [
  { href: "/", label: "home" },
  { href: "/cong-cu", label: "aiTools" },
  { href: "/bang-xep-hang", label: "rankings" },
  { href: "/tin-tuc", label: "newsAI" },
  { href: "/chatbot", label: "chatbot" },
];

const featuredTopics = [
  { href: "/chinh-sach-quyen-rieng-tu", label: "privacyPolicy" },
  { href: "/dieu-khoan-dich-vu", label: "termsOfService" },
  { href: "/dieu-khoan-su-dung-ai", label: "aiTerms" },
  { href: "/chinh-sach-cookie", label: "cookiePolicy" },
  { href: "/gioi-thieu", label: "about" },
  { href: "/lien-he", label: "contactUs" },
];

const socialMediaLinks = [
  { href: "https://www.facebook.com/4aivn", label: "Facebook", icon: Facebook },
  { href: "https://www.instagram.com/4aivn/", label: "Instagram", icon: Instagram },
  { href: "https://www.threads.com/@4aivn", label: "Threads", icon: ThreadsIcon },
  { href: "#", label: "YouTube", icon: Youtube },
];

export function SiteFooter() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
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
              {t("description")}
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
              {t("quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href as any}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
                  >
                    {tCommon(item.label as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-5">
              {t("information")}
            </h4>
            <ul className="space-y-3">
              {featuredTopics.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href as any}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
                  >
                    {t(item.label as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact */}
           <div>
            <h4 className="text-base font-semibold text-foreground mb-5">
              {t("contact")}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start">
                    <Mail className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary/80" />
                    <span>Email: 4aivn@gmail.com</span>
                </li>
                 <li className="flex items-start">
                    <Phone className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-primary/80" />
                    <span>{t("phone")}: 0973.490.497</span>
                </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border/60 text-center">
          <p className="text-sm text-muted-foreground">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
