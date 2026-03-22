"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/generateur`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 pt-14"
        style={{ background: "var(--paper)" }}
      >
        <div className="w-full max-w-[420px] text-center">
          <div
            className="text-5xl mb-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            ✉️
          </div>
          <h1
            className="text-[28px] font-extrabold tracking-[-1px] mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Vérifiez vos emails
          </h1>
          <p
            className="text-base leading-[1.7] mb-6"
            style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
          >
            Un lien de confirmation a été envoyé à{" "}
            <strong style={{ color: "var(--ink)" }}>{email}</strong>.
            <br />
            Cliquez sur le lien pour activer votre compte.
          </p>
          <Link
            href="/login"
            className="no-underline text-sm font-semibold"
            style={{ color: "var(--accent)", fontFamily: "var(--font-dm-mono)" }}
          >
            Retour à la connexion →
          </Link>
        </div>
      </div>
    );
  }

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
            Créer un compte
          </h1>
          <p
            className="text-sm"
            style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
          >
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="no-underline font-semibold"
              style={{ color: "var(--accent)" }}
            >
              Se connecter
            </Link>
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 border-[2px]"
          style={{ borderColor: "var(--ink)", background: "var(--white-warm)" }}
        >
          <div
            className="text-[10px] uppercase tracking-[2px] mb-6 pb-4"
            style={{
              fontFamily: "var(--font-dm-mono)",
              color: "var(--green)",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            ✓ Premier courrier gratuit · Sans carte bancaire
          </div>

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
                autoComplete="new-password"
                placeholder="8 caractères minimum"
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
            {loading ? "Création du compte…" : "Créer mon compte gratuit →"}
          </button>

          <p
            className="text-center text-[10px] mt-4"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
          >
            En créant un compte, vous acceptez nos CGU et politique de confidentialité.
          </p>
        </form>
      </div>
    </div>
  );
}
