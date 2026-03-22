"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll(".reveal"));

    const show = (el: Element) => el.classList.add("visible");

    // 1. Vérification SYNCHRONE : éléments déjà visibles → immédiats, pas de flash
    const toObserve: Element[] = [];
    for (const el of reveals) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        show(el);
      } else {
        toObserve.push(el);
      }
    }

    // 2. Seulement APRÈS avoir montré les éléments visibles, activer le masquage
    document.documentElement.classList.add("js-ready");

    // 3. Observer le reste (hors viewport)
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
  }, []);

  return null;
}
