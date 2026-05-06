import { cache } from 'react';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Tool, NewsArticle, ToolReview } from '@/lib/types';
import { getAllToolReviews } from '@/lib/user-data-service';
import { getLocalized } from './i18n-helpers';

function serializeTool(id: string, data: any, locale: string = 'vi'): Tool {
    const tool: any = { id, ...data };
    tool.description = getLocalized(data.description, locale);
    if (tool.updatedAt?.toDate) tool.updatedAt = tool.updatedAt.toDate().toISOString();
    if (tool.createdAt?.toDate) tool.createdAt = tool.createdAt.toDate().toISOString();
    return tool as Tool;
}

export const getTool = cache(async (id: string, locale: string = 'vi') => {
  if (!id || id.includes('.')) return null;

  try {
    const docRef = doc(db, 'tools', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().post === true) {
      return serializeTool(docSnap.id, docSnap.data(), locale);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching tool ${id}:`, error);
    return null;
  }
});

export const getToolAdSettings = cache(async () => {
    try {
        const adDocRef = doc(db, "settings", "cong-cu");
        const adSnap = await getDoc(adDocRef);
        if (adSnap.exists()) {
            return {
                linkAff: adSnap.data().linkAff || "",
                bannerAdsUrl: adSnap.data().bannerAdsUrl || ""
            };
        }
        return null;
    } catch (error) {
        console.error("Lỗi lấy dữ liệu quảng cáo:", error);
        return null;
    }
});

export const getToolRelatedData = cache(async (toolId: string, toolName: string, toolContext: string) => {
    try {
        // --- News Query ---
        const newsRef = collection(db, "news");
        const newsQuery = query(
            newsRef,
            where("post", "==", true),
            where("tag", "array-contains", toolName),
            orderBy("publishedAt", "desc"),
            orderBy("__name__", "desc"),
            limit(4)
        );
        
        // --- Other Queries ---
        const allToolsForRankingQuery = query(
            collection(db, "tools"),
            where("post", "==", true),
            orderBy("averageRating", "desc"),
            orderBy("ratingCount", "desc"),
            orderBy("__name__")
        );
        const featuredToolsQuery = query(
            collection(db, "tools"),
            where("post", "==", true),
            orderBy("viewCount", "desc"), 
            orderBy("__name__", "asc"),   
            limit(4)                      
        );
        const similarToolsQuery = query(
            collection(db, "tools"),
            where("post", "==", true),
            where("context", "==", toolContext),
            orderBy("__name__", "asc"),
            limit(5)
        );
        
        // --- Fetching Data ---
        const [
            newsSnapshot,
            allToolsForRankingSnapshot,
            featuredToolsSnapshot,
            similarToolsSnapshot,
            allReviewsData,
            allToolsSnapshot,
        ] = await Promise.all([
            getDocs(newsQuery),
            getDocs(allToolsForRankingQuery),
            getDocs(featuredToolsQuery),
            getDocs(similarToolsQuery),
            getAllToolReviews(toolId),
            getDocs(query(collection(db, "tools"), where("post", "==", true)))
        ]);

        // --- Processing Data ---

        // Related News
        const relatedNews = newsSnapshot.docs.map(d => {
            const data = d.data();
            return {
                id: d.id,
                ...data,
                publishedAt: (data.publishedAt as Timestamp).toDate().toISOString()
            } as NewsArticle
        });

        // Ranking
        const sortedTools = allToolsForRankingSnapshot.docs.map(d => serializeTool(d.id, d.data()));
        const currentRank = sortedTools.findIndex(t => t.id === toolId);
        const ranking = currentRank !== -1 ? currentRank + 1 : null;
        
        // Complementary Tools
        const allTools = allToolsSnapshot.docs.map(d => serializeTool(d.id, d.data()));
        const uniqueCategories = Array.from(new Set(allTools.map(t => t.context).filter(Boolean))).sort();
        const otherCategories = uniqueCategories.filter(cat => cat !== toolContext);
        // Randomly pick 3 categories.
        const selectedCategories = [...otherCategories].sort(() => 0.5 - Math.random()).slice(0, 3);
        const complementaryPromises = selectedCategories.map(cat => {
            const q = query(
                collection(db, "tools"),
                where("post", "==", true),
                where("context", "==", cat),
                limit(1)
            );
            return getDocs(q);
        });
        const complementarySnapshots = await Promise.all(complementaryPromises);
        const complementaryTools = complementarySnapshots.map(snap => {
            if (!snap.empty) {
                return serializeTool(snap.docs[0].id, snap.docs[0].data());
            }
            return null;
        }).filter((t): t is Tool => t !== null);

        // Similar Tools
        const similarTools = similarToolsSnapshot.docs
            .map(d => serializeTool(d.id, d.data()))
            .filter(t => t.id !== toolId)
            .slice(0, 4);
        
        // Featured Tools
        const featuredTools = featuredToolsSnapshot.docs
            .map(d => serializeTool(d.id, d.data()))
            .filter(t => t.id !== toolId)
            .slice(0, 3);
        
        // Reviews
        const allReviews = allReviewsData;

        return {
            relatedNews,
            ranking,
            complementaryTools,
            similarTools,
            featuredTools,
            allReviews
        };
    } catch (error) {
        console.error("Error fetching related data for tool:", error);
        return {
            relatedNews: [],
            ranking: null,
            complementaryTools: [],
            similarTools: [],
            featuredTools: [],
            allReviews: []
        };
    }
});
