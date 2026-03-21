# LettreMagique — Plan d'attaque

> Stack : Next.js 14 (App Router) · Tailwind CSS · shadcn/ui · Supabase · Stripe · API Claude (Haiku) · pdf-lib · Vercel

---

## 0. Design System à reproduire

### Palette (CSS vars → Tailwind config)
```
--ink:     #0d0d0d   → bg-ink
--paper:   #f5f0e8   → bg-paper
--paper2:  #ede8dc   → bg-paper2
--accent:  #c84b2f   → text-accent / bg-accent
--accent2: #2d6a4f   → text-green
--accent3: #e9c46a   → text-gold
--muted:   #7a7468   → text-muted
--white:   #fdfaf4   → bg-white-warm
--rule:    #c8c0b0   → border-rule
```

### Typographie (Google Fonts)
- **Syne** 800 → titres, logo, boutons, stats
- **DM Mono** 300/400/500 → labels uppercase, tags, code, nav-links
- **Lora** italic → corps de texte, pull quotes

### Motifs UI récurrents
- Nav sombre avec `border-bottom: 3px solid #c84b2f`
- Hero dark bg + grand texte fantôme derrière (opacity 0.04)
- Texture noise SVG en `position:fixed` z-index élevé
- Sections alternées `bg-paper` / `bg-white-warm`
- `section-header` = numéro DM Mono accent + titre Syne 800
- Pull quote = `border-left: 4px solid accent` + fond paper2
- Callout = `border: 2px solid ink` + label `::before` flottant
- Métriques = grille tight avec `border: 2px solid ink`
- Bouton primary = fond accent, uppercase Syne, hover translateY(-2px) + box-shadow
- Bouton ghost = border #333, hover border #666

---

## 1. Structure du projet

```
lettremagique/
├── app/
│   ├── layout.tsx              # Noise texture, fonts, nav globale
│   ├── page.tsx                # Landing page (= lettremagique-landing.html)
│   ├── generateur/
│   │   └── [type]/
│   │       └── page.tsx        # Formulaire dynamique par type
│   ├── resultat/
│   │   └── page.tsx            # Aperçu courrier + téléchargement PDF
│   ├── paiement/
│   │   ├── success/page.tsx    # Post-Stripe success
│   │   └── cancel/page.tsx
│   ├── lettre/
│   │   └── [slug]/
│   │       └── page.tsx        # Pages SEO long-tail (statiques)
│   └── api/
│       ├── generer/route.ts    # POST → appel Claude API
│       ├── pdf/route.ts        # POST → génération PDF
│       ├── stripe/
│       │   ├── checkout/route.ts
│       │   └── webhook/route.ts
│       └── free-check/route.ts # Vérifier si 1er courrier dispo
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── CatGrid.tsx         # Grille 5 catégories
│   │   ├── HowItWorks.tsx      # Steps 1-2-3
│   │   ├── PricingSection.tsx
│   │   └── SeoExamples.tsx
│   ├── generateur/
│   │   ├── TypeSelector.tsx    # Sélecteur 10 types de courriers
│   │   ├── DynamicForm.tsx     # Formulaire contextuel
│   │   └── LetterPreview.tsx   # Aperçu avant paiement
│   └── seo/
│       └── SeoPageTemplate.tsx # Template réutilisable pages long-tail
├── lib/
│   ├── prompts/                # Prompts Claude par type
│   │   ├── index.ts
│   │   ├── resiliation.ts
│   │   ├── reclamation.ts
│   │   ├── mise-en-demeure.ts
│   │   └── ... (10 types)
│   ├── pdf/
│   │   └── generator.ts        # pdf-lib : mise en page professionnelle
│   ├── stripe/
│   │   └── client.ts
│   ├── supabase/
│   │   └── client.ts
│   └── free-letter/
│       └── check.ts            # Logique cookie/fingerprint 1er gratuit
├── data/
│   ├── letter-types.ts         # Config des 10 types (questions, prompts, slugs)
│   └── seo-pages.ts            # Config des 200 pages SEO (slug, marque, type)
└── public/
    └── fonts/
```

---

## 2. Jour 1 — Fondations + Formulaire

### Setup initial
```bash
npx create-next-app@latest lettremagique --typescript --tailwind --app
npx shadcn@latest init
npm install @supabase/supabase-js @supabase/ssr
```

### Tailwind config (`tailwind.config.ts`)
```ts
extend: {
  colors: {
    ink: '#0d0d0d',
    paper: '#f5f0e8',
    paper2: '#ede8dc',
    accent: '#c84b2f',
    'accent-hover': '#b5422a',
    green: '#2d6a4f',
    gold: '#e9c46a',
    muted: '#7a7468',
    rule: '#c8c0b0',
    'white-warm': '#fdfaf4',
  },
  fontFamily: {
    syne: ['Syne', 'sans-serif'],
    mono: ['DM Mono', 'monospace'],
    lora: ['Lora', 'Georgia', 'serif'],
  },
}
```

### Les 10 types de courriers (`data/letter-types.ts`)
```ts
export const LETTER_TYPES = [
  {
    id: 'resiliation',
    emoji: '✉️',
    name: 'Résiliation',
    desc: 'Opérateur, abonnement, assurance',
    questions: [
      { id: 'destinataire', label: 'Société ou organisme ?', type: 'text', placeholder: 'Ex: Free Mobile, Orange...' },
      { id: 'type_contrat', label: 'Type de contrat / abonnement ?', type: 'text' },
      { id: 'motif', label: 'Motif de résiliation (optionnel)', type: 'textarea' },
      { id: 'date_souhaitee', label: 'Date de résiliation souhaitée ?', type: 'date' },
    ],
    mentions: ['loi_chatel', 'loi_hamon', 'preavis'],
  },
  {
    id: 'reclamation',
    emoji: '⚡',
    name: 'Réclamation',
    desc: 'Facture, produit défectueux, service',
    questions: [...],
    mentions: ['garantie_legale'],
  },
  {
    id: 'mise-en-demeure',
    emoji: '⚖️',
    name: 'Mise en demeure',
    desc: 'Dette, remboursement, non-respect',
    questions: [...],
    mentions: ['ar_recommande'],
  },
  // ... 7 autres
]
```

### Supabase : table `letters`
```sql
CREATE TABLE letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT NOT NULL,
  form_data JSONB,
  generated_text TEXT,
  fingerprint TEXT,       -- pour la logique 1er gratuit
  paid BOOLEAN DEFAULT false,
  stripe_session_id TEXT,
  email TEXT
);
```

---

## 3. Jour 2 — Génération IA + PDF

### Appel API Claude (`app/api/generer/route.ts`)
```ts
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: Request) {
  const { type, formData } = await req.json()
  const prompt = buildPrompt(type, formData)  // voir lib/prompts/

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',  // ~0.01€/appel
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  return Response.json({ text: message.content[0].text })
}
```

### Structure d'un prompt (`lib/prompts/resiliation.ts`)
```ts
export function buildResiliationPrompt(data: FormData): string {
  return `Tu es un expert en courriers administratifs français.
Génère une lettre de résiliation professionnelle et juridiquement correcte.

DESTINATAIRE: ${data.destinataire}
TYPE DE CONTRAT: ${data.type_contrat}
MOTIF: ${data.motif || 'sans motif précisé'}
DATE SOUHAITÉE: ${data.date_souhaitee}

Règles OBLIGATOIRES:
- Mention de la loi Chatel/Hamon si applicable
- Préavis légal mentionné
- Formule de politesse standard
- Format : Expéditeur / Date / Destinataire / Objet / Corps / Signature
- Ton : formel, direct, sans agressivité
- Longueur : 150-250 mots maximum
- PAS de crochets ou placeholders dans le résultat final

Génère UNIQUEMENT la lettre, sans explication ni commentaire.`
}
```

### Génération PDF (`lib/pdf/generator.ts`)
```ts
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function generateLetterPDF(params: {
  letterText: string
  senderName: string
  senderAddress: string
  date: string
  type: string
}): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842])  // A4
  const { width, height } = page.getSize()

  // En-tête LettreMagique (discret)
  // Corps de la lettre avec marges standards (2.5cm)
  // Pied de page : disclaimer + "Créé avec LettreMagique.fr"
  // Mentions légales si applicables

  return await pdfDoc.save()
}
```

**Important pour le PDF :**
- Marges : 2.5cm tous côtés (standard courrier FR)
- Police : Helvetica ou Times (embarquées pdf-lib)
- Pied de page : `« Cet outil est une aide à la rédaction et ne constitue pas un conseil juridique. »`
- Footer discret : `Créé avec LettreMagique.fr` (watermark viral)

---

## 4. Jour 3 — Paiement + Freemium

### Logique 1er courrier gratuit (`lib/free-letter/check.ts`)
```ts
// Stratégie : cookie + fingerprint (IP + user-agent hash)
// Supabase : table `free_uses` (fingerprint, used_at)
// Fallback cookie si pas de DB

export async function hasUsedFreeLetter(fingerprint: string): Promise<boolean> {
  const { data } = await supabase
    .from('free_uses')
    .select('id')
    .eq('fingerprint', fingerprint)
    .single()
  return !!data
}
```

### Table Supabase `free_uses`
```sql
CREATE TABLE free_uses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint TEXT UNIQUE NOT NULL,
  used_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Stripe (`app/api/stripe/checkout/route.ts`)
```ts
// One-time : 1,99€
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{ price: process.env.STRIPE_PRICE_ONETIME, quantity: 1 }],
  success_url: `${origin}/paiement/success?session_id={CHECKOUT_SESSION_ID}&letter_id=${letterId}`,
  cancel_url: `${origin}/paiement/cancel`,
  metadata: { letter_id: letterId },
})

// Abonnement : 4,99€/mois
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [{ price: process.env.STRIPE_PRICE_SUB, quantity: 1 }],
  ...
})
```

### Webhook Stripe (`app/api/stripe/webhook/route.ts`)
- Écouter `checkout.session.completed`
- Marquer `letters.paid = true` dans Supabase
- Déclencher la génération PDF et envoyer le lien de téléchargement

### Flux UX complet
```
1. Utilisateur remplit le formulaire
2. Claude génère le courrier (aperçu masqué / flou)
3. Vérification fingerprint → gratuit ou payant ?
   - Gratuit : téléchargement direct + enregistrement fingerprint
   - Payant : Stripe Checkout → success → PDF disponible
```

---

## 5. Jour 4 — Pages SEO Long-tail

### Route dynamique (`app/lettre/[slug]/page.tsx`)
```ts
// generateStaticParams() → Next.js génère les pages au build
export async function generateStaticParams() {
  return SEO_PAGES.map(p => ({ slug: p.slug }))
}

// generateMetadata() → SEO optimisé par page
export async function generateMetadata({ params }) {
  const page = SEO_PAGES.find(p => p.slug === params.slug)
  return {
    title: `${page.h1} — Modèle 2026 | LettreMagique`,
    description: page.metaDescription,
  }
}
```

### Config pages SEO (`data/seo-pages.ts`)
```ts
export const SEO_PAGES = [
  {
    slug: 'lettre-resiliation-free-mobile',
    type: 'resiliation',
    marque: 'Free Mobile',
    h1: 'Lettre de résiliation Free Mobile',
    keyword: 'lettre résiliation free mobile',
    volume: 2000,
    context: `Free Mobile est soumis à la loi Chatel...`,
    faq: [
      { q: 'Quel est le préavis pour résilier Free Mobile ?', a: '...' },
      { q: 'Où envoyer ma lettre de résiliation Free ?', a: '...' },
    ],
    metaDescription: 'Générez votre lettre de résiliation Free Mobile en 2 minutes. Modèle 2026 personnalisé, export PDF, mentions légales incluses.',
  },
  // ... 19 autres pages prioritaires
]
```

### Structure de chaque page SEO
1. **H1** ciblé sur le mot-clé
2. Contexte 200 mots (conditions légales, adresse, préavis...)
3. **CTA prominent** → formulaire pré-rempli avec le type + la marque
4. **FAQ** avec Schema.org markup (rich snippets Google)
5. Méta description optimisée CTR

### Schema.org (`HowTo` + `FAQPage`)
```ts
const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": page.faq.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
}
```

---

## 6. Jour 5 — Tests + Lancement

### Checklist end-to-end
- [ ] Formulaire → génération Claude → aperçu ✓
- [ ] 1er courrier gratuit → PDF direct ✓
- [ ] 2ème courrier → Stripe → paiement → PDF ✓
- [ ] Abonnement → accès illimité ✓
- [ ] 5 pages SEO générées et indexables ✓
- [ ] Sitemap.xml généré automatiquement ✓
- [ ] robots.txt correct ✓
- [ ] Core Web Vitals verts ✓
- [ ] Mobile responsive ✓

### Sitemap (`app/sitemap.ts`)
```ts
export default function sitemap(): MetadataRoute.Sitemap {
  const seoPages = SEO_PAGES.map(p => ({
    url: `https://lettremagique.fr/lettre/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  return [
    { url: 'https://lettremagique.fr', priority: 1.0 },
    ...seoPages,
  ]
}
```

---

## 7. Variables d'environnement (`.env.local`)

```bash
# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ONETIME=price_...     # 1,99€ one-time
STRIPE_PRICE_SUB=price_...         # 4,99€/mois

# App
NEXT_PUBLIC_BASE_URL=https://lettremagique.fr
```

---

## 8. Ordre de priorité des 10 types de courriers

| Priorité | Type | Exemples populaires |
|----------|------|---------------------|
| 1 | Résiliation | Free, SFR, Orange, salle de sport, mutuelle |
| 2 | Réclamation | EDF, Amazon, banque, assurance |
| 3 | Mise en demeure | Remboursement, travaux, loyer |
| 4 | Contestation | Amende SNCF, PV voiture, facture |
| 5 | Congé locataire | Préavis 1 mois / 3 mois |
| 6 | Remboursement | Trop-perçu, garantie, retard livraison |
| 7 | Rétractation | Achat en ligne, démarchage |
| 8 | Délai de paiement | Dette, créancier |
| 9 | Attestation | Sur l'honneur, domiciliation |
| 10 | Courrier libre | Tout autre besoin |

---

## 9. Métriques de succès J30

| KPI | Cible |
|-----|-------|
| Courriers générés | 200+ |
| Dont payants (1,99€) | 50+ |
| Revenus | 50€+ |
| Pages SEO en ligne | 40 |
| Indexation Google | Confirmée |
| Vidéos TikTok/Reels | 3 |
| Taux conversion form→PDF | >60% |
| Taux conversion gratuit→payant | >30% |

---

## 10. Quick wins post-lancement

- **Reddit** : r/france, r/vosfinances — poster avec valeur d'abord
- **Groupes Facebook** : aide administrative, droits consommateurs, locataires
- **Product Hunt** : lancer une semaine après le MVP
- **TikTok** : format "j'ai récupéré 400€ grâce à ce courrier en 2 min"
- **Watermark viral** : chaque PDF contient "Créé avec LettreMagique.fr"

---

*Plan rédigé le 21 mars 2026 — MVP 5 jours visé*
