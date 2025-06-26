
// src/contexts/auth-context.tsx
"use client";

import type { User } from "@/lib/types";
import React, { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import { mockUser } from "@/lib/mock-data";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>; // Added
  logout: () => Promise<void>;
  updateUserProfile: (data: { displayName: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth state on mount
    const storedUser = localStorage.getItem("cleanAIUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userToLogin = {...mockUser, displayName: "Google User", email: "googleuser@example.com"};
    setCurrentUser(userToLogin);
    localStorage.setItem("cleanAIUser", JSON.stringify(userToLogin));
    setIsLoading(false);
  };
  
  const loginWithEmail = async (email: string, _pass: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // For demo, allow login if email exists in a mock "registered" list or is the mockUser's email
    // This is highly simplified for mock purposes.
    const userToLogin = {...mockUser, email, displayName: email.split('@')[0] || "Người dùng Email"};
    setCurrentUser(userToLogin);
    localStorage.setItem("cleanAIUser", JSON.stringify(userToLogin));
    setIsLoading(false);
  };

  const registerWithEmail = async (email: string, _pass: string) => {
    setIsLoading(true);
    // Simulate API call for registration
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, you'd create the user here and a backend would send a confirmation email.
    // For this mock, we'll just simulate success.
    // We won't actually log the user in or store them persistently for loginWithEmail to find yet,
    // as that complicates the mock without a backend.
    // The user will be redirected to login and can use the "mock" login.
    console.log(`Mock registration for email: ${email}`);
    setIsLoading(false);
    // Throw an error for specific email to test error handling
    if (email === "error@example.com") {
      throw new Error("Địa chỉ email này đã được sử dụng.");
    }
    // Simulate success
  };

  const updateUserProfile = async (data: { displayName: string }) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    if (currentUser) {
      const updatedUser = { ...currentUser, displayName: data.displayName };
      setCurrentUser(updatedUser);
      localStorage.setItem("cleanAIUser", JSON.stringify(updatedUser));
    } else {
      setIsLoading(false);
      throw new Error("Không tìm thấy người dùng để cập nhật.");
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentUser(null);
    // Keep user ratings even after logout
    // localStorage.removeItem("cleanAIUser");
    localStorage.removeItem("cleanAIUser");
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, loginWithGoogle, loginWithEmail, registerWithEmail, logout, updateUserProfile }}>
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
