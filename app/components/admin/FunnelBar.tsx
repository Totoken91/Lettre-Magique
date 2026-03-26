"use client";

interface FunnelStep {
  label: string;
  value: number;
}

export default function FunnelBar({ steps }: { steps: FunnelStep[] }) {
  const max = Math.max(...steps.map((s) => s.value), 1);

  return (
    <div className="space-y-2">
      {steps.map((step, i) => {
        const pct = max > 0 ? (step.value / max) * 100 : 0;
        const prevValue = i > 0 ? steps[i - 1].value : null;
        const convRate =
          prevValue && prevValue > 0
            ? ((step.value / prevValue) * 100).toFixed(1)
            : null;

        return (
          <div key={step.label}>
            {convRate && (
              <div
                className="text-[9px] tracking-[1px] mb-0.5 ml-1"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
              >
                ↓ {convRate}%
              </div>
            )}
            <div className="flex items-center gap-3">
              <div
                className="shrink-0 w-[90px] md:w-[130px] text-[9px] md:text-[10px] text-right uppercase tracking-[1px]"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--ink)" }}
              >
                {step.label}
              </div>
              <div className="flex-1 h-7 relative" style={{ background: "#f0ece4" }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${Math.max(pct, 2)}%`,
                    background:
                      i === 0
                        ? "var(--ink)"
                        : i === steps.length - 1
                          ? "#2d6a4f"
                          : "var(--accent)",
                  }}
                />
                <span
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-bold"
                  style={{ fontFamily: "var(--font-dm-mono)", color: "var(--ink)" }}
                >
                  {step.value}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
