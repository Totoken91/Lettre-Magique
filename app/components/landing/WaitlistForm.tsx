"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) {
      setError(true);
      return;
    }
    setError(false);
    // Stocker en localStorage (Wizard of Oz phase)
    const list = JSON.parse(localStorage.getItem("lm_waitlist") || "[]");
    list.push({ email, date: new Date().toISOString() });
    localStorage.setItem("lm_waitlist", JSON.stringify(list));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="p-7 mt-6 border-[2px] text-center"
        style={{ borderColor: "var(--green)" }}
      >
        <p
          className="text-[15px] font-bold m-0"
          style={{ fontFamily: "var(--font-syne)", color: "var(--green)" }}
        >
          ✓ Vous êtes inscrit ! On vous prévient dès que c&apos;est prêt.
        </p>
        <Link
          href="/generateur"
          className="inline-block mt-4 text-[11px] uppercase tracking-[1.5px] no-underline"
          style={{ fontFamily: "var(--font-dm-mono)", color: "var(--accent)" }}
        >
          Essayer quand même maintenant →
        </Link>
      </div>
    );
  }

  return (
    <div
      className="flex max-w-[440px] mx-auto border-[2px]"
      style={{ borderColor: error ? "var(--accent)" : "#333" }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setError(false); }}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="votre@email.fr"
        className="flex-1 px-5 py-4 outline-none text-sm"
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "14px",
          background: "#111",
          color: "var(--white-warm)",
          border: "none",
        }}
      />
      <button
        onClick={handleSubmit}
        className="waitlist-btn px-6 py-4 text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors duration-200 whitespace-nowrap"
        style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", border: "none", cursor: "pointer" }}
      >
        Je m&apos;inscris
      </button>
    </div>
  );
}
