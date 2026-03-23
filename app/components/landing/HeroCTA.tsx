import Link from "next/link";

export default function HeroCTA() {
  return (
    <Link
      href="/generateur"
      className="btn-primary inline-flex items-center gap-2.5 px-9 py-4 text-sm font-bold text-white uppercase tracking-[0.5px] no-underline transition-all duration-200"
      style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
    >
      Générer un courrier →
    </Link>
  );
}
