# Deploy info

**Live URLs (both work — share whichever):**
- Vercel (primary): https://swedish-for-leighcie.vercel.app
- GitHub Pages (fallback): https://ineffable2929.github.io/swedish-for-leighcie/

**Repo:** https://github.com/Ineffable2929/swedish-for-leighcie (public)
**Branch / path:** `main` / `/` (root)
**First deployed:** 2026-06-07 (Pages) · 2026-06-08 (Vercel)

## To update the live site
```
cd /Users/orbit/swedish-for-leighcie
git add -A
git commit -m "describe the change"
git push
```
A single `git push` now auto-deploys to **both** GitHub Pages and Vercel
(~1 minute each). Hard-refresh on the phone if you don't see the change immediately.

## Vercel setup notes (done 2026-06-08)
- Deployed from the CLI; the GitHub repo is connected, so pushes auto-deploy.
- It's a plain static site — no framework, no build step (output = repo root).
- **Public access:** Vercel's "Deployment Protection" (login wall) was turned OFF
  for this project so anyone can open the link. If a future deploy ever asks for a
  Vercel login, re-disable it: Project → Settings → Deployment Protection →
  turn off Vercel Authentication.
- Clean URL is `swedish-for-leighcie.vercel.app` (a custom domain can be added later
  in Project → Settings → Domains).
