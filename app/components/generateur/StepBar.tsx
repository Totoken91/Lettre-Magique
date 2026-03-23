"use client";

interface StepBarProps {
  current: 1 | 2;
  labels?: [string, string];
}

export default function StepBar({ current, labels = ["Type de courrier", "Vos informations"] }: StepBarProps) {
  return (
    <div className="flex items-center gap-3 mb-6 max-w-[400px]">
      {[1, 2].map((step) => {
        const isActive = step <= current;
        const isCurrent = step === current;
        return (
          <div key={step} className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2 flex-1">
              <div
                className="w-6 h-6 flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "#fff" : "#555",
                  border: isActive ? "none" : "1.5px solid #444",
                }}
              >
                {step}
              </div>
              <span
                className="text-[10px] uppercase tracking-[1px] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  color: isCurrent ? "var(--white-warm)" : "#555",
                }}
              >
                {labels[step - 1]}
              </span>
            </div>
            {step === 1 && (
              <div
                className="w-8 h-[1.5px] shrink-0"
                style={{ background: current >= 2 ? "var(--accent)" : "#333" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
