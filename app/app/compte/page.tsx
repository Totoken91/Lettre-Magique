"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

interface Profile {
  full_name: string;
  address: string;
  postal_code: string;
  city: string;
  phone: string;
  email_contact: string;
}

interface Letter {
  id: string;
  created_at: string;
  type_name: string;
  type: string;
  generated_text: string;
  sender_name: string | null;
}

const EMPTY: Profile = {
  full_name: "",
  address: "",
  postal_code: "",
  city: "",
  phone: "",
  email_contact: "",
};

export default function ComptePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>(EMPTY);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push("/login"); return; }

      const [profileRes, lettersRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, address, postal_code, city, phone, email_contact")
          .eq("id", session.user.id)
          .single(),
        supabase
          .from("letters")
          .select("id, created_at, type_name, type, generated_text, sender_name")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (profileRes.data) {
        setProfile({
          full_name: profileRes.data.full_name ?? "",
          address: profileRes.data.address ?? "",
          postal_code: profileRes.data.postal_code ?? "",
          city: profileRes.data.city ?? "",
          phone: profileRes.data.phone ?? "",
          email_contact: profileRes.data.email_contact ?? "",
        });
      }
      if (lettersRes.data) setLetters(lettersRes.data as Letter[]);
      setLoading(false);
    });
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/login"); return; }

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: session.user.id, ...profile }, { onConflict: "id" });

    if (error) {
      setError("Erreur lors de la sauvegarde.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleDownloadPDF = async (letter: Letter) => {
    setDownloadingId(letter.id);
    try {
      const senderAddress = [profile.address, `${profile.postal_code} ${profile.city}`]
        .filter(Boolean).join("\n");
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: letter.generated_text,
          senderName: letter.sender_name || profile.full_name,
          senderAddress,
          typeName: letter.type_name || letter.type,
        }),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lettre-${letter.type}-lettreMagique.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Erreur lors de la génération du PDF.");
    } finally {
      setDownloadingId(null);
    }
  };

  const field = (
    id: keyof Profile,
    label: string,
    placeholder: string,
    type: "text" | "tel" | "email" = "text",
    isTextarea = false
  ) => (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[1.5px] mb-2"
        style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          value={profile[id]}
          onChange={(e) => setProfile((p) => ({ ...p, [id]: e.target.value }))}
          placeholder={placeholder}
          rows={2}
          className="w-full px-4 py-3 text-sm outline-none resize-none"
          style={{
            fontFamily: "var(--font-lora)",
            background: "var(--paper2)",
            border: "1.5px solid var(--rule)",
            color: "var(--ink)",
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={profile[id]}
          onChange={(e) => setProfile((p) => ({ ...p, [id]: e.target.value }))}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-sm outline-none"
          style={{
            fontFamily: "var(--font-lora)",
            background: "var(--paper2)",
            border: "1.5px solid var(--rule)",
            color: "var(--ink)",
          }}
        />
      )}
    </div>
  );

  if (loading) return null;

  return (
    <div className="pt-14">
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
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
          >
            Mon compte
          </div>
          <h1
            className="font-extrabold leading-[0.92] tracking-[-2px]"
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(28px, 3.5vw, 44px)" }}
          >
            Mes{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-lora)", fontWeight: 500 }}>
              coordonnées
            </em>
          </h1>
          <p
            className="mt-4 text-base leading-[1.7]"
            style={{ fontFamily: "var(--font-lora)", color: "#888" }}
          >
            Sauvegardées et pré-remplies automatiquement à chaque courrier.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-16 py-10 md:py-16">
        <div className="max-w-[700px] mx-auto">
          <form onSubmit={handleSave}>
            {/* Identité */}
            <div
              className="mb-8 p-6 border-[2px]"
              style={{ borderColor: "var(--rule)" }}
            >
              <div
                className="text-[10px] uppercase tracking-[2px] mb-5"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
              >
                Identité
              </div>
              <div className="space-y-4">
                {field("full_name", "Nom complet *", "Prénom Nom")}
                {field("email_contact", "Email de contact", "vous@example.com", "email")}
                {field("phone", "Téléphone", "06 00 00 00 00", "tel")}
              </div>
            </div>

            {/* Adresse */}
            <div
              className="mb-8 p-6 border-[2px]"
              style={{ borderColor: "var(--rule)" }}
            >
              <div
                className="text-[10px] uppercase tracking-[2px] mb-5"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
              >
                Adresse postale
              </div>
              <div className="space-y-4">
                {field("address", "Rue et numéro *", "12 rue de la Paix", "text", true)}
                <div className="grid grid-cols-2 gap-4">
                  {field("postal_code", "Code postal *", "75001")}
                  {field("city", "Ville *", "Paris")}
                </div>
              </div>
            </div>

            {error && (
              <div
                className="mb-6 p-4 text-sm"
                style={{ fontFamily: "var(--font-dm-mono)", background: "#fde8e4", color: "var(--accent)", border: "1px solid var(--accent)" }}
              >
                {error}
              </div>
            )}

            {saved && (
              <div
                className="mb-6 p-4 text-sm"
                style={{ fontFamily: "var(--font-dm-mono)", background: "#e8f5e9", color: "var(--green)", border: "1px solid var(--green)" }}
              >
                ✓ Coordonnées sauvegardées
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full py-5 text-sm font-bold uppercase tracking-[0.5px] text-white transition-all duration-200 disabled:opacity-50"
              style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
            >
              {saving ? "Sauvegarde…" : "Sauvegarder mes coordonnées →"}
            </button>
          </form>
        </div>
      </section>

      {/* ═══ HISTORIQUE ═══ */}
      <section
        className="px-4 md:px-16 py-10 md:py-16"
        style={{ borderTop: "1px solid var(--rule)", background: "var(--paper2)" }}
      >
        <div className="max-w-[700px] mx-auto">
          <div
            className="text-[10px] uppercase tracking-[2px] mb-6"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
          >
            Mes courriers générés
          </div>

          {letters.length === 0 ? (
            <div
              className="p-6 border-[2px] text-sm text-center"
              style={{ borderColor: "var(--rule)", color: "var(--muted-lm)", fontFamily: "var(--font-lora)" }}
            >
              Aucun courrier généré pour l&apos;instant.{" "}
              <Link href="/generateur" className="no-underline font-semibold" style={{ color: "var(--accent)" }}>
                Générer mon premier courrier →
              </Link>
            </div>
          ) : (
            <div className="space-y-[2px]">
              {letters.map((letter) => (
                <div key={letter.id} style={{ border: "2px solid var(--rule)", background: "var(--white-warm)" }}>
                  <button
                    onClick={() => setExpandedId(expandedId === letter.id ? null : letter.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    <div>
                      <div
                        className="text-sm font-bold"
                        style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
                      >
                        {letter.type_name || letter.type}
                      </div>
                      <div
                        className="text-[10px] mt-0.5"
                        style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
                      >
                        {new Date(letter.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric", month: "long", year: "numeric"
                        })}
                      </div>
                    </div>
                    <span style={{ color: "var(--muted-lm)", fontSize: 18 }}>
                      {expandedId === letter.id ? "▲" : "▼"}
                    </span>
                  </button>

                  {expandedId === letter.id && (
                    <div
                      style={{ borderTop: "1px solid var(--rule)" }}
                    >
                      <div
                        className="px-5 pt-4 pb-3 text-sm leading-[1.8] whitespace-pre-wrap"
                        style={{ fontFamily: "var(--font-lora)", color: "var(--ink)" }}
                      >
                        {letter.generated_text}
                      </div>
                      <div className="px-5 pb-5">
                        <button
                          onClick={() => handleDownloadPDF(letter)}
                          disabled={downloadingId === letter.id}
                          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.5px] text-white transition-all duration-200 disabled:opacity-50"
                          style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
                        >
                          {downloadingId === letter.id ? "Génération PDF…" : "⬇ Télécharger le PDF"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
