import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: customers, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Get last message for each customer
    const customersWithMessages = await Promise.all(
      customers.map(async (customer) => {
        const { data: lastMsg } = await supabase
          .from("messages")
          .select("text, created_at")
          .eq("conversation_id", 
            await supabase
              .from("conversations")
              .select("id")
              .eq("customer_id", customer.id)
              .limit(1)
              .single()
              .then(r => r.data?.id || "")
          )
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        return {
          ...customer,
          last_message: lastMsg?.text || "",
          last_contacted: lastMsg?.created_at || null,
        };
      })
    );

    return NextResponse.json(customersWithMessages);
  } catch (error) {
    console.error("List customers error:", error);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}
