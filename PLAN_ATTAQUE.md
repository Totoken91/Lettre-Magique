# LettreMagique — Plan d'attaque

> Stack : Next.js 16 (App Router) · Tailwind CSS 4 · shadcn/ui · Supabase · Stripe · API Claude (Haiku) · pdf-lib · Vercel
> *Dernière mise à jour : 26 mars 2026*

---

## État d'avancement

### ✅ FAIT

| Élément | Détail |
|---------|--------|
| Setup Next.js 16 + Tailwind 4 + shadcn | Stack complète opérationnelle |
| Design system | Palette, typo (Syne/DM Mono/Lora), CSS vars, composants |
| Landing page | Hero, catégories, comment ça marche, exemples, tarifs, CTA, bannière promo dynamique |
| Générateur formulaire | 10 types de courriers, questions dynamiques, DynamicForm |
| API génération Claude | `POST /api/generer` → claude-haiku-4-5-20251001 |
| Génération PDF | pdf-lib, format A4, header/footer LettreMagique, multi-page |
| Page résultat | Aperçu + bouton téléchargement PDF |
| Auth Supabase | Signup/login pages + modale inline au moment de générer |
| Middleware session | Refresh session Supabase sur /generateur |
| Deploy Vercel | lettre-magique.vercel.app ✓ |
| Navbar responsive | Logo + burger mobile, liens desktop cachés, shrink-0, h-16 |
| Stripe paiement | Checkout 1,99€ unité + 4,99€/mois Pro, webhooks, pages succès/annulé |
| Essai gratuit anonyme | 1 courrier gratuit par appareil (cookie), pas d'inscription requise |
| Espace compte | Profil, crédits, codes promo, gestion abonnement |
| Historique courriers | `/mes-courriers` avec re-téléchargement PDF |
| Pages légales | CGU, confidentialité, mentions légales, politique cookies |
| **55 pages SEO** | Résiliation, réclamation, logement, mise en demeure, contestation, travail, rétractation, délai paiement |
| Schema.org SEO | FAQPage + HowTo JSON-LD sur chaque page SEO |
| Sitemap.xml | Généré automatiquement avec toutes les pages SEO (priorité 0.8) |
| Codes promo admin | CRUD complet, expiration, bannière dynamique, comparaison promo/non-promo |
| Tracking UTM/referrer | PageTracker capture referrer + utm_*, classification auto dans l'admin |
| Dashboard admin | Funnel, rétention, timeline, sources trafic, gestion promos, responsive mobile |
| Envoi email | Resend — courrier PDF en pièce jointe |
| Auto-complétion | 50+ entreprises françaises avec adresses postales |

---

### 🔲 RESTE À FAIRE — Par priorité

#### PRIORITÉ 1 — SEO & indexation

- [ ] **robots.txt** : `app/robots.ts`
- [ ] **Search Console** : soumission sitemap, suivi indexation
- [ ] **Liens internes** : depuis la landing vers les pages SEO les plus stratégiques

#### PRIORITÉ 2 — Monétisation avancée

- [ ] **MRR/ARPU Stripe** : connecter les données Stripe au dashboard admin
- [ ] **Upgrade in-app** : bouton upgrade Pro depuis `/compte`

#### PRIORITÉ 3 — Croissance

- [ ] **Watermark PDF** : "Créé avec LettreMagique.fr" (viralité)
- [ ] **Core Web Vitals** : audit Lighthouse, optimisation fonts/images
- [ ] **Export CSV admin** : export des données utilisateurs/courriers

#### PRIORITÉ 4 — LM Mail (avantage concurrentiel)

- [ ] **Intégration envoi postal** (Maileva, Merci Facteur)
- [ ] **Prix** : +0,50 € par courrier envoyé
- [ ] **Tracking AR** : suivi accusé de réception

---

## Architecture base de données

Toutes les tables sont créées et opérationnelles dans Supabase. Voir `PROJECT_OVERVIEW.md` pour le schéma complet. Tables principales :

- `profiles` — utilisateurs (crédits, is_pro, Stripe IDs, infos perso)
- `letters` — courriers générés (type, form_data, generated_text, user_id/fingerprint)
- `promo_codes` — codes promo (crédits, max_uses, expiration, show_banner)
- `promo_redemptions` — rédemptions (user_id + code, unique)
- `page_views` — tracking pages vues (session_id, path, UTM, referrer)
- `events` — événements custom analytics

---

## Flow UX actuel

```
1. Landing → "Générer un courrier" → /generateur
2. Choix du type → /generateur/[type] → réponse aux questions
3. Clic "Générer"
   ├─ Non connecté + cookie lm_anon_used absent → génère gratuitement + cookie posé
   ├─ Non connecté + déjà utilisé → modale signup/login
   └─ Connecté :
       ├─ is_pro ou crédits > 0 → génère (crédit -1 si pas pro)
       └─ 0 crédits → redirection Stripe (1,99€ unité ou 4,99€/mois Pro)
4. /resultat → aperçu + téléchargement PDF + envoi email
```

---

## Variables d'environnement Vercel

```bash
# ✅ Toutes configurées
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_BASE_URL=https://lettre-magique.vercel.app
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ONETIME=price_...     # 1,99€ one-time
STRIPE_PRICE_SUB=price_...         # 4,99€/mois
RESEND_API_KEY=...
RESEND_FROM_EMAIL=noreply@lm-justice.com
```

---

## Métriques de succès J30

| KPI | Cible |
|-----|-------|
| Courriers générés | 200+ |
| Dont payants (1,99€) | 50+ |
| Revenus | 50€+ |
| Pages SEO en ligne | 20 |
| Indexation Google | Confirmée |
| Taux conversion form→PDF | >60% |
| Taux conversion gratuit→payant | >30% |

---

## Quick wins post-lancement

- **Reddit** : r/france, r/vosfinances — poster avec valeur d'abord
- **Groupes Facebook** : aide administrative, droits consommateurs, locataires
- **Product Hunt** : lancer une semaine après le MVP
- **TikTok** : format "j'ai récupéré 400€ grâce à ce courrier en 2 min"
- **Watermark viral** : chaque PDF contient "Créé avec LettreMagique.fr"

---

## Objectif futur — LM Mail (envoi postal automatisé)

> **LM Mail = levier business majeur.** La génération du courrier c'est 1,99 €, l'envoi via LM Mail c'est +0,50 € (ou inclus dans le plan Pro). Ça augmente l'ARPU sans friction. Et surtout, ça crée de la valeur que ChatGPT ne pourra jamais offrir.

### Pourquoi c'est stratégique

- **Moat défensif** : un LLM génère du texte, mais il n'envoie pas de courrier recommandé. LM Mail transforme LettreMagique en service complet.
- **ARPU x1.25 minimum** : chaque courrier à 1,99 € + 0,50 € d'envoi = +25% de revenu par transaction.
- **Rétention** : un utilisateur qui a envoyé un courrier via LM Mail revient pour le suivi (accusé de réception, relance).
- **Upsell naturel** : inclure LM Mail dans le plan Pro (4,99 €/mois) justifie le prix et augmente la conversion free → Pro.

### Modèle de pricing envisagé

| Offre | Génération | Envoi LM Mail |
|-------|-----------|---------------|
| Gratuit (1er courrier) | 0 € | Non disponible |
| À l'unité | 1,99 € | +0,50 € |
| Pro (4,99 €/mois) | Illimité | Inclus (5/mois) puis 0,30 € |

### Intégration technique

- API d'envoi postal (ex: Maileva, Merci Facteur API, ou La Poste API Courrier)
- Workflow : PDF généré → confirmation utilisateur → paiement → envoi API → tracking AR
- Stockage du statut d'envoi en base (`letter_send_status`: pending, sent, delivered, returned)
- Dashboard : suivi des courriers envoyés avec statut temps réel

### Priorité

- Phase 1 (maintenant) : valider le PMF avec la génération seule
- Phase 2 (après 100 utilisateurs payants) : intégrer LM Mail en beta
- Phase 3 : LM Mail devient l'argument différenciant n°1 dans le marketing

---

*Plan créé le 21 mars 2026 — MVP live — dernière mise à jour 26 mars 2026*
