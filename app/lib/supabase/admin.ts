import { createClient } from "@supabase/supabase-js";

// Client admin avec service role key — uniquement côté serveur
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
