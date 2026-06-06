# GitHub Actions: Deploy to Vercel

> **This file needs to be added manually** because the GitHub Personal Access Token used by `gh` CLI doesn't have the `workflow` scope to push changes to `.github/workflows/`.
>
> To enable automatic deploys on every push to `main`:
>
> 1. Open https://github.com/jeepooly-blip/noorquest/new/main/.github/workflows
> 2. Create a new file named `deploy.yml`
> 3. Paste the content below
> 4. Click "Commit new file"
> 5. Go to https://github.com/jeepooly-blip/noorquest/settings/secrets/actions/new
> 6. Add three repository secrets (one at a time):
>    - Name: `VERCEL_TOKEN`, Value: *(get from https://vercel.com/account/tokens)*
>    - Name: `VERCEL_ORG_ID`, Value: `team_PamPD92NtXExo7VxypRNUzpL`
>    - Name: `VERCEL_PROJECT_ID`, Value: `prj_MVk8uhP54T2tG16AN53kE0bB9jUJ`
> 7. Push any change to `main` to trigger the first auto-deploy

---

## File: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
    paths:
      - 'noorquest/**'
      - 'vercel.json'
      - '.github/workflows/deploy.yml'
  workflow_dispatch:

concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: true

jobs:
  deploy:
    name: Deploy to Vercel (Production)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Vercel CLI
        run: npm install -g vercel@latest

      - name: Pull Vercel project info
        working-directory: noorquest
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: vercel pull --yes --environment=production --token=$VERCEL_TOKEN

      - name: Build
        working-directory: noorquest
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          NEXT_PUBLIC_SUPABASE_URL: https://demo.supabase.co
          NEXT_PUBLIC_SUPABASE_ANON_KEY: demo-anon-key
        run: vercel build --prod --token=$VERCEL_TOKEN

      - name: Deploy
        working-directory: noorquest
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel deploy --prebuilt --prod --yes --token=$VERCEL_TOKEN
```
