# Route Contract

项目：apa-citation-generator
阶段：02-product
状态：DONE

## Domain

- Production domain：待确认
- Canonical base：待域名确认
- Locale：English
- Primary markets：US, Philippines

## Routes

### `/`

- Status：MVP
- Index：yes
- Canonical：`https://<domain>/`
- Primary keyword：apa citation generator free
- Secondary keywords：apa citation generator, apa citation generator pdf, apa 7 citation generator
- H1：Free APA 7 Citation Generator
- Core task：Generate APA 7 citation from DOI or manual journal article details.
- UI reference：Scribbr information architecture + Grammarly form/preview.
- Above-fold rule：H1, short subhead, DOI/manual tool, result preview, and copy action must be visible without turning the page into a marketing hero.
- Required components：
  - DOI input
  - Manual journal article form
  - Citation output
  - In-text citation output
  - Copy buttons
  - Example
  - FAQ
  - How it works
  - Use cases
  - APA 7 notes
- Schema：WebApplication, FAQPage

### `/apa-citation-generator-pdf/`

- Status：Should
- Index：yes
- Canonical：`https://<domain>/apa-citation-generator-pdf/`
- Primary keyword：apa citation generator pdf
- H1：APA Citation Generator for PDFs
- Core task：Help users cite a PDF source by finding DOI or manually entering article details.
- UI reference：MyBib education flow + homepage tool CTA.
- Forbidden MVP pattern：Do not show PDF upload as a supported action.
- Required components：
  - PDF guidance
  - DOI tool embed or CTA to homepage tool
  - Manual fields checklist
  - FAQ
- Schema：Article, FAQPage

### `/apa-format/`

- Status：Should
- Index：yes
- Canonical：`https://<domain>/apa-format/`
- Primary keyword：apa format
- H1：APA Format Guide
- Core task：Explain common APA 7 reference and in-text citation basics.
- UI reference：MyBib / Scribbr guide structure.
- Required components：
  - Reference format examples
  - In-text citation examples
  - CTA back to generator
  - FAQ
- Schema：Article, FAQPage

### `/science-direct-apa-citation/`

- Status：Needs compliance note
- Index：yes if approved
- Canonical：`https://<domain>/science-direct-apa-citation/`
- Primary keyword：sciencedirect apa citation generator
- H1：ScienceDirect Article APA Citation Helper
- Core task：Help users cite a ScienceDirect article in APA 7 using DOI or article details.
- UI reference：Guide + tool CTA + brand disclaimer.
- Required components：
  - Non-affiliation disclaimer
  - DOI-first workflow
  - Manual fallback
  - CTA to generator
- Required disclaimer：This tool is not affiliated with or endorsed by ScienceDirect.
- Schema：Article, FAQPage

### `/privacy/`

- Status：MVP
- Index：yes
- H1：Privacy Policy
- Required statements：
  - No PDF upload in MVP
  - No saved bibliography in MVP
  - DOI may be sent to Crossref for lookup
  - Analytics/cookies to be confirmed by compliance
- Schema：WebPage

### `/terms/`

- Status：MVP
- Index：yes
- H1：Terms of Use
- Required statements：
  - Citation output should be checked before submission
  - Site is not affiliated with APA, ScienceDirect, MyBib, Scribbr, or Crossref
  - No warranty of perfect formatting
- Schema：WebPage

## Navigation

- Header：Generator, PDF Citation, APA Format, FAQ
- Footer：Privacy, Terms, Contact placeholder

## Page Matrix UI References

| Route | UI reference | Do not copy |
| --- | --- | --- |
| `/` | Scribbr tool-first IA + Grammarly form/preview | Competitor copy, brand styling, broad writing-suite upsells |
| `/apa-citation-generator-pdf/` | MyBib education flow + direct generator CTA | PDF upload |
| `/apa-format/` | MyBib / Scribbr guide structure | Long generic textbook page with no tool CTA |
| `/science-direct-apa-citation/` | Guide + tool CTA + non-affiliation disclaimer | Any implication of official ScienceDirect affiliation |

## Robots / Sitemap

- `/` indexable
- all content routes indexable
- no internal search pages in MVP
- sitemap includes MVP routes only after content exists

[DONE]
