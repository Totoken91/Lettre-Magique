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

function getUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
    if (navigator.webdriver) return;

    try {
      const sessionId = getOrCreateSessionId();
      const utm = getUtmParams();
      const referrer = document.referrer || undefined;

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, path: pathname, referrer, ...utm }),
      }).catch(() => {});
    } catch {
      // localStorage peut être bloqué (mode privé strict)
    }
  }, [pathname]);

  return null;
}
