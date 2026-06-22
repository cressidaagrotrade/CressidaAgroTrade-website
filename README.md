# Cressida AgroTrade — Website

A premium, fully responsive marketing website for **Cressida AgroTrade**, powered by **Cressida Axis Services Ltd**. Built with plain HTML, CSS, and JavaScript — no build step, no framework, no dependencies to install.

---

## 1. What's in this folder

```
Cressida_AgroTrade_Website/
├── index.html          ← the entire site (one page, anchor-linked sections)
├── css/
│   └── styles.css      ← all styling (design tokens at the top of the file)
├── js/
│   └── script.js       ← navigation, modals, filters, animations, form handling
├── images/             ← all photos, logos, icons, certificates, favicons
└── README.md           ← this file
```

Everything uses **relative paths** (`css/styles.css`, `images/...`, etc.), so the site works correctly whether it's opened directly from your computer, hosted at the root of a domain, or hosted in a subfolder (e.g. `username.github.io/repo-name/`) — which is exactly what GitHub Pages needs.

---

## 2. Preview it locally (optional, before deploying)

You don't need any tools installed beyond a browser, but for the smoothest local preview (so relative links and the Google Maps embed behave exactly as they will online), serve the folder instead of double-clicking `index.html`:

**Option A — Python (already on most computers):**
```bash
cd Cressida_AgroTrade_Website
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

**Option B — VS Code:** install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server."

---

## 3. Deploy to GitHub Pages

### Step 1 — Create a repository
1. Go to [github.com/new](https://github.com/new) and create a new repository (e.g. `cressida-agrotrade-website`). Public repos get free GitHub Pages hosting; private repos need GitHub Pro/Team/Enterprise for Pages.
2. Don't initialize it with a README (you already have one here).

### Step 2 — Upload these files
**Easiest (no command line):**
1. Open your new repository on GitHub.
2. Click **"uploading an existing file"** on the empty repo page.
3. Drag in **everything inside this folder** (`index.html`, the `css`, `js`, and `images` folders, and this `README.md`) — make sure `index.html` ends up at the **root** of the repo, not inside a subfolder.
4. Commit the upload.

**Or, with Git command line:**
```bash
cd Cressida_AgroTrade_Website
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 3 — Turn on GitHub Pages
1. In your repository, go to **Settings → Pages**.
2. Under "Build and deployment," set **Source** to **"Deploy from a branch."**
3. Set **Branch** to `main` and the folder to **`/ (root)`**.
4. Click **Save**.
5. Wait 1–2 minutes. GitHub will show you the live URL, typically:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
   ```

That's it — the site is live. Every time you push changes to `main`, GitHub Pages redeploys automatically within a minute or two.

### Optional — Custom domain
If you own a domain (e.g. `cressidaagrotrade.com`):
1. In **Settings → Pages**, enter it under "Custom domain" and save (this creates a `CNAME` file in your repo automatically).
2. At your domain registrar, add a `CNAME` record pointing to `YOUR-USERNAME.github.io`, or `A` records pointing to GitHub's Pages IPs (GitHub's Pages docs list the current IPs).
3. Tick "Enforce HTTPS" once the certificate is issued (usually within an hour).

---

## 4. Making content edits later

Everything is plain text — no rebuild step needed. A few common edits:

| What you want to change | Where to look |
|---|---|
| Phone / email / WhatsApp number | Search `index.html` for `+2348152309634` and `cressidagroup58@gmail.com` — each appears in a few places (header CTA, footer, Contact section). |
| Commodity descriptions or list | `index.html`, inside `<section id="commodities">` — each commodity is one `<article class="commodity-card">` block. |
| Add/remove a commodity | Copy an existing `<article class="commodity-card" data-category="...">` block, swap the image, text, and `data-commodity-name`. |
| Colors / fonts | Top of `css/styles.css`, inside the `:root { ... }` block — all colors and fonts are defined once there and used everywhere. |
| Map location | `index.html`, inside `<section id="contact">` — the `<iframe>` `src` uses `https://www.google.com/maps?q=Lagos,Nigeria&z=10&output=embed`. Replace `Lagos,Nigeria` with a more specific address if/when one is available. |
| Images | Drop a new file into `images/`, then update the matching `src="images/..."` in `index.html`. Keep new photos under ~250KB where possible (resize to roughly 1200–1500px on the long edge, JPEG quality ~75–80) so the site stays fast. |

No npm, no build tools, no compiling — just edit and re-upload/push.

---

## 5. Notes on functionality

- **No backend / database.** The "Start a Sourcing Partnership," "Request Commodity Details," and "Discuss Logistics Requirements" buttons open an on-page modal that lets the visitor send their message via **WhatsApp** (`wa.me`) or their own **email app** (`mailto:`). The contact form at the bottom does the same. Nothing is transmitted through any server — it's all handled client-side, so there's nothing to break and nothing to maintain.
- **Certificates** (Certificate of Incorporation, NEPC registration) are displayed with identifying numbers already redacted in the source images.
- **Fully responsive**, tested at common Android, iPhone, tablet, and desktop breakpoints.
- **No console errors, no broken links, no dead anchors** — every nav link, button, and image reference has been verified against the actual file structure.

---

© Cressida AgroTrade — a brand of Cressida Axis Services Ltd.
