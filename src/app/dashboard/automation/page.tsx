"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockData } from "@/lib/mock-data";
import { Plus, Zap, Clock, AlertTriangle, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const typeIcons: Record<string, typeof Zap> = { auto_reply: Zap, follow_up: Clock, scheduled: Clock, keyword: AlertTriangle };
const typeColors: Record<string, string> = {
  auto_reply: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  follow_up: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  scheduled: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  keyword: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function AutomationPage() {
  const [rules, setRules] = useState(mockData.automations);

  const toggleRule = (id: number) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Automation</h1>
          <p className="text-sm text-muted-foreground mt-1">Automate WhatsApp replies, follow-ups, and escalations</p>
        </div>
        <Button><Plus size={16} className="mr-1" /> Add Rule</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Active Rules", value: rules.filter(r => r.enabled).length },
          { label: "Total Rules", value: rules.length },
          { label: "Auto-Replies Today", value: "1,240" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="p-5">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        {rules.map((rule, i) => {
          const Icon = typeIcons[rule.type] || Zap;
          return (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${typeColors[rule.type] || "bg-muted text-muted-foreground"}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">{rule.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          <span className="text-muted-foreground/60">Trigger:</span> {rule.trigger}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-muted-foreground/60">Action:</span> {rule.action}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={rule.enabled ? "success" : "outline"}>{rule.enabled ? "Active" : "Disabled"}</Badge>
                      <button
                        onClick={() => toggleRule(rule.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${rule.enabled ? "bg-primary" : "bg-input"}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${rule.enabled ? "translate-x-4" : "translate-x-1"}`} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
