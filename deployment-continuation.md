# Deployment Continuation

Project: citationformat.site  
Status: `CUSTOM_DOMAIN_SMOKE_PASSED`  
Last updated: 2026-09-18

## Current State

- GitHub repository is connected to Cloudflare Pages.
- Production branch is `main`.
- Cloudflare Pages build is successful.
- Current Git commit deployed: `f28f158`.
- Temporary Pages URL works: `https://citationformat-site.pages.dev/`
- Smoke test passed on Pages URL:
  - `/` returns 200.
  - `/apa-format/` returns 200.
  - `/apa-format` redirects to `/apa-format/`.
  - `/not-real/` returns 404.
  - `/api/doi?doi=10.1037%2F0003-066X.59.1.29` returns 200 with Crossref data.
  - `/sitemap.xml` returns 200.

## Not Complete Yet

The final custom domain is live:

`https://citationformat.site`

Production smoke test passed on `https://citationformat.site`.

## Completed Cloudflare Screen

Cloudflare Pages -> Custom domains shows `citationformat.site` as Active with SSL enabled.

## Next Steps

1. Set up Cloudflare Email Routing for `hello@citationformat.site`.
2. Submit sitemap to Google Search Console.
3. Submit sitemap to Bing Webmaster Tools.
4. Run SEO / observability launch verification.
5. Microsoft Clarity has been added with tracking ID `yk6m615qwt`; Google Analytics 4 has been created with Measurement ID `G-XZE9JK3WRV`; wait for analytics data after Cloudflare deploys the GitHub commit.

## Production Smoke Test Checklist

- [x] `https://citationformat.site/` returns 200.
- [x] `https://citationformat.site/apa-format/` returns 200.
- [x] `https://citationformat.site/apa-format` redirects to `/apa-format/`.
- [x] `https://citationformat.site/not-real/` returns 404.
- [x] `https://citationformat.site/sitemap.xml` returns 200 and contains `https://citationformat.site`.
- [x] `https://citationformat.site/robots.txt` returns 200 and points to `https://citationformat.site/sitemap.xml`.
- [x] `https://citationformat.site/api/doi?doi=10.1037%2F0003-066X.59.1.29` returns `ok: true`.
- [ ] Homepage DOI lookup works in browser.
- [ ] Invalid DOI error state works in browser.
- [ ] Manual citation generation works in browser.
- [ ] Copy buttons work in browser.

## After Custom Domain Smoke Passes

1. Set up Cloudflare Email Routing:

```text
hello@citationformat.site
```

2. Confirm `CROSSREF_MAILTO` remains:

```text
hello@citationformat.site
```

3. Submit sitemap:

```text
https://citationformat.site/sitemap.xml
```

to Google Search Console and Bing Webmaster Tools.

4. Run SEO / observability launch verification.

## Do Not Mark Complete Until

- Sitemap has been submitted or explicitly deferred.
- Sitemap has been submitted or explicitly deferred.
