import {
  MailX, AlertCircle, Scale, ShieldAlert, DoorOpen,
  BadgeDollarSign, Undo2, CalendarClock, FileCheck, PenLine,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const ICONS: Record<string, ComponentType<LucideProps>> = {
  "resiliation":      MailX,
  "reclamation":      AlertCircle,
  "mise-en-demeure":  Scale,
  "contestation":     ShieldAlert,
  "conge-locataire":  DoorOpen,
  "remboursement":    BadgeDollarSign,
  "retractation":     Undo2,
  "delai-paiement":   CalendarClock,
  "attestation":      FileCheck,
  "courrier-libre":   PenLine,
};

interface Props {
  typeId: string;
  size?: number;
  color?: string;
  /** Wrap in a styled square box */
  box?: boolean;
}

export default function LetterTypeIcon({ typeId, size = 18, color = "var(--accent)", box = false }: Props) {
  const Icon = ICONS[typeId];
  if (!Icon) return null;

  if (box) {
    return (
      <div
        className="shrink-0 flex items-center justify-center w-10 h-10"
        style={{ background: "var(--paper2)", border: "1px solid var(--rule)" }}
      >
        <Icon size={size} strokeWidth={1.5} color={color} />
      </div>
    );
  }

  return <Icon size={size} strokeWidth={1.5} color={color} />;
}
