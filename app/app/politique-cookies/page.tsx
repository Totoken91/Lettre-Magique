import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de cookies — LettreMagique",
  description: "Découvrez comment LettreMagique utilise les cookies et comment gérer vos préférences.",
};

export default function PolitiqueCookiesPage() {
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
            Politique de cookies
          </h1>
          <p className="mt-4 text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "#666" }}>
            Dernière mise à jour : 23 mars 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 md:px-16 py-12 md:py-20" style={{ background: "var(--paper)" }}>
        <div
          className="max-w-[720px] mx-auto space-y-10"
          style={{ fontFamily: "var(--font-lora)", color: "var(--ink)", lineHeight: 1.8 }}
        >

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              1. Qu'est-ce qu'un cookie ?
            </h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors
              de votre visite sur un site web. Il permet au site de mémoriser vos actions et préférences pendant une
              durée déterminée, afin que vous n'ayez pas à les ressaisir à chaque visite.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              2. Les cookies utilisés par LettreMagique
            </h2>

            <h3 className="font-bold mt-5 mb-2" style={{ fontFamily: "var(--font-syne)", fontSize: "15px" }}>
              2.1 Cookies nécessaires
            </h3>
            <p>
              Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés. Ils
              permettent notamment :
            </p>
            <ul className="mt-3 ml-5 space-y-1 list-disc text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li>La gestion de votre session de connexion (authentification via Supabase)</li>
              <li>La mémorisation de vos préférences de confidentialité</li>
              <li>La sécurisation des formulaires (protection CSRF)</li>
            </ul>
            <p className="mt-3 text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              Durée de conservation : session ou jusqu'à 1 an selon le cookie.
            </p>

            <h3 className="font-bold mt-6 mb-2" style={{ fontFamily: "var(--font-syne)", fontSize: "15px" }}>
              2.2 Cookies analytiques
            </h3>
            <p>
              Ces cookies nous aident à comprendre comment les visiteurs utilisent le site, afin de l'améliorer en
              continu. Ils sont déposés par <strong>Google Analytics</strong> (Google LLC) et collectent des données
              anonymisées sur :
            </p>
            <ul className="mt-3 ml-5 space-y-1 list-disc text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li>Les pages visitées et la durée de consultation</li>
              <li>La source du trafic (moteur de recherche, lien direct, etc.)</li>
              <li>Le type d'appareil et de navigateur utilisé</li>
            </ul>
            <p className="mt-3 text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              Durée de conservation : 13 mois maximum. Ces cookies ne sont déposés qu'avec votre consentement.
            </p>

            <h3 className="font-bold mt-6 mb-2" style={{ fontFamily: "var(--font-syne)", fontSize: "15px" }}>
              2.3 Cookies publicitaires
            </h3>
            <p>
              Ces cookies permettent de mesurer l'efficacité de nos campagnes publicitaires (Google Ads) et d'afficher
              des annonces personnalisées sur d'autres sites. Ils sont déposés par <strong>Google LLC</strong> et
              peuvent collecter :
            </p>
            <ul className="mt-3 ml-5 space-y-1 list-disc text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li>Votre identifiant publicitaire</li>
              <li>Vos interactions avec nos annonces</li>
              <li>Les conversions réalisées après clic sur une annonce</li>
            </ul>
            <p className="mt-3 text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              Durée de conservation : jusqu'à 13 mois. Ces cookies ne sont déposés qu'avec votre consentement.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              3. Gérer vos préférences
            </h2>
            <p>
              Lors de votre première visite, une bannière vous permet d'accepter ou de refuser chaque catégorie de
              cookies. Vous pouvez modifier vos choix à tout moment en cliquant sur l'icône cookie présente en bas à
              gauche de chaque page.
            </p>
            <p className="mt-3">
              Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies :
            </p>
            <ul className="mt-3 ml-5 space-y-1 list-disc text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li>
                <strong style={{ color: "var(--ink)" }}>Chrome :</strong>{" "}
                Paramètres → Confidentialité et sécurité → Cookies
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Firefox :</strong>{" "}
                Paramètres → Vie privée et sécurité → Cookies
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Safari :</strong>{" "}
                Préférences → Confidentialité → Gérer les données de sites
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Edge :</strong>{" "}
                Paramètres → Confidentialité, recherche et services → Cookies
              </li>
            </ul>
            <p className="mt-3 text-sm" style={{ color: "var(--muted-lm)" }}>
              La désactivation de certains cookies peut affecter votre expérience sur le site.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              4. Base légale
            </h2>
            <p>
              Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et
              Libertés, le dépôt de cookies nécessaires repose sur notre <strong>intérêt légitime</strong> à assurer
              le fonctionnement du service. Les cookies analytiques et publicitaires reposent sur votre
              <strong> consentement</strong> (art. 6.1.a RGPD), que vous pouvez retirer à tout moment.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              5. Transferts hors UE
            </h2>
            <p>
              Google LLC est établi aux États-Unis. Les données collectées via Google Analytics et Google Ads peuvent
              être transférées vers des serveurs situés hors de l'Union européenne. Ces transferts s'effectuent sur la
              base des clauses contractuelles types approuvées par la Commission européenne.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              6. Contact
            </h2>
            <p>
              Pour toute question relative à l'utilisation des cookies sur LettreMagique, vous pouvez nous contacter à
              l'adresse :{" "}
              <a href="mailto:kennydsf91@gmail.com" style={{ color: "var(--accent)" }}>
                kennydsf91@gmail.com
              </a>
            </p>
            <p className="mt-3">
              Pour en savoir plus sur la protection de vos données personnelles, consultez notre{" "}
              <a href="/confidentialite" style={{ color: "var(--accent)" }}>
                Politique de confidentialité
              </a>.
            </p>
          </article>

        </div>
      </section>
    </div>
  );
}
