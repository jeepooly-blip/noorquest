-- ============================================================================
-- NoorQuest — Initial Schema (PostgreSQL / Supabase)
-- Migration: 0001_init.sql
-- ============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- Parents
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- Children (linked to parent)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  age INTEGER CHECK (age BETWEEN 4 AND 14),
  language TEXT NOT NULL DEFAULT 'en',
  pin_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_children_parent ON children(parent_id);

-- ----------------------------------------------------------------------------
-- Content modules (the canonical key for any piece of content)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS content_modules (
  id SERIAL PRIMARY KEY,
  module_key TEXT NOT NULL,
  module_type TEXT NOT NULL,                  -- 'halal' | 'haram' | 'mushbooh' | 'salah' | 'story' | 'akhlaq'
  default_language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(module_key)
);
CREATE INDEX IF NOT EXISTS idx_modules_type ON content_modules(module_type);

-- ----------------------------------------------------------------------------
-- Localized translations
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS content_translations (
  id SERIAL PRIMARY KEY,
  module_id INTEGER NOT NULL REFERENCES content_modules(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,
  title TEXT,
  body TEXT,
  audio_url TEXT,
  image_url TEXT,
  category TEXT,
  UNIQUE(module_id, language_code)
);
CREATE INDEX IF NOT EXISTS idx_translations_lang ON content_translations(language_code);

-- ----------------------------------------------------------------------------
-- Progress
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS progress (
  id SERIAL PRIMARY KEY,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  module_key TEXT NOT NULL,
  score INTEGER,
  completed_at TIMESTAMPTZ,
  data JSONB
);
CREATE INDEX IF NOT EXISTS idx_progress_child ON progress(child_id);

-- ----------------------------------------------------------------------------
-- Badges
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS badges (
  id SERIAL PRIMARY KEY,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(child_id, badge_type)
);

-- ----------------------------------------------------------------------------
-- Noor Tree state
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS noor_tree (
  child_id UUID PRIMARY KEY REFERENCES children(id) ON DELETE CASCADE,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  fruits INTEGER NOT NULL DEFAULT 0,
  last_activity TIMESTAMPTZ
);

-- ----------------------------------------------------------------------------
-- Community Gallery (moderated)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption_sticker TEXT,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  approved_by UUID REFERENCES parents(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_gallery_approved ON gallery_items(approved, created_at DESC);

-- ----------------------------------------------------------------------------
-- Pen Pals (sticker only, no free text)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pen_pal_stickers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_child UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  to_child UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  sticker_key TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_penpals_to ON pen_pal_stickers(to_child, approved);

-- ----------------------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------------------
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE noor_tree ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pen_pal_stickers ENABLE ROW LEVEL SECURITY;

-- Policy helper: parent's user_id is in auth.uid()
-- Children are visible only to their parent.
CREATE POLICY "parents can view their own children"
  ON children FOR SELECT
  USING (parent_id = auth.uid());

CREATE POLICY "parents can update their own children"
  ON children FOR UPDATE
  USING (parent_id = auth.uid());

CREATE POLICY "parents can view their children's progress"
  ON progress FOR SELECT
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "parents can view their children's badges"
  ON badges FOR SELECT
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "parents can view their children's noor_tree"
  ON noor_tree FOR SELECT
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

-- Gallery: anyone authenticated can read approved items; only owner can insert.
CREATE POLICY "approved gallery items are public"
  ON gallery_items FOR SELECT
  TO authenticated
  USING (approved = true);

CREATE POLICY "children can submit their own gallery items"
  ON gallery_items FOR INSERT
  TO authenticated
  WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "parents can approve their children's gallery items"
  ON gallery_items FOR UPDATE
  USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

-- Pen pals: only sticker-sent, no free text. Approve before display.
CREATE POLICY "approved pen pals are visible to participants"
  ON pen_pal_stickers FOR SELECT
  TO authenticated
  USING (approved = true);

CREATE POLICY "children can send pen pal stickers"
  ON pen_pal_stickers FOR INSERT
  TO authenticated
  WITH CHECK (from_child IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "parents can approve their children's pen pals"
  ON pen_pal_stickers FOR UPDATE
  USING (to_child IN (SELECT id FROM children WHERE parent_id = auth.uid()));

-- ----------------------------------------------------------------------------
-- Triggers
-- ----------------------------------------------------------------------------
-- Auto-create noor_tree row when a child is created
CREATE OR REPLACE FUNCTION create_noor_tree_for_child()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO noor_tree (child_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_create_noor_tree ON children;
CREATE TRIGGER trg_create_noor_tree
  AFTER INSERT ON children
  FOR EACH ROW
  EXECUTE FUNCTION create_noor_tree_for_child();

-- Update last_activity on progress
CREATE OR REPLACE FUNCTION touch_noor_tree()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE noor_tree SET last_activity = NOW() WHERE child_id = NEW.child_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_touch_noor_tree ON progress;
CREATE TRIGGER trg_touch_noor_tree
  AFTER INSERT ON progress
  FOR EACH ROW
  EXECUTE FUNCTION touch_noor_tree();
