import Link from "next/link";

export default function CompteActivePage() {
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
          Compte activé
        </div>

        <h1
          className="text-[32px] font-extrabold tracking-[-1px] leading-[1.1] mb-4"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Votre compte est prêt
        </h1>

        <p
          className="text-base leading-[1.7] mb-8"
          style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
        >
          Email confirmé avec succès. Vous pouvez maintenant générer votre
          premier courrier — <strong style={{ color: "var(--ink)" }}>gratuitement</strong>.
        </p>

        <Link
          href="/generateur"
          className="inline-flex items-center gap-2.5 px-10 py-4 text-sm font-bold text-white uppercase tracking-[0.5px] no-underline transition-all duration-200 btn-primary"
          style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
        >
          Générer mon premier courrier →
        </Link>

        <p
          className="mt-6 text-[11px]"
          style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
        >
          Premier courrier gratuit · Aucune carte requise
        </p>
      </div>
    </div>
  );
}
