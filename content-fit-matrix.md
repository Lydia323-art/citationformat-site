# Content Fit Matrix

项目：apa-citation-generator
阶段：06-design
状态：NEEDS_REVIEW

## Homepage `/`

| Content | Source | Design Placement | Desktop Rule | Mobile Rule | Risk |
| --- | --- | --- | --- | --- | --- |
| H1: Free APA 7 Citation Generator | copy-freeze.md | Above tool | Max width 720px, one or two lines | Full width, natural wrap | Must not be hidden inside card |
| Subhead | copy-freeze.md | Under H1 | Max width 780px | Under H1 before tool | Keep short, no extra claims |
| DOI input | copy-freeze.md / data-contract.md | Left tool panel | Visible above fold | First control after subhead | Must not be below SEO content |
| Manual form intro | copy-freeze.md | Left tool panel below DOI path | Visible as section header | Accordion or visible block | Must not feel hidden |
| Result labels | copy-freeze.md | Right result panel | Beside form | Below Generate button | Empty state required |
| Empty state | copy-freeze.md | Result panel | Always shown before generate | Always shown before generate | Avoid blank preview |
| Loading state | copy-freeze.md | Result panel | Replace result body | Replace result body | Needs accessible text |
| DOI not found | copy-freeze.md | Warning + manual form CTA | Top of result panel | Above manual form | Must preserve entered DOI |
| Partial metadata warning | copy-freeze.md | Warning banner | Above result sections | Above result sections | Must not block copy |
| How it works | copy-freeze.md | Below tool | 3 compact columns | 3 stacked steps | Keep below tool |
| Use cases | copy-freeze.md | Below How it Works | Compact cards | Stacked cards | Avoid decorative card wall |
| APA 7 notes | copy-freeze.md | Guide block | Narrow text column | Full width | Link back to tool |
| FAQ | faq.md | Accordion near bottom | 2-column not needed | Single column | Must be indexable |
| Footer legal | route-contract.md | Footer | Inline links | Stacked or wrapped | Must not 404 |

## `/apa-citation-generator-pdf/`

| Content | Source | Placement | Notes |
| --- | --- | --- | --- |
| H1 | copy-freeze.md | Top | No PDF upload promise |
| No upload statement | compliance-report.md | Early notice | Must appear above CTA |
| DOI guidance | copy-freeze.md | Main content | Explain where DOI appears in PDF |
| Manual checklist | route-contract.md | Main content | Author, year, title, journal, volume, issue, pages |
| CTA | copy-freeze.md | Mid and bottom | Link to homepage tool |
| FAQ | faq.md | Bottom | Include PDF-specific questions |

## `/apa-format/`

| Content | Source | Placement | Notes |
| --- | --- | --- | --- |
| H1 | copy-freeze.md | Top | Guide page |
| APA 7 basics | copy-freeze.md | Main content | Concise, not textbook length |
| Reference example | route-contract.md | Example block | Include visual formatting |
| In-text example | route-contract.md | Example block | Parenthetical and narrative |
| CTA | copy-freeze.md | Mid and bottom | Return to generator |
| FAQ | faq.md | Bottom | Keep practical |

## `/science-direct-apa-citation/`

| Content | Source | Placement | Notes |
| --- | --- | --- | --- |
| H1 | copy-freeze.md | Top | Do not imply official status |
| Non-affiliation disclaimer | claims-policy.md | Immediately under intro | Required |
| DOI-first workflow | route-contract.md | Main content | Show steps |
| Manual fallback | route-contract.md | Main content | Checklist |
| CTA | copy-freeze.md | Mid and bottom | Link to generator |
| FAQ | faq.md | Bottom | Include non-affiliation answer |

## Legal Pages

| Content | Source | Placement | Notes |
| --- | --- | --- | --- |
| Privacy | privacy.md | `/privacy/` | readable 720px width |
| Terms | terms.md | `/terms/` | readable 720px width |
| Cookie Policy | cookie-policy.md | `/cookie-policy/` | mark analytics pending if not enabled |

## Global Fit Rules

- Do not delete SEO copy to simplify design.
- Long guide copy goes below the tool, not before it.
- Tool controls must have stable dimensions.
- Buttons must fit full labels on mobile.
- Result preview must have a meaningful empty state.
- All compliance disclaimers must remain visible on relevant routes.

[NEEDS_REVIEW]
