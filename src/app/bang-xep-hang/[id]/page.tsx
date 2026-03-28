
import { ModelDetailClient } from '@/components/models/model-detail-client';
import { getModel, getRelatedNewsForModel, getSameDeveloperModels } from '@/lib/get-model';
import { AppLayout } from '@/components/layout/app-layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const model = await getModel(id);

  if (!model) {
    return (
      <AppLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy model AI</h1>
          <p className="text-muted-foreground">Model này có thể không tồn tại hoặc chưa được xuất bản.</p>
          <Button asChild variant="link" className="mt-4">
            <Link href="/bang-xep-hang">Quay lại Bảng xếp hạng</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const relatedNews = await getRelatedNewsForModel(model.name);
  const sameDeveloperModels = await getSameDeveloperModels(model.developer, model.id || '');

  return <ModelDetailClient model={model} relatedNews={relatedNews} sameDeveloperModels={sameDeveloperModels} />;
}
