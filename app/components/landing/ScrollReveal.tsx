"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js-ready");

    const reveals = Array.from(document.querySelectorAll(".reveal"));

    const show = (el: Element) => {
      el.classList.add("visible");
    };

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

    reveals.forEach((el) => observer.observe(el));

    // Fallback hard: tout visible après 1.5s quoi qu'il arrive
    const fallback = setTimeout(() => reveals.forEach(show), 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
      // Ne pas retirer js-ready : évite le flash opacity:0 au retour arrière
    };
  }, []);

  return null;
}
