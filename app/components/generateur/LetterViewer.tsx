"use client";

import { useState, useEffect, useCallback } from "react";

interface LetterViewerProps {
  text: string;
  type: string;
  typeName: string;
  senderName: string;
  senderAddress: string;
  /** Called when user edits the text */
  onTextChange?: (text: string) => void;
  /** Hide the auth gate (user is already logged in) */
  isLoggedIn?: boolean;
  /** Called when anonymous user clicks download */
  onAuthRequired?: () => void;
}

/** Render minimal markdown (bold, italic) to HTML */
function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}

export default function LetterViewer({
  text,
  type,
  typeName,
  senderName,
  senderAddress,
  onTextChange,
  isLoggedIn = true,
  onAuthRequired,
}: LetterViewerProps) {
  const [editedText, setEditedText] = useState(text);
  const [editing, setEditing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "copied">("idle");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const currentText = editedText;

  const pdfPayload = {
    text: currentText,
    type,
    typeName,
    senderName,
    senderAddress,
  };

  /** Generate PDF preview blob URL */
  const generatePdfPreview = useCallback(async () => {
    setLoadingPreview(true);
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pdfPayload),
      });
      if (!res.ok) throw new Error("PDF error");
      const blob = await res.blob();
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch {
      // silently fail
    } finally {
      setLoadingPreview(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentText, type, typeName, senderName, senderAddress]);

  // Auto-generate PDF preview on mount
  useEffect(() => {
    generatePdfPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync if parent changes text prop
  useEffect(() => {
    setEditedText(text);
  }, [text]);

  const handleTextEdit = (newText: string) => {
    setEditedText(newText);
    onTextChange?.(newText);
  };

  const handleEmailClick = () => {
    navigator.clipboard.writeText(currentText).catch(() => {});
    const subject = encodeURIComponent(`${typeName} — LettreMagique`);
    const body = encodeURIComponent(currentText);
    const fullUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href =
      fullUrl.length <= 1800 ? fullUrl : `mailto:?subject=${subject}`;
    setEmailStatus("copied");
    setTimeout(() => setEmailStatus("idle"), 3500);
  };

  const triggerDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pdfPayload),
      });
      if (!res.ok) throw new Error("PDF error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lettre-${type}-lettreMagique.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Erreur lors de la génération du PDF. Veuillez réessayer.");
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadClick = () => {
    if (!isLoggedIn && onAuthRequired) {
      onAuthRequired();
    } else {
      triggerDownload();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ═══ 1. APERÇU PDF (en premier) ═══ */}
      <div
        className="border-[2px]"
        style={{ borderColor: "var(--rule)" }}
      >
        <div
          className="px-6 py-3 flex items-center justify-between border-b"
          style={{ borderColor: "var(--rule)", background: "var(--paper2)" }}
        >
          <span
            className="text-[10px] uppercase tracking-[2px]"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
          >
            Aperçu PDF
          </span>
          <button
            onClick={generatePdfPreview}
            disabled={loadingPreview}
            className="text-[10px] uppercase tracking-[1px] px-2.5 py-1 cursor-pointer border transition-colors duration-200 disabled:opacity-50"
            style={{
              fontFamily: "var(--font-dm-mono)",
              background: "transparent",
              color: "var(--muted-lm)",
              borderColor: "var(--rule)",
            }}
          >
            {loadingPreview ? "Chargement…" : "↻ Rafraîchir"}
          </button>
        </div>
        {loadingPreview && !pdfUrl ? (
          <div
            className="flex items-center justify-center py-20"
            style={{ background: "#f5f5f5", color: "var(--muted-lm)", fontFamily: "var(--font-dm-mono)", fontSize: "12px" }}
          >
            Génération de l&apos;aperçu PDF…
          </div>
        ) : pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full border-none"
            style={{ height: "700px", background: "#f5f5f5" }}
            title="Aperçu PDF"
          />
        ) : (
          <div
            className="flex items-center justify-center py-20"
            style={{ background: "#f5f5f5", color: "var(--muted-lm)", fontFamily: "var(--font-dm-mono)", fontSize: "12px" }}
          >
            Aperçu non disponible
          </div>
        )}
      </div>

      {/* ═══ 2. ACTIONS ═══ */}
      <div className="flex flex-col gap-3">
        {/* Bandeau inscription si non connecté */}
        {!isLoggedIn && (
          <div
            className="p-5 border-[2px]"
            style={{ borderColor: "var(--accent)", background: "var(--paper2)" }}
          >
            <p
              className="text-[11px] uppercase tracking-[1.5px] mb-1"
              style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
            >
              Inscription requise
            </p>
            <p
              className="text-[14px] leading-[1.5] mb-0"
              style={{ fontFamily: "var(--font-lora)", color: "var(--ink)" }}
            >
              Créez un compte gratuit pour télécharger votre PDF. Vos courriers
              seront sauvegardés dans votre espace personnel.
            </p>
          </div>
        )}

        <button
          onClick={handleDownloadClick}
          disabled={downloading}
          className="w-full py-5 text-sm font-bold uppercase tracking-[0.5px] text-white transition-all duration-200 disabled:opacity-50 cursor-pointer hover:brightness-90"
          style={{
            fontFamily: "var(--font-syne)",
            background: downloading ? "#888" : "var(--accent)",
          }}
        >
          {downloading
            ? "Génération PDF…"
            : !isLoggedIn
            ? "Créer un compte pour télécharger le PDF"
            : "⬇ Télécharger le PDF"}
        </button>

        <button
          onClick={handleEmailClick}
          className="w-full py-4 text-sm font-bold uppercase tracking-[0.5px] transition-all duration-200 cursor-pointer hover:brightness-95"
          style={{
            fontFamily: "var(--font-syne)",
            border: "1.5px solid var(--ink)",
            color: emailStatus === "copied" ? "var(--green, #2e7d32)" : "var(--ink)",
            background: "transparent",
          }}
        >
          {emailStatus === "copied"
            ? "✓ Lettre copiée — colle-la dans ton email"
            : "✉ Envoyer par email"}
        </button>
      </div>

      {/* ═══ 3. TEXTE ÉDITABLE (en dessous) ═══ */}
      <div
        className="border-[2px]"
        style={{ borderColor: "var(--rule)" }}
      >
        <div
          className="px-6 py-3 flex items-center justify-between border-b"
          style={{ borderColor: "var(--rule)", background: "var(--paper2)" }}
        >
          <span
            className="text-[10px] uppercase tracking-[2px]"
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
          >
            {editing ? "Mode édition" : "Texte du courrier"}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (editing && pdfUrl) {
                  URL.revokeObjectURL(pdfUrl);
                  setPdfUrl(null);
                  // Auto-refresh PDF preview after edit
                  setTimeout(() => generatePdfPreview(), 50);
                }
                setEditing(!editing);
              }}
              className="text-[10px] uppercase tracking-[1px] px-2.5 py-1 cursor-pointer border transition-colors duration-200"
              style={{
                fontFamily: "var(--font-dm-mono)",
                background: editing ? "var(--accent)" : "transparent",
                color: editing ? "white" : "var(--muted-lm)",
                borderColor: editing ? "var(--accent)" : "var(--rule)",
              }}
            >
              {editing ? "✓ Valider" : "✎ Éditer"}
            </button>
            <span
              className="text-[10px] uppercase tracking-[1px] px-2 py-0.5"
              style={{
                fontFamily: "var(--font-dm-mono)",
                background: "var(--green)",
                color: "white",
              }}
            >
              IA Claude
            </span>
          </div>
        </div>
        {editing ? (
          <textarea
            value={editedText}
            onChange={(e) => handleTextEdit(e.target.value)}
            className="w-full p-8 leading-[1.9] text-[15px] outline-none resize-y border-none"
            style={{
              fontFamily: "var(--font-lora)",
              background: "var(--white-warm)",
              color: "var(--ink)",
              minHeight: "400px",
            }}
          />
        ) : (
          <div
            className="p-8 leading-[1.9] text-[15px]"
            style={{
              fontFamily: "var(--font-lora)",
              background: "var(--white-warm)",
              color: "var(--ink)",
            }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(currentText) }}
          />
        )}
      </div>

      {/* Disclaimer */}
      <div
        className="p-4 border text-sm leading-[1.6]"
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "11px",
          borderColor: "var(--rule)",
          color: "var(--muted-lm)",
        }}
      >
        Ce PDF inclut vos coordonnées, la date d&apos;aujourd&apos;hui, la mise en
        page professionnelle et les mentions légales applicables.
        <br />
        <strong style={{ color: "var(--ink)" }}>
          Créé avec LettreMagique.fr
        </strong>{" "}
        — outil d&apos;aide à la rédaction, ne constitue pas un conseil
        juridique.
      </div>
    </div>
  );
}
