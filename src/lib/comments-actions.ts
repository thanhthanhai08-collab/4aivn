// src/lib/comments-actions.ts
'use server';

import { db } from "@/lib/firebase";
import type { User } from "@/lib/types";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const COMMENTS_COLLECTION = "comments";

// Add a new comment to an article
export async function addComment(articleId: string, user: User, text: string): Promise<void> {
  if (!user) {
    throw new Error("User must be logged in to comment.");
  }
  if (!text.trim()) {
    throw new Error("Comment cannot be empty.");
  }

  const commentsCollectionRef = collection(db, COMMENTS_COLLECTION);
  const payload = {
    articleId: articleId,
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
