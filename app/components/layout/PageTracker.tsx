"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getOrCreateSessionId(): string {
  const key = "lm_sid";
  let sid = localStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem(key, sid);
  }
  return sid;
}

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Ne pas tracker les routes admin ou API
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    // Ignorer les navigateurs headless (CI, Playwright, Puppeteer, Vercel warmup…)
    if (navigator.webdriver) return;

    try {
      const sessionId = getOrCreateSessionId();
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, path: pathname }),
      }).catch(() => {});
    } catch {
      // localStorage peut être bloqué (mode privé strict)
    }
  }, [pathname]);

  return null;
}
