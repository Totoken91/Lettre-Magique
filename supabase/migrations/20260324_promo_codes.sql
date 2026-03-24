-- Promo codes table
CREATE TABLE IF NOT EXISTS promo_codes (
  code        TEXT PRIMARY KEY,
  credits     INTEGER NOT NULL DEFAULT 1,
  max_uses    INTEGER,               -- NULL = illimité
  used_count  INTEGER NOT NULL DEFAULT 0,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Track qui a utilisé quel code (1 utilisation par user par code)
CREATE TABLE IF NOT EXISTS promo_redemptions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code         TEXT NOT NULL REFERENCES promo_codes(code),
  redeemed_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, code)
);

-- RLS
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_redemptions ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leurs propres rédemptions
CREATE POLICY "Users can view own redemptions" ON promo_redemptions
  FOR SELECT USING (auth.uid() = user_id);

-- Seed: code PROMO! → 5 crédits, max 1000 utilisations
INSERT INTO promo_codes (code, credits, max_uses, active)
VALUES ('PROMO!', 5, 1000, true)
ON CONFLICT (code) DO NOTHING;
