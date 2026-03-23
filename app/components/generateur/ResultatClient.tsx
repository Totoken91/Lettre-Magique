"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import AuthModal from "./AuthModal";
import LetterViewer from "./LetterViewer";

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingDownload, setPendingDownload] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("lm_result");
    if (!stored) {
      router.push("/generateur");
      return;
    }
    setResult(JSON.parse(stored));

    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });
  }, [router]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsLoggedIn(true);
    setPendingDownload(true);
  };

  // When auth succeeds and pendingDownload is true, the LetterViewer
  // will re-render with isLoggedIn=true allowing download

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
      {showAuthModal && (
        <AuthModal
          context="download"
          onSuccess={handleAuthSuccess}
          onClose={() => setShowAuthModal(false)}
        />
      )}

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
            style={{ fontFamily: "var(--font-dm-mono)", color: "var(--green)" }}
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
            Vérifiez le contenu ci-dessous, modifiez-le si besoin, puis
            téléchargez votre PDF.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-16 py-10 md:py-12">
        <div className="max-w-[700px] mx-auto">
          <LetterViewer
            text={result.text}
            type={result.type}
            typeName={result.typeName}
            senderName={result.senderName}
            senderAddress={result.senderAddress}
            isLoggedIn={isLoggedIn ?? false}
            onAuthRequired={() => setShowAuthModal(true)}
          />

          <div className="flex gap-3 mt-6">
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
      </section>
    </>
  );
}
