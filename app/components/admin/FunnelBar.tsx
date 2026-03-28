"use client";

interface FunnelStep {
  label: string;
  value: number;
}

const SHORT_LABELS: Record<string, string> = {
  "Visiteurs": "Visiteurs",
  "Page générateur": "Générateur",
  "Ont généré un courrier": "Courrier généré",
  "Comptes créés": "Inscrits",
  "Abonnés Pro": "Pro",
};

export default function FunnelBar({ steps }: { steps: FunnelStep[] }) {
  const max = Math.max(...steps.map((s) => s.value), 1);
  const firstValue = steps[0]?.value || 1;

  return (
    <div className="space-y-1.5">
      {steps.map((step, i) => {
        const pct = max > 0 ? (step.value / max) * 100 : 0;
        // Conversion rate from the FIRST step (global funnel %)
        const globalRate = i > 0 && firstValue > 0
          ? ((step.value / firstValue) * 100).toFixed(1)
          : null;
        const label = SHORT_LABELS[step.label] || step.label;

        return (
          <div key={step.label}>
            {globalRate && (
              <div
                className="text-[9px] tracking-[1px] mb-0.5 ml-[98px] md:ml-[138px]"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}
              >
                ↓ {globalRate}%
              </div>
            )}
            <div className="flex items-center gap-2 md:gap-3">
              <div
                className="shrink-0 w-[90px] md:w-[130px] text-[9px] md:text-[10px] text-right uppercase tracking-[0.5px] md:tracking-[1px] leading-tight"
                style={{ fontFamily: "var(--font-dm-mono)", color: "var(--ink)" }}
              >
                {label}
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
