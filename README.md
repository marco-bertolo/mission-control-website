# Mission Control — Official Game Website

> An asymmetric cooperative puzzle game. One astronaut. One manual. One chance to return home.
> Developed by **Laced Labs** in Unity 3D.

The promotional landing page for *Mission Control*, a space-survival puzzle game. The site presents the game's premise, features, mission structure, development team, partners, and soundtrack — in both **English** and **Portuguese**.

🔗 **Live site:** https://marco-bertolo.github.io/mission-control-website/

---

## Table of Contents

- [About the Game](#about-the-game)
- [Features of the Site](#features-of-the-site)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Running Locally](#running-locally)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Editing Content](#editing-content)
- [Credits](#credits)

---

## About the Game

*Mission Control* is an **asymmetric cooperative puzzle game**. One player is the astronaut aboard a failing ship; the other reads the operator's manual and relays instructions. Communication is everything — and there is only one chance to return home.

- **Studio:** Laced Labs
- **Engine:** Unity 3D
- **Genre:** Asymmetric co-op · Puzzle · Space survival
- **Difficulty modes:** Normal · Hard · Nightmare

---

## Features of the Site

- 🌐 **Bilingual** — full English 🇬🇧 and Portuguese 🇵🇹 content via a lightweight i18n layer.
- 🎨 **Live tweaks panel** — an in-page design panel for experimenting with theme/layout settings.
- 🖼️ **Rich media** — key art, character cards, ship galleries, and mission screenshots.
- 🎧 **Embedded soundtrack player** — streams the track *"Alarme do Vazio"*.
- 📄 **Operator's manual** — the in-game PDF manual is linked for download.
- 📱 **Responsive** — single-page layout that adapts to mobile and desktop.

### Page sections

`Premise` · `Features` · `Missions` · `Team` · `Partners` · `Soundtrack`

---

## Tech Stack

No build step is required — everything runs directly in the browser.

| Layer        | Technology                                             |
|--------------|--------------------------------------------------------|
| UI framework | [React 18](https://react.dev/) (UMD build via CDN)     |
| JSX compiler | [Babel Standalone](https://babeljs.io/) (in-browser)   |
| Styling      | Vanilla CSS (`styles.css`)                             |
| Fonts        | Google Fonts (Geist, Instrument Serif/Sans, JetBrains Mono) |
| Hosting      | GitHub Pages (static)                                  |

> ℹ️ React and Babel are loaded from `unpkg.com`, and JSX is transpiled **in the browser** at load time. This keeps the project dependency-free and buildless, at the cost of some first-load performance. For a production game launch you'd typically pre-compile with Vite/esbuild — but for a static showcase this is intentionally simple.

---

## Project Structure

```
mission-control-website/
├── index.html          # Entry point (loads React, Babel, and all scripts)
├── styles.css          # All site styling
├── app.jsx             # Main application & page sections
├── i18n.jsx            # English/Portuguese dictionaries + language context
├── icons.jsx           # SVG icon components
├── image-slot.js       # Image slot / media helper
├── tweaks-panel.jsx    # In-page design tweaks panel
├── assets/             # Images, logos, soundtrack (.mp3), manual (.pdf)
├── .nojekyll           # Tells GitHub Pages to serve files as-is (no Jekyll)
└── README.md
```

---

## Running Locally

Because the browser blocks loading local `.jsx` files over the `file://` protocol, you need to serve the folder over HTTP. Any static server works:

**Python** (no install needed on most systems):

```bash
python -m http.server 8000
```

**Node.js:**

```bash
npx serve .
```

Then open **http://localhost:8000** in your browser.

---

## Deployment (GitHub Pages)

This repository is published automatically via GitHub Pages from the `main` branch.

**To (re)configure Pages:**

1. Go to the repository's **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **`main`** and folder **`/ (root)`**, then **Save**.
4. After a minute or two the site is live at the URL shown at the top of the Pages settings.

Every push to `main` triggers a redeploy. No build step runs — the files are served exactly as committed. The `.nojekyll` file ensures GitHub serves all files (including those that Jekyll would otherwise ignore).

---

## Editing Content

- **Text & translations:** edit the `en` and `pt` dictionaries in [`i18n.jsx`](./i18n.jsx). Every visible string has an entry in both languages — keep them in sync.
- **Layout & sections:** edit [`app.jsx`](./app.jsx).
- **Styling:** edit [`styles.css`](./styles.css).
- **Media:** drop new images/audio into [`assets/`](./assets/) and reference them by relative path (e.g. `assets/key-art.png`).

---

## Credits

- **Game & site:** [Laced Labs](https://lacedlabs.pt) · [Instagram](https://www.instagram.com/laced_labs/)
- **Soundtrack:** *Alarme do Vazio*
- Developed as part of a project at **ISTEC**, with partner **FunPunch**.

---

<sub>Built with React + Babel · Hosted on GitHub Pages</sub>
