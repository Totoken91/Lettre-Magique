"use client";

import { useLayoutEffect } from "react";

export default function ScrollReveal() {
  // useLayoutEffect s'exécute AVANT que le navigateur peigne
  // → zéro flash, même au retour arrière
  useLayoutEffect(() => {
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    const show = (el: Element) => el.classList.add("visible");

    // Marquer immédiatement les éléments déjà dans le viewport
    const toObserve: Element[] = [];
    for (const el of reveals) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        show(el);
      } else {
        toObserve.push(el);
      }
    }

    // Activer le masquage APRÈS avoir montré les éléments visibles
    document.documentElement.classList.add("js-ready");

    // Observer le reste (éléments hors viewport)
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
