"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import FooterMinimal from "./FooterMinimal";

export default function FooterWrapper() {
  const pathname = usePathname();
  return pathname.startsWith("/generateur") ? <FooterMinimal /> : <Footer />;
}
