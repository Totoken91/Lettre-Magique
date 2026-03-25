"use client";

import { useState } from "react";

interface Props {
  items: { q: string; a: string }[];
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-0">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="border-b"
            style={{ borderColor: "var(--rule)" }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-4 text-left cursor-pointer bg-transparent border-none"
              aria-expanded={isOpen}
            >
              <h3
                className="text-[15px] font-bold m-0"
                style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
              >
                {item.q}
              </h3>
              <span
                className="shrink-0 text-lg transition-transform duration-200"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "var(--accent)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-200"
              style={{ maxHeight: isOpen ? "500px" : "0px" }}
            >
              <p
                className="text-sm leading-[1.8] pb-5"
                style={{ fontFamily: "var(--font-lora)", color: "var(--muted-lm)" }}
              >
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
