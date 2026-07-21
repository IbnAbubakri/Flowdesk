import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("conversations")
      .select(`
        id,
        customer_id,
        platform,
        status,
        updated_at,
        customers!inner (
          name,
          phone
        )
      `)
      .order("updated_at", { ascending: false });

    if (error) throw error;

    // Get last message for each conversation
    const conversations = await Promise.all(
      data.map(async (conv) => {
        const { data: lastMsg } = await supabase
          .from("messages")
          .select("text, sender")
          .eq("conversation_id", conv.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        const customer = Array.isArray(conv.customers) ? conv.customers[0] : conv.customers;

        return {
          id: conv.id,
          customer_id: conv.customer_id,
          customer_name: customer?.name || "Unknown",
          customer_phone: customer?.phone || "",
          platform: conv.platform,
          status: conv.status,
          last_message: lastMsg?.text || "",
          last_sender: lastMsg?.sender || "",
          updated_at: conv.updated_at,
        };
      })
    );

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("List conversations error:", error);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}
