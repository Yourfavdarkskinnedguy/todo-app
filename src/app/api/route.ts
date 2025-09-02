import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTask = body.record; // Supabase sends `record`

    //console.log("Received new task from Supabase:", newTask);

    const n8nWebhook = process.env.N8N_WEBHOOK_URL!;
    const response = await fetch(n8nWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const data = await response.json()
    console.log("data check", data)
    revalidatePath('/todo')
    

    return NextResponse.json({ success: true, task: newTask });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}