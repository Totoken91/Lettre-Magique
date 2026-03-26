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

// GET — list all promo codes
export async function GET() {
  const admin = await checkAdmin();
  if (!admin) return Response.json({ error: "Accès refusé" }, { status: 403 });

  const { data, error } = await (admin.from("promo_codes") as any)
    .select("code, credits, max_uses, used_count, active, show_banner, expires_at, description, created_at")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

// POST — create a new promo code
export async function POST(req: Request) {
  const admin = await checkAdmin();
  if (!admin) return Response.json({ error: "Accès refusé" }, { status: 403 });

  const body = await req.json();
  const { code, credits, max_uses, active, show_banner, expires_at, description } = body;

  if (!code || typeof code !== "string" || code.trim().length === 0) {
    return Response.json({ error: "Code requis" }, { status: 400 });
  }

  const { error } = await (admin.from("promo_codes") as any).insert({
    code: code.trim().toUpperCase(),
    credits: credits ?? 1,
    max_uses: max_uses || null,
    active: active ?? true,
    show_banner: show_banner ?? false,
    expires_at: expires_at || null,
    description: description ?? "",
  });

  if (error) {
    if (error.code === "23505") return Response.json({ error: "Ce code existe déjà" }, { status: 409 });
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ ok: true });
}

// PUT — update a promo code
export async function PUT(req: Request) {
  const admin = await checkAdmin();
  if (!admin) return Response.json({ error: "Accès refusé" }, { status: 403 });

  const body = await req.json();
  const { code, ...updates } = body;
  if (!code) return Response.json({ error: "Code requis" }, { status: 400 });

  // Sanitize updates
  const allowed: Record<string, unknown> = {};
  if (updates.credits !== undefined) allowed.credits = updates.credits;
  if (updates.max_uses !== undefined) allowed.max_uses = updates.max_uses || null;
  if (updates.active !== undefined) allowed.active = updates.active;
  if (updates.show_banner !== undefined) allowed.show_banner = updates.show_banner;
  if (updates.expires_at !== undefined) allowed.expires_at = updates.expires_at || null;
  if (updates.description !== undefined) allowed.description = updates.description;

  // If enabling banner, disable all other banners first
  if (allowed.show_banner === true) {
    await (admin.from("promo_codes") as any)
      .update({ show_banner: false })
      .neq("code", code);
  }

  const { error } = await (admin.from("promo_codes") as any)
    .update(allowed)
    .eq("code", code);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

// DELETE — delete a promo code
export async function DELETE(req: Request) {
  const admin = await checkAdmin();
  if (!admin) return Response.json({ error: "Accès refusé" }, { status: 403 });

  const { code } = await req.json();
  if (!code) return Response.json({ error: "Code requis" }, { status: 400 });

  // Delete redemptions first
  await (admin.from("promo_redemptions") as any).delete().eq("code", code);
  const { error } = await (admin.from("promo_codes") as any).delete().eq("code", code);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
