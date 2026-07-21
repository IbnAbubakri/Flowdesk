// © 2026 Abubakri Faaruq Adebowale (IbnAbubakri). All rights reserved.
// Faruqsuzay@gmail.com | +2349061345507

"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Send, Phone, Mail, AlertCircle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface Conversation {
  id: number;
  customer_name: string;
  customer_phone: string;
  platform: string;
  status: string;
  last_message: string;
  updated_at: string;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  confidence: number | null;
  escalated: boolean;
  created_at: string;
}

function ConfidenceBadge({ confidence, escalated }: { confidence?: number | null; escalated?: boolean }) {
  if (escalated && confidence === null) return <Badge variant="warning">Staff Reply</Badge>;
  if (escalated) return <Badge variant="warning">Escalated</Badge>;
  if (confidence === null || confidence === undefined) return null;
  if (confidence >= 0.75) return <Badge variant="success">AI {Math.round(confidence * 100)}%</Badge>;
  if (confidence >= 0.5) return <Badge variant="warning">Suggested {Math.round(confidence * 100)}%</Badge>;
  return <Badge variant="danger">Low {Math.round(confidence * 100)}%</Badge>;
}

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchConvs = useCallback(async () => {
    try {
      const r = await fetch("/api/conversations");
      if (r.ok) setConversations(await r.json());
    } catch {
      toast({ title: "Error", description: "Failed to load conversations", variant: "destructive" });
    }
  }, []);

  const fetchMessages = useCallback(async (id: number) => {
    try {
      const r = await fetch(`/api/conversations/${id}/messages`);
      if (r.ok) setMessages(await r.json());
    } catch {
      toast({ title: "Error", description: "Failed to load messages", variant: "destructive" });
    }
  }, []);

  useEffect(() => { fetchConvs(); }, [fetchConvs]);
  useEffect(() => { if (selectedId) fetchMessages(selectedId); }, [selectedId, fetchMessages]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!replyText.trim() || !selectedId) return;
    setSending(true);
    try {
      const r = await fetch(`/api/conversations/${selectedId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: replyText }),
      });
      if (!r.ok) throw new Error("Send failed");
      setReplyText("");
      await fetchMessages(selectedId);
      await fetchConvs();
    } catch {
      toast({ title: "Error", description: "Failed to send message", variant: "destructive" });
    }
    setSending(false);
  };

  const filtered = conversations.filter(c =>
    c.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.customer_phone?.includes(search)
  );

  const selected = conversations.find(c => c.id === selectedId);

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-0 -m-4 lg:-m-6">
      {/* Left: Conversation List */}
      <div className="w-64 lg:w-72 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
            <label htmlFor="inbox-search" className="sr-only">Search conversations</label>
            <input
              id="inbox-search"
              placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(c => (
            <div
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedId(c.id); } }}
              tabIndex={0}
              role="button"
              className={`p-3 border-b border-border cursor-pointer hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${selectedId === c.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
              aria-label={`Select conversation with ${c.customer_name}`}
              aria-current={selectedId === c.id ? "true" : undefined}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold shrink-0">
                  {(c.customer_name || "??").split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate">{c.customer_name}</span>
                    <span className="text-[10px] text-muted-foreground">{c.updated_at?.slice(5, 16) || ""}</span>
                  </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {c.last_message || ""}
                    </p>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-8">No conversations yet</p>
          )}
        </div>
      </div>

      {/* Center: Chat */}
      <div className="flex-1 flex flex-col bg-card">
        {selected ? (
          <>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  {selected.customer_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <span className="font-medium text-foreground text-sm">{selected.customer_name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${selected.status === "open" ? "bg-green-500" : "bg-gray-400"}`} />
                    <span className="text-xs text-muted-foreground">{selected.platform}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Escalated", description: `${selected.customer_name} has been escalated to staff` })} aria-label="Escalate conversation">
                <AlertCircle size={14} className="mr-1.5" /> Escalate
              </Button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
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
                          {m.sender === "customer" ? selected.customer_name : m.sender === "ai" ? "AI Assistant" : "Staff"}
                        </span>
                        <ConfidenceBadge confidence={m.confidence} escalated={!!m.escalated} />
                      </div>
                      <p className="text-sm text-foreground whitespace-pre-line">{m.text}</p>
                      <span className="text-[10px] text-muted-foreground/60 mt-1 block">{m.created_at?.slice(11, 19) || ""}</span>
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
                <label htmlFor="inbox-reply" className="sr-only">Type your reply</label>
                <input
                  id="inbox-reply"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 h-11 px-4 rounded-xl border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
                />
                <Button className="h-11 w-11 p-0 rounded-xl" onClick={handleSend} disabled={sending} aria-label="Send message">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageCircle size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select a conversation</p>
            </div>
          </div>
        )}
      </div>

      {/* Right: Customer Details */}
      {selected && (
        <div className="hidden lg:block w-64 xl:w-72 border-l border-border bg-card p-4 shrink-0">
          <div className="text-center mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold mx-auto mb-2">
              {selected.customer_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
            </div>
            <h3 className="font-semibold text-foreground text-sm">{selected.customer_name}</h3>
            <Badge variant={selected.status === "open" ? "success" : "default"} className="mt-1">
              {selected.status}
            </Badge>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone size={14} className="shrink-0" /> <span className="truncate">{selected.customer_phone || "—"}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail size={14} className="shrink-0" /> <span className="truncate">{selected.platform}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
