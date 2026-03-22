import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement réussi — LettreMagique",
};

export default function PaiementSuccesPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-14"
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
