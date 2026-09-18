# Compliance Report

项目：apa-citation-generator
阶段：04-compliance
状态：DONE

## 当前结论

首版可进入文案和设计。合规边界是：不上传 PDF、不保存论文内容、不接支付、不冒充官方；Crossref DOI lookup 和基础 analytics 需要在 Privacy 中披露。

## 站点功能清单

- DOI lookup。
- Manual journal article form。
- APA 7 reference output。
- In-text citation output。
- Copy buttons。
- FAQ / guide content。
- Privacy / Terms。

## 数据收集项

### 用户主动输入

- DOI。
- 手动填写的作者、年份、标题、期刊、卷期、页码、URL。

### 第三方发送

- DOI 会发送到 Crossref REST API 查询 metadata。

### 不收集 / 不保存

- 不上传 PDF。
- 不保存 PDF。
- 不保存论文全文。
- 不创建用户账号。
- 不保存 bibliography projects。
- 不接收付款信息。

### 自动采集

- 可采集匿名 analytics event，例如 page view、generate、copy、error type。
- 如使用 GA4 / Clarity / Ads，需要在 Privacy / Cookie 中更新。

## 第三方服务映射

| Service | Purpose | Data shared | Page disclosure |
| --- | --- | --- | --- |
| Crossref | DOI metadata lookup | DOI only | Privacy, Terms |
| Cloudflare | Hosting / Worker / CDN | operational logs | Privacy |
| Analytics tool TBD | Usage analytics | anonymous events, device/browser metadata | Privacy / Cookie |
| Ads TBD | Future monetization | ad identifiers if enabled | Cookie / ads disclosure |

## 法律页路由

- `/privacy/`
- `/terms/`
- `/cookie-policy/` only required before analytics/ads cookies beyond essential operations.
- `/refund-policy/` not required for MVP because no payment.

## 禁用表达

Do not write:

- Official APA citation generator.
- Official ScienceDirect citation generator.
- Endorsed by APA / ScienceDirect / Crossref / MyBib / Scribbr.
- 100% accurate.
- Guaranteed accepted by your professor.
- Unlimited citations.
- Permanently free.
- We store nothing at all. Use the narrower claim: no PDF upload and no saved bibliography in MVP.

## Required disclaimers

General:

> Citation formats can vary by institution or instructor. Review the generated citation before submitting your work.

ScienceDirect page:

> This tool is not affiliated with or endorsed by ScienceDirect.

Brand / standards:

> APA is a publication style and trademark of its respective owner. This site is an independent citation tool.

## Risk grading

- P0：None for MVP if no upload, no payment, no login.
- P1：ScienceDirect page must include non-affiliation disclaimer.
- P1：Privacy must disclose Crossref DOI lookup.
- P1：Analytics / ads require Privacy/Cookie update before enabling.
- P2：Citation accuracy should be framed as formatted assistance, not a guarantee.

## QA compliance checks

- Footer links to Privacy and Terms do not 404.
- ScienceDirect page includes disclaimer above or near the tool/CTA.
- No page claims official endorsement.
- Privacy page matches actual data flow.
- Terms include citation accuracy disclaimer.
- No PDF upload component appears in MVP.

[DONE]
