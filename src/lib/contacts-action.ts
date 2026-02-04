// src/lib/contacts-action.ts
'use server';

import { db } from "@/lib/firebase";
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(formData: ContactFormData, userId?: string) {
  try {
    const dataToSave = {
      ...formData,
      createdAt: serverTimestamp(),
      status: 'new', // Add a status for tracking
    };

    if (userId) {
      // Logged-in user: use their UID as the document ID
      const contactDocRef = doc(db, 'contacts', userId);
      await setDoc(contactDocRef, dataToSave, { merge: true }); // Use merge to not overwrite other submissions if needed
    } else {
      // Guest user: create a new document with an auto-generated ID
      await addDoc(collection(db, 'contacts'), dataToSave);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Không thể gửi tin nhắn. Vui lòng thử lại sau." };
  }
}
