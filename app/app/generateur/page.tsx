import Link from "next/link";
import { LETTER_TYPES } from "@/data/letter-types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Générer un courrier — LettreMagique",
  description:
    "Choisissez le type de courrier administratif à générer : résiliation, réclamation, mise en demeure, contestation et plus encore.",
};

export default function GenerateurPage() {
  return (
    <div className="pt-14">
      <section
        className="relative overflow-hidden px-16 py-20"
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
          <div
            className="text-[11px] uppercase tracking-[3px] mb-6"
            style={{
              fontFamily: "var(--font-dm-mono)",
              color: "var(--accent)",
            }}
          >
            Étape 1 / 2
          </div>
          <h1
            className="font-extrabold leading-[0.92] tracking-[-2px] mb-5"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 4vw, 52px)",
            }}
          >
            Quel courrier souhaitez-vous{" "}
            <em
              style={{
                color: "var(--accent)",
                fontStyle: "italic",
                fontFamily: "var(--font-lora)",
                fontWeight: 500,
              }}
            >
              générer ?
            </em>
          </h1>
          <p
            className="text-base max-w-[500px] leading-[1.7]"
            style={{ fontFamily: "var(--font-lora)", color: "#888" }}
          >
            Sélectionnez une catégorie ci-dessous. Premier courrier 100% gratuit,
            sans inscription.
          </p>
        </div>
      </section>

      <section className="px-16 py-16">
        <div className="max-w-[980px] mx-auto">
          <div
            className="grid gap-[2px] border-[2px]"
            style={{
              borderColor: "var(--ink)",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {LETTER_TYPES.map((type) => (
              <Link
                key={type.id}
                href={`/generateur/${type.id}`}
                className="block p-6 transition-all duration-200 no-underline group"
                style={{ background: "var(--paper)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">{type.emoji}</div>
                  <div className="flex-1">
                    <div
                      className="text-base font-bold mb-1 group-hover:text-accent transition-colors"
                      style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
                    >
                      {type.name}
                    </div>
                    <div
                      className="text-[11px] mb-3"
                      style={{
                        fontFamily: "var(--font-dm-mono)",
                        color: "var(--muted-lm)",
                      }}
                    >
                      {type.desc}
                    </div>
                    {type.seoExamples && type.seoExamples.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {type.seoExamples.slice(0, 3).map((ex) => (
                          <span
                            key={ex}
                            className="text-[9px] uppercase tracking-[0.5px] px-2 py-0.5"
                            style={{
                              fontFamily: "var(--font-dm-mono)",
                              background: "var(--paper2)",
                              color: "var(--muted-lm)",
                            }}
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className="text-lg shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    style={{ color: "var(--accent)" }}
                  >
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div
            className="mt-8 p-6 border-[2px] flex items-start gap-4"
            style={{ borderColor: "var(--green)" }}
          >
            <div
              className="text-[9px] uppercase tracking-[2px] shrink-0 mt-0.5"
              style={{
                fontFamily: "var(--font-dm-mono)",
                color: "var(--green)",
              }}
            >
              Info
            </div>
            <p
              className="text-sm m-0 leading-[1.6]"
              style={{ color: "var(--muted-lm)" }}
            >
              <strong style={{ color: "var(--ink)" }}>
                Premier courrier 100% gratuit.
              </strong>{" "}
              Pas de carte bancaire requise, pas d&apos;inscription. Vous pouvez
              télécharger votre premier PDF immédiatement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
