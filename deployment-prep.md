# Deployment Preparation

Project: apa-citation-generator  
Date: 2026-09-18  
Status: `READY_FOR_CLOUDFLARE_SETUP`
Production domain: `citationformat.site`

## Deployment Shape

The project is prepared for Cloudflare Pages with Pages Functions.

- Static output directory: `site/public`
- Pages Functions directory: `site/functions`
- DOI API endpoint: `/api/doi`
- Local preview server: `site/server.mjs`
- Production route handling: `site/public/_redirects`

## Cloudflare Pages Settings

Use these settings when creating the Cloudflare Pages project:

- Framework preset: None / static site
- Project root: `site`
- Build command: `npm run prepare:production`
- Build output directory: `public`
- Functions directory: `functions`
- Node version: not required for build

Required production environment variables:

- `CROSSREF_MAILTO`: owner email address for Crossref polite API usage
- `SITE_URL`: `https://citationformat.site`

Do not paste secrets or API tokens into chat. Add them in Cloudflare Pages project settings.

## Files Added For Deployment

- `site/functions/api/doi.js`: Cloudflare Pages Function version of DOI lookup.
- `site/public/_redirects`: exact route fallback for indexable pages and trailing-slash redirects.
- `site/scripts/prepare-production-assets.cjs`: generates production `sitemap.xml` and `robots.txt` after domain is chosen.

## Files Updated For Deployment

- `site/public/app.js`: canonical tags now use relative paths locally and absolute production URLs on the deployed domain.
- `site/server.mjs`: local preview now mirrors trailing-slash redirects and 404 behavior.
- `site/package.json`: added `check`, `dev:local`, and `prepare:production` scripts.

## Pre-Deploy Commands

Run from:

`site`

1. Set the production URL after choosing the domain:

```powershell
$env:SITE_URL = "https://citationformat.site"
```

2. Generate production sitemap and robots:

```powershell
npm run prepare:production
```

3. Run syntax checks:

```powershell
npm run check
```

4. Run local preview:

```powershell
$env:PORT = "4175"
npm run dev
```

5. Run local QA before production deploy:

```powershell
$env:QA_BASE_URL = "http://localhost:4175"
node ..\qa-local-acceptance.cjs
```

Note: the QA script is intended for the Codex local workspace where Playwright is available through the bundled runtime. If running outside Codex, install/configure Playwright first or use the checklist below manually.

## Verification Completed Locally

- PASS: `npm run check`
- PASS: automated local QA against `http://localhost:4175/`
- PASS: `/apa-format` returns 301 to `/apa-format/`
- PASS: unknown route returns 404
- PASS: invalid DOI returns expected API error state

## Direct Wrangler Deploy Option

If you deploy without GitHub integration, run from `site` after `wrangler` is available and Cloudflare auth is configured:

```powershell
npx wrangler pages deploy public --project-name apa-citation-generator
```

After deployment, set `CROSSREF_MAILTO` in Cloudflare Pages settings and redeploy if needed.

## GitHub + Cloudflare Pages Option

Selected deployment method:

1. Push the project to GitHub.
2. Create a Cloudflare Pages project from the GitHub repository.
3. Use the settings above.
4. Add `CROSSREF_MAILTO`.
5. Add `SITE_URL`.
6. Deploy.
7. Add the custom domain when ready.

Detailed setup guide: `cloudflare-pages-setup.md`.

## Production Smoke Test Checklist

After Cloudflare deploys, test the real URL:

- [ ] Homepage returns 200 over HTTPS.
- [ ] `/api/doi?doi=10.1037/0003-066X.59.1.29` returns `ok: true`.
- [ ] Invalid DOI shows the expected frontend error.
- [ ] Manual citation generation works.
- [ ] Copy buttons work.
- [ ] `/apa-format/` returns 200.
- [ ] `/apa-format` redirects to `/apa-format/`.
- [ ] Unknown path returns 404.
- [ ] `/sitemap.xml` uses the real production domain.
- [ ] `/robots.txt` points to the real production sitemap.
- [ ] Canonical tags on deployed pages use the production domain.
- [ ] Mobile viewport has no horizontal overflow.

## Still Needed From Owner

- Configure Cloudflare Email Routing for `hello@citationformat.site`.
- Confirm whether to add analytics in the first public launch or keep analytics pending.

## Current Gate

Deployment preparation is complete. Actual production deployment is waiting for Cloudflare Pages setup, `CROSSREF_MAILTO`, email routing, and analytics decision.
