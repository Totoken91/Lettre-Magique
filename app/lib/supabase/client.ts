import { createBrowserClient } from "@supabase/ssr";

// createBrowserClient synchronise la session via cookies (même chose que le middleware)
// createClient de supabase-js utilise localStorage → désynchronisé avec le serveur
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
