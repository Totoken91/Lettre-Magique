# LettreMagique — Stratégie Marketing & Croissance

> *Dernière mise à jour : 26 mars 2026*

---

## 1. SEO — Acquisition organique Google

### Pages longue traîne (55 pages live)

Chaque page cible une intention de recherche précise ("lettre résiliation Netflix", "contester amende SNCF") et est générée statiquement (SSG) pour un temps de chargement optimal.

**Route :** `/generateur/seo/[slug]`

| Catégorie | Pages | Exemples de mots-clés ciblés |
|---|---|---|
| Télécom/Internet (11) | Free, SFR, Orange, Bouygues, Sosh, RED, B&You, Canal+ | "résilier free mobile", "lettre résiliation SFR box" |
| Streaming (5) | Netflix, Amazon Prime, Disney+, Spotify, DAZN | "résilier netflix", "annuler abonnement dazn" |
| Salles de sport (2) | Basic-Fit, Fitness Park | "résilier basic fit lettre", "résiliation fitness park" |
| Assurance (3) | Auto, habitation, mutuelle | "résilier assurance auto loi hamon", "lettre résiliation mutuelle" |
| Réclamations (6) | Amazon, La Poste, SNCF, facture, produit, garantie | "réclamation colis perdu la poste", "lettre garantie produit défectueux" |
| Logement (6) | Préavis 1/3 mois, caution, voisinage, réparations, état des lieux | "lettre préavis 1 mois zone tendue", "demande restitution caution" |
| Mise en demeure (4) | Loyer, remboursement, artisan, travaux | "mise en demeure loyer impayé", "lettre artisan abandon chantier" |
| Contestation (6) | Stationnement, radar, SNCF, RATP, impôts, URSSAF | "contester amende stationnement", "contestation pv radar" |
| Travail (4) | Démission, sanction, salaire, licenciement | "lettre démission cdi", "contester licenciement prud'hommes" |
| Rétractation (3) | Achat en ligne, démarchage, contrat domicile | "rétractation achat internet 14 jours", "annuler contrat signé à domicile" |
| Délai paiement (3) | Impôts, loyer, crédit | "demande délai paiement impôts", "échéancier loyer" |

### Structure SEO de chaque page

Chaque page contient :
- **metaTitle** optimisé (< 60 caractères, mot-clé + année)
- **metaDescription** avec CTA (< 155 caractères)
- **H1 unique** avec le nom de l'entreprise/service
- **Contenu juridique** : articles de loi spécifiques (Code de la consommation, Code des assurances, etc.)
- **FAQ structurée** (3-4 questions/réponses) → éligible rich snippets Google
- **Schema.org JSON-LD** : FAQPage + HowTo
- **Maillage interne** via `relatedSlugs` (3 pages liées par page)
- **CTA** vers le générateur avec type + entreprise pré-remplis

### Sitemap & indexation

- `sitemap.xml` généré automatiquement (`app/sitemap.ts`)
- Toutes les pages SEO incluses avec priorité 0.8, fréquence mensuelle
- Pages principales (accueil, générateur, tarifs) en priorité 1.0

### Prochaines étapes SEO

- [ ] Ajouter `robots.txt` via `app/robots.ts`
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Suivre l'indexation et les positions
- [ ] Ajouter des pages SEO pour les entreprises les plus recherchées (EDF, Engie, Veolia, etc.)
- [ ] Articles de blog / guides ("Comment résilier en France — guide complet 2026")

---

## 2. Tracking & Analytics

### UTM & referrer (opérationnel)

Le composant `PageTracker` capture automatiquement :
- `document.referrer` (d'où vient le visiteur)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` (paramètres URL)

Stocké dans `page_views` et classifié automatiquement dans le dashboard admin :
- **Google (organique)** : referrer google.* ou utm_source=google
- **Réseaux sociaux** : Facebook, Instagram, TikTok, Twitter/X, LinkedIn, YouTube
- **Bing** : referrer bing.*
- **UTM custom** : tout utm_source non reconnu affiché tel quel
- **Direct** : aucun referrer ni UTM

### Liens de campagne

Pour chaque canal, utiliser des UTM :

```
# Réseaux sociaux
https://lettre-magique.com?utm_source=instagram&utm_medium=social&utm_campaign=launch
https://lettre-magique.com?utm_source=tiktok&utm_medium=social&utm_campaign=video1
https://lettre-magique.com?utm_source=facebook&utm_medium=social&utm_campaign=groupe-locataires

# Reddit / forums
https://lettre-magique.com?utm_source=reddit&utm_medium=forum&utm_campaign=r-france

# Newsletter / email
https://lettre-magique.com?utm_source=newsletter&utm_medium=email&utm_campaign=lancement

# Google Ads
https://lettre-magique.com?utm_source=google&utm_medium=cpc&utm_campaign=resiliation
```

### Google Ads

- Conversion tracking configuré (ID: AW-18033703584)
- Événements trackés : `page_view`, `generate_letter`, `signup`, `purchase`

---

## 3. Codes promo — Levier d'acquisition

### Fonctionnement

Les codes promo sont gérés depuis `/admin` :
- Créer un code avec nombre de crédits, max utilisations, date d'expiration
- Activer/désactiver un code
- Afficher un code en **bannière** sur la landing page (un seul à la fois)
- Voir l'impact : nombre d'utilisations, comparaison engagement promo vs non-promo

### Stratégies promo

| Code | Crédits | Usage | Canal |
|---|---|---|---|
| `PROMO!` | 5 | Bannière landing page | Organique |
| `REDDIT` | 3 | Posts Reddit r/france, r/vosfinances | Reddit |
| `TIKTOK` | 5 | Bio TikTok | TikTok |
| `INSTA` | 3 | Story/bio Instagram | Instagram |
| `LOCATAIRE` | 5 | Groupes Facebook locataires | Facebook |

Chaque code permet de mesurer l'efficacité du canal via le dashboard admin (utilisateurs promo vs non-promo, engagement, conversion Pro).

---

## 4. Réseaux sociaux — Plan de contenu

### TikTok / Instagram Reels (priorité haute)

Format : vidéos courtes (30-60s) montrant un problème → solution LettreMagique.

**Idées de contenu :**
- "J'ai récupéré ma caution en 2 minutes" (préavis logement)
- "Mon opérateur refusait de me résilier" (résiliation télécom)
- "Comment j'ai contesté mon amende SNCF" (contestation)
- "La loi que ton assurance ne veut pas que tu connaisses" (loi Hamon)
- "Ne paie JAMAIS cette amende de stationnement sans vérifier ça" (FPS)
- "Ton artisan a abandonné le chantier ? Fais ça" (mise en demeure)

**Format type :**
1. Hook accrocheur (2s) → problème relatable
2. "Il existe une loi qui te protège" → article de loi
3. Démonstration rapide du générateur (screencast)
4. CTA : "Lien en bio, code TIKTOK = 5 courriers offerts"

### Reddit

**Subreddits cibles :**
- r/france — partage de l'outil (valeur d'abord, pas de spam)
- r/vosfinances — contexte finance perso
- r/conseiljuridique — aide juridique
- r/AskFrance — questions pratiques

**Approche :** poster un commentaire utile avec lien quand quelqu'un demande comment résilier/contester/réclamer. Ne jamais poster de lien direct en post principal.

### Facebook

**Groupes cibles :**
- Groupes d'aide aux locataires
- Groupes droits des consommateurs
- Groupes aide administrative
- Groupes expatriés (retour en France = résiliations)

---

## 5. Watermark PDF — Viralité conditionnelle

> **Principe :** watermark uniquement sur les courriers gratuits, pas sur les payants. Ça évite de décrédibiliser un courrier formel (le destinataire voit "LettreMagique.fr" → il pense "auto-généré"). Et ça devient un argument de vente : "passez en payant pour retirer le watermark".

| Type de courrier | Watermark |
|---|---|
| Essai gratuit (anonyme) | ✅ "Créé avec LettreMagique.fr" en pied de page |
| Crédits payants (1,99 €) | ❌ Aucun watermark |
| Abonné Pro | ❌ Aucun watermark |

### Partage social

- Bouton "Partager" après génération d'un courrier
- Message pré-rempli : "J'ai généré mon courrier de [type] en 2 min sur LettreMagique.fr"

### Code parrainage (futur)

- Chaque utilisateur obtient un code unique
- +1 crédit par inscription parrainée
- +1 crédit pour le filleul

---

## 6. Bannière promo dynamique

### Fonctionnement technique

La bannière en haut de la landing page est **dynamique** :
- Lit le code promo actif (colonne `show_banner = true` dans `promo_codes`)
- Affiche le code, les crédits offerts et la description
- Si aucun code n'a `show_banner = true`, la bannière disparaît
- Un seul code en bannière à la fois (toggle automatique depuis l'admin)

### Composant

- **Server component** : `components/landing/PromoBanner.tsx` (SSR, pas de flash)
- **Admin** : bouton "Afficher bannière" / "Masquer bannière" sur chaque code

---

## 7. Blog / SEO éditorial (haut de funnel)

> Les 55 pages SEO existantes sont **transactionnelles** (l'utilisateur veut agir). Il faut aussi des pages **informationnelles** qui attirent des gens en amont — ils ne savent pas encore qu'ils ont besoin de l'outil.

### Format

Articles de 800-1500 mots, optimisés pour une requête informationnelle, avec CTA vers le générateur en fin d'article.

### Idées d'articles prioritaires

| Mot-clé cible | Titre article |
|---|---|
| "droits caution logement" | Dépôt de garantie : vos droits si le propriétaire ne rend pas la caution |
| "délai résiliation assurance auto" | Résiliation assurance auto en 2026 : délais, loi Hamon, tout savoir |
| "contester amende stationnement" | Amende de stationnement injustifiée : comment contester étape par étape |
| "droits locataire réparations" | Quelles réparations sont à la charge du propriétaire ? Guide complet |
| "lettre mise en demeure comment" | Mise en demeure : quand l'envoyer, que doit-elle contenir ? |
| "loi chatel résiliation" | Loi Chatel : comment résilier sans frais un contrat reconduit |
| "contester licenciement délai" | Licenciement abusif : délais et recours aux prud'hommes |
| "droit rétractation 14 jours" | Droit de rétractation 14 jours : ce que la loi prévoit vraiment |

### Structure type d'un article

1. Introduction (problème relatable)
2. Ce que dit la loi (articles + explication simple)
3. Étapes concrètes (que faire, dans quel ordre)
4. Modèle de courrier → **CTA : "Générez votre courrier en 2 min"**
5. FAQ (2-3 questions, schema.org)

### Hébergement

Route `/blog/[slug]` — même stack que les pages SEO, contenu dans un fichier `data/blog-posts.ts` ou en Markdown.

---

## 8. Rétention & Email marketing

> On capture des comptes mais on ne fait rien avec après. Un email automatique peut relancer des utilisateurs dormants.

### Emails automatisés (via Resend)

| Déclencheur | Délai | Contenu |
|---|---|---|
| Inscription | Immédiat | Bienvenue + rappel crédits disponibles + code promo si applicable |
| 1er courrier généré | +1 jour | "Votre courrier a été généré — besoin d'un autre ?" |
| Compte inactif | +7 jours | "Vous avez X crédits restants. Voici les courriers les plus populaires ce mois-ci." |
| Crédits épuisés | Immédiat | "Vos crédits sont épuisés — recharger ou passer Pro" |
| Abandon panier Stripe | +1 heure | "Vous n'avez pas finalisé votre achat" (si Stripe le supporte) |

### Newsletter mensuelle (manuel)

- Top 3 courriers les plus générés du mois
- Nouveau type de courrier / nouvelle fonctionnalité
- Conseil juridique du mois
- CTA vers le générateur

---

## 9. Google Ads — Budget minimum viable

> Le SEO met 6-8 semaines à porter ses fruits. Google Ads peut ramener du trafic qualifié dès le jour 1, même avec 5 €/jour.

### Budget recommandé

| Phase | Budget/jour | Durée | Total |
|---|---|---|---|
| Test (mots-clés) | 5 € | 2 semaines | 70 € |
| Optimisation | 5-10 € | 2 semaines | 70-140 € |
| Scaling (si ROI positif) | 10-20 € | continu | — |

### Mots-clés prioritaires (Search Ads)

Cibler des requêtes transactionnelles à forte intention :

| Mot-clé | CPC estimé | Intention |
|---|---|---|
| "lettre résiliation" | 0,30-0,50 € | Très forte |
| "modèle mise en demeure" | 0,20-0,40 € | Très forte |
| "lettre type gratuite" | 0,10-0,30 € | Forte |
| "contester amende" | 0,30-0,50 € | Forte |
| "résilier assurance auto" | 0,40-0,60 € | Forte |
| "lettre préavis logement" | 0,20-0,40 € | Forte |

### Landing pages Ads

Diriger chaque groupe d'annonces vers la page SEO correspondante (pas la page d'accueil) :
- Annonce "résiliation" → `/generateur/seo/resiliation-free-mobile`
- Annonce "mise en demeure" → `/generateur/seo/mise-en-demeure-artisan`
- Annonce "amende" → `/generateur/seo/contestation-pv-radar`

Avec `utm_source=google&utm_medium=cpc&utm_campaign=...` pour le tracking.

### Conversion tracking

Déjà en place : Google Ads conversion tag (AW-18033703584). Événements trackés : génération de courrier, inscription, achat.

---

## 10. Métriques à suivre

### KPIs principaux (dashboard admin)

> Objectifs réalistes — le SEO met 6-8 semaines, le trafic organique sera faible au début. Les réseaux sociaux et Google Ads compensent en attendant.

| Métrique | Objectif J30 | Objectif J90 |
|---|---|---|
| Visiteurs uniques (30j) | 200 | 2 000 |
| Courriers générés | 50 | 500 |
| Comptes créés | 20 | 150 |
| Taux conversion visiteur → courrier | > 8% | > 12% |
| Taux conversion gratuit → payant | > 3% | > 8% |
| Abonnés Pro | 2 | 15 |
| MRR | 10 € | 75 € |
| Pages SEO indexées | 30/55 | 55+ |
| Trafic Google organique | 5 visites/j | 50 visites/j |

### KPIs par canal (via UTM)

Suivre pour chaque source :
- Visites
- Conversions (visite → générateur)
- Taux de conversion
- Courriers générés
- Inscriptions
- Coût par acquisition (pour Ads)

---

## 11. Calendrier de lancement

### Semaine 1 (26-31 mars 2026) — Fondations
- [x] 55 pages SEO live
- [x] Tracking UTM opérationnel
- [x] Codes promo admin fonctionnel
- [ ] Soumettre sitemap à Google Search Console
- [ ] Créer compte TikTok LettreMagique
- [ ] Configurer Google Ads (5 €/jour, 3 groupes d'annonces)
- [ ] Premier commentaire Reddit utile avec lien (r/conseiljuridique ou r/france)

### Semaine 2 (1-7 avril) — Premiers contenus
- [ ] Première vidéo TikTok (résiliation opérateur)
- [ ] Posts dans 3 groupes Facebook (locataires, consommateurs)
- [ ] Créer codes promo par canal (REDDIT, TIKTOK, INSTA, FACEBOOK)
- [ ] Vérifier indexation Google (combien de pages sur 55)
- [ ] Premier article blog informatif (si route blog en place)

### Semaine 3 (8-14 avril) — Itération
- [ ] 2-3 vidéos TikTok supplémentaires
- [ ] Analyser sources de trafic admin → doubler sur ce qui marche
- [ ] Optimiser Google Ads (couper les mots-clés non rentables)
- [ ] Email de relance aux comptes inactifs (7j+)

### Semaine 4 (15-21 avril) — Bilan J30
- [ ] Bilan J30 : KPIs vs objectifs
- [ ] Newsletter aux premiers inscrits
- [ ] Décider : scaler Ads ou pivoter vers un autre canal

### Mois 2-3 — Croissance
- [ ] SEO éditorial : 4-8 articles blog
- [ ] Continuer TikTok (1-2 vidéos/semaine)
- [ ] Implémenter emails automatisés (Resend)
- [ ] Watermark PDF conditionnel (gratuit uniquement)
- [ ] Préparer Product Hunt (attendre 200+ utilisateurs actifs + témoignages)

### Mois 4+ — Product Hunt & LM Mail
- [ ] Lancement Product Hunt (quand base utilisateurs solide)
- [ ] Beta LM Mail (envoi postal)
- [ ] Programme parrainage

---

*Document créé le 26 mars 2026 — dernière mise à jour 26 mars 2026*
