import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { session_id } = await req.json();

  if (!session_id) {
    return Response.json({ error: "Missing session_id" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const admin = getSupabaseAdmin();

  // Vérifier si cette session a déjà été appliquée (idempotence)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existing } = await (admin.from("applied_payment_sessions") as any)
    .select("session_id")
    .eq("session_id", session_id)
    .single();

  if (existing) {
    return Response.json({ ok: true, skipped: true });
  }

  // Récupérer la session Stripe
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    return Response.json({ error: "Session Stripe introuvable" }, { status: 404 });
  }

  // Vérifier que c'est bien un paiement réussi pour cet utilisateur
  if (session.payment_status !== "paid") {
    return Response.json({ error: "Paiement non complété" }, { status: 400 });
  }

  if (session.metadata?.user_id !== user.id) {
    return Response.json({ error: "Session invalide" }, { status: 403 });
  }

  // Appliquer selon le mode
  if (session.mode === "subscription") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (admin.from("profiles") as any).update({
      is_pro: true,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: session.subscription as string,
    }).eq("id", user.id);
  } else if (session.mode === "payment") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (admin.from("profiles") as any)
      .select("credits")
      .eq("id", user.id)
      .single();
    const currentCredits = (profile?.credits ?? 0) as number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (admin.from("profiles") as any)
      .update({ credits: currentCredits + 1 })
      .eq("id", user.id);
  }

  // Marquer la session comme appliquée
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (admin.from("applied_payment_sessions") as any)
    .insert({ session_id, user_id: user.id });

  return Response.json({ ok: true });
}
