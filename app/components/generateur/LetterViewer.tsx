"use client";

import { useState, useEffect, useCallback } from "react";
import PdfPreview from "./PdfPreview";

interface LetterViewerProps {
  text: string;
  type: string;
  typeName: string;
  senderName: string;
  senderAddress: string;
  senderPhone?: string;
  senderEmail?: string;
  refNumber?: string;
  signatureMode?: "typed" | "print";
  signatureImageBase64?: string;
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
  senderPhone,
  senderEmail,
  refNumber,
  signatureMode,
  signatureImageBase64,
  onTextChange,
  isLoggedIn = true,
  onAuthRequired,
}: LetterViewerProps) {
  const [editedText, setEditedText] = useState(text);
  const [editing, setEditing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState<"idle" | "sent" | "error">("idle");
  const [allowReply, setAllowReply] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const currentText = editedText;

  const pdfPayload = {
    text: currentText,
    type,
    typeName,
    senderName,
    senderAddress,
    senderPhone,
    senderEmail,
    refNumber,
    signatureMode,
    signatureImageBase64,
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
  }, [currentText, type, typeName, senderName, senderAddress, senderPhone, senderEmail, refNumber, signatureMode, signatureImageBase64]);

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

  const handleSendEmail = async () => {
    if (!recipientEmail.trim()) return;
    setSendingEmail(true);
    setEmailResult("idle");
    try {
      const res = await fetch("/api/send-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail,
          ...pdfPayload,
          senderEmail: allowReply ? senderEmail : undefined,
        }),
      });
      if (!res.ok) throw new Error("Send failed");
      setEmailResult("sent");
      setTimeout(() => { setEmailDialog(false); setEmailResult("idle"); setRecipientEmail(""); }, 2500);
    } catch {
      setEmailResult("error");
    } finally {
      setSendingEmail(false);
    }
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
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="text-[10px] uppercase tracking-[1px] px-3 py-2 cursor-pointer border transition-colors duration-200"
              style={{
                fontFamily: "var(--font-dm-mono)",
                background: copied ? "var(--ink)" : "transparent",
                color: copied ? "white" : "var(--muted-lm)",
                borderColor: copied ? "var(--ink)" : "var(--rule)",
              }}
            >
              {copied ? "✓ Copié" : "⎘ Copier"}
            </button>
            <button
              onClick={generatePdfPreview}
              disabled={loadingPreview}
              className="text-[10px] uppercase tracking-[1px] px-3 py-2 cursor-pointer border transition-colors duration-200 disabled:opacity-50"
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
        </div>
        <PdfPreview pdfUrl={pdfUrl} loading={loadingPreview && !pdfUrl} />
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
          onClick={() => {
            if (!isLoggedIn && onAuthRequired) { onAuthRequired(); return; }
            setEmailDialog(true);
          }}
          className="w-full py-4 text-sm font-bold uppercase tracking-[0.5px] transition-all duration-200 cursor-pointer hover:brightness-95"
          style={{
            fontFamily: "var(--font-syne)",
            border: "1.5px solid var(--ink)",
            color: "var(--ink)",
            background: "transparent",
          }}
        >
          ✉ Envoyer par LM Justice
        </button>
        <p className="text-[10px] mt-2 text-center" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
          Envoi depuis courrier@lm-justice.com · Suivi des délais et relances automatiques
        </p>
      </div>

      {/* Email dialog */}
      {emailDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setEmailDialog(false)}>
          <div
            className="w-full max-w-[440px] p-6"
            style={{ background: "var(--paper)", border: "2px solid var(--rule)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[10px] uppercase tracking-[2px] mb-4" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}>
              Envoyer par LM Justice
            </div>
            <p className="text-sm mb-3" style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}>
              Le PDF sera envoyé en pièce jointe depuis <strong style={{ color: "var(--ink)" }}>courrier@lm-justice.com</strong>. Un suivi automatique est activé : vous serez notifié à l&apos;expiration du délai avec les autorités compétentes à saisir.
            </p>
            {senderEmail && (
              <label className="flex items-start gap-2 mb-4 px-3 py-2 cursor-pointer select-none" style={{ fontFamily: "var(--font-dm-mono)", background: "var(--paper2)", border: "1px solid var(--rule)" }}>
                <input
                  type="checkbox"
                  checked={allowReply}
                  onChange={(e) => setAllowReply(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[var(--accent)] cursor-pointer shrink-0"
                />
                <span className="text-xs" style={{ color: "var(--muted-lm)", lineHeight: "1.5" }}>
                  Autoriser le destinataire à me répondre sur{" "}
                  <strong style={{ color: "var(--ink)" }}>{senderEmail}</strong>
                </span>
              </label>
            )}
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Email du destinataire"
              className="w-full px-4 py-3 text-sm outline-none mb-3"
              style={{ fontFamily: "var(--font-lora)", background: "var(--paper2)", border: "1.5px solid var(--rule)", color: "var(--ink)" }}
              onKeyDown={(e) => e.key === "Enter" && handleSendEmail()}
              autoFocus
            />
            {emailResult === "sent" && (
              <div className="mb-4 p-3 text-sm" style={{ fontFamily: "var(--font-dm-mono)", background: "#e8f5e9", color: "var(--green)" }}>
                ✓ Email envoyé avec succès
              </div>
            )}
            {emailResult === "error" && (
              <div className="mb-4 p-3 text-sm" style={{ fontFamily: "var(--font-dm-mono)", background: "#fde8e4", color: "var(--accent)" }}>
                Erreur d&apos;envoi. Vérifiez l&apos;adresse et réessayez.
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleSendEmail}
                disabled={sendingEmail || !recipientEmail.includes("@")}
                className="flex-1 py-3 text-sm font-bold uppercase tracking-[0.5px] text-white disabled:opacity-50 cursor-pointer"
                style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", border: "none" }}
              >
                {sendingEmail ? "Envoi…" : "Envoyer le PDF"}
              </button>
              <button
                onClick={() => setEmailDialog(false)}
                className="px-5 py-3 text-sm uppercase tracking-[0.5px] cursor-pointer"
                style={{ fontFamily: "var(--font-syne)", background: "transparent", border: "1.5px solid var(--rule)", color: "var(--muted-lm)" }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

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
              onClick={handleCopy}
              className="text-[10px] uppercase tracking-[1px] px-2.5 py-1 cursor-pointer border transition-colors duration-200"
              style={{
                fontFamily: "var(--font-dm-mono)",
                background: copied ? "var(--ink)" : "transparent",
                color: copied ? "white" : "var(--muted-lm)",
                borderColor: copied ? "var(--ink)" : "var(--rule)",
              }}
            >
              {copied ? "✓ Copié" : "⎘ Copier"}
            </button>
            <button
              onClick={() => {
                if (editing && pdfUrl) {
                  URL.revokeObjectURL(pdfUrl);
                  setPdfUrl(null);
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
          Créé avec LettreMagique.com
        </strong>{" "}
        — outil d&apos;aide à la rédaction, ne constitue pas un conseil
        juridique.
      </div>
    </div>
  );
}
