// src/lib/user-data-service.ts
'use server';

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const USER_DATA_COLLECTION = "user-data";

export interface UserProfileData {
    favoriteTools?: string[];
    bookmarkedNews?: string[];
    ratedTools?: Record<string, number>;
    ratedModels?: Record<string, number>;
    favoriteModels?: string[];
}

// Helper to get user data document reference
const getUserDocRef = (uid: string) => doc(db, USER_DATA_COLLECTION, uid);

// Get all profile data for a user
export async function getUserProfileData(uid: string): Promise<UserProfileData> {
    const docRef = getUserDocRef(uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as UserProfileData;
    }
    return {}; // Return empty object if no data exists
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

// Set or update a rating for a tool
export async function setToolRating(uid: string, toolId: string, rating: number) {
    const docRef = getUserDocRef(uid);
    await setDoc(docRef, {
        ratedTools: {
            [toolId]: rating
        }
    }, { merge: true });
}

// Set or update a rating for a model
export async function setModelRating(uid: string, modelId: string, rating: number) {
    const docRef = getUserDocRef(uid);
    await setDoc(docRef, {
        ratedModels: {
            [modelId]: rating
        }
    }, { merge: true });
}
