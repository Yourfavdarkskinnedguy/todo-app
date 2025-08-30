import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import { revalidatePath } from 'next/cache';




export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('n8n body: ', body)
        // Supabase sends `record`

        const { data, error } = await supabase
            .from("todos")
            .insert([{ task: body.task }])
            .select();
        revalidatePath('/todo')

        //console.log("Received new task from Supabase:", newTask);

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}