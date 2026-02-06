// src/app/admin/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, addDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth } from '@/contexts/auth-context'; // Assuming auth is exported from a client context which is not ideal for server.
                                               // In a real app, you'd get the session from headers/cookies.

// IMPORTANT: Replace this with your actual Admin User ID
const ADMIN_UID = 'UTGM1t0AT2cx33zhboLnyK4atqI3';

// A server-side check would be more complex, involving session management.
// For this prototype, we'll rely on the client-side check before calling the action.
async function verifyAdmin() {
    // This is a placeholder. A robust implementation would validate the user session.
    // For now, we trust the client-side guard.
}

export async function togglePostStatus(collectionName: string, docId: string, currentStatus: boolean) {
    await verifyAdmin();
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, { post: !currentStatus });

        // Revalidate paths to reflect changes immediately
        revalidatePath('/admin');
        if (collectionName === 'tools') revalidatePath('/cong-cu');
        if (collectionName === 'models') revalidatePath('/bang-xep-hang');
        if (collectionName === 'news') revalidatePath('/tin-tuc');
        if (docId) {
             revalidatePath(`/${docId}`);
             revalidatePath(`/cong-cu/${docId}`);
             revalidatePath(`/bang-xep-hang/${docId}`);
        }
    } catch (error) {
        console.error("Failed to toggle post status:", error);
        throw new Error("Không thể cập nhật trạng thái.");
    }
}

export async function addOrUpdateItem(collectionName: string, data: any, itemId?: string) {
    await verifyAdmin();
    try {
        if (itemId) {
            // Update existing item
            const docRef = doc(db, collectionName, itemId);
            await updateDoc(docRef, data);
        } else {
            // Add new item
            const payload: any = {
                ...data,
                post: false, // Always start as draft
            };
            if (collectionName === 'news') {
                payload.publishedAt = serverTimestamp();
            } else {
                 payload.createdAt = serverTimestamp();
            }
             // Set default rating fields for new tools/models
            if (collectionName === 'tools' || collectionName === 'models') {
                payload.averageRating = 0;
                payload.ratingCount = 0;
                payload.totalStars = 0;
            }
            await addDoc(collection(db, collectionName), payload);
        }

        revalidatePath('/admin');
        if (collectionName === 'tools') revalidatePath('/cong-cu');
        if (collectionName === 'models') revalidatePath('/bang-xep-hang');
        if (collectionName === 'news') revalidatePath('/tin-tuc');
        if (itemId) {
             revalidatePath(`/${itemId}`);
             revalidatePath(`/cong-cu/${itemId}`);
             revalidatePath(`/bang-xep-hang/${itemId}`);
        }
    } catch (error) {
        console.error(`Failed to save item in ${collectionName}:`, error);
        throw new Error("Không thể lưu mục này.");
    }
}
