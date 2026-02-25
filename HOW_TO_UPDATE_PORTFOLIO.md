# HOW TO UPDATE YOUR PORTFOLIO (JSON + reusable project template)

This portfolio is **GitHub Pages-friendly** and powered by one file:

- `data/projects.json` → controls your homepage project cards **and** project detail pages (`project.html?id=...`)

---

## What changed (important)
You now have a **single reusable project detail page**:

- `project.html?id=urban-silence`
- `project.html?id=motion-study`
- `project.html?id=minimal-identity`

This means you do **NOT** need to create a separate `project-*.html` page for every new project anymore.

---

## Quick update workflow (easy version)

### 1) Replace sample media
Put your own files in the `assets/` folder (you can keep any filenames you want).

Examples:
- `assets/my-photo-project-cover.jpg`
- `assets/reel-thumb.jpg`
- `assets/brand-identity-01.jpg`
- `assets/reel.mp4` *(optional local video)*
- You can also use YouTube/Vimeo **embed URLs** in JSON.

---

### 2) Edit `data/projects.json`
Open `data/projects.json` and update (or duplicate) a project entry.

Each project entry controls:
- homepage card
- detail page content
- tags/search/filter behavior
- gallery content

---

### 3) Test locally (important)
Because the site loads JSON, do **not** open `index.html` directly with `file://...`

Use a local server:
- **VS Code + Live Server** extension (easiest)
- or terminal:
  - `python -m http.server 8000`

Then open:
- `http://localhost:8000/index.html`

---

### 4) Deploy to GitHub Pages
Upload/push the full project folder to GitHub and enable GitHub Pages.

Your JSON cards + project template will work on GitHub Pages.

---

## Project JSON structure (simple guide)

Here is one project item with what each field does:

```json
{
  "id": "urban-silence",
  "title": "Urban Silence",
  "category": "photo",
  "subcategory": "Editorial",
  "type": "image",
  "thumb": "assets/photo1.jpg",
  "viewerSrc": "assets/photo1.jpg",
  "year": "2026",
  "role": "Photography",
  "client": "Personal Project",
  "meta": "Photo / Editorial",
  "description": "Short card description shown on homepage.",
  "summary": "Longer overview shown on the project detail page.",
  "challenge": "What problem or goal the project needed to solve.",
  "approach": "How you approached the work / process.",
  "outcome": "What happened / what was delivered / results.",
  "tools": ["Camera", "Lightroom", "Photoshop"],
  "credits": "Direction, photography, retouching by You.",
  "tags": ["photo", "editorial", "minimal", "architecture"],
  "gallery": [
    { "type": "image", "src": "assets/photo1.jpg" },
    { "type": "image", "src": "assets/photo1.jpg" }
  ]
}
```

---

## Required fields (minimum)
At minimum, include these so the project card works:

- `id` *(must be unique)*
- `title`
- `category` (`photo`, `video`, or `design`)
- `thumb`
- `year`
- `description`
- `tags` *(array)*

---

## About the reusable project page link
Each homepage card automatically links to:

- `project.html?id=YOUR_ID`

So if your project has:
- `"id": "brand-refresh"`

then its detail page becomes:
- `project.html?id=brand-refresh`

No extra HTML page needed ✅

---

## Category values (for layouts)
Use these category values for the built-in grid layouts:

- `photo`
- `video`
- `design`

### Layout behavior
- **video** cards display wider on desktop
- **photo/design** cards keep a clean compact grid

---

## Video support (important)
For video projects, you have 3 options:

### Option A — YouTube embed URL (recommended)
Use an embed URL in `viewerSrc` (and optionally in `gallery`):
- `https://www.youtube.com/embed/VIDEO_ID`

### Option B — Vimeo embed URL
- `https://player.vimeo.com/video/VIDEO_ID`

### Option C — local MP4 file
- `assets/my-reel.mp4`

If you use a normal YouTube watch URL (like `watch?v=`), it may not display correctly in the embedded player. Use the `/embed/` version.

---

## Add a new project (step-by-step)

1. Open `data/projects.json`
2. Copy one full project object
3. Paste it at the end of the array (remember commas)
4. Change:
   - `id`
   - `title`
   - `category`
   - `thumb`
   - `viewerSrc`
   - text fields
   - tags
5. Save
6. Refresh the site (local server or GitHub Pages)

---

## Edit homepage card text only
Update these fields:
- `title`
- `meta`
- `description`
- `thumb`
- `year`

---

## Edit project detail page content
Update these fields:
- `summary`
- `challenge`
- `approach`
- `outcome`
- `tools`
- `credits`
- `gallery`

---

## Add tag chips
Tag chips are created automatically from all project `tags`.

Example:
```json
"tags": ["branding", "beauty", "campaign", "motion"]
```

No extra HTML editing required.

---

## Search behavior (what it searches)
The search box checks:
- title
- category
- subcategory
- role
- meta
- description
- tags

---

## Dark / light toggle
Theme preference is saved automatically in the browser (local storage).  
No setup needed.

---

## Smooth page transitions
Transitions are already wired in between:
- homepage ↔ project detail page
- category filter changes
- tag filter changes

---

## Files you’ll most often edit

### Usually edit these:
- `data/projects.json` ✅
- `assets/*` ✅

### Rarely edit these:
- `css/styles.css` (design tweaks)
- `js/script.js` (behavior/features)
- `index.html` (layout shell)
- `project.html` (detail template shell)

---

## Easy customization tips

### Change colors/theme
Edit `css/styles.css`:
- `:root { ... }` for dark theme
- `:root[data-theme="light"] { ... }` for light theme

### Change card hover animation
Edit:
- `.card:hover`
- `.card:hover .media img`

### Change category card widths
Edit:
- `@media (min-width: 980px)` grid rules for:
  - `.card[data-category="video"]`
  - `.card[data-category="photo"]`
  - `.card[data-category="design"]`

---

## Common mistakes to avoid
- Opening the site with `file://` and thinking JSON is broken
- Forgetting a comma in `projects.json`
- Reusing the same `id` twice
- Using `category: "vedio"` instead of `"video"`
- Using a non-embed YouTube URL for `viewerSrc`

---

## Optional cleanup (old files)
You may still see older files like:
- `project-urban-silence.html`
- `project-motion-study.html`
- `project-minimal-identity.html`

These are no longer required if you use `project.html?id=...`

You can keep them or remove them later.

---

## Great next upgrades (optional)
- Sort by newest / oldest
- Featured projects pinning
- Lightbox gallery
- CMS integration later (Decap / Sanity / Contentful)
- Contact form (using Formspree / Netlify Forms)


---

## Featured projects + sorting (new)
You can now control **featured filtering** and **sort order** from `data/projects.json`.

### New JSON fields
- `featured` → `true` or `false`
- `sortOrder` → number (lower number shows earlier in **Manual** sort)

### Example
```json
{
  "id": "brand-refresh",
  "title": "Brand Refresh",
  "category": "design",
  "featured": true,
  "sortOrder": 1
}
```

### How it works in the site
- **Featured chip** shows only projects with `"featured": true`
- **Sort dropdown** supports:
  - Manual (uses `sortOrder`)
  - Newest (uses `year`)
  - Oldest (uses `year`)
  - Title A–Z
  - Title Z–A


---

## About Me section (new)
Your homepage now includes an **About Me** section with:
- profile photo
- heading
- description text

### Where to edit it
Open:
- `data/site-config.json`

### Example
```json
{
  "siteTitle": "YOUR NAME",
  "siteSubtitle": "Minimal, customizable portfolio",
  "about": {
    "enabled": true,
    "heading": "About Me",
    "description": "I’m a multidisciplinary creative focused on minimal visual systems, motion, and brand storytelling.",
    "profilePhoto": "assets/profile-placeholder.svg",
    "alt": "Portrait of YOUR NAME"
  }
}
```

### Replace your photo
1. Add your image to the `assets/` folder (example: `assets/my-profile.jpg`)
2. Update `profilePhoto` in `data/site-config.json`

### Hide the About section
Set `"enabled": false` inside `about`.
