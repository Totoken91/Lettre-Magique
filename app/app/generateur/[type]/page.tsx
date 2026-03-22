import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LETTER_TYPES } from "@/data/letter-types";
import DynamicForm from "@/components/generateur/DynamicForm";

type Props = {
  params: Promise<{ type: string }>;
};

export async function generateStaticParams() {
  return LETTER_TYPES.map((t) => ({ type: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const letterType = LETTER_TYPES.find((t) => t.id === type);
  if (!letterType) return {};
  return {
    title: `${letterType.name} — LettreMagique`,
    description: `Générez votre lettre de ${letterType.name.toLowerCase()} en 2 minutes. Personnalisée par l'IA, export PDF immédiat, mentions légales incluses.`,
  };
}

export default async function GenerateurTypePage({ params }: Props) {
  const { type } = await params;
  const letterType = LETTER_TYPES.find((t) => t.id === type);

  if (!letterType) notFound();

  return (
    <div className="pt-14">
      {/* Header */}
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
        <div className="max-w-[700px] mx-auto">
          <div
            className="text-[11px] uppercase tracking-[3px] mb-5"
            style={{
              fontFamily: "var(--font-dm-mono)",
              color: "var(--accent)",
            }}
          >
            Étape 2 / 2 · {letterType.emoji} {letterType.name}
          </div>
          <h1
            className="font-extrabold leading-[0.92] tracking-[-2px] mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
            }}
          >
            Votre lettre de{" "}
            <em
              style={{
                color: "var(--accent)",
                fontStyle: "italic",
                fontFamily: "var(--font-lora)",
                fontWeight: 500,
              }}
            >
              {letterType.name.toLowerCase()}
            </em>
          </h1>
          <p
            className="text-base leading-[1.7]"
            style={{ fontFamily: "var(--font-lora)", color: "#888" }}
          >
            Répondez aux questions ci-dessous. L&apos;IA générera un courrier
            personnalisé et professionnel en quelques secondes.
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="px-4 md:px-16 py-10 md:py-16">
        <div className="max-w-[700px] mx-auto">
          <DynamicForm letterType={letterType} />
        </div>
      </section>
    </div>
  );
}
