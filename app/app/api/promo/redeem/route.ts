import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

type PromoCode = { code: string; credits: number; max_uses: number | null; used_count: number; active: boolean };

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code requis" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = getSupabaseAdmin() as any;
    const normalizedCode = code.trim().toUpperCase().replace(/\s/g, "");

    // Chercher le code
    const { data: promo, error: promoErr } = await db
      .from("promo_codes")
      .select("*")
      .eq("code", normalizedCode)
      .eq("active", true)
      .single() as { data: PromoCode | null; error: unknown };

    if (promoErr || !promo) {
      return NextResponse.json({ error: "Code invalide ou expiré" }, { status: 400 });
    }

    if (promo.max_uses !== null && promo.used_count >= promo.max_uses) {
      return NextResponse.json({ error: "Ce code a atteint sa limite d'utilisation" }, { status: 400 });
    }

    // Vérifier si l'utilisateur a déjà utilisé ce code
    const { data: existing } = await db
      .from("promo_redemptions")
      .select("id")
      .eq("user_id", user.id)
      .eq("code", promo.code)
      .maybeSingle() as { data: { id: string } | null };

    if (existing) {
      return NextResponse.json({ error: "Vous avez déjà utilisé ce code" }, { status: 400 });
    }

    // Récupérer les crédits actuels
    const { data: profile } = await db
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single() as { data: { credits: number } | null };

    const currentCredits = profile?.credits ?? 0;

    // Appliquer les crédits
    await db.from("profiles").update({ credits: currentCredits + promo.credits }).eq("id", user.id);

    // Enregistrer la rédemption
    await db.from("promo_redemptions").insert({ user_id: user.id, code: promo.code });

    // Incrémenter le compteur d'utilisation
    await db.from("promo_codes").update({ used_count: promo.used_count + 1 }).eq("code", promo.code);

    return NextResponse.json({ success: true, credits_added: promo.credits });
  } catch (err) {
    console.error("Promo redeem error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
