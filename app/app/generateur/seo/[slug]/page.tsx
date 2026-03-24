import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { LETTER_TYPES } from "@/data/letter-types";
import LetterTypeIcon from "@/components/ui/LetterTypeIcon";

interface SeoPage {
  slug: string;
  typeId: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  steps: string[];
  faq: { q: string; a: string }[];
}

const SEO_PAGES: SeoPage[] = [
  {
    slug: "resiliation-free-mobile",
    typeId: "resiliation",
    title: "Lettre de résiliation Free Mobile — Modèle gratuit 2026",
    h1: "Résilier Free Mobile en 2 minutes",
    description: "Générez gratuitement une lettre de résiliation Free Mobile personnalisée et conforme. Export PDF immédiat, mentions légales incluses.",
    intro: "Vous souhaitez résilier votre forfait Free Mobile ? LettreMagique génère pour vous un courrier de résiliation personnalisé, conforme aux obligations légales (loi Chatel, loi Hamon) et prêt à envoyer.",
    steps: [
      "Renseignez vos coordonnées et votre numéro de client Free.",
      "Notre IA génère un courrier de résiliation conforme et personnalisé.",
      "Téléchargez le PDF ou envoyez-le directement par email.",
    ],
    faq: [
      { q: "Quel est le délai de résiliation Free Mobile ?", a: "La résiliation prend effet 10 jours après réception de votre courrier par Free, ou à la date de fin d'engagement si vous êtes encore engagé." },
      { q: "Puis-je résilier Free Mobile sans frais ?", a: "Oui, si vous êtes sans engagement. Avec engagement, des frais de résiliation peuvent s'appliquer (maximum 25% des mensualités restantes après 12 mois)." },
      { q: "Dois-je envoyer ma lettre en recommandé ?", a: "Ce n'est pas obligatoire pour Free Mobile, mais un envoi en recommandé avec AR est recommandé pour avoir une preuve de réception." },
    ],
  },
  {
    slug: "resiliation-sfr",
    typeId: "resiliation",
    title: "Lettre de résiliation SFR — Modèle gratuit 2026",
    h1: "Résilier SFR en 2 minutes",
    description: "Générez gratuitement une lettre de résiliation SFR personnalisée. Forfait mobile ou box internet, export PDF immédiat.",
    intro: "Résiliez votre abonnement SFR (mobile ou box) en toute simplicité. LettreMagique génère un courrier conforme que vous pouvez envoyer immédiatement.",
    steps: [
      "Indiquez votre numéro client SFR et le type d'abonnement.",
      "L'IA rédige votre courrier de résiliation avec les mentions légales.",
      "Téléchargez le PDF et envoyez-le à SFR.",
    ],
    faq: [
      { q: "Comment résilier SFR sans frais ?", a: "Sans engagement, la résiliation est gratuite avec un préavis de 10 jours. Avec engagement, les frais dépendent de la durée restante." },
      { q: "Où envoyer ma lettre de résiliation SFR ?", a: "SFR — Service Résiliation, TSA 73917, 62978 Arras Cedex 9." },
    ],
  },
  {
    slug: "conge-locataire-zone-tendue",
    typeId: "conge-locataire",
    title: "Préavis 1 mois zone tendue — Modèle de lettre 2026",
    h1: "Congé locataire en zone tendue (préavis 1 mois)",
    description: "Générez votre lettre de congé locataire avec préavis réduit d'1 mois en zone tendue. Conforme à la loi ALUR, export PDF gratuit.",
    intro: "En zone tendue, le préavis de départ est réduit à 1 mois (loi ALUR du 24 mars 2014). LettreMagique génère un courrier conforme avec toutes les mentions obligatoires.",
    steps: [
      "Renseignez les coordonnées de votre bailleur et l'adresse du logement.",
      "Sélectionnez \"1 mois (zone tendue)\" comme type de préavis.",
      "Téléchargez votre lettre de congé au format PDF.",
    ],
    faq: [
      { q: "Comment savoir si je suis en zone tendue ?", a: "La liste des communes en zone tendue est définie par le décret n°2013-392. Paris, Lyon, Marseille, Bordeaux, Lille, Toulouse, Nantes, Montpellier et la plupart des grandes métropoles sont concernées." },
      { q: "Quand commence le préavis ?", a: "Le préavis court à compter de la réception de la lettre par le bailleur (date de l'AR ou de la remise en main propre)." },
    ],
  },
  {
    slug: "contestation-amende-sncf",
    typeId: "contestation",
    title: "Contester une amende SNCF — Modèle de lettre 2026",
    h1: "Contester une amende SNCF",
    description: "Générez une lettre de contestation d'amende SNCF personnalisée. Modèle conforme, export PDF immédiat et gratuit.",
    intro: "Vous avez reçu un PV de la SNCF que vous jugez injustifié ? LettreMagique vous aide à rédiger un courrier de contestation clair et argumenté.",
    steps: [
      "Renseignez le numéro de l'avis et la date de l'infraction.",
      "Expliquez votre motif de contestation.",
      "Téléchargez le PDF et envoyez-le au service réclamations SNCF.",
    ],
    faq: [
      { q: "Quel est le délai pour contester une amende SNCF ?", a: "Vous disposez de 2 mois à compter de la réception de l'avis de contravention pour contester." },
      { q: "Où envoyer ma contestation ?", a: "À l'adresse indiquée sur l'avis de contravention, généralement le Centre de Recouvrement SNCF." },
    ],
  },
  {
    slug: "mise-en-demeure-remboursement",
    typeId: "mise-en-demeure",
    title: "Mise en demeure de remboursement — Modèle 2026",
    h1: "Envoyer une mise en demeure de remboursement",
    description: "Générez une mise en demeure de remboursement personnalisée. Courrier conforme avec délai légal, export PDF gratuit.",
    intro: "Lorsqu'un remboursement vous est dû et que les relances amiables restent sans réponse, la mise en demeure est l'étape préalable indispensable avant toute action en justice.",
    steps: [
      "Identifiez le débiteur et le montant réclamé.",
      "Choisissez le délai accordé (8 jours, 15 jours, 30 jours).",
      "Envoyez le courrier en recommandé avec accusé de réception.",
    ],
    faq: [
      { q: "La mise en demeure est-elle obligatoire ?", a: "Oui, dans la majorité des cas, une mise en demeure préalable est nécessaire avant de saisir un tribunal (article 1231 du Code civil)." },
      { q: "Que faire si le débiteur ne répond pas ?", a: "Si le débiteur ne s'exécute pas dans le délai imparti, vous pouvez saisir le tribunal compétent (tribunal judiciaire ou de proximité selon le montant)." },
    ],
  },
  {
    slug: "reclamation-edf",
    typeId: "reclamation",
    title: "Réclamation EDF — Modèle de lettre 2026",
    h1: "Faire une réclamation à EDF",
    description: "Générez une lettre de réclamation EDF personnalisée : facture erronée, coupure abusive, trop-perçu. Export PDF gratuit.",
    intro: "Facture incorrecte, coupure injustifiée ou trop-perçu ? LettreMagique vous aide à rédiger une réclamation claire et efficace à destination d'EDF.",
    steps: [
      "Décrivez le problème rencontré et le montant concerné.",
      "L'IA génère un courrier de réclamation conforme.",
      "Envoyez-le au service consommateurs d'EDF.",
    ],
    faq: [
      { q: "Quel est le délai de réponse d'EDF ?", a: "EDF doit répondre à votre réclamation dans un délai de 30 jours. Sans réponse, vous pouvez saisir le Médiateur national de l'énergie." },
    ],
  },
];

export function generateStaticParams() {
  return SEO_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function SeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = SEO_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const letterType = LETTER_TYPES.find((t) => t.id === page.typeId);

  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 md:px-16 py-12 md:py-20" style={{ background: "var(--ink)", color: "var(--white-warm)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-[4px]" style={{ background: "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)" }} />
        <div className="max-w-[780px] mx-auto">
          <div className="text-[11px] uppercase tracking-[3px] mb-5" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)" }}>
            {letterType && <LetterTypeIcon typeId={letterType.id} size={14} color="var(--rule)" />} {letterType?.name}
          </div>
          <h1 className="font-extrabold leading-[0.92] tracking-[-2px] mb-5" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(30px, 4vw, 50px)" }}>
            {page.h1}
          </h1>
          <p className="text-base leading-[1.7] mb-6" style={{ fontFamily: "var(--font-lora)", color: "#aaa" }}>
            {page.intro}
          </p>
          <Link
            href={`/generateur/${page.typeId}`}
            className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-[1px] text-white no-underline hover:brightness-90 transition-all"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
          >
            Générer ma lettre gratuitement →
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 md:px-16 py-12 md:py-16" style={{ background: "var(--paper)" }}>
        <div className="max-w-[780px] mx-auto">
          <h2 className="text-xl font-bold mb-8 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
            Comment ça marche ?
          </h2>
          <div className="grid gap-5">
            {page.steps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0" style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "#fff" }}>
                  {i + 1}
                </div>
                <p className="text-[15px] leading-[1.7] pt-1" style={{ fontFamily: "var(--font-lora)", color: "var(--ink)" }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {page.faq.length > 0 && (
        <section className="px-4 md:px-16 py-12 md:py-16" style={{ background: "var(--white-warm)" }}>
          <div className="max-w-[780px] mx-auto">
            <h2 className="text-xl font-bold mb-8 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              Questions fréquentes
            </h2>
            <div className="space-y-6">
              {page.faq.map((item, i) => (
                <div key={i} className="border-b pb-5" style={{ borderColor: "var(--rule)" }}>
                  <h3 className="text-[15px] font-bold mb-2" style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}>
                    {item.q}
                  </h3>
                  <p className="text-sm leading-[1.7]" style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="px-4 md:px-16 py-12 md:py-16 text-center" style={{ background: "var(--ink)" }}>
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-2xl font-bold mb-4 tracking-tight" style={{ fontFamily: "var(--font-syne)", color: "var(--white-warm)" }}>
            Prêt à générer votre courrier ?
          </h2>
          <p className="text-sm mb-6" style={{ fontFamily: "var(--font-lora)", color: "var(--rule)" }}>
            Gratuit, sans inscription, sans carte bancaire. Votre lettre en 2 minutes.
          </p>
          <Link
            href={`/generateur/${page.typeId}`}
            className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-[1px] text-white no-underline hover:brightness-90 transition-all"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
          >
            Commencer maintenant →
          </Link>
        </div>
      </section>
    </div>
  );
}
