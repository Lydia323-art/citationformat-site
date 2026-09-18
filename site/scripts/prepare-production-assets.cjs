const fs = require("node:fs");
const path = require("node:path");

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

function cleanSiteUrl(raw) {
  const value = String(raw || "").trim().replace(/\/+$/g, "");
  if (!value) {
    throw new Error("SITE_URL is required, for example SITE_URL=https://example.com");
  }
  const url = new URL(value);
  if (url.protocol !== "https:") {
    throw new Error("SITE_URL must use https:// for production.");
  }
  if (url.hostname === "example.com") {
    throw new Error("SITE_URL must be the real production domain, not example.com.");
  }
  return url.origin;
}

const siteUrl = cleanSiteUrl(process.env.SITE_URL);
const publicDir = path.join(__dirname, "..", "public");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);

console.log(`Prepared production sitemap and robots for ${siteUrl}`);
