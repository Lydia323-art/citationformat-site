const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

const baseUrl = process.env.QA_BASE_URL || "http://localhost:4173";
const projectRoot = __dirname;
const evidenceDir = path.join(projectRoot, "qa-evidence");

const routes = [
  "/",
  "/apa-citation-generator-pdf/",
  "/apa-7-citation-generator/",
  "/doi-to-apa-citation/",
  "/journal-article-citation-generator/",
  "/apa-in-text-citation-generator/",
  "/apa-reference-generator/",
  "/apa-citation-examples/",
  "/apa-format/",
  "/science-direct-apa-citation/",
  "/privacy/",
  "/terms/",
  "/cookie-policy/"
];

const browserCandidates = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);

function urlFor(route) {
  return `${baseUrl}${route}`;
}

function pass(name, details = {}) {
  return { name, status: "PASS", ...details };
}

function fail(name, details = {}) {
  return { name, status: "FAIL", ...details };
}

async function pageText(page, selector) {
  return page.locator(selector).first().textContent().then((value) => value.trim());
}

async function visible(page, selector) {
  return page.locator(selector).first().isVisible();
}

async function captureHome(page, filename, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(urlFor("/"), { waitUntil: "domcontentloaded" });
  await page.waitForSelector("h1");
  await page.screenshot({ path: path.join(evidenceDir, filename), fullPage: true });
  return filename;
}

async function run() {
  await fs.mkdir(evidenceDir, { recursive: true });

  let executablePath = "";
  for (const candidate of browserCandidates) {
    try {
      await fs.access(candidate);
      executablePath = candidate;
      break;
    } catch {
      // Try the next installed browser candidate.
    }
  }

  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {})
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    permissions: ["clipboard-read", "clipboard-write"]
  });

  const issues = [];
  const results = [];
  const consoleErrors = [];
  const failedRequests = [];

  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("requestfailed", (request) => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()?.errorText || "unknown"
    });
  });

  await captureHome(page, "desktop-home.png", { width: 1440, height: 1100 });
  await captureHome(page, "mobile-home.png", { width: 390, height: 844 });

  const mobileNoHorizontalScroll = await page.evaluate(() => (
    document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
  ));
  results.push(mobileNoHorizontalScroll
    ? pass("Mobile viewport has no horizontal overflow")
    : fail("Mobile viewport has horizontal overflow"));

  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(urlFor("/"), { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#citation-form");

  const h1 = await pageText(page, "h1");
  const lede = await pageText(page, ".lede");
  const formVisible = await visible(page, "#citation-form");
  const bottomCtaVisible = await visible(page, ".bottom-cta .button");
  results.push(h1.includes("Free APA 7 Citation Generator")
    ? pass("Hero explains product in first viewport", { h1, lede })
    : fail("Hero does not clearly explain product", { h1, lede }));
  results.push(formVisible
    ? pass("Generator form is visible on homepage")
    : fail("Generator form is not visible on homepage"));
  results.push(bottomCtaVisible
    ? pass("Bottom CTA is present")
    : fail("Bottom CTA is missing"));

  await page.fill("#doi", "not-a-doi");
  await page.click("#lookup-button");
  await page.waitForSelector(".state-banner.error");
  const invalidMessage = await pageText(page, ".state-banner.error");
  await page.screenshot({ path: path.join(evidenceDir, "invalid-doi-error.png"), fullPage: false });
  results.push(invalidMessage.includes("starts with 10.")
    ? pass("Invalid DOI flow shows helpful error", { message: invalidMessage })
    : fail("Invalid DOI flow error is unclear", { message: invalidMessage }));

  await page.fill("#given", "Jane");
  await page.fill("#family", "Smith");
  await page.fill("#year", "2020");
  await page.fill("#title", "Designing student-friendly citation tools");
  await page.fill("#journal", "Journal of Academic Writing");
  await page.fill("#volume", "12");
  await page.fill("#issue", "3");
  await page.fill("#pages", "45-56");
  await page.fill("#manualDoi", "10.0000/example");
  await page.click("button[type='submit']");
  await page.waitForSelector("[data-output='reference']");
  const manualReference = await pageText(page, "[data-output='reference']");
  const manualParenthetical = await pageText(page, "[data-output='parenthetical']");
  await page.screenshot({ path: path.join(evidenceDir, "manual-citation-success.png"), fullPage: false });
  results.push(manualReference.includes("Smith, J. (2020).")
    ? pass("Manual article form generates APA reference", { reference: manualReference })
    : fail("Manual article form output looks wrong", { reference: manualReference }));
  results.push(manualParenthetical === "(Smith, 2020)"
    ? pass("Manual article form generates in-text citation", { parenthetical: manualParenthetical })
    : fail("Manual in-text citation output looks wrong", { parenthetical: manualParenthetical }));

  await page.click("[data-copy='reference']");
  const copiedText = await page.evaluate(() => navigator.clipboard.readText());
  results.push(copiedText === manualReference
    ? pass("Copy reference button writes expected text to clipboard")
    : fail("Copy reference button did not copy expected text", { copiedText, manualReference }));

  await page.fill("#doi", "10.1037/0003-066X.59.1.29");
  await page.click("#lookup-button");
  await page.waitForFunction(() => {
    const reference = document.querySelector("[data-output='reference']")?.textContent || "";
    const banner = document.querySelector("#state-banner")?.textContent || "";
    return reference.includes("Ray, O. (2004)") || banner.includes("Crossref is not available");
  }, null, { timeout: 15000 });
  const doiBanner = await page.locator("#state-banner").textContent().then((value) => value.trim());
  const doiReference = await page.locator("[data-output='reference']").textContent().then((value) => value.trim()).catch(() => "");
  await page.screenshot({ path: path.join(evidenceDir, "doi-lookup-result.png"), fullPage: false });
  results.push(doiReference.includes("Ray, O. (2004)")
    ? pass("DOI lookup generates citation from Crossref", { reference: doiReference })
    : fail("DOI lookup did not return expected Crossref citation", { banner: doiBanner, reference: doiReference }));

  const routeReports = [];
  for (const route of routes) {
    await page.goto(urlFor(route), { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h1");
    const status = await page.evaluate(() => document.readyState);
    const routeH1 = await pageText(page, "h1");
    const title = await page.title();
    const description = await page.locator("meta[name='description']").getAttribute("content");
    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    const expectedCanonicalPath = route;
    const canonicalMatches = route === "/" ? canonical === "/" : canonical === expectedCanonicalPath;
    routeReports.push({ route, status, h1: routeH1, title, description, canonical, canonicalMatches });
  }

  const routeFailures = routeReports.filter((item) => item.status !== "complete" && item.status !== "interactive");
  results.push(routeFailures.length === 0
    ? pass("All indexable routes render in browser", { checked: routes.length })
    : fail("Some routes failed to render", { routeFailures }));

  const canonicalMismatches = routeReports.filter((item) => !item.canonicalMatches);
  if (canonicalMismatches.length) {
    issues.push({
      severity: "P1",
      title: "Indexable route canonical tags are not self-referencing",
      evidence: canonicalMismatches.map((item) => ({
        route: item.route,
        canonical: item.canonical
      }))
    });
  }

  const staticChecks = [];
  for (const route of ["/robots.txt", "/sitemap.xml"]) {
    const response = await fetch(urlFor(route));
    staticChecks.push({ route, status: response.status, ok: response.ok });
  }
  results.push(staticChecks.every((item) => item.ok)
    ? pass("robots.txt and sitemap.xml are accessible", { staticChecks })
    : fail("robots.txt or sitemap.xml failed", { staticChecks }));

  const unknownResponse = await fetch(urlFor("/definitely-not-a-real-page/"));
  const unknownBody = await unknownResponse.text();
  if (unknownResponse.status === 200 && unknownBody.includes("Free APA 7 Citation Generator")) {
    issues.push({
      severity: "P1",
      title: "Unknown URLs return homepage with HTTP 200",
      evidence: {
        route: "/definitely-not-a-real-page/",
        status: unknownResponse.status,
        risk: "Soft 404 / duplicate content before production launch"
      }
    });
  }

  const unexpectedConsoleErrors = consoleErrors.filter((message) => !message.includes("400 (Bad Request)"));
  if (unexpectedConsoleErrors.length) {
    issues.push({ severity: "P1", title: "Browser console errors detected", evidence: unexpectedConsoleErrors });
  }
  if (failedRequests.length) {
    issues.push({ severity: "P2", title: "Failed browser requests detected", evidence: failedRequests });
  }

  await fs.writeFile(
    path.join(evidenceDir, "qa-results.json"),
    JSON.stringify({
      baseUrl,
      generatedAt: new Date().toISOString(),
      screenshots: [
        "desktop-home.png",
        "mobile-home.png",
        "invalid-doi-error.png",
        "manual-citation-success.png",
        "doi-lookup-result.png"
      ],
      results,
      routeReports,
      staticChecks,
      issues,
      consoleErrors,
      unexpectedConsoleErrors,
      failedRequests
    }, null, 2)
  );

  await browser.close();

  const failedResults = results.filter((item) => item.status === "FAIL");
  console.log(JSON.stringify({
    ok: failedResults.length === 0,
    failedResults,
    issueCount: issues.length,
    issues,
    evidenceDir
  }, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
