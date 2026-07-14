// © 2026 Abubakri Faaruq Adebowale (IbnAbubakri). All rights reserved.
// Faruqsuzay@gmail.com | +2349061345507

"use client";
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, TopNav } from "@/components/layout";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"}`}>
        <TopNav onMenuToggle={() => setMobileOpen(true)} />
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 lg:p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
