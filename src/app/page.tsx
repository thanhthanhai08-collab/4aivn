// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/tool-card";
import { NewsCard } from "@/components/news/news-card";
import { mockTools, mockNews } from "@/lib/mock-data";
import { AppLayout } from "@/components/layout/app-layout";
import Image from "next/image";

export default function HomePage() {
  const topTools = mockTools.sort((a, b) => (a.ranking ?? Infinity) - (b.ranking ?? Infinity)).slice(0, 4); // Show top 4 for homepage
  const latestNews = mockNews.slice(0, 3); // Show latest 3 news

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-accent to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            {/* Decorative background elements */}
            <span className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl animate-pulse"></span>
            <span className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></span>
        </div>
        <div className="container relative text-center">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Điều hướng Thế giới AI
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
            Khám phá, xếp hạng và cập nhật các công cụ AI mới nhất và tin tức tiên tiến. Clean AI Hub là người hướng dẫn đáng tin cậy của bạn trong bối cảnh trí tuệ nhân tạo không ngừng phát triển.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-shadow">
              <Link href="/tools">Khám phá Công cụ AI</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-md transition-shadow">
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
            {topTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/tools">Xem tất cả Công cụ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI News Feed Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold text-center mb-2 text-foreground">
            Tin tức AI Mới nhất
          </h2>
          <p className="text-center text-muted-foreground mb-10">Luôn cập nhật những tiến bộ và thảo luận mới nhất về AI.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/news">Đọc thêm Tin tức</Link>
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
