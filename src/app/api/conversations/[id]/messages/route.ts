import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const data = await sql`
      SELECT * FROM messages
      WHERE conversation_id = ${id}
      ORDER BY created_at ASC
    `;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}