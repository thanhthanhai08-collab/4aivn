import { AppLayout } from "@/components/layout/app-layout";
import { ToolsPageClient } from "@/components/tools/tools-page-client";
import { getAllTools } from "@/lib/get-tool";

interface ToolsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ search_query?: string; category?: string }>;
}

export default async function ToolsPage({ params, searchParams }: ToolsPageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const tools = await getAllTools(locale);

  return (
    <AppLayout>
      <main className="container py-8 md:py-12">
        <header className="mb-8 text-center md:mb-12">
          <h1 className="text-4xl font-headline font-bold text-foreground">
            {locale === "en" ? "AI Tools Collection" : "Tổng hợp các công cụ AI"}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {locale === "en"
              ? "Discover and compare a wide range of AI tools."
              : "Khám phá và so sánh một loạt các công cụ AI."}
          </p>
        </header>

        <ToolsPageClient
          tools={tools}
          initialSearchTerm={query.search_query ?? ""}
          initialCategory={query.category ?? "all"}
        />
      </main>
    </AppLayout>
  );
}
