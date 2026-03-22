const TODAY = () => {
  const d = new Date();
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const BASE_RULES = `
Règles OBLIGATOIRES :
- Génère UNIQUEMENT le corps de la lettre, sans explication ni commentaire
- Format standard courrier français : Expéditeur (déjà fourni) / Date / Destinataire / Objet / Corps / Formule de politesse / Signature
- Ton : formel, professionnel, direct, sans agressivité
- Longueur : 150–250 mots maximum
- Aucun crochet, aucun placeholder dans le résultat final
- Les mentions légales doivent être intégrées naturellement dans le texte quand applicables
`.trim();

function header(senderName: string, senderAddress: string, recipient: string) {
  return `${senderName}
${senderAddress}

${TODAY()}

${recipient}`;
}

export function buildPrompt(
  type: string,
  formData: Record<string, string>,
  senderName: string,
  senderAddress: string
): string {
  const h = header(senderName, senderAddress, formData.destinataire || formData.bailleur || formData.creancier || "");

  switch (type) {
    case "resiliation":
      return `Tu es un expert en courriers administratifs français.
Génère une lettre de résiliation professionnelle et juridiquement correcte.

${h}

SOCIÉTÉ À RÉSILIER: ${formData.destinataire}
TYPE DE CONTRAT: ${formData.type_contrat}
NUMÉRO CLIENT: ${formData.numero_contrat || "non précisé"}
MOTIF: ${formData.motif || "sans motif précisé"}

Inclure si pertinent : référence à la loi Chatel ou loi Hamon, demande d'accusé de réception, envoi recommandé.

${BASE_RULES}`;

    case "reclamation":
      return `Tu es un expert en courriers administratifs français.
Génère une lettre de réclamation ferme et professionnelle.

${h}

SOCIÉTÉ CONCERNÉE: ${formData.destinataire}
OBJET DE LA RÉCLAMATION: ${formData.objet_reclamation}
DATE DE L'INCIDENT: ${formData.date_incident}
CE QUI EST DEMANDÉ: ${formData.demande}
DÉTAILS: ${formData.details || "aucun"}

Mentionner les droits du consommateur et la garantie légale si applicable. Fixer un délai de réponse (15 jours).

${BASE_RULES}`;

    case "mise-en-demeure":
      return `Tu es un expert en courriers administratifs français.
Génère une mise en demeure ferme et juridiquement correcte.

${h}

DESTINATAIRE: ${formData.destinataire}
OBJET DU LITIGE: ${formData.objet}
MONTANT RÉCLAMÉ: ${formData.montant || "non précisé"}
DÉLAI ACCORDÉ: ${formData.delai}

Mentionner les voies de recours possibles (tribunal, huissier). Ton ferme mais légal.

${BASE_RULES}`;

    case "contestation":
      return `Tu es un expert en courriers administratifs français.
Génère une lettre de contestation argumentée et professionnelle.

${h}

ORGANISME ÉMETTEUR: ${formData.destinataire}
RÉFÉRENCE / N°: ${formData.reference}
DATE DU DOCUMENT: ${formData.date_document}
MOTIF DE CONTESTATION: ${formData.motif_contestation}

Mentionner les délais de recours légaux si applicable. Demander une réponse écrite.

${BASE_RULES}`;

    case "conge-locataire":
      return `Tu es un expert en droit immobilier français.
Génère une lettre de congé (préavis de départ) conforme à la loi ALUR.

${h}

BAILLEUR / PROPRIÉTAIRE: ${formData.bailleur}
ADRESSE DU LOGEMENT: ${formData.adresse_logement}
TYPE DE PRÉAVIS: ${formData.type_preavis}
DATE DE DÉPART: ${formData.date_depart}

Inclure la référence légale au préavis réduit (zone tendue ou loi ALUR) si applicable. Mentionner l'état des lieux de sortie.

${BASE_RULES}`;

    case "remboursement":
      return `Tu es un expert en droits des consommateurs français.
Génère une demande de remboursement claire et ferme.

${h}

SOCIÉTÉ CONCERNÉE: ${formData.destinataire}
MONTANT À REMBOURSER: ${formData.montant}
MOTIF: ${formData.motif}
DATE D'ACHAT/PRESTATION: ${formData.date_achat}

Faire référence à la garantie légale de conformité ou au droit de rétractation si applicable. Délai de réponse : 15 jours.

${BASE_RULES}`;

    case "retractation":
      return `Tu es un expert en droit de la consommation français.
Génère une lettre de rétractation conforme au Code de la consommation (délai 14 jours).

${h}

SOCIÉTÉ: ${formData.destinataire}
N° COMMANDE / CONTRAT: ${formData.numero_commande}
DATE D'ACHAT: ${formData.date_achat}
PRODUIT / SERVICE: ${formData.objet}

Faire référence à l'article L221-18 du Code de la consommation. Demander le remboursement sous 14 jours.

${BASE_RULES}`;

    case "delai-paiement":
      return `Tu es un expert en courriers administratifs français.
Génère une demande de délai de paiement respectueuse et convaincante.

${h}

CRÉANCIER: ${formData.creancier}
MONTANT TOTAL: ${formData.montant_total}
MOTIF DES DIFFICULTÉS: ${formData.motif}
PROPOSITION DE MENSUALITÉS: ${formData.proposition}

Ton conciliant et de bonne foi. Montrer sa volonté de régler la situation. Proposer un plan concret.

${BASE_RULES}`;

    case "attestation":
      return `Tu es un expert en rédaction administrative française.
Génère une attestation officielle et juridiquement recevable.

TYPE D'ATTESTATION: ${formData.type_attestation}
OBJET: ${formData.objet}
À REMETTRE À: ${formData.destinataire || "qui de droit"}
SIGNATAIRE: ${senderName}
ADRESSE DU SIGNATAIRE: ${senderAddress}
DATE: ${TODAY()}

Inclure la formule "Je soussigné(e)" et "certifie sur l'honneur". Mentionner que la falsification est un délit.

${BASE_RULES}`;

    case "courrier-libre":
      return `Tu es un expert en courriers administratifs français.
Génère un courrier formel adapté à la situation décrite.

${h}

DESTINATAIRE: ${formData.destinataire}
OBJET: ${formData.objet}
CONTEXTE ET DEMANDE: ${formData.contexte}
TON SOUHAITÉ: ${formData.ton}

${BASE_RULES}`;

    default:
      return `Génère un courrier administratif professionnel en français pour la situation suivante:
Type: ${type}
Données: ${JSON.stringify(formData)}
Expéditeur: ${senderName}, ${senderAddress}

${BASE_RULES}`;
  }
}
