import { cache } from 'react';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { NewsArticle } from '@/lib/types';
import { getLocalized } from './i18n-helpers';

export const getArticle = cache(async (id: string, locale: string = 'vi') => {
  if (!id || id.includes('.')) return null;

  try {
    const docRef = doc(db, 'news', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().post === true) {
      const data = docSnap.data();
      const article = {
        id: docSnap.id,
        ...data,
        title: getLocalized(data.title, locale),
        content: getLocalized(data.content, locale),
        summary: getLocalized(data.summary, locale),
        slug: data.slug, // Keep raw slug for alternates
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

export const getArticleBySlug = cache(async (slug: string, locale: string = 'vi') => {
  if (!slug || slug.includes('.')) return null;

  try {
    // Try as document ID first (legacy)
    let articleDoc = await getDoc(doc(db, 'news', slug));

    // If not found, try querying by localized slug
    if (!articleDoc.exists() || articleDoc.data()?.post !== true) {
      const q = query(
        collection(db, 'news'),
        where(`slug.${locale}`, '==', slug),
        where('post', '==', true),
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        articleDoc = snapshot.docs[0];
      }
    }

    if (articleDoc.exists() && articleDoc.data()?.post === true) {
      const data = articleDoc.data();
      const article = {
        id: articleDoc.id,
        ...data,
        title: getLocalized(data.title, locale),
        content: getLocalized(data.content, locale),
        summary: getLocalized(data.summary, locale),
        slug: data.slug, // Keep raw slug for alternates
        publishedAt: data.publishedAt.toDate().toISOString(),
      } as NewsArticle;
      return article;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching article by slug ${slug}:`, error);
    return null;
  }
});

// A localized version for Latest News etc to also get correct string formats
export const getLatestNews = cache(async (excludeId: string, locale: string = 'vi') => {
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

export const getRelatedNews = cache(async (article: NewsArticle, locale: string = 'vi') => {
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
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          title: getLocalized(data.title, locale),
          content: getLocalized(data.content, locale),
          summary: getLocalized(data.summary, locale),
          publishedAt: data.publishedAt.toDate().toISOString(),
        } as NewsArticle;
      })
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
