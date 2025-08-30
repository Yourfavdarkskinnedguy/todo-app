// src/app/api/add-task/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient"; // adjust path if needed

export async function POST(req: Request) {
  try {
    // Step 1: Get webhook payload from Supabase
    const { id, task, completed, user_email } = await req.json();

    if (!id || !task || !user_email) {
      return NextResponse.json(
        { error: "Missing required fields from Supabase webhook" },
        { status: 400 }
      );
    }

    // Step 2: Forward the data to your n8n workflow
    const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, task, completed, user_email }),
    });

    if (!n8nResponse.ok) {
      throw new Error(`Failed to call n8n workflow: ${n8nResponse.statusText}`);
    }

    const n8nData = await n8nResponse.json();

    // Step 3 (optional): Update the row in Supabase with processed data
    if (n8nData && Object.keys(n8nData).length > 0) {
      const { error: updateError } = await supabase
        .from("todos")
        .update(n8nData) // <- make sure n8n sends valid column keys
        .eq("id", id);

      if (updateError) throw updateError;
    }

    return NextResponse.json({
      success: true,
      forwarded: true,
      n8nData,
    });
  } catch (err: unknown) {
    console.error("Webhook error:", err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
