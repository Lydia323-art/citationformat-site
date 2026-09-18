# Domain And Email Recommendations

Project: apa-citation-generator  
Date: 2026-09-18  
Deployment method: GitHub connected to Cloudflare Pages
Selected domain: `citationformat.site`

## Domain Recommendation

Availability must be confirmed at checkout in Cloudflare Registrar, Namecheap, Porkbun, or another registrar. Public search can reduce obvious conflicts, but it cannot guarantee that a domain is available.

Updated strategy: use a broad explanatory keyword domain, not an APA-only domain. The domain should explain the content category, while individual pages target specific styles such as `/apa-citation-generator/`, `/mla-citation-generator/`, and `/chicago-citation-generator/`.

Recommended shortlist:

1. `citationformatgenerator.com`
   - Best semantic fit: citation + format + generator.
   - Works for APA, MLA, Chicago, Harvard, and future citation-format pages.
   - Long, but very clear.

2. `citationformattool.com`
   - Slightly shorter than `citationformatgenerator.com`.
   - Still clearly describes the site category.

3. `sourcecitationgenerator.com`
   - Strong fit for the user task: turn a source into a citation.
   - Good for DOI, URL, PDF, journal article, and book pages.

4. `referencecitationgenerator.com`
   - Good for reference-list and citation workflows.
   - A little long, but understandable.

5. `academiccitationgenerator.com`
   - Broad enough for all citation styles.
   - Strong student/research intent.

6. `studentcitationgenerator.com`
   - Clear target audience.
   - Good if the site positioning stays student-focused.

If the best `.com` options are unavailable or overpriced, check these fallback forms:

- `citationformatgenerator.app`
- `sourcecitationgenerator.app`
- `academiccitationgenerator.app`
- `citationformattool.app`
- `sourcecitationtool.com`

Selected domain: `citationformat.site`.

This is a good fit because it is broad, explanatory, and can support pages for APA, MLA, Chicago, Harvard, DOI-to-citation, PDF citation, and other future citation-format workflows.

## Domains To Avoid

- Anything with `official`, `apastyle`, `americanpsychologicalassociation`, or wording that could imply affiliation.
- Anything with competitor names such as `mybib`, `scribbr`, `quillbot`, `citationmachine`, `scienceDirect`.
- `apaformatgenerator.com` because there is already an indexed site using that domain.
- Very spammy exact-match names with too many hyphens.

## Email Recommendation

Use Cloudflare Email Routing with your chosen domain.

Recommended public and Crossref email:

`hello@<your-domain>`

Selected domain email:

`hello@citationformat.site`

Recommended aliases:

- `hello@<your-domain>`: public contact, legal pages, Crossref `CROSSREF_MAILTO`.
- `support@<your-domain>`: future user support.
- `admin@<your-domain>`: optional internal/admin use, not necessary to publish.

Do not use a personal Gmail address in public legal pages if you can avoid it. A domain email looks more trustworthy and can be routed to your real inbox privately.

## Decision Needed

- Create Cloudflare Email Routing alias: `hello@citationformat.site`.
- Use `hello@citationformat.site` as `CROSSREF_MAILTO`.
