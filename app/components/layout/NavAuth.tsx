"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Quota {
  isPro: boolean;
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
        color: isEmpty ? "var(--accent)" : "#999",
        border: `1px solid ${isEmpty ? "var(--accent)" : "#444"}`,
        opacity: isEmpty ? 1 : 0.7,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: isEmpty ? "var(--accent)" : "#555",
          flexShrink: 0,
        }}
      />
      {remaining}/{quota.limit} lettre{(quota.limit ?? 0) > 1 ? "s" : ""}
    </Link>
  );
}

export default function NavAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [quota, setQuota] = useState<Quota | null>(null);
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!ready) return null;

  if (user) {
    return (
      <div className="flex items-center gap-4 md:gap-5">
        <Link
          href="/compte"
          className="hidden md:block nav-link text-[11px] uppercase tracking-[1.5px] no-underline transition-colors duration-200"
          style={{ fontFamily: "var(--font-dm-mono)", color: "#666" }}
        >
          Mon compte
        </Link>
        <QuotaBadge quota={quota} />
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
          style={{ fontFamily: "var(--font-dm-mono)", color: "#666", background: "none", border: "none", cursor: "pointer" }}
        >
          Déconnecter
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5">
      <Link
        href="/login"
        className="nav-link text-[11px] uppercase tracking-[1.5px] no-underline transition-colors duration-200"
        style={{ fontFamily: "var(--font-dm-mono)", color: "#666" }}
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
    </div>
  );
}
