// src/lib/user-data-service.ts
'use server';

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, arrayUnion, arrayRemove, runTransaction, DocumentData, collection, getDocs, query, where, increment } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import type { Tool, AIModel, NewsArticle, ToolReview, UserProfileData } from "./types";

const USER_DATA_COLLECTION = "user-data";
const TOOLS_COLLECTION = "tools";
const MODELS_COLLECTION = "models";

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

// Get all reviews for a specific tool from all users.
export async function getAllToolReviews(toolId: string): Promise<ToolReview[]> {
    const reviews: ToolReview[] = [];
    try {
        const usersSnapshot = await getDocs(collection(db, USER_DATA_COLLECTION));

        usersSnapshot.forEach(docSnap => {
            const userData = docSnap.data() as UserProfileData;
            if (userData.ratedTools && userData.ratedTools[toolId]) {
                const reviewData = userData.ratedTools[toolId];
                if(reviewData.text && reviewData.text.trim() !== '') { // Only show reviews with text
                    reviews.push({
                        userId: docSnap.id,
                        userName: userData.displayName || "Người dùng ẩn danh",
                        userPhotoURL: userData.photoURL || null,
                        rating: reviewData.rating,
                        text: reviewData.text
                    });
                }
            }
        });
    } catch (error) {
        console.error("Error fetching all tool reviews:", error);
    }
    return reviews;
}

// Get aggregate rating data for a specific item (tool or model)
export async function getAggregateRating(collectionName: string, docId: string): Promise<{ ratingCount: number; totalStars: number, viewCount: number }> {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            ratingCount: data.ratingCount || 0,
            totalStars: data.totalStars || 0,
            viewCount: data.viewCount || 0,
        };
    }
    return { ratingCount: 0, totalStars: 0, viewCount: 0 };
}


// Toggle favorite status for a tool
export async function toggleToolFavorite(uid: string, toolId: string, isCurrentlyFavorite: boolean) {
    const docRef = getUserDocRef(uid);
    const payload = { favoriteTools: isCurrentlyFavorite ? arrayRemove(toolId) : arrayUnion(toolId) };
    await setDoc(docRef, payload, { merge: true })
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: payload,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    });
}

// Toggle favorite status for a model
export async function toggleModelFavorite(uid: string, modelId: string, isCurrentlyFavorite: boolean) {
    const docRef = getUserDocRef(uid);
    const payload = { favoriteModels: isCurrentlyFavorite ? arrayRemove(modelId) : arrayUnion(modelId) };
    await setDoc(docRef, payload, { merge: true })
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: payload,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    });
}

// Toggle bookmark status for a news article
export async function toggleNewsBookmark(uid: string, newsId: string, isCurrentlyBookmarked: boolean) {
    const docRef = getUserDocRef(uid);
    const payload = { bookmarkedNews: isCurrentlyBookmarked ? arrayRemove(newsId) : arrayUnion(newsId) };
    await setDoc(docRef, payload, { merge: true })
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: payload,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    });
}

// Set or update a rating for a tool, now includes review text
export async function setToolRating(uid: string, toolId: string, newRating: number, reviewText: string, displayName: string | null, photoURL: string | null) {
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

        const userUpdatePayload = {
            displayName: displayName || "Người dùng ẩn danh",
            photoURL: photoURL,
            ratedTools: { 
                ...userData.ratedTools, 
                [toolId]: { rating: newRating, text: reviewText } 
            }
        };
        transaction.set(userDocRef, userUpdatePayload, { merge: true });
        
        const toolUpdatePayload = { ratingCount, totalStars };
        transaction.set(toolDocRef, toolUpdatePayload, { merge: true });
    }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: `Transaction failed for docs: ${userDocRef.path}, ${toolDocRef.path}`,
            operation: 'update',
            requestResourceData: { 
                userUpdate: `ratedTools.${toolId}`, 
                toolUpdate: '{ratingCount, totalStars}'
            },
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
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
        
        transaction.set(userDocRef, {
            ratedModels: { ...userData.ratedModels, [modelId]: newRating }
        }, { merge: true });
        
        transaction.set(modelDocRef, { ratingCount, totalStars }, { merge: true });
    }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: `Transaction failed for docs: ${userDocRef.path}, ${modelDocRef.path}`,
            operation: 'update',
            requestResourceData: {
                userUpdate: `ratedModels.${modelId}`,
                modelUpdate: '{ratingCount, totalStars}'
            },
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    });
}

// New function to increment view count for a tool
export async function incrementToolViewCount(toolId: string) {
    const toolDocRef = getToolDocRef(toolId);
    const payload = { viewCount: increment(1) };
    await setDoc(toolDocRef, payload, { merge: true })
    .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: toolDocRef.path,
            operation: 'update',
            requestResourceData: payload,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    });
}
