import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { task, email } = await req.json(); // expect email from request body
    console.log("Received task:", task, "for email:", email);

    const { data, error } = await supabase
      .from("todos")
      .insert([{ task, completed: false, user_email: email }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
