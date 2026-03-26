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

## 5. Viralité produit

### Watermark PDF (à implémenter)

Chaque PDF généré contient "Créé avec LettreMagique.fr" en pied de page. Quand l'utilisateur envoie son courrier, le destinataire (entreprise, propriétaire, etc.) voit la marque → bouche à oreille gratuit.

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

## 7. Métriques à suivre

### KPIs principaux (dashboard admin)

| Métrique | Objectif J30 | Objectif J90 |
|---|---|---|
| Visiteurs uniques (30j) | 500 | 5 000 |
| Courriers générés | 200 | 1 000 |
| Comptes créés | 50 | 300 |
| Taux conversion visiteur → courrier | > 10% | > 15% |
| Taux conversion gratuit → payant | > 5% | > 10% |
| Abonnés Pro | 5 | 30 |
| MRR | 25 € | 150 € |
| Pages SEO indexées | 55 | 100+ |
| Trafic Google organique | 50 visites/j | 200 visites/j |

### KPIs par canal (via UTM)

Suivre pour chaque source :
- Visites
- Conversions (visite → générateur)
- Taux de conversion
- Courriers générés
- Inscriptions

---

## 8. Calendrier de lancement

### Semaine 1 (26-31 mars 2026)
- [x] 55 pages SEO live
- [x] Tracking UTM opérationnel
- [x] Codes promo admin fonctionnel
- [ ] Soumettre sitemap à Search Console
- [ ] Premier post Reddit (r/france)
- [ ] Créer compte TikTok LettreMagique

### Semaine 2 (1-7 avril)
- [ ] Première vidéo TikTok (résiliation)
- [ ] Posts dans 3 groupes Facebook
- [ ] Vérifier indexation Google (55 pages)
- [ ] Créer 2 codes promo par canal (REDDIT, TIKTOK, INSTA)

### Semaine 3 (8-14 avril)
- [ ] 3 vidéos TikTok supplémentaires
- [ ] Analyser les sources de trafic admin → doubler sur ce qui marche
- [ ] Product Hunt : préparer la page

### Semaine 4 (15-21 avril)
- [ ] Lancement Product Hunt
- [ ] Newsletter aux premiers inscrits
- [ ] Bilan J30 : KPIs vs objectifs

---

*Document créé le 26 mars 2026*
