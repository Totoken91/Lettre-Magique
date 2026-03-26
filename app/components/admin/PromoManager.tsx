"use client";

import { useEffect, useState } from "react";

interface PromoCode {
  code: string;
  credits: number;
  max_uses: number | null;
  used_count: number;
  active: boolean;
  show_banner: boolean;
  expires_at: string | null;
  description: string;
  created_at: string;
}

const emptyForm = {
  code: "",
  credits: 5,
  max_uses: "",
  description: "",
  expires_at: "",
  show_banner: false,
};

export default function PromoManager() {
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCodes = async () => {
    const res = await fetch("/api/admin/promo");
    if (res.ok) setCodes(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchCodes(); }, []);

  const clearMessages = () => { setError(""); setSuccess(""); };

  const handleCreate = async () => {
    clearMessages();
    if (!form.code.trim()) { setError("Code requis"); return; }
    const res = await fetch("/api/admin/promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: form.code,
        credits: Number(form.credits) || 1,
        max_uses: form.max_uses ? Number(form.max_uses) : null,
        description: form.description,
        expires_at: form.expires_at || null,
        show_banner: form.show_banner,
        active: true,
      }),
    });
    if (res.ok) {
      setSuccess(`Code "${form.code.toUpperCase()}" créé`);
      setForm(emptyForm);
      setShowForm(false);
      fetchCodes();
    } else {
      const data = await res.json();
      setError(data.error || "Erreur");
    }
  };

  const toggleActive = async (code: string, active: boolean) => {
    clearMessages();
    await fetch("/api/admin/promo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, active }),
    });
    fetchCodes();
  };

  const toggleBanner = async (code: string, show_banner: boolean) => {
    clearMessages();
    await fetch("/api/admin/promo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, show_banner }),
    });
    if (show_banner) setSuccess(`Bannière activée pour "${code}"`);
    fetchCodes();
  };

  const updateExpiry = async (code: string, expires_at: string) => {
    clearMessages();
    await fetch("/api/admin/promo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, expires_at: expires_at || null }),
    });
    fetchCodes();
  };

  const updateMaxUses = async (code: string, max_uses: string) => {
    clearMessages();
    await fetch("/api/admin/promo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, max_uses: max_uses ? Number(max_uses) : null }),
    });
    fetchCodes();
  };

  const deleteCode = async (code: string) => {
    clearMessages();
    if (!confirm(`Supprimer le code "${code}" et toutes ses utilisations ?`)) return;
    await fetch("/api/admin/promo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    setSuccess(`Code "${code}" supprimé`);
    fetchCodes();
  };

  const mono = { fontFamily: "var(--font-dm-mono)" };
  const syne = { fontFamily: "var(--font-syne)" };
  const muted = { ...mono, color: "var(--muted-lm)" };

  if (loading) return <div style={muted} className="text-sm">Chargement…</div>;

  return (
    <div className="space-y-4">
      {/* Messages */}
      {error && (
        <div className="px-4 py-2 text-xs" style={{ ...mono, background: "#fde8e4", color: "#c0392b" }}>
          {error}
        </div>
      )}
      {success && (
        <div className="px-4 py-2 text-xs" style={{ ...mono, background: "#e8f5e9", color: "#2d6a4f" }}>
          {success}
        </div>
      )}

      {/* Bouton ajouter */}
      <button
        onClick={() => { setShowForm(!showForm); clearMessages(); }}
        className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-[1px] text-white"
        style={{ ...syne, background: "var(--accent)", border: "none", cursor: "pointer" }}
      >
        {showForm ? "Annuler" : "+ Nouveau code promo"}
      </button>

      {/* Formulaire création */}
      {showForm && (
        <div className="border-[2px] p-5 space-y-4" style={{ borderColor: "var(--rule)", background: "var(--white-warm)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[1.5px] mb-1.5" style={muted}>Code</label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="EX: BIENVENUE"
                className="w-full px-3 py-2 text-sm border"
                style={{ ...mono, borderColor: "var(--rule)", background: "white" }}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[1.5px] mb-1.5" style={muted}>Crédits offerts</label>
              <input
                type="number"
                value={form.credits}
                onChange={(e) => setForm({ ...form, credits: Number(e.target.value) })}
                min={1}
                className="w-full px-3 py-2 text-sm border"
                style={{ ...mono, borderColor: "var(--rule)", background: "white" }}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[1.5px] mb-1.5" style={muted}>Utilisations max (vide = illimité)</label>
              <input
                type="number"
                value={form.max_uses}
                onChange={(e) => setForm({ ...form, max_uses: e.target.value })}
                placeholder="∞"
                className="w-full px-3 py-2 text-sm border"
                style={{ ...mono, borderColor: "var(--rule)", background: "white" }}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[1.5px] mb-1.5" style={muted}>Expiration (vide = jamais)</label>
              <input
                type="date"
                value={form.expires_at}
                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                className="w-full px-3 py-2 text-sm border"
                style={{ ...mono, borderColor: "var(--rule)", background: "white" }}
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[1.5px] mb-1.5" style={muted}>Description (texte bannière)</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Ex: 5 courriers offerts lors de l'inscription"
              className="w-full px-3 py-2 text-sm border"
              style={{ ...mono, borderColor: "var(--rule)", background: "white" }}
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.show_banner}
              onChange={(e) => setForm({ ...form, show_banner: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-[11px] uppercase tracking-[1px]" style={muted}>
              Afficher comme bannière sur la landing page
            </span>
          </label>
          <button
            onClick={handleCreate}
            className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-[1px] text-white"
            style={{ ...syne, background: "var(--accent)", border: "none", cursor: "pointer" }}
          >
            Créer le code
          </button>
        </div>
      )}

      {/* Liste des codes */}
      <div className="border-[2px]" style={{ borderColor: "var(--rule)" }}>
        {codes.length === 0 ? (
          <div className="px-5 py-4 text-sm" style={{ ...mono, color: "var(--muted-lm)" }}>
            Aucun code promo.
          </div>
        ) : (
          codes.map((pc, i) => {
            const isExpired = pc.expires_at && new Date(pc.expires_at) < new Date();
            const isMaxed = pc.max_uses !== null && pc.used_count >= pc.max_uses;
            return (
              <div
                key={pc.code}
                className="px-4 md:px-5 py-4"
                style={{
                  borderTop: i > 0 ? "1px solid var(--rule)" : undefined,
                  background: i % 2 === 0 ? "var(--white-warm)" : "var(--paper2)",
                }}
              >
                {/* Row 1: code + badges */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-sm font-bold tracking-[1px]" style={mono}>
                    {pc.code}
                  </span>
                  <span
                    className="text-[9px] uppercase tracking-[1px] px-1.5 py-0.5"
                    style={{
                      ...mono,
                      background: pc.active && !isExpired ? "#2d6a4f18" : "#88888818",
                      color: pc.active && !isExpired ? "var(--green)" : "var(--muted-lm)",
                      border: `1px solid ${pc.active && !isExpired ? "#2d6a4f33" : "#88888833"}`,
                    }}
                  >
                    {isExpired ? "expiré" : pc.active ? "actif" : "inactif"}
                  </span>
                  {pc.show_banner && (
                    <span
                      className="text-[9px] uppercase tracking-[1px] px-1.5 py-0.5"
                      style={{ ...mono, background: "var(--accent)", color: "white" }}
                    >
                      bannière
                    </span>
                  )}
                  <span className="text-[10px]" style={muted}>
                    +{pc.credits} crédit{pc.credits !== 1 ? "s" : ""}
                  </span>
                  <span className="text-[10px]" style={muted}>
                    {pc.used_count}{pc.max_uses != null ? ` / ${pc.max_uses}` : " / ∞"} utilisations
                  </span>
                </div>

                {/* Row 2: description */}
                {pc.description && (
                  <div className="text-[11px] mb-2" style={muted}>
                    {pc.description}
                  </div>
                )}

                {/* Row 3: inline editable fields */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-1.5">
                    <label className="text-[9px] uppercase tracking-[1px]" style={muted}>Expire</label>
                    <input
                      type="date"
                      defaultValue={pc.expires_at ? pc.expires_at.slice(0, 10) : ""}
                      onBlur={(e) => updateExpiry(pc.code, e.target.value)}
                      className="px-1.5 py-1 text-[11px] border"
                      style={{ ...mono, borderColor: "var(--rule)", background: "white", width: 120 }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <label className="text-[9px] uppercase tracking-[1px]" style={muted}>Max</label>
                    <input
                      type="number"
                      defaultValue={pc.max_uses ?? ""}
                      placeholder="∞"
                      onBlur={(e) => updateMaxUses(pc.code, e.target.value)}
                      className="px-1.5 py-1 text-[11px] border"
                      style={{ ...mono, borderColor: "var(--rule)", background: "white", width: 70 }}
                    />
                  </div>
                </div>

                {/* Row 4: action buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleActive(pc.code, !pc.active)}
                    className="px-3 py-1.5 text-[10px] uppercase tracking-[1px]"
                    style={{ ...mono, border: "1px solid var(--rule)", background: "white", cursor: "pointer" }}
                  >
                    {pc.active ? "Désactiver" : "Activer"}
                  </button>
                  <button
                    onClick={() => toggleBanner(pc.code, !pc.show_banner)}
                    className="px-3 py-1.5 text-[10px] uppercase tracking-[1px]"
                    style={{
                      ...mono,
                      border: `1px solid ${pc.show_banner ? "var(--accent)" : "var(--rule)"}`,
                      background: pc.show_banner ? "var(--accent)" : "white",
                      color: pc.show_banner ? "white" : "var(--ink)",
                      cursor: "pointer",
                    }}
                  >
                    {pc.show_banner ? "Masquer bannière" : "Afficher bannière"}
                  </button>
                  <button
                    onClick={() => deleteCode(pc.code)}
                    className="px-3 py-1.5 text-[10px] uppercase tracking-[1px]"
                    style={{ ...mono, border: "1px solid #c0392b33", background: "#fde8e4", color: "#c0392b", cursor: "pointer" }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
