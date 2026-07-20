import { AppLayout } from "@/components/layout/app-layout";
import { RankingsPageClient } from "@/components/rankings/rankings-page-client";
import { getAllModels } from "@/lib/get-model";
import { getAllTools } from "@/lib/get-tool";

export const dynamic = "force-dynamic";

export default async function RankingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [models, tools] = await Promise.all([getAllModels(locale), getAllTools(locale)]);

  return (
    <AppLayout>
      <main className="container py-8 md:py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold text-foreground">
            {locale === "en" ? "AI Rankings" : "Bảng xếp hạng AI"}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {locale === "en"
              ? "Compare top AI tools and models based on performance and community ratings."
              : "So sánh các công cụ và mô hình AI hàng đầu dựa trên hiệu suất và đánh giá của cộng đồng."}
          </p>
        </header>
        <RankingsPageClient models={models} tools={tools} />
      </main>
    </AppLayout>
  );
}
