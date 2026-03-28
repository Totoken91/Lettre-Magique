"use client";

import { useState } from "react";

export default function ContactPage() {
  const [type, setType] = useState<"bug" | "suggestion" | "autre">("suggestion");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message, email: email || undefined, pageUrl: "/contact" }),
      });
      if (res.ok) setSent(true);
    } catch { /* ignore */ }
    setSending(false);
  };

  return (
    <div className="pt-16">
      <section
        className="relative overflow-hidden px-4 md:px-16 py-10 md:py-16"
        style={{ background: "var(--ink)", color: "var(--white-warm)" }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px]"
          style={{ background: "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)" }}
        />
        <div className="max-w-[600px] mx-auto">
          <div className="text-[11px] uppercase tracking-[3px] mb-5" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}>
            Contact
          </div>
          <h1 className="font-extrabold leading-[0.92] tracking-[-2px]" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(28px, 3.5vw, 44px)" }}>
            Une question, un{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--font-lora)", fontWeight: 500 }}>problème ?</em>
          </h1>
        </div>
      </section>

      <section className="px-4 md:px-16 py-10 md:py-16">
        <div className="max-w-[600px] mx-auto">
          {sent ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}>
                Message envoyé !
              </h2>
              <p className="text-sm" style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}>
                Merci pour votre retour. Nous reviendrons vers vous rapidement si vous avez laissé votre email.
              </p>
            </div>
          ) : (
            <>
              {/* Type */}
              <div className="mb-5">
                <label className="block text-[10px] uppercase tracking-[1.5px] mb-2" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                  Type de message
                </label>
                <div className="flex gap-2">
                  {([["bug", "🐛 Bug"], ["suggestion", "💡 Suggestion"], ["autre", "📝 Autre"]] as const).map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setType(val)}
                      className="flex-1 py-3 text-xs uppercase tracking-[0.5px] cursor-pointer transition-colors"
                      style={{
                        fontFamily: "var(--font-dm-mono)",
                        background: type === val ? "var(--ink)" : "var(--paper2)",
                        color: type === val ? "var(--white-warm)" : "var(--muted-lm)",
                        border: `2px solid ${type === val ? "var(--ink)" : "var(--rule)"}`,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-5">
                <label className="block text-[10px] uppercase tracking-[1.5px] mb-2" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                  Votre message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                  placeholder="Décrivez votre problème ou idée..."
                  rows={6}
                  className="w-full px-4 py-3 text-sm outline-none resize-none"
                  style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "2px solid var(--rule)", color: "var(--ink)" }}
                />
                <div className="text-[9px] text-right mt-1" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                  {message.length}/1000
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-[10px] uppercase tracking-[1.5px] mb-2" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                  Votre email (optionnel)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Pour qu'on puisse vous répondre"
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "2px solid var(--rule)", color: "var(--ink)" }}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={sending || !message.trim()}
                className="w-full py-4 text-sm font-bold uppercase tracking-[0.5px] text-white disabled:opacity-50 cursor-pointer"
                style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", border: "none" }}
              >
                {sending ? "Envoi…" : "Envoyer le message"}
              </button>

              <p className="mt-6 text-center text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                Vous pouvez aussi nous écrire directement à{" "}
                <a href="mailto:support@lm-justice.com" style={{ color: "var(--accent)" }}>support@lm-justice.com</a>
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
