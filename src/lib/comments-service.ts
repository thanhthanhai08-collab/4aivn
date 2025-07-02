// src/lib/comments-service.ts

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  type Unsubscribe,
  type DocumentData,
} from "firebase/firestore";
import type { Comment } from "./types";

const COMMENTS_COLLECTION = "comments";

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
