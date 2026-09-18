# Deployment Continuation

Project: citationformat.site  
Status: `CUSTOM_DOMAIN_DNS_PENDING`  
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

The final custom domain is not live yet:

`https://citationformat.site`

Current blocker: Cloudflare needs DNS management for `citationformat.site`.

## Current Cloudflare Screen

The user is on the `Connect your domain` flow.

Fill it as follows:

```text
Domain name:
citationformat.site
```

Keep these defaults:

```text
Search: Allow
Agent: Allow
Training: Allow
Enable Bot Preference Sync: enabled
Import DNS records: Automatic
```

Do not check:

```text
I monetize pages that serve ads
```

Then click:

```text
Continue
```

## Next Steps

1. Continue the Cloudflare DNS transfer / domain connection flow.
2. Copy the two Cloudflare nameservers shown by Cloudflare.
3. Go to the domain registrar where `citationformat.site` was purchased.
4. Replace the current nameservers with the two Cloudflare nameservers.
5. Return to Cloudflare and wait for DNS activation.
6. Return to Pages -> `citationformat-site` -> Custom domains.
7. Complete custom domain binding for:

```text
citationformat.site
```

8. After SSL is active, run production smoke tests on:

```text
https://citationformat.site
```

## Production Smoke Test Checklist

- [ ] `https://citationformat.site/` returns 200.
- [ ] `https://citationformat.site/apa-format/` returns 200.
- [ ] `https://citationformat.site/apa-format` redirects to `/apa-format/`.
- [ ] `https://citationformat.site/not-real/` returns 404.
- [ ] `https://citationformat.site/sitemap.xml` returns 200 and contains `https://citationformat.site`.
- [ ] `https://citationformat.site/robots.txt` returns 200 and points to `https://citationformat.site/sitemap.xml`.
- [ ] `https://citationformat.site/api/doi?doi=10.1037%2F0003-066X.59.1.29` returns `ok: true`.
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

- Custom domain is active.
- HTTPS is active.
- Production smoke test passes on `https://citationformat.site`.
- Sitemap has been submitted or explicitly deferred.
