// src/lib/comments-actions.ts
'use server';

import { db } from "@/lib/firebase";
import type { User } from "@/lib/types";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

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
