"use client";

import { createContext, useContext, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

type AuthError = { code?: string; message?: string; status: number; statusText?: string } | null;

interface AuthContextType {
  user: { id: string; email: string; name: string; image?: string | null } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: AuthError }>;
  signUp: (email: string, password: string, businessName: string) => Promise<{ error?: AuthError }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;

  const signIn = async (email: string, password: string) => {
    const { error } = await authClient.signIn.email({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, businessName: string) => {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: businessName,
    });
    return { error };
  };

  const signOut = async () => {
    await authClient.signOut();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading: isPending, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}