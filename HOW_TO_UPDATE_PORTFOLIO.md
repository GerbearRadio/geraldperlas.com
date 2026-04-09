# How to Update Your Portfolio

Everything content-related lives in **two files**. You rarely need to touch HTML, CSS, or JS.

```
data/
  site-config.json   ← your info, bio, links, contact settings
  projects.json      ← every project card on the homepage

assets/              ← your images, videos, PDF resume
```

---

## Deploying to GitHub Pages

### First-time setup

1. Push this repo to GitHub (repo can be public or private).
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Set branch to `main` (or `master`) and folder to `/ (root)`.
5. Click **Save**. Your site will be live at `https://yourusername.github.io/repo-name/` within ~60 seconds.

> **Custom domain (geraldperlas.com):** The `CNAME` file already contains your domain. In your DNS provider, add an `A` record pointing to GitHub's IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) or a `CNAME` record pointing `www` to `yourusername.github.io`.

### Every update after that

Just commit and push — GitHub Pages auto-deploys on every push to `main`.

```bash
git add .
git commit -m "Add new project: Project Name"
git push
```

### Testing locally (required before first push)

The site uses `fetch()` to load JSON, which won't work from `file://`. Use any of these:

```bash
# Python (built-in, no install needed)
python3 -m http.server 8080
# Then open http://localhost:8080

# Node (if you have it)
npx serve .

# VS Code: install the "Live Server" extension, right-click index.html → Open with Live Server
```

---

## Editing your bio & settings — `data/site-config.json`

Open `data/site-config.json` in any text editor. Every field is optional — remove any key you don't need.

### Site identity

```json
"siteTitle": "GERALD PERLAS",
"siteDescription": "One sentence about you — used in Google search snippets and link previews.",
"canonicalUrl": "https://geraldperlas.com/",
"ogImage": "https://geraldperlas.com/assets/og-cover.jpg"
```

| Field | What it does |
|---|---|
| `siteTitle` | Name shown in the header logo, browser tab, and all footers |
| `siteDescription` | SEO meta description (≤160 characters recommended) |
| `canonicalUrl` | Your full URL — helps Google avoid duplicate-content issues |
| `ogImage` | Image shown when you share a link on social media (use a full URL, 1200×630 px recommended) |

### About section

```json
"about": {
  "enabled": true,
  "heading": "Yuh Found Me! 😏",
  "description": "Your bio here...",
  "profilePhoto": "assets/your-photo.jpg",
  "alt": "Your name — profile photo"
}
```

To **hide** the about section entirely: set `"enabled": false`.

To update your **profile photo**: drop a new image in `assets/`, update `"profilePhoto"` to match the filename.

> **Image tip:** Keep profile photos under 300 KB. A 400×400 JPG at 80% quality is plenty. The large `profile-placeholder.png` (~1.5 MB) in the original should be replaced with your real photo.

### Social links

```json
"socialLinks": [
  { "label": "Instagram", "url": "https://instagram.com/yourhandle" },
  { "label": "LinkedIn",  "url": "https://linkedin.com/in/yourhandle" },
  { "label": "Beacons",   "url": "https://beacons.ai/yourhandle" }
]
```

Add, remove, or reorder as many links as you want. Labels appear as clickable chips in the About section. Use `"mailto:you@email.com"` to make an email link — it won't get a `target="_blank"` automatically.

### Contact section

```json
"contact": {
  "enabled": true,
  "email": "you@example.com",
  "resumeUrl": "assets/Your_Resume_2026.pdf",
  "resumeLabel": "Resume",
  "enableCopyEmail": true,
  "enableForm": true,
  "formspreeEndpoint": "https://formspree.io/f/YOUR_ID"
}
```

- **Disable the section:** `"enabled": false`
- **Disable only the form:** `"enableForm": false`
- **Disable copy-email button:** `"enableCopyEmail": false`
- **Update your resume:** replace the PDF in `assets/`, update `"resumeUrl"` to match

#### Formspree setup (contact form)

The contact form needs a free Formspree account to send email:

1. Sign up at [formspree.io](https://formspree.io) (free tier: 50 submissions/month).
2. Create a new form — copy the endpoint URL (looks like `https://formspree.io/f/abcdefgh`).
3. Paste it into `"formspreeEndpoint"` in `site-config.json`.

### Behind the Scenes (BTS) password

The BTS page is password-protected using a SHA-256 hash stored in the config. To change the password:

1. Decide on a new password, e.g. `mysecret`.
2. Generate a hash: open your browser console (F12) and run:
   ```js
   const salt = "gp"; // keep this the same or change it
   const pw = "mysecret";
   crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + pw))
     .then(b => console.log(Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,"0")).join("")));
   ```
3. Copy the printed hash into `"passwordHash"` in `site-config.json`.
4. Update `"hint"` to whatever you want visitors to see at the prompt.

---

## Adding & editing projects — `data/projects.json`

This file is an array of project objects. Each object = one card on the homepage.

### Minimal project (just the basics)

```json
{
  "id": "my-project",
  "title": "My Project",
  "category": "photo",
  "type": "image",
  "thumb": "assets/my-thumb.jpg",
  "year": "2026",
  "description": "A short description shown in the detail panel."
}
```

### Full project (all options)

```json
{
  "id": "brand-refresh",
  "title": "Brand Refresh",
  "category": "design",
  "subcategory": "Branding",
  "type": "image",
  "thumb": "assets/brand-thumb.jpg",
  "viewerSrc": "assets/brand-full.jpg",
  "detailPage": "project-brand-refresh.html",
  "year": "2026",
  "role": "Art Direction",
  "meta": "Design / Branding",
  "description": "Full brand overhaul for a sustainable fashion label — identity, type system, and packaging.",
  "tags": ["design", "branding", "identity"],
  "featured": true,
  "sortOrder": 1,
  "gallery": [
    { "type": "image", "src": "assets/brand-01.jpg" },
    { "type": "image", "src": "assets/brand-02.jpg" }
  ]
}
```

### Field reference

| Field | Required | Notes |
|---|---|---|
| `id` | ✅ | Unique slug, lowercase, no spaces (e.g. `"urban-silence"`) |
| `title` | ✅ | Displayed on the card and in the detail panel |
| `category` | ✅ | Must be `"photo"`, `"video"`, or `"design"` — controls the filter buttons |
| `type` | ✅ | `"image"` or `"video"` — controls the modal viewer |
| `thumb` | ✅ | Path to the thumbnail shown on the grid card |
| `viewerSrc` | | Full image/video URL opened in the modal. Defaults to `thumb` if omitted |
| `detailPage` | | Path to a dedicated project HTML page (see below). Link appears in the detail panel |
| `year` | | Shown in the detail panel meta row |
| `role` | | Shown in the detail panel meta row (e.g. `"Photography"`, `"Direction / Edit"`) |
| `meta` | | Small label under the card title. Auto-generated from `category/subcategory` if omitted |
| `description` | | Text shown in the slide-out detail panel |
| `tags` | | Array of strings — builds the tag filter chips. Use lowercase |
| `featured` | | `true` to include in the FEATURED filter |
| `sortOrder` | | Number controlling manual sort order (lower = first). Default sort is MANUAL |
| `gallery` | | Array of `{type, src}` objects — reserved for future gallery expansion |

### Category values

| Value | Filter button it maps to |
|---|---|
| `"photo"` | PHOTO |
| `"video"` | VIDEO |
| `"design"` | DESIGN |

Use exactly these strings. Any other value will still show under ALL but won't match a named filter.

### Embedding YouTube / Vimeo videos

Set `"type": "video"` and use an embed URL for `viewerSrc`:

```json
"type": "video",
"thumb": "assets/video-thumb.jpg",
"viewerSrc": "https://www.youtube.com/embed/VIDEO_ID"
```

For Vimeo: `"https://player.vimeo.com/video/VIDEO_ID"`

The embed URL is **not** the regular watch URL — it must be the `/embed/` version.

### Controlling sort order

The default sort is **MANUAL** (uses `sortOrder`). Lower numbers appear first.

```json
{ "id": "featured-project", "sortOrder": 1, ... },
{ "id": "second-project",   "sortOrder": 2, ... },
{ "id": "third-project",    "sortOrder": 3, ... }
```

Visitors can switch to Newest, Oldest, or A–Z using the SORT dropdown.

---

## Adding a dedicated project page

Each project can have its own full-page case study. Copy one of the existing project pages as a template:

```bash
cp project-urban-silence.html project-my-new-project.html
```

Then edit the HTML content inside. The logo, theme toggle, and footer are all automatically updated from `site-config.json` when the page loads — you only need to update the project-specific copy and images.

Reference the page from `projects.json`:

```json
"detailPage": "project-my-new-project.html"
```

---

## Adding / replacing images

All media lives in the `assets/` folder. There's no build step — just drop files in.

### Image format guidelines

| Use case | Format | Max size |
|---|---|---|
| Project thumbnails | JPG (80% quality) | 200–400 KB |
| Full project images (modal) | JPG (85% quality) | 500 KB – 1 MB |
| Profile photo | JPG or WebP | Under 300 KB |
| OG/social share image | JPG, 1200×630 px | Under 300 KB |
| Resume | PDF | Any size |

**Free tools to compress images before uploading:**
- [Squoosh](https://squoosh.app) — browser-based, excellent quality
- [TinyPNG](https://tinypng.com) — drag and drop

### Replacing the profile photo

1. Compress your photo to under 300 KB.
2. Name it something simple: `profile.jpg`.
3. Drop it in `assets/`.
4. In `data/site-config.json`, update: `"profilePhoto": "assets/profile.jpg"`

### Replacing the resume

1. Drop your PDF in `assets/` (e.g. `Gerald_Perlas_Resume_2026.pdf`).
2. In `data/site-config.json`, update: `"resumeUrl": "assets/Gerald_Perlas_Resume_2026.pdf"`

---

## Customizing the visual design — `css/styles.css`

You can change the whole look by editing a few CSS variables at the top of `styles.css`:

```css
:root {
  --bg: #0a0a0a;       /* page background */
  --fg: #f2f2f2;       /* primary text + UI */
  --muted: #9a9a9a;    /* secondary text, labels */
  --line: #242424;     /* borders, dividers */
  --rec: #ff2e2e;      /* red accent (video HUD dot) */
  --card-ratio: 4 / 3; /* thumbnail aspect ratio: try 1/1, 16/9, 3/4 */
}
```

**Light theme variables** are in the same file under `:root[data-theme="light"]` — edit those too if you want to adjust the light mode palette.

---

## Disabling the analog effects

If you want a cleaner look, you can turn off the grain, scanlines, and flicker by deleting or commenting out these three lines in every HTML file:

```html
<!-- Remove or comment out these three lines: -->
<div class="scanlines"></div>
<div class="grain"></div>
<div class="flicker" aria-hidden="true"></div>
```

Or in `css/styles.css`, just set opacity to 0:

```css
.scanlines { opacity: 0; }
.grain     { opacity: 0; }
```

---

## Quick reference

| Task | File |
|---|---|
| Change your name, bio, photo | `data/site-config.json` → `about` |
| Add/update social links | `data/site-config.json` → `socialLinks` |
| Change your email or resume | `data/site-config.json` → `contact` |
| Add a project | `data/projects.json` — add a new object to the array |
| Remove a project | `data/projects.json` — delete the object |
| Change project order | `data/projects.json` — edit `sortOrder` numbers |
| Change card thumbnail ratio | `css/styles.css` → `--card-ratio` |
| Change site colors | `css/styles.css` → `:root` variables |
| Change BTS password | `data/site-config.json` → `bts.passwordHash` (see BTS section above) |
| Update resume PDF | Drop new PDF in `assets/`, update `contact.resumeUrl` in `site-config.json` |
