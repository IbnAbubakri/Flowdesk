"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageChart, RevenueChart, ConversionChart } from "@/components/charts";
import { mockData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Users, MessageSquare, Wallet, Target } from "lucide-react";
import { motion } from "framer-motion";

const statCards = [
  { label: "Total Customers", value: mockData.stats.totalCustomers.toLocaleString(), icon: Users, change: "+12%", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
  { label: "Active Leads", value: mockData.stats.activeLeads.toLocaleString(), icon: Target, change: "+8%", color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" },
  { label: "Daily Messages", value: mockData.stats.dailyMessages.toLocaleString(), icon: MessageSquare, change: "+23%", color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400" },
  { label: "Monthly Revenue", value: formatCurrency(mockData.stats.revenue), icon: Wallet, change: "+15%", color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400" },
];

const recentActivity = [
  { text: "New message from Chidi Okonkwo", time: "2 min ago", type: "message" },
  { text: "AI auto-replied to Amina Bello (92% confidence)", time: "15 min ago", type: "ai" },
  { text: "Payment of ₦75,000 received from Blessing David", time: "1 hour ago", type: "payment" },
  { text: "Escalation: Visa inquiry sent to Chioma (staff)", time: "3 hours ago", type: "escalation" },
  { text: "New lead: Ngozi Eze added via WhatsApp", time: "5 hours ago", type: "lead" },
];

const typeColors: Record<string, string> = {
  message: "bg-gray-400 dark:bg-gray-600",
  ai: "bg-green-400",
  payment: "bg-blue-400",
  escalation: "bg-yellow-400",
  lead: "bg-purple-400",
};

export default function DashboardPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground font-heading">Welcome back, Admin</h1>
        <p className="text-muted-foreground text-sm mt-1">Here&apos;s what&apos;s happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <div className={`p-2 rounded-lg ${stat.color}`}><stat.icon size={16} /></div>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className={`flex items-center gap-1 mt-1 text-xs ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {stat.change.startsWith("+") ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader><h3 className="font-semibold text-foreground font-heading">Message Volume (This Week)</h3></CardHeader>
          <CardContent><MessageChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><h3 className="font-semibold text-foreground font-heading">Conversion Funnel</h3></CardHeader>
          <CardContent><ConversionChart /></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><h3 className="font-semibold text-foreground font-heading">Revenue Trend</h3></CardHeader>
          <CardContent><RevenueChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><h3 className="font-semibold text-foreground font-heading">Recent Activity</h3></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 pb-3 border-b border-border last:border-0"
                >
                  <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${typeColors[item.type] || "bg-gray-400"}`} />
                  <div>
                    <p className="text-sm text-foreground">{item.text}</p>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
