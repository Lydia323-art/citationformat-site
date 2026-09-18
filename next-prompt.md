# Next Prompt

你现在执行 ShipSolo 做站流水线的「前端 + 后端实现」阶段。

项目：apa-citation-generator
当前阶段：07-frontend / 08-backend
目标市场：US / English，Philippines / English
上游输入：

- `project-control.md`
- `prd.md`
- `route-contract.md`
- `data-contract.md`
- `copy-freeze.md`
- `seo-meta.md`
- `faq.md`
- `privacy.md`
- `terms.md`
- `cookie-policy.md`
- `claims-policy.md`
- `design-source.md`
- `content-fit-matrix.md`
- `frontend-handoff.md`

请严格按 frontend-site-automation 和 backend-auto-site-cloudflare-workers 执行：

1. 不重写 PRD、SEO 文案、合规声明或设计结构。
2. 实现首页 tool-first MVP：DOI input、manual journal article form、result preview、copy buttons、empty/loading/success/error/partial metadata/copy success 状态。
3. 实现 Crossref DOI lookup Worker：`GET /api/doi?doi=<encoded-doi>`，带缓存、基础校验、错误码；`mailto` 标 `[待确认]`，可先用环境变量占位。
4. 实现 `/privacy/`、`/terms/`、`/cookie-policy/`，footer 链接不能 404。
5. 实现或至少准备 `/apa-citation-generator-pdf/`、`/apa-format/`、`/science-direct-apa-citation/`；ScienceDirect 页面必须保留非官方声明。
6. 不实现 PDF upload、登录、支付、保存项目、AI writing upsell。
7. 本地验证桌面和移动端；记录可复现证据。
8. 不做生产部署，直到域名、Crossref mailto、owner review 明确。

最后一行只能是：[DONE] / [BLOCKED] / [NEEDS_REVIEW]。
