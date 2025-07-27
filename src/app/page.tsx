
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/tool-card";
import { NewsCard } from "@/components/news/news-card";
import { mockTools } from "@/lib/mock-tools";
import { mockNews } from "@/lib/mock-news";
import { AppLayout } from "@/components/layout/app-layout";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import type { Tool } from "@/lib/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";

const TYPING_TEXTS = [
  "KHÁM PHÁ THẾ GIỚI TRÍ TUỆ NHÂN TẠO AI",
  "CẬP NHẬT TIN TỨC VỀ TRÍ TUỆ NHÂN TẠO AI",
  "KHÁM PHÁ BẢNG XẾP HẠNG CÁC CÔNG CỤ AI",
  "KHÁM PHÁ BẢNG XẾP HẠNG MODEL AI",
];

export default function HomePage() {
  const latestNews = mockNews.slice(0, 6); // Fetch more for seamless scroll
  const [topTools, setTopTools] = useState<Tool[]>([]);
  const [isLoadingTools, setIsLoadingTools] = useState(true);

  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const typingSpeed = 5;
    const deletingSpeed = 50;
    const delay = 2000;

    const handleTyping = () => {
      const currentText = TYPING_TEXTS[textIndex];
      if (isDeleting) {
        if (charIndex > 0) {
          setDisplayedText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % TYPING_TEXTS.length);
        }
      } else {
        if (charIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    };

    const timeoutId = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, textIndex]);

  useEffect(() => {
    const fetchToolRatings = async () => {
      try {
        const toolsSnapshot = await getDocs(collection(db, "tools"));
        const toolRatings: { [id: string]: { totalStars: number; ratingCount: number } } = {};
        toolsSnapshot.forEach(doc => {
          const data = doc.data();
          toolRatings[doc.id] = { totalStars: data.totalStars || 0, ratingCount: data.ratingCount || 0 };
        });

        const initialTopTools = mockTools
          .sort((a, b) => (a.ranking ?? Infinity) - (b.ranking ?? Infinity))
          .slice(0, 4);

        const toolsWithRatings = initialTopTools.map(tool => ({
          ...tool,
          ...toolRatings[tool.id]
        }));
        
        setTopTools(toolsWithRatings);
      } catch (error) {
        console.error("Error fetching tool ratings for homepage:", error);
        // Fallback to mock data without ratings if Firestore fails
        setTopTools(mockTools
          .sort((a, b) => (a.ranking ?? Infinity) - (b.ranking ?? Infinity))
          .slice(0, 4));
      } finally {
        setIsLoadingTools(false);
      }
    };

    fetchToolRatings();
  }, []);


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
          <h1 className="text-4xl font-headline font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-relaxed h-32 md:h-48 lg:h-56">
            <span className="break-words">{displayedText}</span>
            <span className="animate-blink text-primary">|</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
            Khám phá, xếp hạng và cập nhật các công cụ AI mới nhất và tin tức tiên tiến. Clean AI Hub là người hướng dẫn đáng tin cậy của bạn trong bối cảnh trí tuệ nhân tạo không ngừng phát triển.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
              <Link href="/tools">Khám phá Công cụ AI</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-md transition-all duration-300 hover:scale-105">
              <Link href="/news">Tin tức AI Mới nhất</Link>
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
                topTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))
            )}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/tools">Xem tất cả Công cụ</Link>
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
          
           <div className="relative w-full overflow-hidden group">
            <div 
              className="flex animate-scroll-left group-hover:pause"
              style={{ 
                '--items-per-screen-xs': 1,
                '--items-per-screen-md': 2,
                '--items-per-screen-lg': 3,
              } as React.CSSProperties}
            >
              {/* Duplicated for seamless scroll */}
              {[...latestNews, ...latestNews].map((article, index) => (
                <div 
                  key={`${article.id}-${index}-carousel`} 
                  className="flex-none px-3 w-[calc(100%/var(--items-per-screen-xs,1))] md:w-[calc(100%/var(--items-per-screen-md,2))] lg:w-[calc(100%/var(--items-per-screen-lg,3))]"
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/news">Đọc thêm Tin tức</Link>
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
