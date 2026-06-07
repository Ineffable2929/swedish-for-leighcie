# Swedish for Leighcie 🐈

A cat-themed mini web app to help Leighcie learn practical Swedish for her
move to Sweden. A birthday gift from Dacia. Plain static site — no build step,
no framework, nothing to install.

## What Dacia might ask you to do

Dacia vibe-codes by voice. When she asks to change this, here's where things live.
Make the change, then redeploy (see "Deploying" below) and send her the link.

### "Add some words / phrases" or "add a category"
Everything she'll want to change is in **`data.js`** — and only `data.js`.
- Each phrase is `{ sv: "Swedish", en: "English", say: "rough sound" }`.
  - `sv` is what gets spoken aloud when you tap the card — keep it correct Swedish.
  - `say` is an optional easy "sounds-like" hint. Skip it if unsure.
- To add a phrase, drop a new object into the right category's `phrases` array.
- To add a whole new topic, copy an existing category block in `CATEGORIES`,
  give it a new `id` (lowercase, no spaces), a `title`, an `emoji`, a `blurb`,
  and its `phrases`. The nav button and quiz pick it up automatically.

### "Change the note from me"
Edit the `NOTE` object at the top of `data.js` (the `message` field). It shows
in the dashed box at the top of the page. Keep it short and warm.

### "Make it more <color/vibe>"
Colors are CSS variables at the top of **`styles.css`** (`:root { ... }`).
Change `--rose`, `--peach`, `--paper`, etc. The cat emoji mascot is in
`index.html` (the `<span class="mascot">`) and in the favicon line.

### Don't normally touch
`app.js` is the logic (rendering, tap-to-speak, the quiz). You won't need to
edit it for content changes — adding to `data.js` is enough.

## How it works (quick)
- `index.html` — page shell, loads the fonts, `data.js`, then `app.js`.
- `data.js` — ALL content (the note + every category and phrase). Edit this.
- `app.js` — builds the cards, the category nav, tap-to-hear pronunciation
  (browser `SpeechSynthesis`, Swedish voice when the device has one), and the
  "Feed the Cat" quiz.
- `styles.css` — all styling; theme colors are CSS variables in `:root`.

Pronunciation uses the visitor's device voices. Most phones/computers have a
Swedish voice; if not, it falls back to the default voice (still readable).

## Deploying
Static site hosted on **GitHub Pages** (repo: `Ineffable2929/swedish-for-leighcie`).
Chosen because the `gh` CLI is already authenticated here — no interactive login.

- **Live URL:** https://ineffable2929.github.io/swedish-for-leighcie/
- **Redeploy after edits** — just commit and push; Pages rebuilds in ~1 min:
  `cd <this folder> && git add -A && git commit -m "..." && git push`
- Pages was enabled from `main` branch, root path (`/`).
- To move to Vercel later: import this GitHub repo at vercel.com — zero config
  (no framework, output = repo root). See `DEPLOY.md` for details.

## Security note
All page text is escaped before rendering (`escapeHtml` in `app.js`), so it's
safe even though content is author-controlled. Keep using `escapeHtml` for any
new interpolated text if you edit `app.js`.
