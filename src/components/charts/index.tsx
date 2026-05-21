"use client";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const messageData = [
  { name: "Mon", messages: 120 }, { name: "Tue", messages: 145 }, { name: "Wed", messages: 132 },
  { name: "Thu", messages: 168 }, { name: "Fri", messages: 158 }, { name: "Sat", messages: 98 },
  { name: "Sun", messages: 85 },
];

const revenueData = [
  { name: "Jan", revenue: 12000 }, { name: "Feb", revenue: 18000 }, { name: "Mar", revenue: 22000 },
  { name: "Apr", revenue: 28000 }, { name: "May", revenue: 35000 }, { name: "Jun", revenue: 42000 },
];

const conversionData = [
  { name: "Inquiry", value: 400 }, { name: "Follow-up", value: 300 },
  { name: "Meeting", value: 200 }, { name: "Converted", value: 94 },
];

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#2563eb"];

function useThemeColors() {
  if (typeof window === "undefined") return { grid: "#f0f0f0", text: "#9ca3af" };
  const isDark = document.documentElement.classList.contains("dark");
  return isDark ? { grid: "#374151", text: "#9ca3af" } : { grid: "#f0f0f0", text: "#9ca3af" };
}

export function MessageChart() {
  const c = useThemeColors();
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={messageData}>
        <defs>
          <linearGradient id="msgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: c.text }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: c.text }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", background: "var(--card)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
        <Area type="monotone" dataKey="messages" stroke="#3b82f6" strokeWidth={2} fill="url(#msgGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RevenueChart() {
  const c = useThemeColors();
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: c.text }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: c.text }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", background: "var(--card)" }} />
        <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ConversionChart() {
  const c = useThemeColors();
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={conversionData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
          {conversionData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", background: "var(--card)" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MessagesLineChart() {
  const c = useThemeColors();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={messageData}>
        <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: c.text }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: c.text }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", background: "var(--card)" }} />
        <Line type="monotone" dataKey="messages" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: "#3b82f6" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function RevenueBarChart() {
  const c = useThemeColors();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: c.text }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: c.text }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", background: "var(--card)" }} />
        <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
