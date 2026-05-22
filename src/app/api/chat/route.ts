import { NextResponse } from "next/server";

const API_BASE = process.env.FLOWDESK_API_URL || "http://localhost:3001";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
