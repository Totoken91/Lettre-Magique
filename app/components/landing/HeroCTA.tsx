"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function HeroCTA() {
  const [href, setHref] = useState("/signup");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setHref("/generateur");
    });
  }, []);

  return (
    <Link
      href={href}
      className="btn-primary inline-flex items-center gap-2.5 px-9 py-4 text-sm font-bold text-white uppercase tracking-[0.5px] no-underline transition-all duration-200"
      style={{ fontFamily: "var(--font-syne)", background: "var(--accent)" }}
    >
      Essayer gratuitement →
    </Link>
  );
}
