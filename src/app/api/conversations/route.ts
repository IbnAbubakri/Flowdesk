import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await sql`
      SELECT
        c.id,
        c.customer_id,
        c.platform,
        c.status,
        c.updated_at,
        cu.name AS customer_name,
        cu.phone AS customer_phone,
        (
          SELECT m.text FROM messages m
          WHERE m.conversation_id = c.id
          ORDER BY m.created_at DESC
          LIMIT 1
        ) AS last_message,
        (
          SELECT m.sender FROM messages m
          WHERE m.conversation_id = c.id
          ORDER BY m.created_at DESC
          LIMIT 1
        ) AS last_sender
      FROM conversations c
      JOIN customers cu ON cu.id = c.customer_id
      ORDER BY c.updated_at DESC
    `;

    const conversations = rows.map((conv: any) => ({
      id: conv.id,
      customer_id: conv.customer_id,
      customer_name: conv.customer_name || "Unknown",
      customer_phone: conv.customer_phone || "",
      platform: conv.platform,
      status: conv.status,
      last_message: conv.last_message || "",
      last_sender: conv.last_sender || "",
      updated_at: conv.updated_at,
    }));

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("List conversations error:", error);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}