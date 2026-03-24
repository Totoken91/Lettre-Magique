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
        className="hidden md:flex items-center gap-1 px-2.5 py-1 text-[9px] uppercase tracking-[1.5px]"
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
      className="hidden md:flex items-center gap-1.5 px-2.5 py-1 no-underline transition-opacity duration-200 hover:opacity-100"
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

  // Close menu on route change
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
        <div className="flex items-center gap-4 md:gap-5">
          <Link
            href="/compte"
            className="hidden md:block nav-link text-[11px] uppercase tracking-[1.5px] no-underline transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)" }}
          >
            Mon compte
          </Link>
          <QuotaBadge quota={quota} />
          {quota && !quota.isPro && (
            <Link
              href="/tarifs"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[1px] no-underline transition-opacity duration-200 hover:opacity-90"
              style={{
                fontFamily: "var(--font-syne)",
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              Passer Pro
            </Link>
          )}
          {quota?.isAdmin && (
            <Link
              href="/admin"
              className="hidden md:block nav-link text-[11px] uppercase tracking-[1.5px] no-underline transition-colors duration-200 px-2.5 py-1"
              style={{
                fontFamily: "var(--font-dm-mono)",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
                opacity: 0.85,
              }}
            >
              Admin
            </Link>
          )}
          <Link
            href="/generateur"
            className="nav-cta px-5 py-2 text-xs font-bold uppercase tracking-[1px] text-white no-underline"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
          >
            Générer
          </Link>
          <button
            onClick={handleSignOut}
            className="hidden md:block nav-link text-[11px] uppercase tracking-[1.5px] transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)", background: "none", border: "none", cursor: "pointer" }}
          >
            Déconnecter
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 items-center"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Menu"
          >
            <span style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? "var(--accent)" : "var(--rule)", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? "transparent" : "var(--rule)", transition: "all 0.2s" }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? "var(--accent)" : "var(--rule)", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="hidden md:block nav-link text-[11px] uppercase tracking-[1.5px] no-underline transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)" }}
          >
            Se connecter
          </Link>
          <Link
            href="/signup"
            className="nav-cta px-5 py-2 text-xs font-bold uppercase tracking-[1px] text-white no-underline"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
          >
            Créer un compte
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 items-center"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Menu"
          >
            <span style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? "var(--accent)" : "var(--rule)", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? "transparent" : "var(--rule)", transition: "all 0.2s" }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? "var(--accent)" : "var(--rule)", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>
      )}

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-14 left-0 right-0 z-40 flex flex-col overflow-y-auto"
          style={{ background: "var(--ink)", borderBottom: "2px solid var(--accent)", maxHeight: "calc(100dvh - 56px)" }}
        >
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

          {user ? (
            <>
              {quota && (
                <div
                  className="px-6 py-4 text-[11px] uppercase tracking-[1.5px] border-b"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)", borderColor: "#222" }}
                >
                  {quota.isPro ? "Pro · Illimité" : `${quota.remaining ?? 0} lettre${(quota.remaining ?? 0) !== 1 ? "s" : ""} restante${(quota.remaining ?? 0) !== 1 ? "s" : ""}`}
                </div>
              )}
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
              <Link
                href="/compte"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-4 text-[11px] uppercase tracking-[1.5px] no-underline border-b"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)", borderColor: "#333" }}
              >
                Mon compte
              </Link>
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
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 text-[11px] uppercase tracking-[1.5px] no-underline"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--rule)" }}
            >
              Se connecter
            </Link>
          )}
        </div>
      )}
    </>
  );
}
