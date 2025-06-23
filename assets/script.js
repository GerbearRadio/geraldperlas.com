// Portfolio Data
const portfolioData = {
  photography: {
    title: 'PHOTOGRAPHY',
    items: [
      {
        src: 'https://images.unsplash.com/photo-1452457750107-cd084dce177d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Portrait Photography - Studio Lighting Setup',
        description: 'Professional studio portrait showcasing advanced lighting techniques'
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Landscape Photography - Mountain Vista',
        description: 'Breathtaking mountain landscape captured during golden hour'
      },
      {
        src: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Street Photography - Urban Life',
        description: 'Candid street photography capturing authentic urban moments'
      }
    ]
  },
  editing: {
    title: 'PHOTO EDITING',
    items: [
      {
        src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Advanced Retouching - Beauty Photography',
        description: 'Professional beauty retouching with skin enhancement and color correction'
      },
      {
        src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Color Grading - Cinematic Look',
        description: 'Cinematic color grading for dramatic visual impact'
      }
    ]
  },
  graphics: {
    title: 'GRAPHIC DESIGN',
    items: [
      {
        src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Brand Identity Design - Modern Logo',
        description: 'Contemporary brand identity design with minimalist approach'
      },
      {
        src: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Print Design - Magazine Layout',
        description: 'Editorial design with sophisticated typography and layout'
      }
    ]
  },
  video: {
    title: 'VIDEO EDITING',
    items: [
      {
        src: 'https://images.unsplash.com/photo-1574717024714-1b935f80bcf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Commercial Edit - Product Showcase',
        description: 'High-end commercial video production with professional editing'
      },
      {
        src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Documentary Style - Interview Setup',
        description: 'Documentary-style video editing with storytelling focus'
      }
    ]
  },
  motion: {
    title: 'MOTION GRAPHICS',
    items: [
      {
        src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Logo Animation - Brand Reveal',
        description: 'Dynamic logo animation with sophisticated transitions'
      },
      {
        src: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Explainer Video - Motion Infographic',
        description: 'Animated infographic explaining complex concepts through motion'
      }
    ]
  },
  about: {
    title: 'ABOUT',
    content: `
      <div class="about-content">
        <h3>Creative Professional</h3>
        <p>Passionate multimedia creator with expertise in photography, design, and video production. 
        Bringing stories to life through visual artistry and technical excellence.</p>
        <div class="skills-grid">
          <div>
            <strong>SKILLS:</strong>
            <ul>
              <li>• Adobe Creative Suite</li>
              <li>• DSLR Photography</li>
              <li>• Video Production</li>
              <li>• Motion Graphics</li>
            </ul>
          </div>
          <div>
            <strong>CONTACT:</strong>
            <ul>
              <li>• hello@portfolio.com</li>
              <li>• @CreativePortfolio</li>
              <li>• LinkedIn Profile</li>
              <li>• GitHub Repository</li>
            </ul>
          </div>
        </div>
      </div>
    `
  }
};

const lightboxImages = [
  {
    src: 'https://images.unsplash.com/photo-1452457750107-cd084dce177d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Professional Portrait Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Landscape Photography'
  },
  {
    src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Graphic Design Work'
  },
  {
    src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Photo Editing Project'
  },
  {
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Motion Graphics Frame'
  },
  {
    src: 'https://images.unsplash.com/photo-1574717024714-1b935f80bcf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Video Editing Project'
  }
];

// DVD Bouncing Logo
class DVDBouncingLogo {
  constructor() {
    this.logo = document.getElementById('dvd-logo');
    this.position = { x: Math.random() * 200 + 50, y: Math.random() * 200 + 50 };
    this.velocity = { x: 1.8, y: 1.4 };
    this.colors = ['#00BCD4', '#2196F3', '#FFD700', '#FF6B35', '#9C27B0', '#4CAF50', '#FF1744', '#00E676'];
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