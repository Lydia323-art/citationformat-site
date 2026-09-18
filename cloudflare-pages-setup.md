# Cloudflare Pages Setup

Project: citationformat.site  
Deployment method: GitHub connected to Cloudflare Pages  
Status: `READY_FOR_MANUAL_CLOUDFLARE_SETUP`

## 1. Create Or Use A GitHub Repository

Recommended repository name:

`citationformat-site`

After the repository exists, add it as the remote for this local project:

```powershell
git remote add origin https://github.com/<your-github-username>/citationformat-site.git
git branch -M main
git push -u origin main
```

If Git asks for author identity before commit:

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## 2. Create Cloudflare Pages Project

In Cloudflare Dashboard:

1. Go to Workers & Pages.
2. Choose Pages.
3. Choose Connect to Git.
4. Select the GitHub repository.
5. Use the build settings below.

## 3. Build Settings

```text
Framework preset: None
Project root directory: site
Build command: npm run prepare:production
Build output directory: public
Functions directory: functions
```

## 4. Environment Variables

Add these in Cloudflare Pages project settings:

```text
SITE_URL=https://citationformat.site
CROSSREF_MAILTO=hello@citationformat.site
```

`CROSSREF_MAILTO` should use an email you control. Recommended setup: Cloudflare Email Routing alias `hello@citationformat.site`.

## 5. Custom Domain

After the first deployment succeeds:

1. Open the Pages project.
2. Go to Custom domains.
3. Add `citationformat.site`.
4. Follow Cloudflare DNS prompts.
5. Wait for SSL/HTTPS to become active.

## 6. Production Smoke Test

After the custom domain is active, check:

- `https://citationformat.site/`
- `https://citationformat.site/api/doi?doi=10.1037/0003-066X.59.1.29`
- `https://citationformat.site/sitemap.xml`
- `https://citationformat.site/robots.txt`
- `https://citationformat.site/apa-format/`
- `https://citationformat.site/apa-format` redirects to `/apa-format/`
- Unknown paths return 404

## 7. Search Console

After production smoke passes:

1. Add `https://citationformat.site/` to Google Search Console.
2. Submit `https://citationformat.site/sitemap.xml`.
3. Add the site to Bing Webmaster Tools.
4. Submit the same sitemap.

## Current Blocker

Actual deployment requires:

- GitHub repository URL.
- Git commit and push.
- Cloudflare Pages connection.
- Email routing confirmation for `hello@citationformat.site`.
