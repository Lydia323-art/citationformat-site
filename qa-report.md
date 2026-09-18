# Local QA Acceptance Report

Project: apa-citation-generator  
Stage: 09 QA  
Date: 2026-09-18  
Environment: local preview at `http://localhost:4174/`  
Conclusion: `CONDITIONAL_GO_LOCAL`

## Summary

Local QA passed after one small fix round. The MVP can complete the core anonymous user task: generate an APA 7 citation from DOI lookup or manual article details, then copy the result.

This is not a production launch GO yet because the real domain, Crossref `mailto`, Cloudflare deployment, production sitemap/canonical host, and search console submission are still pending.

## Evidence

- Automated QA results: `qa-evidence/qa-results.json`
- Desktop screenshot: `qa-evidence/desktop-home.png`
- Mobile screenshot: `qa-evidence/mobile-home.png`
- Invalid DOI error screenshot: `qa-evidence/invalid-doi-error.png`
- Manual citation success screenshot: `qa-evidence/manual-citation-success.png`
- DOI lookup success screenshot: `qa-evidence/doi-lookup-result.png`

## Tested User Tasks

- PASS: Desktop homepage first viewport explains the tool and shows the generator.
- PASS: Mobile homepage has no horizontal overflow.
- PASS: Bottom CTA is present and visible.
- PASS: Invalid DOI shows a helpful error message.
- PASS: Manual article details generate a reference citation.
- PASS: Manual article details generate an in-text citation.
- PASS: Copy reference button writes the expected text to clipboard.
- PASS: DOI lookup returns Crossref metadata and generates the expected Ray citation.
- PASS: 13 indexable routes render with title, description, H1, and self-referencing canonical path.
- PASS: `robots.txt` and `sitemap.xml` are accessible.

## Fixes Completed During QA

- Fixed dynamic route canonical tags so each indexable route sets its own canonical path instead of `/`.
- Fixed unknown non-file routes so they return HTTP 404 instead of serving the homepage as a soft 404.
- Re-ran automated QA after fixes: failed results `0`, open issues `0`.

## P0 / P1 / P2

- P0: none.
- P1: none after local fixes.
- P2: none for local QA.

## Remaining Production Blockers

- Domain is not prepared.
- Production canonical and sitemap host still use placeholder host until domain is chosen.
- Crossref `mailto` owner email is not configured.
- Cloudflare Pages/Workers production deployment has not been completed.
- GSC/Bing submission and production observability are not done.

## Verdict

Local MVP QA is complete and acceptable for Owner Review.

Next recommended stage: Owner Review, then production deployment preparation.
