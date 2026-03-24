import Link from "next/link";
import { LETTER_TYPES } from "@/data/letter-types";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import StepBar from "@/components/generateur/StepBar";
import LetterTypeIcon from "@/components/ui/LetterTypeIcon";
import PromoInput from "@/components/ui/PromoInput";

export const metadata: Metadata = {
  title: "Générer un courrier — LettreMagique",
  description:
    "Choisissez le type de courrier administratif à générer : résiliation, réclamation, mise en demeure, contestation et plus encore.",
};

export default async function GenerateurPage() {
  // Vérifier si l'utilisateur a déjà payé (Pro ou crédits achetés)
  let showFreeInfo = true;
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await getSupabaseAdmin()
        .from("profiles")
        .select("is_pro, credits")
        .eq("id", user.id)
        .single() as { data: { is_pro: boolean; credits: number } | null };
      if (profile?.is_pro || (profile?.credits ?? 0) > 0) {
        showFreeInfo = false;
      }
    }
  } catch {
    // En cas d'erreur, on affiche la box par défaut
  }
  return (
    <div className="pt-14">
      <section
        className="relative overflow-hidden px-4 md:px-16 py-12 md:py-20"
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
          <StepBar current={1} />
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
            className="text-base max-w-[500px] leading-[1.7] mb-5"
            style={{ fontFamily: "var(--font-lora)", color: "var(--rule)" }}
          >
            Sélectionnez une catégorie ci-dessous.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "✓ 1er courrier gratuit",
              "✓ Sans inscription",
              "✓ Sans carte bancaire",
              "✓ PDF prêt à envoyer",
            ].map((item) => (
              <span
                key={item}
                className="text-[10px] uppercase tracking-[1px] px-3 py-1.5"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  color: "#d4f1e4",
                  border: "1px solid #4ade8055",
                  background: "#4ade8012",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {showFreeInfo && (
        <div className="px-4 md:px-16 py-2.5 border-b" style={{ borderColor: "var(--rule)", background: "var(--white-warm)" }}>
          <div className="max-w-[980px] mx-auto flex flex-wrap items-center gap-4">
            <span
              className="text-[11px] uppercase tracking-[2px] shrink-0"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
            >
              Tu as un code promo ?
            </span>
            <div className="flex-1 min-w-[260px]">
              <PromoInput hideLabel />
            </div>
          </div>
        </div>
      )}

      <section className="px-4 md:px-16 py-10 md:py-16">
        <div className="max-w-[980px] mx-auto">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            }}
          >
            {LETTER_TYPES.map((type) => (
              <Link
                key={type.id}
                href={`/generateur/${type.id}`}
                className="block p-6 transition-all duration-200 no-underline group hover:[border-color:var(--ink)] hover:[box-shadow:3px_3px_0_var(--ink)]"
                style={{
                  background: "var(--white-warm)",
                  border: "1.5px solid var(--rule)",
                  borderRadius: "2px",
                }}
              >
                <div className="flex items-start gap-4">
                  <LetterTypeIcon typeId={type.id} size={18} box />
                  <div className="flex-1">
                    <div
                      className="text-base font-bold mb-1 transition-colors"
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
                              border: "1px solid var(--rule)",
                            }}
                          >
                            {ex}
                          </span>
                        ))}
                        <span
                          className="text-[9px] px-1 py-0.5"
                          style={{
                            fontFamily: "var(--font-dm-mono)",
                            color: "var(--light-lm)",
                          }}
                        >
                          {"…"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className="text-lg shrink-0 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    style={{ color: "var(--accent)" }}
                  >
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {showFreeInfo && <div
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
          </div>}
        </div>
      </section>
    </div>
  );
}
