# Quick Customization Guide

## 🎬 DVD Menu Structure

Your portfolio follows authentic DVD menu organization:

- **PLAY**: Video highlight reel section
- **SCENE SELECTION**: Project galleries by discipline  
- **LANGUAGES**: Software proficiency showcase
- **SPECIAL FEATURES**: About & behind-the-scenes

## 🖼️ Adding Your Content

### Step 1: Create Media Folder
```
build/
├── assets/
│   ├── media/          # Create this folder
│   │   ├── highlight-reel.mp4    # Your main video
│   │   ├── projects/             # Project images
│   │   └── behind-scenes/        # BTS content
```

### Step 2: Update Content by Section

#### PLAY Section (Highlight Reel)
**File:** `assets/script.js`
**Find:** `portfolioData.play.content`
**Replace with your video embed:**

```javascript
// YouTube embed example:
content: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/YOUR_VIDEO_ID"></iframe>`

// Direct video file example:
content: `<video controls width="100%"><source src="assets/media/highlight-reel.mp4" type="video/mp4"></video>`
```

#### SCENE SELECTION (Project Galleries)
**File:** `assets/script.js`
**Find:** `portfolioData.scenes.items`
**Update with your project images:**

```javascript
items: [
  {
    src: 'assets/media/projects/video-editing-1.jpg',
    caption: 'Your Video Project Title',
    description: 'Description of your video editing work'
  }
  // Add more projects...
]
```

#### LANGUAGES (Software Skills)
**File:** `assets/script.js` - Already configured with industry-standard software

#### SPECIAL FEATURES (About & BTS)
**File:** `assets/script.js`
**Find:** `portfolioData.features.content`
**Update your bio and add BTS videos**

### Step 3: Replace Placeholder URLs
Use find and replace in your editor:

**Find:** `https://images.unsplash.com/photo-`
**Replace:** `assets/media/`

Then update filenames to match your media files.

## 📝 Quick Content Updates

### Site Title
**File:** `index.html`
**Find:** `CREATIVE.PORTFOLIO`
**Replace:** `YOUR.NAME`

### Contact Info
**File:** `assets/script.js`
**Find:** Contact section in Special Features
**Update:** Your email and social links

## 🎨 Color Customization

**File:** `assets/style.css`
**Section:** `:root` variables

```css
:root {
  --dvd-blue: #YOUR_COLOR;    /* Primary buttons */
  --dvd-cyan: #YOUR_COLOR;    /* Accents and borders */
  --dvd-gold: #YOUR_COLOR;    /* Highlights */
}
```

## 🚀 Deploy to GitHub Pages

1. Upload all files from `build/` folder to your GitHub repo
2. Go to Settings > Pages
3. Select source branch
4. Site will be live at `https://username.github.io/repo-name`

## 📱 Image Size Recommendations

- **Thumbnails:** 400x300px (under 100KB)
- **Lightbox:** 1200x900px (under 500KB)
- **Previews:** 300x300px (under 50KB)

Optimize images using TinyPNG or similar tools before uploading.