"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    const show = (el: Element) => el.classList.add("visible");

    // Remove js-ready first to avoid flash of hidden content
    document.documentElement.classList.remove("js-ready");
    reveals.forEach((el) => el.classList.remove("visible"));

    // Show elements already in viewport
    const toObserve: Element[] = [];
    for (const el of reveals) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        show(el);
      } else {
        toObserve.push(el);
      }
    }

    // Enable hiding AFTER visible elements are shown
    document.documentElement.classList.add("js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    toObserve.forEach((el) => observer.observe(el));

    const fallback = setTimeout(() => reveals.forEach(show), 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}
