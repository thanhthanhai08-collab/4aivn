"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/tool-card";
import { NewsCard } from "@/components/news/news-card";
import { AppLayout } from "@/components/layout/app-layout";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import type { Tool, NewsArticle } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { HomepageSettings } from "@/lib/get-home-data";

const TYPING_TEXTS = [
  "KHÁM PHÁ THẾ GIỚI TRÍ TUỆ NHÂN TẠO AI",
  "CẬP NHẬT TIN TỨC VỀ TRÍ TUỆ NHÂN TẠO AI",
  "KHÁM PHÁ BẢNG XẾP HẠNG CÁC CÔNG CỤ AI",
  "KHÁM PHÁ BẢNG XẾP HẠNG MODEL AI",
];

interface Props {
  latestNews: NewsArticle[];
  topTools: Tool[];
  homepageSettings: HomepageSettings;
}

export function HomeClient({ latestNews, topTools, homepageSettings }: Props) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef(false);
  const isInteractingRef = useRef(false);
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  useEffect(() => {
    const typingSpeed = 2;
    const delay = 2000;

    if (isPaused) {
        const timeoutId = setTimeout(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % TYPING_TEXTS.length);
            setCharIndex(0);
            setDisplayedText("");
            setIsPaused(false);
        }, delay);
        return () => clearTimeout(timeoutId);
    }

    const handleTyping = () => {
      const currentText = TYPING_TEXTS[textIndex];
      if (charIndex < currentText.length) {
        setDisplayedText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else {
        setIsPaused(true);
      }
    };

    const timeoutId = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [charIndex, textIndex, isPaused]);
  
  const startScrolling = () => {
    if (scrollIntervalRef.current) return;
    scrollIntervalRef.current = setInterval(() => {
      if (carouselRef.current && !isHoveringRef.current && !isInteractingRef.current) {
        const { scrollLeft, scrollWidth } = carouselRef.current;
        const totalContentWidth = scrollWidth / 2;
        
        if (scrollLeft >= totalContentWidth) {
            carouselRef.current.scrollLeft = scrollLeft - totalContentWidth;
        } else {
            carouselRef.current.scrollLeft += 1;
        }
      }
    }, 30); 
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startScrolling();
    return () => stopScrolling();
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AppLayout>
       {/* Hero Section */}
       <section className="relative pt-8 pb-20 md:pt-12 md:pb-32 bg-gradient-to-br from-violet-50 to-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            {/* Decorative background elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        <div className="container relative text-center flex flex-col justify-center min-h-[calc(100vh-var(--header-height)-10rem)] pt-16">
           <div className="flex flex-col justify-center items-center min-h-[220px] sm:min-h-[200px] w-full mb-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-extrabold tracking-tight text-foreground leading-tight sm:leading-snug md:leading-relaxed h-[160px] flex items-center justify-center mb-4 text-center">
                  <span className="break-words">{displayedText}</span>
                  <span className="animate-blink text-primary">|</span>
              </h1>
          </div>

            <p className="max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl">
              Khám phá bảng xếp hạng AI, cập nhật công cụ và tin tức AI mới nhất. 4aivn chia sẻ những gì thực sự hữu ích để bạn dùng AI hiệu quả hơn trong công việc hàng ngày.
            </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <Link href="/cong-cu">Khám phá công cụ AI</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-md transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <Link href="/tin-tuc">Tin tức AI mới nhất</Link>
            </Button>
          </div>
        </div>
      </section>
      
       {/* Affiliate Banner Section */}
      <section className="py-8 bg-background">
        <div className="container">
            {homepageSettings.BannerAdsUrl && (
              <Link 
                href={homepageSettings.linkAff || "#"} 
                target="_blank" 
                rel="noopener noreferrer sponsored" 
                className="relative block w-full aspect-[4/1] group overflow-hidden rounded-lg shadow-lg hover:shadow-primary/20 transition-all border"
              >
                <Image
                  src={homepageSettings.BannerAdsUrl} 
                  alt={homepageSettings.BannerAdsAlt || "Quảng cáo tài trợ"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 1200px" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-[10px] opacity-70 bg-white/50 backdrop-blur-sm">
                    Tài trợ
                  </Badge>
                </div>
              </Link>
            )}
        </div>
      </section>

      {/* AI Tool Ranking Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold text-center mb-2 text-foreground">
            Công cụ AI hàng đầu
          </h2>
          <p className="text-center text-muted-foreground mb-10">Danh sách tuyển chọn các công cụ AI phổ biến và có ảnh hưởng nhất.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} rank={index + 1} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/cong-cu">Xem tất cả công cụ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Informational Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          {/* Part 1: AI Assistance */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
            <div className="space-y-4">
              <h2 className="text-4xl font-headline font-bold text-foreground leading-tight">
                Giờ đây bạn có thể làm việc một cách <span className="text-primary">nhanh chóng</span> hơn, <span className="text-primary">tiện lợi</span> hơn với sự trợ giúp của AI.
              </h2>
              <p className="text-lg text-muted-foreground">
                AI giúp tự động hóa các tác vụ lặp đi lặp lại, phân tích dữ liệu phức tạp và cung cấp thông tin chi tiết để bạn đưa ra quyết định tốt hơn và tập trung vào những gì thực sự quan trọng.
              </p>
            </div>
            <div>
              <Image 
                src="/image/ai-tu-dong-hoa.webp" 
                alt="AI tự động hóa quy trình làm việc hiệu quả" 
                width={600} 
                height={450} 
                className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 mx-auto" 
              />
            </div>
          </div>

          {/* Part 2: AI Agent Accessibility */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 space-y-4">
              <h2 className="text-4xl font-headline font-bold text-foreground leading-tight">
                AI Agent sẽ trở nên ngày càng dễ <span className="text-primary">sử dụng</span> và <span className="text-primary">tiếp cận</span>.
              </h2>
              <p className="text-lg text-muted-foreground">
                AI Agent đang ngày càng dễ tiếp cận với người dùng không chuyên về lập trình và có khả năng sử dụng dữ liệu, tri thức cụ thể do người dùng cung cấp để hỗ trợ công việc một cách chính xác theo mong muốn.
              </p>
            </div>
            <div className="md:order-1">
              <Image 
                src="/image/ai-agent-de-tiep-can.webp" 
                alt="AI agent dễ tiếp cận và sử dụng" 
                width={600} 
                height={450} 
                className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 mx-auto" 
              />
            </div>
          </div>
        </div>
      </section>
      {/* END New Informational Section */}

      {/* AI News Feed Section - Carousel */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold text-center mb-2 text-foreground">
            Tin tức AI mới nhất
          </h2>
          <p className="text-center text-muted-foreground mb-10">Luôn cập nhật những tiến bộ và thảo luận mới nhất về AI.</p>
          
           <div 
              className="relative group"
              onMouseEnter={() => { isHoveringRef.current = true; }}
              onMouseLeave={() => { isHoveringRef.current = false; }}
            >
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide py-4 -mx-4 px-4"
              onTouchStart={(e) => {
                touchStartXRef.current = e.touches[0].clientX;
                touchStartYRef.current = e.touches[0].clientY;
                isHorizontalSwipeRef.current = null;
              }}
              onTouchMove={(e) => {
                if (isHorizontalSwipeRef.current === null) {
                  const deltaX = Math.abs(e.touches[0].clientX - touchStartXRef.current);
                  const deltaY = Math.abs(e.touches[0].clientY - touchStartYRef.current);
                  if (deltaX > 5 || deltaY > 5) {
                    isHorizontalSwipeRef.current = deltaX > deltaY;
                  }
                }
                if (isHorizontalSwipeRef.current === true) {
                  isInteractingRef.current = true;
                  stopScrolling();
                }
              }}
              onTouchEnd={() => {
                isInteractingRef.current = false;
                isHorizontalSwipeRef.current = null;
                startScrolling();
              }}
            >
              {[...latestNews, ...latestNews].map((article, index) => (
                <div 
                  key={`${article.id}-${index}`} 
                  className="flex-none px-3 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/3"
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
              onClick={() => scrollCarousel('left')}
              aria-label="Cuộn sang trái"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
              onClick={() => scrollCarousel('right')}
              aria-label="Cuộn sang phải"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

          </div>

          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/tin-tuc">Đọc thêm tin tức</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rankings Banner Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 h-[500px] flex flex-col shadow-2xl">
            {homepageSettings.BannerRankUrl && (
              <Image 
                src={homepageSettings.BannerRankUrl}
                alt={homepageSettings.BannerRankAlt || "Banner bảng xếp hạng"}
                fill
                className="object-cover object-top"
              />
            )}
            <div className="relative z-10 flex-grow flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <div className="text-3xl md:text-4xl font-bold text-white text-center">
                      <div className="mb-2">LỰA CHỌN CÁC</div>
                      <div>MODEL PHÙ HỢP</div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white text-center">
                      <div className="mb-2">THÔNG QUA</div>
                      <div>BẢNG XẾP HẠNG</div>
                  </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-gray-900 text-white hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Link href="/bang-xep-hang">Khám phá</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
