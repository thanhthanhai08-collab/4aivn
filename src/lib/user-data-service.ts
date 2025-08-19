// src/lib/user-data-service.ts
'use server';

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, arrayUnion, arrayRemove, runTransaction, DocumentReference, DocumentData } from "firebase/firestore";

const USER_DATA_COLLECTION = "user-data";
const TOOLS_COLLECTION = "tools";
const MODELS_COLLECTION = "models";

// Updated to store both rating and review text for a tool
export interface UserToolRating {
    rating: number;
    text: string;
}

export interface UserProfileData {
    favoriteTools?: string[];
    bookmarkedNews?: string[];
    ratedTools?: Record<string, UserToolRating>; // Changed from number to UserToolRating
    ratedModels?: Record<string, number>;
    favoriteModels?: string[];
}

export interface AggregateRatingData {
    ratingCount: number;
    totalStars: number;
}

// Helper to get document references
const getUserDocRef = (uid: string) => doc(db, USER_DATA_COLLECTION, uid);
const getToolDocRef = (toolId: string) => doc(db, TOOLS_COLLECTION, toolId);
const getModelDocRef = (modelId: string) => doc(db, MODELS_COLLECTION, modelId);


// Get all profile data for a user
export async function getUserProfileData(uid: string): Promise<UserProfileData> {
    const docRef = getUserDocRef(uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as UserProfileData;
    }
    return {}; // Return empty object if no data exists
}

// Get aggregate rating data for a specific item (tool or model)
export async function getAggregateRating(collectionName: string, docId: string): Promise<AggregateRatingData> {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            ratingCount: data.ratingCount || 0,
            totalStars: data.totalStars || 0,
        };
    }
    return { ratingCount: 0, totalStars: 0 };
}


// Toggle favorite status for a tool
export async function toggleToolFavorite(uid: string, toolId: string, isCurrentlyFavorite: boolean) {
    const docRef = getUserDocRef(uid);
    await setDoc(docRef, { 
        favoriteTools: isCurrentlyFavorite ? arrayRemove(toolId) : arrayUnion(toolId) 
    }, { merge: true });
}

// Toggle favorite status for a model
export async function toggleModelFavorite(uid: string, modelId: string, isCurrentlyFavorite: boolean) {
    const docRef = getUserDocRef(uid);
    await setDoc(docRef, {
        favoriteModels: isCurrentlyFavorite ? arrayRemove(modelId) : arrayUnion(modelId)
    }, { merge: true });
}

// Toggle bookmark status for a news article
export async function toggleNewsBookmark(uid: string, newsId: string, isCurrentlyBookmarked: boolean) {
    const docRef = getUserDocRef(uid);
    await setDoc(docRef, {
        bookmarkedNews: isCurrentlyBookmarked ? arrayRemove(newsId) : arrayUnion(newsId)
    }, { merge: true });
}

// Set or update a rating for a tool, now includes review text
export async function setToolRating(uid: string, toolId: string, newRating: number, reviewText: string) {
    const userDocRef = getUserDocRef(uid);
    const toolDocRef = getToolDocRef(toolId);

    await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userDocRef);
        const toolDoc = await transaction.get(toolDocRef);

        const userData = userDoc.exists() ? userDoc.data() as UserProfileData : {};
        const oldRatingData = userData.ratedTools?.[toolId];
        const oldRating = oldRatingData?.rating || 0;

        const toolData = toolDoc.exists() ? toolDoc.data() : { ratingCount: 0, totalStars: 0 };
        let ratingCount = toolData.ratingCount || 0;
        let totalStars = toolData.totalStars || 0;

        if (oldRating === 0) { // New rating
            ratingCount += 1;
            totalStars += newRating;
        } else { // Updating existing rating
            totalStars = totalStars - oldRating + newRating;
        }

        // Update user's rating record with both rating and text
        transaction.set(userDocRef, {
            ratedTools: { 
                ...userData.ratedTools, 
                [toolId]: { rating: newRating, text: reviewText } 
            }
        }, { merge: true });

        // Update aggregate tool rating (only stars and count)
        transaction.set(toolDocRef, { ratingCount, totalStars }, { merge: true });
    });
}


// Set or update a rating for a model
export async function setModelRating(uid: string, modelId: string, newRating: number) {
    const userDocRef = getUserDocRef(uid);
    const modelDocRef = getModelDocRef(modelId);

    await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userDocRef);
        const modelDoc = await transaction.get(modelDocRef);

        const userData = userDoc.exists() ? userDoc.data() as UserProfileData : {};
        const oldRating = userData.ratedModels?.[modelId] || 0;

        const modelData = modelDoc.exists() ? modelDoc.data() : { ratingCount: 0, totalStars: 0 };
        let ratingCount = modelData.ratingCount || 0;
        let totalStars = modelData.totalStars || 0;

        if (oldRating === 0) { // New rating
            ratingCount += 1;
            totalStars += newRating;
        } else { // Updating existing rating
            totalStars = totalStars - oldRating + newRating;
        }
        
        // Update user's rating record
        transaction.set(userDocRef, {
            ratedModels: { ...userData.ratedModels, [modelId]: newRating }
        }, { merge: true });
        
        // Update aggregate model rating
        transaction.set(modelDocRef, { ratingCount, totalStars }, { merge: true });
    });
}
