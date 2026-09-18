# Pricing Plan

项目：apa-citation-generator
阶段：03-pricing
状态：DONE

## 当前结论

首版采用 Free 工具站模型，不接支付，不做订阅，不做 Lifetime。先用免费工具获得自然搜索流量和真实使用数据，再决定是否加入广告或 premium export。

## 产品一句话

Free APA 7 citation generator for DOI, PDFs, and journal article sources.

## 目标用户

- US college students.
- Philippines college students.
- Graduate students / research assistants with DOI and journal article sources.

## 竞品锚点

- MyBib / Scribbr / QuillBot / Grammarly 等竞品都提供免费 citation generator 入口。
- 直接收费会降低首版工具词转化。
- 首版差异化应放在 PDF / DOI / journal article 场景，而不是套餐复杂度。

## 成本假设

- Crossref REST API：免费；应配置 `mailto`、缓存和限流。
- 前端静态托管：Cloudflare Pages，首版成本可控。
- Worker DOI lookup：边际成本低，但需要防滥用。
- 无登录、无数据库、无文件上传，首版没有用户数据存储成本。

## 套餐选择

### MVP

- Plan：Free
- Price：$0
- Login：not required
- Payment：none
- Limits：reasonable abuse protection, not user-facing paid quota
- CTA：Generate APA Citation

### Later Option A：Ads

- Trigger：页面有稳定自然流量后再评估。
- Placement：不要干扰工具首屏和 copy 按钮。
- Compliance：Privacy / Cookie / ad disclosure 需要同步更新。

### Later Option B：Premium Export

- Possible features：
  - Save reference list
  - Export to Word / Google Docs
  - No ads
  - Citation checking
- Payment：not first version

## 免费额度

首版不写“unlimited”。页面可写：

> Generate APA citations for free. To keep the tool reliable, automated or abusive requests may be limited.

## CTA

- Primary：Generate APA Citation
- Secondary：Try an Example
- Output CTA：Copy Reference
- Error CTA：Enter Details Manually

## 给后端的输入

- 不需要 entitlement。
- 需要 Worker-level rate limiting。
- 需要 Crossref lookup cache。
- 需要 failure fallback。

## 给 QA 的输入

- 免费用户无需登录即可生成。
- 无 checkout、billing、refund 流程。
- 滥用限制不能阻断正常手动测试。

## 风险 / 待确认

- P1：广告上线前必须补 Cookie / ads disclosure。
- P2：没有 volume/KD/CPC 数据，商业化节奏应依赖上线后真实 impressions / usage。
- P2：后续 premium export 需要重新设计登录、支付、退款、数据保留。

[DONE]
