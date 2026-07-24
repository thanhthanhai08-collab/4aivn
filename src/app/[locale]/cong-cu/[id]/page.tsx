import { ToolDetailClient } from '@/components/tools/tool-detail-client';
import { getTool, getToolAdSettings, getToolRelatedData } from '@/lib/get-tool';
import { notFound } from 'next/navigation';

export default async function ToolDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const locale = resolvedParams.locale;
  
  const tool = await getTool(id, locale);

  if (!tool) {
    notFound();
  }

  const [adData, relatedData] = await Promise.all([
      getToolAdSettings(),
      getToolRelatedData(tool.id || '', tool.name, tool.contextKey || '', locale)
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
