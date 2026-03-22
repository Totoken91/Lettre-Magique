import Link from "next/link";
import { LETTER_TYPES } from "@/data/letter-types";
import WaitlistForm from "@/components/landing/WaitlistForm";

export default function Home() {
  return (
    <div className="pt-14">

      {/* ═══ HERO ═══ */}
      <section
        className="relative overflow-hidden px-16 pt-[140px] pb-[88px]"
        style={{ background: "var(--ink)", color: "var(--white-warm)" }}
      >
        {/* Dashed bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)",
          }}
        />

        <div className="max-w-[980px] mx-auto relative">
          {/* Bg text fantôme */}
          <div
            className="absolute right-[-30px] top-[-50px] pointer-events-none select-none leading-[0.85]"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "240px",
              color: "#111",
              letterSpacing: "-12px",
            }}
            aria-hidden
          >
            LM
          </div>

          <div
            className="text-[11px] uppercase tracking-[3px] mb-7 animate-fade-up-1"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
          >
            Courriers administratifs générés par IA
          </div>

          <h1
            className="font-extrabold leading-[0.92] tracking-[-3px] mb-7 relative z-10 animate-fade-up-2"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              color: "var(--white-warm)",
            }}
          >
            Votre courrier
            <br />
            rédigé en
            <br />
            <em
              style={{
                color: "var(--accent)",
                fontStyle: "italic",
                fontFamily: "var(--font-lora)",
                fontWeight: 500,
              }}
            >
              2 minutes
            </em>
          </h1>

          <p
            className="text-lg max-w-[500px] leading-[1.7] mb-11 animate-fade-up-3"
            style={{ fontFamily: "var(--font-lora)", color: "#888" }}
          >
            Résiliation, réclamation, mise en demeure, contestation — répondez
            à 3 questions, obtenez un courrier professionnel personnalisé.
            Export PDF immédiat.
          </p>

          <div className="flex gap-4 items-center flex-wrap animate-fade-up-4">
            <Link
              href="#waitlist"
              className="btn-primary inline-flex items-center gap-2.5 px-9 py-4 text-sm font-bold text-white uppercase tracking-[0.5px] no-underline transition-all duration-200"
              style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
            >
              Essayer gratuitement →
            </Link>
            <Link
              href="#comment"
              className="px-7 py-4 text-sm font-semibold transition-colors duration-200 no-underline"
              style={{
                fontFamily: "var(--font-syne)",
                background: "transparent",
                color: "#666",
                border: "1.5px solid #333",
              }}
            >
              Voir comment ça marche
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex gap-12 flex-wrap mt-16 pt-10"
            style={{ borderTop: "1px solid #222" }}
          >
            {[
              { val: "2 min", label: "Au lieu de 30 minutes" },
              { val: "1er", label: "Courrier gratuit" },
              { val: "PDF", label: "Prêt à envoyer" },
              { val: "100%", label: "Personnalisé par IA" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-4xl font-extrabold leading-none tracking-[-1px]"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-[10px] uppercase tracking-[1.5px] mt-1.5"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "#555" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATÉGORIES ═══ */}
      <section
        className="px-16 py-10 reveal"
        style={{
          background: "var(--white-warm)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="max-w-[980px] mx-auto">
          <div
            className="text-[10px] uppercase tracking-[2px] mb-5"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
          >
            Types de courriers disponibles
          </div>
          <div
            className="grid grid-cols-5 gap-[2px] border-[2px]"
            style={{ borderColor: "var(--ink)" }}
          >
            {LETTER_TYPES.slice(0, 5).map((type) => (
              <Link
                key={type.id}
                href={`/generateur/${type.id}`}
                className="block px-[18px] py-5 text-center transition-colors duration-200 no-underline cat-card"
                style={{ background: "var(--paper)" }}
              >
                <div className="text-2xl mb-2">{type.emoji}</div>
                <div
                  className="text-[13px] font-bold mb-1"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
                >
                  {type.name}
                </div>
                <div
                  className="text-[10px]"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
                >
                  {type.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 01 — POURQUOI C'EST PÉNIBLE ═══ */}
      <section className="px-16 py-20 reveal">
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-baseline gap-5 mb-12">
            <span
              className="text-[11px] font-medium"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
            >
              01
            </span>
            <h2
              className="text-[clamp(26px,3.5vw,34px)] font-extrabold tracking-[-1px] leading-[1.1]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Pourquoi c&apos;est{" "}
              <span style={{ color: "var(--accent)" }}>pénible</span> aujourd&apos;hui
            </h2>
          </div>

          <div
            className="grid grid-cols-2 border-[2px] overflow-hidden"
            style={{ borderColor: "var(--ink)" }}
          >
            <div
              className="p-9"
              style={{ background: "var(--paper2)", borderRight: "2px solid var(--ink)" }}
            >
              <div
                className="text-[9px] uppercase tracking-[2px] mb-5 opacity-50"
                style={{ fontFamily: "var(--font-dm-mono)" }}
              >
                Aujourd&apos;hui — 30 minutes de galère
              </div>
              {[
                "Chercher un modèle sur Google pendant 10 minutes",
                "Trouver un template générique qui ne correspond pas à votre cas",
                "Copier-coller dans Word, adapter maladroitement",
                "Se demander si les mentions légales sont à jour",
                "Stresser sur le ton — trop agressif ? trop mou ?",
                "Exporter en PDF, chercher l'adresse du destinataire",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 text-sm mb-3.5 leading-[1.5]"
                  style={{ color: "var(--muted-lm)" }}
                >
                  <span className="shrink-0 mt-[2px]">✗</span>
                  {item}
                </div>
              ))}
            </div>
            <div
              className="p-9"
              style={{ background: "var(--ink)", color: "var(--white-warm)" }}
            >
              <div
                className="text-[9px] uppercase tracking-[2px] mb-5"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--gold)" }}
              >
                Avec LettreMagique — 2 minutes
              </div>
              {[
                "Choisir le type de courrier",
                "Répondre à 3-4 questions simples",
                "L'IA génère un courrier personnalisé avec les bonnes mentions",
                "Télécharger le PDF prêt à envoyer",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 text-sm mb-3.5 leading-[1.5]"
                  style={{ color: "#ccc" }}
                >
                  <span className="shrink-0 mt-[2px]" style={{ color: "var(--green)" }}>
                    ✓
                  </span>
                  {item}
                </div>
              ))}
              <div
                className="flex items-start gap-2.5 text-sm mt-5 font-bold"
                style={{ color: "var(--gold)", fontFamily: "var(--font-syne)" }}
              >
                C&apos;est tout.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 02 — COMMENT ÇA MARCHE ═══ */}
      <section
        id="comment"
        className="px-16 py-20"
        style={{
          background: "var(--white-warm)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-baseline gap-5 mb-12 reveal">
            <span
              className="text-[11px] font-medium"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
            >
              02
            </span>
            <h2
              className="text-[clamp(26px,3.5vw,34px)] font-extrabold tracking-[-1px] leading-[1.1]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Simple comme{" "}
              <span style={{ color: "var(--accent)" }}>3 clics</span>
            </h2>
          </div>

          <div className="relative mt-12 reveal">
            <div
              className="absolute left-[24px] top-0 bottom-0 w-[2px]"
              style={{ background: "var(--rule)" }}
            />
            {[
              {
                num: "1",
                color: "var(--ink)",
                tag: "Choix",
                title: "Choisissez le type de courrier",
                desc: "Résiliation, réclamation, mise en demeure, contestation, demande… 10 catégories couvrent 95% des besoins administratifs du quotidien.",
                badge: null,
              },
              {
                num: "2",
                color: "var(--accent)",
                tag: "Questions",
                title: "Répondez à 3-4 questions",
                desc: "Qui est le destinataire ? Quel est le motif ? Depuis quand ? Le formulaire s'adapte selon le type de courrier — jamais plus de 4 questions.",
                badge: "→ Moins de 60 secondes",
              },
              {
                num: "3",
                color: "var(--green)",
                tag: "Résultat",
                title: "Téléchargez votre PDF",
                desc: "Un courrier professionnel, personnalisé, avec les mentions légales à jour, en PDF prêt à imprimer ou envoyer. Formules de politesse incluses. Ton adapté à la situation.",
                badge: "→ Prêt à envoyer en recommandé",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-7 mb-10 relative">
                <div
                  className="shrink-0 w-[50px] h-[50px] rounded-full flex items-center justify-center text-sm font-extrabold relative z-10 text-white"
                  style={{
                    fontFamily: "var(--font-syne)",
                    background: step.color,
                    border: "3px solid var(--paper)",
                  }}
                >
                  {step.num}
                </div>
                <div className="flex-1 pt-2">
                  <div
                    className="text-[10px] uppercase tracking-[2px] mb-1"
                    style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
                  >
                    {step.tag}
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-[1.65]" style={{ color: "#555" }}>
                    {step.desc}
                  </p>
                  {step.badge && (
                    <div
                      className="inline-block text-[11px] px-3 py-1 mt-2.5 font-medium"
                      style={{
                        fontFamily: "var(--font-dm-mono)",
                        background: "var(--paper2)",
                        color: "var(--green)",
                      }}
                    >
                      {step.badge}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 03 — EXEMPLES ═══ */}
      <section id="exemples" className="px-16 py-20 reveal">
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-baseline gap-5 mb-4">
            <span
              className="text-[11px] font-medium"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
            >
              03
            </span>
            <h2
              className="text-[clamp(26px,3.5vw,34px)] font-extrabold tracking-[-1px] leading-[1.1]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Exemples de courriers{" "}
              <span style={{ color: "var(--accent)" }}>générés</span>
            </h2>
          </div>

          <p
            className="text-[15px] mb-12"
            style={{ color: "var(--muted-lm)", fontFamily: "var(--font-lora)" }}
          >
            Chaque courrier est unique, personnalisé à votre situation, avec les
            références légales pertinentes.
          </p>

          <div
            className="grid grid-cols-3 gap-[2px] border-[2px]"
            style={{ background: "var(--rule)", borderColor: "var(--ink)" }}
          >
            {[
              {
                type: "Résiliation",
                title: "Résiliation forfait Free Mobile",
                desc: "Avec mention loi Chatel, numéro de ligne, date d'effet souhaitée et demande de RIO.",
                time: "Généré en 45 secondes",
                href: "/generateur/resiliation",
              },
              {
                type: "Réclamation",
                title: "Réclamation facture EDF erronée",
                desc: "Mention du relevé de compteur, demande de rectification et remboursement du trop-perçu.",
                time: "Généré en 50 secondes",
                href: "/generateur/reclamation",
              },
              {
                type: "Mise en demeure",
                title: "Mise en demeure remboursement",
                desc: "Rappel des obligations contractuelles, délai de 15 jours, mention des pénalités de retard.",
                time: "Généré en 55 secondes",
                href: "/generateur/mise-en-demeure",
              },
              {
                type: "Contestation",
                title: "Contestation amende SNCF",
                desc: "Circonstances détaillées, référence du PV, demande d'annulation ou de réduction.",
                time: "Généré en 40 secondes",
                href: "/generateur/contestation",
              },
              {
                type: "Résiliation",
                title: "Résiliation assurance habitation",
                desc: "Loi Hamon applicable, numéro de contrat, demande de remboursement du prorata.",
                time: "Généré en 50 secondes",
                href: "/generateur/resiliation",
              },
              {
                type: "Demande",
                title: "Demande de délai de paiement",
                desc: "Exposé de la situation, proposition d'échéancier, engagement de bonne foi.",
                time: "Généré en 45 secondes",
                href: "/generateur/delai-paiement",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="block p-6 transition-colors duration-200 no-underline seo-card"
                style={{ background: "var(--white-warm)" }}
              >
                <div
                  className="text-[9px] uppercase tracking-[1.5px] mb-2"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
                >
                  {card.type}
                </div>
                <div
                  className="text-[15px] font-bold mb-1.5 leading-[1.3]"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
                >
                  {card.title}
                </div>
                <div
                  className="text-[13px] leading-[1.5] mb-2.5"
                  style={{ color: "var(--muted-lm)" }}
                >
                  {card.desc}
                </div>
                <div
                  className="text-[11px] font-medium"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--green)" }}
                >
                  {card.time}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 04 — TARIFS ═══ */}
      <section
        id="tarifs"
        className="px-16 py-20"
        style={{
          background: "var(--white-warm)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="max-w-[980px] mx-auto reveal">
          <div className="flex items-baseline gap-5 mb-12">
            <span
              className="text-[11px] font-medium"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
            >
              04
            </span>
            <h2
              className="text-[clamp(26px,3.5vw,34px)] font-extrabold tracking-[-1px] leading-[1.1]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Un courrier coûte moins cher{" "}
              <span style={{ color: "var(--accent)" }}>qu&apos;un timbre</span>
            </h2>
          </div>

          <div
            className="grid grid-cols-2 border-[2px] max-w-[700px]"
            style={{ borderColor: "var(--ink)" }}
          >
            {/* Plan à l'unité */}
            <div
              className="p-10 relative"
              style={{ borderRight: "2px solid var(--ink)" }}
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
                <small
                  className="text-base font-normal"
                  style={{ color: "var(--muted-lm)" }}
                >
                  / courrier
                </small>
              </div>
              <p
                className="text-sm mb-6 leading-[1.5]"
                style={{ color: "var(--muted-lm)" }}
              >
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
                  <li key={f} className="before:content-['✓_'] before:font-bold" style={{ color: "var(--ink)" }}>
                    <span style={{ color: "var(--green)", marginRight: 8 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Plan illimité */}
            <div
              className="p-10 relative"
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
                  "Modèles favoris",
                  "Support prioritaire",
                ].map((f) => (
                  <li key={f} style={{ color: "#ccc" }}>
                    <span style={{ color: "var(--gold)", marginRight: 8 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PULL QUOTE (social proof) ═══ */}
      <section className="px-16 py-16 reveal">
        <div className="max-w-[980px] mx-auto">
          <blockquote
            className="px-8 py-6"
            style={{ borderLeft: "4px solid var(--accent)", background: "var(--paper2)" }}
          >
            <p
              className="text-xl leading-[1.5] m-0"
              style={{
                fontFamily: "var(--font-lora)",
                fontStyle: "italic",
                color: "var(--ink)",
              }}
            >
              « J&apos;ai récupéré 400€ de trop-perçu sur ma facture d&apos;électricité grâce
              à un courrier de réclamation bien rédigé. Ça m&apos;a pris 2 minutes au
              lieu d&apos;une heure. »
            </p>
            <cite
              className="block text-[10px] uppercase tracking-[1.5px] mt-3"
              style={{
                fontFamily: "var(--font-dm-mono)",
                color: "var(--muted-lm)",
                fontStyle: "normal",
              }}
            >
              — Le type de retour qu&apos;on veut générer chez nos utilisateurs
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ═══ WAITLIST ═══ */}
      <section
        id="waitlist"
        className="relative px-16 py-[100px] text-center"
        style={{ background: "var(--ink)" }}
      >
        {/* Dashed top border */}
        <div
          className="absolute top-0 left-0 right-0 h-[4px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)",
          }}
        />

        <div className="max-w-[540px] mx-auto">
          <div
            className="text-[11px] uppercase tracking-[3px] mb-5"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
          >
            Accès anticipé
          </div>
          <h2
            className="font-extrabold tracking-[-1.5px] leading-[1.1] mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--white-warm)",
            }}
          >
            Votre premier courrier
            <br />
            est{" "}
            <em
              style={{
                color: "var(--accent)",
                fontStyle: "italic",
                fontFamily: "var(--font-lora)",
                fontWeight: 500,
              }}
            >
              gratuit
            </em>
          </h2>
          <p
            className="text-base mb-9 leading-[1.7]"
            style={{ fontFamily: "var(--font-lora)", color: "#777" }}
          >
            LettreMagique est en cours de lancement. Inscrivez-vous pour être
            prévenu et recevoir votre premier courrier offert.
          </p>

          <WaitlistForm />

          <div
            className="mt-4 text-[10px] uppercase tracking-[1px]"
            style={{ fontFamily: "var(--font-dm-mono)", color: "#444" }}
          >
            Gratuit · 1er courrier offert · Aucun engagement
          </div>
        </div>
      </section>

    </div>
  );
}
