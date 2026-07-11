import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AIModel, NewsArticle, BenchmarkData } from '@/lib/types';
import { getLocalized } from './i18n-helpers';

function serializeNewsArticle(id: string, data: any, locale: string = 'vi'): NewsArticle {
    return {
        id,
        ...data,
        title: getLocalized(data.title, locale),
        content: getLocalized(data.content, locale),
        summary: getLocalized(data.summary, locale),
        publishedAt: data.publishedAt?.toDate?.()?.toISOString() || data.publishedAt || new Date().toISOString(),
    } as NewsArticle;
}

function serializeModel(id: string, data: any, locale: string = 'vi', rank?: number): AIModel {
    const releaseDateTimestamp = data.releaseDate as Timestamp | undefined;
    const model: any = {
        id,
        ...data,
        description: getLocalized(data.description, locale),
        releaseDate: releaseDateTimestamp?.toDate?.()
            ? releaseDateTimestamp.toDate().toLocaleDateString(locale === 'en' ? 'en-US' : 'vi-VN')
            : data.releaseDate,
        rank,
    };

    if (model.updatedAt?.toDate) model.updatedAt = model.updatedAt.toDate().toISOString();
    if (model.createdAt?.toDate) model.createdAt = model.createdAt.toDate().toISOString();

    return model as AIModel;
}

const getAllModelsCached = unstable_cache(
    async (locale: string = 'vi'): Promise<AIModel[]> => {
        try {
            const modelsQuery = query(
                collection(db, 'models'),
                where('post', '==', true),
                orderBy('intelligenceScore', 'desc'),
                orderBy('contextLengthToken', 'desc'),
                orderBy('pricePerMillionTokens', 'asc'),
                orderBy('latencyFirstChunkSeconds', 'asc'),
                orderBy('speedTokensPerSecond', 'desc')
            );
            const snapshot = await getDocs(modelsQuery);
            return snapshot.docs.map((item, index) =>
                serializeModel(item.id, item.data(), locale, index + 1)
            );
        } catch (error) {
            console.error('Error fetching models:', error);
            return [];
        }
    },
    ['all-models'],
    { revalidate: 1, tags: ['models'] }
);

/** Ranked, localized and serializable models for server-rendered list pages. */
export const getAllModels = cache(getAllModelsCached);

export const getModel = cache(async (id: string, locale: string = 'vi') => {
  if (!id || id.includes('.')) return null;

  try {
    const docRef = doc(db, 'models', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().post === true) {
      const data = docSnap.data();
      
      const benchmarksColRef = collection(db, "models", id, "benchmarks");
      const benchmarksSnapshot = await getDocs(benchmarksColRef);
      const benchmarksData = benchmarksSnapshot.docs.map(doc => {
          const docData = doc.data();
          const score = typeof docData.score === 'string' ? parseFloat(docData.score) : docData.score;
          return {
              name: docData.name,
              score: isNaN(score) ? 0 : score,
          } as BenchmarkData;
      });

      return {
          ...serializeModel(docSnap.id, data, locale),
          benchmarks: benchmarksData,
      } as AIModel;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching model ${id}:`, error);
    return null;
  }
});

export const getAllModelsRanked = cache(async () => {
    try {
        const modelsQuery = query(
          collection(db, "models"),
          where("post", "==", true),
          orderBy("intelligenceScore", "desc"),
          orderBy("contextLengthToken", "desc"),
          orderBy("pricePerMillionTokens", "asc"),
          orderBy("latencyFirstChunkSeconds", "asc"),
          orderBy("speedTokensPerSecond", "desc")
        );
        const snapshot = await getDocs(modelsQuery);
        const ranks = new Map<string, number>();
        snapshot.docs.forEach((doc, index) => {
            ranks.set(doc.id, index + 1);
        });
        return ranks;
    } catch(e) {
        console.error("Error fetching model ranks:", e);
        return new Map<string, number>();
    }
});

export const getRelatedNewsForModel = cache(async (modelName: string, locale: string = 'vi') => {
    if (!modelName) return [];
    try {
        const newsQuery = query(
            collection(db, "news"),
            where("post", "==", true),
            where('tag', 'array-contains', modelName),
            orderBy("publishedAt", "desc"),
            limit(3)
        );
        const newsSnapshot = await getDocs(newsQuery);
        return newsSnapshot.docs.map(doc => serializeNewsArticle(doc.id, doc.data(), locale));
    } catch (error) {
        console.error("Error fetching related news for model:", error);
        return [];
    }
});

export const getSameDeveloperModels = cache(async (developer: string, excludeId: string, locale: string = 'vi') => {
    if (!developer) return [];
    try {
        const sameDevQuery = query(
            collection(db, "models"),
            where('developer', '==', developer),
            where('post', '==', true),
            limit(7)
        );
        const devSnap = await getDocs(sameDevQuery);
        const ranks = await getAllModelsRanked();
        
        return devSnap.docs
            .map(d => {
                return serializeModel(d.id, d.data(), locale, ranks.get(d.id));
            })
            .filter(m => m.id !== excludeId)
            .slice(0, 6);
    } catch (error) {
        console.error("Error fetching same dev models:", error);
        return [];
    }
});
