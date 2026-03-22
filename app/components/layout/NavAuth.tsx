"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function NavAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
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
