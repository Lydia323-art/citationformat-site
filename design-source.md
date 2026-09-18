# Design Source

项目：apa-citation-generator
阶段：06-design
状态：NEEDS_REVIEW
说明：本文件是可实现设计真源和页面生成说明。当前未接 Stitch/Figma，也未做截图验收，因此不能标最终 Design DONE。

## 1. Design Direction

Build a quiet academic utility, not a SaaS marketing page.

The page should feel:

- Fast: users can start with DOI immediately.
- Trustworthy: neutral academic styling, clear legal boundaries.
- Dense but calm: the tool is visible above the fold without feeling cramped.
- Student-friendly: simple copy, visible fallback, no account or upload anxiety.

## 2. Visual Style Rationale

### Option A: Academic Utility

- Colors: paper background, ink text, muted blue/green actions.
- Density: medium-high, designed for repeated task use.
- Fit: best match for a citation generator.
- Decision: selected.

### Option B: Modern SaaS Landing

- Colors: bright gradients, large hero, oversized feature cards.
- Density: low, marketing-first.
- Fit: poor for this project because the core task must happen immediately.
- Decision: rejected.

### Option C: Writing Assistant Suite

- Colors: polished app UI, broad tool navigation, upsell sections.
- Density: medium, but tends to push the generator into a product ecosystem.
- Fit: useful for form/preview patterns, not for the whole page.
- Decision: borrow form/preview only.

## 3. Design Tokens

### Colors

- `--color-bg`: `#f7f5ef`
- `--color-surface`: `#ffffff`
- `--color-surface-muted`: `#f0ede5`
- `--color-text`: `#1f2933`
- `--color-text-muted`: `#5f6b76`
- `--color-border`: `#d8d3c8`
- `--color-primary`: `#25636f`
- `--color-primary-hover`: `#1e515c`
- `--color-accent`: `#8b5e34`
- `--color-success`: `#287a4d`
- `--color-warning`: `#946200`
- `--color-error`: `#b42318`
- `--color-focus`: `#2f80ed`

Palette note: balanced paper / ink / teal / warm accent. Avoid purple gradients, one-note beige, or generic dark SaaS blue.

### Typography

- Body font: system UI stack, e.g. `Arial`, `Helvetica Neue`, `Segoe UI`, sans-serif.
- Serif accent for result preview only: `Georgia`, serif.
- Base size: `16px`.
- H1 desktop: `40px`, line-height `1.12`.
- H1 mobile: `30px`, line-height `1.15`.
- H2: `26px`.
- H3: `18px`.
- Small/help text: `14px`.
- Letter spacing: `0`.

### Radius / Borders / Shadows

- Main panels: `8px` radius.
- Inputs/buttons: `6px` radius.
- Cards: `8px` radius max.
- Border: 1px solid `--color-border`.
- Shadow: subtle only, `0 10px 30px rgba(31, 41, 51, 0.08)`.

### Spacing

- Page max width: `1180px`.
- Desktop section vertical spacing: `56px`.
- Mobile section vertical spacing: `36px`.
- Panel padding desktop: `24px`.
- Panel padding mobile: `16px`.
- Form gap: `14px`.
- Compact control height: `44px`.

## 4. Global Page Shell

### Header

Desktop:

- Height: `64px`.
- Left: text brand, `APA Citation Generator`.
- Right nav: Generator, PDF Citation, APA Format, FAQ.
- No login, no pricing, no account CTA.

Mobile:

- Height: auto, compact two-row if needed.
- Brand first row, nav scroll or wrap below.
- Do not use hamburger unless implementation already has a nav component.

### Footer

- Links: Privacy, Terms, Cookie Policy.
- Short disclaimer: Independent citation tool. Review citations before submitting.

## 5. Homepage Design

Route: `/`

UI references:

- Scribbr: tool-first IA.
- Grammarly: form + preview.
- MyBib: plain educational sections.
- QuillBot: quick utility entry, but no PDF upload.

### Above The Fold

Layout desktop:

```text
[Header]

H1 + subhead

[Tool grid: 56% form / 44% result preview]
```

The H1 and subhead sit above the tool grid, not inside a decorative card.

Left panel: Citation input

- Source tabs: DOI, Journal Article.
- DOI input row: label, input, Generate button.
- Help text below input.
- Manual form visible below DOI path or as a large secondary section.
- Fields: authors, year, title, journal, volume, issue, pages, DOI, URL.
- Button row: Generate APA Citation, Try an Example.

Right panel: Citation preview

- Header: Your citation.
- Empty state text.
- Result sections:
  - Reference citation.
  - In-text citation.
  - Narrative citation.
- Copy button per section.
- Warning banner area.

### Tool Grid Desktop

- CSS grid: `grid-template-columns: minmax(0, 1.15fr) minmax(340px, 0.85fr)`.
- Gap: `20px`.
- Result panel can be sticky at top of tool grid when content grows.
- The right panel must never be empty; show example or empty state.

### Tool Grid Mobile

- Single column.
- Order: H1, subhead, DOI input, Generate button, result preview, manual form, guide content.
- Copy buttons full width.
- Manual form can use collapsible section but must be visible as a fallback.

## 6. Component Specs

### Source Tabs

- Use segmented control.
- Active: DOI.
- Inactive: Journal Article.
- Website / Book should not appear active unless implemented.

### DOI Input

- Label: Enter a DOI.
- Placeholder: `10.1037/0003-066X.59.1.29`.
- Help text from Copy Freeze.
- Invalid DOI shows inline error below field.

### Manual Form

Fields:

- Author given name.
- Author family name.
- Add author button.
- Year.
- Article title.
- Journal title.
- Volume.
- Issue.
- Pages.
- DOI.
- URL.

Field grouping:

- Authors.
- Publication details.
- Location details.

### Result Preview

Use a lighter paper-like result area inside white surface.

Reference citation uses serif preview text for readability. Labels and buttons use sans-serif.

Required states:

- Empty.
- Loading.
- Success.
- Partial metadata.
- DOI not found.
- Invalid DOI.
- Network error.
- Copy success.

### Warning Banner

- Partial metadata: amber.
- DOI not found: red/amber with manual fallback CTA.
- Network error: red with retry and manual fallback.

### FAQ Accordion

- Simple disclosure rows.
- Must be keyboard accessible.
- Do not hide all SEO copy behind JS if no server-rendered fallback.

## 7. Page Sections

### How It Works

Three compact steps in a horizontal row on desktop, vertical on mobile.

Do not use large icon cards. Use small numbered markers.

### Use Cases

Three compact cards:

- Cite a PDF source.
- Cite a journal article.
- Cite from an article page.

Cards should be informational, not decorative.

### APA 7 Notes

Small guide block with format pattern and CTA back to the tool.

### FAQ

Use the FAQ copy from `faq.md`.

### Bottom CTA

Small band, not a hero:

- Text: Ready to create an APA citation?
- Button: Generate APA Citation.

## 8. Supporting Route Designs

### `/apa-citation-generator-pdf/`

Structure:

1. H1.
2. Short explanation: use DOI from the PDF or manually enter details.
3. Clear notice: This tool does not upload or store PDF files in the MVP.
4. Steps for finding DOI in a PDF.
5. CTA block linking to homepage tool or embedded compact DOI input.
6. FAQ.

Reference: MyBib education flow + direct generator CTA.

### `/apa-format/`

Structure:

1. H1.
2. Short definition of APA 7 format.
3. Reference example.
4. In-text citation example.
5. Common missing fields note.
6. CTA back to generator.
7. FAQ.

Reference: MyBib / Scribbr guide structure.

### `/science-direct-apa-citation/`

Structure:

1. H1.
2. Disclaimer near top: This tool is not affiliated with or endorsed by ScienceDirect.
3. DOI-first workflow.
4. Manual fallback checklist.
5. CTA to generator.
6. FAQ.

Do not use ScienceDirect logos, colors, or official-looking marks.

### Legal Pages

Simple text pages with readable width `720px`.

## 9. Accessibility

- All inputs have labels.
- Copy buttons have clear accessible names.
- Focus ring uses `--color-focus`.
- Text contrast must pass WCAG AA.
- Warnings are not color-only; include icon or label text.
- Keyboard users can tab through form, generate, copy, and FAQ.

## 10. Asset Policy

- No remote decorative stock images for MVP.
- Use text, form UI, result preview, and small system icons only.
- If icons are used in implementation, use lucide icons:
  - Copy
  - Check
  - AlertCircle
  - Search
  - FileText
  - BookOpen

## 11. Anti-Patterns

- No oversized hero.
- No purple gradient SaaS look.
- No PDF upload button.
- No login / pricing CTA.
- No official-looking APA or ScienceDirect branding.
- No feature-card wall before the tool.
- No hidden manual fallback.
- No text truncation inside buttons or form panels.

## 12. Design QA Checklist

- Desktop above fold shows tool and result preview.
- Mobile can complete DOI -> generate -> copy without layout overflow.
- Error and warning states are visible and understandable.
- Footer legal links are visible.
- ScienceDirect page has disclaimer.
- SEO sections from Copy Freeze are represented.
- No competitor text or brand styling copied.

[NEEDS_REVIEW]
