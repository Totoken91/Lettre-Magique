import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — LettreMagique",
  description: "Mentions légales du site LettreMagique.",
};

export default function MentionsLegalesPage() {
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
            Mentions légales
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
              1. Éditeur du site
            </h2>
            <p>Le site <strong>lettre-magique.com</strong> est édité par :</p>
            <ul className="mt-3 space-y-1 text-sm" style={{ fontFamily: "var(--font-dm-mono)", color: "var(--muted-lm)" }}>
              <li><strong style={{ color: "var(--ink)" }}>Entreprise :</strong> totoken (Entreprise individuelle)</li>
              <li><strong style={{ color: "var(--ink)" }}>Adresse :</strong> 21 Domaine de Montvoisin, 91400 Gometz-la-Ville</li>
              <li><strong style={{ color: "var(--ink)" }}>SIRET :</strong> 93792854700010</li>
              <li><strong style={{ color: "var(--ink)" }}>Email :</strong> kennydsf91@gmail.com</li>
              <li><strong style={{ color: "var(--ink)" }}>Directeur de publication :</strong> Kenny Desaintfuscien</li>
            </ul>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              2. Hébergement
            </h2>
            <p className="mb-3">
              <strong>Serveur web :</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "13px" }}>vercel.com</span>
            </p>
            <p>
              <strong>Base de données :</strong> Supabase Inc., 970 Toa Payoh North #07-04, Singapour 318992 —{" "}
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "13px" }}>supabase.com</span>
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              3. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, logos, code source, interface) est la propriété exclusive
              de l'éditeur. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans
              autorisation écrite préalable est interdite et constitue une contrefaçon sanctionnée par le Code de la
              propriété intellectuelle.
            </p>
            <p className="mt-3">
              Les courriers générés par LettreMagique sont la propriété de l'utilisateur qui les a commandés. L'éditeur
              ne conserve pas de droit d'exploitation sur leur contenu.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              4. Limitation de responsabilité
            </h2>
            <p>
              LettreMagique est un outil d'aide à la rédaction de courriers administratifs. Les textes générés le sont
              à titre indicatif et ne constituent en aucun cas un conseil juridique. L'utilisateur reste seul
              responsable de l'utilisation des courriers produits et de leur conformité avec sa situation personnelle.
            </p>
            <p className="mt-3">
              L'éditeur ne peut garantir l'exactitude, la complétude ou l'adéquation des courriers générés à chaque
              situation particulière. L'utilisation du service relève de la seule responsabilité de l'utilisateur.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              5. Données personnelles
            </h2>
            <p>
              Les traitements de données personnelles effectués dans le cadre du service LettreMagique sont décrits
              dans notre{" "}
              <a href="/confidentialite" style={{ color: "var(--accent)" }}>
                Politique de confidentialité
              </a>.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-bold mb-3 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              6. Droit applicable
            </h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux
              compétents sont ceux du ressort du siège social de l'éditeur.
            </p>
          </article>

        </div>
      </section>
    </div>
  );
}
