export type QuestionType = "text" | "textarea" | "date" | "select";

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface LetterType {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  questions: Question[];
  mentions: string[];
  seoExamples?: string[];
}

export const LETTER_TYPES: LetterType[] = [
  {
    id: "resiliation",
    emoji: "✉️",
    name: "Résiliation",
    desc: "Opérateur, abonnement, assurance",
    questions: [
      {
        id: "destinataire",
        label: "Société ou organisme à résilier",
        type: "text",
        placeholder: "Ex : Free Mobile, Orange, SFR…",
        required: true,
      },
      {
        id: "type_contrat",
        label: "Type de contrat / abonnement",
        type: "text",
        placeholder: "Ex : forfait mobile, box internet, assurance auto…",
        required: true,
      },
      {
        id: "numero_contrat",
        label: "Numéro de contrat ou de client (si disponible)",
        type: "text",
        placeholder: "Ex : 12345678",
        required: false,
      },
      {
        id: "motif",
        label: "Motif de résiliation (optionnel)",
        type: "select",
        options: [
          "Sans motif (droit légal)",
          "Déménagement",
          "Changement de situation",
          "Offre plus avantageuse",
          "Insatisfaction du service",
          "Difficultés financières",
        ],
        required: false,
      },
    ],
    mentions: ["loi_chatel", "loi_hamon"],
    seoExamples: [
      "Free Mobile",
      "SFR",
      "Orange",
      "Bouygues Telecom",
      "salle de sport",
      "mutuelle santé",
    ],
  },
  {
    id: "reclamation",
    emoji: "⚡",
    name: "Réclamation",
    desc: "Facture, produit, service défectueux",
    questions: [
      {
        id: "destinataire",
        label: "Société ou organisme concerné",
        type: "text",
        placeholder: "Ex : EDF, Amazon, Darty…",
        required: true,
      },
      {
        id: "objet_reclamation",
        label: "Objet de votre réclamation",
        type: "text",
        placeholder: "Ex : facture erronée de 150€, produit non livré…",
        required: true,
      },
      {
        id: "date_incident",
        label: "Date de l'incident ou de l'achat",
        type: "date",
        required: true,
      },
      {
        id: "demande",
        label: "Ce que vous demandez",
        type: "select",
        options: [
          "Remboursement complet",
          "Remboursement partiel",
          "Remplacement du produit",
          "Correction de la facture",
          "Intervention technique",
          "Dommages et intérêts",
        ],
        required: true,
      },
      {
        id: "details",
        label: "Détails supplémentaires (optionnel)",
        type: "textarea",
        placeholder: "Décrivez la situation en quelques mots…",
        required: false,
      },
    ],
    mentions: ["garantie_legale", "service_consommateur"],
    seoExamples: ["EDF", "Amazon", "Darty", "SNCF", "assurance habitation"],
  },
  {
    id: "mise-en-demeure",
    emoji: "⚖️",
    name: "Mise en demeure",
    desc: "Dette, remboursement, non-respect de contrat",
    questions: [
      {
        id: "destinataire",
        label: "Destinataire de la mise en demeure",
        type: "text",
        placeholder: "Nom, prénom ou raison sociale",
        required: true,
      },
      {
        id: "objet",
        label: "Objet du litige",
        type: "textarea",
        placeholder: "Ex : somme de 500€ due depuis le 01/01/2026, non-respect d'un accord…",
        required: true,
      },
      {
        id: "montant",
        label: "Montant réclamé (si applicable)",
        type: "text",
        placeholder: "Ex : 500,00 €",
        required: false,
      },
      {
        id: "delai",
        label: "Délai accordé pour régulariser",
        type: "select",
        options: [
          "8 jours",
          "15 jours",
          "30 jours",
          "48 heures (urgent)",
        ],
        required: true,
      },
    ],
    mentions: ["ar_recommande", "voies_recours"],
    seoExamples: [
      "remboursement",
      "voisin",
      "artisan travaux",
      "propriétaire",
    ],
  },
  {
    id: "contestation",
    emoji: "🛡️",
    name: "Contestation",
    desc: "Amende, décision, refus injustifié",
    questions: [
      {
        id: "destinataire",
        label: "Organisme émetteur",
        type: "text",
        placeholder: "Ex : ANTAI, SNCF, Urssaf, CAF…",
        required: true,
      },
      {
        id: "reference",
        label: "Numéro de l'avis ou référence du dossier",
        type: "text",
        placeholder: "Ex : n° 12345678",
        required: true,
      },
      {
        id: "date_document",
        label: "Date du document à contester",
        type: "date",
        required: true,
      },
      {
        id: "motif_contestation",
        label: "Motif de la contestation",
        type: "textarea",
        placeholder: "Expliquez pourquoi vous contestez…",
        required: true,
      },
    ],
    mentions: ["voies_recours", "delais_recours"],
    seoExamples: [
      "amende SNCF",
      "PV voiture",
      "Urssaf",
      "CAF",
      "décision administrative",
    ],
  },
  {
    id: "conge-locataire",
    emoji: "🏠",
    name: "Congé locataire",
    desc: "Préavis de départ, résiliation bail",
    questions: [
      {
        id: "bailleur",
        label: "Nom et adresse du bailleur / propriétaire",
        type: "textarea",
        placeholder: "Nom, prénom, adresse complète…",
        required: true,
      },
      {
        id: "adresse_logement",
        label: "Adresse du logement quitté",
        type: "text",
        placeholder: "Adresse complète du bien loué",
        required: true,
      },
      {
        id: "type_preavis",
        label: "Type de préavis",
        type: "select",
        options: [
          "1 mois (zone tendue ou meublé)",
          "3 mois (zone non tendue, vide)",
          "1 mois (motif professionnel)",
          "1 mois (motif de santé)",
        ],
        required: true,
      },
      {
        id: "date_depart",
        label: "Date de départ souhaitée",
        type: "date",
        required: true,
      },
    ],
    mentions: ["loi_alur", "preavis"],
    seoExamples: [
      "préavis 1 mois",
      "préavis 3 mois",
      "zone tendue",
      "logement meublé",
    ],
  },
  {
    id: "remboursement",
    emoji: "💰",
    name: "Demande de remboursement",
    desc: "Trop-perçu, garantie, retard livraison",
    questions: [
      {
        id: "destinataire",
        label: "Société ou organisme concerné",
        type: "text",
        placeholder: "Ex : assurance, boutique en ligne, prestataire…",
        required: true,
      },
      {
        id: "montant",
        label: "Montant à rembourser",
        type: "text",
        placeholder: "Ex : 89,90 €",
        required: true,
      },
      {
        id: "motif",
        label: "Motif du remboursement",
        type: "select",
        options: [
          "Produit non livré",
          "Produit défectueux / non conforme",
          "Service non rendu",
          "Trop-perçu ou double facturation",
          "Annulation de commande",
          "Garantie légale",
        ],
        required: true,
      },
      {
        id: "date_achat",
        label: "Date d'achat ou de prestation",
        type: "date",
        required: true,
      },
    ],
    mentions: ["garantie_legale", "delai_retractation"],
    seoExamples: [
      "remboursement assurance",
      "produit non livré",
      "trop-perçu impôts",
    ],
  },
  {
    id: "retractation",
    emoji: "↩️",
    name: "Rétractation",
    desc: "Annulation achat en ligne, démarchage",
    questions: [
      {
        id: "destinataire",
        label: "Société concernée",
        type: "text",
        placeholder: "Ex : boutique en ligne, démarcheur…",
        required: true,
      },
      {
        id: "numero_commande",
        label: "Numéro de commande ou de contrat",
        type: "text",
        placeholder: "Ex : CMD-12345",
        required: true,
      },
      {
        id: "date_achat",
        label: "Date d'achat / signature du contrat",
        type: "date",
        required: true,
      },
      {
        id: "objet",
        label: "Description du produit ou service",
        type: "text",
        placeholder: "Ex : abonnement logiciel, téléphone, cours en ligne…",
        required: true,
      },
    ],
    mentions: ["delai_retractation_14j", "code_conso"],
    seoExamples: [
      "achat en ligne",
      "démarchage téléphonique",
      "contrat signé à domicile",
    ],
  },
  {
    id: "delai-paiement",
    emoji: "📅",
    name: "Délai de paiement",
    desc: "Demande d'échelonnement de dette",
    questions: [
      {
        id: "creancier",
        label: "Créancier (à qui vous devez de l'argent)",
        type: "text",
        placeholder: "Ex : propriétaire, fisc, banque, fournisseur…",
        required: true,
      },
      {
        id: "montant_total",
        label: "Montant total de la dette",
        type: "text",
        placeholder: "Ex : 1 200,00 €",
        required: true,
      },
      {
        id: "motif",
        label: "Motif des difficultés de paiement",
        type: "select",
        options: [
          "Perte d'emploi",
          "Baisse de revenus",
          "Dépenses imprévues",
          "Maladie / arrêt de travail",
          "Situation temporaire",
        ],
        required: true,
      },
      {
        id: "proposition",
        label: "Proposition de mensualités",
        type: "text",
        placeholder: "Ex : 150€/mois pendant 8 mois",
        required: true,
      },
    ],
    mentions: ["bonne_foi"],
    seoExamples: ["impôts", "loyer", "crédit", "dette fournisseur"],
  },
  {
    id: "attestation",
    emoji: "📋",
    name: "Attestation",
    desc: "Sur l'honneur, domiciliation, hébergement",
    questions: [
      {
        id: "type_attestation",
        label: "Type d'attestation",
        type: "select",
        options: [
          "Attestation sur l'honneur",
          "Attestation d'hébergement",
          "Attestation de domiciliation",
          "Attestation de résidence",
          "Attestation employeur (salarié)",
          "Attestation de don",
        ],
        required: true,
      },
      {
        id: "objet",
        label: "Objet de l'attestation",
        type: "textarea",
        placeholder: "Décrivez ce que vous attestez…",
        required: true,
      },
      {
        id: "destinataire",
        label: "À remettre à (optionnel)",
        type: "text",
        placeholder: "Ex : préfecture, banque, administration…",
        required: false,
      },
    ],
    mentions: ["faux_et_usage_de_faux"],
    seoExamples: [
      "attestation hébergement",
      "attestation sur l'honneur",
      "domiciliation",
    ],
  },
  {
    id: "courrier-libre",
    emoji: "✍️",
    name: "Courrier libre",
    desc: "Tout autre besoin de courrier formel",
    questions: [
      {
        id: "destinataire",
        label: "Destinataire",
        type: "text",
        placeholder: "Nom de la personne ou société",
        required: true,
      },
      {
        id: "objet",
        label: "Objet du courrier",
        type: "text",
        placeholder: "En quelques mots, le sujet de votre courrier",
        required: true,
      },
      {
        id: "contexte",
        label: "Contexte et ce que vous souhaitez obtenir",
        type: "textarea",
        placeholder:
          "Décrivez la situation et ce que vous demandez ou souhaitez exprimer…",
        required: true,
      },
      {
        id: "ton",
        label: "Ton souhaité",
        type: "select",
        options: [
          "Formel et professionnel",
          "Ferme mais courtois",
          "Conciliant et ouvert",
          "Urgent et direct",
        ],
        required: true,
      },
    ],
    mentions: [],
    seoExamples: [],
  },
];
