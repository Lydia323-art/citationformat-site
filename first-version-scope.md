# First Version Scope

项目：apa-citation-generator
阶段：02-product
状态：NEEDS_REVIEW

## 第一版目标

上线一个免费、免登录、移动端可用的 APA 7 citation generator。用户可以输入 DOI 或手动填写 journal article 信息，得到 reference citation 和 in-text citation，并一键复制。

## In Scope

- `/` 首页工具。
- Crossref DOI lookup。
- Manual journal article form。
- APA 7 reference output。
- Parenthetical in-text citation。
- Narrative in-text citation。
- Copy buttons。
- Example state。
- DOI not found fallback。
- Invalid DOI validation。
- FAQ。
- Privacy / Terms。
- Basic analytics events。

## Content Support

首版可同步准备：

- `/apa-citation-generator-pdf/`
- `/apa-format/`

ScienceDirect 页面建议进入合规复核后再决定是否首发：

- `/science-direct-apa-citation/`

## Out of Scope

- PDF upload。
- File storage。
- User accounts。
- Saved projects。
- Paid plans。
- Browser extension。
- Word / Google Docs export。
- Plagiarism checker。
- AI essay writer。
- Multiple citation styles。
- Batch import。

## Acceptance Tasks

1. A student enters a valid DOI and receives APA 7 reference + in-text citations.
2. A student enters an invalid DOI and sees a clear error.
3. A student enters a DOI that Crossref cannot find and can switch to manual entry.
4. A student manually enters journal article details and receives citations.
5. A student copies reference citation.
6. A student completes the flow on mobile.

## Launch Blockers

- Domain not registered.
- Crossref `mailto` not configured.
- Privacy / Terms missing.
- Citation formatting has no test examples.
- Owner has not approved production deployment.

[NEEDS_REVIEW]
