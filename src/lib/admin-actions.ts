import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ADMIN_COLLECTIONS = new Set(['tools', 'models', 'news']);

function assertAdminCollection(collectionName: string) {
    if (!ADMIN_COLLECTIONS.has(collectionName)) {
        throw new Error('Hạng mục quản trị không hợp lệ.');
    }
}

export async function togglePostStatus(collectionName: string, docId: string, currentStatus: boolean) {
    assertAdminCollection(collectionName);
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, { post: !currentStatus });

    } catch (error) {
        console.error("Failed to toggle post status:", error);
        throw new Error("Không thể cập nhật trạng thái.");
    }
}

export async function addOrUpdateItem(collectionName: string, data: any, itemId?: string) {
    assertAdminCollection(collectionName);
    try {
        // Create a mutable copy to avoid modifying the original form data
        const dataToSave = { ...data };

        if (itemId) {
            // This is an UPDATE operation
            const docRef = doc(db, collectionName, itemId);
            
            // 1. Remove the 'id' field if it exists
            if (dataToSave.id) {
                delete dataToSave.id;
            }

            // 2. Convert 'publishedAt' string back to a Date object for Firestore
            if (collectionName === 'news' && dataToSave.publishedAt && typeof dataToSave.publishedAt === 'string') {
                dataToSave.publishedAt = new Date(dataToSave.publishedAt);
            }
            
            await updateDoc(docRef, dataToSave);
        } else {
            // This is a CREATE operation
            const payload: any = {
                ...dataToSave,
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

    } catch (error) {
        console.error(`Failed to save item in ${collectionName}:`, error);
        throw new Error("Không thể lưu mục này.");
    }
}
