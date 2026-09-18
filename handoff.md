# 全流程主持台交接摘要

## 当前结论

- 状态：[NEEDS_REVIEW]
- 一句话结论：设计文档和前端 handoff 已完成到可实现程度；因未接 Stitch/Figma 和截图验收，设计阶段标 `DONE_LITE`，下一步可进入前端/后端 MVP 预览实现。

## 关键输入

- 项目：apa-citation-generator
- 当前阶段：06-design -> 07/08 implementation
- 上游资料：PRD v1.1；Route Contract；Data Contract；Copy Freeze；Compliance；Competitor UI Reference

## 本阶段交付物

- 文件/内容：
  - project-control.md
  - stage-dag.md
  - kanban-plan.md
  - stage-status.md
  - blocked-log.md
  - research-opportunity-report.md
  - prd.md
  - route-contract.md
  - data-contract.md
  - pricing-plan.md
  - compliance-report.md
  - copy-freeze.md
  - seo-meta.md
  - faq.md
  - competitor-ui-reference.md
  - design-source.md
  - content-fit-matrix.md
  - frontend-handoff.md
- 核心判断：
  - 首页必须 tool-first，参考 Scribbr IA + Grammarly form/preview。
  - 首屏桌面为左输入/右结果预览，移动端为输入 -> 生成 -> 预览 -> 复制。
  - 不做 PDF upload、登录、付费、AI writing upsell。
  - ScienceDirect 页面必须保留非官方声明。
- 已确认项：
  - PRD v1.1 已冻结。
  - SEO-Copy Freeze 已完成。
  - 设计 handoff 已具备实现输入。
- 待确认项：
  - 域名
  - Crossref mailto 邮箱
  - 是否用 Stitch/Figma 做视觉截图复核
  - Analytics / ads 是否上线首版

## 质量门槛自检

- 通过项：页面结构、设计 tokens、组件状态、内容适配矩阵、前端 handoff 已完成。
- 未通过项：未生成 Figma/Stitch 设计图；未做桌面/移动截图视觉验收；未跑真实前端实现。

## 风险

- P0：域名/DNS 未准备，生产上线会阻塞。
- P1：Crossref mailto 未确认，正式 Worker 上线前应配置。
- P1：引用格式准确性需要开发阶段用测试样例验证。
- P1：设计没有截图验收，前端实现后必须用桌面/移动视口复核。
- P2：广告和 analytics 若启用，需要补 Cookie/Privacy 细节。

## 给下游的最小必要信息

- 下一阶段：前端 + 后端实现。
- 必须读取：
  - prd.md
  - route-contract.md
  - data-contract.md
  - copy-freeze.md
  - seo-meta.md
  - faq.md
  - compliance-report.md
  - design-source.md
  - content-fit-matrix.md
  - frontend-handoff.md
- 不能假设：
  - 不能假设域名已注册。
  - 不能假设 Crossref mailto 已配置。
  - 不能加入 PDF upload。
  - 不能删除法律页或 ScienceDirect disclaimer。
- 建议启动 Prompt：见 next-prompt.md
