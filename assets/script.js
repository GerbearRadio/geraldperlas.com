// Portfolio Data
const portfolioData = {
  play: {
    title: 'PLAY',
    content: `
      <div class="video-showcase">
        <div class="dvd-button rounded-lg p-8 mb-8">
          <h3 class="text-2xl font-bold mb-4 text-dvd-gold">Video Highlight Reel</h3>
          <div class="video-container mb-6">
            <div class="video-placeholder">
              <div class="video-upload-area">
                <h4 class="text-lg mb-4 text-dvd-cyan">Upload Your Highlight Reel</h4>
                <p class="text-sm text-gray-400 mb-4 font-mono">
                  Replace this section with your video embed code or upload your highlight reel
                </p>
                <div class="upload-instructions">
                  <strong class="text-dvd-gold">Instructions:</strong>
                  <ul class="mt-2 space-y-1 text-dvd-cyan text-sm font-mono">
                    <li>• Upload to YouTube, Vimeo, or host directly</li>
                    <li>• Recommended: 1920x1080 resolution</li>
                    <li>• Duration: 2-5 minutes optimal</li>
                    <li>• Format: MP4, MOV, or embed code</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-400 font-mono">
            Your creative highlight reel showcasing the best of your multimedia work
          </p>
        </div>
      </div>
    `
  },
  scenes: {
    title: 'SCENE SELECTION',
    items: [
      {
        src: 'https://images.unsplash.com/photo-1574717024714-1b935f80bcf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Video Editing Projects',
        description: 'Professional video editing showcasing storytelling and technical expertise'
      },
      {
        src: 'https://images.unsplash.com/photo-1452457750107-cd084dce177d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Photography Portfolio',
        description: 'Creative photography across multiple genres and styles'
      },
      {
        src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Photo Editing & Retouching',
        description: 'Advanced photo manipulation and enhancement techniques'
      },
      {
        src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Graphic Design Works',
        description: 'Brand identity, print design, and visual communication projects'
      },
      {
        src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Motion Graphics & Animation',
        description: 'Dynamic animations, logo reveals, and motion design projects'
      }
    ]
  },
  languages: {
    title: 'LANGUAGES',
    content: `
      <div class="software-showcase">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div class="software-item dvd-button rounded-lg p-6">
            <div class="software-icon text-4xl mb-3">🎬</div>
            <h4 class="text-lg font-bold text-dvd-gold mb-2">DaVinci Resolve</h4>
            <p class="text-sm text-dvd-cyan font-mono">Professional video editing and color grading</p>
          </div>
          <div class="software-item dvd-button rounded-lg p-6">
            <div class="software-icon text-4xl mb-3">🎞️</div>
            <h4 class="text-lg font-bold text-dvd-gold mb-2">Adobe Premiere Pro</h4>
            <p class="text-sm text-dvd-cyan font-mono">Industry-standard video editing suite</p>
          </div>
          <div class="software-item dvd-button rounded-lg p-6">
            <div class="software-icon text-4xl mb-3">🖼️</div>
            <h4 class="text-lg font-bold text-dvd-gold mb-2">Adobe Photoshop</h4>
            <p class="text-sm text-dvd-cyan font-mono">Advanced photo editing and digital art</p>
          </div>
          <div class="software-item dvd-button rounded-lg p-6">
            <div class="software-icon text-4xl mb-3">✨</div>
            <h4 class="text-lg font-bold text-dvd-gold mb-2">Adobe After Effects</h4>
            <p class="text-sm text-dvd-cyan font-mono">Motion graphics and visual effects</p>
          </div>
          <div class="software-item dvd-button rounded-lg p-6">
            <div class="software-icon text-4xl mb-3">🎨</div>
            <h4 class="text-lg font-bold text-dvd-gold mb-2">Adobe Illustrator</h4>
            <p class="text-sm text-dvd-cyan font-mono">Vector graphics and logo design</p>
          </div>
          <div class="software-item dvd-button rounded-lg p-6">
            <div class="software-icon text-4xl mb-3">📄</div>
            <h4 class="text-lg font-bold text-dvd-gold mb-2">Adobe InDesign</h4>
            <p class="text-sm text-dvd-cyan font-mono">Professional layout and publishing</p>
          </div>
          <div class="software-item dvd-button rounded-lg p-6">
            <div class="software-icon text-4xl mb-3">🎮</div>
            <h4 class="text-lg font-bold text-dvd-gold mb-2">Unreal Engine</h4>
            <p class="text-sm text-dvd-cyan font-mono">3D visualization and real-time rendering</p>
          </div>
          <div class="software-item dvd-button rounded-lg p-6">
            <div class="software-icon text-4xl mb-3">🧊</div>
            <h4 class="text-lg font-bold text-dvd-gold mb-2">Blender</h4>
            <p class="text-sm text-dvd-cyan font-mono">3D modeling, animation, and rendering</p>
          </div>
        </div>
      </div>
    `
  },
  features: {
    title: 'SPECIAL FEATURES',
    content: `
      <div class="special-features">
        <div class="dvd-button rounded-lg p-8 mb-8">
          <h3 class="text-2xl font-bold mb-4 text-dvd-gold">About Me</h3>
          <p class="text-lg mb-6 font-mono text-dvd-cyan">
            Passionate multimedia creator with expertise across digital disciplines. 
            Bringing stories to life through visual artistry and technical excellence.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-mono">
            <div>
              <strong class="text-dvd-gold">SPECIALTIES:</strong>
              <ul class="mt-2 space-y-1 text-dvd-cyan">
                <li>• Video Production & Editing</li>
                <li>• Motion Graphics & Animation</li>
                <li>• Photography & Photo Editing</li>
                <li>• Graphic Design & Branding</li>
                <li>• 3D Modeling & Visualization</li>
              </ul>
            </div>
            <div>
              <strong class="text-dvd-gold">CONTACT:</strong>
              <ul class="mt-2 space-y-1 text-dvd-cyan">
                <li>• hello@portfolio.com</li>
                <li>• @CreativePortfolio</li>
                <li>• LinkedIn Profile</li>
                <li>• GitHub Repository</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="dvd-button rounded-lg p-8">
          <h3 class="text-2xl font-bold mb-4 text-dvd-gold">Behind the Scenes</h3>
          <p class="text-lg mb-6 font-mono text-dvd-cyan">
            Get an inside look at my creative process and workflow
          </p>
          <div class="bts-content">
            <div class="video-placeholder mb-6">
              <div class="video-upload-area">
                <h4 class="text-lg mb-4 text-dvd-cyan">Behind the Scenes Videos</h4>
                <p class="text-sm text-gray-400 mb-4 font-mono">
                  Upload process videos, time-lapses, or project breakdowns
                </p>
                <div class="upload-instructions">
                  <strong class="text-dvd-gold">Content Ideas:</strong>
                  <ul class="mt-2 space-y-1 text-dvd-cyan text-sm font-mono">
                    <li>• Project workflow walkthroughs</li>
                    <li>• Time-lapse creation videos</li>
                    <li>• Equipment and setup tours</li>
                    <li>• Creative process explanations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
};

const lightboxImages = [
  {
    src: 'https://images.unsplash.com/photo-1574717024714-1b935f80bcf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Video Editing Showcase'
  },
  {
    src: 'https://images.unsplash.com/photo-1452457750107-cd084dce177d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Photography Portfolio'
  },
  {
    src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Photo Editing & Retouching'
  },
  {
    src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Graphic Design Works'
  },
  {
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Motion Graphics'
  },
  {
    src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Software Proficiency'
  }
];

// DVD Bouncing Logo
class DVDBouncingLogo {
  constructor() {
    this.logo = document.getElementById('dvd-logo');
    this.position = { x: Math.random() * 200 + 50, y: Math.random() * 200 + 50 };
    this.velocity = { x: 1.8, y: 1.4 };
    this.colors = ['#3696a6', '#ef6487', '#1ce3bc'];
    this.currentColor = this.colors[0];
    this.logoWidth = 120;
    this.logoHeight = 60;
    
    this.init();
  }
  
  init() {
    // Start animation after loading screen
    setTimeout(() => {
      this.logo.style.display = 'block';
      this.animate();
    }, 3000);
    
    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());
  }
  
  animate() {
    this.updatePosition();
    this.render();
    requestAnimationFrame(() => this.animate());
  }
  
  updatePosition() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let newX = this.position.x + this.velocity.x;
    let newY = this.position.y + this.velocity.y;
    
    // Bounce off edges and change color
    if (newX <= 0 || newX >= windowWidth - this.logoWidth) {
      this.velocity.x = -this.velocity.x;
      this.changeColor();
      newX = newX <= 0 ? 0 : windowWidth - this.logoWidth;
    }
    
    if (newY <= 0 || newY >= windowHeight - this.logoHeight) {
      this.velocity.y = -this.velocity.y;
      this.changeColor();
      newY = newY <= 0 ? 0 : windowHeight - this.logoHeight;
    }
    
    this.position.x = newX;
    this.position.y = newY;
  }
  
  changeColor() {
    this.currentColor = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  
  render() {
    this.logo.style.left = `${this.position.x}px`;
    this.logo.style.top = `${this.position.y}px`;
    this.logo.style.filter = `drop-shadow(0 0 10px ${this.currentColor})`;
    
    const rect = this.logo.querySelector('rect');
    if (rect) {
      rect.setAttribute('fill', this.currentColor);
    }
  }
  
  handleResize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    this.position.x = Math.min(this.position.x, windowWidth - this.logoWidth);
    this.position.y = Math.min(this.position.y, windowHeight - this.logoHeight);
  }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize DVD bouncing logo
  new DVDBouncingLogo();
  
  // Hide loading screen and show main content
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
  }, 2500);
  
  // Add menu button click handlers
  const menuButtons = document.querySelectorAll('.menu-button');
  menuButtons.forEach(button => {
    button.addEventListener('click', function() {
      const section = this.getAttribute('data-section');
      openSection(section);
    });
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
    }
  });
});

// Section Modal Functions
function openSection(sectionId) {
  const modal = document.getElementById('portfolio-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  const section = portfolioData[sectionId];
  if (!section) return;
  
  modalTitle.textContent = section.title;
  
  if (section.content) {
    // For About section with custom content
    modalBody.innerHTML = section.content;
  } else {
    // For portfolio sections with items
    const itemsHTML = section.items.map(item => `
      <div class="work-item">
        <img src="${item.src}" alt="${item.caption}">
        <h4>${item.caption}</h4>
        <p>${item.description}</p>
      </div>
    `).join('');
    
    modalBody.innerHTML = `<div class="work-grid">${itemsHTML}</div>`;
  }
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('portfolio-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Lightbox Functions
function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  
  const image = lightboxImages[index];
  if (!image) return;
  
  lightboxImage.src = image.src;
  lightboxImage.alt = image.caption;
  lightboxCaption.textContent = image.caption;
  
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Utility Functions for Easy Customization
window.portfolioUtils = {
  // Add new portfolio item
  addPortfolioItem: function(sectionId, item) {
    if (portfolioData[sectionId] && portfolioData[sectionId].items) {
      portfolioData[sectionId].items.push(item);
    }
  },
  
  // Update section title
  updateSectionTitle: function(sectionId, newTitle) {
    if (portfolioData[sectionId]) {
      portfolioData[sectionId].title = newTitle;
    }
  },
  
  // Add lightbox image
  addLightboxImage: function(image) {
    lightboxImages.push(image);
  },
  
  // Get current portfolio data (for debugging)
  getPortfolioData: function() {
    return portfolioData;
  }
};

// Export for easy customization
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { portfolioData, lightboxImages, portfolioUtils };
}