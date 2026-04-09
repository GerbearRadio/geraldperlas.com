# GeraldPerlas.com — Analog Archive (Stable Build)

This build restores the **original Analog/Brutal look** (scanlines, grain, minimal typography) **and** keeps all requested features working:
- JSON-driven project grid (cards render from `data/projects.json`)
- Search + tag chips + category filters + Featured filter
- Sort dropdown (Manual/Newest/Oldest/Title)
- About section (photo + description)
- Social links (buttons)
- Behind the Scenes page (`bts.html`) with password gate
- Contact section (email + copy email + resume + Formspree form)
- Sample placeholder media you can replace

---

## Deploy (cleanest method)
1. Unzip this package
2. Replace **everything** in your GitHub repo with these files/folders (same level as `index.html`)
3. Commit + push
4. Hard refresh your browser (Cmd+Shift+R)

### Quick live checks
Open these URLs on your live site:
- `/data/projects.json`
- `/data/site-config.json`
- `/assets/sample-photo.svg`
- `/bts.html`

---

## What you edit most often
### 1) Projects
Edit: `data/projects.json`

Each project controls:
- card title/meta/description
- category (`photo`, `video`, `design`)
- tags (for tag chips)
- `featured` and `sortOrder`
- thumbnail (`thumb`) and hero (`viewerSrc`)
- optional `gallery`

### 2) Site settings
Edit: `data/site-config.json`

This controls:
- your name (`siteTitle`)
- About block (`about.*`)
- social buttons (`socialLinks`)
- contact (`contact.*`)
- BTS (`bts.*`)

### 3) Media
Replace files in: `assets/`

---

## Replacing sample media (easy)
All placeholders live in `assets/`:
- `sample-photo.svg`
- `sample-design.svg`
- `sample-video-thumb.svg`
- `profile-placeholder.svg`
- `bts-*.svg`

**Easiest method:** replace the file contents but **keep the same filename**.  
Then you usually don’t need to change any JSON.

---

## BTS password
BTS is at: `/bts.html`

Config is in `data/site-config.json` → `bts`.

This build uses:
- `salt: "gp"`
- `passwordHash` = sha256(`salt + password`)

Current password is whatever you set in your config zip.

---

## Contact form (Formspree)
In `data/site-config.json` → `contact.formspreeEndpoint`

Replace:
- `https://formspree.io/f/YOUR_FORM_ID`

with your real endpoint (example: `https://formspree.io/f/abcdwxyz`).

To hide contact:
- set `contact.enabled` to `false`

---

## Troubleshooting
### “Projects could not load”
- Confirm `/data/projects.json` loads as JSON
- Confirm `/js/script.js` loads (not 404)
- Hard refresh the browser

### Images not showing
- Confirm the file exists in `/assets`
- Keep filenames the same or update `thumb/viewerSrc` in `data/projects.json`
