import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — LettreMagique",
  description: "Conditions générales d'utilisation du service LettreMagique.",
};

export default function CguPage() {
  return (
    <div className="pt-14">
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
            Conditions Générales d'Utilisation
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
              1. Objet
            </h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du service
              LettreMagique accessible sur <strong>lettre-magique.fr</strong>. Le service est une plateforme d'aide à la
              rédaction permettant de générer des courriers administratifs (réclamations, demandes, résiliations, etc.)
              à l'aide de l'intelligence artificielle.
            </p>
            <p className="mt-3">
              L'inscription ou l'utilisation du service implique l'acceptation sans réserve des présentes CGU.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              2. Accès au service
            </h2>
            <p>
              Le service est ouvert à toute personne physique disposant d'une adresse email valide. Le premier courrier
              est gratuit, sans carte bancaire. Un plan payant (Pro) donne accès à des courriers illimités.
            </p>
            <p className="mt-3">
              Les utilisateurs s'engagent à fournir des informations exactes lors de l'inscription et à les maintenir
              à jour. Les comptes créés avec des données frauduleuses peuvent être supprimés sans avertissement.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              3. Plans et tarification
            </h2>
            <p>Deux formules sont disponibles :</p>
            <ul className="mt-3 space-y-2 text-sm pl-4" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li>
                <strong style={{ color: "var(--ink)" }}>Plan Gratuit :</strong> 1 courrier offert à la création du compte, sans engagement ni carte bancaire.
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Courrier à l'unité :</strong> achat à l'unité selon le tarif en vigueur affiché sur la page Tarifs.
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Plan Pro :</strong> courriers illimités, facturation mensuelle ou annuelle selon le tarif affiché.
              </li>
            </ul>
            <p className="mt-3">
              Les prix sont indiqués en euros TTC. L'abonnement Pro est reconduit automatiquement à chaque échéance.
              La résiliation est possible à tout moment depuis l'espace Mon compte, et prend effet à la fin de la
              période en cours.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              4. Obligations de l'utilisateur
            </h2>
            <p>L'utilisateur s'engage à :</p>
            <ul className="mt-3 space-y-2 text-sm pl-4 list-disc" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li>Utiliser LettreMagique dans un cadre légal et personnel uniquement</li>
              <li>Ne pas tenter de contourner les restrictions techniques ou de quota</li>
              <li>Ne pas partager ses identifiants de connexion</li>
              <li>Ne pas utiliser le service à des fins frauduleuses ou malveillantes</li>
              <li>Vérifier le contenu des courriers générés avant de les envoyer</li>
              <li>S'assurer que les courriers respectent la réglementation applicable à sa situation</li>
            </ul>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              5. Données et contenu de l'utilisateur
            </h2>
            <p>
              L'utilisateur reste seul propriétaire des informations qu'il saisit dans LettreMagique (situation
              personnelle, contexte du courrier, contenu généré). Il accorde à LettreMagique une licence limitée pour
              traiter ces données dans le seul but de fournir le service.
            </p>
            <p className="mt-3">
              LettreMagique ne vend, ne loue et ne cède aucune donnée personnelle de l'utilisateur à des tiers.
              Le contenu des courriers générés n'est pas utilisé pour entraîner des modèles d'IA.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              6. Disponibilité du service
            </h2>
            <p>
              LettreMagique s'efforce d'assurer une disponibilité maximale du service. Aucune indemnité ne peut être
              réclamée pour les indisponibilités temporaires dues à la maintenance, aux pannes techniques ou à des
              cas de force majeure. La disponibilité du service de génération dépend également des API tierces
              (Anthropic Claude).
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              7. Résiliation et suppression du compte
            </h2>
            <p>
              Les utilisateurs peuvent supprimer leur compte à tout moment depuis Mon compte ou en contactant
              kennydsf91@gmail.com. La suppression entraîne l'effacement définitif de toutes les données associées
              dans un délai de 30 jours.
            </p>
            <p className="mt-3">
              LettreMagique peut suspendre ou supprimer un compte en cas de violation des CGU, sans préavis ni
              remboursement.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              8. Limitation de responsabilité
            </h2>
            <p>
              LettreMagique est un outil d'aide à la rédaction et ne constitue pas un conseil juridique. Les courriers
              générés sont produits automatiquement par intelligence artificielle à partir des informations fournies
              par l'utilisateur. L'utilisateur est seul responsable du contenu définitif envoyé et de son adéquation
              à sa situation.
            </p>
            <p className="mt-3">
              La responsabilité de LettreMagique ne saurait être engagée au-delà du montant des sommes effectivement
              versées par l'utilisateur au cours des 12 derniers mois.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              9. Modification des CGU
            </h2>
            <p>
              LettreMagique se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront
              informés par email des modifications substantielles. L'utilisation continue du service après notification
              vaut acceptation des nouvelles conditions.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              10. Droit applicable et litiges
            </h2>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige, une solution amiable sera
              recherchée en priorité. À défaut, les tribunaux compétents du siège social de l'éditeur sont seuls
              compétents. Les consommateurs peuvent recourir à un médiateur de la consommation conformément à
              l'article L.616-1 du Code de la consommation.
            </p>
          </article>

        </div>
      </section>
    </div>
  );
}
