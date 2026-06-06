# Strapi CMS — Content Models (Schema Spec)

This directory is reserved for a self-hosted Strapi v4 instance that will serve as the multi-language content backend.

> **Status:** Schema spec only. The Strapi server itself is **not** scaffolded in this repo — it will be deployed separately (e.g., Railway, Fly.io, or your own infra). Follow the steps below to spin it up.

## Why Strapi?

- Multi-language fields built in (EN, FR, AR, ID).
- Open-source, no per-seat pricing.
- REST + GraphQL APIs out of the box.
- Reviewed in `docs/ADR.md` (ADR-003).

## Setup (when ready)

```bash
npx create-strapi-app@latest noorquest-cms --quickstart --typescript
cd noorquest-cms
```

Then define the content models below in the Strapi admin panel.

## Content Models

### 1. `halal-item`
| Field | Type | Notes |
|---|---|---|
| `moduleKey` | UID (unique) | e.g., `halal_apple` |
| `emoji` | String | e.g., `🍎` |
| `category` | Enumeration | `halal` \| `haram` \| `mushbooh` |
| `image` | Media (single) | illustration |
| `audio` | Media (single) | Lumi voice line |
| `translations` | Component (repeatable) | locale + title + lumiLine + explanation |

### 2. `story`
| Field | Type | Notes |
|---|---|---|
| `slug` | UID | e.g., `honest-trader` |
| `prophet` | String | e.g., `Muhammad ﷺ` |
| `durationMinutes` | Integer | for UI |
| `illustration` | Media | cover image |
| `translations` | Component | locale + title + body + question + moral |

### 3. `salah-step`
| Field | Type | Notes |
|---|---|---|
| `stepKey` | UID | `wudu_1` … `wudu_8`, `position_1` … `position_6` |
| `stepType` | Enumeration | `wudu` \| `position` |
| `order` | Integer | 1..8 or 1..6 |
| `translations` | Component | locale + label + description + audioClip |

### 4. `akhlaq-lesson`
| Field | Type | Notes |
|---|---|---|
| `slug` | UID | e.g., `honesty` |
| `value` | String | `Honesty`, `Kindness`, etc. |
| `translations` | Component | locale + title + story + activity + lumiTakeaway |

### 5. `lumi-line` (lightweight, for short voice lines)
| Field | Type | Notes |
|---|---|---|
| `key` | UID | e.g., `halal_correct_apple` |
| `context` | String | tag for where it's used |
| `translations` | Component | locale + text + audio |

## API Endpoints (after Strapi is live)

- `GET /api/halal-items?locale=en&populate=*`
- `GET /api/stories?locale=ar&populate=*`
- `GET /api/salah-steps?locale=en&filters[stepType][$eq]=wudu&sort=order`

Wire these into the Next.js app via `lib/cms/strapi.ts` (TODO: implement when Strapi is online).

## Environment variables (for the Strapi host)

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
DATABASE_CLIENT=postgres
DATABASE_URL=postgres://...
```

## Localization plugin

Install `@strapi/plugin-i18n` (default in v4) and configure locales: `en`, `fr`, `ar`, `id`.

## Scholar review workflow

All `published` events should be triggered manually (not auto-publish), to enforce scholar review. Configure Roles & Permissions:

- **Content Author:** can `create`, `update`, `read` — **not** `publish`.
- **Scholar Reviewer:** can `read`, `publish`, `unpublish`.
- **Public role (API):** `read` on published content only.
