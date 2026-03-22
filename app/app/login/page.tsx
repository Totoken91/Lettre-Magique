"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/generateur";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }
    router.push(redirect);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-14"
      style={{ background: "var(--paper)" }}
    >
      <div className="w-full max-w-[420px]">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="no-underline">
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
            >
              Lettre<span style={{ color: "var(--accent)" }}>Magique</span>
            </span>
          </Link>
          <h1
            className="text-[28px] font-extrabold tracking-[-1px] mt-6 mb-2"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Connexion
          </h1>
          <p
            className="text-sm"
            style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
          >
            Pas encore de compte ?{" "}
            <Link
              href="/signup"
              className="no-underline font-semibold"
              style={{ color: "var(--accent)" }}
            >
              Créer un compte
            </Link>
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 border-[2px]"
          style={{ borderColor: "var(--ink)", background: "var(--white-warm)" }}
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] uppercase tracking-[1.5px] mb-2"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="vous@example.com"
                className="w-full px-4 py-3 text-sm outline-none"
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
                htmlFor="password"
                className="block text-[11px] uppercase tracking-[1.5px] mb-2"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 text-sm outline-none"
                style={{
                  fontFamily: "var(--font-lora)",
                  background: "var(--paper2)",
                  border: "1.5px solid var(--rule)",
                  color: "var(--ink)",
                }}
              />
            </div>
          </div>

          {error && (
            <div
              className="mt-5 p-3 text-sm"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-7 py-4 text-sm font-bold uppercase tracking-[0.5px] text-white transition-all duration-200 disabled:opacity-50"
            style={{
              fontFamily: "var(--font-syne)",
              background: "var(--accent)",
            }}
          >
            {loading ? "Connexion…" : "Se connecter →"}
          </button>
        </form>
      </div>
    </div>
  );
}
