# Analog Brutal Portfolio (Grid-First, VHS Layer)

This is a **brutal-minimal** portfolio with an **analog camcorder (VHS) UI layer**.
Deploy-ready for GitHub Pages.

## Features
- Minimal grid-first layout
- Category filtering (ALL / PHOTO / VIDEO / DESIGN)
- VHS scanlines + animated film grain overlay
- Subtle RGB split hover
- Randomized timecodes per load
- Click-to-open fullscreen modal (image or video iframe)
- Flicker transition on filter + modal open/close

## Customize

### 1) Update name + title
Edit `index.html`:
- Replace `YOUR NAME` in the header/footer
- Replace the `<title>`

### 2) Add projects
Duplicate a `<article class="card">` block inside `.grid`.

Each card supports:
- `data-category="photo|video|design"`
- `data-type="image|video"`
- `data-src="assets/yourfile.jpg"` OR a YouTube/Vimeo embed link for video
- `data-title="Project Title"`

### 3) Replace images
Put your thumbnails and full images in `/assets` and update the `src` paths.

Suggested filenames:
- `photo1.jpg`, `video1.jpg`, `design1.jpg` (or whatever you prefer)

### 4) Deploy to GitHub Pages
1. Create repo and upload these files
2. Settings → Pages
3. Deploy from `main` branch `/root`

## Notes
- For Vimeo embeds: use `https://player.vimeo.com/video/VIDEO_ID`
- Keep thumbnails lightweight (<500kb) for speed.


## New in this version
- GitHub Pages-friendly JSON project system (`data/projects.json`)
- Search + auto-generated tag chips
- Detailed update guide: `HOW_TO_UPDATE_PORTFOLIO.md`
