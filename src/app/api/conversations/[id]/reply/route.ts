import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    await sql`
      INSERT INTO messages (conversation_id, sender, text)
      VALUES (${id}, 'staff', ${text})
    `;

    await sql`
      UPDATE conversations SET updated_at = NOW()
      WHERE id = ${id}
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Staff reply error:", error);
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
  }
}