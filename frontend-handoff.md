# Frontend Handoff

项目：apa-citation-generator
阶段：06-design
状态：NEEDS_REVIEW

## Implementation Summary

Build a Cloudflare-first static tool site with a tool-first homepage. The MVP must let users generate APA 7 citations from DOI lookup or manual journal article details, then copy reference and in-text citations.

Do not implement:

- PDF upload.
- Login.
- Payment.
- Saved projects.
- AI writing upsell.

## Required Files To Read

- `prd.md`
- `route-contract.md`
- `data-contract.md`
- `copy-freeze.md`
- `seo-meta.md`
- `faq.md`
- `compliance-report.md`
- `claims-policy.md`
- `design-source.md`
- `content-fit-matrix.md`

## Routes To Implement

### MVP Routes

- `/`
- `/privacy/`
- `/terms/`
- `/cookie-policy/`

### Should Routes

- `/apa-citation-generator-pdf/`
- `/apa-format/`
- `/science-direct-apa-citation/`

ScienceDirect route can ship only if disclaimer is present.

## Suggested Component Tree

```text
App
  SiteHeader
  Route
    HomePage
      ToolHero
        CitationTool
          SourceTabs
          DoiLookupForm
          ManualArticleForm
          CitationResultPanel
          CitationStateBanner
        ExampleCitation
      HowItWorks
      UseCases
      ApaNotes
      FAQ
      BottomCTA
    PdfCitationPage
    ApaFormatPage
    ScienceDirectCitationPage
    PrivacyPage
    TermsPage
    CookiePolicyPage
  SiteFooter
```

## CSS Layout Contract

### Page Shell

```css
.page-shell {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
}

.container {
  width: min(100% - 32px, 1180px);
  margin-inline: auto;
}
```

### Tool Grid

```css
.tool-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(340px, 0.85fr);
  gap: 20px;
  align-items: start;
}

@media (max-width: 860px) {
  .tool-grid {
    grid-template-columns: 1fr;
  }
}
```

### Panels

```css
.panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(31, 41, 51, 0.08);
}
```

## State Requirements

Citation tool must support:

- `idle`
- `loading`
- `success`
- `partial`
- `doi_not_found`
- `invalid_doi`
- `network_error`
- `copy_success`

## Data Mapping

Manual form maps to `data-contract.md`:

- `authors[].given`
- `authors[].family`
- `year`
- `title`
- `journal`
- `volume`
- `issue`
- `pages`
- `doi`
- `url`

DOI endpoint:

```http
GET /api/doi?doi=<encoded-doi>
```

## Citation Output

Result panel must render:

- `reference`
- `inTextParenthetical`
- `inTextNarrative`
- `warnings`

## Accessibility Requirements

- All fields use visible labels.
- Copy buttons use accessible labels such as `Copy reference citation`.
- FAQ accordion must be keyboard accessible.
- Focus state visible on tabs, inputs, buttons, and FAQ toggles.
- Error messages are tied to fields via ARIA where practical.
- Loading state uses visible text, not only spinner.

## SEO Requirements

Use `seo-meta.md` for:

- title
- meta description
- H1
- schema type

Do not rewrite H1/title/meta during implementation without updating Copy Freeze.

## Compliance Requirements

- Footer links must include Privacy, Terms, Cookie Policy.
- Privacy must disclose DOI lookup through Crossref.
- Terms must include no official affiliation and no warranty of perfect formatting.
- ScienceDirect page must include: `This tool is not affiliated with or endorsed by ScienceDirect.`
- Do not add PDF upload.

## Analytics Events

Implement stubs or comments for:

- `citation_form_started`
- `doi_lookup_started`
- `doi_lookup_succeeded`
- `doi_lookup_failed`
- `citation_generate_clicked`
- `citation_generated`
- `citation_generation_failed`
- `citation_copied`
- `faq_opened`

If analytics provider is not configured, event calls should no-op safely.

## QA Checklist For Frontend

- Home desktop shows H1, DOI input, generate button, and result preview above fold.
- Home mobile can complete DOI -> generate -> copy.
- DOI not found state leads to manual form.
- Partial metadata state displays warning but allows copy.
- Invalid DOI displays field error.
- Result copy buttons work.
- PDF page does not show upload UI.
- ScienceDirect page includes disclaimer.
- Footer legal links resolve.
- No console P0/P1 errors.

## Open Items

- Production domain.
- Crossref `mailto` email.
- Final analytics provider.
- Whether ScienceDirect page ships in first public release.

[NEEDS_REVIEW]
