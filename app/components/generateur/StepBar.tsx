"use client";

interface StepBarProps {
  current: 1 | 2;
  labels?: [string, string];
}

export default function StepBar({
  current,
  labels = ["Type de courrier", "Vos informations"],
}: StepBarProps) {
  return (
    <div className="flex items-center mb-8" style={{ maxWidth: 480 }}>
      {[1, 2].map((step) => {
        const isCompleted = step < current;
        const isCurrent = step === current;

        return (
          <div key={step} className={`flex items-center ${step === 1 ? "flex-1" : ""}`}>
            {/* Badge + label */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div
                className="flex items-center justify-center shrink-0 transition-all duration-200"
                style={{
                  width: isCurrent ? 32 : 26,
                  height: isCurrent ? 32 : 26,
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: isCompleted ? "13px" : isCurrent ? "14px" : "11px",
                  background: isCompleted
                    ? "#2d6a4f"
                    : isCurrent
                    ? "var(--accent)"
                    : "transparent",
                  color: isCompleted || isCurrent ? "#fff" : "#555",
                  border: isCompleted || isCurrent ? "none" : "1.5px solid #444",
                }}
              >
                {isCompleted ? "✓" : step}
              </div>
              <span
                className="text-[11px] uppercase tracking-[1px] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontWeight: isCurrent ? 600 : 400,
                  color: isCurrent
                    ? "var(--white-warm)"
                    : isCompleted
                    ? "#7aad8f"
                    : "#555",
                }}
              >
                {labels[step - 1]}
              </span>
            </div>

            {/* Connector bar — only after step 1, stretches to fill space */}
            {step === 1 && (
              <div
                className="mx-4 flex-1 h-[2px] transition-colors duration-300"
                style={{ background: current >= 2 ? "var(--accent)" : "#333" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
