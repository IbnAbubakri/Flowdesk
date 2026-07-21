// Faruqsuzay@gmail.com | +2349061345507

"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessagesLineChart, RevenueBarChart } from "@/components/charts";
import { mockData } from "@/lib/mock-data";
import { TrendingUp, MessageSquare, Clock, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { label: "Avg. Response Time", value: mockData.stats.avgResponseTime, icon: Clock, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
  { label: "Conversion Rate", value: `${mockData.stats.conversionRate}%`, icon: Target, color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" },
  { label: "AI Auto-Reply Rate", value: "78%", icon: Zap, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400" },
  { label: "Escalation Rate", value: "12%", icon: TrendingUp, color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400" },
];

export default function AnalyticsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Track performance and growth metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <div className={`p-1.5 rounded-lg ${m.color}`}><m.icon size={14} /></div>
                  {m.label}
                </div>
                <div className="text-2xl font-bold text-foreground">{m.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><h3 className="font-semibold text-foreground">Messages Over Time</h3></CardHeader>
          <CardContent><MessagesLineChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><h3 className="font-semibold text-foreground">Revenue (Monthly)</h3></CardHeader>
          <CardContent><RevenueBarChart /></CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
