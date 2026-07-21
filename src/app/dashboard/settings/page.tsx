"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Settings2, Bell, Users, CreditCard, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

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

function Toggle({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      style={{ backgroundColor: checked ? "hsl(var(--primary))" : "hsl(var(--input))" }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        style={{ transform: checked ? "translateX(24px)" : "translateX(4px)" }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [autoReply, setAutoReply] = useState(true);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your business and AI settings</p>
      </div>

      <div className="bg-card rounded-xl border border-border">
        {/* Business Info */}
        <section className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-info/10 text-info"><Settings2 size={20} /></div>
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
        </section>

        {/* AI Settings */}
        <section className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple"><Bell size={20} /></div>
            <h3 className="font-semibold text-foreground">AI Behavior</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">Auto-Reply</span>
                <p className="text-xs text-muted-foreground">Allow AI to automatically reply to customer messages</p>
              </div>
              <Toggle checked={autoReply} onToggle={() => setAutoReply(!autoReply)} label="Toggle auto-reply" />
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
        </section>

        {/* Team */}
        <section className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10 text-success"><Users size={20} /></div>
              <h3 className="font-semibold text-foreground">Team Members</h3>
            </div>
            <Button size="sm" variant="outline" onClick={() => toast({ title: "Coming soon", description: "Invite member feature will be available in the next update" })}>Invite Member</Button>
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
        </section>

        {/* Appearance */}
        <section className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-muted text-muted-foreground">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            <h3 className="font-semibold text-foreground">Appearance</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-foreground">Dark Mode</span>
              <p className="text-xs text-muted-foreground">Toggle between light and dark themes</p>
            </div>
            <Toggle checked={theme === "dark"} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} />
          </div>
        </section>

        {/* Subscription */}
        <section className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent-orange/10 text-accent-orange"><CreditCard size={20} /></div>
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
        </section>
      </div>
    </motion.div>
  );
}
