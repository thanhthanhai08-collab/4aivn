
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/tool-card";
import { NewsCard } from "@/components/news/news-card";
import { mockTools } from "@/lib/mock-tools";
import { mockLovableTool } from "@/lib/mock-tools2";
import { mockNews } from "@/lib/mock-news";
import { mockNews2 } from "@/lib/mock-news2";
import { AppLayout } from "@/components/layout/app-layout";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState, useRef } from "react";
import type { Tool, NewsArticle } from "@/lib/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TYPING_TEXTS = [
  "KHÁM PHÁ THẾ GIỚI TRÍ TUỆ NHÂN TẠO AI",
  "CẬP NHẬT TIN TỨC VỀ TRÍ TUỆ NHÂN TẠO AI",
  "KHÁM PHÁ BẢNG XẾP HẠNG CÁC CÔNG CỤ AI",
  "KHÁM PHÁ BẢNG XẾP HẠNG MODEL AI",
];

const combinedMockTools = [...mockTools, ...mockLovableTool];
const allMockNews = [...mockNews, ...mockNews2].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());


export default function HomePage() {
  const latestNews = allMockNews.slice(0, 6); // Fetch more for seamless scroll
  const [topTools, setTopTools] = useState<Tool[]>([]);
  const [isLoadingTools, setIsLoadingTools] = useState(true);

  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef(false);

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
      if (carouselRef.current && !isHoveringRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const totalContentWidth = scrollWidth / 2;
        
        if (scrollLeft >= totalContentWidth) {
            carouselRef.current.scrollLeft = scrollLeft - totalContentWidth;
        } else {
            carouselRef.current.scrollLeft += 1;
        }
      }
    }, 15); 
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


  useEffect(() => {
    const fetchToolRatings = async () => {
      try {
        const toolsSnapshot = await getDocs(collection(db, "tools"));
        const toolRatings: { [id: string]: { totalStars: number; ratingCount: number } } = {};
        toolsSnapshot.forEach(doc => {
          const data = doc.data();
          toolRatings[doc.id] = { totalStars: data.totalStars || 0, ratingCount: data.ratingCount || 0 };
        });

        const toolsWithRatings = combinedMockTools.map(tool => ({
          ...tool,
          ...toolRatings[tool.id]
        }));
        
        const sortedTopTools = toolsWithRatings.sort((a, b) => {
          const ratingA = a.ratingCount && a.ratingCount > 0 ? (a.totalStars || 0) / a.ratingCount : -1;
          const ratingB = b.ratingCount && b.ratingCount > 0 ? (b.totalStars || 0) / b.ratingCount : -1;

          if (ratingB !== ratingA) return ratingB - ratingA;
          
          const countA = a.ratingCount ?? 0;
          const countB = b.ratingCount ?? 0;
          if (countB !== countA) return countB - countA;
          
          return a.name.localeCompare(b.name);
        }).slice(0, 4);
        
        setTopTools(sortedTopTools);

      } catch (error) {
        console.error("Error fetching tool ratings for homepage:", error);
        // Fallback to initial mockTools order if Firestore fails
        setTopTools(combinedMockTools.slice(0, 4));
      } finally {
        setIsLoadingTools(false);
      }
    };

    fetchToolRatings();
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
       <section className="relative py-20 md:py-32 bg-gradient-to-br from-violet-50 to-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            {/* Decorative background elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        <div className="container relative text-center">
          <div className="flex flex-col justify-center items-center min-h-[280px] sm:min-h-[260px]">
             <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-foreground leading-tight sm:leading-snug md:leading-relaxed h-[160px] flex items-center justify-center mb-4">
              <span className="break-words">{displayedText}</span>
              <span className="animate-blink text-primary">|</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl">
              Khám phá, xếp hạng và cập nhật các công cụ AI mới nhất và tin tức tiên tiến. Clean AI Hub là người hướng dẫn đáng tin cậy của bạn trong bối cảnh trí tuệ nhân tạo không ngừng phát triển.
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <Link href="/cong-cu">Khám phá Công cụ AI</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-md transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <Link href="/tin-tuc">Tin tức AI Mới nhất</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Placeholder for Airtable-like visual if desired */}
      <section className="py-12 md:py-16 hidden"> 
        <div className="container">
          <Image src="https://placehold.co/1200x600.png" alt="Airtable-like interface preview" width={1200} height={600} className="rounded-lg shadow-2xl mx-auto" data-ai-hint="dashboard interface" />
        </div>
      </section>


      {/* AI Tool Ranking Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold text-center mb-2 text-foreground">
            Công cụ AI Hàng đầu
          </h2>
          <p className="text-center text-muted-foreground mb-10">Danh sách tuyển chọn các công cụ AI phổ biến và có ảnh hưởng nhất.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingTools ? (
                [...Array(4)].map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-lg" />)
            ) : (
                topTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} rank={index + 1} />
                ))
            )}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/cong-cu">Xem tất cả Công cụ</Link>
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
                src="/image/AI_tu_dong_hoa.png" 
                alt="AI tự động hóa quy trình làm việc hiệu quả" 
                width={600} 
                height={450} 
                className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 mx-auto" 
                data-ai-hint="AI automation workflow" 
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
                src="/image/AI_Agent_de_tiep_can.png" 
                alt="AI agent dễ tiếp cận và sử dụng" 
                width={600} 
                height={450} 
                className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 mx-auto" 
                data-ai-hint="AI accessibility user friendly" 
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
            Tin tức AI Mới nhất
          </h2>
          <p className="text-center text-muted-foreground mb-10">Luôn cập nhật những tiến bộ và thảo luận mới nhất về AI.</p>
          
           <div 
              className="relative group"
              onMouseEnter={() => { isHoveringRef.current = true; }}
              onMouseLeave={() => { isHoveringRef.current = false; }}
            >
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto scroll-smooth scrollbar-hide py-4 -mx-4 px-4 touch-pan-y"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => scrollCarousel('left')}
              aria-label="Cuộn sang trái"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => scrollCarousel('right')}
              aria-label="Cuộn sang phải"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

          </div>

          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/tin-tuc">Đọc thêm Tin tức</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rankings Banner Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="relative rounded-2xl overflow-hidden bg-gray-800 p-8 md:p-12">
            <Image 
              src="https://picsum.photos/1200/400"
              alt="Bàn cờ vua với các quân cờ được xếp hạng"
              fill
              className="object-cover opacity-20"
              data-ai-hint="strategy chess"
            />
            <div className="relative text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                    Lựa chọn các Model phù hợp
                  </h2>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                    Thông qua Bảng xếp hạng
                  </h2>
                </div>
                <div className="flex-shrink-0 text-center md:text-right">
                  <Button 
                    size="lg" 
                    asChild 
                    className="bg-gray-900 text-white hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
                  >
                    <Link href="/bang-xep-hang">Khám phá</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
