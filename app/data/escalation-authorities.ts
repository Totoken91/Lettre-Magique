// ═══════════════════════════════════════════════
// Deadline & escalation authority configuration
// ═══════════════════════════════════════════════

export interface EscalationAuthority {
  name: string;
  description: string;
  url?: string;
}

interface DeadlineConfig {
  defaultDays: number | null; // null = no deadline tracking
  authorities: EscalationAuthority[];
}

// ── Authorities ──────────────────────────────────────────────────

const MEDIATEUR_CONSO: EscalationAuthority = {
  name: "Médiateur de la consommation",
  description: "Saisissez gratuitement le médiateur dont dépend l'entreprise (indiqué dans ses CGV ou sur sa facture). Il dispose de 90 jours pour proposer une solution.",
  url: "https://www.economie.gouv.fr/mediation-conso",
};

const DGCCRF: EscalationAuthority = {
  name: "DGCCRF — SignalConso",
  description: "Signalez le litige sur SignalConso. La DGCCRF peut enquêter et sanctionner l'entreprise en cas de pratique abusive.",
  url: "https://signal.conso.gouv.fr",
};

const TRIBUNAL_JUDICIAIRE: EscalationAuthority = {
  name: "Tribunal judiciaire",
  description: "Pour les litiges supérieurs à 5 000 €, saisissez le tribunal judiciaire. En dessous, le tribunal de proximité. L'injonction de payer (formulaire Cerfa n°12948) ne nécessite pas d'avocat.",
  url: "https://www.justice.fr",
};

const COMMISSAIRE_JUSTICE: EscalationAuthority = {
  name: "Commissaire de justice (huissier)",
  description: "Pour les créances inférieures à 5 000 €, la procédure simplifiée de recouvrement par commissaire de justice est rapide et peu coûteuse.",
};

const CDC: EscalationAuthority = {
  name: "Commission départementale de conciliation",
  description: "Saisissez la CDC de votre département pour les litiges locatifs (loyer, charges, dépôt de garantie, réparations). Procédure gratuite.",
  url: "https://www.service-public.fr/particuliers/vosdroits/F1216",
};

const DEFENSEUR_DROITS: EscalationAuthority = {
  name: "Défenseur des droits",
  description: "Pour contester une décision administrative ou un manquement d'un service public. Saisine gratuite en ligne.",
  url: "https://www.defenseurdesdroits.fr",
};

const MEDIATEUR_ASSURANCE: EscalationAuthority = {
  name: "Médiateur de l'assurance",
  description: "Saisissez le médiateur de l'assurance si votre compagnie refuse votre demande. Délai de réponse : 90 jours.",
  url: "https://www.mediation-assurance.org",
};

const INSPECTION_TRAVAIL: EscalationAuthority = {
  name: "Inspection du travail (DREETS)",
  description: "Signalez la situation à l'inspection du travail de votre département. Elle peut intervenir auprès de votre employeur.",
  url: "https://dreets.gouv.fr",
};

const PRUDHOMMES: EscalationAuthority = {
  name: "Conseil de prud'hommes",
  description: "Saisissez les prud'hommes pour tout litige avec votre employeur (salaire, licenciement, sanction). Pas besoin d'avocat. Délai : 12 mois pour agir.",
  url: "https://www.justice.fr/fiche/saisir-conseil-prudhommes",
};

// ── Deadline config par type ─────────────────────────────────────

const DEADLINE_CONFIG: Record<string, DeadlineConfig> = {
  "mise-en-demeure": {
    defaultDays: 15, // overridden by form_data.delai
    authorities: [COMMISSAIRE_JUSTICE, TRIBUNAL_JUDICIAIRE],
  },
  reclamation: {
    defaultDays: 30,
    authorities: [MEDIATEUR_CONSO, DGCCRF, TRIBUNAL_JUDICIAIRE],
  },
  contestation: {
    defaultDays: 30,
    authorities: [DEFENSEUR_DROITS, TRIBUNAL_JUDICIAIRE],
  },
  logement: {
    defaultDays: 30,
    authorities: [CDC, TRIBUNAL_JUDICIAIRE],
  },
  assurance: {
    defaultDays: 30,
    authorities: [MEDIATEUR_ASSURANCE, TRIBUNAL_JUDICIAIRE],
  },
  travail: {
    defaultDays: 30,
    authorities: [INSPECTION_TRAVAIL, PRUDHOMMES],
  },
  // Types sans deadline
  resiliation: { defaultDays: null, authorities: [] },
  retractation: { defaultDays: null, authorities: [] },
  "delai-paiement": { defaultDays: null, authorities: [] },
  "courrier-libre": { defaultDays: null, authorities: [] },
};

// ── Fonctions utilitaires ────────────────────────────────────────

export function parseDelaiToDays(delai: string): number | null {
  if (!delai) return null;
  const match = delai.match(/(\d+)/);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  if (delai.toLowerCase().includes("heure")) return Math.ceil(num / 24);
  return num;
}

export function calculateDeadline(
  type: string,
  formData: Record<string, string>,
  createdAt: Date
): Date | null {
  const config = DEADLINE_CONFIG[type];
  if (!config || config.defaultDays === null) return null;

  let days = config.defaultDays;

  // mise-en-demeure: use form field if available
  if (type === "mise-en-demeure" && formData.delai) {
    const parsed = parseDelaiToDays(formData.delai);
    if (parsed) days = parsed;
  }

  return new Date(createdAt.getTime() + days * 86_400_000);
}

export function getEscalationAuthorities(
  type: string,
): EscalationAuthority[] {
  return DEADLINE_CONFIG[type]?.authorities ?? [];
}
