# Kanban Plan

## 00-adapter

- task_id：APA-00
- stage：00-adapter
- skill：codex-orchestrator-adapter
- owner：codex
- input_paths：聊天中的 Project Launch Card
- output_paths：project-control.md、stage-dag.md、kanban-plan.md、stage-status.md、blocked-log.md
- gate：固定状态词、阻塞项、下一阶段明确
- blocked_if：缺少项目名、关键词、市场、站点类型
- downstream：01-research
- status：DONE

## 01-research

- task_id：APA-01
- stage：01-research
- skill：keyword-research-agent
- owner：codex
- input_paths：project-control.md
- output_paths：research-opportunity-report.md
- gate：SERP 竞品、用户切面、机会分级、PRD 最小输入
- blocked_if：没有关键词、没有目标市场
- downstream：02-PRD
- status：DONE_LITE

## 02-PRD

- task_id：APA-02
- stage：02-PRD
- skill：product-definition-prd
- owner：codex
- input_paths：project-control.md、research-opportunity-report.md
- output_paths：prd.md、route-contract.md、data-contract.md、first-version-scope.md、visual-style-brief.md
- gate：canonical URL、核心用户任务、NOT-DO、MVP 范围
- blocked_if：主关键词切口未选
- downstream：03-pricing、04-compliance、05-copy
- status：DONE

## 03-pricing

- task_id：APA-03
- stage：03-pricing
- skill：site-pricing-calibration
- owner：codex
- input_paths：prd.md、research-opportunity-report.md
- output_paths：pricing-plan.md
- gate：Free/Ad/Premium 方案不亏损，首版不阻塞转化
- blocked_if：商业化目标完全未定且需要接支付
- downstream：copy、compliance
- status：DONE

## 04-compliance

- task_id：APA-04
- stage：04-compliance
- skill：student-site-compliance-pipeline
- owner：codex
- input_paths：prd.md、data-contract.md、route-contract.md
- output_paths：privacy.md、terms.md、cookie-policy.md、claims-policy.md
- gate：上传文件、第三方 API、广告、品牌词风险说明
- blocked_if：要收集真实用户文件但没有隐私策略
- downstream：copy、QA、launch
- status：DONE

## 05-copy

- task_id：APA-05
- stage：05-copy
- skill：site-copywriting-student
- owner：codex
- input_paths：prd.md、route-contract.md、pricing-plan.md、compliance notes
- output_paths：copy-freeze.md、seo-meta.md、faq.md
- gate：Title/meta/H1/H2/FAQ/schema 文案冻结
- blocked_if：PRD 未冻结
- downstream：design
- status：DONE

## 06-design

- task_id：APA-06
- stage：06-design
- skill：site-design-student
- owner：codex
- input_paths：copy-freeze.md、route-contract.md
- output_paths：design-source.md、content-fit-matrix.md、frontend-handoff.md
- gate：桌面/移动端、空状态、错误状态、结果状态齐全
- blocked_if：Copy Freeze 未完成
- downstream：frontend
- status：DONE_LITE

## 07/08-implementation

- task_id：APA-07
- stage：frontend/backend
- skill：frontend-site-automation、backend-auto-site-cloudflare-workers
- owner：codex
- input_paths：frontend-handoff.md、data-contract.md
- output_paths：site source、deployment notes
- gate：工具可用、移动端可用、引用结果准确、无控制台 P0/P1
- blocked_if：没有 Route Contract、Data Contract 或 Frontend Handoff
- downstream：SEO、QA
- status：DONE_LOCAL

## 09-launch

- task_id：APA-09
- stage：QA/launch
- skill：student-site-qa-acceptance、seo-launch-workflow、site-ops-growth-launch
- owner：codex + owner review
- input_paths：deploy preview、QA evidence
- output_paths：qa-report.md、launch-gates.md、review-plan.md
- gate：QA_GO + Owner Review + 生产部署证据
- blocked_if：域名、DNS、Cloudflare 部署或公开发布未确认
- downstream：data review
- status：WAITING
