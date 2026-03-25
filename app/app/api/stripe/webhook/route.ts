import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  const admin = getSupabaseAdmin();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;

    if (!userId) return Response.json({ ok: true });

    const isPro = session.mode === "subscription";

    await (admin.from("profiles") as any).update({
      is_pro: isPro,
      stripe_customer_id: session.customer as string | null,
      stripe_subscription_id: session.subscription as string | null,
    }).eq("id", userId);

    // Pour les achats à l'unité, incrémenter un crédit
    if (session.mode === "payment") {
      const { data: profile } = await (admin.from("profiles") as any)
        .select("credits")
        .eq("id", userId)
        .single();
      const currentCredits = (profile?.credits ?? 0) as number;
      await (admin.from("profiles") as any)
        .update({ credits: currentCredits + 1 })
        .eq("id", userId);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    await (admin.from("profiles") as any)
      .update({ is_pro: false, stripe_subscription_id: null })
      .eq("stripe_subscription_id", sub.id);
  }

  return Response.json({ ok: true });
}
