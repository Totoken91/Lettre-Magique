-- LettreMagique — Migration Analytics & Funnel Tracking
-- À exécuter dans l'éditeur SQL de Supabase

-- ══════════════════════════════════════════
-- 1. Table funnel_events : tracker chaque étape du funnel
-- ══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS funnel_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT NOT NULL,
  fingerprint TEXT,
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  -- event_type values:
  --   'page_visit'        → visite d'une page
  --   'generator_click'   → clic sur "Générer"
  --   'form_started'      → formulaire commencé (1ère question remplie)
  --   'form_completed'    → formulaire complété (clic Générer)
  --   'pdf_generated'     → PDF généré avec succès
  --   'account_created'   → compte créé
  --   'upgrade_pro'       → passage Pro
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS funnel_events_session_idx ON funnel_events(session_id);
CREATE INDEX IF NOT EXISTS funnel_events_type_idx ON funnel_events(event_type);
CREATE INDEX IF NOT EXISTS funnel_events_created_idx ON funnel_events(created_at DESC);
CREATE INDEX IF NOT EXISTS funnel_events_fingerprint_idx ON funnel_events(fingerprint);

ALTER TABLE funnel_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert funnel_events" ON funnel_events FOR INSERT WITH CHECK (true);

-- ══════════════════════════════════════════
-- 2. Ajouter UTM tracking sur page_views
-- ══════════════════════════════════════════
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS referrer TEXT;

-- Index pour les requêtes par source
CREATE INDEX IF NOT EXISTS page_views_utm_source_idx ON page_views(utm_source);

-- ══════════════════════════════════════════
-- 3. Vue analytics : sources de trafic avec conversion
-- ══════════════════════════════════════════
CREATE OR REPLACE VIEW traffic_source_stats AS
SELECT
  COALESCE(pv.utm_source, 'direct') AS source,
  COALESCE(pv.utm_medium, 'none') AS medium,
  COUNT(DISTINCT pv.session_id) AS unique_visits,
  COUNT(DISTINCT l.id) AS letters_generated,
  CASE
    WHEN COUNT(DISTINCT pv.session_id) > 0
    THEN ROUND(COUNT(DISTINCT l.id)::numeric / COUNT(DISTINCT pv.session_id) * 100, 1)
    ELSE 0
  END AS conversion_rate
FROM page_views pv
LEFT JOIN letters l ON l.fingerprint = pv.session_id
WHERE pv.created_at >= NOW() - INTERVAL '7 days'
GROUP BY COALESCE(pv.utm_source, 'direct'), COALESCE(pv.utm_medium, 'none')
ORDER BY unique_visits DESC;

-- ══════════════════════════════════════════
-- 4. Vue analytics : funnel de conversion
-- ══════════════════════════════════════════
CREATE OR REPLACE VIEW funnel_stats AS
SELECT
  event_type,
  COUNT(*) AS total_events,
  COUNT(DISTINCT session_id) AS unique_sessions,
  COUNT(DISTINCT fingerprint) AS unique_users
FROM funnel_events
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY event_type
ORDER BY
  CASE event_type
    WHEN 'page_visit' THEN 1
    WHEN 'generator_click' THEN 2
    WHEN 'form_started' THEN 3
    WHEN 'form_completed' THEN 4
    WHEN 'pdf_generated' THEN 5
    WHEN 'account_created' THEN 6
    WHEN 'upgrade_pro' THEN 7
  END;

-- ══════════════════════════════════════════
-- 5. Vue rétention
-- ══════════════════════════════════════════
CREATE OR REPLACE VIEW retention_stats AS
SELECT
  user_id,
  COUNT(*) AS total_letters,
  COUNT(DISTINCT DATE_TRUNC('day', created_at)) AS active_days,
  MIN(created_at) AS first_letter,
  MAX(created_at) AS last_letter
FROM letters
WHERE user_id IS NOT NULL
GROUP BY user_id;

-- ══════════════════════════════════════════
-- 6. Table stripe_events (pour MRR et revenu)
-- ══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS stripe_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  -- event_type: 'payment_intent.succeeded', 'customer.subscription.created', etc.
  amount_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'eur',
  customer_id TEXT,
  user_id UUID REFERENCES auth.users(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS stripe_events_type_idx ON stripe_events(event_type);
CREATE INDEX IF NOT EXISTS stripe_events_created_idx ON stripe_events(created_at DESC);
CREATE INDEX IF NOT EXISTS stripe_events_user_idx ON stripe_events(user_id);

ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;
-- Pas de lecture publique — uniquement via service_role
