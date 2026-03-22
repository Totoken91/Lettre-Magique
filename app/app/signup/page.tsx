"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback?next=/generateur`,
      },
    });
    if (error) {
      setError("Erreur connexion Google.");
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user && data.user.identities?.length === 0) {
      setError("Un compte existe déjà avec cet email. Connectez-vous plutôt.");
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
      className="min-h-screen flex items-center justify-center px-4 pt-14 pb-16"
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

        {/* Google OAuth */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-3 mb-5 text-sm font-medium transition-all duration-200 disabled:opacity-50"
          style={{
            fontFamily: "var(--font-dm-mono)",
            background: "var(--white-warm)",
            border: "1.5px solid var(--rule)",
            color: "var(--ink)",
            cursor: "pointer",
          }}
        >
          <GoogleIcon />
          {googleLoading ? "Redirection…" : "Continuer avec Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div style={{ flex: 1, height: 1, background: "var(--rule)" }} />
          <span
            className="text-[10px] uppercase tracking-[1.5px]"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
          >
            ou
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--rule)" }} />
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
            disabled={loading || googleLoading}
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
