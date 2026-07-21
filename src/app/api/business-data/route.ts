import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("business_data")
      .select("key, value");

    if (error) throw error;

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

    const { error } = await supabase
      .from("business_data")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Update business data error:", error);
    return NextResponse.json({ error: "Failed to update business data" }, { status: 500 });
  }
}
