import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { priceId } = await req.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

    const session = await stripe.checkout.sessions.create({
      mode: priceId === process.env.STRIPE_PRICE_SUB ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email,
      metadata: { user_id: user.id },
      success_url: `${baseUrl}/paiement-succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/paiement-annule`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return Response.json({ error: "Erreur création session" }, { status: 500 });
  }
}
