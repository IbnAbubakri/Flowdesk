"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Business name is required"); return; }
    if (!email.trim()) { setError("Email is required"); return; }
    if (!email.includes("@")) { setError("Please enter a valid email address"); return; }
    if (!password) { setError("Password is required"); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
    if (!signup(name, email, password)) {
      setError("An account with this email already exists");
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
          <h1 className="text-2xl font-bold text-foreground font-heading">Get Started</h1>
          <p className="text-muted-foreground mt-1 text-sm">Create your FlowDesk AI account</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6 font-heading">Create account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium text-foreground/80 mb-1.5">Business Name</label>
              <Input id="signup-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your business name" required />
            </div>
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-foreground/80 mb-1.5">Email</label>
              <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-foreground/80 mb-1.5">Password</label>
              <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" required minLength={8} />
            </div>
            {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
            <Button type="submit" className="w-full h-11 text-base" aria-label="Create your account">
              Create account
            </Button>
          </form>
          <p className="text-sm text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
