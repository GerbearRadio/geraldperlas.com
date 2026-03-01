# Minimal Portfolio (GitHub Pages Friendly)

This is a minimal portfolio template that works on **GitHub Pages** and is designed to be easy to update.

## What you edit most often
- `data/projects.json` → add/edit projects
- `data/site-config.json` → your name, About text/photo, social links, contact settings
- `assets/` → your images, thumbnails, resume PDF

---

## Preview locally (important)
Because the site loads JSON, do **not** open `index.html` directly with `file://`.

### Option A: VS Code Live Server
1. Open the folder in VS Code
2. Install **Live Server**
3. Right-click `index.html` → **Open with Live Server**

### Option B: Python server
```bash
python -m http.server 8000
```
Open:
- `http://localhost:8000/`

---

## Deploy with GitHub Pages
1. Create a GitHub repo and upload the files
2. GitHub → **Settings → Pages**
3. Source: `main` (or your branch) + `/ (root)`
4. Save

---

# Update your site

## 1) Name + subtitle
Edit `data/site-config.json`:
- `siteTitle`
- `siteSubtitle`

## 2) About section
Edit `data/site-config.json` → `about`:
- `heading`
- `description`
- `profilePhoto` (example: `assets/my-profile.jpg`)

## 3) Social links (icon buttons)
Edit `data/site-config.json` → `socialLinks`:
```json
[
  { "label": "Instagram", "url": "https://instagram.com/yourhandle" },
  { "label": "LinkedIn", "url": "https://linkedin.com/in/yourname" },
  { "label": "Email", "url": "mailto:you@example.com" },
  { "label": "GitHub", "url": "https://github.com/yourname" }
]
```
Icons are automatically chosen based on the label.

## 4) Contact section (Email + Copy + Resume)
Edit `data/site-config.json` → `contact`:
- `email`
- `emailLabel`
- `enableCopyEmail` (true/false)
- `resumeUrl` (example: `assets/My-Resume.pdf`)
- `resumeLabel`

## 5) Contact form (Formspree — works on GitHub Pages)
1. Create a Formspree form and copy your endpoint (example: `https://formspree.io/f/abcdwxyz`)
2. Paste it into `data/site-config.json`:
```json
"formspreeEndpoint": "https://formspree.io/f/abcdwxyz"
```
To hide the form:
```json
"enableForm": false
```

---

# Projects (JSON-driven)

## Add a project
Open `data/projects.json`, copy an existing object, paste a new one, then edit:

Required:
- `id` (unique, no spaces)
- `title`
- `category` (`photo`, `video`, `design`)
- `thumb`
- `year`
- `description`
- `tags` (array)

The detail page is automatic:
- `project.html?id=YOUR_ID`

## Featured + sorting
- `"featured": true` → shows in Featured filter
- `"sortOrder": 1` → manual order (lower numbers come first)
- Sort dropdown also supports Newest/Oldest/Title.

---

## Common mistakes
- Missing commas in JSON
- Duplicated `id`
- Using `file://` instead of a local server
- Using YouTube watch URLs instead of embed URLs (`/embed/VIDEO_ID`)


---

## Toast notification (new)
When you click **Copy Email**, you’ll see a small toast message at the bottom (e.g., “Email copied”).  
Form submit success/error messages also appear as a toast.

No setup needed — it’s built in.
