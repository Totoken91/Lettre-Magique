import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  // Auth check
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Non authentifié" }, { status: 401 });

  // Admin check
  const admin = getSupabaseAdmin();
  const { data: profile } = await (admin.from("profiles") as any)
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return Response.json({ error: "Accès refusé" }, { status: 403 });
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { count: usersCount },
    { count: lettersCount },
    { count: lettersThisWeek },
    { data: visits30d },
    { data: visits7d },
    { data: recentLetters },
    { count: proCount },
  ] = await Promise.all([
    (admin.from("profiles") as any).select("*", { count: "exact", head: true }),
    (admin.from("letters") as any).select("*", { count: "exact", head: true }),
    (admin.from("letters") as any)
      .select("*", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo),
    (admin.from("page_views") as any)
      .select("session_id")
      .gte("created_at", thirtyDaysAgo),
    (admin.from("page_views") as any)
      .select("session_id")
      .gte("created_at", sevenDaysAgo),
    (admin.from("letters") as any)
      .select("id, created_at, type_name, type, email, sender_name")
      .order("created_at", { ascending: false })
      .limit(10),
    (admin.from("profiles") as any)
      .select("*", { count: "exact", head: true })
      .eq("is_pro", true),
  ]);

  const uniqueVisits30d = new Set((visits30d ?? []).map((r: { session_id: string }) => r.session_id)).size;
  const uniqueVisits7d = new Set((visits7d ?? []).map((r: { session_id: string }) => r.session_id)).size;

  return Response.json({
    usersCount,
    lettersCount,
    lettersThisWeek,
    uniqueVisits30d,
    uniqueVisits7d,
    proCount,
    recentLetters,
  });
}
