import Link from "next/link";
import { redirect } from "next/navigation";
import { LETTER_TYPES } from "@/data/letter-types";
import HeroCTA from "@/components/landing/HeroCTA";
import PromoBanner from "@/components/landing/PromoBanner";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LetterTypeIcon from "@/components/ui/LetterTypeIcon";

const TYPE_COLORS: Record<string, string> = {
  "Résiliation": "var(--accent)",
  "Réclamation": "var(--gold)",
  "Mise en demeure": "var(--green)",
  "Contestation": "#7c6fcf",
  "Demande": "#3a86ff",
};

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (session) redirect("/generateur");
  return (
    <div className="pt-16">

      {/* ═══ PROMO TOP BANNER (dynamique depuis DB) ═══ */}
      <PromoBanner />

      {/* ═══ HERO ═══ */}
      <section
        className="relative overflow-hidden px-4 md:px-16 pt-[40px] md:pt-[80px] pb-10 md:pb-[72px]"
        style={{ background: "var(--ink)", color: "var(--white-warm)" }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[4px]" style={{ background: "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)" }} />

        <div className="max-w-[980px] mx-auto relative">
          {/* Ghost bg text */}
          <div
            className="hidden md:block absolute right-[-30px] top-[-50px] pointer-events-none select-none leading-[0.85]"
            style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "240px", color: "#111", letterSpacing: "-12px" }}
            aria-hidden
          >LM</div>

          <div className="text-[11px] uppercase tracking-[3px] mb-5 animate-fade-up-1" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)" }}>
            Le courrier qui fait bouger les choses
          </div>

          <h1
            className="font-extrabold leading-[0.92] tracking-[-3px] mb-6 relative z-10 animate-fade-up-2"
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(40px, 5.5vw, 72px)", color: "var(--white-warm)" }}
          >
            Faites plier
            <br />votre assurance,
            <br />
            <em style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-lora)", fontWeight: 500 }}>
              votre opérateur.
            </em>
          </h1>

          <p className="text-lg max-w-[500px] leading-[1.7] mb-9 animate-fade-up-3" style={{ fontFamily: "var(--font-lora)", color: "var(--rule)" }}>
            Résiliation refusée ? Remboursement bloqué ? Facture erronée ?
            Générez un courrier solide et personnalisé en 30 secondes —
            sans inscription, export PDF immédiat.
          </p>

          <div className="flex gap-4 items-center flex-wrap animate-fade-up-4">
            <HeroCTA />
            <Link href="#comment" className="px-5 sm:px-7 py-4 text-sm font-semibold transition-colors duration-200 no-underline text-center" style={{ fontFamily: "var(--font-syne)", background: "transparent", color: "var(--rule)", border: "1.5px solid #444" }}>
              Comment ça marche
            </Link>
          </div>

          {/* Stats — 2×2 on mobile, 4 cols on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8" style={{ borderTop: "1px solid #222" }}>
            {[
              { val: "2 min", label: "Au lieu de 30 minutes" },
              { val: "1er", label: "Sans inscription" },
              { val: "PDF", label: "Prêt à envoyer" },
              { val: "100%", label: "Personnalisé par IA" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-extrabold leading-none tracking-[-1px]" style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}>
                  {s.val}
                </div>
                <div className="text-[12px] font-bold uppercase tracking-[1.2px] mt-2" style={{ fontFamily: "var(--font-dm-mono)", color: "#aaa" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATÉGORIES ═══ */}
      <section className="px-4 md:px-16 py-8 md:py-12 reveal" style={{ background: "var(--white-warm)", borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-[980px] mx-auto">
          <h2
            className="font-extrabold tracking-[-0.5px] mb-4 sm:mb-6"
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(18px, 2.5vw, 26px)", color: "var(--ink)" }}
          >
            Quel courrier avez-vous besoin ?
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[2px] border-[2px]" style={{ borderColor: "var(--ink)" }}>
            {LETTER_TYPES.slice(0, 5).map((type, i) => (
              <Link
                key={type.id}
                href={`/generateur/${type.id}`}
                className="block px-[18px] py-5 text-center transition-colors duration-200 no-underline cat-card"
                style={{
                  background: "var(--paper)",
                  borderLeft: i < 2 ? "3px solid var(--accent)" : undefined,
                }}
              >
                <div className="flex justify-center mb-2"><LetterTypeIcon typeId={type.id} size={22} /></div>
                <div className="text-[13px] font-bold mb-1.5" style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}>
                  {type.name}
                </div>
                <div className="text-[11px] leading-[1.4]" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                  {type.desc}
                </div>
                {i < 2 && (
                  <div className="mt-2 text-[9px] uppercase tracking-[1px]" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}>
                    ★ Populaire
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 01 — POURQUOI C'EST PÉNIBLE ═══ */}
      <section className="px-4 md:px-16 py-12 md:py-20 reveal">
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-baseline gap-3 sm:gap-5 mb-8 sm:mb-12">
            <span className="text-[11px] font-medium shrink-0" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}>01</span>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-extrabold tracking-[-1px] leading-[1.15]" style={{ fontFamily: "var(--font-syne)" }}>
              Pourquoi c&apos;est <span style={{ color: "var(--accent)" }}>pénible</span> aujourd&apos;hui
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-[2px] overflow-hidden" style={{ borderColor: "var(--ink)" }}>
            {/* Gauche — avant */}
            <div className="p-5 sm:p-6 md:p-9 border-b-[2px] md:border-b-0 md:border-r-[2px]" style={{ background: "var(--paper2)", borderColor: "var(--ink)" }}>
              <div className="text-[9px] uppercase tracking-[2px] mb-5 opacity-50" style={{ fontFamily: "var(--font-dm-mono)" }}>
                Aujourd&apos;hui — 30 minutes de galère
              </div>
              {[
                "Chercher un modèle sur Google pendant 10 minutes",
                "Copier-coller dans Word, adapter maladroitement",
                "Se demander si les mentions légales sont à jour",
                "Stresser sur le ton — trop agressif ? trop mou ?",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm mb-3.5 leading-[1.5]" style={{ color: "var(--muted-lm)" }}>
                  <span className="shrink-0 mt-[2px] font-bold" style={{ color: "var(--accent)" }}>✗</span>
                  {item}
                </div>
              ))}
            </div>
            {/* Droite — après */}
            <div className="p-5 sm:p-6 md:p-9" style={{ background: "var(--ink)", color: "var(--white-warm)" }}>
              <div className="text-[9px] uppercase tracking-[2px] mb-5" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--gold)" }}>
                Avec LettreMagique — 2 minutes
              </div>
              {[
                "Choisir le type de courrier",
                "Répondre à 3-4 questions simples",
                "L'IA génère un courrier personnalisé avec les bonnes mentions",
                "Télécharger le PDF prêt à envoyer",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm mb-3.5 leading-[1.5]" style={{ color: "#ccc" }}>
                  <span className="shrink-0 mt-[2px] font-bold" style={{ color: "var(--green)" }}>✓</span>
                  {item}
                </div>
              ))}
              <div className="flex items-start gap-2.5 mt-6 font-bold" style={{ color: "var(--gold)", fontFamily: "var(--font-syne)", fontSize: "24px", lineHeight: 1 }}>
                C&apos;est tout.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 02 — COMMENT ÇA MARCHE ═══ */}
      <section
        id="comment"
        className="px-4 md:px-16 py-12 md:py-20"
        style={{ background: "var(--white-warm)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}
      >
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-baseline gap-3 sm:gap-5 mb-8 sm:mb-10 reveal">
            <span className="text-[11px] font-medium shrink-0" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}>02</span>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-extrabold tracking-[-1px] leading-[1.15]" style={{ fontFamily: "var(--font-syne)" }}>
              Simple comme <span style={{ color: "var(--accent)" }}>3 clics</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px reveal" style={{ background: "var(--rule)" }}>
            {[
              {
                num: 1,
                numColor: "var(--ink)",
                tag: "Choisissez",
                title: "Le type de courrier",
                desc: "Résiliation, réclamation, mise en demeure… 10 catégories, tous les cas du quotidien.",
              },
              {
                num: 2,
                numColor: "var(--accent)",
                tag: "Répondez",
                title: "À 3-4 questions",
                desc: "Destinataire, motif, contexte. Le formulaire s'adapte — jamais plus de 4 champs.",
              },
              {
                num: 3,
                numColor: "var(--green)",
                tag: "Téléchargez",
                title: "Votre PDF prêt à envoyer",
                desc: "Mise en page professionnelle, mentions légales, formules de politesse. Prêt pour recommandé.",
              },
            ].map((step) => (
              <div key={step.num} className="flex flex-col gap-4 p-7 md:p-8 relative overflow-hidden" style={{ background: "var(--white-warm)" }}>
                {/* Giant number watermark */}
                <div
                  className="absolute right-4 top-2 leading-none select-none pointer-events-none"
                  style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "96px", color: step.numColor, opacity: 0.08 }}
                  aria-hidden
                >
                  {step.num}
                </div>
                {/* Visible number */}
                <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "80px", lineHeight: 1, color: step.numColor, opacity: 0.18 }}>
                  {step.num}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[2px] mb-1" style={{ fontFamily: "var(--font-dm-mono)", color: step.numColor }}>
                    {step.tag}
                  </div>
                  <h3 className="font-bold leading-[1.2]" style={{ fontFamily: "var(--font-syne)", fontSize: "20px" }}>
                    {step.title}
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.6]" style={{ color: "#666" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 03 — EXEMPLES ═══ */}
      <section id="exemples" className="px-4 md:px-16 py-12 md:py-20 reveal">
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-baseline gap-3 sm:gap-5 mb-4">
            <span className="text-[11px] font-medium shrink-0" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}>03</span>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-extrabold tracking-[-1px] leading-[1.15]" style={{ fontFamily: "var(--font-syne)" }}>
              Exemples de courriers <span style={{ color: "var(--accent)" }}>générés</span>
            </h2>
          </div>

          <p className="text-[15px] mb-12" style={{ color: "var(--muted-lm)", fontFamily: "var(--font-lora)" }}>
            Chaque courrier est unique, personnalisé à votre situation, avec les références légales pertinentes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] border-[2px]" style={{ background: "var(--rule)", borderColor: "var(--ink)" }}>
            {[
              { type: "Résiliation", title: "Résiliation forfait Free Mobile", desc: "Avec mention loi Chatel, numéro de ligne, date d'effet souhaitée et demande de RIO.", time: "Généré en 45 secondes", href: "/generateur/resiliation" },
              { type: "Réclamation", title: "Réclamation facture EDF erronée", desc: "Mention du relevé de compteur, demande de rectification et remboursement du trop-perçu.", time: "Généré en 50 secondes", href: "/generateur/reclamation" },
              { type: "Mise en demeure", title: "Mise en demeure remboursement", desc: "Rappel des obligations contractuelles, délai de 15 jours, mention des pénalités de retard.", time: "Généré en 55 secondes", href: "/generateur/mise-en-demeure" },
              { type: "Contestation", title: "Contestation amende SNCF", desc: "Circonstances détaillées, référence du PV, demande d'annulation ou de réduction.", time: "Généré en 40 secondes", href: "/generateur/contestation" },
              { type: "Résiliation", title: "Résiliation assurance habitation", desc: "Loi Hamon applicable, numéro de contrat, demande de remboursement du prorata.", time: "Généré en 50 secondes", href: "/generateur/resiliation" },
              { type: "Demande", title: "Demande de délai de paiement", desc: "Exposé de la situation, proposition d'échéancier, engagement de bonne foi.", time: "Généré en 45 secondes", href: "/generateur/delai-paiement" },
            ].map((card) => (
              <Link key={card.title} href={card.href} className="block p-6 transition-colors duration-200 no-underline seo-card" style={{ background: "var(--white-warm)" }}>
                <div
                  className="text-[10px] uppercase tracking-[1.5px] mb-2 font-bold"
                  style={{ fontFamily: "var(--font-dm-mono)", color: TYPE_COLORS[card.type] ?? "var(--accent)" }}
                >
                  {card.type}
                </div>
                <div className="text-[15px] font-bold mb-1.5 leading-[1.3]" style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}>
                  {card.title}
                </div>
                <div className="text-[13px] leading-[1.5] mb-3" style={{ color: "var(--muted-lm)" }}>
                  {card.desc}
                </div>
                <div className="text-[13px] font-medium" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--green)" }}>
                  ⚡ {card.time}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 04 — TARIFS ═══ */}
      <section id="tarifs" className="px-4 md:px-16 py-12 md:py-20" style={{ background: "var(--white-warm)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="max-w-[980px] mx-auto reveal">
          <div className="flex items-baseline gap-3 sm:gap-5 mb-6 sm:mb-8">
            <span className="text-[11px] font-medium shrink-0" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}>04</span>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-extrabold tracking-[-1px] leading-[1.15]" style={{ fontFamily: "var(--font-syne)" }}>
              Un courrier coûte moins cher <span style={{ color: "var(--accent)" }}>qu&apos;un timbre</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-[2px]" style={{ borderColor: "var(--ink)", maxWidth: 800 }}>
            {/* Plan à l'unité */}
            <div className="p-5 sm:p-8 md:p-10 relative border-b-[2px] md:border-b-0 md:border-r-[2px] flex flex-col" style={{ borderColor: "var(--ink)" }}>
              <div className="text-[10px] uppercase tracking-[2px] mb-2.5" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                À l&apos;unité
              </div>
              <div className="font-extrabold tracking-[-2px] leading-none mb-1" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(40px, 8vw, 56px)" }}>
                1,99€{" "}
                <small className="text-base font-normal" style={{ color: "var(--muted-lm)" }}>/ courrier</small>
              </div>
              <p className="text-sm mb-6 leading-[1.5]" style={{ color: "var(--muted-lm)" }}>
                Payez uniquement quand vous en avez besoin. Pas d&apos;abonnement.
              </p>
              <div className="flex-1" style={{ fontSize: "15px", lineHeight: "2.2" }}>
                {["Courrier personnalisé par IA", "Export PDF immédiat", "Mentions légales à jour", "Tous types de courriers"].map((f) => (
                  <div key={f} style={{ color: "var(--ink)" }}>
                    <span style={{ color: "var(--green)", marginRight: 8 }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <Link href="/generateur" className="mt-6 block text-center px-6 py-3 text-sm font-bold uppercase tracking-[0.5px] no-underline transition-all" style={{ fontFamily: "var(--font-syne)", background: "var(--ink)", color: "var(--white-warm)" }}>
                Générer un courrier →
              </Link>
            </div>

            {/* Plan illimité */}
            <div className="p-5 sm:p-8 md:p-10 relative flex flex-col" style={{ background: "var(--ink)", color: "var(--white-warm)" }}>
              <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 text-white uppercase whitespace-nowrap z-10" style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "1.5px", background: "var(--accent)", padding: "8px 16px" }}>
                Illimité
              </div>
              <div className="text-[10px] uppercase tracking-[2px] mb-2.5" style={{ fontFamily: "var(--font-dm-mono)", color: "#555" }}>
                Abonnement
              </div>
              <div className="font-extrabold tracking-[-2px] leading-none mb-1" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(40px, 8vw, 56px)" }}>
                4,99€{" "}
                <small className="text-base font-normal" style={{ color: "#555" }}>/ mois</small>
              </div>
              <p className="text-sm mb-6 leading-[1.5]" style={{ color: "#555" }}>
                Courriers illimités. Idéal si vous gérez des démarches régulières.
              </p>
              <div className="flex-1" style={{ fontSize: "15px", lineHeight: "2.2" }}>
                {["Courriers illimités", "Tout le plan à l'unité", "Historique sauvegardé", "Modèles favoris", "Support prioritaire"].map((f) => (
                  <div key={f} style={{ color: "#ccc" }}>
                    <span style={{ color: "var(--gold)", marginRight: 8 }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <Link href="/tarifs" className="mt-6 block text-center px-6 py-3 text-sm font-bold uppercase tracking-[0.5px] text-white no-underline transition-all" style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}>
                Choisir ce plan →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="px-4 md:px-16 reveal" style={{ background: "var(--ink)" }}>
        <div className="max-w-[980px] mx-auto">
          <blockquote
            className="relative px-6 sm:px-10 md:px-16 overflow-hidden"
            style={{ borderLeft: "4px solid var(--accent)", paddingTop: 48, paddingBottom: 48 }}
          >
            {/* Guillemets décoratifs */}
            <div
              className="absolute left-8 top-4 leading-none select-none pointer-events-none"
              style={{ fontFamily: "var(--font-lora)", fontSize: "120px", color: "var(--accent)", opacity: 0.15, lineHeight: 1 }}
              aria-hidden
            >"</div>
            <p
              className="relative z-10 m-0 font-bold leading-[1.5]"
              style={{ fontFamily: "var(--font-lora)", fontStyle: "italic", color: "#fdfaf4", fontSize: "20px" }}
            >
              « J&apos;ai récupéré 400€ de trop-perçu sur ma facture d&apos;électricité grâce
              à un courrier de réclamation bien rédigé. Ça m&apos;a pris 2 minutes au lieu d&apos;une heure. »
            </p>
            <cite
              className="block mt-4"
              style={{ fontFamily: "var(--font-dm-mono)", fontSize: "14px", color: "#777", fontStyle: "normal", letterSpacing: "1px" }}
            >
              — Le type de retour qu&apos;on veut générer chez nos utilisateurs
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="relative px-4 md:px-16 py-16 md:py-[100px] text-center" style={{ background: "var(--ink)" }}>
        <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)" }} />

        <div className="max-w-[540px] mx-auto">
          <div className="text-[11px] uppercase tracking-[3px] mb-5" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)" }}>
            Essayez maintenant — sans inscription
          </div>
          <h2
            className="font-extrabold tracking-[-1.5px] leading-[1.1] mb-4"
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px, 5vw, 48px)", color: "var(--white-warm)" }}
          >
            Votre premier courrier
            <br />est{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-lora)", fontWeight: 500 }}>
              gratuit
            </em>
          </h2>
          <p className="text-base mb-9 leading-[1.7]" style={{ fontFamily: "var(--font-lora)", color: "#777" }}>
            Générez votre premier courrier professionnel maintenant.
            Aucun compte requis, aucune carte bancaire. Résultat en 30 secondes.
          </p>

          <div className="flex flex-col gap-4 items-center">
            <Link
              href="/generateur"
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-12 py-5 font-bold text-white uppercase tracking-[0.5px] no-underline transition-all duration-200"
              style={{ fontFamily: "var(--font-syne)", fontSize: "15px", background: "var(--accent)" }}
            >
              Générer un courrier →
            </Link>
            <Link
              href="/login"
              className="text-sm no-underline transition-colors duration-200"
              style={{ fontFamily: "var(--font-syne)", color: "#666", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              J&apos;ai déjà un compte
            </Link>
          </div>

          <div className="mt-6 text-[10px] uppercase tracking-[1px]" style={{ fontFamily: "var(--font-dm-mono)", color: "#888" }}>
            Gratuit · Sans inscription · Aucun engagement
          </div>
        </div>
      </section>

    </div>
  );
}
