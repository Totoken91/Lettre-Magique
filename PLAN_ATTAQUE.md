# LettreMagique — Plan d'attaque

> Stack : Next.js 16 (App Router) · Tailwind CSS 4 · shadcn/ui · Supabase · Stripe · API Claude (Haiku) · pdf-lib · Vercel
> *Dernière mise à jour : 22 mars 2026*

---

## État d'avancement

### ✅ FAIT

| Élément | Détail |
|---------|--------|
| Setup Next.js 16 + Tailwind 4 + shadcn | Stack complète opérationnelle |
| Design system | Palette, typo (Syne/DM Mono/Lora), CSS vars, composants |
| Landing page | Hero, catégories, comment ça marche, exemples, tarifs, CTA |
| Générateur formulaire | 10 types de courriers, questions dynamiques, DynamicForm |
| API génération Claude | `POST /api/generer` → claude-haiku-4-5-20251001 |
| Génération PDF | pdf-lib, format A4, header/footer LettreMagique, multi-page |
| Page résultat | Aperçu + bouton téléchargement PDF |
| Auth Supabase | Signup/login pages + **modale inline au moment de générer** |
| Middleware session | Refresh session Supabase sur /generateur |
| Fix page blanche | ScrollReveal `.js-ready` (opacity:0 only si JS actif) + fallback 2s |
| Deploy Vercel | lettre-magique.vercel.app ✓ |
| Navbar auth | NavAuth client : email + déconnexion si connecté, sinon login/signup |

---

### 🔲 RESTE À FAIRE — Par priorité

#### PRIORITÉ 1 — Monétisation (bloquant revenue)

- [ ] **Supabase : créer les tables** `letters` + `free_uses` (SQL ci-dessous)
- [ ] **Logique 1er courrier gratuit** : vérifier via `user_id` en Supabase si déjà utilisé
- [ ] **Stripe checkout** : `POST /api/stripe/checkout` → session paiement 1,99€
- [ ] **Stripe webhook** : `POST /api/stripe/webhook` → marquer `paid = true` dans Supabase
- [ ] **Pages paiement** : `/paiement/success` et `/paiement/cancel`
- [ ] **Flow UX complet** : générer → gratuit ou Stripe selon `free_uses`

#### PRIORITÉ 2 — SEO (traffic organique)

- [ ] **Pages SEO long-tail** : `/lettre/[slug]` avec `generateStaticParams`
- [ ] **Data SEO** : `data/seo-pages.ts` avec 20 pages prioritaires (résiliation Free, SFR, EDF...)
- [ ] **Schema.org** : FAQPage + HowTo sur chaque page SEO
- [ ] **Sitemap.xml** : `app/sitemap.ts` avec toutes les URLs
- [ ] **robots.txt** : `app/robots.ts`

#### PRIORITÉ 3 — Compte utilisateur

- [ ] **Dashboard `/compte`** : historique des courriers générés (depuis Supabase)
- [ ] **Sauvegarde courriers** : stocker le texte généré dans `letters` table liée au `user_id`
- [ ] **Abonnement Stripe** : plan 4,99€/mois, vérification statut dans le flow

#### PRIORITÉ 4 — Croissance

- [ ] **Watermark PDF** : "Créé avec LettreMagique.fr" (viral)
- [ ] **Core Web Vitals** : audit Lighthouse, optimisation images/fonts
- [ ] **Mobile responsive** : vérifier tous les breakpoints
- [ ] **Mentions légales / CGU** : pages `/cgu` et `/confidentialite`

---

## Tables Supabase à créer

```sql
-- Courriers générés (liés au user Supabase Auth)
CREATE TABLE letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL,
  form_data JSONB,
  generated_text TEXT,
  paid BOOLEAN DEFAULT false,
  stripe_session_id TEXT
);

-- Tracking 1er courrier gratuit par user
CREATE TABLE free_uses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  used_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_uses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own letters" ON letters
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users see own free_use" ON free_uses
  FOR ALL USING (auth.uid() = user_id);
```

---

## Flow UX cible (avec paiement)

```
1. Landing → "Essayer gratuitement" → /generateur
2. Formulaire (libre, sans connexion)
3. Clic "Générer mon courrier"
   ├─ Non connecté → modale signup/login → retour étape 3
   └─ Connecté :
       ├─ Jamais utilisé le gratuit → génère + sauvegarde free_use → PDF direct
       └─ Déjà utilisé → Stripe Checkout 1,99€ → webhook → PDF
4. /resultat → aperçu + téléchargement PDF
```

---

## Variables d'environnement Vercel

```bash
# ✅ Configurées
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_BASE_URL=https://lettre-magique.vercel.app

# 🔲 À configurer (pour le paiement)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ONETIME=price_...     # 1,99€ one-time
STRIPE_PRICE_SUB=price_...         # 4,99€/mois
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

*Plan créé le 21 mars 2026 — MVP en cours — dernière mise à jour 22 mars 2026*
