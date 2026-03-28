import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Tool, NewsArticle } from "@/lib/types";
import { cache } from "react";

export interface HomepageSettings {
  BannerAdsUrl?: string;
  BannerAdsAlt?: string;
  BannerRankUrl?: string;
  BannerRankAlt?: string;
  linkAff?: string;
}

export const getHomepageSettings = cache(async (): Promise<HomepageSettings> => {
  try {
    const settingsDocRef = doc(db, "settings", "homepage");
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as HomepageSettings;
    }
    return {};
  } catch (error) {
    console.error("Error fetching homepage settings:", error);
    return {};
  }
});

export const getLatestNews = cache(async (): Promise<NewsArticle[]> => {
  try {
    const newsCollection = collection(db, "news");
    const newsQuery = query(
      newsCollection,
      where("post", "==", true),
      orderBy("publishedAt", "desc"),
      limit(6)
    );
    const querySnapshot = await getDocs(newsQuery);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        publishedAt: data.publishedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as NewsArticle;
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
});

function serializeTool(id: string, data: any): Tool {
  return {
    id,
    ...data,
    releaseDate: data.releaseDate?.toDate?.()?.toISOString() || data.releaseDate || null,
    updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt || null,
  } as Tool;
}

export const getTopTools = cache(async (): Promise<Tool[]> => {
  try {
    const toolsQuery = query(
      collection(db, "tools"),
      where("post", "==", true),
      orderBy("averageRating", "desc"),
      orderBy("ratingCount", "desc"),
      orderBy("__name__"), // Fix Firestore pagination/sorting requirement if any
      limit(4)
    );

    const toolsSnapshot = await getDocs(toolsQuery);
    return toolsSnapshot.docs.map(doc => serializeTool(doc.id, doc.data()));
  } catch (error) {
    console.error("Error fetching top tools for homepage:", error);
    return [];
  }
});
