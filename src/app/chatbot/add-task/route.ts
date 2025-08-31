import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import { revalidatePath } from 'next/cache';

//import { useSearchParams } from "next/navigation";


export async function POST(req: Request) {
   // const searchParams = useSearchParams();
   // const email = searchParams.get("email");
    //console.log('emailllllllll', email)
    
    try {
        const body = await req.json();
        console.log('chatbot task: ', body)
        // Supabase sends `record`

        

       const{data}= await supabase
        .from("todos")
        .insert([{ task: body, completed: false }])
        .select();


      


        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}