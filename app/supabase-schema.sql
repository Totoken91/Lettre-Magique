-- LettreMagique — Schéma Supabase
-- À exécuter dans l'éditeur SQL de ton projet Supabase

-- Table des courriers générés
CREATE TABLE IF NOT EXISTS letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT NOT NULL,
  type_name TEXT,
  form_data JSONB,
  generated_text TEXT,
  sender_name TEXT,
  fingerprint TEXT,
  paid BOOLEAN DEFAULT false,
  stripe_session_id TEXT,
  email TEXT,
  user_id UUID REFERENCES auth.users(id)
);

-- Table des profils utilisateurs (statut pro)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_pro BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Trigger : créer le profil automatiquement à l'inscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Créer le profil pour les utilisateurs déjà existants
INSERT INTO profiles (id)
SELECT id FROM auth.users
ON CONFLICT DO NOTHING;

-- Table pour suivre les utilisations gratuites (par fingerprint)
CREATE TABLE IF NOT EXISTS free_uses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint TEXT UNIQUE NOT NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  letter_type TEXT
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS letters_fingerprint_idx ON letters(fingerprint);
CREATE INDEX IF NOT EXISTS letters_created_at_idx ON letters(created_at DESC);
CREATE INDEX IF NOT EXISTS letters_type_idx ON letters(type);

-- Row Level Security (RLS)
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_uses ENABLE ROW LEVEL SECURITY;

-- Politique : lecture publique des lettres (par fingerprint uniquement)
CREATE POLICY "Allow insert letters" ON letters
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select own letters" ON letters
  FOR SELECT USING (true);

-- Politique pour free_uses
CREATE POLICY "Allow insert free_uses" ON free_uses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select free_uses" ON free_uses
  FOR SELECT USING (true);

-- Vue analytics (pour le dashboard interne)
CREATE VIEW letter_stats AS
SELECT
  type,
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE paid = true) AS paid_count,
  COUNT(*) FILTER (WHERE paid = false) AS free_count,
  DATE_TRUNC('day', created_at) AS day
FROM letters
GROUP BY type, DATE_TRUNC('day', created_at)
ORDER BY day DESC;
