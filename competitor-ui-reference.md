# Competitor UI Reference

项目：apa-citation-generator
阶段：06-design
状态：DONE

## Sources Checked

- Scribbr APA Citation Generator：https://www.scribbr.com/citation/generator/apa/
- MyBib APA Citation Generator：https://www.mybib.com/tools/apa-citation-generator
- QuillBot APA Citation Generator：https://quillbot.com/citation-generator/apa
- Grammarly APA Citation Generator：https://www.grammarly.com/citations/apa

## Shared Structure Pattern

The strongest competitors put the citation tool near the top of the page, then use the rest of the page for trust, feature explanation, citation education, and internal SEO links.

Common structure:

1. Compact nav.
2. H1 for APA citation generator.
3. Short promise/subhead.
4. Search/input or citation form above the fold.
5. Manual citation fallback.
6. Feature/trust section.
7. APA guide content.
8. FAQ / related citation links.
9. Footer legal/product links.

## Competitor Notes

### Scribbr

- Strongest reference for information architecture.
- Uses H1, short trust line, search input by title/URL/DOI/ISBN/keywords, primary cite action, and manual cite fallback.
- Below the tool it layers Chrome extension, feature proof, APA 6/7 support, export, guide content, and FAQ-style education.
- What to borrow: top search/tool-first layout, manual fallback, in-text citation education.
- What to avoid: too much product ecosystem content for MVP.

### MyBib

- Strong simple educational landing structure.
- H1 and updated freshness signal, then explanatory blocks: what it is, who uses it, why use it, how to use it.
- CTA appears again lower on page.
- What to borrow: plain student-friendly explanation and concise how-to.
- What to avoid: broad bibliography/account flow as the first version.

### QuillBot

- Strong direct utility intent.
- Top search input with Cite action plus Upload PDF and Cite manually options.
- Below the tool: why use it, benefits, free/use quickly/edit/download.
- What to borrow: source search + manual fallback pattern.
- What to avoid: Upload PDF in MVP, because we decided not to upload files.

### Grammarly

- Strong manual form pattern.
- Starts with citation style selector, source selector, contributor fields, citation preview, copy action.
- Below the tool it transitions into writing-product promotion and APA guide content.
- What to borrow: two-column form + live preview idea, full citation/in-text citation switch.
- What to avoid: AI-writing upsell and broad product CTA in first version.

## Design Direction For Our MVP

Use a tool-first interface with a compact academic utility feel:

1. Header: small brand, Generator, PDF Citation, APA Format, FAQ, legal footer only.
2. Top section: H1 + one-sentence subhead + tool panel immediately visible.
3. Tool panel:
   - Source tabs: DOI, Journal Article.
   - DOI input as primary path.
   - Manual entry as fallback, not hidden.
   - Results panel beside form on desktop and below form on mobile.
   - Output tabs or sections: Reference, In-text, Narrative.
4. Below tool:
   - How it works.
   - PDF citation note.
   - APA 7 basics.
   - FAQ.
5. No large decorative hero, no login CTA, no upload PDF button.

## Layout Recommendation

Desktop:

- Max width: 1120-1200px.
- Above fold: left 56% input/form, right 44% output preview.
- H1/subhead sits above tool, not inside a marketing card.
- Results panel should be sticky within the tool area if feasible.

Mobile:

- H1, DOI input, Generate button, output preview in one vertical flow.
- Manual fields in an accordion or progressive section.
- Copy buttons full width.
- FAQ below core tool.

## Component Requirements

- Source tab control.
- DOI input.
- Manual article form.
- Add author control.
- Generate button.
- Result preview panel.
- Copy buttons.
- Warning banner for partial metadata.
- Error block for DOI not found.
- Example citation state.
- FAQ accordion.

## Differentiation

We should not compete by looking like a large writing suite. The first version should feel smaller, faster, and more focused:

- DOI/PDF/article task emphasis.
- No PDF upload.
- No account.
- No broad AI writing assistant pitch.
- Clear APA 7 wording.
- Independent/non-official disclaimers where needed.

[DONE]
