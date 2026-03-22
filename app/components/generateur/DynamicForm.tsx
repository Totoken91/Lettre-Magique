"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LetterType } from "@/data/letter-types";
import { supabase } from "@/lib/supabase/client";
import AuthModal from "./AuthModal";

interface Props {
  letterType: LetterType;
}

export default function DynamicForm({ letterType }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

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

    try {
      const res = await fetch("/api/generer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: letterType.id,
          formData: values,
          senderName,
          senderAddress,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la génération");

      const data = await res.json();
      // Stocker le résultat et rediriger vers la page résultat
      sessionStorage.setItem(
        "lm_result",
        JSON.stringify({
          text: data.text,
          type: letterType.id,
          typeName: letterType.name,
          senderName,
          senderAddress,
          formData: values,
        })
      );
      router.push("/resultat");
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    await generate();
  };

  return (
    <>
    {showAuthModal && (
      <AuthModal
        onSuccess={() => { setShowAuthModal(false); generate(); }}
        onClose={() => setShowAuthModal(false)}
      />
    )}
    <form onSubmit={handleSubmit}>
      {/* Infos expéditeur */}
      <div
        className="mb-8 p-6 border-[2px]"
        style={{ borderColor: "var(--rule)" }}
      >
        <div
          className="text-[10px] uppercase tracking-[2px] mb-5"
          style={{
            fontFamily: "var(--font-dm-mono)",
            color: "var(--accent)",
          }}
        >
          Vos coordonnées
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="sender-name"
              className="block text-[11px] uppercase tracking-[1.5px] mb-2"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
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
              style={{
                fontFamily: "var(--font-lora)",
                background: "var(--paper2)",
                border: "1.5px solid var(--rule)",
                color: "var(--ink)",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="sender-address"
              className="block text-[11px] uppercase tracking-[1.5px] mb-2"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
            >
              Votre adresse complète *
            </label>
            <textarea
              id="sender-address"
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
              placeholder={"12 rue de la Paix\n75001 Paris"}
              required
              rows={3}
              className="w-full px-4 py-3 text-sm outline-none transition-colors resize-none"
              style={{
                fontFamily: "var(--font-lora)",
                background: "var(--paper2)",
                border: "1.5px solid var(--rule)",
                color: "var(--ink)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Questions dynamiques */}
      <div
        className="mb-8 p-6 border-[2px]"
        style={{ borderColor: "var(--rule)" }}
      >
        <div
          className="text-[10px] uppercase tracking-[2px] mb-5"
          style={{
            fontFamily: "var(--font-dm-mono)",
            color: "var(--accent)",
          }}
        >
          Informations sur votre courrier
        </div>

        <div className="space-y-6">
          {letterType.questions.map((q) => (
            <div key={q.id}>
              <label
                htmlFor={q.id}
                className="block text-[11px] uppercase tracking-[1.5px] mb-2"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  color: "var(--muted-lm)",
                }}
              >
                {q.label}
                {q.required !== false && " *"}
              </label>

              {q.type === "textarea" ? (
                <textarea
                  id={q.id}
                  value={values[q.id] ?? ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  required={q.required !== false}
                  rows={4}
                  className="w-full px-4 py-3 text-sm outline-none transition-colors resize-none"
                  style={{
                    fontFamily: "var(--font-lora)",
                    background: "var(--paper2)",
                    border: "1.5px solid var(--rule)",
                    color: "var(--ink)",
                  }}
                />
              ) : q.type === "select" && q.options ? (
                <select
                  id={q.id}
                  value={values[q.id] ?? ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  required={q.required !== false}
                  className="w-full px-4 py-3 text-sm outline-none transition-colors appearance-none"
                  style={{
                    fontFamily: "var(--font-lora)",
                    background: "var(--paper2)",
                    border: "1.5px solid var(--rule)",
                    color: values[q.id] ? "var(--ink)" : "var(--muted-lm)",
                  }}
                >
                  <option value="">Sélectionner…</option>
                  {q.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : q.type === "date" ? (
                <input
                  id={q.id}
                  type="date"
                  value={values[q.id] ?? ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  required={q.required !== false}
                  className="w-full px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    fontFamily: "var(--font-lora)",
                    background: "var(--paper2)",
                    border: "1.5px solid var(--rule)",
                    color: "var(--ink)",
                  }}
                />
              ) : (
                <input
                  id={q.id}
                  type="text"
                  value={values[q.id] ?? ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  required={q.required !== false}
                  className="w-full px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    fontFamily: "var(--font-lora)",
                    background: "var(--paper2)",
                    border: "1.5px solid var(--rule)",
                    color: "var(--ink)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div
          className="mb-6 p-4 text-sm"
          style={{
            fontFamily: "var(--font-dm-mono)",
            background: "#fde8e4",
            color: "var(--accent)",
            border: "1px solid var(--accent)",
          }}
        >
          {error}
        </div>
      )}

      {/* CTA */}
      <button
        type="submit"
        disabled={!isComplete() || loading}
        className="w-full py-5 text-sm font-bold uppercase tracking-[0.5px] text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          fontFamily: "var(--font-syne)",
          background: loading ? "#888" : "var(--accent)",
        }}
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

      <p
        className="text-center text-[11px] mt-4"
        style={{
          fontFamily: "var(--font-dm-mono)",
          color: "var(--muted-lm)",
        }}
      >
        Premier courrier gratuit · Aucune carte requise
      </p>
    </form>
    </>
  );
}
