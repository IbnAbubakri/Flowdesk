import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are a helpful AI assistant. Answer questions clearly and concisely. Use Nigerian Naira (₦) for monetary values when relevant.`;

async function callGemini(message: string) {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GEMINI_API_KEY!,
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: message }] }],
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    }),
  });

  if (!response.ok) {
    throw new Error("Gemini API error");
  }

  const data = await response.json();
  try {
    return data.candidates[0].content.parts[0].text;
  } catch {
    return "No response generated.";
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { from: phone, text, name } = body;

    if (!phone || !text) {
      return NextResponse.json({ error: "Phone and text are required" }, { status: 400 });
    }

    // Find or create customer
    let { data: customer } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", phone)
      .single();

    if (!customer) {
      const { data: newCustomer } = await supabase
        .from("customers")
        .insert({ name: name || phone, phone })
        .select("id")
        .single();
      customer = newCustomer;
    }

    if (!customer) {
      throw new Error("Failed to create customer");
    }

    // Find or create open conversation
    let { data: conversation } = await supabase
      .from("conversations")
      .select("id")
      .eq("customer_id", customer.id)
      .eq("status", "open")
      .single();

    if (!conversation) {
      const { data: newConv } = await supabase
        .from("conversations")
        .insert({ customer_id: customer.id, platform: "whatsapp" })
        .select("id")
        .single();
      conversation = newConv;
    }

    if (!conversation) {
      throw new Error("Failed to create conversation");
    }

    // Insert customer message
    await supabase.from("messages").insert({
      conversation_id: conversation.id,
      sender: "customer",
      text,
    });

    // Update conversation timestamp
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversation.id);

    // Generate AI reply
    let reply: string;
    try {
      reply = await callGemini(text);
    } catch {
      reply = "Sorry, I'm having trouble connecting. A staff member will respond shortly.";
    }

    // Insert AI reply
    await supabase.from("messages").insert({
      conversation_id: conversation.id,
      sender: "ai",
      text: reply,
    });

    // Update conversation timestamp again
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversation.id);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
