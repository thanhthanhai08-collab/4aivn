import type { Metadata, ResolvingMetadata } from "next";
import { getAuthor } from "@/lib/get-author";
import { ReactNode } from "react";
import { AppLayout } from "@/components/layout/app-layout";

type Props = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

const BASE_URL = "https://4aivn.com";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const authorId = resolvedParams.id;

  if (!authorId || authorId.includes('.')) {
    return { title: 'Tác giả không tìm thấy' };
  }

  const author = await getAuthor(authorId);

  if (!author) {
    return {
      title: 'Tác giả không tìm thấy | 4AIVN',
      description: 'Thông tin tác giả này không tồn tại hoặc đã bị xóa khỏi hệ thống.',
    };
  }

  const title = `Tác giả ${author.name} - Các bài viết AI mới nhất | 4AIVN`;
  const description = author.bio || `Khám phá các bài báo, bài viết AI chuyên sâu được thực hiện bởi chuyên gia ${author.name} trên 4AIVN.`;
  const imageUrl = author.avatarUrl || '/og-image.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/tac-gia/${authorId}`,
    },
    openGraph: {
      title,
      description,
      type: "profile",
      url: `${BASE_URL}/tac-gia/${authorId}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function AuthorDetailLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const authorId = resolvedParams.id;

  let author = null;
  let breadcrumbSchema = null;
  let personSchema = null;

  try {
    if (authorId && !authorId.includes('.')) {
      author = await getAuthor(authorId);
    }

    if (author) {
      // 1. Schema Breadcrumb chuẩn Google
      breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": author.name,
            "item": `${BASE_URL}/tac-gia/${authorId}`,
          },
        ],
      };

      // 2. Schema Person (Tác giả)
      personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": author.name,
        "url": `${BASE_URL}/tac-gia/${authorId}`,
        "image": author.avatarUrl,
        "description": author.bio,
        "jobTitle": "Author",
        "worksFor": {
          "@type": "Organization",
          "name": "4AIVN"
        }
      };
    }
  } catch (error) {
    console.error(`Error in AuthorDetailLayout for id: ${authorId}`, error);
  }

  return (
    <AppLayout>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
      {children}
    </AppLayout>
  );
}
