"use client";

import { useState } from "react";

interface UserDetail {
  id: string;
  email: string;
  created_at: string;
  is_pro: boolean;
  letters_count: number;
  types_used: string[];
  last_activity: string | null;
  credits: number;
}

export default function UserDetailPanel({
  users,
}: {
  users: UserDetail[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const selected = users.find((u) => u.id === selectedId);

  async function handleAction(action: string, userId: string) {
    setActionMsg(null);
    try {
      const res = await fetch("/api/admin/user-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionMsg(data.message ?? "Action effectuée");
      } else {
        setActionMsg(data.error ?? "Erreur");
      }
    } catch {
      setActionMsg("Erreur réseau");
    }
  }

  return (
    <div>
      <div className="border-[2px]" style={{ borderColor: "var(--rule)" }}>
        {users.length === 0 ? (
          <div
            className="px-5 py-4 text-sm"
            style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
          >
            Aucun inscrit encore.
          </div>
        ) : (
          users.map((u, i) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setSelectedId(selectedId === u.id ? null : u.id)}
              className="flex items-center justify-between px-5 py-3 w-full text-left cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                borderTop: i > 0 ? "1px solid var(--rule)" : undefined,
                background:
                  selectedId === u.id
                    ? "#f0ece4"
                    : i % 2 === 0
                      ? "var(--white-warm)"
                      : "var(--paper2)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="text-sm"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--ink)" }}
                >
                  {u.email}
                </div>
                {u.is_pro && (
                  <span
                    className="text-[9px] uppercase tracking-[1px] px-1.5 py-0.5"
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      background: "var(--accent)",
                      color: "#fff",
                    }}
                  >
                    Pro
                  </span>
                )}
                <span
                  className="text-[9px] tracking-[1px]"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
                >
                  {u.letters_count} courrier{u.letters_count !== 1 ? "s" : ""}
                </span>
              </div>
              <div
                className="text-[11px] shrink-0"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
              >
                {new Date(u.created_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </button>
          ))
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div
          className="mt-2 border-[2px] p-5 space-y-4"
          style={{ borderColor: "var(--accent)", background: "var(--white-warm)" }}
        >
          <div className="flex items-center justify-between">
            <div
              className="text-sm font-bold"
              style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
            >
              {selected.email}
            </div>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="text-xs cursor-pointer"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
            >
              fermer
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Inscription", value: new Date(selected.created_at).toLocaleDateString("fr-FR") },
              { label: "Courriers", value: String(selected.letters_count) },
              { label: "Statut", value: selected.is_pro ? "Pro" : "Free" },
              { label: "Crédits", value: String(selected.credits) },
            ].map((item) => (
              <div key={item.label}>
                <div
                  className="text-[9px] uppercase tracking-[1px]"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
                >
                  {item.label}
                </div>
                <div
                  className="text-sm font-bold mt-0.5"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {selected.types_used.length > 0 && (
            <div>
              <div
                className="text-[9px] uppercase tracking-[1px] mb-1"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
              >
                Types utilisés
              </div>
              <div className="flex flex-wrap gap-1">
                {selected.types_used.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5"
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      background: "#f0ece4",
                      color: "var(--ink)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selected.last_activity && (
            <div
              className="text-[10px]"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
            >
              Dernière activité : {new Date(selected.last_activity).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-2" style={{ borderTop: "1px solid var(--rule)" }}>
            <button
              type="button"
              onClick={() => handleAction("grant_credits", selected.id)}
              className="text-[10px] uppercase tracking-[1px] px-3 py-1.5 cursor-pointer transition-opacity hover:opacity-80"
              style={{
                fontFamily: "var(--font-dm-mono)",
                background: "var(--ink)",
                color: "var(--white-warm)",
              }}
            >
              +5 crédits
            </button>
            <button
              type="button"
              onClick={() => handleAction("make_pro", selected.id)}
              className="text-[10px] uppercase tracking-[1px] px-3 py-1.5 cursor-pointer transition-opacity hover:opacity-80"
              style={{
                fontFamily: "var(--font-dm-mono)",
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              Passer Pro
            </button>
            <button
              type="button"
              onClick={() => handleAction("send_email", selected.id)}
              className="text-[10px] uppercase tracking-[1px] px-3 py-1.5 cursor-pointer transition-opacity hover:opacity-80"
              style={{
                fontFamily: "var(--font-dm-mono)",
                background: "#2d6a4f",
                color: "#fff",
              }}
            >
              Envoyer un email
            </button>
          </div>

          {actionMsg && (
            <div
              className="text-[11px] mt-2"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
            >
              {actionMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
