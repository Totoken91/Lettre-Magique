import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpen, PenLine, Bot, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Comment ça marche — LettreMagique",
  description:
    "Découvrez comment générer un courrier administratif professionnel en 3 étapes simples avec LettreMagique. Résiliation, réclamation, mise en demeure — PDF prêt en 2 minutes.",
};

const steps = [
  {
    num: "01",
    icon: "folder",
    accent: "var(--ink)",
    tag: "Choisissez",
    title: "Le type de courrier",
    desc: "Résiliation, réclamation, mise en demeure, contestation, demande de remboursement… Nous couvrons plus de 10 catégories de courriers administratifs du quotidien.",
    details: [
      "Résiliation de contrat (téléphonie, assurance, salle de sport…)",
      "Réclamation suite à un litige ou une erreur de facturation",
      "Mise en demeure avec mention des obligations légales",
      "Contestation d'amende ou de décision administrative",
      "Demande de délai de paiement ou d'échéancier",
      "Et bien d'autres situations courantes",
    ],
  },
  {
    num: "02",
    icon: "pen",
    accent: "var(--accent)",
    tag: "Répondez",
    title: "À 3-4 questions simples",
    desc: "Le formulaire s'adapte au type de courrier. Jamais plus de 4 champs à remplir. Vos coordonnées sont pré-remplies si vous avez un compte.",
    details: [
      "Nom et adresse de l'expéditeur",
      "Destinataire du courrier",
      "Motif précis et contexte de votre situation",
      "Références utiles (numéro de contrat, facture…)",
    ],
  },
  {
    num: "03",
    icon: "bot",
    accent: "var(--accent)",
    tag: "L'IA rédige",
    title: "Votre courrier personnalisé",
    desc: "Claude, l'IA d'Anthropic, génère un courrier sur-mesure en quelques secondes. Le texte intègre automatiquement les formules de politesse, les références légales applicables et vos informations personnelles.",
    details: [
      "Ton formel et professionnel adapté au contexte",
      "Références aux lois applicables (Chatel, Hamon, Code de la consommation…)",
      "Formules de politesse appropriées",
      "Aucun placeholder — tout est déjà rempli",
    ],
  },
  {
    num: "04",
    icon: "file",
    accent: "var(--green)",
    tag: "Téléchargez",
    title: "Votre PDF prêt à envoyer",
    desc: "Votre lettre est mise en page automatiquement dans un PDF professionnel avec vos coordonnées, la date du jour et une mise en page soignée. Prêt pour envoi par courrier recommandé.",
    details: [
      "Mise en page professionnelle avec en-tête LettreMagique",
      "Vos coordonnées et celles du destinataire pré-remplies",
      "Date du jour automatique",
      "Possibilité de modifier le texte avant téléchargement",
      "Export PDF immédiat — aucune attente",
    ],
  },
];

const faqs = [
  {
    q: "Est-ce vraiment gratuit ?",
    a: "Votre premier courrier est 100% gratuit, sans inscription ni carte bancaire. Ensuite, vous pouvez souscrire à un abonnement Pro pour un accès illimité.",
  },
  {
    q: "Les courriers ont-ils une valeur juridique ?",
    a: "LettreMagique est un outil d'aide à la rédaction. Les courriers générés respectent les usages formels et citent les références légales pertinentes, mais ne constituent pas un conseil juridique. Pour un litige complexe, consultez un professionnel du droit.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Vos informations personnelles ne sont utilisées que pour générer votre courrier. Nous ne revendons aucune donnée. Consultez notre politique de confidentialité pour plus de détails.",
  },
  {
    q: "Puis-je modifier la lettre avant de la télécharger ?",
    a: "Oui ! Après la génération, vous pouvez éditer directement le texte dans l'aperçu avant de télécharger le PDF. Vous gardez le contrôle total sur le contenu final.",
  },
  {
    q: "Comment envoyer mon courrier ?",
    a: "Téléchargez le PDF, imprimez-le et envoyez-le par courrier recommandé avec accusé de réception pour les situations qui l'exigent (résiliation, mise en demeure…). Vous pouvez aussi l'envoyer par email.",
  },
];

export default function CommentCaMarche() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 md:px-16 pt-24 pb-12 md:pt-32 md:pb-16"
        style={{ background: "var(--ink)", color: "var(--white-warm)" }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)",
          }}
        />
        <div className="max-w-[780px] mx-auto">
          <div
            className="text-[11px] uppercase tracking-[3px] mb-5"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
          >
            Comment ça marche
          </div>
          <h1
            className="font-extrabold leading-[0.92] tracking-[-2px] mb-5"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
            }}
          >
            Un courrier professionnel en{" "}
            <em
              style={{
                color: "var(--accent)",
                fontStyle: "italic",
                fontFamily: "var(--font-lora)",
                fontWeight: 500,
              }}
            >
              4 étapes simples
            </em>
          </h1>
          <p
            className="text-base leading-[1.7] max-w-[600px]"
            style={{ fontFamily: "var(--font-lora)", color: "#999" }}
          >
            Pas besoin d&apos;être juriste. Répondez à quelques questions, l&apos;IA
            s&apos;occupe du reste. Votre PDF est prêt en moins de 2 minutes.
          </p>
        </div>
      </section>

      {/* Étapes détaillées */}
      <section className="px-4 md:px-16 py-12 md:py-20">
        <div className="max-w-[780px] mx-auto flex flex-col gap-12 md:gap-16">
          {steps.map((step) => (
            <div key={step.num} className="reveal">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[11px] font-medium"
                  style={{ fontFamily: "var(--font-dm-mono)", color: step.accent }}
                >
                  {step.num}
                </span>
                <span className="leading-none" style={{ color: step.accent }}>
                  {step.icon === "folder" && <FolderOpen size={20} strokeWidth={1.5} />}
                  {step.icon === "pen" && <PenLine size={20} strokeWidth={1.5} />}
                  {step.icon === "bot" && <Bot size={20} strokeWidth={1.5} />}
                  {step.icon === "file" && <FileText size={20} strokeWidth={1.5} />}
                </span>
                <span
                  className="text-[10px] uppercase tracking-[2px]"
                  style={{ fontFamily: "var(--font-dm-mono)", color: step.accent }}
                >
                  {step.tag}
                </span>
              </div>

              <h2
                className="text-[22px] md:text-[26px] font-bold mb-3 leading-[1.2]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {step.title}
              </h2>

              <p
                className="text-[15px] leading-[1.7] mb-5"
                style={{ color: "var(--muted-lm)", fontFamily: "var(--font-lora)" }}
              >
                {step.desc}
              </p>

              <ul className="flex flex-col gap-2">
                {step.details.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2.5 text-[14px] leading-[1.5]"
                    style={{ color: "var(--ink)" }}
                  >
                    <span
                      className="mt-1 w-1.5 h-1.5 shrink-0 rounded-full"
                      style={{ background: step.accent }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        className="px-4 md:px-16 py-12 md:py-20"
        style={{
          background: "var(--white-warm)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="max-w-[780px] mx-auto">
          <h2
            className="text-[clamp(24px,3vw,32px)] font-extrabold tracking-[-1px] mb-10"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Questions{" "}
            <span style={{ color: "var(--accent)" }}>fréquentes</span>
          </h2>

          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-5 border"
                style={{ borderColor: "var(--rule)", background: "var(--paper2)" }}
              >
                <h3
                  className="text-[15px] font-bold mb-2"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {faq.q}
                </h3>
                <p
                  className="text-[14px] leading-[1.65]"
                  style={{ color: "var(--muted-lm)", fontFamily: "var(--font-lora)" }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-16 py-12 md:py-16 text-center">
        <div className="max-w-[500px] mx-auto">
          <h2
            className="text-[22px] font-extrabold mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Prêt à rédiger votre courrier ?
          </h2>
          <p
            className="text-[14px] mb-6 leading-[1.6]"
            style={{ color: "var(--muted-lm)", fontFamily: "var(--font-lora)" }}
          >
            Premier courrier gratuit · Sans inscription · PDF immédiat
          </p>
          <Link
            href="/generateur"
            className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-[0.5px] text-white no-underline transition-all duration-200 hover:brightness-90"
            style={{
              fontFamily: "var(--font-syne)",
              background: "var(--accent)",
            }}
          >
            Générer mon courrier →
          </Link>
        </div>
      </section>
    </>
  );
}
