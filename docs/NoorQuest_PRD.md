# NoorQuest — Product Requirements Document (PRD)

**Version:** 3.0 (Canonical)  
**Date:** June 2026  
**Product Name:** NoorQuest  
**Tagline:** Bright Adventures in Faith for Little Hearts  
**License:** All rights reserved

---

## 1. Executive Summary

NoorQuest is a safe, joyful, interactive web platform that teaches the basics of Islam to children aged **6–9** (with strong parental support) in non-Muslim majority countries. It focuses on practical, age-appropriate concepts: **Halal/Haram** (especially food), **Salah**, **good character (Akhlaq)**, and **positive Muslim identity**.

**Core Value Proposition**  
A dual-audience (child + parent) gamified experience that makes Islamic education fun, localized, and culturally adaptive — bridging digital learning with real-world application.

**Goals**
- Build confidence and identity for Muslim minority children.
- Empower parents with tools, resources, and conversation starters.
- Foster a safe global community.
- Achieve high engagement through play.

**Key Differentiators**  
Positive framing, strong gamification, multi-language localization, safety-first community, scholar-reviewed content.

**Business Goals**
- High child engagement and retention.
- Freemium model (core free; premium $4.99–$7.99/mo).
- B2B white-label for mosques/Islamic schools.
- Optional Waqf/donation pathway for free access.

---

## 2. Target Audience & Localization

### 2.1 Primary Users — Children (6–9 years)
- Non-Arabic speakers in diaspora / minority settings (Europe, North America, etc.).
- Short attention spans (5–15 min sessions), visual learners, love games and stories.
- Needs: simple language, bright visuals, immediate feedback, rewards, diverse characters.

**Persona: Aisha (7, Lyon, France)**
- Loves drawing and animals. Struggles with school lunch choices and being the only Muslim in class. Parents want an easy, gentle way to explain faith choices.

### 2.2 Secondary Users — Parents
- Busy Muslim parents supplementing home education.
- Need: progress tracking, discussion guides, printable resources, school-advocacy tips, halal-living advice for minority contexts.

**Persona: Ahmed's Dad (Karachi-born, Berlin resident)**
- Tech-savvy, wants a clean dashboard, weekly email digests, printable activities, and scholar-backed answers.

### 2.3 Localization Strategy

| Phase | Languages |
|---|---|
| **Phase 1 (MVP)** | English, French, **Arabic (RTL)**, Indonesian/Malay |
| **Phase 2** | Spanish, German, Russian |
| **Phase 3** | Urdu, Turkish, Chinese, others |

**Requirements:** dynamic LTR/RTL, text expansion handling, cultural food databases, native voiceovers, region-specific visuals, halal-certification examples per locale.

---

## 3. Design Philosophy & Visual Identity

### 3.1 Kids Mode
- Bright, rounded 2D vector illustrations in **PBS Kids / Toca Boca / Duolingo** style.
- **Color palette:** sky blue, sunshine yellow, sage green, soft cream.
- **Typography:** rounded sans-serif (e.g., Nunito, Quicksand). Large sizes (>18 px body).
- **Mascot:** **Lumi the Lantern** — a friendly, glowing paper-lantern character that guides the child. See `lumi-mascot.md`.

### 3.2 Parent Mode
- Clean, calming, professional. **Teal + warm neutrals.**
- Dashboard cards, simple bar/line charts, content library grid.

### 3.3 Accessibility (WCAG 2.1 AA target)
- Touch targets ≥ 48 px.
- Voice-over narration for all interactive elements.
- High-contrast mode, color-blind palette.
- Reduced-motion preference respected.
- RTL full support.
- PWA offline mode.

---

## 4. User Journeys

### 4.1 Child Journey
1. Open app → visual avatar login (4 large pictures, no typing).
2. Enter **World Map** (NoorQuest Garden).
3. Choose a zone: **Market** (Halal), **Oasis** (Salah), **Grove** (Stories), **Meadow** (Character), **Tree** (Rewards).
4. Complete activity → earn XP, badge, Noor Tree fruit.
5. Optional: share a drawing to the **Noor Gallery** (parent must approve first).

### 4.2 Parent Journey
1. **Parent Gate** (math challenge or PIN) → Parent Portal.
2. View dashboard: per-child progress, time spent, badges earned.
3. Open **Resource Library** → download a printable / read an article.
4. **Approve / decline** community posts and pen-pal stickers.
5. **Weekly Insights** email / PDF digest.

---

## 5. Key Features

### 5.1 Kids Mode — Core Playground

#### 5.1.1 World Map / Garden Hub
- Central navigation with progress visualization. The **Noor Tree** grows with completed deeds.
- Clickable regions unlock as the child progresses.

#### 5.1.2 Halal Market Adventure *(Core Focus)*
- **Halal Scanner** — drag-and-drop food items onto a virtual scanner; Lumi reacts with positive feedback (green confetti) for Halal, gentle redirect for Haram, "ask Mom/Dad" for Mushbooh.
- **Chef Lumi's Kitchen** — combine halal ingredients into simple, region-appropriate recipes.
- **Regional item database** — different foods shown per locale (e.g., croissant in France, croissant-less for Muslim kids; dates and olives as cross-cultural anchors).

#### 5.1.3 Salah Station
- **Wudu steps** — drag soap, hear water sounds, animated checklist.
- **Prayer Mat** — step-through positions (Qiyam, Ruku, Sujud, Tashahhud) with audio + visual guides, click-to-advance for younger kids.

#### 5.1.4 Story Grove
- Animated short stories of Prophets and righteous companions.
- **Karaoke-style** read-aloud with highlighted words.
- **Interactive questions** after each story ("What would you do?").
- **Moral lesson** card with one actionable takeaway.

#### 5.1.5 Noor Tree (Gamification Hub)
- Animated tree that grows leaves, fruits, and flowers as activities are completed.
- **Badges** (Halal Hero, Wudu Star, Story Listener, Kind Heart, etc.).
- **Avatar customization** — clothing, lantern color, pet companion.

#### 5.1.6 Daily Noor Quest
- Quick daily routine: 1 good deed, 1 verse, 1 dua.
- Streak counter, gentle reminders.

#### 5.1.7 Virtual Masjid *(Phase 2)* — calming space for du'a and emotional check-ins.

### 5.2 Parent Portal

- **Dashboard:** per-child cards, weekly progress, time spent, badges.
- **Resource Library:** articles, PDFs, printables, school-advocacy toolkits.
- **Co-play Mode:** joint parent-child activities.
- **Expert Q&A:** moderated Islamic guidance (scholar-reviewed answers only).
- **Weekly Insights:** email / PDF digest.
- **Discussion prompts** for dinner table or car rides.

### 5.3 Community (Safe, Moderated)

- **Global Noor Gallery** — moderated children's art sharing (parent approval required).
- **Sticker Pen Pals** — pre-approved sticker messages, **no free text** (child-safety).
- **Family Circles** — invite grandparents/cousins; private space.
- **Seasonal Events** — Ramadan tracker, Eid celebration packs.
- **Safety:** COPPA / GDPR-K compliant, no DMs, parent approval for any upload.

### 5.4 Expanded Services & Business Model

**Freemium**
- **Free tier:** core modules (Halal Scanner, Salah, Stories), 1 language, basic Parent Dashboard.
- **Premium ($4.99–$7.99/mo):** all languages, unlimited content, AR features, ad-free, personalized learning paths.

**Additional revenue**
- B2B white-label for mosques / Islamic schools.
- Ethical affiliate partnerships with halal brands.
- Waqf / donation model.
- Merchandise tie-ins (plush Lumi, etc.).

**Future feature ideas**
- AR supermarket scanner (point phone at product).
- AI voice recitation practice (with parent-set boundaries).
- Creator program for older kids (10+).

---

## 6. UI / UX Mockup Descriptions

### 6.1 Landing Page
- **Hero:** animated Lumi waving, split buttons "I'm a Kid" / "I'm a Parent".
- **Featured activities carousel.**
- **Language switcher** (EN / FR / AR / ID).
- **Footer:** illustrated testimonials, safety statement, scholar review logos.

### 6.2 Kids Dashboard
- **Background:** soft gradient sky with floating clouds.
- **Top bar:** avatar, Noor Tree progress %, language flag.
- **Center:** isometric 2D world map with hover-to-zoom zones.
- **Bottom nav:** Home, Achievements, Friends (limited).

### 6.3 Halal Scanner Screen
- **Left:** grocery shelf with draggable food icons.
- **Center:** large scanner with animated beam.
- **Right:** score panel + Lumi speech bubble.
- **Animations:** item glows green / red, confetti on streak.

### 6.4 Salah Mat Screen
- **Top-down** prayer mat with character in center.
- **Sequential steps** with checkmarks and audio.
- **Reset / Replay** controls.

### 6.5 Parent Dashboard
- **Sidebar** navigation.
- **Main area:** child cards with progress charts, resource library grid, recent activity feed.

*(Interactive HTML prototypes for all the above are in `/prototypes/`.)*

---

## 7. Technical Architecture

### 7.1 Stack

| Layer | Technology |
|---|---|
| Frontend framework | **Next.js 14+** (App Router) + React 18 + TypeScript |
| Styling | **Tailwind CSS** + shadcn/ui primitives |
| Animations | **Framer Motion** |
| i18n | **next-intl** (EN, FR, AR-RTL, ID) |
| State | **Zustand** (lightweight) |
| Auth | **Supabase Auth** (email + magic link for parents; avatar PIN for kids) |
| Database | **PostgreSQL** (via Supabase) |
| CMS | **Strapi** (self-hosted) for content, audio, lessons, multi-language fields |
| Storage | **Cloudinary** for media (illustrations, audio, animations) |
| PWA | Custom service worker (next-pwa) |
| CI | GitHub Actions (typecheck + lint + build) |
| Deploy | Vercel (app) + Railway/Fly.io (Strapi) + Supabase Cloud |

### 7.2 Database Schema (PostgreSQL)

```sql
-- Users & Profiles
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  age INTEGER CHECK (age BETWEEN 4 AND 14),
  language TEXT DEFAULT 'en',
  pin_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content (Multi-language)
CREATE TABLE content_modules (
  id SERIAL PRIMARY KEY,
  module_key TEXT NOT NULL,        -- e.g., 'halal_item_apple'
  module_type TEXT NOT NULL,       -- 'halal', 'haram', 'mushbooh', 'salah', 'story', 'akhlaq'
  default_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_module_key ON content_modules(module_key);

CREATE TABLE content_translations (
  id SERIAL PRIMARY KEY,
  module_id INT REFERENCES content_modules(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,     -- 'en', 'fr', 'ar', 'id'
  title TEXT,
  body TEXT,
  audio_url TEXT,
  image_url TEXT,
  category TEXT,                   -- 'halal', 'haram', 'mushbooh'
  UNIQUE(module_id, language_code)
);
CREATE INDEX idx_translation_lang ON content_translations(language_code);

-- Progress
CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  module_key TEXT NOT NULL,
  score INT,
  completed_at TIMESTAMPTZ,
  data JSONB
);
CREATE INDEX idx_progress_child ON progress(child_id);

-- Gamification
CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  badge_type TEXT,
  earned_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE noor_tree (
  child_id UUID PRIMARY KEY REFERENCES children(id) ON DELETE CASCADE,
  xp INT DEFAULT 0,
  level INT DEFAULT 1,
  fruits INT DEFAULT 0,
  last_activity TIMESTAMPTZ
);

-- Community (moderated)
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  image_url TEXT,
  caption TEXT,
  approved BOOLEAN DEFAULT FALSE,
  approved_by UUID REFERENCES parents(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pen Pals (sticker only)
CREATE TABLE pen_pal_stickers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_child UUID REFERENCES children(id),
  to_child UUID REFERENCES children(id),
  sticker_key TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
```

**Notes:** JSONB for flexible per-module game state. Indexes on `(language_code, module_key)`. RLS ensures parents only see their own children.

### 7.3 Non-Functional Requirements

- **Performance:** LCP < 2.5 s on 4G mobile.
- **Security:** GDPR-K + COPPA compliant, encryption at rest + in transit, no PII in client logs.
- **Scalability:** target 10k+ concurrent users (Supabase + Vercel autoscale).
- **Accessibility:** WCAG 2.1 AA, screen-reader tested.
- **Localization:** full i18n at string + content levels, RTL parity.
- **Observability:** Sentry (errors), PostHog (analytics, cookieless mode for under-13).

---

## 8. Implementation Roadmap

### Phase 1 — MVP (8–12 weeks)
- Landing + Kids Map + **Halal Scanner (working)** + basic Parent Dashboard.
- Languages: **EN + AR (RTL)**.
- Auth: Supabase email magic link.
- Deploy: Vercel + Supabase.

### Phase 2 — Enrichment (8 weeks)
- Salah, Stories, Noor Tree, gamification.
- Languages: **FR + ID**.
- Community Gallery (moderated).
- Strapi CMS online.

### Phase 3 — Polish & Launch (6 weeks)
- More languages (ES, DE, RU).
- PWA offline mode.
- AR scanner prototype.
- Premium tier + B2B pilot.

---

## 9. Success Metrics (KPIs)

| Metric | Target |
|---|---|
| Weekly Active Users (children) | > 5k by month 6 |
| Halal Scanner completion rate | > 70% |
| Parent login frequency | > 2x / week |
| 30-day child retention | > 40% |
| NPS (parent survey) | > 50 |
| Content scholar-review coverage | 100% |

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Content sensitivity / theological accuracy | All content reviewed by 2+ Islamic scholars; versioned; updateable. |
| Child safety (CSAM, grooming) | No free-text chat; no DMs; all uploads parent-approved; moderation team; report button. |
| Engagement decay | A/B test with real families; weekly content drops; seasonal events. |
| Localization cost | Start with 2 langs; use native reviewers; community translation portal (post-launch). |
| Development cost | Open-source stack, freelance illustrators, volunteer scholars. |
| Regulatory (COPPA, GDPR-K) | Privacy-by-design; no ads to minors; data minimization. |

---

## 11. Appendices

- **Interactive prototypes:** `/prototypes/*.html`
- **Lesson modules:** `expanded_lesson_modules.md`
- **Design system:** `design-system.md`
- **Mascot brief (Lumi):** `lumi-mascot.md`
- **Architecture decisions:** `ADR.md`
- **Sample content archive:** `sample-content-archive.md`

---

**Document v3.0 — canonical source of truth.** Supersedes v1.0, v1.1, v2.0. All three prior PRD files have been deleted; their content is incorporated here.
