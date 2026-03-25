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
    .select("is_pro, credits, is_admin")
    .eq("id", user.id)
    .single();

  const isPro = profile?.is_pro === true;
  const isAdmin = profile?.is_admin === true;
  const credits = (profile?.credits ?? 0) as number;

  if (isPro) {
    return Response.json({ isPro: true, isAdmin, used: null, limit: null, remaining: null });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count } = await (admin.from("letters") as any)
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const used = count ?? 0;
  const limit = Math.max(FREE_LIMIT, credits);
  const remaining = Math.max(0, limit - used);

  return Response.json({ isPro: false, isAdmin, used, limit, remaining });
}
