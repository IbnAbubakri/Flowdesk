"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, Users, Zap, Wallet, BarChart3,
  Bot, Settings, ChevronLeft, ChevronRight, Menu, X, Moon, Sun,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/inbox", label: "Inbox", icon: MessageSquare },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/automation", label: "Automation", icon: Zap },
  { href: "/dashboard/payments", label: "Payments", icon: Wallet },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: {
  collapsed: boolean; onToggle: () => void; mobileOpen: boolean; onMobileClose: () => void;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sidebarContent = (
    <div className={cn(
      "flex flex-col h-full bg-card border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-60"
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-border shrink-0">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold">FD</div>
            <span className="font-bold text-base text-foreground font-heading">FlowDesk AI</span>
          </Link>
        )}
        <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hidden lg:block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        <button onClick={onMobileClose} className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground lg:hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close sidebar">
          <X size={18} />
        </button>
      </div>
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.div layoutId="nav-active" className="absolute inset-0 rounded-lg bg-primary/10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <item.icon size={20} className="relative z-10" />
              {!collapsed && <span className="relative z-10">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-4 border-t border-border pt-3">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          role="switch"
          aria-checked={theme === "dark"}
          aria-label={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
        >
          {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          {!collapsed && <span>{mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : ""}</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen hidden lg:block">
        {sidebarContent}
      </aside>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-screen lg:hidden"
            >
              <div className="flex flex-col h-full bg-card border-r border-border w-60">
                <div className="flex items-center justify-between h-16 px-4 border-b border-border shrink-0">
                  <Link href="/dashboard" className="flex items-center gap-2" onClick={onMobileClose}>
                    <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold">FD</div>
                    <span className="font-bold text-base text-foreground font-heading">FlowDesk AI</span>
                  </Link>
                  <button onClick={onMobileClose} className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close menu">
                    <X size={18} />
                  </button>
                </div>
                <nav className="flex-1 py-4 space-y-1 px-2">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onMobileClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="px-3 pb-4 border-t border-border pt-3">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    role="switch"
                    aria-checked={theme === "dark"}
                    aria-label={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
                  >
                    {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    <span>{mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : ""}</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function TopNav({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [search, setSearch] = useState("");
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="p-2 rounded-lg hover:bg-accent text-muted-foreground lg:hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div className="hidden sm:block relative">
          <svg className="absolute left-3 top-2.5 text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <label htmlFor="topnav-search" className="sr-only">Search customers and messages</label>
          <input
            id="topnav-search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && search.trim() && toast({ title: "Search", description: `Searching for "${search.trim()}" — feature coming soon` })}
            placeholder="Search customers, messages..."
            className="w-56 lg:w-72 h-9 pl-9 pr-3 rounded-lg border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" /> Live Demo
        </span>
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
