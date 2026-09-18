# Project Control Board

项目：apa-citation-generator
域名：citationformat.site
目标市场：US / English；Philippines / English
当前模式：automation_factory
当前状态：RUNNING
事实源：本目录内 project-control.md、stage-dag.md、kanban-plan.md、stage-status.md
创建日期：2026-09-18

## Project Launch Card

- 项目名：apa citation generator
- 英文 slug：apa-citation-generator
- 域名：citationformat.site
- 目标市场：US / English，Philippines
- 站点类型：工具站
- 种子关键词：
  - apa citation generator
  - apa citation generator pdf
  - apa citation generator free
  - apa format
  - sciencedirect apa citation generator
  - my bib apa citation generator
- 变现方式：首版免费，免登录，不接支付；后续参考广告 / premium export
- 禁止项：不冒充官方；不上传 PDF；不保存用户文件；不采集论文内容；不做付费订阅；不承诺 100% 正确
- 现在阶段：需求发现
- 第一版目标：做一个最小 MVP，先上线
- 资源状态：
  - GitHub：已有
  - Cloudflare：已有
  - GSC：已有
  - Bing：已有

## 当前策略

- 首页不直接硬打最宽的 `apa citation generator`，该词前排强站多，首版难度高。
- 首版切口建议：`APA 7 Citation Generator for PDFs, DOI, and Web Sources`。
- 主力场景：学生拿到 PDF / DOI / ScienceDirect 或 journal article 页面后，需要快速生成 APA 7 reference 和 in-text citation。
- 首版先做免费、免登录、可复制的工具，不先做账号、保存项目、多人协作或复杂文档管理。
- 已确认：允许 Crossref DOI lookup；首版不上传 PDF；ScienceDirect 只做非官方长尾页；免费免登录不保存文件。

## 学员只需要处理

- [x] 确认禁止项：不冒充官方、不上传 PDF、不保存文件、不采集论文内容、不接支付。
- [x] 选择或注册域名：citationformat.site。
- [x] 确认第一版是否允许调用 Crossref API 做 DOI metadata lookup。
- [x] 开通 `hello@citationformat.site` 邮箱路由，并用于 Crossref API `mailto` 参数。
- [x] 确认部署方式：GitHub 连接 Cloudflare Pages。
- [x] 到上线阶段时确认 Cloudflare Pages/Workers 生产部署和 DNS 绑定。
- [x] 完成本地 QA 截图和交互验收。
- [x] 通过 Owner Review。
- [x] 完成 Cloudflare 部署准备文件。
- [x] 初始化本地 Git 仓库并暂存文件。
- [x] 创建 GitHub 仓库并 push 初始 commit：c7a951a。
- [x] Cloudflare Pages 部署成功，最新部署 commit：f28f158。
- [x] 完成 citationformat.site DNS 接管和自定义域名绑定。
- [x] 对 https://citationformat.site 做 production smoke test。
- [x] Google Search Console sitemap 提交成功，发现 13 个 URL。
- [x] Bing Webmaster Tools sitemap 提交成功，发现 13 个 URL。
- [x] Cloudflare Crawler Hints 已开启。
- [x] Microsoft Clarity 项目已创建，Tracking ID：yk6m615qwt。
- [x] Google Analytics 4 数据流已创建，Measurement ID：G-XZE9JK3WRV。
- [ ] 到公开发布阶段时确认是否允许提交目录、发帖、外链。

## 自动流水线

- 00 adapter：codex-orchestrator-adapter，DONE
- 01 research：keyword-research-agent，DONE_LITE，需要关键词工具补证
- 02 PRD：product-definition-prd，DONE
- 03 pricing：site-pricing-calibration，DONE
- 04 compliance：student-site-compliance-pipeline，DONE
- 05 copy：site-copywriting-student，DONE
- 06 design：site-design-student，DONE_LITE，需要视觉截图复核
- 08 backend/data：backend-auto-site-cloudflare-workers，DONE_LOCAL
- 07 frontend：frontend-site-automation，DONE_LOCAL
- 10 SEO：seo-launch-workflow，READY
- 09 QA：student-site-qa-acceptance，DONE_LOCAL
- Deployment Prep：frontend-site-automation / backend-auto-site-cloudflare-workers，DONE_LOCAL
- 11 launch：site-ops-growth-launch，WAITING_DEPLOY_CONFIRMATION
- 14 observability：site-observability-and-launch-verification，WAITING_LAUNCH
- 12 review：site-data-review-iteration，WAITING_DATA

## 当前状态

- running：等待 GA4 部署后回传、上线观测；部署方式已确认为 GitHub 连接 Cloudflare Pages
- waiting：launch、review 数据
- blocked：关键词 volume/KD/CPC 未接入付费工具
- done：00 adapter；01 research-lite；02 PRD；03 pricing；04 compliance；05 copy；06 design-lite；07 frontend-local；08 backend-local
