"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

export default function AuthModal({ onSuccess, onClose }: Props) {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

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

        <div className="p-8">
          {confirmSent ? (
            /* Email sent state */
            <div className="text-center py-4">
              <div className="text-4xl mb-4">✉️</div>
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
                    ? "Créez votre compte pour générer votre courrier"
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
                  disabled={loading}
                  className="w-full py-4 text-sm font-bold uppercase tracking-[0.5px] text-white transition-all duration-200 disabled:opacity-50"
                  style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
                >
                  {loading
                    ? "…"
                    : mode === "signup"
                    ? "Créer mon compte et générer →"
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
