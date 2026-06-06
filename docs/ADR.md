# NoorQuest — Architecture Decision Records (ADR)

**Version:** 1.0  
**Format:** Michael Nygard ADR template (lite)

This document captures *why* we picked what we picked, so future contributors (and future-us) don't relitigate settled decisions.

---

## ADR-001: Next.js 14 (App Router) as the frontend framework

**Status:** Accepted  
**Date:** June 2026

**Context**  
We need a React framework with strong i18n (especially RTL), good DX, server components for performance, and Vercel-grade deploys.

**Decision**  
Next.js 14+ with the App Router, TypeScript strict mode, React Server Components where possible.

**Consequences**
- ✅ Excellent i18n via `next-intl` (route-based `[locale]`).
- ✅ SSR/SSG/ISR mixable per route.
- ✅ Vercel deploy is one-command.
- ⚠️ App Router is newer; team must learn RSC mental model.
- ⚠️ Some libraries still catch up to RSC (we use 'use client' islands for interactive modules).

**Alternatives considered:** Remix (great but smaller community for i18n), Vite + React Router (more config, no SSR built-in), SvelteKit (smaller pool of Arabic/RTL examples).

---

## ADR-002: Supabase for database + auth

**Status:** Accepted  
**Date:** June 2026

**Context**  
We need Postgres, auth, RLS, file storage, and realtime in one platform, with a generous free tier and easy scaling.

**Decision**  
Supabase (Postgres + Auth + Storage + Realtime) as the primary backend.

**Consequences**
- ✅ RLS for parent/child data isolation.
- ✅ Magic-link auth (parent-friendly).
- ✅ Free tier sufficient for MVP + early growth.
- ⚠️ Vendor lock-in (mitigated: schema is portable Postgres).
- ⚠️ Need to be careful with EU data residency for French users (Supabase supports EU region — pick `aws-eu-west-1`).

**Alternatives considered:** Firebase (NoSQL is wrong for our relational content model), PlanetScale (no auth), AWS Amplify (too opinionated, harder to hire for).

---

## ADR-003: Strapi for CMS

**Status:** Accepted  
**Date:** June 2026

**Context**  
We have ~150+ content items (foods, stories, lessons) in 4+ languages, with images, audio, and rich text. We need a non-developer-friendly CMS to manage this.

**Decision**  
Strapi v4 (self-hosted, Node.js) as the headless CMS. Content models defined in `cms/strapi/`.

**Consequences**
- ✅ Multi-language fields built in (EN, FR, AR, ID).
- ✅ Open-source, no per-seat pricing.
- ✅ REST + GraphQL APIs out of the box.
- ⚠️ Self-hosted (we deploy on Railway or Fly.io).
- ⚠️ Content team must learn Strapi (mild learning curve).

**Alternatives considered:** Sanity (great DX but content lives in Sanity's cloud — sovereignty concerns for some users), Contentful (paid above free tier), Directus (good but more dev-oriented), custom admin (rejected — too much work for MVP).

---

## ADR-004: No free-text chat in the Community

**Status:** Accepted (NON-NEGOTIABLE)  
**Date:** June 2026

**Context**  
We are building for children 6–9. Direct messaging and free-text input create unacceptable risks: grooming, CSAM, bullying, and off-topic religious debates that need scholar mediation.

**Decision**  
Children can ONLY communicate via **pre-approved stickers** and **moderated gallery uploads** (with parent approval). No typing, no DMs, no free text ever.

**Consequences**
- ✅ Drastically reduces moderation load.
- ✅ Eliminates most CSAM and grooming vectors.
- ✅ Compliance with COPPA / GDPR-K is straightforward.
- ⚠️ Limits "social" feel (acceptable tradeoff for safety).
- ⚠️ Older users (10+) may want more — future "creator" tier with stronger safeguards.

**Alternatives considered:** Moderated free text (rejected — moderation cost + risk), parent-supervised chat (rejected — too easy to bypass), AI-filtered chat (rejected — false positives harmful in religious context).

---

## ADR-005: Freemium with premium at $4.99–$7.99 / month

**Status:** Accepted  
**Date:** June 2026

**Context**  
We need revenue to sustain content production, moderation, and scholar review, but the mission is to reach as many Muslim-minority families as possible — including those who can't pay.

**Decision**  
- **Free tier:** core modules (Halal Scanner, Salah, 1 story), 1 language, basic parent dashboard.
- **Premium ($4.99/mo annual / $7.99 mo-to-month):** all languages, all modules, AR features, ad-free, family profiles up to 5 kids.
- **Waqf / donation path:** families who cannot pay can request a premium scholarship, funded by donations.

**Consequences**
- ✅ Affordable for diaspora middle class.
- ✅ Free core means we can scale awareness.
- ✅ Waqf pathway aligns with Islamic values of sadaqah jariyah.
- ⚠️ Need to maintain strict feature parity on safety (no "premium safety").
- ⚠️ Need to track conversion carefully (avoid over-gating).

**Alternatives considered:** Subscription only (excludes poor families), one-time purchase (no recurring revenue), ads (rejected — never show ads to minors), fully free + donations only (insufficient for scale).

---

## ADR-006: pnpm as the package manager

**Status:** Accepted  
**Date:** June 2026

**Context**  
Fast, disk-efficient, strict dependency resolution. Works well with monorepos and CI.

**Decision**  
Use pnpm for both `noorquest/` and `cms/strapi/`.

**Consequences**
- ✅ ~2x faster installs than npm.
- ✅ Strict peer-dep warnings catch bugs early.
- ⚠️ Windows path length can be an issue (mitigated by `.npmrc` and `node-linker=hoisted` if needed).
- ⚠️ Some CI tooling assumes npm; we configure actions explicitly.

**Alternatives considered:** npm (universal but slow), yarn classic (deprecated), bun (too new for production).

---

## ADR-007: TypeScript strict mode everywhere

**Status:** Accepted  
**Date:** June 2026

**Context**  
We have content, gamification, and parent/child data models that must not drift. Runtime errors on a kids' product are reputationally costly.

**Decision**  
`tsconfig.json` with `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`.

**Consequences**
- ✅ Catch content-schema mismatches at build time.
- ✅ Better autocomplete for non-native-English-speaking contributors.
- ⚠️ Slightly more verbose code (acceptable tradeoff).

**Alternatives considered:** Plain JS (rejected), TS loose (rejected — null-safety gaps).

---

## ADR-008: Vercel for app hosting, Railway/Fly.io for Strapi, Supabase Cloud for DB

**Status:** Accepted  
**Date:** June 2026

**Context**  
Minimize ops work, maximize global edge performance, keep costs predictable.

**Decision**
- **Next.js app:** Vercel (free tier → pro at scale).
- **Strapi CMS:** Railway (easiest Node deploy) or Fly.io (more config, cheaper at scale).
- **Postgres:** Supabase Cloud, EU region (`aws-eu-west-1`) for French/European users.
- **Media (Cloudinary):** managed, paid tier only when usage justifies.

**Consequences**
- ✅ Near-zero ops for app tier.
- ✅ EU data residency for European users.
- ⚠️ Multiple vendors = multiple bills. Track in `/docs/adr-cost-tracker.md` (future).
- ⚠️ Vendor outage risk (mitigated by backups and status monitoring).

**Alternatives considered:** All-in on AWS (too much ops for a small team), self-host everything (distracts from product), all-in on Vercel (no managed Postgres/Auth).

---

## Future ADRs (to be written)

- ADR-009: AR scanner approach (WebXR vs native).
- ADR-010: AI voice recitation — scope and safeguards.
- ADR-011: Analytics tool choice (PostHog vs Plausible).
- ADR-012: Push notification provider.
- ADR-013: Scholar review workflow tooling.
