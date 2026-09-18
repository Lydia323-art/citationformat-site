# SEO Page Expansion

项目：apa-citation-generator
阶段：10-seo
状态：DONE_LOCAL
日期：2026-09-18

## 结论

已从 7 个 sitemap URL 扩展到 13 个 sitemap URL。新增页面不是空壳页，均有明确搜索意图、内链入口和回到核心工具的 CTA。

## 新增页面

| Route | Intent | Primary keyword | CTA |
| --- | --- | --- | --- |
| `/apa-7-citation-generator/` | APA 7 edition-specific generator | apa 7 citation generator | Generate APA 7 Citation |
| `/doi-to-apa-citation/` | DOI lookup task | doi to apa citation | Convert DOI to APA |
| `/journal-article-citation-generator/` | Journal article source task | journal article citation generator | Generate Journal Article Citation |
| `/apa-in-text-citation-generator/` | In-text citation task | apa in text citation generator | Generate In-Text Citation |
| `/apa-reference-generator/` | Reference-list task | apa reference generator | Create APA Reference |
| `/apa-citation-examples/` | Examples / SERP support | apa citation examples | Try the Generator |

## Sitemap

Updated file:

- `site/public/sitemap.xml`

Current sitemap count：13 URLs

## Local Verification

All routes returned HTTP 200 locally:

- `/`
- `/apa-citation-generator-pdf/`
- `/apa-7-citation-generator/`
- `/doi-to-apa-citation/`
- `/journal-article-citation-generator/`
- `/apa-in-text-citation-generator/`
- `/apa-reference-generator/`
- `/apa-citation-examples/`
- `/apa-format/`
- `/science-direct-apa-citation/`
- `/privacy/`
- `/terms/`
- `/cookie-policy/`
- `/sitemap.xml`

## Remaining Launch Fix

Before production, replace `https://example.com/` in sitemap with the real domain.

[DONE_LOCAL]
