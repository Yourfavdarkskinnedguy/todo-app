// /app/api/add-task/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { id, task, userEmail } = await req.json();

    // 1. Store task in Supabase
    const { data, error } = await supabase
      .from("todos")
      .insert([{ id, task, email: userEmail, completed: false }]);

    if (error) throw error;
    
      

    return NextResponse.json({ 
        success: true, 
        task: data 
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



