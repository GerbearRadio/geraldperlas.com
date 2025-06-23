export interface PortfolioItem {
  id: string;
  src: string;
  caption: string;
  description?: string;
}

export interface PortfolioSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  items?: PortfolioItem[];
  content?: string;
}

export const portfolioData: Record<string, PortfolioSection> = {
  photography: {
    id: 'photography',
    title: 'PHOTOGRAPHY',
    icon: 'camera',
    description: 'Capture moments in time',
    items: [
      {
        id: 'portrait-1',
        src: 'https://images.unsplash.com/photo-1452457750107-cd084dce177d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Portrait Photography - Studio Lighting Setup',
        description: 'Professional studio portrait showcasing advanced lighting techniques'
      },
      {
        id: 'landscape-1',
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Landscape Photography - Mountain Vista',
        description: 'Breathtaking mountain landscape captured during golden hour'
      },
      {
        id: 'street-1',
        src: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Street Photography - Urban Life',
        description: 'Candid street photography capturing authentic urban moments'
      }
    ]
  },
  editing: {
    id: 'editing',
    title: 'PHOTO EDITING',
    icon: 'magic-wand',
    description: 'Transform reality',
    items: [
      {
        id: 'retouch-1',
        src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Advanced Retouching - Beauty Photography',
        description: 'Professional beauty retouching with skin enhancement and color correction'
      },
      {
        id: 'color-1',
        src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Color Grading - Cinematic Look',
        description: 'Cinematic color grading for dramatic visual impact'
      }
    ]
  },
  graphics: {
    id: 'graphics',
    title: 'GRAPHIC DESIGN',
    icon: 'paintbrush',
    description: 'Visual storytelling',
    items: [
      {
        id: 'logo-1',
        src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Brand Identity Design - Modern Logo',
        description: 'Contemporary brand identity design with minimalist approach'
      },
      {
        id: 'print-1',
        src: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Print Design - Magazine Layout',
        description: 'Editorial design with sophisticated typography and layout'
      }
    ]
  },
  video: {
    id: 'video',
    title: 'VIDEO EDITING',
    icon: 'video',
    description: 'Motion narratives',
    items: [
      {
        id: 'commercial-1',
        src: 'https://images.unsplash.com/photo-1574717024714-1b935f80bcf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Commercial Edit - Product Showcase',
        description: 'High-end commercial video production with professional editing'
      },
      {
        id: 'documentary-1',
        src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Documentary Style - Interview Setup',
        description: 'Documentary-style video editing with storytelling focus'
      }
    ]
  },
  motion: {
    id: 'motion',
    title: 'MOTION GRAPHICS',
    icon: 'film',
    description: 'Animated experiences',
    items: [
      {
        id: 'logo-anim-1',
        src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Logo Animation - Brand Reveal',
        description: 'Dynamic logo animation with sophisticated transitions'
      },
      {
        id: 'explainer-1',
        src: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Explainer Video - Motion Infographic',
        description: 'Animated infographic explaining complex concepts through motion'
      }
    ]
  },
  about: {
    id: 'about',
    title: 'ABOUT',
    icon: 'user',
    description: 'Meet the creator',
    content: `
      <div class="dvd-button rounded-lg p-8 max-w-2xl mx-auto">
        <h3 class="text-2xl font-bold mb-4 text-dvd-gold">Creative Professional</h3>
        <p class="text-lg mb-6 font-mono text-dvd-cyan">
          Passionate multimedia creator with expertise in photography, design, and video production. 
          Bringing stories to life through visual artistry and technical excellence.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-mono">
          <div>
            <strong class="text-dvd-gold">SKILLS:</strong>
            <ul class="mt-2 space-y-1 text-dvd-cyan">
              <li>• Adobe Creative Suite</li>
              <li>• DSLR Photography</li>
              <li>• Video Production</li>
              <li>• Motion Graphics</li>
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
    `
  }
};

export const lightboxImages: PortfolioItem[] = [
  {
    id: 'preview-1',
    src: 'https://images.unsplash.com/photo-1452457750107-cd084dce177d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Professional Portrait Photography'
  },
  {
    id: 'preview-2',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Landscape Photography'
  },
  {
    id: 'preview-3',
    src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Graphic Design Work'
  },
  {
    id: 'preview-4',
    src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Photo Editing Project'
  },
  {
    id: 'preview-5',
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Motion Graphics Frame'
  },
  {
    id: 'preview-6',
    src: 'https://images.unsplash.com/photo-1574717024714-1b935f80bcf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Video Editing Project'
  }
];
