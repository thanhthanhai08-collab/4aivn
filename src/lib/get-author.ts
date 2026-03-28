import { cache } from 'react';
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Author, NewsArticle } from '@/lib/types';

export const getAuthor = cache(async (id: string): Promise<Author | null> => {
  if (!id || id.includes('.')) return null;

  try {
    const docRef = doc(db, 'authors', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        bio: data.bio || '',
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

export const getAuthorArticles = cache(async (authorId: string): Promise<NewsArticle[]> => {
  try {
    // Current articles in Firestore have authorId field
    const articlesQuery = query(
      collection(db, "news"),
      where("post", "==", true),
      where("authorId", "==", authorId),
      orderBy("publishedAt", "desc")
    );
    
    const snapshot = await getDocs(articlesQuery);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        publishedAt: data.publishedAt?.toDate?.()?.toISOString() || data.publishedAt || new Date().toISOString(),
      } as NewsArticle;
    });
  } catch (error) {
    console.error(`Error fetching articles for author ${authorId}:`, error);
    return [];
  }
});
