
import { ModelDetailClient } from '@/components/models/model-detail-client';
import { getModel, getRelatedNewsForModel, getSameDeveloperModels } from '@/lib/get-model';
import { notFound } from 'next/navigation';

export default async function ModelDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const locale = resolvedParams.locale;

  const model = await getModel(id, locale);

  if (!model) {
    notFound();
  }

  const relatedNews = await getRelatedNewsForModel(model.name, locale);
  const sameDeveloperModels = await getSameDeveloperModels(model.developer, model.id || '', locale);

  return <ModelDetailClient model={model} relatedNews={relatedNews} sameDeveloperModels={sameDeveloperModels} />;
}
