import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const admin = getSupabaseAdmin();
  const { data: profile } = await (admin.from("profiles") as any)
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin)
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

  const { action, userId } = await req.json();

  if (action === "grant_credits") {
    const { data: target } = await (admin.from("profiles") as any)
      .select("credits")
      .eq("id", userId)
      .single();
    await (admin.from("profiles") as any)
      .update({ credits: (target?.credits ?? 0) + 5 })
      .eq("id", userId);
    return NextResponse.json({ message: "+5 crédits accordés" });
  }

  if (action === "make_pro") {
    await (admin.from("profiles") as any)
      .update({ is_pro: true })
      .eq("id", userId);
    return NextResponse.json({ message: "Utilisateur passé Pro" });
  }

  if (action === "send_email") {
    // Placeholder — integrate Resend here when ready
    return NextResponse.json({
      message: "Fonctionnalité email à configurer (Resend)",
    });
  }

  return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
}
