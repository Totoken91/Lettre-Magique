import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

async function checkAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = getSupabaseAdmin();
  const { data: profile } = await (admin.from("profiles") as any)
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin) return null;
  return admin;
}

export async function GET() {
  const admin = await checkAdmin();
  if (!admin) return Response.json({ error: "Accès refusé" }, { status: 403 });

  const { data, error } = await (admin.from("feedback") as any)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function PUT(req: Request) {
  const admin = await checkAdmin();
  if (!admin) return Response.json({ error: "Accès refusé" }, { status: 403 });

  const { id, status } = await req.json();
  if (!id || !status) return Response.json({ error: "ID et status requis" }, { status: 400 });
  if (!["nouveau", "lu", "resolu"].includes(status)) return Response.json({ error: "Status invalide" }, { status: 400 });

  const { error } = await (admin.from("feedback") as any)
    .update({ status })
    .eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
