# Blocked Log

## B001：域名未准备

- 类型：域名 / DNS
- 影响：不阻塞 PRD、设计、开发预览；阻塞正式生产上线、GSC/Bing 站点验证、品牌一致性。
- 你要做什么：后续从候选域名中选择并注册。
- 做完后回复：`域名已注册：<domain>`
- 系统会自动继续的阶段：launch / observability
- 状态：OPEN

## B002：禁止项待确认

- 类型：合规 / 品牌 / 数据
- 影响：已解除，不阻塞 PRD、合规或文案。
- 已确认：
  - 首版不冒充 APA、ScienceDirect、MyBib、Scribbr、Crossref 官方。
  - 首版不上传 PDF。
  - 首版不保存用户文件或论文内容。
  - 首版不接支付。
  - ScienceDirect 长尾页必须加非官方声明。
- 状态：CLOSED

## B003：关键词工具证据缺失

- 类型：关键词工具 / 数据证据
- 影响：不阻塞 MVP；影响 Research Gate 的完整性和 SEO 优先级排序。
- 当前降级：用公开 SERP + 竞品页面做轻量研究。
- 解锁方式：接入 Ahrefs/Semrush/DataForSEO/discoverkeywords.co 任一，或人工提供 volume/KD/CPC 截图。
- 状态：OPEN

## B004：Crossref / DOI lookup 许可待确认

- 类型：第三方 API / 技术策略
- 影响：已解除，PRD 已按 DOI 自动填充 + 手动 fallback 设计。
- 已确认：允许 DOI lookup / Crossref API。
- 状态：CLOSED

## B005：Crossref mailto 邮箱待确认

- 类型：第三方 API / 运维标识
- 影响：不阻塞 PRD、设计、开发；上线前建议配置，便于 Crossref 识别正常使用。
- 你要做什么：提供一个公开联系邮箱，或确认后续用站点域名邮箱。
- 做完后回复：`Crossref 邮箱：<email>`
- 状态：OPEN
