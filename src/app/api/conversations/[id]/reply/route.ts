import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    // Insert staff reply
    const { error: insertError } = await supabase
      .from("messages")
      .insert({
        conversation_id: id,
        sender: "staff",
        text,
      });

    if (insertError) throw insertError;

    // Update conversation timestamp
    const { error: updateError } = await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", id);

    if (updateError) throw updateError;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Staff reply error:", error);
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
  }
}
