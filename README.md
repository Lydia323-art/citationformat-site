# Citation Format

MVP for `citationformat.site`: a free APA 7 citation generator for DOI lookup, PDFs, journal articles, references, and in-text citations.

## Project Structure

- `site/public`: static frontend files for Cloudflare Pages.
- `site/functions`: Cloudflare Pages Functions, including `/api/doi`.
- `site/scripts`: production asset preparation scripts.
- `qa-evidence`: local QA screenshots and automated QA output.
- `deployment-prep.md`: deployment settings and production checklist.
- `cloudflare-pages-setup.md`: step-by-step Cloudflare Pages setup guide.

## Local Preview

Run from `site`:

```powershell
npm run dev
```

Default local URL:

```text
http://localhost:4173/
```

## Production Prep

Run from `site`:

```powershell
$env:SITE_URL = "https://citationformat.site"
npm run prepare:production
npm run check
```

## Cloudflare Pages

Selected deployment method: GitHub connected to Cloudflare Pages.

Cloudflare Pages settings:

```text
Project root: site
Build command: npm run prepare:production
Build output directory: public
Functions directory: functions
```

Production environment variables:

```text
SITE_URL=https://citationformat.site
CROSSREF_MAILTO=hello@citationformat.site
```

Do not commit real secrets or token files.
