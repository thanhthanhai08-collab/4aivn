// src/lib/contacts-action.ts
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    const dataToSave = {
      ...formData,
      userId: auth.currentUser?.uid ?? null,
      createdAt: serverTimestamp(),
      status: 'new', // Add a status for tracking
    };

    // Every submission is immutable and receives a random document ID.
    await addDoc(collection(db, 'contacts'), dataToSave);
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Không thể gửi tin nhắn. Vui lòng thử lại sau." };
  }
}
