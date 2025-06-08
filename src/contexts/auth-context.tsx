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
  logout: () => Promise<void>;
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
    const userToLogin = {...mockUser, displayName: "Google User"};
    setCurrentUser(userToLogin);
    localStorage.setItem("cleanAIUser", JSON.stringify(userToLogin));
    setIsLoading(false);
  };
  
  const loginWithEmail = async (email: string, _pass: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const userToLogin = {...mockUser, email, displayName: email.split('@')[0]};
    setCurrentUser(userToLogin);
    localStorage.setItem("cleanAIUser", JSON.stringify(userToLogin));
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentUser(null);
    localStorage.removeItem("cleanAIUser");
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, loginWithGoogle, loginWithEmail, logout }}>
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
