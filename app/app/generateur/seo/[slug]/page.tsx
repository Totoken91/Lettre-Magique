import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { LETTER_TYPES } from "@/data/letter-types";
import { SEO_PAGES } from "@/data/seo-pages";
import LetterTypeIcon from "@/components/ui/LetterTypeIcon";
import FaqAccordion from "./FaqAccordion";

const BASE_URL = "https://lettre-magique.vercel.app";

/* ─── Static params ─── */

export function generateStaticParams() {
  return SEO_PAGES.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGES.find((p) => p.slug === slug);
  if (!page) return {};

  const url = `${BASE_URL}/generateur/seo/${slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: url,
      languages: { fr: url },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
      locale: "fr_FR",
      siteName: "LettreMagique",
    },
  };
}

/* ─── Page ─── */

export default async function SeoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = SEO_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const letterType = LETTER_TYPES.find((t) => t.id === page.letterType);
  const related = page.relatedSlugs
    .map((s) => SEO_PAGES.find((p2) => p2.slug === s))
    .filter(Boolean);

  const ctaHref = page.company
    ? `/generateur/${page.letterType}?company=${encodeURIComponent(page.company)}`
    : `/generateur/${page.letterType}`;

  /* ── Schema.org JSON-LD ── */

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.title,
    description: page.metaDescription,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choisissez votre type de courrier",
        text: "Sélectionnez le type de courrier adapté à votre situation parmi nos modèles.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Remplissez le formulaire",
        text: "Répondez à quelques questions simples pour personnaliser votre courrier.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Téléchargez votre PDF",
        text: "Récupérez votre courrier au format PDF, prêt à envoyer.",
      },
    ],
  };

  return (
    <div className="pt-14">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ══ Hero ══ */}
      <section
        className="relative overflow-hidden px-4 md:px-16 py-14 md:py-24"
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
          {letterType && (
            <div
              className="text-[11px] uppercase tracking-[3px] mb-5 flex items-center gap-2"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)" }}
            >
              <LetterTypeIcon typeId={letterType.id} size={14} color="var(--rule)" />
              {letterType.name}
            </div>
          )}

          <h1
            className="font-extrabold leading-[0.92] tracking-[-2px] mb-6"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
            }}
          >
            {page.title}
          </h1>

          <p
            className="text-base md:text-lg leading-[1.7] mb-8 max-w-[640px]"
            style={{ fontFamily: "var(--font-lora)", color: "#b0ada8" }}
          >
            {page.heroText}
          </p>

          <Link
            href={ctaHref}
            className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-[1px] text-white no-underline hover:brightness-90 transition-all"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
          >
            Générer ma lettre gratuitement &rarr;
          </Link>
        </div>
      </section>

      {/* ══ Comment ça marche ══ */}
      <section className="px-4 md:px-16 py-12 md:py-16" style={{ background: "var(--paper)" }}>
        <div className="max-w-[780px] mx-auto">
          <h2
            className="text-xl font-bold mb-8 tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Comment ça marche ?
          </h2>
          <div className="grid gap-6">
            {[
              {
                step: 1,
                title: "Choisissez votre courrier",
                desc: "Sélectionnez le type de courrier correspondant à votre situation. Nos modèles couvrent les cas les plus courants.",
              },
              {
                step: 2,
                title: "Remplissez le formulaire",
                desc: "Répondez à 3-4 questions simples. Notre IA génère un courrier personnalisé, juridiquement solide et prêt à envoyer.",
              },
              {
                step: 3,
                title: "Téléchargez votre PDF",
                desc: "Récupérez votre courrier au format PDF professionnel. Vous pouvez aussi l'envoyer directement par email.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    fontFamily: "var(--font-syne)",
                    background: "var(--accent)",
                    color: "#fff",
                  }}
                >
                  {s.step}
                </div>
                <div className="pt-0.5">
                  <p
                    className="text-[15px] font-bold mb-1"
                    style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
                  >
                    {s.title}
                  </p>
                  <p
                    className="text-sm leading-[1.7]"
                    style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Infos légales ══ */}
      <section className="px-4 md:px-16 py-12 md:py-16" style={{ background: "var(--white-warm)" }}>
        <div className="max-w-[780px] mx-auto">
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 flex items-center justify-center shrink-0 text-lg"
              style={{ background: "var(--paper)", border: "1px solid var(--rule)" }}
            >
              &#9878;
            </div>
            <div>
              <h2
                className="text-lg font-bold mb-3 tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Ce que dit la loi
              </h2>
              <p
                className="text-sm leading-[1.8]"
                style={{ fontFamily: "var(--font-lora)", color: "var(--ink)" }}
              >
                {page.legalInfo}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      {page.faqItems.length > 0 && (
        <section className="px-4 md:px-16 py-12 md:py-16" style={{ background: "var(--paper)" }}>
          <div className="max-w-[780px] mx-auto">
            <h2
              className="text-xl font-bold mb-8 tracking-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Questions fréquentes
            </h2>
            <FaqAccordion items={page.faqItems} />
          </div>
        </section>
      )}

      {/* ══ Pages liées (maillage interne) ══ */}
      {related.length > 0 && (
        <section className="px-4 md:px-16 py-10 md:py-14" style={{ background: "var(--white-warm)" }}>
          <div className="max-w-[780px] mx-auto">
            <h2
              className="text-[11px] uppercase tracking-[3px] mb-5"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
            >
              Voir aussi
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => {
                const rType = LETTER_TYPES.find((t) => t.id === r!.letterType);
                return (
                  <Link
                    key={r!.slug}
                    href={`/generateur/seo/${r!.slug}`}
                    className="block p-4 no-underline hover:border-[var(--accent)] transition-colors"
                    style={{
                      border: "1px solid var(--rule)",
                      background: "var(--paper)",
                    }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-[2px] mb-2 flex items-center gap-1.5"
                      style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
                    >
                      {rType && (
                        <LetterTypeIcon typeId={rType.id} size={12} color="var(--muted-lm)" />
                      )}
                      {rType?.name}
                    </div>
                    <p
                      className="text-sm font-bold leading-snug"
                      style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
                    >
                      {r!.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ CTA final ══ */}
      <section
        className="px-4 md:px-16 py-14 md:py-20 text-center"
        style={{ background: "var(--ink)" }}
      >
        <div className="max-w-[600px] mx-auto">
          <h2
            className="text-2xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-syne)", color: "var(--white-warm)" }}
          >
            Prêt à envoyer votre courrier ?
          </h2>
          <p
            className="text-sm mb-8"
            style={{ fontFamily: "var(--font-lora)", color: "var(--rule)" }}
          >
            Premier courrier gratuit, sans inscription, sans carte bancaire. Votre lettre en 2 minutes.
          </p>
          <Link
            href={ctaHref}
            className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-[1px] text-white no-underline hover:brightness-90 transition-all"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
          >
            Commencer maintenant &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
