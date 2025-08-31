import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    // Extract email from query params instead of using useSearchParams
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    console.log("email:", email);

    // Get JSON body
    const body = await req.json();
    console.log("chatbot task: ", body);

    // Insert into Supabase
    const { data, error } = await supabase
      .from("todos")
      .insert([{ task: body.task, completed: false, email }]) // also store email
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
