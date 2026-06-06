-- ============================================================================
-- NoorQuest — Seed Data (dev only)
-- ============================================================================

-- Sample content modules: 20 halal + 10 haram + 5 mushbooh
INSERT INTO content_modules (module_key, module_type) VALUES
  ('halal_apple', 'halal'),
  ('halal_banana', 'halal'),
  ('halal_dates', 'halal'),
  ('halal_grapes', 'halal'),
  ('halal_honey', 'halal'),
  ('halal_milk', 'halal'),
  ('halal_bread', 'halal'),
  ('halal_rice', 'halal'),
  ('halal_chicken', 'halal'),
  ('halal_fish', 'halal'),
  ('halal_olives', 'halal'),
  ('halal_cheese', 'halal'),
  ('halal_yogurt', 'halal'),
  ('halal_carrot', 'halal'),
  ('haram_pork', 'haram'),
  ('haram_bacon', 'haram'),
  ('haram_ham', 'haram'),
  ('haram_wine', 'haram'),
  ('mushbooh_gummy', 'mushbooh'),
  ('mushbooh_cheese_unknown', 'mushbooh')
ON CONFLICT (module_key) DO NOTHING;

-- Sample EN translations (subset)
INSERT INTO content_translations (module_id, language_code, title, body, category)
SELECT id, 'en', initcap(replace(module_key, '_', ' ')),
  CASE module_type
    WHEN 'halal' THEN 'This is Halal and good for us.'
    WHEN 'haram' THEN 'This is not for us. We pick something else.'
    WHEN 'mushbooh' THEN 'Let''s ask Mom or Dad!'
  END,
  module_type
FROM content_modules
WHERE id <= 20
ON CONFLICT DO NOTHING;
