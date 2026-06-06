"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Bot } from "lucide-react";
import { motion } from "framer-motion";

const examplePrompts = [
  "Show me unpaid customers",
  "Summarize today's conversations",
  "Which leads are inactive?",
  "What's our revenue this month?",
  "List customers who haven't been contacted in a week",
];



export default function AIAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const handleSend = async (text: string) => {
    const q = text || prompt;
    if (!q.trim()) return;
    setChat(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);
    setPrompt("");
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,
          history: chat.map(m => ({ role: m.role, content: m.text })),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setChat(prev => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setChat(prev => [...prev, { role: "ai", text: "Sorry, I couldn't reach the AI. Make sure the backend server is running on port 3001." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground font-heading">AI Assistant</h1>
          <p className="text-sm text-muted-foreground mt-1">Ask questions about your business in plain English</p>
        </div>

        <Card className="h-[calc(100vh-16rem)] flex flex-col">
          <CardContent className="p-0 flex-1 flex flex-col min-h-0">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {chat.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <Bot size={32} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-heading">Ask your business anything</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Try asking about customers, revenue, payments, or activity. The AI understands your business data in real-time.
                  </p>
                </div>
              )}
              {chat.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  <div className={`max-w-[85%] min-w-0 p-4 rounded-2xl ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"}`}>
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex">
                  <div className="bg-muted rounded-2xl rounded-bl-sm p-4">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-dot" style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <label htmlFor="ai-prompt" className="sr-only">Ask the AI assistant</label>
                <input
                  id="ai-prompt"
                  value={prompt} onChange={e => setPrompt(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend(prompt)}
                  placeholder="Ask about your business..."
                  className="flex-1 h-11 px-4 rounded-xl border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
                />
                <Button className="h-11 w-11 p-0 rounded-xl shrink-0" onClick={() => handleSend(prompt)} aria-label="Send message">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-64 shrink-0">
        <h3 className="text-sm font-medium text-foreground mb-3">Try asking</h3>
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {examplePrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="shrink-0 lg:w-full text-left p-3 rounded-xl border border-border bg-card text-sm text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              &ldquo;{p}&rdquo;
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
