import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs — LettreMagique",
  description: "1er courrier gratuit, puis 1,99€ à l'unité ou 4,99€/mois illimité.",
};

export default function TarifsPage() {
  return (
    <div className="pt-14">
      <section
        className="relative overflow-hidden px-4 md:px-16 py-10 md:py-16"
        style={{ background: "var(--ink)", color: "var(--white-warm)" }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)",
          }}
        />
        <div className="max-w-[980px] mx-auto">
          <h1
            className="font-extrabold leading-[0.92] tracking-[-2px]"
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Un courrier coûte moins cher{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-lora)", fontWeight: 500 }}>
              qu&apos;un timbre
            </em>
          </h1>
          <p className="mt-4 text-base leading-[1.7]" style={{ fontFamily: "var(--font-lora)", color: "#888" }}>
            Premier courrier 100% gratuit. Sans carte bancaire.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-16 py-12 md:py-20">
        <div className="max-w-[700px] mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 border-[2px]"
            style={{ borderColor: "var(--ink)" }}
          >
            {/* Plan à l'unité */}
            <div
              className="p-8 md:p-10 relative border-b-[2px] md:border-b-0 md:border-r-[2px]"
              style={{ borderColor: "var(--ink)" }}
            >
              <div
                className="text-[10px] uppercase tracking-[2px] mb-2.5"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
              >
                À l&apos;unité
              </div>
              <div
                className="text-5xl font-extrabold tracking-[-2px] leading-none mb-1"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                1,99€{" "}
                <small className="text-base font-normal" style={{ color: "var(--muted-lm)" }}>
                  / courrier
                </small>
              </div>
              <p className="text-sm mb-6 leading-[1.5]" style={{ color: "var(--muted-lm)" }}>
                Payez uniquement quand vous en avez besoin. Pas d&apos;abonnement.
              </p>
              <ul style={{ listStyle: "none", fontSize: "14px", lineHeight: "2.2" }}>
                {[
                  "1er courrier gratuit",
                  "Courrier personnalisé par IA",
                  "Export PDF immédiat",
                  "Mentions légales à jour",
                  "Tous types de courriers",
                ].map((f) => (
                  <li key={f} style={{ color: "var(--ink)" }}>
                    <span style={{ color: "var(--green)", marginRight: 8 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/generateur"
                className="mt-8 block text-center py-3.5 text-sm font-bold uppercase tracking-[0.5px] text-white no-underline transition-all duration-200"
                style={{ fontFamily: "var(--font-syne)", background: "var(--ink)" }}
              >
                Commencer →
              </Link>
            </div>

            {/* Plan illimité */}
            <div
              className="p-8 md:p-10 relative"
              style={{ background: "var(--ink)", color: "var(--white-warm)" }}
            >
              <div
                className="absolute top-[-12px] left-1/2 -translate-x-1/2 text-white text-[9px] uppercase tracking-[1.5px] px-3.5 py-1 whitespace-nowrap"
                style={{ fontFamily: "var(--font-dm-mono)", background: "var(--accent)" }}
              >
                Illimité
              </div>
              <div
                className="text-[10px] uppercase tracking-[2px] mb-2.5"
                style={{ fontFamily: "var(--font-dm-mono)", color: "#555" }}
              >
                Abonnement
              </div>
              <div
                className="text-5xl font-extrabold tracking-[-2px] leading-none mb-1"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                4,99€{" "}
                <small className="text-base font-normal" style={{ color: "#555" }}>
                  / mois
                </small>
              </div>
              <p className="text-sm mb-6 leading-[1.5]" style={{ color: "#555" }}>
                Courriers illimités. Idéal si vous gérez des démarches régulières.
              </p>
              <ul style={{ listStyle: "none", fontSize: "14px", lineHeight: "2.2" }}>
                {[
                  "Courriers illimités",
                  "Tout le plan à l'unité",
                  "Historique sauvegardé",
                  "Support prioritaire",
                ].map((f) => (
                  <li key={f} style={{ color: "#ccc" }}>
                    <span style={{ color: "var(--gold)", marginRight: 8 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/generateur"
                className="mt-8 block text-center py-3.5 text-sm font-bold uppercase tracking-[0.5px] no-underline transition-all duration-200"
                style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "white" }}
              >
                Passer en Pro →
              </Link>
            </div>
          </div>

          <p
            className="text-center text-[11px] mt-6"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
          >
            Gratuit · 1er courrier offert · Aucun engagement
          </p>
        </div>
      </section>
    </div>
  );
}
