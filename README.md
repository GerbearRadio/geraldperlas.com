# Portfolio (GitHub Pages + Custom Domain)

A minimal, easily customizable portfolio that runs on GitHub Pages.  
Projects and site content are controlled by JSON, so you update your work without touching layout code.

## You will mostly edit
- `data/projects.json` — projects (homepage + project detail pages)
- `data/site-config.json` — your name, About, social links, contact, BTS gate
- `assets/` — images, thumbnails, and your resume PDF

---

## Preview locally (important)
Because the site loads JSON, do **not** open `index.html` with `file://`.

### Option A — VS Code Live Server
1. Open the folder in VS Code
2. Install **Live Server**
3. Right‑click `index.html` → **Open with Live Server**

### Option B — Python
```bash
python -m http.server 8000
```
Open:
- `http://localhost:8000/`

---

## Deploy to GitHub Pages
1. Push the files to GitHub (make sure `index.html` is at the repo root)
2. Repo → **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main`
5. Folder: **/ (root)**
6. Save

### Verify the deploy
Open these on your live site:
- `/` (homepage)
- `/data/projects.json` (should show JSON)
- `/data/site-config.json` (should show JSON)

If `/data/projects.json` 404s, Pages is publishing the wrong branch/folder.

---

## Custom domain (geraldperlas.com)
This build includes a `CNAME` file ✅.

To use a custom domain:
- Repo → Settings → Pages → **Custom domain**: `geraldperlas.com`
- Configure DNS to point your domain to GitHub Pages (A records for apex; CNAME for `www` if you use it)

---

# Edit the site

## 1) Site title + About
Edit `data/site-config.json`:

- `siteTitle`
- `siteSubtitle`

About:
- `about.enabled`
- `about.heading`
- `about.description`
- `about.profilePhoto` (example: `assets/my-profile.jpg`)
- `about.alt`

## 2) Social links (icon buttons)
Edit `data/site-config.json` → `socialLinks`:
```json
[
  { "label": "Instagram", "url": "https://instagram.com/yourhandle" },
  { "label": "LinkedIn", "url": "https://linkedin.com/in/yourname" },
  { "label": "Email", "url": "mailto:you@example.com" },
  { "label": "GitHub", "url": "https://github.com/yourname" }
]
```

## 3) Contact (email + copy + resume + Formspree)
Edit `data/site-config.json` → `contact`:
- `enabled`
- `email`, `emailLabel`
- `enableCopyEmail`
- `resumeUrl`, `resumeLabel`
- `enableForm`
- `formspreeEndpoint`

### Resume
1) Put your PDF in `assets/`  
2) Set `resumeUrl` to that file (example: `assets/My-Resume.pdf`)

### Formspree (works on GitHub Pages)
1) Create a Formspree form and copy your endpoint (example: `https://formspree.io/f/abcdwxyz`)
2) Paste into `formspreeEndpoint`

## 4) Projects (homepage + detail pages)
Edit `data/projects.json`.

Detail pages are automatic:
- `project.html?id=YOUR_ID`

Required fields:
- `id` (unique)
- `title`
- `category` (`photo`, `video`, `design`)
- `thumb`
- `year`
- `description`
- `tags` (array)

Featured + sorting:
- `featured: true`
- `sortOrder` (Manual order, lower first)

## 5) Behind the Scenes (BTS) page (password gated)
BTS page:
- `/bts.html`

Config:
- `data/site-config.json` → `bts`

Fields:
- `enabled`, `url`, `label`, `salt`, `passwordHash`, `hint`

Hash format:
- `sha256(salt + password)`

---

## UI tweaks (optional)
- Button sizing: `css/styles.css` → `--btn-h` and `--btn-px`
- Vertical rhythm: `css/styles.css` → `.page-sections { gap: ... }`

