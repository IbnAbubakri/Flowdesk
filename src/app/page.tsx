// Faruqsuzay@gmail.com | +2349061345507

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@flowdesk.ai");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Email is required"); return; }
    if (!password) { setError("Password is required"); return; }
    if (!email.includes("@")) { setError("Please enter a valid email address"); return; }
    if (!login(email, password)) {
      setError("Invalid email or password");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white text-xl font-bold mb-4">
            FD
          </div>
          <h1 className="text-2xl font-bold text-foreground">FlowDesk AI</h1>
          <p className="text-muted-foreground mt-1 text-sm">AI-Powered WhatsApp Business OS</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Welcome back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-foreground/80 mb-1.5">Email</label>
              <Input
                id="login-email"
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" required
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-foreground/80 mb-1.5">Password</label>
              <Input
                id="login-password"
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" required
              />
            </div>
            {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
            <Button type="submit" className="w-full h-11 text-base" aria-label="Sign in to dashboard">
              Sign in
            </Button>
          </form>
          <p className="text-sm text-center text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">Create one</Link>
          </p>
          <p className="text-xs text-muted-foreground/60 text-center mt-4">
            Demo: admin@flowdesk.ai / demo1234
          </p>
        </div>
        <p className="text-center text-xs text-muted-foreground/50 mt-6">© 2026 FlowDesk AI. All rights reserved.</p>
      </motion.div>
    </div>
  );
}
