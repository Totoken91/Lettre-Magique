"use client";

import {
  Scissors,
  Warning,
  Gavel,
  House,
  ShieldCheck,
  Prohibit,
  Briefcase,
  ArrowUUpLeft,
  HourglassMedium,
  Stamp,
  PenNib,
  type IconProps,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

const ICONS: Record<string, ComponentType<IconProps>> = {
  "resiliation":      Scissors,
  "reclamation":      Warning,
  "logement":         House,
  "assurance":        ShieldCheck,
  "mise-en-demeure":  Gavel,
  "contestation":     Prohibit,
  "travail":          Briefcase,
  "retractation":     ArrowUUpLeft,
  "delai-paiement":   HourglassMedium,
  "attestation":      Stamp,
  "courrier-libre":   PenNib,
};

interface Props {
  typeId: string;
  size?: number;
  color?: string;
  /** Wrap in a styled square box */
  box?: boolean;
}

export default function LetterTypeIcon({ typeId, size = 32, color = "#c84b2f", box = false }: Props) {
  const Icon = ICONS[typeId];
  if (!Icon) return null;

  if (box) {
    return (
      <div
        className="shrink-0 flex items-center justify-center w-10 h-10"
        style={{ background: "var(--paper2)", border: "1px solid var(--rule)" }}
      >
        <Icon size={size} weight="duotone" color={color} />
      </div>
    );
  }

  return <Icon size={size} weight="duotone" color={color} />;
}
