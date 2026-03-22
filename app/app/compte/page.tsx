"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

interface Profile {
  full_name: string;
  address: string;
  postal_code: string;
  city: string;
  phone: string;
  email_contact: string;
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push("/login"); return; }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, address, postal_code, city, phone, email_contact")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setProfile({
          full_name: data.full_name ?? "",
          address: data.address ?? "",
          postal_code: data.postal_code ?? "",
          city: data.city ?? "",
          phone: data.phone ?? "",
          email_contact: data.email_contact ?? "",
        });
      }
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
    </div>
  );
}
