import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

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
    let customer = await sql`
      SELECT id FROM customers WHERE phone = ${phone} LIMIT 1
    `.then((rows) => rows[0]);

    if (!customer) {
      customer = await sql`
        INSERT INTO customers (name, phone)
        VALUES (${name || phone}, ${phone})
        RETURNING id
      `.then((rows) => rows[0]);
    }

    if (!customer) {
      throw new Error("Failed to create customer");
    }

    // Find or create open conversation
    let conversation = await sql`
      SELECT id FROM conversations
      WHERE customer_id = ${customer.id} AND status = 'open'
      LIMIT 1
    `.then((rows) => rows[0]);

    if (!conversation) {
      conversation = await sql`
        INSERT INTO conversations (customer_id, platform)
        VALUES (${customer.id}, 'whatsapp')
        RETURNING id
      `.then((rows) => rows[0]);
    }

    if (!conversation) {
      throw new Error("Failed to create conversation");
    }

    // Insert customer message
    await sql`
      INSERT INTO messages (conversation_id, sender, text)
      VALUES (${conversation.id}, 'customer', ${text})
    `;

    // Update conversation timestamp
    await sql`
      UPDATE conversations SET updated_at = NOW()
      WHERE id = ${conversation.id}
    `;

    // Generate AI reply
    let reply: string;
    try {
      reply = await callGemini(text);
    } catch {
      reply = "Sorry, I'm having trouble connecting. A staff member will respond shortly.";
    }

    // Insert AI reply
    await sql`
      INSERT INTO messages (conversation_id, sender, text)
      VALUES (${conversation.id}, 'ai', ${reply})
    `;

    // Update conversation timestamp again
    await sql`
      UPDATE conversations SET updated_at = NOW()
      WHERE id = ${conversation.id}
    `;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}