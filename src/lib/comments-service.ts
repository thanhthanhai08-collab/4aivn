// src/lib/comments-service.ts

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  type Unsubscribe,
  type DocumentData,
} from "firebase/firestore";
import type { Comment } from "./types";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const COMMENTS_COLLECTION = "comments";

// Get real-time comments for an article
export function getComments(articleId: string, callback: (comments: Comment[]) => void): Unsubscribe {
  const q = query(
    collection(db, COMMENTS_COLLECTION),
    where("articleId", "==", articleId)
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
    
    // Sort comments by creation date on the client-side, newest first.
    const sortedComments = comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    callback(sortedComments);
  }, 
  // Error callback for the listener
  async (serverError) => {
    console.error("Error fetching comments in real-time: ", serverError);
    const permissionError = new FirestorePermissionError({
      path: `/${COMMENTS_COLLECTION}`,
      operation: 'list',
      requestResourceData: { query: `articleId == ${articleId}` },
    });
    errorEmitter.emit('permission-error', permissionError);
  });

  return unsubscribe;
}
