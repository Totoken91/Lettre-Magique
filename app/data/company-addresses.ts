/**
 * Adresses connues des entreprises françaises courantes.
 * Utilisées pour auto-compléter l'adresse du destinataire dans le PDF
 * quand l'utilisateur ne la fournit pas.
 *
 * Clés : noms normalisés (lowercase, sans accents) pour matching flexible.
 */

export interface CompanyInfo {
  name: string;
  service: string;
  address: string;
  postalCode: string;
  city: string;
}

const COMPANIES: CompanyInfo[] = [
  // ── Télécoms ──
  { name: "Free", service: "Service Résiliation", address: "Free - Forfait Mobile", postalCode: "75371", city: "Paris Cedex 08" },
  { name: "Free Mobile", service: "Service Résiliation", address: "Free Mobile", postalCode: "75371", city: "Paris Cedex 08" },
  { name: "Free Box", service: "Service Résiliation", address: "Free - Freebox", postalCode: "75371", city: "Paris Cedex 08" },
  { name: "SFR", service: "Service Client", address: "SFR", postalCode: "75013", city: "Paris" },
  { name: "Orange", service: "Service Client", address: "Orange", postalCode: "75015", city: "Paris" },
  { name: "Bouygues Telecom", service: "Service Client", address: "Bouygues Telecom", postalCode: "60436", city: "Noailles Cedex" },
  { name: "Sosh", service: "Service Client", address: "Sosh / Orange", postalCode: "75015", city: "Paris" },
  { name: "RED by SFR", service: "Service Client", address: "RED by SFR", postalCode: "75013", city: "Paris" },
  { name: "B&You", service: "Service Client", address: "B&You / Bouygues Telecom", postalCode: "60436", city: "Noailles Cedex" },

  // ── Énergie ──
  { name: "EDF", service: "Service Client", address: "EDF", postalCode: "75008", city: "Paris" },
  { name: "Engie", service: "Service Client", address: "Engie", postalCode: "92400", city: "Courbevoie" },
  { name: "TotalEnergies", service: "Service Client", address: "TotalEnergies", postalCode: "92400", city: "Courbevoie" },
  { name: "Eni", service: "Service Client", address: "Eni Gas & Power France", postalCode: "93400", city: "Saint-Ouen" },

  // ── Assurances ──
  { name: "MAIF", service: "Service Sociétaires", address: "MAIF", postalCode: "79000", city: "Niort" },
  { name: "MACIF", service: "Service Sociétaires", address: "MACIF", postalCode: "79000", city: "Niort" },
  { name: "MAAF", service: "Service Client", address: "MAAF Assurances", postalCode: "79000", city: "Niort" },
  { name: "AXA", service: "Service Client", address: "AXA France", postalCode: "75008", city: "Paris" },
  { name: "Groupama", service: "Service Client", address: "Groupama", postalCode: "75008", city: "Paris" },
  { name: "Allianz", service: "Service Client", address: "Allianz France", postalCode: "92000", city: "Nanterre" },
  { name: "Generali", service: "Service Client", address: "Generali France", postalCode: "75009", city: "Paris" },
  { name: "GMF", service: "Service Client", address: "GMF Assurances", postalCode: "75340", city: "Paris Cedex 07" },
  { name: "MMA", service: "Service Client", address: "MMA", postalCode: "72030", city: "Le Mans Cedex 9" },
  { name: "Matmut", service: "Service Client", address: "Matmut", postalCode: "76030", city: "Rouen Cedex 1" },

  // ── Banques ──
  { name: "BNP Paribas", service: "Service Client", address: "BNP Paribas", postalCode: "75009", city: "Paris" },
  { name: "Société Générale", service: "Service Client", address: "Société Générale", postalCode: "75886", city: "Paris Cedex 18" },
  { name: "Crédit Agricole", service: "Service Client", address: "Crédit Agricole", postalCode: "92127", city: "Montrouge Cedex" },
  { name: "LCL", service: "Service Client", address: "LCL", postalCode: "75002", city: "Paris" },
  { name: "La Banque Postale", service: "Service Client", address: "La Banque Postale", postalCode: "75275", city: "Paris Cedex 06" },
  { name: "Boursorama", service: "Service Client", address: "Boursorama Banque", postalCode: "92800", city: "Puteaux" },
  { name: "Caisse d'Épargne", service: "Service Client", address: "Caisse d'Épargne", postalCode: "75013", city: "Paris" },

  // ── E-commerce / Services ──
  { name: "Amazon", service: "Service Client", address: "Amazon France", postalCode: "92110", city: "Clichy" },
  { name: "Cdiscount", service: "Service Client", address: "Cdiscount", postalCode: "33300", city: "Bordeaux" },
  { name: "Fnac", service: "Service Client", address: "Fnac", postalCode: "94200", city: "Ivry-sur-Seine" },
  { name: "Darty", service: "Service Client", address: "Darty", postalCode: "93000", city: "Bondy" },

  // ── Transport ──
  { name: "SNCF", service: "Service Relation Client", address: "SNCF", postalCode: "93200", city: "Saint-Denis" },
  { name: "RATP", service: "Service Client", address: "RATP", postalCode: "75012", city: "Paris" },

  // ── Médias / Streaming ──
  { name: "Canal+", service: "Service Résiliation", address: "Canal+", postalCode: "92130", city: "Issy-les-Moulineaux" },
  { name: "Netflix", service: "Service Client", address: "Netflix", postalCode: "75009", city: "Paris" },

  // ── Administration ──
  { name: "CAF", service: "Caisse d'Allocations Familiales", address: "CAF", postalCode: "", city: "" },
  { name: "Pôle Emploi", service: "France Travail", address: "France Travail", postalCode: "", city: "" },
  { name: "France Travail", service: "France Travail", address: "France Travail", postalCode: "", city: "" },
  { name: "CPAM", service: "Caisse Primaire d'Assurance Maladie", address: "CPAM", postalCode: "", city: "" },
];

/**
 * Cherche une entreprise par nom (matching flexible, case-insensitive).
 * Retourne les infos ou null si non trouvée.
 */
export function findCompanyAddress(name: string): CompanyInfo | null {
  if (!name) return null;
  const normalized = name
    .toLowerCase()
    .replace(/[éèêë]/g, "e")
    .replace(/[àâä]/g, "a")
    .replace(/[ùûü]/g, "u")
    .replace(/[ôö]/g, "o")
    .replace(/[îï]/g, "i")
    .replace(/[ç]/g, "c")
    .trim();

  // Exact match first
  for (const c of COMPANIES) {
    const cNorm = c.name.toLowerCase()
      .replace(/[éèêë]/g, "e")
      .replace(/[àâä]/g, "a")
      .replace(/[ùûü]/g, "u")
      .replace(/[ôö]/g, "o")
      .replace(/[îï]/g, "i")
      .replace(/[ç]/g, "c");
    if (normalized === cNorm) return c;
  }

  // Partial match (company name is contained in input)
  for (const c of COMPANIES) {
    const cNorm = c.name.toLowerCase()
      .replace(/[éèêë]/g, "e")
      .replace(/[àâä]/g, "a")
      .replace(/[ùûü]/g, "u")
      .replace(/[ôö]/g, "o")
      .replace(/[îï]/g, "i")
      .replace(/[ç]/g, "c");
    if (normalized.includes(cNorm) || cNorm.includes(normalized)) return c;
  }

  return null;
}

/**
 * Formate l'adresse d'une entreprise pour l'en-tête du courrier.
 * Retourne un tableau de lignes (nom, service, code postal + ville).
 */
export function formatCompanyRecipient(company: CompanyInfo): string[] {
  const lines = [company.name, company.service];
  if (company.postalCode && company.city) {
    lines.push(`${company.postalCode} ${company.city}`);
  }
  return lines;
}
