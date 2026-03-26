# LettreMagique — Vue d'ensemble du projet

## Qu'est-ce que LettreMagique ?

**LettreMagique** est une plateforme SaaS de génération de courriers administratifs français propulsée par l'IA. Elle permet à n'importe quel utilisateur de créer un courrier formel, juridiquement solide, en 2 minutes — sans aucune expertise légale ni rédactionnelle.

**URL :** https://lettre-magique.vercel.app

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Composants UI | shadcn/ui (Button, Input, Card, Select, Badge, etc.) |
| Backend | Next.js API Routes (serverless sur Vercel) |
| Base de données | Supabase (PostgreSQL + Auth + RLS) |
| IA | Anthropic Claude Haiku (`claude-haiku-4-5-20251001`) |
| Paiement | Stripe (checkout, webhooks, abonnements) |
| Email | Resend (envoi de courriers en pièce jointe PDF) |
| PDF | pdf-lib (génération), pdfjs-dist (aperçu) |
| Analytics | Google Ads (gtag.js), système d'events custom |
| Graphiques admin | Recharts |
| Hébergement | Vercel |

---

## Fonctionnalités opérationnelles

### 1. Génération de courriers par IA

**10 types de courriers disponibles :**

| Type | Description |
|------|-------------|
| Résiliation | Annulation de contrats, abonnements, assurances |
| Réclamation | Litiges produits, services, facturation |
| Logement | Préavis locataire, dépôt de garantie, réparations, voisinage |
| Mise en demeure | Exiger un paiement/action avec menace juridique |
| Contestation | Contester amendes, pénalités, infractions |
| Demande | Demander un délai, une information, une extension |
| Droit du travail | Litiges employeur/employé |
| Surendettement | Problèmes de dettes |
| Propriété | Litiges immobiliers |
| Autre | Courrier libre personnalisé |

Chaque type possède **3 à 5 questions dynamiques** adaptées (champs texte, textarea, date, select).

**Chaque courrier généré inclut :**
- Nom et adresse de l'expéditeur
- Date du jour
- Destinataire (auto-complété si entreprise connue)
- Objet
- Corps du courrier (français formel, juridiquement solide)
- 2+ références légales (articles de loi : Code de la consommation, Loi Chatel, Loi Hamon, etc.)
- Numéro de référence auto-généré (ex: LM-2026-03-12345)
- Signature (manuscrite via canvas ou ligne vide pour impression)

### 2. Génération et export PDF

- Format A4 professionnel (595×841 points)
- Typographie Helvetica, marges 56pt
- Support multi-pages pour les courriers longs
- Signature embarquée (image canvas) ou ligne de signature vierge
- En-tête et pied de page LettreMagique
- Conversion Unicode → ASCII pour compatibilité PDF
- Téléchargement direct ou envoi par email

### 3. Auto-complétion des destinataires

Base de données de **50+ entreprises françaises** (EDF, Orange, SFR, Free, Amazon, La Poste, Bouygues, etc.) avec adresses postales complètes. Quand l'utilisateur mentionne une entreprise connue, l'adresse est automatiquement insérée dans le PDF.

### 4. Système de paiement (Stripe)

| Offre | Prix | Détail |
|-------|------|--------|
| Essai gratuit | 0 € | 1er courrier offert (tracké par cookie) |
| À l'unité | 1,99 € | Paiement ponctuel, +1 crédit |
| Abonnement Pro | 4,99 €/mois | Courriers illimités |

- Création de session Stripe via `/api/stripe/checkout`
- Webhook Stripe pour mise à jour automatique des crédits/statut pro
- Pages dédiées : `/paiement-succes` et `/paiement-annule`

### 5. Authentification utilisateur

**Méthodes :**
- Email + mot de passe (Supabase Auth)
- Google OAuth

**Gestion de session :**
- Client Supabase SSR avec synchronisation cookies
- Middleware de rafraîchissement de session
- Callback OAuth via `/auth/callback`

### 6. Espace utilisateur (`/compte`)

- Modification du profil (nom, adresse, code postal, ville, téléphone)
- Affichage des crédits restants
- Application de codes promo
- Gestion de l'abonnement Stripe

### 7. Historique des courriers (`/mes-courriers`)

- Liste de tous les courriers générés par l'utilisateur
- Accès aux textes générés
- Re-téléchargement PDF

### 8. Système de codes promo

- Table `promo_codes` administrable depuis `/admin` (code, crédits, max utilisations, expiration, bannière)
- **CRUD complet depuis l'admin** : créer, modifier, activer/désactiver, supprimer des codes
- **Bannière dynamique** : un code peut être affiché en bannière sur la landing page (toggle depuis l'admin, un seul code actif en bannière à la fois)
- **Expiration** : date d'expiration optionnelle, vérifiée automatiquement à la rédemption
- Rédemption via `/api/promo/redeem` (vérifie actif, non expiré, max uses, déjà utilisé)
- Tracking dans `promo_redemptions` (1 utilisation par utilisateur)
- Saisie du code promo lors de l'inscription ou dans `/compte`
- API publique `/api/promo/banner` pour la bannière dynamique

### 9. Envoi de courrier par email (Resend)

- Envoi du courrier en pièce jointe PDF par email
- Templates HTML professionnels
- Reply-to configurable
- Via `POST /api/send-letter`

### 10. Panneau d'administration (`/admin`)

- **Métriques clés :** inscrits, abonnés pro, courriers générés (total + 7j), visiteurs (30j + 7j), MRR, ARPU
- **Funnel de conversion :** Visiteurs → Page générateur → Génération → Inscription → Pro
- **Timeline :** graphique Recharts courriers & inscriptions sur 30 jours
- **Rétention :** utilisateurs 1+, 2+, 5+ courriers, taux de retour 30j
- **Répartition par type** de courrier (tableau responsive avec total, 7j, %)
- **Sources de trafic :** classification automatique par referrer + UTM (Google, réseaux sociaux, direct, custom)
- **Funnel freemium :** courriers gratuits → comptes créés → actifs → upgrade Pro
- **Gestion des codes promo :** CRUD complet (créer, modifier, activer/désactiver, supprimer, toggle bannière, expiration)
- **Comparaison promo vs non-promo :** engagement et taux de conversion Pro
- **Derniers courriers et inscrits** en temps réel
- **Actions utilisateur :** panel détaillé par utilisateur
- **Responsive mobile** : tableaux et stats adaptés aux petits écrans

### 11. Analytics & tracking

- Google Ads Conversion (ID: AW-18033703584)
- Événements custom enregistrés dans la table `events` : `page_view`, `generate_letter`, `signup`, `purchase`
- Composant `PageTracker` pour le suivi des pages vues avec **capture automatique du referrer et des paramètres UTM** (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`)
- API `/api/track` : stocke session_id, path, user_agent, referrer, UTM dans `page_views`
- Classification automatique des sources de trafic dans l'admin (Google, réseaux sociaux, Bing, UTM custom, direct)

### 12. Pages légales

- `/cgu` — Conditions générales d'utilisation
- `/confidentialite` — Politique de confidentialité
- `/mentions-legales` — Mentions légales
- `/politique-cookies` — Politique des cookies

### 13. Pages marketing & SEO

- `/` — Landing page (hero, catégories, fonctionnement, témoignages, tarifs, CTA, bannière promo dynamique)
- `/tarifs` — Page de tarification détaillée
- `/comment-ca-marche` — Explication pas à pas
- `/generateur/seo/[slug]` — **55 pages SEO longue traîne** générées statiquement (SSG) avec :
  - Hero + CTA pré-rempli par type/entreprise
  - Bloc juridique (articles de loi spécifiques)
  - FAQ structurée (schema.org FAQPage + HowTo JSON-LD)
  - Maillage interne via `relatedSlugs`
  - Sitemap.xml automatique (priorité 0.8)

**Catégories SEO couvertes (55 pages) :**
| Catégorie | Nb | Exemples |
|---|---|---|
| Télécom/Internet | 11 | Free, SFR, Orange, Bouygues, Sosh, RED, B&You, Canal+ |
| Streaming/Sport | 5 | Netflix, Amazon Prime, Disney+, Spotify, DAZN |
| Salles de sport | 2 | Basic-Fit, Fitness Park |
| Assurance | 3 | Auto, habitation, mutuelle |
| Réclamations | 6 | Amazon colis, La Poste, SNCF, facture abusive, produit défectueux, garantie |
| Logement | 6 | Préavis 1/3 mois, caution, voisinage, réparations, état des lieux |
| Mise en demeure | 4 | Loyer impayé, remboursement, artisan, travaux non conformes |
| Contestation | 6 | Stationnement, radar, SNCF, RATP, impôts, URSSAF |
| Travail | 4 | Démission, sanction, salaire impayé, licenciement |
| Rétractation | 3 | Achat en ligne 14j, démarchage téléphonique, contrat à domicile |
| Délai de paiement | 3 | Impôts, loyer, crédit |

### 14. Essai gratuit anonyme

- 1 courrier gratuit par appareil (cookie `lm_anon_used=1`, expiration 1 an)
- Aucun mur d'inscription pour le premier courrier
- PDF téléchargeable immédiatement après génération

---

## Parcours utilisateurs

### Parcours 1 : Essai gratuit (anonyme)
1. Atterrissage sur `/` (landing page)
2. Clic sur "Générer un courrier"
3. `/generateur` → choix du type de courrier
4. `/generateur/[type]` → réponse aux questions
5. Génération IA (`POST /api/generer`) + cookie posé
6. `/resultat` → aperçu + téléchargement PDF

### Parcours 2 : Achat à l'unité
1. Création de compte (`/signup`)
2. Parcours de génération (étapes 1 à 6)
3. Limite atteinte (1 gratuit + 0 crédits)
4. Redirection vers Stripe (1,99 €)
5. Webhook met à jour les crédits
6. Génération possible (crédits décrémentés par courrier)

### Parcours 3 : Abonné Pro
1. Création de compte
2. Souscription au Plan Pro (4,99 €/mois)
3. `is_pro = true` dans Supabase
4. Courriers illimités, pas de vérification de crédits

### Parcours 4 : Administrateur
1. Accès à `/admin`
2. Consultation analytics, utilisateurs, courriers, funnel
3. Création/gestion des codes promo
4. Suivi comportement et rétention utilisateurs

---

## Architecture de la base de données

### Table `profiles`
| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | ID utilisateur (clé primaire) |
| is_pro | boolean | Abonné Pro actif |
| credits | integer | Crédits courriers restants |
| stripe_customer_id | text | ID client Stripe |
| stripe_subscription_id | text | ID abonnement Stripe |
| full_name | text | Nom complet |
| address | text | Adresse postale |
| postal_code | text | Code postal |
| city | text | Ville |
| phone | text | Téléphone |
| email_contact | text | Email de contact |
| created_at | timestamp | Date de création |

### Table `letters`
| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | Identifiant unique |
| user_id | UUID | Auteur (nullable pour anonymes) |
| type | text | Type de courrier |
| type_name | text | Nom affiché du type |
| form_data | JSONB | Réponses du formulaire |
| generated_text | text | Courrier généré |
| sender_name | text | Nom de l'expéditeur |
| email | text | Email (ou "free try") |
| fingerprint | text | Empreinte appareil (anonymes) |
| created_at | timestamp | Date de création |

### Table `promo_codes`
| Colonne | Type | Description |
|---------|------|-------------|
| code | text | Code promo (clé primaire) |
| credits | integer | Crédits offerts |
| used_count | integer | Nombre d'utilisations |
| max_uses | integer | Limite d'utilisations (null = illimité) |
| active | boolean | Actif ou non |
| show_banner | boolean | Affiché en bannière sur la landing page |
| expires_at | timestamptz | Date d'expiration (null = jamais) |
| description | text | Texte descriptif pour la bannière |
| created_at | timestamptz | Date de création |

### Table `promo_redemptions`
| Colonne | Type | Description |
|---------|------|-------------|
| user_id | UUID | Utilisateur |
| code | text | Code utilisé |
| created_at | timestamp | Date de rédemption |

### Table `page_views`
| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | Identifiant unique |
| session_id | text | ID session (localStorage) |
| path | text | Chemin de la page |
| user_agent | text | User-agent du navigateur |
| utm_source | text | Source UTM (google, facebook, etc.) |
| utm_medium | text | Medium UTM (cpc, social, email, etc.) |
| utm_campaign | text | Nom de la campagne UTM |
| utm_content | text | Contenu UTM |
| referrer | text | URL du referrer (document.referrer) |
| created_at | timestamptz | Date |

### Table `events`
| Colonne | Type | Description |
|---------|------|-------------|
| user_id | UUID | Utilisateur (nullable) |
| event_name | text | Nom de l'événement |
| metadata | JSONB | Données supplémentaires |
| created_at | timestamp | Date |

**Sécurité :** Row-Level Security (RLS) activée — chaque utilisateur ne voit que ses propres données.

---

## Routes API

| Endpoint | Méthode | Description | Auth requise |
|----------|---------|-------------|--------------|
| `/api/generer` | POST | Génération de courrier via Claude | User OU Cookie |
| `/api/pdf` | POST | Conversion texte → PDF | Non |
| `/api/send-letter` | POST | Envoi du courrier par email (Resend) | User |
| `/api/stripe/checkout` | POST | Création session de paiement Stripe | User |
| `/api/stripe/webhook` | POST | Réception événements Stripe | Signature Stripe |
| `/api/stripe/apply-session` | POST | Application manuelle d'une session | User |
| `/api/promo/redeem` | POST | Application d'un code promo (vérifie expiration) | User |
| `/api/promo/banner` | GET | Code promo actif pour la bannière landing | Non |
| `/api/user/quota` | GET | Vérification des crédits restants | User |
| `/api/lead` | POST | Capture email (waitlist) | Non |
| `/api/track` | POST | Tracking pages vues + referrer + UTM | Non |
| `/api/admin/stats` | GET | Données du dashboard admin | Admin |
| `/api/admin/promo` | GET/POST/PUT/DELETE | CRUD complet codes promo | Admin |
| `/api/admin/user-action` | POST | Actions de modération | Admin |
| `/auth/callback` | GET | Callback OAuth (Google) | Provider OAuth |

---

## Design system

### Typographies
- **Syne** (400-800) — Titres, headlines — Moderne, géométrique
- **DM Mono** — Labels, métadonnées, uppercase — Technique, monospace
- **Lora** — Corps de texte, italiques — Serif lisible

### Palette de couleurs
| Variable | Valeur | Usage |
|----------|--------|-------|
| `--ink` | #1d1d1b | Texte principal |
| `--accent` | #c84b2f | Orange brûlé — CTA principal |
| `--green` | #4ade80 | Succès |
| `--gold` | #f59e0b | Highlights |
| `--white-warm` | #fdfaf4 | Fond off-white |
| `--paper` | #f9f6f1 | Fond clair |
| `--rule` | #e8e0d4 | Bordures |

### Responsive
- Mobile-first
- Breakpoints : `sm` (~640px), `md` (~768px), `lg` (~1024px)

---

## Variables d'environnement requises

```bash
# Anthropic (IA)
ANTHROPIC_API_KEY=sk-ant-...

# Supabase (BDD + Auth)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe (Paiement)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ONETIME=price_...     # 1,99 € à l'unité
STRIPE_PRICE_SUB=price_...          # 4,99 €/mois

# Resend (Email)
RESEND_API_KEY=...
RESEND_FROM_EMAIL_COURRIER=courrier@lm-justice.com
RESEND_FROM_EMAIL_NOREPLY=noreply@lm-justice.com

# Application
NEXT_PUBLIC_BASE_URL=https://lettre-magique.vercel.app
```

---

## Structure du projet

```
Lettre-Magique/
├── app/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Layout racine (Navbar, Footer, fonts, GA)
│   │   ├── globals.css                 # Styles globaux + variables CSS
│   │   ├── generateur/
│   │   │   ├── page.tsx                # Sélection du type de courrier
│   │   │   ├── [type]/page.tsx         # Formulaire dynamique
│   │   │   └── seo/[slug]/page.tsx     # Pages SEO longue traîne
│   │   ├── resultat/page.tsx           # Aperçu + téléchargement
│   │   ├── api/
│   │   │   ├── generer/route.ts        # Génération IA
│   │   │   ├── pdf/route.ts            # Génération PDF
│   │   │   ├── send-letter/route.ts    # Envoi email
│   │   │   ├── stripe/                 # Checkout + webhook
│   │   │   ├── promo/redeem/route.ts   # Codes promo
│   │   │   ├── user/quota/route.ts     # Crédits utilisateur
│   │   │   ├── admin/                  # Stats + actions admin
│   │   │   ├── lead/route.ts           # Capture email
│   │   │   └── track/route.ts          # Analytics
│   │   ├── auth/callback/route.ts      # OAuth callback
│   │   ├── login/                      # Page de connexion
│   │   ├── signup/                     # Page d'inscription
│   │   ├── compte/                     # Espace utilisateur
│   │   ├── mes-courriers/              # Historique courriers
│   │   ├── admin/                      # Dashboard admin
│   │   ├── tarifs/                     # Page tarifs
│   │   ├── comment-ca-marche/          # Comment ça marche
│   │   ├── cgu/                        # CGU
│   │   ├── confidentialite/            # Politique de confidentialité
│   │   ├── mentions-legales/           # Mentions légales
│   │   ├── politique-cookies/          # Politique cookies
│   │   ├── paiement-succes/            # Succès paiement
│   │   ├── paiement-annule/            # Paiement annulé
│   │   └── compte-active/              # Activation compte
│   ├── components/
│   │   ├── generateur/                 # DynamicForm, ResultatClient, LetterViewer, etc.
│   │   ├── landing/                    # HeroCTA, PromoBanner, WaitlistForm, ScrollReveal
│   │   ├── layout/                     # Navbar, Footer, CheckoutButton, PageTracker
│   │   ├── ui/                         # Composants shadcn/ui, PromoInput
│   │   └── admin/                      # TimelineChart, FunnelBar, UserDetailPanel, PromoManager
│   ├── lib/
│   │   ├── supabase/                   # Clients Supabase (browser, server, admin)
│   │   ├── prompts/index.ts            # Prompts Claude par type de courrier
│   │   ├── pdf/generator.ts            # Génération PDF (pdf-lib)
│   │   └── utils.ts                    # Utilitaires
│   └── data/
│       ├── letter-types.ts             # 10 types + questions dynamiques
│       ├── seo-pages.ts                # 55 pages SEO longue traîne
│       └── company-addresses.ts        # 50+ adresses entreprises françaises
├── supabase/
│   └── migrations/                     # Migrations schema BDD
├── PLAN_ATTAQUE.md                     # Roadmap du projet
└── PROJECT_OVERVIEW.md                 # Ce fichier
```

---

## Ce qui reste à faire (roadmap)

### SEO
- [x] 55 pages longue traîne SEO (routes dynamiques `generateStaticParams`)
- [x] Schema.org (FAQPage, HowTo JSON-LD)
- [x] Sitemap.xml automatique
- [ ] robots.txt
- [ ] Soumission Search Console + suivi indexation

### Fonctionnalités utilisateur
- [ ] Upgrade abonnement (4,99 €/mois) dans l'espace compte
- [ ] Favoris / templates de courriers

### Admin
- [x] Gestion codes promo (CRUD, expiration, bannière dynamique)
- [x] Tracking UTM + referrer fonctionnel
- [x] Tableaux responsive mobile
- [ ] Connexion Stripe → MRR/ARPU temps réel
- [ ] Export CSV des données

### Croissance
- [ ] Watermark PDF ("Créé avec LettreMagique.fr") pour viralité
- [ ] Optimisation Lighthouse
- [x] Responsive mobile navbar (burger visible, logo aéré)

### Futur — LM Mail (avantage concurrentiel)
- [ ] Intégration envoi postal (Maileva, Merci Facteur)
- [ ] Prix : +0,50 € par courrier envoyé
- [ ] Justification supplémentaire pour l'abonnement
