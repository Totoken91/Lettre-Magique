"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function FeedbackButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bug" | "suggestion" | "autre">("suggestion");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Hide on admin pages
  if (pathname.startsWith("/admin")) return null;

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message, email: email || undefined, pageUrl: pathname }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => { setOpen(false); setSent(false); setMessage(""); setEmail(""); }, 2500);
      }
    } catch { /* ignore */ }
    setSending(false);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:scale-105"
        style={{ background: "var(--ink)", border: "2px solid var(--accent)", color: "var(--white-warm)" }}
        aria-label="Donner votre avis"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Popover */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-40 w-[320px] max-w-[calc(100vw-32px)] shadow-xl"
          style={{ background: "var(--paper)", border: "2px solid var(--rule)" }}
        >
          <div className="px-5 py-4">
            <div className="text-[10px] uppercase tracking-[2px] mb-3" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}>
              Votre avis
            </div>

            {sent ? (
              <div className="py-6 text-center">
                <div className="text-2xl mb-2">✓</div>
                <div className="text-sm font-bold" style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}>
                  Merci pour votre retour !
                </div>
              </div>
            ) : (
              <>
                {/* Type select */}
                <div className="flex gap-1 mb-3">
                  {([["bug", "🐛 Bug"], ["suggestion", "💡 Idée"], ["autre", "📝 Autre"]] as const).map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setType(val)}
                      className="flex-1 py-2 text-[10px] uppercase tracking-[0.5px] cursor-pointer transition-colors"
                      style={{
                        fontFamily: "var(--font-dm-mono)",
                        background: type === val ? "var(--ink)" : "var(--paper2)",
                        color: type === val ? "var(--white-warm)" : "var(--muted-lm)",
                        border: `1.5px solid ${type === val ? "var(--ink)" : "var(--rule)"}`,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Message */}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                  placeholder="Décrivez votre problème ou idée..."
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm outline-none resize-none mb-2"
                  style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
                />
                <div className="text-[9px] text-right mb-2" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
                  {message.length}/1000
                </div>

                {/* Email (optional) */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email (optionnel)"
                  className="w-full px-3 py-2.5 text-sm outline-none mb-3"
                  style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
                />

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={sending || !message.trim()}
                  className="w-full py-3 text-xs font-bold uppercase tracking-[0.5px] text-white disabled:opacity-50 cursor-pointer"
                  style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", border: "none" }}
                >
                  {sending ? "Envoi…" : "Envoyer"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
