import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newTask = body.record; // this comes from Supabase webhook

    // 👇 Do whatever you want with newTask
    console.log("Received new task from Supabase:", newTask);

    const n8nWebhook = "https://your-n8n-server/webhook/todo";
    await fetch(n8nWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    return NextResponse.json({ success: true, task: newTask });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
