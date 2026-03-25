import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — LettreMagique",
  description: "Comment LettreMagique collecte, utilise et protège vos données personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 md:px-16 py-10 md:py-16"
        style={{ background: "var(--ink)", color: "var(--white-warm)" }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 20px, transparent 20px, transparent 24px)",
          }}
        />
        <div className="max-w-[980px] mx-auto">
          <h1
            className="font-extrabold leading-[0.92] tracking-[-2px]"
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "#666" }}>
            Dernière mise à jour : 22 mars 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 md:px-16 py-12 md:py-20" style={{ background: "var(--paper)" }}>
        <div className="max-w-[720px] mx-auto space-y-10" style={{ fontFamily: "var(--font-lora)", color: "var(--ink)", lineHeight: 1.8 }}>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              1. Responsable du traitement
            </h2>
            <p>
              Le responsable du traitement est <strong>totoken</strong> (entreprise individuelle), représentée par
              Kenny Desaintfuscien — 21 Domaine de Montvoisin, 91400 Gometz-la-Ville. Pour toute question relative
              à vos données personnelles :{" "}
              <a href="mailto:kennydsf91@gmail.com" style={{ color: "var(--accent)" }}>
                kennydsf91@gmail.com
              </a>
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              2. Données collectées
            </h2>
            <p>LettreMagique collecte uniquement les données nécessaires au fonctionnement du service :</p>
            <ul className="mt-3 space-y-2 text-sm pl-4" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li>
                <strong style={{ color: "var(--ink)" }}>Compte :</strong> adresse email, mot de passe (haché), méthode d'authentification (email/Google OAuth)
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Courriers :</strong> type de courrier, informations saisies pour la génération, texte généré, date de création
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Facturation :</strong> données de paiement traitées par Stripe (aucun numéro de carte stocké chez nous)
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Navigation :</strong> pages visitées, session anonymisée (sans adresse IP ni identifiant cross-site)
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              3. Finalités du traitement
            </h2>
            <p>Les données collectées servent à :</p>
            <ul className="mt-3 space-y-1 text-sm pl-4 list-disc" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li>Créer et gérer votre compte utilisateur</li>
              <li>Générer vos courriers via l'API Claude (Anthropic)</li>
              <li>Gérer votre quota de lettres et votre abonnement Pro</li>
              <li>Traiter les paiements via Stripe</li>
              <li>Envoyer les emails transactionnels (confirmation, reçus)</li>
              <li>Mesurer l'audience du site (statistiques anonymisées)</li>
              <li>Détecter les anomalies et assurer la sécurité du service</li>
            </ul>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              4. Base légale (RGPD — Article 6)
            </h2>
            <ul className="space-y-2 text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li><strong style={{ color: "var(--ink)" }}>Exécution du contrat :</strong> génération de courriers, gestion du compte et de l'abonnement</li>
              <li><strong style={{ color: "var(--ink)" }}>Intérêt légitime :</strong> sécurité, prévention de la fraude, amélioration du service</li>
              <li><strong style={{ color: "var(--ink)" }}>Obligation légale :</strong> conservation des données de facturation (10 ans)</li>
              <li><strong style={{ color: "var(--ink)" }}>Consentement :</strong> cookies de mesure d'audience (session anonymisée)</li>
            </ul>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              5. Durée de conservation
            </h2>
            <ul className="space-y-2 text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li><strong style={{ color: "var(--ink)" }}>Comptes actifs :</strong> pendant toute la durée d'utilisation du service</li>
              <li><strong style={{ color: "var(--ink)" }}>Après suppression :</strong> effacement définitif dans un délai de 30 jours</li>
              <li><strong style={{ color: "var(--ink)" }}>Données de facturation :</strong> 10 ans (obligations comptables françaises)</li>
              <li><strong style={{ color: "var(--ink)" }}>Logs de sécurité :</strong> 12 mois maximum</li>
            </ul>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              6. Sous-traitants
            </h2>
            <p>LettreMagique fait appel aux prestataires suivants :</p>
            <ul className="mt-3 space-y-2 text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li><strong style={{ color: "var(--ink)" }}>Supabase :</strong> base de données et authentification — serveurs EU West</li>
              <li><strong style={{ color: "var(--ink)" }}>Vercel :</strong> hébergement et diffusion — serveurs Edge européens</li>
              <li><strong style={{ color: "var(--ink)" }}>Anthropic (Claude) :</strong> génération des courriers par IA — États-Unis</li>
              <li><strong style={{ color: "var(--ink)" }}>Stripe :</strong> traitement des paiements — États-Unis (certifié PCI-DSS)</li>
              <li><strong style={{ color: "var(--ink)" }}>Google :</strong> authentification OAuth optionnelle</li>
            </ul>
            <p className="mt-3">
              Aucune donnée personnelle n'est vendue, louée ou cédée à des tiers à des fins commerciales.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              7. Vos droits
            </h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="mt-3 space-y-1 text-sm pl-4 list-disc" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li>Accès à vos données personnelles</li>
              <li>Rectification des informations inexactes</li>
              <li>Effacement (droit à l'oubli)</li>
              <li>Portabilité dans un format structuré</li>
              <li>Opposition à certains traitements</li>
              <li>Limitation du traitement</li>
            </ul>
            <p className="mt-3">
              Pour exercer vos droits, contactez-nous à{" "}
              <a href="mailto:kennydsf91@gmail.com" style={{ color: "var(--accent)" }}>
                kennydsf91@gmail.com
              </a>. Délai de réponse : 30 jours maximum. Vous pouvez également déposer une réclamation auprès de la{" "}
              <strong>CNIL</strong> (cnil.fr).
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              8. Sécurité
            </h2>
            <p>Nous mettons en œuvre les mesures techniques suivantes pour protéger vos données :</p>
            <ul className="mt-3 space-y-1 text-sm pl-4 list-disc" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li>Chiffrement des échanges via HTTPS/TLS</li>
              <li>Mots de passe stockés sous forme hachée (bcrypt)</li>
              <li>Tokens d'accès cryptographiques (Supabase JWT)</li>
              <li>Isolation des données par utilisateur (Row Level Security)</li>
              <li>Validation des entrées côté serveur</li>
            </ul>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              9. Cookies
            </h2>
            <p>
              LettreMagique utilise uniquement des cookies strictement nécessaires au fonctionnement du service
              (session d'authentification Supabase) et un identifiant de session anonyme local (localStorage) pour
              les statistiques de fréquentation. Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              10. Modifications
            </h2>
            <p>
              Cette politique peut être mise à jour pour refléter les évolutions du service ou de la réglementation.
              Les modifications substantielles seront notifiées par email. La date de dernière mise à jour est
              indiquée en haut de cette page.
            </p>
          </article>

        </div>
      </section>
    </div>
  );
}
