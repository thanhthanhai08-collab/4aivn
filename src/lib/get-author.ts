import { cache } from 'react';
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Author, NewsArticle } from '@/lib/types';
import { getLocalized } from './i18n-helpers';

function serializeArticle(id: string, data: any, locale: string = 'vi'): NewsArticle {
  const publishedAt = data.publishedAt?.toDate?.()?.toISOString() || data.publishedAt || new Date().toISOString();
  return {
    id,
    ...data,
    title: getLocalized(data.title, locale),
    content: getLocalized(data.content, locale),
    summary: getLocalized(data.summary, locale),
    author: getLocalized(data.author, locale),
    publishedAt,
    updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt || publishedAt,
  } as NewsArticle;
}

export const getAuthor = cache(async (id: string, locale: string = 'vi'): Promise<Author | null> => {
  if (!id || id.includes('.')) return null;

  try {
    const docRef = doc(db, 'authors', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: getLocalized(data.name, locale),
        bio: getLocalized(data.bio, locale),
        avatarUrl: data.avatarUrl || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching author ${id}:`, error);
    return null;
  }
});

export const getAuthorArticles = cache(async (authorId: string, locale: string = 'vi'): Promise<NewsArticle[]> => {
  try {
    // Current articles in Firestore have authorId field
    const articlesQuery = query(
      collection(db, "news"),
      where("post", "==", true),
      where("authorId", "==", authorId),
      orderBy("publishedAt", "desc")
    );
    
    const snapshot = await getDocs(articlesQuery);
    return snapshot.docs.map(doc => serializeArticle(doc.id, doc.data(), locale));
  } catch (error) {
    console.error(`Error fetching articles for author ${authorId}:`, error);
    return [];
  }
});
