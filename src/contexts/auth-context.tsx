// src/contexts/auth-context.tsx
"use client";

import type { User as FirebaseUser } from "firebase/auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import type { User, UserProfileData } from "@/lib/types";
import { auth, db } from "@/lib/firebase";
import React, { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import { FirebaseError } from "firebase/app";
import { onSnapshot, doc, setDoc } from "firebase/firestore";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string, photoURL?: string | null, bio?: string }) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: () => void = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Unsubscribe from previous profile listener
      unsubscribeProfile();

      if (user) {
        // Set up a real-time listener for the user's profile data in Firestore
        const userDocRef = doc(db, "user-data", user.uid);
        unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          const profileData = docSnap.data() as UserProfileData | undefined;
          
          // Combine Auth data with Firestore data
          const formattedUser: User = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            // Prioritize data from Firestore, then Auth, then null
            displayName: profileData?.displayName || user.displayName,
            photoURL: profileData?.photoURL !== undefined ? profileData.photoURL : user.photoURL,
            // Add bio from firestore
            bio: profileData?.bio,
          };
          setCurrentUser(formattedUser);
          setIsLoading(false);
        }, (error) => {
            console.error("Error listening to user profile:", error);
            // If listener fails, fallback to just auth data
            const fallbackUser: User = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
            };
            setCurrentUser(fallbackUser);
            setIsLoading(false);
        });
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProfile();
    };
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  
  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await sendEmailVerification(userCredential.user);
  };

  const updateUserProfile = async (data: { displayName?: string, photoURL?: string | null, bio?: string }) => {
    const authUser = auth.currentUser;
    if (!authUser) {
      throw new Error("Không tìm thấy người dùng để cập nhật.");
    }
    
    // Prepare payloads
    const authUpdatePayload: { displayName?: string; photoURL?: string | null } = {};
    const firestoreUpdatePayload: { displayName?: string; photoURL?: string | null; bio?: string } = {};

    if (data.displayName !== undefined) {
      authUpdatePayload.displayName = data.displayName;
      firestoreUpdatePayload.displayName = data.displayName;
    }
    if (data.photoURL !== undefined) {
      authUpdatePayload.photoURL = data.photoURL;
      firestoreUpdatePayload.photoURL = data.photoURL;
    }
    if (data.bio !== undefined) {
      firestoreUpdatePayload.bio = data.bio;
    }

    // Update Firestore first as the source of truth
    const userDocRef = doc(db, "user-data", authUser.uid);
    await setDoc(userDocRef, firestoreUpdatePayload, { merge: true });

    // Then, update Firebase Auth profile for consistency
    if (Object.keys(authUpdatePayload).length > 0) {
        await updateProfile(authUser, authUpdatePayload);
    }
    
    // The onSnapshot listener will automatically update the currentUser state in the context.
  };
  
  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, loginWithGoogle, loginWithEmail, registerWithEmail, logout, updateUserProfile, sendPasswordReset }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
