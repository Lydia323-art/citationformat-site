import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./public", import.meta.url));
const port = Number(process.env.PORT || 4173);
const crossrefMailto = process.env.CROSSREF_MAILTO || "";
const cache = new Map();
const hits = new Map();
const clientRoutes = new Set([
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
]);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "content-type": type,
    "cache-control": "no-store"
  });
  res.end(body);
}

function redirect(res, location, status = 301) {
  res.writeHead(status, {
    "location": location,
    "cache-control": "no-store"
  });
  res.end();
}

function normalizeDoi(raw) {
  return decodeURIComponent(String(raw || ""))
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .replace(/^doi:\s*/i, "");
}

function isLikelyDoi(doi) {
  return /^10\.\d{4,9}\/\S+$/i.test(doi);
}

function clientKey(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "local";
}

function rateLimited(key) {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 40;
  const list = (hits.get(key) || []).filter((time) => now - time < windowMs);
  list.push(now);
  hits.set(key, list);
  return list.length > max;
}

function first(value) {
  return Array.isArray(value) ? value[0] : value || "";
}

function mapCrossref(message, doi) {
  const authors = Array.isArray(message.author)
    ? message.author.map((author) => ({
        given: author.given || "",
        family: author.family || ""
      }))
    : [];

  const issuedParts = message.issued?.["date-parts"]?.[0] || [];
  return {
    doi: message.DOI || doi,
    title: first(message.title),
    authors,
    issuedYear: issuedParts[0] ? String(issuedParts[0]) : "",
    containerTitle: first(message["container-title"]),
    volume: message.volume || "",
    issue: message.issue || "",
    page: message.page || "",
    url: message.URL || `https://doi.org/${message.DOI || doi}`
  };
}

function warningsFor(metadata) {
  const warnings = [];
  if (!metadata.authors.length) warnings.push("missing_authors");
  if (!metadata.issuedYear) warnings.push("missing_year");
  if (!metadata.title) warnings.push("missing_title");
  if (!metadata.containerTitle) warnings.push("missing_journal");
  if (!metadata.page) warnings.push("missing_pages");
  return warnings;
}

async function handleDoi(req, res, url) {
  const doi = normalizeDoi(url.searchParams.get("doi"));
  if (!isLikelyDoi(doi)) {
    return send(res, 400, JSON.stringify({
      ok: false,
      error: {
        code: "invalid_doi",
        message: "Enter a DOI that starts with 10. and includes a slash."
      }
    }));
  }

  if (rateLimited(clientKey(req))) {
    return send(res, 429, JSON.stringify({
      ok: false,
      error: {
        code: "rate_limited",
        message: "Too many DOI lookups. Try again in a minute."
      }
    }));
  }

  const key = doi.toLowerCase();
  if (cache.has(key)) {
    return send(res, 200, JSON.stringify(cache.get(key)));
  }

  const endpoint = new URL(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
  if (crossrefMailto) endpoint.searchParams.set("mailto", crossrefMailto);

  try {
    const response = await fetch(endpoint, {
      headers: {
        "accept": "application/json",
        "user-agent": crossrefMailto ? `apa-citation-generator/0.1 (mailto:${crossrefMailto})` : "apa-citation-generator/0.1"
      }
    });

    if (response.status === 404) {
      return send(res, 404, JSON.stringify({
        ok: false,
        error: {
          code: "doi_not_found",
          message: "We could not find this DOI. You can still enter the article details manually."
        }
      }));
    }

    if (!response.ok) {
      return send(res, 502, JSON.stringify({
        ok: false,
        error: {
          code: "crossref_unavailable",
          message: "Crossref is not available right now. You can enter the details manually."
        }
      }));
    }

    const payload = await response.json();
    const metadata = mapCrossref(payload.message || {}, doi);
    const result = {
      ok: true,
      source: "crossref",
      sourceType: "journal_article",
      metadata,
      warnings: warningsFor(metadata)
    };
    cache.set(key, result);
    return send(res, 200, JSON.stringify(result));
  } catch {
    return send(res, 502, JSON.stringify({
      ok: false,
      error: {
        code: "crossref_unavailable",
        message: "Crossref is not available right now. You can enter the details manually."
      }
    }));
  }
}

async function serveStatic(req, res, url) {
  let pathname = decodeURIComponent(url.pathname);
  if (!pathname.endsWith("/") && clientRoutes.has(`${pathname}/`)) {
    return redirect(res, `${pathname}/${url.search}`);
  }
  if (clientRoutes.has(pathname)) {
    pathname = "/index.html";
  } else if (!extname(pathname)) {
    return send(res, 404, "Not found", "text/plain; charset=utf-8");
  }
  const filePath = normalize(join(root, pathname));

  if (!filePath.startsWith(normalize(root))) {
    return send(res, 403, "Forbidden", "text/plain; charset=utf-8");
  }

  try {
    const body = await readFile(filePath);
    res.writeHead(200, {
      "content-type": mime[extname(filePath)] || "application/octet-stream"
    });
    res.end(body);
  } catch {
    const body = await readFile(join(root, "index.html"));
    res.writeHead(200, {
      "content-type": "text/html; charset=utf-8"
    });
    res.end(body);
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  if (url.pathname === "/api/doi") return handleDoi(req, res, url);
  return serveStatic(req, res, url);
}).listen(port, () => {
  console.log(`APA Citation Generator running at http://localhost:${port}`);
});
