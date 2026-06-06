# NoorQuest — App

Next.js 14 app for NoorQuest. **Status: MVP scaffold.**

## Quick start

```bash
pnpm install
cp .env.example .env.local
# Fill in Supabase + Strapi creds (optional — runs in demo mode without them)
pnpm dev
```

App runs on http://localhost:3000.

## What's playable now

- ✅ **Landing page** (`/en` or `/ar`) — animated Lumi, "I'm a Kid" / "I'm a Parent" split, language toggle.
- ✅ **World Map** (`/en/map`) — clickable zones, locked states.
- ✅ **Halal Scanner** (`/en/market`) — drag-and-drop, 20 items, real scoring, badges, Lumi voice lines, RTL works.

## What's stubbed

- Salah Station → see `prototypes/salah-mat.html`
- Story Grove → see `prototypes/story-grove.html`
- Noor Tree → see `prototypes/noor-tree.html`
- Parent Dashboard → see `prototypes/parent-dashboard.html`

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| i18n | next-intl (EN, AR-RTL) |
| DnD | @dnd-kit/core |
| State | React useState (Zustand ready) |
| Auth + DB | Supabase (Postgres + RLS) |
| CMS | Strapi (separate, see `cms/strapi/`) |
| Deploy | Vercel |

## Project structure

```
app/
  [locale]/
    layout.tsx           # i18n + RTL + fonts
    page.tsx             # Landing
    (kid)/
      layout.tsx         # Kid shell (avatar top bar)
      map/page.tsx
      market/page.tsx    # ← working MVP
      salah/page.tsx
      stories/page.tsx
      tree/page.tsx
    (parent)/
      layout.tsx
      dashboard/page.tsx
  api/health/route.ts
components/
  kid/   landing/   parent/
lib/
  halal/items.ts        # 20-item dataset
  gamification/xp.ts    # XP rules + levels + badges
  i18n/                 # next-intl config
  supabase/             # client + server + types
messages/
  en.json  ar.json
supabase/
  migrations/0001_init.sql
  seed.sql
cms/strapi/README.md
styles/globals.css
```

## Database

The full schema is in `supabase/migrations/0001_init.sql`. It uses PostgreSQL with Row Level Security so each parent can only see their own children.

Apply migrations:
```bash
# Using Supabase CLI
supabase db push

# Or run the SQL directly in the Supabase SQL editor.
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Dev server (http://localhost:3000) |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |

## Accessibility

- Touch targets ≥ 48 px
- `aria-label` on all interactive elements
- `prefers-reduced-motion` honored (animations disabled when set)
- RTL tested in Arabic
- Voice lines via Lumi

## License

All rights reserved. See root `README.md` for details.
