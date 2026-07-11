import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Tool, NewsArticle, ToolReview } from '@/lib/types';
import { getAllToolReviews } from '@/lib/user-data-service';
import { getLocalized, getLocalizedArray } from './i18n-helpers';

function serializeTool(id: string, data: any, locale: string = 'vi'): Tool {
    const tool: any = { id, ...data };
    // contextKey: always the Vietnamese value (for Firestore queries)
    tool.contextKey = getLocalized(data.context, 'vi');
    // context: localized for display
    tool.context = getLocalized(data.context, locale);
    tool.description = getLocalized(data.description, locale);
    tool.longDescription = getLocalized(data.longDescription, locale);
    tool.features = getLocalizedArray(data.features, locale);
    tool.pricingPlans = getLocalizedArray(data.pricingPlans, locale);
    tool.useCases = getLocalizedArray(data.useCases, locale);
    tool.whoIsItFor = getLocalizedArray(data.whoIsItFor, locale);
    tool.faq = data.faq?.map((item: any) => ({
        question: getLocalized(item.question, locale),
        answer: getLocalized(item.answer, locale),
    }));
    if (tool.updatedAt?.toDate) tool.updatedAt = tool.updatedAt.toDate().toISOString();
    if (tool.createdAt?.toDate) tool.createdAt = tool.createdAt.toDate().toISOString();
    return tool as Tool;
}

const getAllToolsCached = unstable_cache(
    async (locale: string = 'vi'): Promise<Tool[]> => {
        try {
            const toolsQuery = query(
                collection(db, 'tools'),
                where('post', '==', true),
                orderBy('averageRating', 'desc'),
                orderBy('ratingCount', 'desc'),
                orderBy('__name__')
            );
            const snapshot = await getDocs(toolsQuery);
            return snapshot.docs.map((item) => serializeTool(item.id, item.data(), locale));
        } catch (error) {
            console.error('Error fetching tools:', error);
            return [];
        }
    },
    ['all-tools'],
    { revalidate: 1, tags: ['tools'] }
);

/** Ranked, localized and serializable tools for server-rendered list pages. */
export const getAllTools = cache(getAllToolsCached);

function serializeNewsArticle(id: string, data: any, locale: string = 'vi'): NewsArticle {
    return {
        id,
        ...data,
        title: getLocalized(data.title, locale),
        content: getLocalized(data.content, locale),
        summary: getLocalized(data.summary, locale),
        author: getLocalized(data.author, locale),
        publishedAt: data.publishedAt?.toDate?.()?.toISOString() || data.publishedAt || new Date().toISOString(),
    } as NewsArticle;
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

export const getToolRelatedData = cache(async (toolId: string, toolName: string, toolContext: string, locale: string = 'vi') => {
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
            where("context.vi", "==", toolContext),
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
        const relatedNews = newsSnapshot.docs.map(d => serializeNewsArticle(d.id, d.data(), locale));

        // Ranking
        const sortedTools = allToolsForRankingSnapshot.docs.map(d => serializeTool(d.id, d.data()));
        const currentRank = sortedTools.findIndex(t => t.id === toolId);
        const ranking = currentRank !== -1 ? currentRank + 1 : null;
        
        // Complementary Tools
        const allToolsForCategories = allToolsSnapshot.docs.map(d => serializeTool(d.id, d.data(), 'vi'));
        const uniqueCategories = Array.from(new Set(allToolsForCategories.map(t => t.contextKey).filter(Boolean))).sort();
        const otherCategories = uniqueCategories.filter(cat => cat !== toolContext);
        // Randomly pick 3 categories.
        const selectedCategories = [...otherCategories].sort(() => 0.5 - Math.random()).slice(0, 3);
        const complementaryPromises = selectedCategories.map(cat => {
            const q = query(
                collection(db, "tools"),
                where("post", "==", true),
                where("context.vi", "==", cat),
                limit(1)
            );
            return getDocs(q);
        });
        const complementarySnapshots = await Promise.all(complementaryPromises);
        const complementaryTools = complementarySnapshots.map(snap => {
            if (!snap.empty) {
                return serializeTool(snap.docs[0].id, snap.docs[0].data(), locale);
            }
            return null;
        }).filter((t): t is Tool => t !== null);

        // Similar Tools
        const similarTools = similarToolsSnapshot.docs
            .map(d => serializeTool(d.id, d.data(), locale))
            .filter(t => t.id !== toolId)
            .slice(0, 4);
        
        // Featured Tools
        const featuredTools = featuredToolsSnapshot.docs
            .map(d => serializeTool(d.id, d.data(), locale))
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
