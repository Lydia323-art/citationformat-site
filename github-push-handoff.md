# GitHub Push Handoff

Project: citationformat.site  
Local path: `E:\项目\AI编程做站\做站资料\codex做站\网站\2026-09-18-apa-citation-generator`  
Status: `WAITING_GITHUB_REMOTE`

## Completed

- Local Git repository initialized.
- Branch set to `main`.
- Project files staged with `git add .`.
- Syntax check passed with `npm run check`.
- Secret scan found no obvious token patterns.
- GitHub/Cloudflare setup docs added.

## Blockers

Git commit and push are waiting for:

- Git author name and email.
- GitHub repository URL.

## Recommended GitHub Repository

Repository name:

`citationformat-site`

Suggested visibility:

Private during setup, public later only if you want the source open.

## Commands To Run After GitHub Repo Exists

From this project root:

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git commit -m "Initial citation format MVP"
git remote add origin https://github.com/<your-github-username>/citationformat-site.git
git push -u origin main
```

If you prefer SSH:

```powershell
git remote add origin git@github.com:<your-github-username>/citationformat-site.git
git push -u origin main
```

## After Push

Use `cloudflare-pages-setup.md` to connect the repository to Cloudflare Pages.

Cloudflare Pages settings:

```text
Project root directory: site
Build command: npm run prepare:production
Build output directory: public
Functions directory: functions
```

Environment variables:

```text
SITE_URL=https://citationformat.site
CROSSREF_MAILTO=hello@citationformat.site
```
