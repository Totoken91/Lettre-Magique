"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import LetterViewer from "@/components/generateur/LetterViewer";

interface Letter {
  id: string;
  created_at: string;
  type_name: string;
  type: string;
  generated_text: string;
  sender_name: string | null;
  form_data: Record<string, string> | null;
  is_favorite: boolean;
}

interface Profile {
  full_name: string;
  address: string;
  postal_code: string;
  city: string;
  phone: string;
  email_contact: string;
}

function extractRecipient(formData: Record<string, string> | null): string {
  if (!formData) return "";
  return formData.destinataire || formData.bailleur || formData.creancier || "";
}

function extractTitle(letter: Letter): string {
  const recipient = extractRecipient(letter.form_data);
  const typeName = letter.type_name || letter.type;
  if (recipient) return `${typeName} — ${recipient}`;
  return typeName;
}

export default function MesCourriersPage() {
  const router = useRouter();
  const [letters, setLetters] = useState<Letter[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showFavOnly, setShowFavOnly] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push("/login"); return; }

      const [profileRes, lettersRes] = await Promise.all([
        supabase.from("profiles").select("full_name, address, postal_code, city, phone, email_contact").eq("id", session.user.id).single(),
        supabase.from("letters").select("id, created_at, type_name, type, generated_text, sender_name, form_data, is_favorite").eq("user_id", session.user.id).order("created_at", { ascending: false }),
      ]);

      if (profileRes.data) setProfile(profileRes.data as unknown as Profile);
      if (lettersRes.data) {
        const list = (lettersRes.data as unknown as Letter[]).map((l) => ({ ...l, is_favorite: l.is_favorite ?? false }));
        setLetters(list);
        if (list.length > 0) setSelectedId(list[0].id);
      }
      setLoading(false);
    });
  }, [router]);

  const toggleFavorite = async (id: string) => {
    const letter = letters.find((l) => l.id === id);
    if (!letter) return;
    const newVal = !letter.is_favorite;
    setLetters((prev) => prev.map((l) => l.id === id ? { ...l, is_favorite: newVal } : l));
    await supabase.from("letters").update({ is_favorite: newVal }).eq("id", id);
  };

  const types = useMemo(() => {
    const set = new Set(letters.map((l) => l.type_name || l.type));
    return Array.from(set).sort();
  }, [letters]);

  const filtered = useMemo(() => {
    return letters.filter((l) => {
      if (showFavOnly && !l.is_favorite) return false;
      if (filterType !== "all" && (l.type_name || l.type) !== filterType) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const title = extractTitle(l).toLowerCase();
        const text = l.generated_text?.toLowerCase() || "";
        if (!title.includes(q) && !text.includes(q)) return false;
      }
      return true;
    });
  }, [letters, search, filterType, showFavOnly]);

  const selectedLetter = letters.find((l) => l.id === selectedId) ?? null;

  const senderAddress = profile
    ? [profile.address, `${profile.postal_code} ${profile.city}`].filter(Boolean).join("\n")
    : "";

  if (loading) return null;

  return (
    <div className="pt-14">
      {/* Header */}
      <section className="relative overflow-hidden px-4 md:px-16 py-10 md:py-16" style={{ background: "var(--ink)", color: "var(--white-warm)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-[4px]" style={{ background: "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)" }} />
        <div className="max-w-[980px] mx-auto">
          <div className="text-[11px] uppercase tracking-[3px] mb-5" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}>Mon espace</div>
          <h1 className="font-extrabold leading-[0.92] tracking-[-2px]" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(28px, 3.5vw, 44px)" }}>
            Mes{" "}<em style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-lora)", fontWeight: 500 }}>courriers</em>
          </h1>
          <p className="mt-4 text-base leading-[1.7]" style={{ fontFamily: "var(--font-lora)", color: "#888" }}>
            Retrouvez, modifiez et retéléchargez tous vos courriers générés.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-16 py-10 md:py-12">
        <div className="max-w-[980px] mx-auto">
          {letters.length === 0 ? (
            <div className="p-8 border-[2px] text-center" style={{ borderColor: "var(--rule)", color: "var(--muted-lm)", fontFamily: "var(--font-lora)" }}>
              Aucun courrier généré pour l&apos;instant.{" "}
              <Link href="/generateur" className="no-underline font-semibold" style={{ color: "var(--accent)" }}>Générer mon premier courrier →</Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar */}
              <div className="md:w-[300px] shrink-0">
                {/* Search */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher…"
                  className="w-full px-3 py-2.5 text-sm outline-none mb-3"
                  style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
                />

                {/* Filters */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-2 py-1.5 text-[10px] uppercase tracking-[1px] outline-none"
                    style={{ fontFamily: "var(--font-dm-mono)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
                  >
                    <option value="all">Tous les types</option>
                    {types.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <button
                    onClick={() => setShowFavOnly((v) => !v)}
                    className="px-2.5 py-1.5 text-[10px] uppercase tracking-[1px] cursor-pointer"
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      background: showFavOnly ? "var(--accent)" : "transparent",
                      color: showFavOnly ? "#fff" : "var(--muted-lm)",
                      border: `1.5px solid ${showFavOnly ? "var(--accent)" : "var(--rule)"}`,
                    }}
                  >
                    ★ Favoris
                  </button>
                </div>

                <div className="text-[10px] uppercase tracking-[2px] mb-2" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                  {filtered.length} courrier{filtered.length > 1 ? "s" : ""}
                </div>

                <div className="flex flex-col gap-[2px] max-h-[500px] overflow-y-auto">
                  {filtered.map((letter) => (
                    <button
                      key={letter.id}
                      onClick={() => setSelectedId(letter.id)}
                      className="w-full text-left px-4 py-3.5 transition-colors duration-150 border-none cursor-pointer group"
                      style={{
                        background: selectedId === letter.id ? "var(--ink)" : "var(--white-warm)",
                        border: "2px solid",
                        borderColor: selectedId === letter.id ? "var(--ink)" : "var(--rule)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold leading-tight truncate" style={{ fontFamily: "var(--font-syne)", color: selectedId === letter.id ? "var(--white-warm)" : "var(--ink)" }}>
                            {extractTitle(letter)}
                          </div>
                          <div className="text-[10px] mt-1" style={{ fontFamily: "var(--font-dm-mono)", color: selectedId === letter.id ? "#999" : "var(--muted-lm)" }}>
                            {new Date(letter.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(letter.id); }}
                          className="text-[14px] shrink-0 mt-0.5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                          style={{ background: "none", border: "none", color: letter.is_favorite ? "var(--accent)" : (selectedId === letter.id ? "#666" : "var(--rule)") }}
                          title={letter.is_favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                        >
                          {letter.is_favorite ? "★" : "☆"}
                        </button>
                      </div>
                    </button>
                  ))}
                </div>

                <Link
                  href="/generateur"
                  className="block mt-4 py-3 text-center text-xs font-bold uppercase tracking-[0.5px] no-underline transition-colors duration-200 hover:brightness-90"
                  style={{ fontFamily: "var(--font-syne)", border: "1.5px solid var(--accent)", color: "var(--accent)" }}
                >
                  + Nouveau courrier
                </Link>
              </div>

              {/* Main viewer */}
              <div className="flex-1 min-w-0">
                {selectedLetter ? (
                  <LetterViewer
                    key={selectedLetter.id}
                    text={selectedLetter.generated_text}
                    type={selectedLetter.type}
                    typeName={selectedLetter.type_name || selectedLetter.type}
                    senderName={selectedLetter.sender_name || profile?.full_name || ""}
                    senderAddress={senderAddress}
                    senderPhone={profile?.phone}
                    senderEmail={profile?.email_contact}
                    isLoggedIn={true}
                  />
                ) : (
                  <div className="flex items-center justify-center py-20" style={{ color: "var(--muted-lm)", fontFamily: "var(--font-dm-mono)", fontSize: "12px" }}>
                    Sélectionnez un courrier
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
