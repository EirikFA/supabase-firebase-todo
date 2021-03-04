import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.PREACT_APP_SUPABASE_URL!,
  process.env.PREACT_APP_SUPABASE_KEY!
);

export const { auth } = supabase;

export default supabase;
