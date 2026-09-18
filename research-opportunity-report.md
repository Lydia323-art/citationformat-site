# Keyword Research Lite Report

项目：apa-citation-generator
阶段：01-research
日期：2026-09-18
状态：DONE_LITE

## 证据来源

- MyBib APA Citation Generator：https://www.mybib.com/tools/apa-citation-generator
- Scribbr APA Citation Generator：https://www.scribbr.com/citation/generator/apa/
- QuillBot APA Citation Generator：https://quillbot.com/citation-generator/apa
- Grammarly APA Citation Generator：https://www.grammarly.com/citations/apa
- Citation.js：https://larsgw.github.io/
- citeproc-js docs：https://citeproc-js.readthedocs.io/
- Crossref REST API：https://www.crossref.org/documentation/retrieve-metadata/rest-api/
- APA Style reference guide：https://apastyle.apa.org/instructional-aids/reference-guide.pdf

## SERP 结论

`apa citation generator` 是成熟老词，不是新词。前排通常由强站和大品牌覆盖，首版小站直接抢总词难度高。

首版更适合从细分工具意图进入：

- `apa citation generator pdf`
- `apa citation generator free`
- `apa format generator`
- `apa 7 citation generator DOI`
- `ScienceDirect article APA citation` 相关长尾

## 竞品分层

### 直接竞品

- MyBib：免费、APA 6/7、可搜索 source、可下载到 Word / Google Docs。
- Scribbr：搜索 title/URL/DOI/ISBN，支持 APA 6/7、BibTeX、Word、保存列表、Chrome extension。
- QuillBot：Citation Generator 被放在写作工具生态内，适合导流到 AI 写作产品。
- Grammarly：表单式 APA citation generator，并把 Citation Finder、写作辅助、教育场景做成上游转化。

### 替代方案

- Zotero / Mendeley：更强但更重，适合研究者，不适合临时交作业的学生。
- Google Docs / Word 插件：工作流内置，但首次上手门槛更高。

### 参考型站点

- APA Style 官方资料：适合做规则依据，但不是自动工具。
- Citation.js / citeproc-js / CSL：适合作为实现引用格式的技术基础。

## 3 类用户

1. US college students：写 psychology、education、nursing、social science 作业，需要快速生成 APA 7。
2. Philippines college students：英语作业和 research paper 场景多，价格敏感，偏好免费、免登录、移动端可用。
3. Graduate/research assistants：有 DOI、journal article、PDF，需要更准确的 article citation 和 in-text citation。

## 主力用户

主力用户建议先选：US / Philippines college students who need APA 7 citations from PDFs, DOI, and article pages.

理由：

- 工具意图强，能用单页 MVP 满足。
- 用户更关心速度、免费、复制结果，而不是复杂文献库。
- `PDF`、`DOI`、`journal article` 比总词更容易形成差异。

## 机会分级

### A_NOW：APA 7 Citation Generator for PDFs and DOI

- 推荐站点类型：工具站
- 首页定位：Free APA 7 Citation Generator for PDFs, DOI, and Web Sources
- 核心功能：
  - DOI 输入自动查 metadata
  - 手动填写 author、year、title、journal、volume、issue、pages、DOI/URL
  - 输出 APA 7 reference
  - 输出 parenthetical / narrative in-text citation
  - 一键复制
  - 支持 PDF 场景文案，但首版可不上传文件

### B_QUEUE：ScienceDirect APA Citation Helper

- 做法：作为二级工具页或指南页，不做首页主品牌。
- 注意：避免误导为 ScienceDirect 官方工具；页面文案使用 “for ScienceDirect articles” 这类描述时要加非官方说明。

### B_QUEUE：APA Format Guide

- 做法：作为 SEO 支撑内容，承接 `apa format`。
- 注意：这是信息型词，不应替代工具首页。

### D_SKIP：my bib apa citation generator

- 原因：品牌导航词，用户大概率想去 MyBib；不建议作为主目标词。

## MVP 范围建议

### Must Have

- APA 7 journal article citation form
- DOI lookup
- Manual fallback form
- Reference output
- In-text citation output
- Copy buttons
- Example state
- Clear error state when DOI not found
- FAQ：PDF、DOI、APA 7、missing author/date、ScienceDirect article

### Should Have

- Website citation form
- Book citation form
- Download `.txt` or copy reference list
- Mobile-first layout

### Not First Version

- Account/login
- Saved bibliography projects
- Browser extension
- Paid export
- Plagiarism checker
- AI writing assistant
- Server-side PDF upload storage
- Full MyBib/Scribbr-style multi-style citation suite

## 商业化初判

- 首版：免费，不接支付。
- 第一阶段变现：AdSense / display ads，等收录和流量后再开。
- 第二阶段变现：Premium export/save lists、Word/Google Docs export、citation checking。
- 不建议首版订阅：工具价值还没有形成差异，订阅会伤害免费工具词转化。

## 风险 / 待确认

- P0：域名未准备，阻塞上线。
- P1：没有 volume/KD/CPC/Trends 证据，SEO 优先级仍是轻量判断。
- P1：PDF 上传涉及隐私和文件处理，首版建议不上传或只做浏览器本地解析。
- P1：ScienceDirect 是品牌词，不能误导用户认为本站是官方工具。
- P2：APA 格式准确性要依赖 CSL/citeproc 或可靠模板，不能随手拼字符串。

## 给 PRD 的最小输入

- 产品定位：Free APA 7 citation generator focused on PDFs, DOI, and journal article sources.
- 首页 canonical：待域名确认后设为 `/`
- 第一版核心任务：用户输入 DOI 或手动填写文章信息，获得 APA 7 reference 和 in-text citation。
- 主要页面：
  - `/`：APA citation generator
  - `/apa-citation-generator-pdf/`：PDF citation angle
  - `/apa-format/`：APA format guide
  - `/science-direct-apa-citation/`：品牌相关长尾，待合规确认
- 技术建议：Cloudflare Pages + Worker；CSL/citeproc/Citation.js；Crossref DOI lookup。

## 验收清单自检

- 主推荐有 SERP 和竞品证据：部分通过
- Trends / volume / KD / CPC：未通过，待关键词工具补证
- 没有把品牌词作为主线：通过
- 至少 3 类用户：通过
- PRD 可直接接住：通过

[DONE_LITE]
