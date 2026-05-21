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

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockData.customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">{mockData.stats.totalCustomers} total customers</p>
        </div>
      </div>

      <Card>
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
            <input
              placeholder="Search by name, phone or email..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
            />
          </div>
          <select
            value={filter} onChange={e => setFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
              {filtered.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer"
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
          <span className="text-xs text-muted-foreground">Showing {filtered.length} of {mockData.customers.length} customers</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-xs rounded-lg border border-input bg-background text-muted-foreground hover:bg-accent">Previous</button>
            <button className="px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground">1</button>
            <button className="px-3 py-1.5 text-xs rounded-lg border border-input bg-background text-muted-foreground hover:bg-accent">2</button>
            <button className="px-3 py-1.5 text-xs rounded-lg border border-input bg-background text-muted-foreground hover:bg-accent">3</button>
            <button className="px-3 py-1.5 text-xs rounded-lg border border-input bg-background text-muted-foreground hover:bg-accent">Next</button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
