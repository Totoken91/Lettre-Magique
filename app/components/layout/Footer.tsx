import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="px-16 py-12 flex justify-between items-end"
      style={{
        background: "var(--ink)",
        color: "#555",
        fontFamily: "var(--font-dm-mono)",
        fontSize: "11px",
      }}
    >
      <div>
        <div
          className="text-2xl font-bold tracking-tight mb-2"
          style={{ fontFamily: "var(--font-syne)", color: "var(--white-warm)" }}
        >
          Lettre<span style={{ color: "var(--accent)" }}>Magique</span>
        </div>
        <div>Vos courriers administratifs en 2 minutes.</div>
        <div className="mt-1">Propulsé par l&apos;IA Claude (Anthropic).</div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-6">
          <Link href="/#comment-ca-marche" className="hover:text-white transition-colors no-underline" style={{ color: "#555" }}>
            Comment ça marche
          </Link>
          <Link href="/#tarifs" className="hover:text-white transition-colors no-underline" style={{ color: "#555" }}>
            Tarifs
          </Link>
          <Link href="/generateur" className="hover:text-white transition-colors no-underline" style={{ color: "#555" }}>
            Générer
          </Link>
        </div>
        <div style={{ color: "#333" }}>
          © 2026 LettreMagique · Outil d&apos;aide à la rédaction, ne constitue pas un conseil juridique.
        </div>
      </div>
    </footer>
  );
}
