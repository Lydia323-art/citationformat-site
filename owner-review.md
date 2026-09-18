# Owner Review Gate

Project: apa-citation-generator  
Date: 2026-09-18  
Current gate: Owner Review  
Decision: `APPROVED_FOR_DEPLOY_PREP`

## What To Review

Open the local preview:

`http://localhost:4174/`

Use this DOI for a quick success test:

`10.1037/0003-066X.59.1.29`

Expected reference:

`Ray, O. (2004). How the Mind Hurts and Heals the Body. American Psychologist, 59(1), 29-40. https://doi.org/10.1037/0003-066x.59.1.29`

Use this invalid DOI for an error-state test:

`abc123`

Expected error:

`Enter a DOI that starts with 10. and includes a slash.`

## Owner Checklist

- [ ] Homepage first screen clearly says this is a free APA 7 citation generator.
- [ ] Tool is visible immediately and feels easy enough for a student.
- [ ] DOI lookup result looks acceptable.
- [ ] Manual entry form looks acceptable.
- [ ] Copy buttons are understandable.
- [ ] Bottom CTA is visible and useful.
- [ ] Supporting pages are acceptable for MVP launch.
- [ ] Disclaimers are acceptable: independent tool, no official APA/ScienceDirect affiliation, no 100% accuracy promise.
- [ ] Legal pages are acceptable as MVP drafts.

## Evidence Already Passed

- Local QA result: `qa-report.md`
- Automated evidence: `qa-evidence/qa-results.json`
- Desktop screenshot: `qa-evidence/desktop-home.png`
- Mobile screenshot: `qa-evidence/mobile-home.png`
- DOI lookup screenshot: `qa-evidence/doi-lookup-result.png`

## Current Decision

Recommended: approve for deployment preparation.

Reason: local QA has no open P0/P1/P2 issues, core citation task works, mobile is usable, and route/SEO smoke checks pass locally.

## Not Yet Production Ready

These are not owner-review blockers, but they block public launch:

- Choose/register a real domain.
- Provide an owner email for Crossref API `mailto`.
- Replace `https://example.com/` in sitemap with the production domain.
- Deploy to Cloudflare Pages/Workers.
- Verify production HTTPS, sitemap, robots, canonical, and DOI API.
- Submit sitemap in GSC and Bing after production URL is live.

## Gate Output

Owner Review status: `APPROVED_FOR_DEPLOY_PREP`

Next stage is deployment preparation.
