import { cache } from 'react';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AIModel, NewsArticle, BenchmarkData } from '@/lib/types';

export const getModel = cache(async (id: string) => {
  if (!id || id.includes('.')) return null;

  try {
    const docRef = doc(db, 'models', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().post === true) {
      const data = docSnap.data();
      const releaseDateTimestamp = data.releaseDate as Timestamp;
      
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

      const model: any = {
          id: docSnap.id,
          ...data,
          releaseDate: releaseDateTimestamp ? releaseDateTimestamp.toDate().toLocaleDateString('vi-VN') : undefined,
          benchmarks: benchmarksData,
      };
      
      if (model.updatedAt?.toDate) model.updatedAt = model.updatedAt.toDate().toISOString();
      if (model.createdAt?.toDate) model.createdAt = model.createdAt.toDate().toISOString();
      
      return model as AIModel;
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

export const getRelatedNewsForModel = cache(async (modelName: string) => {
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
        return newsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            publishedAt: doc.data().publishedAt.toDate().toISOString(),
        } as NewsArticle));
    } catch (error) {
        console.error("Error fetching related news for model:", error);
        return [];
    }
});

export const getSameDeveloperModels = cache(async (developer: string, excludeId: string) => {
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
                const data = d.data();
                const m: any = { 
                    id: d.id, 
                    ...data,
                    releaseDate: (data.releaseDate as Timestamp)?.toDate?.()?.toLocaleDateString('vi-VN'),
                    rank: ranks.get(d.id)
                };
                if (m.updatedAt?.toDate) m.updatedAt = m.updatedAt.toDate().toISOString();
                if (m.createdAt?.toDate) m.createdAt = m.createdAt.toDate().toISOString();
                return m as AIModel;
            })
            .filter(m => m.id !== excludeId)
            .slice(0, 6);
    } catch (error) {
        console.error("Error fetching same dev models:", error);
        return [];
    }
});
