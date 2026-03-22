"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ResultData {
  text: string;
  type: string;
  typeName: string;
  senderName: string;
  senderAddress: string;
  formData: Record<string, string>;
}

export default function ResultatClient() {
  const router = useRouter();
  const [result, setResult] = useState<ResultData | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("lm_result");
    if (!stored) {
      router.push("/generateur");
      return;
    }
    setResult(JSON.parse(stored));
  }, [router]);

  const handleDownloadPDF = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });
      if (!res.ok) throw new Error("PDF error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lettre-${result.type}-lettreMagique.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Erreur lors de la génération du PDF. Veuillez réessayer.");
    } finally {
      setDownloading(false);
    }
  };

  if (!result) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
      >
        Chargement…
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section
        className="relative overflow-hidden px-4 md:px-16 py-10 md:py-16"
        style={{ background: "var(--ink)", color: "var(--white-warm)" }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)",
          }}
        />
        <div className="max-w-[700px] mx-auto">
          <div
            className="text-[11px] uppercase tracking-[3px] mb-5"
            style={{
              fontFamily: "var(--font-dm-mono)",
              color: "var(--green)",
            }}
          >
            ✓ Courrier généré avec succès
          </div>
          <h1
            className="font-extrabold leading-[0.92] tracking-[-2px] mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
            }}
          >
            Votre lettre de{" "}
            <em
              style={{
                color: "var(--accent)",
                fontStyle: "italic",
                fontFamily: "var(--font-lora)",
                fontWeight: 500,
              }}
            >
              {result.typeName.toLowerCase()}
            </em>{" "}
            est prête
          </h1>
          <p
            className="text-base leading-[1.7]"
            style={{ fontFamily: "var(--font-lora)", color: "#888" }}
          >
            Vérifiez le contenu ci-dessous, puis téléchargez votre PDF.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-16 py-10 md:py-12">
        <div className="max-w-[700px] mx-auto">
          {/* Aperçu du courrier */}
          <div
            className="mb-8 border-[2px]"
            style={{ borderColor: "var(--rule)" }}
          >
            <div
              className="px-6 py-3 flex items-center justify-between border-b"
              style={{
                borderColor: "var(--rule)",
                background: "var(--paper2)",
              }}
            >
              <span
                className="text-[10px] uppercase tracking-[2px]"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  color: "var(--muted-lm)",
                }}
              >
                Aperçu du courrier
              </span>
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
            <div
              className="p-8 leading-[1.9] text-[15px] whitespace-pre-wrap"
              style={{
                fontFamily: "var(--font-lora)",
                background: "var(--white-warm)",
                color: "var(--ink)",
              }}
            >
              {result.text}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="w-full py-5 text-sm font-bold uppercase tracking-[0.5px] text-white transition-all duration-200 disabled:opacity-50"
              style={{
                fontFamily: "var(--font-syne)",
                background: downloading ? "#888" : "var(--accent)",
              }}
            >
              {downloading ? "Génération PDF…" : "⬇ Télécharger le PDF"}
            </button>

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

            <div className="flex gap-3">
              <Link
                href="/generateur"
                className="flex-1 py-3.5 text-sm font-bold uppercase tracking-[0.5px] text-center no-underline transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-syne)",
                  border: "1.5px solid var(--ink)",
                  color: "var(--ink)",
                }}
              >
                ← Nouveau courrier
              </Link>
              <Link
                href={`/generateur/${result.type}`}
                className="flex-1 py-3.5 text-sm font-semibold text-center no-underline"
                style={{
                  fontFamily: "var(--font-syne)",
                  border: "1.5px solid var(--rule)",
                  color: "var(--muted-lm)",
                }}
              >
                Modifier les infos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
