"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { LetterType } from "@/data/letter-types";
import { supabase } from "@/lib/supabase/client";

interface Props {
  letterType: LetterType;
}

const LABEL_STYLE = {
  fontFamily: "var(--font-dm-mono)",
  color: "#444",
  fontWeight: 500,
} as const;

export default function DynamicForm({ letterType }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [editingCoords, setEditingCoords] = useState(false);

  // Pré-remplir avec les coordonnées sauvegardées
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      const { data } = await supabase
        .from("profiles")
        .select("full_name, address, postal_code, city, phone, email_contact")
        .eq("id", session.user.id)
        .single();
      if (data?.full_name) setSenderName(data.full_name);
      if (data?.address) {
        const parts = [
          data.address,
          [data.postal_code, data.city].filter(Boolean).join(" "),
        ].filter(Boolean);
        setSenderAddress(parts.join("\n"));
      }
      if (data?.phone) setSenderPhone(data.phone);
      if (data?.email_contact) setSenderEmail(data.email_contact);
      setProfileLoaded(!!data?.full_name || !!data?.address);
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [refused, setRefused] = useState(false);

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const isComplete = () => {
    const required = letterType.questions.filter((q) => q.required !== false);
    return (
      required.every((q) => values[q.id]?.trim()) &&
      senderName.trim() &&
      senderAddress.trim()
    );
  };

  const generate = async () => {
    setLoading(true);
    setError(null);
    setRefused(false);

    try {
      const res = await fetch("/api/generer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: letterType.id,
          formData: values,
          senderName,
          senderAddress,
          senderPhone,
          senderEmail,
        }),
      });

      const data = await res.json();
      if (res.status === 403 && data.limitReached) throw new Error("__LIMIT__");
      if (res.status === 422 && data.error === "refused") throw new Error("__REFUSED__");
      if (!res.ok) throw new Error(data.detail || data.error || "Erreur lors de la génération");

      sessionStorage.setItem(
        "lm_result",
        JSON.stringify({
          text: data.text,
          type: letterType.id,
          typeName: letterType.name,
          senderName,
          senderAddress,
          senderPhone,
          senderEmail,
          formData: values,
        })
      );
      window.dispatchEvent(new Event("quotaUpdated"));
      router.push("/resultat");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg === "__LIMIT__") setLimitReached(true);
      else if (msg === "__REFUSED__") setRefused(true);
      else setError(msg || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete()) return;
    await generate();
  };

  // Compact address summary (first line + postal/city)
  const addressSummary = senderAddress
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join(", ");

  const showCompact = profileLoaded && !editingCoords;

  return (
    <form onSubmit={handleSubmit}>
      {/* ── Vos coordonnées ── */}
      <div className="mb-6 p-5 border-[2px]" style={{ borderColor: "var(--rule)" }}>
        <div className="flex items-center justify-between mb-3">
          <div
            className="text-[10px] uppercase tracking-[2px]"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
          >
            Vos coordonnées
          </div>
          {showCompact ? (
            <button
              type="button"
              onClick={() => setEditingCoords(true)}
              className="text-[10px] transition-colors"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)", background: "none", border: "none", cursor: "pointer" }}
            >
              ✎ Modifier
            </button>
          ) : profileLoaded ? (
            <button
              type="button"
              onClick={() => setEditingCoords(false)}
              className="text-[10px] transition-colors"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--green)", background: "none", border: "none", cursor: "pointer" }}
            >
              ✓ Réduire
            </button>
          ) : (
            <Link
              href="/compte"
              className="text-[10px] no-underline"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--green)" }}
            >
              + Sauvegarder
            </Link>
          )}
        </div>

        {showCompact ? (
          /* ── Vue compacte ── */
          <div
            className="flex items-center gap-2 py-2 px-3"
            style={{ background: "var(--paper2)", border: "1.5px solid var(--rule)" }}
          >
            <span
              className="text-sm font-bold shrink-0"
              style={{ fontFamily: "var(--font-lora)", color: "var(--ink)" }}
            >
              {senderName}
            </span>
            <span style={{ color: "var(--rule)" }}>—</span>
            <span
              className="text-sm truncate"
              style={{ fontFamily: "var(--font-lora)", color: "#666" }}
            >
              {addressSummary}
            </span>
          </div>
        ) : (
          /* ── Formulaire complet ── */
          <div className="space-y-4">
            <div>
              <label
                htmlFor="sender-name"
                className="block text-[11px] uppercase tracking-[1.5px] mb-2"
                style={LABEL_STYLE}
              >
                Votre nom complet *
              </label>
              <input
                id="sender-name"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Prénom Nom"
                required
                className="w-full px-4 py-3 text-sm outline-none transition-colors"
                style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
              />
            </div>
            <div>
              <label
                htmlFor="sender-address"
                className="block text-[11px] uppercase tracking-[1.5px] mb-2"
                style={LABEL_STYLE}
              >
                Votre adresse complète *
              </label>
              <textarea
                id="sender-address"
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                placeholder={"12 rue de la Paix\n75001 Paris"}
                required
                rows={2}
                className="w-full px-4 py-3 text-sm outline-none transition-colors resize-none"
                style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ opacity: 0.7 }}>
              <div>
                <label
                  htmlFor="sender-phone"
                  className="block text-[11px] uppercase tracking-[1.5px] mb-2"
                  style={LABEL_STYLE}
                >
                  Téléphone <span style={{ color: "#999", fontWeight: 400 }}>(optionnel)</span>
                </label>
                <input
                  id="sender-phone"
                  type="tel"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="06 00 00 00 00"
                  className="w-full px-4 py-3 text-sm outline-none transition-colors"
                  style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
                />
              </div>
              <div>
                <label
                  htmlFor="sender-email"
                  className="block text-[11px] uppercase tracking-[1.5px] mb-2"
                  style={LABEL_STYLE}
                >
                  Email <span style={{ color: "#999", fontWeight: 400 }}>(optionnel)</span>
                </label>
                <input
                  id="sender-email"
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="vous@example.com"
                  className="w-full px-4 py-3 text-sm outline-none transition-colors"
                  style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Informations sur votre courrier ── */}
      <div className="mb-8 p-5 border-[2px]" style={{ borderColor: "var(--rule)" }}>
        <div
          className="text-[10px] uppercase tracking-[2px] mb-5"
          style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
        >
          Informations sur votre courrier
        </div>

        <div className="space-y-6">
          {letterType.questions.map((q) => {
            const isOptional = q.required === false;
            return (
              <div key={q.id} style={{ opacity: isOptional ? 0.7 : 1 }}>
                <label
                  htmlFor={q.id}
                  className="block text-[11px] uppercase tracking-[1.5px] mb-2"
                  style={LABEL_STYLE}
                >
                  {q.label}
                  {!isOptional && <span style={{ color: "var(--accent)" }}> *</span>}
                  {isOptional && <span style={{ color: "#999", fontWeight: 400 }}> (optionnel)</span>}
                </label>

                {q.type === "textarea" ? (
                  <textarea
                    id={q.id}
                    value={values[q.id] ?? ""}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    required={!isOptional}
                    rows={4}
                    className="w-full px-4 py-3 text-sm outline-none transition-colors resize-none"
                    style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
                  />
                ) : q.type === "select" && q.options ? (
                  /* ── Chips au lieu du select ── */
                  <div className="flex flex-wrap gap-2" role="group" aria-label={q.label}>
                    {q.options.map((opt) => {
                      const selected = values[q.id] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleChange(q.id, selected ? "" : opt)}
                          className="px-3 py-2 text-sm transition-all duration-150"
                          style={{
                            fontFamily: "var(--font-lora)",
                            background: selected ? "var(--ink)" : "var(--paper2)",
                            color: selected ? "var(--white-warm)" : "var(--ink)",
                            border: `1.5px solid ${selected ? "var(--ink)" : "var(--rule)"}`,
                            cursor: "pointer",
                          }}
                        >
                          {selected && <span style={{ color: "var(--accent)", marginRight: 5 }}>✓</span>}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                ) : q.type === "date" ? (
                  <input
                    id={q.id}
                    type="date"
                    value={values[q.id] ?? ""}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    required={!isOptional}
                    className="w-full px-4 py-3 text-sm outline-none transition-colors"
                    style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
                  />
                ) : (
                  <input
                    id={q.id}
                    type="text"
                    value={values[q.id] ?? ""}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    required={!isOptional}
                    className="w-full px-4 py-3 text-sm outline-none transition-colors"
                    style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {limitReached && (
        <div className="mb-6 p-5 border-[2px]" style={{ borderColor: "var(--ink)", background: "var(--paper2)" }}>
          <div className="text-[10px] uppercase tracking-[2px] mb-2" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}>
            Courrier gratuit utilisé
          </div>
          <p className="text-sm leading-[1.6] mb-4" style={{ fontFamily: "var(--font-lora)", color: "var(--ink)" }}>
            Vous avez utilisé votre courrier gratuit. Créez un compte pour sauvegarder vos courriers, ou passez en <strong>Pro</strong> pour des courriers illimités.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/signup" className="inline-block px-5 py-2.5 text-xs font-bold uppercase tracking-[0.5px] no-underline" style={{ fontFamily: "var(--font-syne)", background: "var(--ink)", color: "var(--white-warm)" }}>
              Créer un compte gratuit
            </a>
            <a href="/tarifs" className="inline-block px-5 py-2.5 text-xs font-bold uppercase tracking-[0.5px] text-white no-underline" style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}>
              Voir les offres Pro →
            </a>
          </div>
        </div>
      )}

      {refused && (
        <div className="mb-6 p-5 border-[2px]" style={{ borderColor: "var(--rule)", background: "var(--paper2)" }}>
          <div className="text-[10px] uppercase tracking-[2px] mb-2" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
            Génération refusée
          </div>
          <p className="text-sm leading-[1.6]" style={{ fontFamily: "var(--font-lora)", color: "var(--ink)" }}>
            L&apos;IA a refusé de générer ce courrier (contenu inapproprié ou contraire à ses règles).{" "}
            <strong>Votre crédit n&apos;a pas été débité.</strong>
          </p>
          <p className="text-sm leading-[1.6] mt-2" style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}>
            Reformulez votre demande ou choisissez un autre type de courrier.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 text-sm" style={{ fontFamily: "var(--font-dm-mono)", background: "#fde8e4", color: "var(--accent)", border: "1px solid var(--accent)" }}>
          {error}
        </div>
      )}

      {/* CTA */}
      <button
        type="submit"
        disabled={!isComplete() || loading}
        className="w-full py-5 text-sm font-bold uppercase tracking-[0.5px] text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-syne)", background: loading ? "#888" : "var(--accent)" }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <span className="animate-spin">◌</span>
            Génération en cours…
          </span>
        ) : (
          "Générer mon courrier →"
        )}
      </button>
    </form>
  );
}
