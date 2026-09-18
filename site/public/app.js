const app = document.querySelector("#app");
const schema = document.querySelector("#schema-json");

const pages = {
  "/apa-citation-generator-pdf/": renderPdfPage,
  "/apa-7-citation-generator/": renderApa7Page,
  "/doi-to-apa-citation/": renderDoiToApaPage,
  "/journal-article-citation-generator/": renderJournalArticlePage,
  "/apa-in-text-citation-generator/": renderInTextCitationPage,
  "/apa-reference-generator/": renderReferenceGeneratorPage,
  "/apa-citation-examples/": renderCitationExamplesPage,
  "/apa-format/": renderApaFormatPage,
  "/science-direct-apa-citation/": renderScienceDirectPage,
  "/privacy/": renderPrivacyPage,
  "/terms/": renderTermsPage,
  "/cookie-policy/": renderCookiePolicyPage
};

function canonicalHref(canonicalPath) {
  const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  return isLocal ? canonicalPath : `${window.location.origin}${canonicalPath}`;
}

function setMeta({ title, description, schemaData, canonicalPath = window.location.pathname }) {
  document.title = title;
  document.querySelector("meta[name='description']").setAttribute("content", description);
  document.querySelector("link[rel='canonical']").setAttribute("href", canonicalHref(canonicalPath));
  schema.textContent = JSON.stringify(schemaData || {}, null, 2);
}

function track(event, detail = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...detail });
}

function initials(author) {
  return (author.given || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}.`)
    .join(" ");
}

function authorName(author) {
  const family = (author.family || "").trim();
  const given = initials(author);
  if (!family && !given) return "";
  return [family, given].filter(Boolean).join(", ");
}

function formatAuthors(authors = []) {
  const names = authors.map(authorName).filter(Boolean);
  if (!names.length) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, & ${names[names.length - 1]}`;
}

function inTextAuthor(authors = []) {
  const families = authors.map((author) => author.family).filter(Boolean);
  if (!families.length) return "Title";
  if (families.length === 1) return families[0];
  if (families.length === 2) return `${families[0]} & ${families[1]}`;
  return `${families[0]} et al.`;
}

function sentenceTitle(title = "") {
  const trimmed = title.trim().replace(/[.]+$/g, "");
  if (!trimmed) return "";
  return `${trimmed[0].toUpperCase()}${trimmed.slice(1)}`;
}

function withPeriod(value = "") {
  const trimmed = String(value).trim();
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function doiUrl(doi = "", url = "") {
  if (doi) return `https://doi.org/${doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}`;
  return url || "";
}

function buildCitation(data) {
  const authors = formatAuthors(data.authors);
  const year = data.year || data.issuedYear || "n.d.";
  const title = sentenceTitle(data.title);
  const journal = data.journal || data.containerTitle;
  const volume = data.volume;
  const issue = data.issue ? `(${data.issue})` : "";
  const pages = data.pages || data.page;
  const locator = [volume ? `${volume}${issue}` : "", pages].filter(Boolean).join(", ");
  const url = doiUrl(data.doi, data.url);
  const referenceParts = [
    withPeriod(authors),
    `(${year}).`,
    withPeriod(title),
    journal ? `${journal}${locator ? "," : "."}` : "",
    withPeriod(locator),
    url
  ].filter(Boolean);
  const textAuthor = inTextAuthor(data.authors);
  return {
    reference: referenceParts.join(" ").replace(/\s+/g, " ").trim(),
    inTextParenthetical: `(${textAuthor}, ${year})`,
    inTextNarrative: `${textAuthor} (${year})`
  };
}

function readManualForm(form) {
  const get = (name) => form.querySelector(`[name="${name}"]`)?.value.trim() || "";
  return {
    sourceType: "journal_article",
    authors: [
      {
        given: get("given"),
        family: get("family")
      }
    ],
    year: get("year"),
    title: get("title"),
    journal: get("journal"),
    volume: get("volume"),
    issue: get("issue"),
    pages: get("pages"),
    doi: get("manualDoi"),
    url: get("url")
  };
}

function fillManualForm(form, metadata) {
  const set = (name, value) => {
    const field = form.querySelector(`[name="${name}"]`);
    if (field) field.value = value || "";
  };
  const firstAuthor = metadata.authors?.[0] || {};
  set("given", firstAuthor.given);
  set("family", firstAuthor.family);
  set("year", metadata.issuedYear);
  set("title", metadata.title);
  set("journal", metadata.containerTitle);
  set("volume", metadata.volume);
  set("issue", metadata.issue);
  set("pages", metadata.page);
  set("manualDoi", metadata.doi);
  set("url", metadata.url);
}

function renderResult(citation, state = {}) {
  const banner = document.querySelector("#state-banner");
  const output = document.querySelector("#citation-output");
  const empty = document.querySelector("#empty-state");

  banner.className = "state-banner hidden";
  banner.textContent = "";
  if (state.message) {
    banner.className = `state-banner ${state.kind || "warning"}`;
    banner.textContent = state.message;
  }

  empty.classList.add("hidden");
  output.classList.remove("hidden");
  output.querySelector("[data-output='reference']").textContent = citation.reference;
  output.querySelector("[data-output='parenthetical']").textContent = citation.inTextParenthetical;
  output.querySelector("[data-output='narrative']").textContent = citation.inTextNarrative;
  track("citation_generated", { hasWarnings: Boolean(state.message) });
}

function renderHome() {
  setMeta({
    title: "Free APA 7 Citation Generator for DOI, PDFs, and Articles",
    description: "Generate APA 7 citations from a DOI or article details. Create reference and in-text citations for journal articles, PDFs, and web sources for free.",
    schemaData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Free APA 7 Citation Generator",
      applicationCategory: "EducationalApplication"
    }
  });

  app.innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero-copy">
          <p class="eyebrow">APA 7 citation tool</p>
          <h1>Free APA 7 Citation Generator</h1>
          <p class="lede">Create APA 7 reference and in-text citations for free. Paste a DOI or enter article details. No account required.</p>
          <div class="hero-chips" aria-label="Tool highlights">
            <span>APA 7</span>
            <span>DOI lookup</span>
            <span>No PDF upload</span>
          </div>
        </div>
        <div class="tool-grid">
          <form class="panel" id="citation-form">
            <div class="tabs" role="tablist" aria-label="Citation source type">
              <button class="tab-button active" type="button">DOI</button>
              <button class="tab-button" type="button">Journal Article</button>
            </div>
            <div class="full-field">
              <label for="doi">Enter a DOI</label>
              <input id="doi" name="doi" placeholder="10.1037/0003-066X.59.1.29" autocomplete="off">
              <p class="help-text">Use the DOI from your article page or PDF. If lookup does not find a match, you can enter the details manually.</p>
              <p class="help-text">Free to use for DOI and manual article citations.</p>
            </div>
            <div class="button-row">
              <button class="button" type="button" id="lookup-button">Generate APA Citation</button>
              <button class="secondary-button" type="button" id="example-button">Try an Example</button>
            </div>
            <section class="manual-section" aria-labelledby="manual-heading">
              <h2 id="manual-heading">No DOI? Enter article details manually.</h2>
              <p class="help-text">Use the details from your PDF or journal article page.</p>
              <div class="form-grid">
                <div class="field">
                  <label for="given">Author given name</label>
                  <input id="given" name="given" placeholder="Jane">
                </div>
                <div class="field">
                  <label for="family">Author family name</label>
                  <input id="family" name="family" placeholder="Smith">
                </div>
                <div class="field">
                  <label for="year">Year</label>
                  <input id="year" name="year" placeholder="2020">
                </div>
                <div class="field">
                  <label for="title">Article title</label>
                  <input id="title" name="title" placeholder="Article title">
                </div>
                <div class="field">
                  <label for="journal">Journal title</label>
                  <input id="journal" name="journal" placeholder="Journal Name">
                </div>
                <div class="field">
                  <label for="volume">Volume</label>
                  <input id="volume" name="volume" placeholder="12">
                </div>
                <div class="field">
                  <label for="issue">Issue</label>
                  <input id="issue" name="issue" placeholder="3">
                </div>
                <div class="field">
                  <label for="pages">Pages</label>
                  <input id="pages" name="pages" placeholder="45-56">
                </div>
                <div class="field">
                  <label for="manualDoi">DOI</label>
                  <input id="manualDoi" name="manualDoi" placeholder="10.0000/example">
                </div>
                <div class="field">
                  <label for="url">URL</label>
                  <input id="url" name="url" placeholder="https://example.com/article">
                </div>
              </div>
              <div class="button-row">
                <button class="secondary-button" type="submit">Generate From Details</button>
              </div>
            </section>
          </form>
          <aside class="panel result-panel" aria-live="polite">
            <h2>Your citation</h2>
            <div id="state-banner" class="state-banner hidden"></div>
            <div id="empty-state" class="result-state">
              Enter a DOI or fill in the article details to generate an APA 7 citation.
            </div>
            <div id="citation-output" class="citation-output hidden">
              <div class="citation-box">
                <strong>Reference citation</strong>
                <p data-output="reference"></p>
                <button class="copy-button" type="button" data-copy="reference">Copy reference</button>
              </div>
              <div class="citation-box">
                <strong>In-text citation</strong>
                <p data-output="parenthetical"></p>
                <button class="copy-button" type="button" data-copy="parenthetical">Copy in-text</button>
              </div>
              <div class="citation-box">
                <strong>Narrative citation</strong>
                <p data-output="narrative"></p>
                <button class="copy-button" type="button" data-copy="narrative">Copy narrative</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="container sections">
      <div class="section">
        <h2>How the APA citation generator works</h2>
        <div class="section-grid">
          <div class="content-card"><h3>1. Add a source</h3><p>Paste a DOI or enter the article details from your PDF or journal page.</p></div>
          <div class="content-card"><h3>2. Review the result</h3><p>Check the APA 7 reference, parenthetical citation, and narrative citation.</p></div>
          <div class="content-card"><h3>3. Copy into your paper</h3><p>Use the copy buttons and review the citation before submitting your work.</p></div>
        </div>
      </div>
      <div class="section">
        <h2>Built for common student citation tasks</h2>
        <div class="cards-grid">
          <div class="content-card"><h3>Cite a PDF source</h3><p>Use the DOI from the PDF when available, or enter the article details manually.</p></div>
          <div class="content-card"><h3>Cite a journal article</h3><p>Generate an APA 7 reference with authors, year, title, journal, volume, issue, pages, and DOI.</p></div>
          <div class="content-card"><h3>Cite from an article page</h3><p>Copy the DOI or metadata from the article page and generate a clean reference.</p></div>
        </div>
      </div>
      <div class="section notice">
        <h2>APA 7 citation basics</h2>
        <p>APA journal article references usually include author, year, article title, journal title, volume, issue, page range, and DOI or URL when available.</p>
        <p>Review generated citations before submitting your work. Citation requirements may vary by instructor or institution.</p>
      </div>
      <section class="section">
        <h2>Related APA citation tools and guides</h2>
        <div class="cards-grid link-grid">
          <a class="content-card" href="/doi-to-apa-citation/"><h3>DOI to APA Citation</h3><p>Use a DOI to look up article metadata and format an APA 7 citation.</p></a>
          <a class="content-card" href="/journal-article-citation-generator/"><h3>Journal Article Citation</h3><p>Build an APA reference from article details when DOI lookup is incomplete.</p></a>
          <a class="content-card" href="/apa-in-text-citation-generator/"><h3>APA In-Text Citation</h3><p>Generate parenthetical and narrative in-text citations from your reference details.</p></a>
          <a class="content-card" href="/apa-reference-generator/"><h3>APA Reference Generator</h3><p>Create a clean reference-list entry for journal articles and PDFs.</p></a>
          <a class="content-card" href="/apa-7-citation-generator/"><h3>APA 7 Citation Generator</h3><p>Learn what APA 7 means and use the current-format generator.</p></a>
          <a class="content-card" href="/apa-citation-examples/"><h3>APA Citation Examples</h3><p>See examples for DOI, PDF, journal article, and missing-field cases.</p></a>
        </div>
      </section>
      ${faqHtml("Homepage FAQ")}
      <section class="bottom-cta" aria-labelledby="bottom-cta-title">
        <div>
          <p class="eyebrow">Ready when you are</p>
          <h2 id="bottom-cta-title">Create an APA 7 citation from a DOI or article details.</h2>
          <p>Use the generator at the top of this page to format your reference and in-text citation.</p>
        </div>
        <a class="button" href="#citation-form">Generate APA Citation</a>
      </section>
    </section>
  `;

  bindCitationTool();
}

function bindCitationTool() {
  const form = document.querySelector("#citation-form");
  const lookupButton = document.querySelector("#lookup-button");
  const exampleButton = document.querySelector("#example-button");
  const banner = document.querySelector("#state-banner");

  const example = {
    authors: [{ given: "Jane", family: "Smith" }],
    year: "2020",
    title: "Designing student-friendly citation tools",
    journal: "Journal of Academic Writing",
    volume: "12",
    issue: "3",
    pages: "45-56",
    doi: "10.0000/example",
    url: ""
  };

  exampleButton.addEventListener("click", () => {
    fillManualForm(form, {
      authors: example.authors,
      issuedYear: example.year,
      title: example.title,
      containerTitle: example.journal,
      volume: example.volume,
      issue: example.issue,
      page: example.pages,
      doi: example.doi,
      url: example.url
    });
    renderResult(buildCitation(example), { message: "Example citation loaded.", kind: "warning" });
  });

  lookupButton.addEventListener("click", async () => {
    const doi = form.querySelector("[name='doi']").value.trim();
    track("doi_lookup_started");
    banner.className = "state-banner warning";
    banner.textContent = "Looking up DOI metadata...";
    try {
      const response = await fetch(`/api/doi?doi=${encodeURIComponent(doi)}`);
      const payload = await response.json();
      if (!payload.ok) {
        track("doi_lookup_failed", { code: payload.error?.code });
        banner.className = "state-banner error";
        banner.textContent = payload.error?.message || "DOI lookup failed. You can enter the details manually.";
        return;
      }
      track("doi_lookup_succeeded", { hasWarnings: payload.warnings?.length > 0 });
      fillManualForm(form, payload.metadata);
      const citation = buildCitation({
        authors: payload.metadata.authors,
        year: payload.metadata.issuedYear,
        title: payload.metadata.title,
        journal: payload.metadata.containerTitle,
        volume: payload.metadata.volume,
        issue: payload.metadata.issue,
        pages: payload.metadata.page,
        doi: payload.metadata.doi,
        url: payload.metadata.url
      });
      const warning = payload.warnings?.length
        ? "Some citation details may be missing. Review and complete the fields before copying."
        : "";
      renderResult(citation, warning ? { message: warning, kind: "warning" } : {});
    } catch {
      track("doi_lookup_failed", { code: "network_error" });
      banner.className = "state-banner error";
      banner.textContent = "Crossref is not available right now. You can enter the details manually.";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    track("citation_generate_clicked", { method: "manual" });
    renderResult(buildCitation(readManualForm(form)));
  });

  document.querySelector("#citation-output").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    const key = button.dataset.copy;
    const selector = key === "reference" ? "reference" : key === "parenthetical" ? "parenthetical" : "narrative";
    const text = document.querySelector(`[data-output="${selector}"]`).textContent;
    await navigator.clipboard.writeText(text);
    const original = button.textContent;
    button.textContent = "Copied";
    track("citation_copied", { type: key });
    setTimeout(() => {
      button.textContent = original;
    }, 1400);
  });
}

function faqHtml(title = "FAQ") {
  const items = [
    ["Is this APA citation generator free?", "Yes. The MVP version is free to use and does not require an account."],
    ["Can I cite a PDF in APA 7?", "Yes. If your PDF includes a DOI, paste the DOI into the generator. If there is no DOI, enter the article details manually."],
    ["Do you upload or store my PDF?", "No. The MVP version does not upload, store, or read PDF files. It only uses the DOI or citation details you enter."],
    ["What happens if DOI lookup fails?", "You can still enter the author, year, title, journal, volume, issue, pages, DOI, or URL manually."],
    ["Is the citation guaranteed to be correct?", "No citation tool can guarantee that every citation will match every instructor or institution requirement. Review the generated citation before submitting your work."],
    ["Is this an official APA tool?", "No. This is an independent citation tool and is not affiliated with or endorsed by APA."]
  ];
  return `
    <section class="section" id="faq">
      <h2>${title}</h2>
      <div class="faq-list">
        ${items.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("")}
      </div>
    </section>
  `;
}

function articleShell({ title, description, body }) {
  setMeta({
    title,
    description,
    schemaData: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title
    }
  });
  app.innerHTML = `<article class="article-page">${body}</article>`;
}

function relatedLinksHtml() {
  return `
    <div class="content-card">
      <h2>Related citation pages</h2>
      <ul class="related-list">
        <li><a href="/">Free APA Citation Generator</a></li>
        <li><a href="/doi-to-apa-citation/">DOI to APA Citation</a></li>
        <li><a href="/journal-article-citation-generator/">Journal Article Citation Generator</a></li>
        <li><a href="/apa-in-text-citation-generator/">APA In-Text Citation Generator</a></li>
        <li><a href="/apa-reference-generator/">APA Reference Generator</a></li>
        <li><a href="/apa-citation-examples/">APA Citation Examples</a></li>
      </ul>
    </div>
  `;
}

function renderPdfPage() {
  articleShell({
    title: "APA Citation Generator for PDFs",
    description: "Need to cite a PDF in APA 7? Use the DOI when available or enter article details manually to create reference and in-text citations.",
    body: `
      <p class="eyebrow">PDF citation</p>
      <h1>APA Citation Generator for PDFs</h1>
      <p class="lede">Use the DOI from a PDF when available, or enter article details manually to create APA 7 reference and in-text citations.</p>
      <div class="notice"><strong>No PDF upload:</strong> This tool does not upload or store PDF files in the MVP.</div>
      <div class="content-card"><h2>How to cite a PDF</h2><p>Look for the DOI on the first page, near the abstract, footer, or article landing page. If there is no DOI, use the title, author, year, journal, volume, issue, and page range.</p><p><a class="button" href="/">Generate from DOI or Details</a></p></div>
      ${relatedLinksHtml()}
      ${faqHtml("PDF Citation FAQ")}
    `
  });
}

function renderApa7Page() {
  articleShell({
    title: "APA 7 Citation Generator",
    description: "Create APA 7 citations for journal articles, PDFs, and DOI sources. Learn why APA 7 matters and generate references for free.",
    body: `
      <p class="eyebrow">APA 7</p>
      <h1>APA 7 Citation Generator</h1>
      <p class="lede">APA 7 is the current widely used edition of APA style. Use this free generator to create APA 7 reference and in-text citations from a DOI or article details.</p>
      <div class="content-card"><h2>What APA 7 means</h2><p>APA is the citation style. APA 7 means the seventh edition of that style. Being specific helps students avoid older APA 6 formatting rules.</p></div>
      <div class="content-card"><h2>Best workflow</h2><p>Paste a DOI first. If metadata is incomplete, review the generated fields and complete missing details manually before copying.</p><p><a class="button" href="/">Generate APA 7 Citation</a></p></div>
      ${relatedLinksHtml()}
      ${faqHtml("APA 7 FAQ")}
    `
  });
}

function renderDoiToApaPage() {
  articleShell({
    title: "DOI to APA Citation Generator",
    description: "Convert a DOI into an APA 7 reference and in-text citation. Free DOI lookup with manual fallback for missing metadata.",
    body: `
      <p class="eyebrow">DOI lookup</p>
      <h1>DOI to APA Citation Generator</h1>
      <p class="lede">Paste a DOI to look up article metadata and create an APA 7 reference citation, parenthetical citation, and narrative citation.</p>
      <div class="content-card"><h2>When DOI lookup helps</h2><p>A DOI can identify a journal article and return title, author, journal, year, volume, issue, pages, and DOI URL when available.</p></div>
      <div class="content-card"><h2>If the DOI is not found</h2><p>Use the manual article form. DOI databases can be incomplete, especially for older articles, newly published articles, or sources with missing metadata.</p><p><a class="button" href="/">Convert DOI to APA</a></p></div>
      ${relatedLinksHtml()}
      ${faqHtml("DOI to APA FAQ")}
    `
  });
}

function renderJournalArticlePage() {
  articleShell({
    title: "Journal Article Citation Generator",
    description: "Generate APA 7 citations for journal articles using DOI lookup or manual article details such as author, title, journal, volume, issue, and pages.",
    body: `
      <p class="eyebrow">Journal article</p>
      <h1>Journal Article Citation Generator</h1>
      <p class="lede">Create APA 7 citations for journal articles from DOI metadata or manual article details.</p>
      <div class="content-card"><h2>Fields you need</h2><p>For APA 7 journal article references, collect author, year, article title, journal title, volume, issue, page range, and DOI or URL.</p></div>
      <div class="content-card"><h2>Manual entry fallback</h2><p>If DOI lookup misses pages, issue, or author information, fill those fields manually and regenerate the citation.</p><p><a class="button" href="/">Generate Journal Article Citation</a></p></div>
      ${relatedLinksHtml()}
      ${faqHtml("Journal Article Citation FAQ")}
    `
  });
}

function renderInTextCitationPage() {
  articleShell({
    title: "APA In-Text Citation Generator",
    description: "Generate APA 7 parenthetical and narrative in-text citations from author and year details, with a matching reference citation.",
    body: `
      <p class="eyebrow">In-text citation</p>
      <h1>APA In-Text Citation Generator</h1>
      <p class="lede">Generate parenthetical and narrative APA 7 in-text citations from article details.</p>
      <div class="content-card"><h2>Parenthetical vs. narrative</h2><p>Parenthetical citations usually look like (Smith, 2020). Narrative citations place the author in the sentence, such as Smith (2020).</p></div>
      <div class="content-card"><h2>Keep it paired with the reference</h2><p>An in-text citation should match an item in your reference list. Generate both together to reduce mistakes.</p><p><a class="button" href="/">Generate In-Text Citation</a></p></div>
      ${relatedLinksHtml()}
      ${faqHtml("APA In-Text Citation FAQ")}
    `
  });
}

function renderReferenceGeneratorPage() {
  articleShell({
    title: "APA Reference Generator",
    description: "Create APA 7 reference-list entries for journal articles, PDFs, and DOI sources. Free reference generator with copyable output.",
    body: `
      <p class="eyebrow">Reference list</p>
      <h1>APA Reference Generator</h1>
      <p class="lede">Create a clean APA 7 reference-list entry from DOI metadata or manual source details.</p>
      <div class="content-card"><h2>What the reference includes</h2><p>An APA journal article reference usually includes author, year, article title, journal title, volume, issue, pages, and DOI or URL.</p></div>
      <div class="content-card"><h2>Review before submitting</h2><p>Generated references should be checked against your instructor or institution requirements before final submission.</p><p><a class="button" href="/">Create APA Reference</a></p></div>
      ${relatedLinksHtml()}
      ${faqHtml("APA Reference FAQ")}
    `
  });
}

function renderCitationExamplesPage() {
  articleShell({
    title: "APA Citation Examples",
    description: "See APA 7 citation examples for DOI, PDF, journal article, in-text citation, and missing metadata cases.",
    body: `
      <p class="eyebrow">Examples</p>
      <h1>APA Citation Examples</h1>
      <p class="lede">Use these examples to understand the output from the APA citation generator.</p>
      <div class="content-card"><h2>Journal article with DOI</h2><p>Ray, O. (2004). How the Mind Hurts and Heals the Body. <em>American Psychologist, 59</em>(1), 29-40. https://doi.org/10.1037/0003-066x.59.1.29</p></div>
      <div class="content-card"><h2>In-text citation</h2><p>Parenthetical: (Ray, 2004). Narrative: Ray (2004).</p></div>
      <div class="content-card"><h2>Missing metadata</h2><p>If DOI lookup is missing pages, issue, or author details, complete those fields manually before copying the citation.</p><p><a class="button" href="/">Try the Generator</a></p></div>
      ${relatedLinksHtml()}
      ${faqHtml("APA Citation Examples FAQ")}
    `
  });
}

function renderApaFormatPage() {
  articleShell({
    title: "APA Format Guide for References and In-Text Citations",
    description: "Learn the basics of APA 7 reference format and in-text citations, then use the free generator to create citations from DOI or article details.",
    body: `
      <p class="eyebrow">APA guide</p>
      <h1>APA Format Guide</h1>
      <p class="lede">APA 7 references usually include author, year, title, source, and DOI or URL when available.</p>
      <div class="content-card"><h2>Journal article pattern</h2><p>Author, A. A. (Year). Article title. <em>Journal Title, volume</em>(issue), pages. https://doi.org/...</p></div>
      <div class="content-card"><h2>In-text citation pattern</h2><p>Parenthetical: (Smith, 2020). Narrative: Smith (2020).</p></div>
      <p><a class="button" href="/">Create an APA Citation</a></p>
      ${faqHtml("APA Format FAQ")}
    `
  });
}

function renderScienceDirectPage() {
  articleShell({
    title: "ScienceDirect Article APA Citation Helper",
    description: "Create an APA 7 citation for a ScienceDirect article using a DOI or article details. Independent helper, not affiliated with ScienceDirect.",
    body: `
      <p class="eyebrow">Article citation helper</p>
      <h1>ScienceDirect Article APA Citation Helper</h1>
      <div class="notice">This tool is not affiliated with or endorsed by ScienceDirect.</div>
      <p class="lede">Use the article DOI when available. If DOI lookup does not return complete metadata, manually review and complete the article details before copying the citation.</p>
      <div class="content-card"><h2>Recommended workflow</h2><p>Copy the DOI from the article page, generate the citation, review missing fields, then copy the APA 7 reference and in-text citation.</p><p><a class="button" href="/">Generate Citation</a></p></div>
      ${faqHtml("ScienceDirect Citation FAQ")}
    `
  });
}

function legalShell({ title, description, body }) {
  setMeta({
    title,
    description,
    schemaData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title
    }
  });
  app.innerHTML = `<article class="legal-page"><h1>${title}</h1>${body}</article>`;
}

function renderPrivacyPage() {
  legalShell({
    title: "Privacy Policy",
    description: "Learn how this APA citation generator handles DOI lookup, citation inputs, analytics, and hosting data.",
    body: `
      <div class="content-card"><h2>Information you enter</h2><p>You may enter a DOI or citation details such as author names, article title, journal name, year, volume, issue, pages, DOI, or URL.</p><p>In the MVP version, this site does not upload PDF files, store PDF files, create user accounts, or save bibliography projects.</p></div>
      <div class="content-card"><h2>DOI lookup</h2><p>When you use DOI lookup, the DOI may be sent to Crossref to retrieve citation metadata.</p></div>
      <div class="content-card"><h2>Analytics</h2><p>The site uses Microsoft Clarity to understand aggregate usage patterns, page interactions, and technical issues. Clarity may collect interaction data such as page views, clicks, scrolling, device/browser information, and approximate location derived from network data. Citation text is not saved by this site.</p></div>
      <div class="content-card"><h2>Contact</h2><p>Contact email: hello@citationformat.site.</p></div>
    `
  });
}

function renderTermsPage() {
  legalShell({
    title: "Terms of Use",
    description: "Review the terms for using this independent APA citation generator and citation formatting helper.",
    body: `
      <div class="content-card"><h2>Citation accuracy</h2><p>The tool is designed to help format APA 7 citations, but citation requirements may vary by instructor, institution, publisher, or assignment. Review generated citations before submitting your work.</p></div>
      <div class="content-card"><h2>No official affiliation</h2><p>This site is not affiliated with, endorsed by, or sponsored by APA, ScienceDirect, Crossref, MyBib, Scribbr, QuillBot, Grammarly, or any other third-party citation platform or publisher mentioned on the site.</p></div>
      <div class="content-card"><h2>Acceptable use</h2><p>Do not use the site for automated scraping, abusive requests, attempts to disrupt the service, or unlawful activity. Automated or excessive requests may be limited.</p></div>
    `
  });
}

function renderCookiePolicyPage() {
  legalShell({
    title: "Cookie Policy",
    description: "Cookie policy for the APA Citation Generator MVP.",
    body: `
      <div class="content-card"><h2>Essential cookies</h2><p>The MVP does not require user accounts, saved projects, checkout, or billing, so it should not need account or payment cookies.</p></div>
      <div class="content-card"><h2>Analytics cookies</h2><p>Microsoft Clarity is enabled to help us understand page usage and improve the citation tool. Clarity may use cookies or similar technologies for analytics, session insights, and fraud prevention. You can limit cookies through your browser settings.</p></div>
      <div class="content-card"><h2>Advertising cookies</h2><p>Advertising is not part of the MVP. If ads are enabled later, update this policy and add appropriate disclosure before launch.</p></div>
    `
  });
}

const route = pages[window.location.pathname] || renderHome;
route();
