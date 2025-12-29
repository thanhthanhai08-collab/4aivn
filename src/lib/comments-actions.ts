// src/lib/comments-actions.ts
'use server';

import { db } from "@/lib/firebase";
import type { User } from "@/lib/types";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const NEWS_COLLECTION = "news";

// Add a new comment to an article's sub-collection
export async function addComment(articleId: string, user: User, text: string): Promise<void> {
  if (!user) {
    throw new Error("User must be logged in to comment.");
  }
  if (!text.trim()) {
    throw new Error("Comment cannot be empty.");
  }

  // Reference the 'comments' sub-collection within a specific news article
  const commentsCollectionRef = collection(db, NEWS_COLLECTION, articleId, "comments");
  
  const payload = {
    articleId: articleId, // Keep for potential denormalization or cross-collection queries if needed
    userId: user.uid,
    userName: user.displayName,
    userPhotoURL: user.photoURL,
    text: text,
    createdAt: serverTimestamp(),
  };

  try {
    await addDoc(commentsCollectionRef, payload);
  } catch (serverError) {
    const permissionError = new FirestorePermissionError({
      path: commentsCollectionRef.path,
      operation: 'create',
      requestResourceData: payload,
    });
    errorEmitter.emit('permission-error', permissionError);
    // We re-throw the original error so the client-side catch block can handle UI updates.
    throw serverError;
  }
}
