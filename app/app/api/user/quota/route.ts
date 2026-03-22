import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const FREE_LIMIT = 1;

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const admin = getSupabaseAdmin();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (admin.from("profiles") as any)
    .select("is_pro")
    .eq("id", user.id)
    .single();

  const isPro = profile?.is_pro === true;

  if (isPro) {
    return Response.json({ isPro: true, used: null, limit: null, remaining: null });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count } = await (admin.from("letters") as any)
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const used = count ?? 0;
  const remaining = Math.max(0, FREE_LIMIT - used);

  return Response.json({ isPro: false, used, limit: FREE_LIMIT, remaining });
}
