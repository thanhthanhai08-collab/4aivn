import { getAuthor, getAuthorArticles } from "@/lib/get-author";
import { AuthorDetailClient } from "@/components/news/author-detail-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const authorId = resolvedParams.id;

  const author = await getAuthor(authorId);

  if (!author) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">Tác giả không tìm thấy</h1>
        <p className="text-muted-foreground">Tác giả này có thể không tồn tại hoặc đã bị xóa.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/tin-tuc">Quay lại trang Tin tức</Link>
        </Button>
      </div>
    );
  }

  const initialArticles = await getAuthorArticles(authorId);

  return <AuthorDetailClient author={author} initialArticles={initialArticles} />;
}
