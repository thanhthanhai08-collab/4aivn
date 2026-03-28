import { cache } from 'react';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { NewsArticle } from '@/lib/types';

export const getArticle = cache(async (id: string) => {
  if (!id || id.includes('.')) return null;

  try {
    const docRef = doc(db, 'news', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().post === true) {
      const data = docSnap.data();
      const article = {
        id: docSnap.id,
        ...data,
        publishedAt: data.publishedAt.toDate().toISOString(),
      } as NewsArticle;
      
      return article;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    return null;
  }
});

export const getLatestNews = cache(async (excludeId: string) => {
  try {
    const latestNewsQuery = query(
      collection(db, "news"),
      where("post", "==", true),
      orderBy("publishedAt", "desc"),
      limit(4)
    );
    const latestSnapshot = await getDocs(latestNewsQuery);
    return latestSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishedAt: doc.data().publishedAt.toDate().toISOString(),
      } as NewsArticle))
      .filter(item => item.id !== excludeId)
      .slice(0, 3);
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
});

export const getRelatedNews = cache(async (article: NewsArticle) => {
  try {
    const excludeId = article.id;
    let relatedQuery;
    
    if (article.tag && article.tag.length > 0) {
      relatedQuery = query(
        collection(db, "news"),
        where("post", "==", true),
        where("tag", "array-contains-any", article.tag),
        orderBy("publishedAt", "desc"),
        limit(5)
      );
    } else {
      relatedQuery = query(
        collection(db, "news"),
        where("post", "==", true),
        orderBy("publishedAt", "desc"),
        limit(5)
      );
    }

    const relatedSnapshot = await getDocs(relatedQuery);
    return relatedSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishedAt: doc.data().publishedAt.toDate().toISOString(),
      } as NewsArticle))
      .filter(item => item.id !== excludeId)
      .sort((a, b) => {
        const calculateScore = (art: NewsArticle) => {
          let score = 0;
          if (!art.tag || !article.tag) return 0;

          if (art.tag.includes(article.tag[0])) score += 3;
          if (article.tag[1] && art.tag.includes(article.tag[1])) score += 2;

          return score;
        };

        const scoreA = calculateScore(a);
        const scoreB = calculateScore(b);

        if (scoreB !== scoreA) {
            return scoreB - scoreA;
        }

        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      })
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching related news:", error);
    return [];
  }
});
