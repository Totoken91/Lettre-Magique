import Link from "next/link";

export default function FooterMinimal() {
  return (
    <footer
      className="px-4 md:px-8 py-3 border-t"
      style={{
        background: "var(--ink)",
        borderColor: "#222",
        fontFamily: "var(--font-dm-mono)",
        fontSize: "10px",
        color: "#444",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span>© 2026 LettreMagique · Outil d&apos;aide à la rédaction, ne constitue pas un conseil juridique.</span>
        <div className="flex gap-4">
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
      </div>
    </footer>
  );
}
