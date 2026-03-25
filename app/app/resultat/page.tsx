import type { Metadata } from "next";
import ResultatClient from "@/components/generateur/ResultatClient";

export const metadata: Metadata = {
  title: "Votre courrier est prêt — LettreMagique",
};

export default function ResultatPage() {
  return (
    <div className="pt-16">
      <ResultatClient />
    </div>
  );
}
