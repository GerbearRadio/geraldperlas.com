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
  play: {
    id: 'play',
    title: 'PLAY',
    icon: 'play',
    description: 'Highlight reel showcase',
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
    id: 'scenes',
    title: 'SCENE SELECTION',
    icon: 'grid-3x3',
    description: 'Digital disciplines gallery',
    items: [
      {
        id: 'video-editing',
        src: 'https://images.unsplash.com/photo-1574717024714-1b935f80bcf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Video Editing Projects',
        description: 'Professional video editing showcasing storytelling and technical expertise'
      },
      {
        id: 'photography',
        src: 'https://images.unsplash.com/photo-1452457750107-cd084dce177d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Photography Portfolio',
        description: 'Creative photography across multiple genres and styles'
      },
      {
        id: 'photo-editing',
        src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Photo Editing & Retouching',
        description: 'Advanced photo manipulation and enhancement techniques'
      },
      {
        id: 'graphic-design',
        src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Graphic Design Works',
        description: 'Brand identity, print design, and visual communication projects'
      },
      {
        id: 'motion-graphics',
        src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        caption: 'Motion Graphics & Animation',
        description: 'Dynamic animations, logo reveals, and motion design projects'
      }
    ]
  },
  languages: {
    id: 'languages',
    title: 'LANGUAGES',
    icon: 'code',
    description: 'Software proficiency',
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
    id: 'features',
    title: 'SPECIAL FEATURES',
    icon: 'star',
    description: 'About & behind the scenes',
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

export const lightboxImages: PortfolioItem[] = [
  {
    id: 'preview-video',
    src: 'https://images.unsplash.com/photo-1574717024714-1b935f80bcf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Video Editing Showcase'
  },
  {
    id: 'preview-photo',
    src: 'https://images.unsplash.com/photo-1452457750107-cd084dce177d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Photography Portfolio'
  },
  {
    id: 'preview-editing',
    src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Photo Editing & Retouching'
  },
  {
    id: 'preview-design',
    src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Graphic Design Works'
  },
  {
    id: 'preview-motion',
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Motion Graphics'
  },
  {
    id: 'preview-software',
    src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900',
    caption: 'Software Proficiency'
  }
];
