import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const [
      { count: totalCustomers },
      { count: openConversations },
      { count: totalConversations },
      { count: messagesToday },
    ] = await Promise.all([
      supabase.from("customers").select("*", { count: "exact", head: true }),
      supabase.from("conversations").select("*", { count: "exact", head: true }).eq("status", "open"),
      supabase.from("conversations").select("*", { count: "exact", head: true }),
      supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .gte("created_at", new Date().toISOString().split("T")[0]),
    ]);

    return NextResponse.json({
      total_customers: totalCustomers || 0,
      open_conversations: openConversations || 0,
      total_conversations: totalConversations || 0,
      messages_today: messagesToday || 0,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
