"use client";

import { useEffect, useRef, useState } from "react";

interface PdfPreviewProps {
  /** PDF blob URL or null if not yet generated */
  pdfUrl: string | null;
  loading?: boolean;
}

/**
 * Renders a PDF as canvas images — no browser toolbar.
 * Uses pdf.js to render each page at 2x resolution for sharp display.
 */
export default function PdfPreview({ pdfUrl, loading }: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    if (!pdfUrl) {
      setPageImages([]);
      return;
    }

    let cancelled = false;

    async function renderPdf() {
      setRendering(true);
      try {
        // Dynamic import to keep it client-only
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

        const pdfBytes = await fetch(pdfUrl!).then((r) => r.arrayBuffer());
        const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;

        const images: string[] = [];
        const scale = 2; // 2x for retina sharpness

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d")!;

          await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
          images.push(canvas.toDataURL("image/png"));
        }

        if (!cancelled) setPageImages(images);
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setRendering(false);
      }
    }

    renderPdf();
    return () => { cancelled = true; };
  }, [pdfUrl]);

  if (loading || rendering) {
    return (
      <div
        className="flex items-center justify-center py-20"
        style={{
          background: "#e8e8e8",
          color: "var(--muted-lm)",
          fontFamily: "var(--font-dm-mono)",
          fontSize: "12px",
        }}
      >
        Génération de l&apos;aperçu…
      </div>
    );
  }

  if (pageImages.length === 0) {
    return (
      <div
        className="flex items-center justify-center py-20"
        style={{
          background: "#e8e8e8",
          color: "var(--muted-lm)",
          fontFamily: "var(--font-dm-mono)",
          fontSize: "12px",
        }}
      >
        Aperçu non disponible
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-4 py-4 px-2"
      style={{ background: "#d4d4d4" }}
    >
      {pageImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Page ${i + 1}`}
          className="w-full max-w-full shadow-lg"
          style={{
            maxWidth: "100%",
            height: "auto",
            background: "white",
          }}
          draggable={false}
        />
      ))}
    </div>
  );
}
