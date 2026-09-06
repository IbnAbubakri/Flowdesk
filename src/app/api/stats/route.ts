import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await sql`
      SELECT
        (SELECT COUNT(*) FROM customers) AS total_customers,
        (SELECT COUNT(*) FROM conversations WHERE status = 'open') AS open_conversations,
        (SELECT COUNT(*) FROM conversations) AS total_conversations,
        (SELECT COUNT(*) FROM messages WHERE created_at::date = CURRENT_DATE) AS messages_today
    `;

    const row = rows[0];

    return NextResponse.json({
      total_customers: Number(row?.total_customers) || 0,
      open_conversations: Number(row?.open_conversations) || 0,
      total_conversations: Number(row?.total_conversations) || 0,
      messages_today: Number(row?.messages_today) || 0,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}