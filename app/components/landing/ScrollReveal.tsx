"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    // Mark JS as active — CSS will hide .reveal elements only once this is set
    document.documentElement.classList.add("js-ready");

    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    reveals.forEach((el) => observer.observe(el));

    // Fallback: make all visible after 2s in case observer misses
    const fallback = setTimeout(() => {
      reveals.forEach((el) => el.classList.add("visible"));
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
      document.documentElement.classList.remove("js-ready");
    };
  }, []);

  return null;
}
