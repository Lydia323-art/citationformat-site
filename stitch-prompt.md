# Stitch Prompt

Use this prompt in Google Stitch to generate the first design source for the APA citation generator.

```text
Create a responsive web UI for a free APA 7 citation generator.

This is a student utility, not a SaaS landing page. The homepage must be tool-first.

Audience:
- US college students
- Philippines college students
- Graduate students who need APA 7 citations from DOI, PDFs, and journal article pages

Above the fold:
- Compact header with brand: APA Citation Generator
- Header links: Generator, PDF Citation, APA Format, FAQ
- H1: Free APA 7 Citation Generator
- Subhead: Paste a DOI or enter article details to create APA 7 reference and in-text citations. No account required.
- Main tool grid:
  - Left panel: source tabs for DOI and Journal Article
  - DOI input with placeholder: 10.1037/0003-066X.59.1.29
  - Generate APA Citation button
  - Try an Example secondary button
  - Manual journal article form fallback with fields for authors, year, title, journal, volume, issue, pages, DOI, URL
  - Right panel: citation result preview with Reference citation, In-text citation, Narrative citation, and copy buttons

Below the tool:
- Example citation block
- How it works with 3 compact steps
- Use cases: Cite a PDF source, Cite a journal article, Cite from an article page
- APA 7 citation basics
- FAQ accordion
- Footer with Privacy, Terms, Cookie Policy

Visual style:
- Quiet academic utility
- Paper-like background
- White panels
- Muted teal primary button
- Warm accent for subtle highlights
- Dense but readable form layout
- 8px max border radius
- Strong text contrast
- No purple gradient
- No oversized marketing hero
- No decorative blob backgrounds

Desktop layout:
- Max width around 1180px
- Above fold shows H1, DOI input, Generate button, and result preview
- Form/input panel on the left, result preview on the right

Mobile layout:
- Single column
- Flow: H1, subhead, DOI input, Generate, result preview, manual form, guide content
- Copy buttons full width

Required states to design:
- Empty state
- Loading DOI metadata
- Success result
- Partial metadata warning
- DOI not found
- Invalid DOI
- Copy success

Do not include:
- PDF upload
- login
- pricing
- payment
- saved projects
- AI writing assistant upsell
- official APA branding
- official ScienceDirect branding
```

## Refinement Prompt

Use this after the first generation if the design looks too much like a marketing site:

```text
Make this feel more like a practical academic tool and less like a SaaS landing page. Keep the citation form and result preview visible above the fold. Reduce decorative sections. Make the manual fallback clear but secondary. Keep mobile focused on input, generate, preview, copy.
```

## Export Notes Prompt For MCP Agent

After generating the design and connecting Stitch MCP in your IDE, ask the agent:

```text
Use the Stitch MCP to fetch my APA Citation Generator design. Extract the design tokens, typography, colors, spacing, layout rules, and component states. Generate a DESIGN.md file and compare it against the local files design-source.md and frontend-handoff.md.
```
