const cache = new Map();
const hits = new Map();

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
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

function clientKey(request) {
  return request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "local";
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

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const doi = normalizeDoi(url.searchParams.get("doi"));

  if (!isLikelyDoi(doi)) {
    return json({
      ok: false,
      error: {
        code: "invalid_doi",
        message: "Enter a DOI that starts with 10. and includes a slash."
      }
    }, 400);
  }

  if (rateLimited(clientKey(request))) {
    return json({
      ok: false,
      error: {
        code: "rate_limited",
        message: "Too many DOI lookups. Try again in a minute."
      }
    }, 429);
  }

  const key = doi.toLowerCase();
  if (cache.has(key)) return json(cache.get(key));

  const crossrefMailto = env.CROSSREF_MAILTO || "";
  const endpoint = new URL(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
  if (crossrefMailto) endpoint.searchParams.set("mailto", crossrefMailto);

  try {
    const response = await fetch(endpoint, {
      headers: {
        "accept": "application/json",
        "user-agent": crossrefMailto
          ? `apa-citation-generator/0.1 (mailto:${crossrefMailto})`
          : "apa-citation-generator/0.1"
      }
    });

    if (response.status === 404) {
      return json({
        ok: false,
        error: {
          code: "doi_not_found",
          message: "We could not find this DOI. You can still enter the article details manually."
        }
      }, 404);
    }

    if (!response.ok) {
      return json({
        ok: false,
        error: {
          code: "crossref_unavailable",
          message: "Crossref is not available right now. You can enter the details manually."
        }
      }, 502);
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
    return json(result);
  } catch {
    return json({
      ok: false,
      error: {
        code: "crossref_unavailable",
        message: "Crossref is not available right now. You can enter the details manually."
      }
    }, 502);
  }
}
