# DVD Menu Portfolio Website

A retro DVD-style portfolio website showcasing creative work in photography, photo editing, graphic design, video editing, and motion graphics.

## 🚀 Quick Setup for GitHub Pages

1. **Download/Clone** this repository
2. **Upload** the contents of the `build` folder to your GitHub repository
3. **Enable GitHub Pages** in repository settings
4. **Customize** your content following the instructions below

## 📁 File Structure

```
build/
├── index.html          # Main HTML file
├── assets/
│   ├── style.css      # All styling and animations
│   ├── script.js      # Interactive functionality
│   └── media/         # Your portfolio images (create this folder)
└── README.md          # This file
```

## 🎨 Customizing Your Portfolio

### Step 1: Adding Your Images

1. **Create a media folder**: Create `assets/media/` directory
2. **Upload your images**: Add your portfolio images to this folder
3. **Recommended formats**: JPG, PNG, WebP (for web optimization)
4. **Recommended sizes**: 
   - Thumbnail images: 400x300px
   - Lightbox images: 1200x900px
   - Background images: 1920x1080px

### Step 2: Update Portfolio Content

#### Method 1: Edit JavaScript File (Recommended)

Open `assets/script.js` and modify the `portfolioData` object:

```javascript
const portfolioData = {
  photography: {
    title: 'YOUR PHOTOGRAPHY TITLE',
    items: [
      {
        src: 'assets/media/your-photo-1.jpg',
        caption: 'Your Photo Caption',
        description: 'Detailed description of your work'
      },
      // Add more items...
    ]
  },
  // Update other sections...
};
```

#### Method 2: Using Browser Console (For Testing)

1. Open your website in a browser
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Use the built-in utility functions:

```javascript
// Add a new portfolio item
portfolioUtils.addPortfolioItem('photography', {
  src: 'assets/media/new-photo.jpg',
  caption: 'New Photo Title',
  description: 'Description of the new photo'
});

// Update section title
portfolioUtils.updateSectionTitle('photography', 'MY PHOTOGRAPHY');

// Add lightbox image
portfolioUtils.addLightboxImage({
  src: 'assets/media/lightbox-image.jpg',
  caption: 'Lightbox Image Caption'
});
```

### Step 3: Customize Sections

The website includes 6 main sections:

1. **Photography** (`photography`)
2. **Photo Editing** (`editing`)
3. **Graphic Design** (`graphics`)
4. **Video Editing** (`video`)
5. **Motion Graphics** (`motion`)
6. **About** (`about`)

#### Updating Section Content

```javascript
// For portfolio sections (photography, editing, graphics, video, motion)
portfolioData.photography = {
  title: 'MY PHOTOGRAPHY',
  items: [
    {
      src: 'assets/media/portrait-1.jpg',
      caption: 'Portrait Photography - Natural Light',
      description: 'Professional portrait using natural lighting techniques'
    }
  ]
};

// For About section (custom HTML content)
portfolioData.about = {
  title: 'ABOUT ME',
  content: `
    <div class="about-content">
      <h3>Your Name</h3>
      <p>Your professional bio and description...</p>
      <div class="skills-grid">
        <div>
          <strong>SKILLS:</strong>
          <ul>
            <li>• Your Skill 1</li>
            <li>• Your Skill 2</li>
            <li>• Your Skill 3</li>
          </ul>
        </div>
        <div>
          <strong>CONTACT:</strong>
          <ul>
            <li>• your-email@domain.com</li>
            <li>• @YourSocialHandle</li>
            <li>• Your Website</li>
          </ul>
        </div>
      </div>
    </div>
  `
};
```

### Step 4: Update Preview Grid

Update the `lightboxImages` array for the bottom preview grid:

```javascript
const lightboxImages = [
  {
    src: 'assets/media/preview-1.jpg',
    caption: 'Your Work Title 1'
  },
  {
    src: 'assets/media/preview-2.jpg',
    caption: 'Your Work Title 2'
  }
  // Add up to 6 preview images
];
```

### Step 5: Customize Site Information

#### Update Site Title and Branding

In `index.html`, find and update:

```html
<title>Your Portfolio Name - DVD Menu Style</title>
<meta name="description" content="Your portfolio description...">

<!-- In the header section -->
<h1 class="site-title">YOUR.PORTFOLIO</h1>

<!-- In the footer -->
<p>&copy; 2024 YOUR.PORTFOLIO - All rights reserved</p>
```

#### Update Contact Information

In the footer section of `index.html`:

```html
<button class="footer-btn">📧 YOUR EMAIL</button>
<button class="footer-btn">📄 YOUR RESUME</button>
```

## 🎯 Image Optimization Tips

### File Sizes
- **Thumbnails**: Keep under 100KB each
- **Full images**: Keep under 500KB each
- **Background images**: Keep under 200KB each

### Optimization Tools
- **Online**: TinyPNG, Squoosh.app
- **Software**: Photoshop, GIMP
- **Batch tools**: ImageOptim, Kraken.io

### Recommended Dimensions
```
Thumbnails: 400x300px (4:3 ratio)
Lightbox: 1200x900px (4:3 ratio)
Backgrounds: 1920x400px (wide format)
Square previews: 300x300px
```

## 🎨 Customizing Colors and Styling

### DVD Color Scheme

The website uses CSS variables for easy color customization. Edit `assets/style.css`:

```css
:root {
  --dvd-blue: #1a365d;      /* Primary blue */
  --dvd-light: #2196f3;     /* Light blue */
  --dvd-cyan: #00bcd4;      /* Cyan accents */
  --dvd-gold: #ffd700;      /* Gold highlights */
  --dvd-dark: #0a0f1c;      /* Dark background */
  --dvd-gray: #212121;      /* Gray elements */
}
```

### Adding Custom Fonts

1. **Google Fonts**: Already included (Orbitron, Courier Prime)
2. **Custom fonts**: Add to `assets/` folder and update CSS
3. **Font changes**: Update the font-family declarations in CSS

## 🔧 Advanced Customization

### Adding New Sections

1. **Update JavaScript**: Add new section to `portfolioData`
2. **Update HTML**: Add new menu button in the grid
3. **Update CSS**: Style new elements if needed

Example:
```javascript
// Add to portfolioData
web_design: {
  title: 'WEB DESIGN',
  items: [
    {
      src: 'assets/media/website-1.jpg',
      caption: 'Responsive Website Design',
      description: 'Modern responsive website with clean UI/UX'
    }
  ]
}
```

```html
<!-- Add to menu grid -->
<div class="menu-button" data-section="web_design">
  <div class="button-icon">💻</div>
  <h3>WEB DESIGN</h3>
  <p>Digital experiences</p>
  <div class="button-dots">
    <span></span><span></span><span></span>
  </div>
</div>
```

### Customizing Animations

Edit animation durations and effects in `assets/style.css`:

```css
/* Slow down DVD logo */
.dvd-logo {
  animation: fadeIn 1s ease-in-out 5s both; /* Delay appearance */
}

/* Change glow effect speed */
@keyframes glow {
  /* Modify timing and colors */
}
```

## 🚀 Deployment

### GitHub Pages
1. Upload files to your repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Custom Domain
1. Add `CNAME` file with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

### Other Hosting Options
- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Use Firebase CLI

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Mobile-friendly navigation
- Touch-friendly button sizes
- Optimized image loading
- Responsive grid layouts

## 🛠 Troubleshooting

### Images Not Loading
- Check file paths are correct
- Ensure images are uploaded to `assets/media/`
- Verify file extensions match the code

### Animations Not Working
- Check browser compatibility
- Ensure CSS files are loading correctly
- Verify JavaScript is enabled

### Performance Issues
- Optimize image file sizes
- Use WebP format for better compression
- Enable browser caching

## 📞 Support

For customization help:
1. Check browser console for errors (F12)
2. Validate HTML and CSS
3. Test on different devices and browsers

## 📄 License

This template is free to use for personal and commercial projects. Attribution appreciated but not required.

---

**Happy customizing! 🎬✨**

Transform this retro DVD menu into your personal creative showcase!