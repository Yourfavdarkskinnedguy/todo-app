import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
//import { Database } from "./types"; // optional, if you have generated types



export const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);


