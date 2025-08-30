import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('chatbot message is : ', body)
        // Supabase sends `record`

        //console.log("Received new task from Supabase:", newTask);

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}