import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const emailExists = data.users.some(
      (user) => user.email?.toLowerCase() === email.toLowerCase()
    );

    return NextResponse.json({ exists: emailExists });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}