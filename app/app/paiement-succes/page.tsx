import Link from "next/link";
import type { Metadata } from "next";
import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Paiement réussi — LettreMagique",
};

async function applySession(sessionId: string, userId: string) {
  const admin = getSupabaseAdmin();

  // Idempotence : ne traiter qu'une seule fois
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existing } = await (admin.from("applied_payment_sessions") as any)
    .select("session_id")
    .eq("session_id", sessionId)
    .single();

  if (existing) return;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid" && session.mode !== "subscription") return;
  if (session.metadata?.user_id !== userId) return;

  if (session.mode === "subscription") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (admin.from("profiles") as any).update({
      is_pro: true,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: session.subscription as string,
    }).eq("id", userId);
  } else if (session.mode === "payment") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profile } = await (admin.from("profiles") as any)
      .select("credits")
      .eq("id", userId)
      .single();
    const currentCredits = (profile?.credits ?? 0) as number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (admin.from("profiles") as any)
      .update({ credits: currentCredits + 1 })
      .eq("id", userId);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (admin.from("applied_payment_sessions") as any)
    .insert({ session_id: sessionId, user_id: userId });
}

export default async function PaiementSuccesPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let isSubscription = false;

  if (session_id) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      const session = await stripe.checkout.sessions.retrieve(session_id);
      isSubscription = session.mode === "subscription";

      if (user) {
        await applySession(session_id, user.id);
      }
    } catch {
      // fallback silencieux
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-16"
      style={{ background: "var(--paper)" }}
    >
      <div className="w-full max-w-[480px] text-center">
        <div
          className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-3xl border-[2px]"
          style={{ borderColor: "var(--green)", background: "var(--white-warm)" }}
        >
          ✓
        </div>

        <div
          className="text-[11px] uppercase tracking-[3px] mb-4"
          style={{ fontFamily: "var(--font-dm-mono)", color: "var(--green)" }}
        >
          Paiement confirmé
        </div>

        {isSubscription ? (
          <>
            <h1
              className="text-[32px] font-extrabold tracking-[-1px] leading-[1.1] mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Vous êtes maintenant{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-lora)", fontWeight: 500 }}>
                Pro
              </em>
            </h1>
            <p
              className="text-base leading-[1.7] mb-8"
              style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
            >
              Votre accès illimité est activé. Générez autant de courriers que vous le souhaitez.
            </p>
          </>
        ) : (
          <>
            <h1
              className="text-[32px] font-extrabold tracking-[-1px] leading-[1.1] mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Votre{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-lora)", fontWeight: 500 }}>
                crédit
              </em>{" "}
              est activé
            </h1>
            <p
              className="text-base leading-[1.7] mb-8"
              style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
            >
              Votre crédit a été ajouté à votre compte. Vous pouvez maintenant générer votre courrier.
            </p>
          </>
        )}

        <Link
          href="/generateur"
          className="inline-flex items-center gap-2.5 px-10 py-4 text-sm font-bold text-white uppercase tracking-[0.5px] no-underline transition-all duration-200"
          style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
        >
          Générer un courrier →
        </Link>

        <p className="mt-6">
          <Link
            href="/compte"
            className="text-[11px] no-underline"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
          >
            Voir mon compte
          </Link>
        </p>
      </div>
    </div>
  );
}
