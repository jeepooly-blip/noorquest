# NoorQuest

> **Bright Adventures in Faith for Little Hearts**

A joyful, safe, gamified web platform that teaches the basics of Islam to Muslim children (6–9) in non-Muslim majority countries. Built with strong parent support tools, scholar-reviewed content, and a safety-first community.

---

## ✨ What's in this repo

| Path | What it is |
|---|---|
| [`docs/NoorQuest_PRD.md`](docs/NoorQuest_PRD.md) | Canonical Product Requirements Document (v3.0) |
| [`docs/expanded_lesson_modules.md`](docs/expanded_lesson_modules.md) | Halal/Haram items, Salah, Stories, Akhlaq content |
| [`docs/design-system.md`](docs/design-system.md) | Colors, typography, components, accessibility |
| [`docs/lumi-mascot.md`](docs/lumi-mascot.md) | Lumi the Lantern — personality, poses, do's & don'ts |
| [`docs/ADR.md`](docs/ADR.md) | Architecture Decision Records (why we picked what we picked) |
| [`docs/sample-content-archive.md`](docs/sample-content-archive.md) | Original sample dialogues and parent guides (preserved) |
| [`prototypes/`](prototypes/) | 8 interactive HTML prototypes (no build step) |
| [`noorquest/`](noorquest/) | Next.js 14 app — working MVP (Landing + Halal Scanner) |
| [`.github/`](.github/) | Issue + PR templates, CI workflow |

---

## 🚀 Quick start

### View the prototypes (no install)
Open any file in `prototypes/` directly in your browser:
```bash
# Windows
start prototypes\landing.html
# macOS
open prototypes/landing.html
```

### Run the Next.js app
```bash
cd noorquest
pnpm install
pnpm dev
# → http://localhost:3000
```

### Required environment variables
Copy `noorquest/.env.example` to `noorquest/.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRAPI_URL` *(when CMS is online)*

The app runs **without** these in **demo mode** (mock data only).

---

## 🏗️ Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion |
| i18n | next-intl (EN, FR, AR-RTL, ID) |
| State | Zustand |
| Auth | Supabase Auth |
| Database | PostgreSQL (Supabase) |
| CMS | Strapi (self-hosted) |
| Storage | Cloudinary |
| PWA | next-pwa |
| CI | GitHub Actions |
| Deploy | Vercel + Railway/Fly.io + Supabase Cloud |

See [`docs/ADR.md`](docs/ADR.md) for the *why* behind each choice.

---

## 🌍 Localization

| Phase | Languages |
|---|---|
| MVP | 🇬🇧 English · 🇫🇷 French · 🇸🇦 Arabic (RTL) · 🇮🇩 Indonesian/Malay |
| Phase 2 | 🇪🇸 Spanish · 🇩🇪 German · 🇷🇺 Russian |
| Phase 3 | 🇵🇰 Urdu · 🇹🇷 Turkish · 🇨🇳 Chinese · more |

Arabic and other RTL languages are first-class. Toggle language via the header switcher.

---

## 🛡️ Safety principles

- **No free-text chat.** Children communicate only via pre-approved stickers and parent-approved gallery uploads.
- **Scholar-reviewed content.** Every religious claim is reviewed by qualified Islamic scholars before publication.
- **Parent gate.** All parent-zone access requires a PIN or challenge.
- **COPPA & GDPR-K compliant.** No ads, no behavioral tracking of minors, data minimization.
- **Report button** on every community surface.

---

## 🤝 Contributing

We welcome contributions that align with our safety and scholar-review standards.

1. Fork & create a feature branch from `develop`.
2. Make your change.
3. Run `pnpm typecheck && pnpm lint` (must pass).
4. Open a Pull Request to `develop`.
5. Use the [PR template](.github/PULL_REQUEST_TEMPLATE.md).
6. Wait for review (1+ code reviewer + 1 scholar reviewer for content changes).

**Bug reports:** [open an issue](../../issues/new?template=bug_report.md)  
**Feature requests:** [open an issue](../../issues/new?template=feature_request.md)

---

## 🧒 Content review

All religious content must be reviewed by a qualified scholar before merge to `main`. See `docs/ADR.md` and the `lumi-mascot.md` do's & don'ts for non-negotiable standards.

---

## 📜 License

**All rights reserved.**  
This repository is publicly visible for transparency and community contribution, but no part of the codebase, content, or assets may be copied, modified, redistributed, or used commercially without explicit written permission from the project owner.

Scholar-reviewed content remains the intellectual property of its authors and reviewers.

---

## 🗺️ Roadmap

- [x] **v0.1** — PRD consolidation, prototypes, scaffold (this commit)
- [ ] **v0.2 (MVP)** — Landing + Halal Scanner playable, EN + AR
- [ ] **v0.3** — Salah Station, Story Grove (3 stories)
- [ ] **v0.4** — Parent Dashboard with progress tracking
- [ ] **v0.5** — Community Gallery + sticker pen-pals (moderated)
- [ ] **v0.6** — Premium tier + FR + ID
- [ ] **v1.0** — Public launch with scholar-review board

---

## 💛 Acknowledgments

- The Muslim families in minority contexts who inspired this.
- The scholars who review every word.
- The illustrators and voice artists who bring Lumi to life.
- Open-source: Next.js, Supabase, Strapi, Tailwind, next-intl, Framer Motion, Lucide, dnd-kit, and many more.

---

**Built with love, in the name of Allah, for the next generation. 🌙**
