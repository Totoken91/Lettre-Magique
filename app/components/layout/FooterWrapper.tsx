"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import FooterMinimal from "./FooterMinimal";
import FooterLanding from "./FooterLanding";

export default function FooterWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/generateur")) return <FooterMinimal />;
  if (pathname === "/") return <FooterLanding />;
  return <Footer />;
}
