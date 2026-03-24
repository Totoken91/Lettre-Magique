import Link from "next/link";

export default function FooterLanding() {
  return (
    <footer
      className="px-4 md:px-16 py-8 md:py-10"
      style={{ background: "var(--ink)", color: "#555", fontFamily: "var(--font-dm-mono)", fontSize: "11px" }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        {/* Brand */}
        <div>
          <div className="text-2xl font-bold tracking-tight mb-1.5" style={{ fontFamily: "var(--font-syne)", color: "var(--white-warm)" }}>
            Lettre<span style={{ color: "var(--accent)" }}>Magique</span>
          </div>
          <div>Vos courriers administratifs en 2 minutes.</div>
          <div className="mt-1">Propulsé par l&apos;IA Claude (Anthropic).</div>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-start md:items-end gap-2.5">
          <div className="flex flex-wrap gap-4 md:gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors no-underline" style={{ color: "#555" }}>Mentions légales</Link>
            <Link href="/cgu" className="hover:text-white transition-colors no-underline" style={{ color: "#555" }}>CGU</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors no-underline" style={{ color: "#555" }}>Confidentialité</Link>
          </div>
          <div style={{ color: "#333" }}>
            © 2026 LettreMagique · Outil d&apos;aide à la rédaction, ne constitue pas un conseil juridique.
          </div>
        </div>
      </div>
    </footer>
  );
}
