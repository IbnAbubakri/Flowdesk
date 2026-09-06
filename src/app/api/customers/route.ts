import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await sql`
      SELECT
        cu.*,
        (
          SELECT m.text FROM messages m
          JOIN conversations c2 ON c2.id = m.conversation_id
          WHERE c2.customer_id = cu.id
          ORDER BY m.created_at DESC
          LIMIT 1
        ) AS last_message,
        (
          SELECT m.created_at FROM messages m
          JOIN conversations c2 ON c2.id = m.conversation_id
          WHERE c2.customer_id = cu.id
          ORDER BY m.created_at DESC
          LIMIT 1
        ) AS last_contacted
      FROM customers cu
      ORDER BY cu.created_at DESC
    `;

    const customers = data.map((customer: any) => ({
      ...customer,
      last_message: customer.last_message || "",
      last_contacted: customer.last_contacted || null,
    }));

    return NextResponse.json(customers);
  } catch (error) {
    console.error("List customers error:", error);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}