"use client";

import { useEffect, useState } from "react";

interface Feedback {
  id: string;
  user_id: string | null;
  email: string | null;
  type: string;
  message: string;
  page_url: string | null;
  status: string;
  created_at: string;
}

const TYPE_BADGES: Record<string, { label: string; color: string; bg: string }> = {
  bug: { label: "🐛 Bug", color: "#c0392b", bg: "#c0392b18" },
  suggestion: { label: "💡 Idée", color: "#f59e0b", bg: "#f59e0b18" },
  autre: { label: "📝 Autre", color: "var(--muted-lm)", bg: "#88888818" },
};

const STATUS_BADGES: Record<string, { label: string; color: string; bg: string }> = {
  nouveau: { label: "Nouveau", color: "var(--accent)", bg: "#c84b2f18" },
  lu: { label: "Lu", color: "var(--gold, #f59e0b)", bg: "#f59e0b18" },
  resolu: { label: "Résolu", color: "var(--green, #2d6a4f)", bg: "#2d6a4f18" },
};

export default function FeedbackPanel() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchFeedbacks = async () => {
    const res = await fetch("/api/admin/feedback");
    if (res.ok) setFeedbacks(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/feedback", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchFeedbacks();
  };

  const filtered = feedbacks.filter((f) => {
    if (filterType !== "all" && f.type !== filterType) return false;
    if (filterStatus !== "all" && f.status !== filterStatus) return false;
    return true;
  });

  const nouveauCount = feedbacks.filter((f) => f.status === "nouveau").length;

  const mono = { fontFamily: "var(--font-dm-mono)" };

  if (loading) return <div style={{ ...mono, color: "var(--muted-lm)" }} className="text-sm">Chargement…</div>;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap items-center">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-2 py-1.5 text-[10px] uppercase tracking-[1px] outline-none"
          style={{ ...mono, background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
        >
          <option value="all">Tous les types</option>
          <option value="bug">Bug</option>
          <option value="suggestion">Suggestion</option>
          <option value="autre">Autre</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-2 py-1.5 text-[10px] uppercase tracking-[1px] outline-none"
          style={{ ...mono, background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
        >
          <option value="all">Tous les statuts</option>
          <option value="nouveau">Nouveau ({nouveauCount})</option>
          <option value="lu">Lu</option>
          <option value="resolu">Résolu</option>
        </select>
        <span className="text-[10px]" style={{ ...mono, color: "var(--muted-lm)" }}>
          {filtered.length} feedback{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* List */}
      <div className="border-[2px]" style={{ borderColor: "var(--rule)" }}>
        {filtered.length === 0 ? (
          <div className="px-5 py-4 text-sm" style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}>
            Aucun feedback.
          </div>
        ) : (
          filtered.map((fb, i) => {
            const typeBadge = TYPE_BADGES[fb.type] || TYPE_BADGES.autre;
            const statusBadge = STATUS_BADGES[fb.status] || STATUS_BADGES.nouveau;
            return (
              <div
                key={fb.id}
                className="px-4 md:px-5 py-4"
                style={{
                  borderTop: i > 0 ? "1px solid var(--rule)" : undefined,
                  background: fb.status === "nouveau" ? "var(--white-warm)" : i % 2 === 0 ? "var(--white-warm)" : "var(--paper2)",
                }}
              >
                {/* Header: badges + date */}
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-[9px] uppercase tracking-[0.5px] px-1.5 py-0.5" style={{ ...mono, color: typeBadge.color, background: typeBadge.bg, border: `1px solid ${typeBadge.color}33` }}>
                    {typeBadge.label}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.5px] px-1.5 py-0.5" style={{ ...mono, color: statusBadge.color, background: statusBadge.bg, border: `1px solid ${statusBadge.color}33` }}>
                    {statusBadge.label}
                  </span>
                  <span className="text-[10px]" style={{ ...mono, color: "var(--muted-lm)" }}>
                    {new Date(fb.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                {/* Message */}
                <p className="text-sm mb-2" style={{ fontFamily: "var(--font-lora)", color: "var(--ink)", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                  {fb.message}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 text-[10px] mb-3" style={{ ...mono, color: "var(--muted-lm)" }}>
                  {fb.email && <span>✉ {fb.email}</span>}
                  {fb.page_url && <span>📄 {fb.page_url}</span>}
                  {fb.user_id && <span>👤 {fb.user_id.slice(0, 8)}…</span>}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {fb.status === "nouveau" && (
                    <button
                      onClick={() => updateStatus(fb.id, "lu")}
                      className="px-3 py-1.5 text-[10px] uppercase tracking-[1px] cursor-pointer"
                      style={{ ...mono, border: "1px solid var(--rule)", background: "white", color: "var(--ink)" }}
                    >
                      Marquer lu
                    </button>
                  )}
                  {fb.status !== "resolu" && (
                    <button
                      onClick={() => updateStatus(fb.id, "resolu")}
                      className="px-3 py-1.5 text-[10px] uppercase tracking-[1px] cursor-pointer"
                      style={{ ...mono, border: "1px solid var(--green, #2d6a4f)33", background: "#2d6a4f18", color: "var(--green, #2d6a4f)" }}
                    >
                      ✓ Résolu
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
