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
- RÉFÉRENCES LÉGALES OBLIGATOIRES : Tu DOIS citer au moins 2 articles de loi pertinents avec leur numéro exact (ex : art. L217-4 du Code de la consommation, art. 1231-1 du Code civil, art. L113-5 du Code des assurances). Ces références doivent être intégrées naturellement dans le texte, jamais en note de bas de page.
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
  const h = header(senderName, senderAddress, formData.destinataire || formData.bailleur || formData.creancier || formData.employeur || formData.compagnie || "");

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
      return `Tu es un expert en droits des consommateurs français.
Génère une lettre de réclamation ferme et professionnelle. Si la demande est un remboursement, traite-la comme une réclamation avec demande de remboursement.

${h}

SOCIÉTÉ CONCERNÉE: ${formData.destinataire}
OBJET DE LA RÉCLAMATION: ${formData.objet_reclamation}
DATE DE L'INCIDENT: ${formData.date_incident}
CE QUI EST DEMANDÉ: ${formData.demande}
DÉTAILS: ${formData.details || "aucun"}

Mentionner selon le cas : garantie légale de conformité (art. L217-4 Code de la consommation), garantie des vices cachés (art. 1641 Code civil), ou droit à remboursement. Fixer un délai de réponse de 15 jours.

${BASE_RULES}`;

    case "logement": {
      const typeCourrier = formData.type_courrier || "";

      let instructions = "";
      if (typeCourrier.includes("Congé locataire") || typeCourrier.includes("départ")) {
        instructions = `Inclure la référence à la loi ALUR (art. 15 de la loi du 6 juillet 1989). Préciser le type de préavis applicable (1 mois zone tendue / meublé, 3 mois sinon). Mentionner l'état des lieux de sortie et la remise des clés.`;
      } else if (typeCourrier.includes("caution") || typeCourrier.includes("dépôt de garantie")) {
        instructions = `Rappeler l'obligation de restitution dans le délai légal (1 mois si pas de retenue, 2 mois sinon) conformément à l'art. 22 de la loi du 6 juillet 1989. Mentionner les pénalités en cas de retard (10% du loyer mensuel par mois de retard). Fixer un délai de 8 jours pour régulariser.`;
      } else if (typeCourrier.includes("voisinage") || typeCourrier.includes("trouble")) {
        instructions = `Rappeler l'obligation du bailleur de garantir la jouissance paisible des lieux (art. 6 loi du 6 juillet 1989). Mentionner le trouble anormal de voisinage. Demander une intervention dans un délai raisonnable (15 jours). Si aucune suite, évoquer la possibilité de saisir le tribunal judiciaire.`;
      } else if (typeCourrier.includes("réparation") || typeCourrier.includes("travaux")) {
        instructions = `Rappeler l'obligation du bailleur de délivrer un logement en bon état (art. 6 loi du 6 juillet 1989) et d'assurer les réparations qui ne sont pas à la charge du locataire (décret du 26 août 1987). Fixer un délai d'intervention de 15 jours. Évoquer la possibilité de consignation des loyers en cas d'inaction.`;
      } else {
        instructions = `Adapter le ton et les références légales au type de courrier logement décrit. Citer la loi du 6 juillet 1989 si applicable.`;
      }

      return `Tu es un expert en droit immobilier et locatif français.
Génère un courrier lié au logement, adapté précisément au type de situation.

${h}

TYPE DE COURRIER: ${formData.type_courrier}
DESTINATAIRE (BAILLEUR/AGENCE/SYNDIC): ${formData.destinataire}
ADRESSE DU LOGEMENT: ${formData.adresse_logement}
DÉTAILS DE LA SITUATION: ${formData.details}

${instructions}

${BASE_RULES}`;
    }

    case "assurance": {
      const typeCourrier = formData.type_courrier || "";

      let instructions = "";
      if (typeCourrier.includes("refus de sinistre") || typeCourrier.includes("Contestation")) {
        instructions = `Rappeler l'obligation de l'assureur de couvrir les sinistres prévus au contrat (art. L113-5 Code des assurances). Mentionner le numéro de sinistre. Demander une révision de la décision par écrit sous 15 jours. Évoquer si besoin la possibilité de saisir le médiateur de l'assurance ou la DRAssur.`;
      } else if (typeCourrier.includes("indemnisation insuffisante")) {
        instructions = `Invoquer le principe indemnitaire (art. L121-1 Code des assurances) qui impose une indemnisation couvrant réellement le préjudice subi. Contester l'évaluation faite et demander une expertise contradictoire. Mentionner le numéro de sinistre et le montant estimé du préjudice réel.`;
      } else if (typeCourrier.includes("Résiliation") || typeCourrier.includes("résiliation")) {
        instructions = `Préciser la base légale : loi Hamon (art. L113-15-2 Code des assurances) pour résiliation à tout moment après 1 an, ou loi Chatel (art. L113-15-1) pour non-renouvellement. Mentionner le numéro de contrat. La résiliation prend effet 1 mois après réception de la lettre.`;
      } else {
        instructions = `Citer les articles pertinents du Code des assurances (Livre 1, Titre 1). Mentionner le numéro de contrat et, si applicable, le numéro de sinistre.`;
      }

      return `Tu es un expert en droit des assurances français.
Génère un courrier d'assurance précis, avec les références légales appropriées.

${h}

TYPE DE COURRIER: ${formData.type_courrier}
COMPAGNIE D'ASSURANCE: ${formData.compagnie}
NUMÉRO DE CONTRAT: ${formData.numero_contrat}
NUMÉRO DE SINISTRE: ${formData.numero_sinistre || "non applicable"}
DÉTAILS DE LA SITUATION: ${formData.details}

${instructions}

${BASE_RULES}`;
    }

    case "travail": {
      const typeCourrier = formData.type_courrier || "";

      let instructions = "";
      if (typeCourrier.includes("démission") || typeCourrier.includes("Démission")) {
        instructions = `Rédiger une lettre de démission claire et sans ambiguïté. Mentionner le préavis applicable (art. L1237-1 Code du travail). Ton ferme mais respectueux. Ne pas donner de motif si non demandé. Date de prise d'effet du préavis.`;
      } else if (typeCourrier.includes("avertissement") || typeCourrier.includes("sanction") || typeCourrier.includes("Contestation")) {
        instructions = `Contester la sanction de façon argumentée. Rappeler le délai de prescription des faits de 2 mois (art. L1332-4 Code du travail). Exiger la communication des pièces justificatives. Évoquer la possibilité de saisir les délégués du personnel ou les prud'hommes (art. L1332-1 et suivants).`;
      } else if (typeCourrier.includes("salaire") || typeCourrier.includes("Rappel")) {
        instructions = `Rappeler l'obligation de l'employeur de verser le salaire convenu (art. L3242-1 Code du travail). Préciser les montants et périodes concernés. Mentionner la prescription de 3 ans pour les rappels de salaire (art. L3245-1). Évoquer la possibilité de saisir le Conseil de prud'hommes.`;
      } else if (typeCourrier.includes("harcèlement")) {
        instructions = `Rédiger de façon factuelle et chronologique. Rappeler l'interdiction légale du harcèlement moral (art. L1152-1 Code du travail) ou sexuel (art. L1153-1). Mentionner l'obligation de l'employeur de prévenir et faire cesser ces agissements (art. L4121-1). Demander une réponse écrite dans les 8 jours.`;
      } else {
        instructions = `Adapter le ton et les références au Code du travail selon la situation décrite. Rester factuel et professionnel.`;
      }

      return `Tu es un expert en droit du travail français.
Génère un courrier à l'employeur adapté précisément à la situation, avec les références légales appropriées.

${h}

TYPE DE COURRIER: ${formData.type_courrier}
EMPLOYEUR / SOCIÉTÉ: ${formData.employeur}
POSTE OCCUPÉ: ${formData.poste}
DÉTAILS DE LA SITUATION: ${formData.details}

${instructions}

${BASE_RULES}`;
    }

    case "mise-en-demeure":
      return `Tu es un expert en courriers administratifs français.
Génère une mise en demeure ferme et juridiquement correcte.

${h}

DESTINATAIRE: ${formData.destinataire}
OBJET DU LITIGE: ${formData.objet}
MONTANT RÉCLAMÉ: ${formData.montant || "non précisé"}
DÉLAI ACCORDÉ: ${formData.delai}

Mentionner les voies de recours possibles (tribunal judiciaire, huissier de justice). Ton ferme mais légal.

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

    case "retractation":
      return `Tu es un expert en droit de la consommation français.
Génère une lettre de rétractation conforme au Code de la consommation (délai 14 jours).

${h}

SOCIÉTÉ: ${formData.destinataire}
N° COMMANDE / CONTRAT: ${formData.numero_commande}
DATE D'ACHAT: ${formData.date_achat}
PRODUIT / SERVICE: ${formData.objet}

Faire référence à l'article L221-18 du Code de la consommation. Demander le remboursement intégral sous 14 jours.

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
