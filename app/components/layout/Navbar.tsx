import Link from "next/link";
import NavAuth from "./NavAuth";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-14 flex justify-between items-center px-12"
      style={{
        background: "var(--ink)",
        borderBottom: "3px solid var(--accent)",
      }}
    >
      <Link href="/" className="no-underline">
        <span
          className="text-lg font-bold tracking-tight"
          style={{
            fontFamily: "var(--font-syne)",
            color: "var(--white-warm)",
          }}
        >
          Lettre<span style={{ color: "var(--accent)" }}>Magique</span>
        </span>
      </Link>

      <div className="flex items-center gap-7">
        <Link
          href="/#comment"
          className="nav-link text-[11px] uppercase tracking-[1.5px] no-underline transition-colors duration-200"
          style={{ fontFamily: "var(--font-dm-mono)", color: "#666" }}
        >
          Comment ça marche
        </Link>
        <Link
          href="/#tarifs"
          className="nav-link text-[11px] uppercase tracking-[1.5px] no-underline transition-colors duration-200"
          style={{ fontFamily: "var(--font-dm-mono)", color: "#666" }}
        >
          Tarifs
        </Link>
        <NavAuth />
      </div>
    </nav>
  );
}
