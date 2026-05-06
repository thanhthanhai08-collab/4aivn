import { ToolDetailClient } from '@/components/tools/tool-detail-client';
import { getTool, getToolAdSettings, getToolRelatedData } from '@/lib/get-tool';
import { AppLayout } from '@/components/layout/app-layout';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

export default async function ToolDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const locale = resolvedParams.locale;
  
  const tool = await getTool(id, locale);

  if (!tool) {
    return (
      <AppLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy công cụ</h1>
          <p className="text-muted-foreground">Công cụ này có thể không tồn tại hoặc chưa được xuất bản.</p>
          <Button asChild variant="link" className="mt-4">
            <Link href="/cong-cu">Quay lại trang Công cụ</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const [adData, relatedData] = await Promise.all([
      getToolAdSettings(),
      getToolRelatedData(tool.id || '', tool.name, tool.context || '')
  ]);

  return (
    <ToolDetailClient 
      tool={tool} 
      adData={adData}
      relatedNews={relatedData.relatedNews}
      ranking={relatedData.ranking}
      complementaryTools={relatedData.complementaryTools}
      similarTools={relatedData.similarTools}
      featuredTools={relatedData.featuredTools}
      initialReviews={relatedData.allReviews}
    />
  );
}
