# PRD v1.1

项目：apa-citation-generator
阶段：02-product
状态：DONE
日期：2026-09-18
本次更新：补充竞品 UI 结构参考，重写页面矩阵和首页 tool-first 要求。

## 1. 一句话定位

Free APA 7 citation generator for students who need to turn a DOI, PDF source, or journal article page into a clean reference citation and in-text citation.

## 2. 已冻结决策

- 首版允许 Crossref DOI lookup。
- Crossref API 免费使用，不需要 API key；请求应带 `mailto`，并做缓存与限流。
- 首版不上传 PDF，不保存 PDF，不采集用户论文内容。
- PDF 场景通过 DOI 输入、手动表单和说明文案承接。
- 允许做 ScienceDirect 长尾页，但必须写清本站非 ScienceDirect 官方、非其背书。
- 首版免费、免登录、不接支付、不保存用户文献库。
- 首页必须是 tool-first，不做普通营销 landing page。
- 界面结构参考 Scribbr / Grammarly / MyBib / QuillBot，但只借鉴信息架构和组件模式，不照搬文案、品牌和视觉。

## 3. ICP

### 主 ICP

US / Philippines college students writing APA 7 assignments.

他们的核心任务是：在赶作业时，把 DOI、PDF 里的文章信息、或 journal article 页面快速转成 APA 7 reference 和 in-text citation。

### 次 ICP

- Graduate students and research assistants：更在意 DOI / journal article metadata 准确性。
- Instructors and tutors：需要给学生一个轻量、免登录的引用演示工具。

### 暂不服务

- 需要完整文献管理的研究者。
- 需要团队协作、同步、插件、批量导入的重度用户。
- 需要 MLA、Chicago、Harvard 等多格式用户。

## 4. 用户任务

### P0 任务

用户输入 DOI，点击 Generate，得到：

- APA 7 reference citation
- Parenthetical in-text citation
- Narrative in-text citation
- Copy buttons
- DOI 查不到时的手动补全路径

### P1 任务

用户没有 DOI，但有 PDF 或 article 页面里的信息，手动填写：

- authors
- year
- title
- journal
- volume
- issue
- pages
- DOI or URL

然后生成同样的 APA 7 输出。

### P2 任务

用户阅读简短规则和 FAQ，知道：

- PDF 如何引用
- DOI 查不到怎么办
- no author / no date 怎么处理
- ScienceDirect article 怎么处理

## 5. Competitive Minimum

首版要达到的竞品最低能力：

- 像 MyBib / Scribbr 一样，用户一进站就能看到工具入口。
- 像 Grammarly 一样，有清晰表单和 citation preview。
- 像 QuillBot 一样，提供快速入口和手动 fallback，但不提供 PDF upload。
- 支持 DOI 或手动输入，不强制登录。
- 输出 reference citation 和 in-text citation。
- 支持复制。
- 有清晰错误态和示例态。
- 移动端可完成核心任务。

首版差异化：

- 明确聚焦 APA 7 + PDF / DOI / journal article。
- 不用账号，不把核心功能藏在复杂文献库后面。
- 针对 Philippines / US 学生写更直接的作业场景文案。
- 不做 AI writing suite，不做 plagiarism checker，不做 PDF upload。

## 6. 竞品 UI 结构参考

### Scribbr

- 用作首页信息架构参考。
- 借鉴：H1、短说明、上方工具入口、手动 fallback、下方 APA guide / FAQ。
- 避免：复杂生态产品内容和过多延展功能。

### Grammarly

- 用作 form + preview 参考。
- 借鉴：结构化字段、结果预览、一键复制。
- 避免：AI writing upsell。

### MyBib

- 用作教育说明参考。
- 借鉴：what / who / why / how 的学生友好说明。
- 避免：把首版做成完整文献库。

### QuillBot

- 用作快速工具入口参考。
- 借鉴：顶部输入、cite action、manual fallback。
- 避免：Upload PDF，因为本项目首版明确不上传 PDF。

## 7. MVP 范围

### Must Have

- 首页首屏内嵌可用工具。
- DOI lookup。
- 手动 journal article 表单。
- APA 7 reference 输出。
- Parenthetical in-text citation 输出。
- Narrative in-text citation 输出。
- Copy buttons。
- Example state。
- DOI not found error state。
- FAQ。
- Privacy / Terms 基础页面。
- Analytics 事件埋点。

### Should Have

- Website source 表单。
- Book source 表单。
- Copy all / download `.txt`。
- Schema markup。
- ScienceDirect 长尾页。
- APA format 支撑页。

### Not First Version

- 登录 / 注册。
- 保存 bibliography projects。
- 付费订阅。
- Stripe / checkout。
- 浏览器插件。
- Google Docs / Word export。
- Plagiarism checker。
- AI essay writer。
- 上传 PDF 到服务器。
- 批量导入。
- 完整多引用格式套件。

## 8. 页面矩阵

| URL | Index | 主词 | 用户任务 | H1 | CTA | Schema | UI reference | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | index | apa citation generator free | 首屏输入 DOI 或手动信息，生成 APA 7 reference 和 in-text citation | Free APA 7 Citation Generator | Generate APA Citation | WebApplication, FAQPage | Scribbr IA + Grammarly form/preview | MVP |
| `/apa-citation-generator-pdf/` | index | apa citation generator pdf | 从 PDF 场景找到 DOI 或手动生成引用，不上传 PDF | APA Citation Generator for PDFs | Generate from DOI or Details | Article, FAQPage | MyBib education flow + homepage tool CTA | Should |
| `/apa-format/` | index | apa format | 学 APA 7 基础格式，回到工具生成引用 | APA Format Guide | Create an APA Citation | Article, FAQPage | MyBib / Scribbr guide structure | Should |
| `/science-direct-apa-citation/` | index if approved | sciencedirect apa citation generator | 为 ScienceDirect article 生成 APA 引用，必须非官方声明 | ScienceDirect Article APA Citation Helper | Generate Citation | Article, FAQPage | Guide + tool CTA + brand disclaimer | Needs compliance note |
| `/privacy/` | index | privacy policy | 说明 Crossref、analytics、不上传 PDF、不保存论文内容 | Privacy Policy | - | WebPage | Simple legal page | MVP |
| `/terms/` | index | terms | 说明格式校验责任、可接受使用、非官方声明 | Terms of Use | - | WebPage | Simple legal page | MVP |

## 9. 首页结构要求

首页必须采用 tool-first 结构，首屏可直接完成核心任务。

### Above the Fold

1. Compact header：brand + Generator + PDF Citation + APA Format + FAQ。
2. H1：Free APA 7 Citation Generator。
3. Subhead：Create APA 7 reference and in-text citations for free. Paste a DOI or enter article details. No account required.
4. Tool panel：
   - Source tabs：DOI / Journal Article。
   - DOI input as primary path。
   - Manual article form as fallback。
   - Generate button。
5. Results panel：
   - Reference citation。
   - Parenthetical in-text citation。
   - Narrative in-text citation。
   - Copy buttons。

### Below the Tool

6. Example citation block。
7. How it works。
8. Use cases：PDF, DOI, journal article, student assignment。
9. APA 7 notes。
10. FAQ。
11. Bottom CTA。

### Layout Rules

- Desktop：form/input on the left, result preview on the right.
- Mobile：single vertical flow, input -> generate -> preview -> copy.
- Manual fallback must be visible or one tap away, not buried.
- No large decorative hero.
- No PDF upload button.
- No login or pricing CTA in MVP.

## 10. 交互状态

- Empty：显示 DOI 示例和手动表单入口。
- Loading：正在查询 DOI。
- Success：填充 metadata 并生成引用。
- Partial metadata：提示缺少页码/期号等字段，可手动补充。
- DOI not found：保留用户输入，切换到手动表单。
- Invalid DOI：提示格式错误。
- Copy success：按钮短暂显示 Copied。
- Network error：提示稍后重试，并提供手动表单。

## 11. 数据策略

- 不保存用户输入到数据库。
- 不上传 PDF。
- 不保存论文全文。
- Crossref 请求只发送 DOI。
- 可以匿名记录聚合事件：generate success/fail、copy、source type、error type。
- 如后续接 AdSense / Analytics，需要 Cookie / consent 策略由合规阶段确认。

## 12. 技术建议

- Cloudflare Pages：前端静态站。
- Cloudflare Worker：代理 Crossref DOI lookup，加入缓存、限流、`mailto`。
- Citation formatting：优先使用 CSL / Citation.js / citeproc 方案；首版如用模板生成，必须有测试样例覆盖 journal article 常见字段。
- Analytics：GA4 或 Cloudflare Web Analytics；后续可接 Clarity。

## 13. 商业化

首版不接支付。

第一阶段：

- 免费工具拉自然搜索流量。
- 收录稳定后测试广告。

第二阶段可选：

- 保存 reference list。
- Export to Word / Google Docs。
- Citation checker。
- Premium no ads。

## 14. GTM

首发前：

- 确保首页工具可用。
- 写好 PDF、APA format、ScienceDirect 长尾支撑页。
- 提交 sitemap 到 GSC / Bing。

首发后：

- 观察 DOI generate success rate。
- 观察 copy rate。
- 观察 `/apa-citation-generator-pdf/` 和 `/science-direct-apa-citation/` 是否获得 impressions。
- 公开目录提交、社区发布、外链动作必须等 owner 确认。

## 15. 转化漏斗与埋点

| Step | Event | Meaning |
| --- | --- | --- |
| Visit | `page_view` | 用户进入页面 |
| Tool start | `citation_form_started` | 用户开始输入 DOI 或字段 |
| DOI lookup | `doi_lookup_started` | 用户触发 DOI 查询 |
| Generate | `citation_generate_clicked` | 用户点击生成 |
| Success | `citation_generated` | 成功生成引用 |
| Fail | `citation_generation_failed` | DOI 未找到、网络错误或校验失败 |
| Copy | `citation_copied` | 用户复制结果 |
| Help | `faq_opened` | 用户查看 FAQ |

核心转化指标：

- generate rate = `citation_generated / page_view`
- copy rate = `citation_copied / citation_generated`
- DOI success rate = successful DOI lookups / DOI lookup attempts

## 16. 风险

| Risk | Level | Mitigation |
| --- | --- | --- |
| 域名未准备 | P0 | PRD/开发可继续，正式上线前必须注册和绑定 |
| 引用格式错误 | P1 | 使用 CSL/citeproc 或测试覆盖常见样例 |
| Crossref 查不到 DOI | P1 | 手动表单 fallback |
| PDF 上传隐私风险 | P1 | 首版禁止上传 |
| ScienceDirect 品牌风险 | P1 | 只做非官方 helper，页面加 disclaimer |
| 总词竞争强 | P2 | 先打 PDF / DOI / journal article 长尾 |
| 竞品结构参考过度 | P2 | 只参考信息架构和组件模式，不照搬文案、视觉、品牌 |

## 17. 产品验收标准

PRD Gate 通过条件：

- P0 用户任务可被设计和开发复现。
- 页面矩阵完整，并包含 UI reference。
- 首页 tool-first 结构明确。
- Route Contract 完整。
- Data Contract 完整。
- NOT-DO 明确。
- 埋点和风险明确。

MVP QA 通过条件：

- 用户输入一个可查 DOI，能生成 APA 7 reference 和 in-text citation。
- 用户输入一个查不到的 DOI，能进入手动表单。
- 用户手动填写 journal article 信息，能生成引用。
- 复制按钮可用。
- 移动端可完成核心任务。
- 控制台无 P0/P1 错误。

## 18. 待确认

- 域名。
- owner 邮箱，用作 Crossref `mailto`。
- 是否首版上线 ScienceDirect 长尾页，或等合规阶段后再发。

[DONE]
