"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockData, type Customer, type Message } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Search, Send, Phone, Mail, Tag, AlertCircle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const statusBadge: Record<string, "success" | "warning" | "default" | "danger"> = {
  active: "success", lead: "warning", converted: "default", inactive: "danger",
};

function ConfidenceBadge({ confidence, escalated }: { confidence?: number | null; escalated?: boolean }) {
  if (escalated && confidence === null) return <Badge variant="warning">Staff Reply</Badge>;
  if (escalated) return <Badge variant="warning">Escalated</Badge>;
  if (confidence === null || confidence === undefined) return null;
  if (confidence >= 0.75) return <Badge variant="success">AI {Math.round(confidence * 100)}%</Badge>;
  if (confidence >= 0.5) return <Badge variant="warning">Suggested {Math.round(confidence * 100)}%</Badge>;
  return <Badge variant="danger">Low {Math.round(confidence * 100)}%</Badge>;
}

export default function InboxPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(mockData.customers[0]);
  const [search, setSearch] = useState("");
  const [sending, setSending] = useState(false);

  const customers = mockData.customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );
  const messages = mockData.messages.filter(m => m.customerId === selectedCustomer.id);

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-0 -m-4 lg:-m-6">
      {/* Left: Customer List */}
      <div className="w-64 lg:w-72 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
            <input
              placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {customers.map(c => (
            <div
              key={c.id}
              onClick={() => setSelectedCustomer(c)}
              className={`p-3 border-b border-border cursor-pointer hover:bg-accent transition-colors ${selectedCustomer.id === c.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold shrink-0">
                  {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground">{formatDate(c.lastContacted)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center: Chat */}
      <div className="flex-1 flex flex-col bg-card">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
              {selectedCustomer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <span className="font-medium text-foreground text-sm">{selectedCustomer.name}</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <AlertCircle size={14} className="mr-1.5" /> Escalate
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${m.sender === "customer" ? "" : "justify-end"}`}
              >
                <div className={`max-w-[75%] ${m.sender === "customer" ? "bg-muted rounded-2xl rounded-bl-sm" : "bg-primary/10 rounded-2xl rounded-br-sm"} p-3`}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-medium text-muted-foreground">
                      {m.sender === "customer" ? selectedCustomer.name : m.sender === "ai" ? "AI Assistant" : "Staff (Chioma)"}
                    </span>
                    <ConfidenceBadge confidence={m.confidence} escalated={m.escalated} />
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-line">{m.text}</p>
                  <span className="text-[10px] text-muted-foreground/60 mt-1 block">{formatDate(m.timestamp)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {sending && (
            <div className="flex justify-end">
              <div className="bg-primary/10 rounded-2xl rounded-br-sm p-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-2 h-2 bg-primary/40 rounded-full animate-pulse-dot" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              placeholder="Type a message..."
              className="flex-1 h-11 px-4 rounded-xl border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
            />
            <Button className="h-11 w-11 p-0 rounded-xl" onClick={() => { setSending(true); setTimeout(() => setSending(false), 1500); }}>
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Customer Details */}
      <div className="hidden lg:block w-64 xl:w-72 border-l border-border bg-card p-4 shrink-0">
        <div className="text-center mb-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold mx-auto mb-2">
            {selectedCustomer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <h3 className="font-semibold text-foreground text-sm">{selectedCustomer.name}</h3>
          <Badge variant={statusBadge[selectedCustomer.status]} className="mt-1">
            {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
          </Badge>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone size={14} className="shrink-0" /> <span className="truncate">{selectedCustomer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail size={14} className="shrink-0" /> <span className="truncate">{selectedCustomer.email}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedCustomer.tags.map(t => (
              <span key={t} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                <Tag size={10} className="mr-1" /> {t}
              </span>
            ))}
          </div>
          {selectedCustomer.notes && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs font-medium text-muted-foreground mb-1">Notes</p>
              <p className="text-xs text-foreground/80">{selectedCustomer.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
