// src/lib/comments-service.ts

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  type Unsubscribe,
  type DocumentData,
  orderBy,
} from "firebase/firestore";
import type { Comment } from "./types";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const NEWS_COLLECTION = "news";

// Get real-time comments for an article from its sub-collection
export function getComments(articleId: string, callback: (comments: Comment[]) => void): Unsubscribe {
  // Query the 'comments' sub-collection within the specific news article document
  const commentsColRef = collection(db, NEWS_COLLECTION, articleId, "comments");
  const q = query(
    commentsColRef,
    orderBy("createdAt", "desc") // Order by creation date, newest first
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const comments: Comment[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      comments.push({
        id: doc.id,
        articleId: data.articleId,
        userId: data.userId,
        userName: data.userName,
        userPhotoURL: data.userPhotoURL,
        text: data.text,
        createdAt: data.createdAt?.toDate() || new Date(), // Convert Firestore Timestamp to Date
      });
    });
    
    // The sorting is now handled by the Firestore query itself.
    callback(comments);
  }, 
  // Error callback for the listener
  async (serverError) => {
    console.error("Error fetching comments in real-time: ", serverError);
    const permissionError = new FirestorePermissionError({
      path: `/${NEWS_COLLECTION}/${articleId}/comments`,
      operation: 'list',
      requestResourceData: { query: `orderBy('createdAt', 'desc')` },
    });
    errorEmitter.emit('permission-error', permissionError);
  });

  return unsubscribe;
}
