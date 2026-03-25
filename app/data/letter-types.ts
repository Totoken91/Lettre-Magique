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
    desc: "Facture, produit, service — remboursement inclus",
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
    seoExamples: ["Produit non livré", "Trop-perçu", "Garantie", "Amazon", "EDF"],
  },
  {
    id: "logement",
    emoji: "🏠",
    name: "Logement",
    desc: "Congé locataire, caution, voisinage, réparations",
    questions: [
      {
        id: "type_courrier",
        label: "Type de courrier",
        type: "select",
        options: [
          "Congé locataire (départ du logement)",
          "Demande de restitution de caution",
          "Signalement de troubles du voisinage",
          "Demande de réparations au propriétaire",
          "Autre courrier lié au logement",
        ],
        required: true,
      },
      {
        id: "destinataire",
        label: "Destinataire (propriétaire, agence, syndic…)",
        type: "textarea",
        placeholder: "Nom, prénom ou raison sociale, adresse complète…",
        required: true,
      },
      {
        id: "adresse_logement",
        label: "Adresse du logement concerné",
        type: "text",
        placeholder: "Adresse complète du bien",
        required: true,
      },
      {
        id: "details",
        label: "Détails de la situation",
        type: "textarea",
        placeholder: "Ex : date de départ, montant de la caution, nature du problème…",
        required: true,
      },
    ],
    mentions: ["loi_alur", "preavis"],
    seoExamples: [
      "Congé locataire",
      "Caution non rendue",
      "Troubles voisinage",
      "Réparations non faites",
    ],
  },
  {
    id: "assurance",
    emoji: "🛡️",
    name: "Assurance",
    desc: "Sinistre contesté, résiliation, indemnisation",
    questions: [
      {
        id: "type_courrier",
        label: "Type de courrier",
        type: "select",
        options: [
          "Contestation d'un refus de sinistre",
          "Contestation d'indemnisation insuffisante",
          "Résiliation du contrat (loi Hamon / Chatel)",
          "Demande d'état d'avancement du dossier",
          "Autre courrier assurance",
        ],
        required: true,
      },
      {
        id: "compagnie",
        label: "Compagnie d'assurance",
        type: "text",
        placeholder: "Ex : Maif, Axa, Allianz, Groupama…",
        required: true,
      },
      {
        id: "numero_contrat",
        label: "Numéro de contrat",
        type: "text",
        placeholder: "Ex : 123 456 789",
        required: true,
      },
      {
        id: "numero_sinistre",
        label: "Numéro de sinistre (si applicable)",
        type: "text",
        placeholder: "Ex : SIN-2025-0042",
        required: false,
      },
      {
        id: "details",
        label: "Détails de la situation",
        type: "textarea",
        placeholder: "Décrivez les faits, le montant en jeu, les échanges précédents…",
        required: true,
      },
    ],
    mentions: ["code_assurances", "loi_hamon"],
    seoExamples: [
      "Sinistre contesté",
      "Résiliation loi Hamon",
      "Indemnisation insuffisante",
    ],
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
    id: "travail",
    emoji: "💼",
    name: "Travail / Employeur",
    desc: "Démission, contestation, salaire, congé",
    questions: [
      {
        id: "type_courrier",
        label: "Type de courrier",
        type: "select",
        options: [
          "Lettre de démission",
          "Contestation d'un avertissement / sanction",
          "Rappel de salaire ou heures supplémentaires",
          "Demande de congé ou d'absence",
          "Signalement de harcèlement",
          "Autre courrier employeur",
        ],
        required: true,
      },
      {
        id: "employeur",
        label: "Nom de l'employeur / société",
        type: "text",
        placeholder: "Raison sociale de l'entreprise",
        required: true,
      },
      {
        id: "poste",
        label: "Votre poste / intitulé de fonction",
        type: "text",
        placeholder: "Ex : technicien, responsable commercial…",
        required: true,
      },
      {
        id: "details",
        label: "Détails de la situation",
        type: "textarea",
        placeholder: "Décrivez les faits, dates, montants ou éléments pertinents…",
        required: true,
      },
    ],
    mentions: ["code_travail", "prud_hommes"],
    seoExamples: ["Démission", "Contestation sanction", "Rappel de salaire"],
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
