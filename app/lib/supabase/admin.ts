import { createClient } from "@supabase/supabase-js";

// Client admin avec service role key — uniquement côté serveur
// Instancié en lazy pour éviter les erreurs au build si la variable manque
let _admin: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
  if (!_admin) {
    _admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _admin;
}
