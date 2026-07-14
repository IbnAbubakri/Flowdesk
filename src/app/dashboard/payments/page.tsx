// © 2026 Abubakri Faaruq Adebowale (IbnAbubakri). All rights reserved.
// Faruqsuzay@gmail.com | +2349061345507

"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Wallet, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const statusBadge: Record<string, "success" | "danger" | "warning"> = { paid: "success", unpaid: "danger", pending: "warning" };

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockData.payments);
  const paid = payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const unpaid = payments.filter(p => p.status === "unpaid").reduce((s, p) => s + p.amount, 0);
  const pending = payments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground font-heading">Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">Track payments, invoices, and revenue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: formatCurrency(paid), icon: TrendingUp, color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" },
          { label: "Unpaid", value: formatCurrency(unpaid), icon: AlertCircle, color: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400" },
          { label: "Pending", value: formatCurrency(pending), icon: Wallet, color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <div className={`p-2 rounded-lg ${stat.color}`}><stat.icon size={16} /></div>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Customer", "Description", "Amount", "Status", "Date", "Action"].map(h => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{p.customer}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.description}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{formatCurrency(p.amount)}</td>
                    <td className="px-4 py-3"><Badge variant={statusBadge[p.status]}>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</Badge></td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      {p.status === "unpaid" && <Button size="sm" variant="outline" onClick={() => { setPayments(payments.map(pm => pm.id === p.id ? { ...pm, status: "paid" as const } : pm)); toast({ title: "Marked as Paid", description: `${p.customer} payment marked as paid` }); }}><CheckCircle size={12} className="mr-1" /> Mark Paid</Button>}
                      {p.status === "pending" && <Button size="sm" variant="outline" onClick={() => { setPayments(payments.map(pm => pm.id === p.id ? { ...pm, status: "paid" as const } : pm)); toast({ title: "Confirmed", description: `${p.customer} payment confirmed` }); }}>Confirm</Button>}
                      {p.status === "paid" && <span className="text-xs text-muted-foreground">Completed</span>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
