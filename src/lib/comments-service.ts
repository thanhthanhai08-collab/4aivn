// src/lib/comments-service.ts
'use server';

import { db } from "@/lib/firebase";
import type { User } from "@/lib/types";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
  type DocumentData,
} from "firebase/firestore";
import type { Comment } from "./types";

const COMMENTS_COLLECTION = "comments";

// Add a new comment to an article
export async function addComment(articleId: string, user: User, text: string): Promise<void> {
  if (!user) {
    throw new Error("User must be logged in to comment.");
  }
  if (!text.trim()) {
    throw new Error("Comment cannot be empty.");
  }

  await addDoc(collection(db, COMMENTS_COLLECTION), {
    articleId: articleId,
    userId: user.uid,
    userName: user.displayName,
    userPhotoURL: user.photoURL,
    text: text,
    createdAt: serverTimestamp(),
  });
}

// Get real-time comments for an article
export function getComments(articleId: string, callback: (comments: Comment[]) => void): Unsubscribe {
  const q = query(
    collection(db, COMMENTS_COLLECTION),
    where("articleId", "==", articleId),
    orderBy("createdAt", "desc")
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
    callback(comments);
  });

  return unsubscribe;
}
