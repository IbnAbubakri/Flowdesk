"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS = [
  { name: "Admin", email: "admin@flowdesk.ai", password: "demo1234" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("flowdesk_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    if (!localStorage.getItem("flowdesk_users")) {
      localStorage.setItem("flowdesk_users", JSON.stringify(DEMO_USERS));
    }
    setReady(true);
  }, []);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("flowdesk_users") || "[]");
    const match = users.find((u: User & { password: string }) => u.email === email && u.password === password);
    if (match) {
      const u: User = { name: match.name, email: match.email };
      setUser(u);
      localStorage.setItem("flowdesk_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("flowdesk_users") || "[]");
    if (users.some((u: User) => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem("flowdesk_users", JSON.stringify(users));
    const u: User = { name, email };
    setUser(u);
    localStorage.setItem("flowdesk_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("flowdesk_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {ready ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
