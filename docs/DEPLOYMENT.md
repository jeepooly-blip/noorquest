# Deployment Guide

This guide explains how NoorQuest is deployed and what you need to do to keep it running.

## Current state

| Item | Value |
|---|---|
| Production URL | https://noorquest-seven.vercel.app |
| Vercel project | `cafepassnet-8845s-projects/noorquest` |
| Vercel account | `cafepassnet` |
| GitHub repo | https://github.com/jeepooly-blip/noorquest |
| Auto-deploy | Via GitHub Actions (see below) |
| Last successful build | 35/35 pages, ~50s |

## Architecture

```
GitHub (jeepooly-blip/noorquest)
  └─► main branch
       └─► .github/workflows/deploy.yml
            └─► vercel build --prod + vercel deploy --prebuilt
                 └─► Vercel (noorquest-seven.vercel.app)
```

We do **not** use Vercel's built-in GitHub integration because the project is a pnpm monorepo and Vercel's auto-detect doesn't reliably find the Next.js subdirectory. The GitHub Action deploys via the Vercel CLI with the correct working directory.

## First-time setup (one-time, you do this once)

1. Go to https://vercel.com/account/tokens
2. Create a new token named `noorquest-github`
3. Copy the token value
4. Go to https://github.com/jeepooly-blip/noorquest/settings/secrets/actions
5. Add three repository secrets:
   - `VERCEL_TOKEN` = the token from step 2
   - `VERCEL_ORG_ID` = `team_PamPD92NtXExo7VxypRNUzpL`
   - `VERCEL_PROJECT_ID` = `prj_MVk8uhP54T2tG16AN53kE0bB9jUJ`

## Allow public access to the site (one-time)

The site is currently behind Vercel's "Deployment Protection" which blocks anonymous visitors.

1. Go to https://vercel.com/cafepassnet/cafepassnet-8845s-projects/noorquest/settings/security
2. Under **Deployment Protection**, set to **Disabled** (or **Standard Protection** with password if you want a soft gate)
3. Save

After this, https://noorquest-seven.vercel.app will be open to the public.

## Deploying changes

Once the secrets are added, deployment is automatic:

```bash
git checkout main
# make changes
git add -A
git commit -m "feat: your change"
git push origin main
```

GitHub Action will:
1. Run typecheck + lint + build (the CI job)
2. If CI passes, run the deploy job
3. Build the project with Vercel CLI
4. Deploy to production

## Manual deploy (if you ever need it)

```bash
cd noorquest
vercel login
vercel deploy --prod
```

You must be logged in to the `cafepassnet` Vercel account.

## Environment variables

Set in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Required for | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Authentication, data | Get from Supabase project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Authentication, data | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side admin | Keep secret |
| `NEXT_PUBLIC_STRAPI_URL` | CMS content | Strapi instance URL |
| `STRAPI_API_TOKEN` | CMS content | Read-only token |
| `NEXT_PUBLIC_POSTHOG_KEY` | Analytics | PostHog project key (optional) |
| `NEXT_PUBLIC_POSTHOG_HOST` | Analytics | Defaults to `https://us.i.posthog.com` |

The app runs in **demo mode** without these — the Landing page and Halal Scanner work with mock data, but login/save/data features will not.

## Adding a real Supabase project

1. Create a project at https://supabase.com
2. Run the SQL in `noorquest/supabase/migrations/0001_init.sql` (Supabase Dashboard → SQL Editor)
3. Optionally run `noorquest/supabase/seed.sql` for dev data
4. Copy URL + anon key + service role key from Supabase Dashboard → Settings → API
5. Add them to Vercel environment variables (see above)
6. Redeploy

## Branch workflow (Gitflow)

- `main` — production, protected (1 review + CI check)
- `develop` — staging, protected (1 review + CI check)
- `feature/*`, `fix/*` — work branches, deleted after merge

To make a change:
```bash
git checkout develop
git pull
git checkout -b feature/my-change
# ... work ...
git add -A
git commit -m "feat: my change"
git push -u origin feature/my-change
# Open PR to develop via GitHub
# Wait for CI + 1 review
# Merge via GitHub
# Repeat for develop → main
```

## Troubleshooting

**Build fails with "No Next.js version detected"**
- Vercel is using the wrong root directory
- Make sure the deploy GitHub Action is used (not Vercel's GitHub integration)
- OR set the Vercel project's Root Directory to `noorquest` in Project Settings → General

**Site shows "Connection was reset"**
- Deployment Protection is enabled
- Disable it in Project Settings → Security (see "Allow public access" above)

**Changes don't show up after push**
- Check GitHub Actions tab — is the deploy workflow passing?
- Check Vercel dashboard → Deployments — is the latest build Ready?
