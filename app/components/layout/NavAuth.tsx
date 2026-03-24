"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Quota {
  isPro: boolean;
  isAdmin: boolean;
  used: number | null;
  limit: number | null;
  remaining: number | null;
}

function QuotaBadge({ quota }: { quota: Quota | null }) {
  if (!quota) return null;

  if (quota.isPro) {
    return (
      <span
        className="flex items-center gap-1 px-2.5 py-1 text-[9px] uppercase tracking-[1.5px]"
        style={{
          fontFamily: "var(--font-dm-mono)",
          color: "var(--accent)",
          border: "1px solid var(--accent)",
          opacity: 0.85,
        }}
      >
        Pro · ∞
      </span>
    );
  }

  const remaining = quota.remaining ?? 0;
  const isEmpty = remaining === 0;

  return (
    <Link
      href={isEmpty ? "/tarifs" : "#"}
      className="flex items-center gap-1.5 px-2.5 py-1 no-underline transition-opacity duration-200 hover:opacity-100"
      style={{
        fontFamily: "var(--font-dm-mono)",
        fontSize: "9px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "var(--accent)",
        border: "1px solid var(--accent)",
        opacity: isEmpty ? 1 : 0.85,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--accent)",
          flexShrink: 0,
        }}
      />
      {remaining} lettre{remaining !== 1 ? "s" : ""}
    </Link>
  );
}

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center gap-[5px] w-11 h-11 items-center"
      style={{ background: "none", border: "none", cursor: "pointer" }}
      aria-label="Menu"
    >
      <span style={{ display: "block", width: 20, height: 1.5, background: open ? "var(--accent)" : "var(--rule)", transition: "all 0.2s", transform: open ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
      <span style={{ display: "block", width: 20, height: 1.5, background: open ? "transparent" : "var(--rule)", transition: "all 0.2s" }} />
      <span style={{ display: "block", width: 20, height: 1.5, background: open ? "var(--accent)" : "var(--rule)", transition: "all 0.2s", transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
    </button>
  );
}

export default function NavAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [quota, setQuota] = useState<Quota | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const fetchQuota = async () => {
    try {
      const res = await fetch("/api/user/quota");
      if (res.ok) setQuota(await res.json());
    } catch {
      // silently ignore
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setReady(true);
      if (session?.user) fetchQuota();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchQuota();
      else setQuota(null);
    });

    window.addEventListener("quotaUpdated", fetchQuota);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener("quotaUpdated", fetchQuota);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [router]);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!ready) return null;

  return (
    <>
      {user ? (
        /* ── Connecté ── */
        <div className="flex items-center gap-4">
          {/* Visible */}
          <Link
            href="/mes-courriers"
            className="hidden md:block nav-link text-[11px] uppercase tracking-[1.5px] no-underline transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)" }}
          >
            Mes courriers
          </Link>
          <QuotaBadge quota={quota} />
          <Link
            href="/generateur"
            className="nav-cta px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-[1px] text-white no-underline"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
          >
            Générer
          </Link>
          <Hamburger open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
        </div>
      ) : (
        /* ── Non connecté ── */
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/login"
            className="hidden md:block nav-link text-[11px] uppercase tracking-[1.5px] no-underline transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)" }}
          >
            Se connecter
          </Link>
          <Link
            href="/generateur"
            className="nav-cta px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-[1px] text-white no-underline"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
          >
            Générer →
          </Link>
          <Hamburger open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
        </div>
      )}

      {/* Dropdown menu */}
      {menuOpen && (
        <div
          className="menu-slide-down fixed top-14 left-0 right-0 z-40 flex flex-col overflow-y-auto"
          style={{ background: "var(--ink)", borderBottom: "2px solid var(--accent)", maxHeight: "calc(100dvh - 56px)" }}
        >
          {user ? (
            <>
              <Link
                href="/mes-courriers"
                onClick={() => setMenuOpen(false)}
                className="md:hidden px-6 py-4 text-[11px] uppercase tracking-[1.5px] no-underline border-b"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)", borderColor: "#333" }}
              >
                Mes courriers
              </Link>
              {quota && (
                <div
                  className="md:hidden px-6 py-4 text-[11px] uppercase tracking-[1.5px] border-b"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)", borderColor: "#222" }}
                >
                  {quota.isPro ? "Pro · Illimité" : `${quota.remaining ?? 0} lettre${(quota.remaining ?? 0) !== 1 ? "s" : ""} restante${(quota.remaining ?? 0) !== 1 ? "s" : ""}`}
                </div>
              )}
              <Link
                href="/compte"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-4 text-[11px] uppercase tracking-[1.5px] no-underline border-b"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)", borderColor: "#333" }}
              >
                Mon compte
              </Link>
              <Link
                href="/tarifs"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-4 text-[11px] uppercase tracking-[1.5px] no-underline border-b"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)", borderColor: "#333" }}
              >
                Tarifs
              </Link>
              {quota && !quota.isPro && (
                <Link
                  href="/tarifs"
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-4 text-[11px] uppercase tracking-[1.5px] no-underline border-b font-bold"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--accent)", borderColor: "#222" }}
                >
                  Passer Pro →
                </Link>
              )}
              {quota?.isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-4 text-[11px] uppercase tracking-[1.5px] no-underline border-b"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)", borderColor: "#222" }}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="px-6 py-4 text-left text-[11px] uppercase tracking-[1.5px]"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)", background: "none", border: "none", cursor: "pointer" }}
              >
                Déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                href="/#comment"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-4 text-[11px] uppercase tracking-[1.5px] no-underline border-b"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)", borderColor: "#333" }}
              >
                Comment ça marche
              </Link>
              <Link
                href="/tarifs"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-4 text-[11px] uppercase tracking-[1.5px] no-underline border-b"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)", borderColor: "#333" }}
              >
                Tarifs
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="md:hidden px-6 py-4 text-[11px] uppercase tracking-[1.5px] no-underline"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)" }}
              >
                Se connecter
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
