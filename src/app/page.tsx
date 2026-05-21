"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@flowdesk.ai");
  const [password, setPassword] = useState("demo1234");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-primary-50 dark:from-primary-950/20 dark:via-background dark:to-primary-950/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white text-xl font-bold mb-4 shadow-lg shadow-primary/25">
            FD
          </div>
          <h1 className="text-2xl font-bold text-foreground">FlowDesk AI</h1>
          <p className="text-muted-foreground mt-1 text-sm">AI-Powered WhatsApp Business OS</p>
        </div>
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Welcome back</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">Email</label>
              <Input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">Password</label>
              <Input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <Button className="w-full h-11 text-base" onClick={() => router.push("/dashboard")}>
              Sign in
            </Button>
          </div>
          <p className="text-sm text-center text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">Create one</Link>
          </p>
          <p className="text-xs text-muted-foreground/60 text-center mt-4">
            Demo: click Sign in (any credentials work)
          </p>
        </div>
        <p className="text-center text-xs text-muted-foreground/50 mt-6">© 2026 FlowDesk AI. All rights reserved.</p>
      </motion.div>
    </div>
  );
}
