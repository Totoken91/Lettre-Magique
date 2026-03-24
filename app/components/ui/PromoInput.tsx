"use client";

import { useState } from "react";

export default function PromoInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRedeem = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/promo/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Code invalide.");
      } else {
        setSuccess(`✓ ${json.credits_added} courrier${json.credits_added > 1 ? "s" : ""} gratuit${json.credits_added > 1 ? "s" : ""} ajouté${json.credits_added > 1 ? "s" : ""} !`);
        setCode("");
        window.dispatchEvent(new Event("quotaUpdated"));
      }
    } catch {
      setError("Erreur réseau.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div
        className="px-5 py-4 text-sm font-bold"
        style={{
          fontFamily: "var(--font-dm-mono)",
          background: "#e8f5e9",
          color: "var(--green)",
          border: "1.5px solid var(--green)",
        }}
      >
        {success}
      </div>
    );
  }

  return (
    <div>
      <div
        className="text-[10px] uppercase tracking-[2px] mb-3"
        style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
      >
        Vous avez un code promo ?
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ex: PROMO!"
          className="flex-1 px-4 py-2.5 text-sm outline-none"
          style={{
            fontFamily: "var(--font-dm-mono)",
            background: "var(--paper2)",
            border: "1.5px solid var(--rule)",
            color: "var(--ink)",
            letterSpacing: "1px",
          }}
          onKeyDown={(e) => { if (e.key === "Enter") handleRedeem(); }}
        />
        <button
          onClick={handleRedeem}
          disabled={loading || !code.trim()}
          className="px-4 py-2.5 text-sm font-bold uppercase tracking-[0.5px] text-white transition-all duration-200 disabled:opacity-50"
          style={{ fontFamily: "var(--font-syne)", background: "var(--ink)", whiteSpace: "nowrap" }}
        >
          {loading ? "…" : "Activer →"}
        </button>
      </div>
      {error && (
        <div
          className="mt-2 px-3 py-2 text-xs"
          style={{ fontFamily: "var(--font-dm-mono)", background: "#fde8e4", color: "var(--accent)", border: "1px solid var(--accent)" }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
