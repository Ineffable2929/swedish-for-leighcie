# Swedish for Leighcie 🐈 — owner's guide

A cat-themed mini web app that teaches practical Swedish, built as a birthday
gift. If you're reading this, the app is **yours** now — this file is everything
you need to run it, change it, or hand it to an AI assistant (like Claude) and
say "make this change for me." It's a plain website: no accounts to keep up, no
servers to babysit, nothing to install to use it.

## The fastest way to change anything
Open this folder in Claude (or any AI coding assistant) and just ask in plain
English — "add ten food words," "change the note at the top," "make it more
purple," "add a section for numbers." Point it at this file and it'll know where
everything lives. You do **not** need to understand the code below.

## Where things live (if you want to do it yourself)

Everything you'd want to change is in **`data.js`** — and usually only there:

- **The phrases.** Each one looks like:
  `{ sv: "Hej", en: "Hi / Hello", say: "hey" }`
  - `sv` = the Swedish (this is what's spoken aloud when you tap a card)
  - `en` = what it means
  - `say` = an optional "sounds-like" hint (skip it if you're unsure)
  To add a phrase, drop a new line like that into the right category's list.
- **A whole new topic.** Copy an existing category block in `CATEGORIES`, give
  it a new `id` (lowercase, no spaces), a `title`, an `emoji`, and a short
  `blurb`. The menu button and the quiz pick it up automatically.
- **The personal note** at the top of the page: edit the `message` in the
  `NOTE` object at the top of `data.js`. Keep it short and warm.

Colors live in **`styles.css`** at the very top (`:root { ... }`) — change
`--rose`, `--peach`, `--paper`, etc. The cat mascot emoji is in `index.html`.

You normally won't touch `app.js` — that's the machinery (building the cards,
the tap-to-hear pronunciation, the "Feed the Cat" quiz).

## The files
- `index.html` — the page itself.
- `data.js` — ALL the words + the personal note. **This is the file to edit.**
- `styles.css` — colors and styling (`:root` at top = the theme colors).
- `app.js` — logic. Cards, tap-to-hear (uses the phone's built-in Swedish
  voice when it has one), and the quiz. Leave this alone for normal edits.
- `DEPLOY.md` — where it's hosted and how to publish updates.
- `README.md` — a short plain-language overview.

## Publishing a change (making it go live)
The site is hosted on **Vercel**, connected to its GitHub repo. After you edit a
file, the change goes live by pushing it to GitHub — Vercel rebuilds in about a
minute. Exact commands and the live URL are in `DEPLOY.md`. Or just ask Claude:
"publish my changes" and it'll handle it.

## Good to know
- Pronunciation uses whatever voices the visitor's phone/computer has. Most have
  a Swedish voice; if not, it falls back to the default voice (still readable).
- It's a static site — there's no database, no login, no running cost.
- All on-screen text is safely escaped in `app.js` (`escapeHtml`). If you ever
  edit `app.js` and add new text to the page, keep using `escapeHtml` around it.
