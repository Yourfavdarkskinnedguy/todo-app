import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import { revalidatePath } from 'next/cache';





export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('n8n body: ', body)
        
        const { error } = await supabase
              .from("todos")
              .update({ task: body.task })
              .eq("id", body.id);
              revalidatePath('/todo')


    

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}