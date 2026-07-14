// © 2026 Abubakri Faaruq Adebowale (IbnAbubakri). All rights reserved.
// Faruqsuzay@gmail.com | +2349061345507

"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockData } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const statusColors: Record<string, "success" | "warning" | "default" | "danger"> = {
  active: "success", lead: "warning", converted: "default", inactive: "danger",
};

const PAGE_SIZE = 5;

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = mockData.customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(0, safePage * PAGE_SIZE).slice(-PAGE_SIZE);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-heading">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">{mockData.stats.totalCustomers} total customers</p>
        </div>
      </div>

      <Card>
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
            <label htmlFor="customers-search" className="sr-only">Search customers</label>
            <input
              id="customers-search"
              placeholder="Search by name, phone or email..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
            />
          </div>
          <select
            value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }}
            aria-label="Filter by status"
            className="h-9 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none bg-no-repeat bg-[length:16px] pr-8"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23939393' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundPosition: "right 8px center" }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="lead">Lead</option>
            <option value="converted">Converted</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Customer", "Phone", "Status", "Tags", "Last Contacted", "Last Message"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                        {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">{c.name}</span>
                        <span className="text-xs text-muted-foreground block">{c.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{c.phone}</td>
                  <td className="px-4 py-3"><Badge variant={statusColors[c.status]}>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {c.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-[10px] bg-muted text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(c.lastContacted).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-[200px] truncate">{c.lastMessage}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Showing {paginated.length} of {filtered.length} customers</span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(Math.max(1, safePage - 1))}
              disabled={safePage <= 1}
              className="px-3 py-1.5 text-xs rounded-lg border border-input bg-background text-muted-foreground hover:bg-accent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >Previous</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${safePage === p ? "bg-primary text-primary-foreground" : "border border-input bg-background text-muted-foreground hover:bg-accent"}`}
                aria-label={`Page ${p}`}
                aria-current={safePage === p ? "page" : undefined}
              >{p}</button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage >= totalPages}
              className="px-3 py-1.5 text-xs rounded-lg border border-input bg-background text-muted-foreground hover:bg-accent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >Next</button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
