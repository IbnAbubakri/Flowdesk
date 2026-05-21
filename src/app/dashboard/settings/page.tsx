"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Settings2, Bell, Users, CreditCard, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const businessData = {
  name: "Graceville International School",
  timezone: "Africa/Lagos",
  whatsapp: "+234 800 123 4567",
  plan: "Business",
  tone: "professional",
  confidenceThreshold: 0.75,
  autoReply: true,
  team: [
    { id: 1, name: "You (Admin)", email: "admin@flowdesk.ai", role: "admin" },
    { id: 2, name: "Chioma Eze", email: "chioma@flowdesk.ai", role: "staff" },
    { id: 3, name: "Tunde Bakare", email: "tunde@flowdesk.ai", role: "sales" },
    { id: 4, name: "Kemi Adepoju", email: "kemi@flowdesk.ai", role: "accountant" },
  ],
  pricing: {
    starter: { price: 15000, features: ["Basic CRM", "WhatsApp integration", "50 automated replies/day"] },
    business: { price: 45000, features: ["AI automation", "Analytics", "Unlimited replies", "Team access"] },
    enterprise: { price: 150000, features: ["Advanced AI", "Custom setup", "API access", "Dedicated support"] },
  },
};

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(true);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your business and AI settings</p>
      </div>

      {/* Business Info */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"><Settings2 size={20} /></div>
            <h3 className="font-semibold text-foreground">Business Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[ 
              { label: "Business Name", value: businessData.name },
              { label: "Time Zone", value: businessData.timezone },
              { label: "WhatsApp Number", value: businessData.whatsapp },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-medium text-muted-foreground mb-1">{f.label}</label>
                <div className="h-10 px-3 rounded-lg border border-input bg-muted/50 text-sm flex items-center text-foreground">{f.value}</div>
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Plan</label>
              <div><Badge variant="success">{businessData.plan} Plan</Badge></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"><Bell size={20} /></div>
            <h3 className="font-semibold text-foreground">AI Behavior</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">Auto-Reply</span>
                <p className="text-xs text-muted-foreground">Allow AI to automatically reply to customer messages</p>
              </div>
              <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-primary cursor-pointer">
                <span className="inline-block h-3.5 w-3.5 translate-x-4 transform rounded-full bg-white shadow-sm transition-transform" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">AI Tone</label>
              <div className="h-10 px-3 rounded-lg border border-input bg-muted/50 text-sm flex items-center text-foreground capitalize">{businessData.tone}</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Confidence Threshold</label>
              <div className="h-10 px-3 rounded-lg border border-input bg-muted/50 text-sm flex items-center text-foreground">{businessData.confidenceThreshold * 100}%</div>
              <p className="text-xs text-muted-foreground/60 mt-1">Messages below this confidence are escalated to staff</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"><Users size={20} /></div>
              <h3 className="font-semibold text-foreground">Team Members</h3>
            </div>
            <Button size="sm" variant="outline">Invite Member</Button>
          </div>
          <div className="space-y-2">
            {businessData.team.map(m => (
              <div key={m.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-semibold">
                    {m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{m.name}</span>
                    <span className="text-xs text-muted-foreground block">{m.email}</span>
                  </div>
                </div>
                <Badge variant={m.role === "admin" ? "default" : "outline"}>{m.role.charAt(0).toUpperCase() + m.role.slice(1)}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            <h3 className="font-semibold text-foreground">Appearance</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-foreground">Dark Mode</span>
              <p className="text-xs text-muted-foreground">Toggle between light and dark themes</p>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === "dark" ? "bg-primary" : "bg-input"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"><CreditCard size={20} /></div>
            <h3 className="font-semibold text-foreground">Subscription</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(businessData.pricing).map(([key, tier]) => (
              <div key={key} className={`p-4 rounded-xl border ${businessData.plan.toLowerCase() === key ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground capitalize">{key}</h4>
                  <span className="text-lg font-bold text-foreground">{formatCurrency(tier.price)}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
                </div>
                <ul className="space-y-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                {businessData.plan.toLowerCase() === key && (
                  <Badge variant="success" className="mt-2">Current Plan</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
