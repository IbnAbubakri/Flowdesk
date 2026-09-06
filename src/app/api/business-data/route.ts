import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await sql`
      SELECT key, value FROM business_data
    `;

    const result: Record<string, string> = {};
    for (const row of data) {
      result[row.key] = row.value;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Get business data error:", error);
    return NextResponse.json({ error: "Failed to fetch business data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    await sql`
      INSERT INTO business_data (key, value, updated_at)
      VALUES (${key}, ${value}, NOW())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Update business data error:", error);
    return NextResponse.json({ error: "Failed to update business data" }, { status: 500 });
  }
}