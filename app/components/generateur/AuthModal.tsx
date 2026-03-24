"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Mail } from "lucide-react";

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

interface Props {
  onSuccess: () => void;
  onClose: () => void;
  context?: "generate" | "download";
}

export default function AuthModal({ onSuccess, onClose, context = "generate" }: Props) {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

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
    setLoading(true);
    setError(null);

    if (mode === "signup") {
      if (password.length < 8) {
        setError("Le mot de passe doit contenir au moins 8 caractères.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      // Email déjà utilisé : Supabase retourne succès mais identities est vide
      if (data.user && data.user.identities?.length === 0) {
        setError("Un compte existe déjà avec cet email. Connectez-vous plutôt.");
        setLoading(false);
        return;
      }
      // If email confirmation is disabled in Supabase, session is immediately available
      if (data.session) {
        onSuccess();
        return;
      }
      // Email confirmation required
      setConfirmSent(true);
      setLoading(false);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Email ou mot de passe incorrect.");
        setLoading(false);
        return;
      }
      onSuccess();
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(13,13,13,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-[420px] relative"
        style={{ background: "var(--white-warm)", border: "2px solid var(--ink)" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl leading-none"
          style={{ color: "var(--muted-lm)", background: "none", border: "none", cursor: "pointer" }}
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="p-5 sm:p-8">
          {confirmSent ? (
            /* Email sent state */
            <div className="text-center py-4">
              <div className="flex justify-center mb-4"><Mail size={36} strokeWidth={1.5} color="var(--accent)" /></div>
              <h2
                className="text-xl font-extrabold mb-3"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Vérifiez vos emails
              </h2>
              <p
                className="text-sm leading-[1.7]"
                style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
              >
                Un lien de confirmation a été envoyé à{" "}
                <strong style={{ color: "var(--ink)" }}>{email}</strong>.
                <br />
                Après confirmation, revenez ici et connectez-vous.
              </p>
              <button
                onClick={() => { setConfirmSent(false); setMode("login"); }}
                className="mt-6 text-sm font-semibold"
                style={{ color: "var(--accent)", fontFamily: "var(--font-dm-mono)", background: "none", border: "none", cursor: "pointer" }}
              >
                J&apos;ai confirmé → Se connecter
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <div
                  className="text-[10px] uppercase tracking-[2px] mb-3"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
                >
                  {mode === "signup" ? "Dernière étape" : "Connexion"}
                </div>
                <h2
                  className="text-[22px] font-extrabold tracking-[-0.5px] leading-[1.2]"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {mode === "signup"
                    ? context === "download"
                      ? "Créez votre compte pour télécharger le PDF"
                      : "Créez votre compte pour générer votre courrier"
                    : context === "download"
                    ? "Connectez-vous pour télécharger le PDF"
                    : "Connectez-vous pour générer votre courrier"}
                </h2>
                {mode === "signup" && (
                  <div
                    className="mt-3 text-[11px]"
                    style={{ fontFamily: "var(--font-dm-mono)", color: "var(--green)" }}
                  >
                    ✓ Premier courrier gratuit · Sans carte bancaire
                  </div>
                )}
              </div>

              {/* Google OAuth */}
              <button
                onClick={handleGoogle}
                disabled={googleLoading || loading}
                className="w-full flex items-center justify-center gap-3 py-3 mb-5 text-sm font-medium transition-all duration-200 disabled:opacity-50"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  background: "var(--paper2)",
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="modal-email"
                    className="block text-[11px] uppercase tracking-[1.5px] mb-1.5"
                    style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
                  >
                    Email
                  </label>
                  <input
                    id="modal-email"
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
                    htmlFor="modal-password"
                    className="block text-[11px] uppercase tracking-[1.5px] mb-1.5"
                    style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
                  >
                    Mot de passe {mode === "signup" && "(8 car. min.)"}
                  </label>
                  <input
                    id="modal-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
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

                {error && (
                  <div
                    className="p-3 text-sm"
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
                  className="w-full py-4 text-sm font-bold uppercase tracking-[0.5px] text-white transition-all duration-200 disabled:opacity-50"
                  style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
                >
                  {loading
                    ? "…"
                    : mode === "signup"
                    ? context === "download"
                      ? "Créer mon compte et télécharger →"
                      : "Créer mon compte et générer →"
                    : context === "download"
                    ? "Se connecter et télécharger →"
                    : "Se connecter et générer →"}
                </button>
              </form>

              {/* Switch mode */}
              <p
                className="text-center text-[12px] mt-5"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
              >
                {mode === "signup" ? (
                  <>
                    Déjà un compte ?{" "}
                    <button
                      onClick={() => { setMode("login"); setError(null); }}
                      className="font-semibold"
                      style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Se connecter
                    </button>
                  </>
                ) : (
                  <>
                    Pas encore de compte ?{" "}
                    <button
                      onClick={() => { setMode("signup"); setError(null); }}
                      className="font-semibold"
                      style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Créer un compte
                    </button>
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
