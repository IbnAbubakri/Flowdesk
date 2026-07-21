import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are a helpful AI assistant. Answer questions clearly and concisely. Use Nigerian Naira (₦) for monetary values when relevant.`;

async function callGemini(contents: Array<{ role: string; parts: Array<{ text: string }> }>) {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GEMINI_API_KEY!,
    },
    body: JSON.stringify({
      contents,
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${error.slice(0, 200)}`);
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
    const { message, history = [] } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    for (const h of history) {
      contents.push({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content || "" }],
      });
    }

    contents.push({ role: "user", parts: [{ text: message }] });

    const reply = await callGemini(contents);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "AI service error" }, { status: 502 });
  }
}
