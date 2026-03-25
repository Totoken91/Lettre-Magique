import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="px-4 md:px-16 py-10 md:py-12"
      style={{
        background: "var(--ink)",
        color: "#555",
        fontFamily: "var(--font-dm-mono)",
        fontSize: "11px",
      }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 md:gap-4">
        {/* Brand */}
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

        {/* Links */}
        <div className="flex flex-col items-start md:items-end gap-3">
          {/* Nav links */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            <Link href="/comment-ca-marche" className="hover:text-white transition-colors no-underline" style={{ color: "#555" }}>
              Comment ça marche
            </Link>
            <Link href="/tarifs" className="hover:text-white transition-colors no-underline" style={{ color: "#555" }}>
              Tarifs
            </Link>
            <Link href="/generateur" className="hover:text-white transition-colors no-underline" style={{ color: "#555" }}>
              Générer
            </Link>
            <Link href="/mes-courriers" className="hover:text-white transition-colors no-underline" style={{ color: "#555" }}>
              Mes courriers
            </Link>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap gap-4 md:gap-6" style={{ color: "#444" }}>
            <Link href="/mentions-legales" className="hover:text-white transition-colors no-underline" style={{ color: "#444" }}>
              Mentions légales
            </Link>
            <Link href="/cgu" className="hover:text-white transition-colors no-underline" style={{ color: "#444" }}>
              CGU
            </Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors no-underline" style={{ color: "#444" }}>
              Confidentialité
            </Link>
          </div>

          {/* Copyright */}
          <div style={{ color: "#333" }}>
            © 2026 LettreMagique · Outil d&apos;aide à la rédaction, ne constitue pas un conseil juridique.
          </div>
        </div>
      </div>
    </footer>
  );
}
