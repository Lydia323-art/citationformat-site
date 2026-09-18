# Stage Status

| Stage | Skill | Status | Notes |
| --- | --- | --- | --- |
| 00 adapter | codex-orchestrator-adapter | DONE | 项目启动卡已转为 Codex 事实源 |
| 01 research | keyword-research-agent | DONE_LITE | 已做公开 SERP 轻量判断；缺 volume/KD/CPC/Trends 证据 |
| 02 PRD | product-definition-prd | DONE | PRD v1、Route Contract、Data Contract、First Version Scope 已生成 |
| 03 pricing | site-pricing-calibration | DONE | 首版免费，不接支付；广告 / premium export 后置 |
| 04 compliance | student-site-compliance-pipeline | DONE | Privacy / Terms / Cookie / claims policy 草稿已生成 |
| 05 copy | site-copywriting-student | DONE | SEO-Copy Freeze、SEO meta、FAQ 已生成 |
| 06 design | site-design-student | DONE_LITE | design-source、content-fit-matrix、frontend-handoff 已生成；缺 Stitch/Figma/截图验收 |
| 08 backend/data | backend-auto-site-cloudflare-workers | DONE_LOCAL | 本地 Node API 已实现 Crossref DOI lookup；正式 Cloudflare Worker 未部署 |
| 07 frontend | frontend-site-automation | DONE_LOCAL | 本地 MVP 已实现并可访问 http://localhost:4173/ |
| 10 SEO | seo-launch-workflow | READY | 可做本地 SEO 复核；域名未确认导致 canonical/sitemap 仍需上线前修正 |
| 09 QA | student-site-qa-acceptance | DONE_LOCAL | 本地桌面/移动截图、核心交互、13 路由、robots/sitemap 已验收；结论 CONDITIONAL_GO_LOCAL |
| Owner Review | owner | DONE | Owner 已确认通过，允许进入部署准备 |
| Deployment Prep | frontend-site-automation / backend-auto-site-cloudflare-workers | PAGES_DEPLOYED | Cloudflare Pages 已成功部署，当前可用 pages.dev；最新 commit f28f158 |
| Custom Domain | cloudflare-pages-github-deploy | DONE | citationformat.site Active，SSL enabled，正式域名 smoke test 已通过 |
| 11 launch | site-ops-growth-launch | WAITING_SEARCH_SUBMISSION | 等 Email Routing、GSC/Bing sitemap 提交和上线观测 |
| 14 observability | site-observability-and-launch-verification | WAITING | 等上线 |
| 12 review | site-data-review-iteration | WAITING | 等数据 |

## 状态说明

- `DONE_LITE`：足够推进下游草案，但上线前还需要补证。
- 当前不阻塞 Cloudflare 设置；阻塞生产上线的是 Cloudflare Pages 项目创建、邮箱路由、Crossref mailto 和生产 smoke。
