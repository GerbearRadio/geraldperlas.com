import { motion } from "framer-motion";
import { Play, Grid3x3, Code, Star } from "lucide-react";
import DVDButton from "./DVDButton";
import { portfolioData, lightboxImages } from "@/lib/portfolioData";

interface MainMenuProps {
  onSectionSelect: (sectionId: string) => void;
  onLightboxOpen: (index: number) => void;
}

const iconMap = {
  play: Play,
  "grid-3x3": Grid3x3,
  code: Code,
  star: Star,
};

export default function MainMenu({ onSectionSelect, onLightboxOpen }: MainMenuProps) {
  const sections = Object.values(portfolioData);

  return (
    <main className="container mx-auto px-6 py-12 bg-transparent">
      {/* DVD Menu Title */}
      <div className="text-center mb-16">
        <div className="relative mx-auto w-full max-w-4xl mb-8">
          <img 
            src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300" 
            alt="Retro DVD player interface" 
            className="w-full h-48 object-cover rounded-lg border-2 border-dvd-cyan opacity-20" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dvd-dark via-transparent to-dvd-dark"></div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h2 className="text-4xl md:text-6xl font-black text-center animate-glow font-retro">
              MAIN MENU
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Navigation Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {sections.map((section, index) => {
          const IconComponent = iconMap[section.icon as keyof typeof iconMap];
          return (
            <DVDButton
              key={section.id}
              icon={IconComponent}
              title={section.title}
              subtitle={section.description}
              onClick={() => onSectionSelect(section.id)}
              delay={index * 0.2}
            />
          );
        })}
      </div>

      {/* Featured Work Showcase */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative mb-16"
      >
        <img 
          src="https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
          alt="Vintage DVD menu screen" 
          className="w-full h-64 object-cover rounded-lg border-2 border-dvd-blue opacity-30" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dvd-dark via-transparent to-dvd-dark rounded-lg"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-4xl font-black mb-4 animate-glow font-retro">FEATURED PORTFOLIO</h3>
            <p className="text-xl text-dvd-cyan font-mono">Premium creative showcase</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Preview Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {lightboxImages.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group cursor-pointer"
            onClick={() => onLightboxOpen(index)}
          >
            <img 
              src={item.src} 
              alt={item.caption}
              className="w-full h-32 object-cover rounded border-2 border-dvd-cyan group-hover:border-dvd-gold transition-colors duration-300" 
            />
            <div className="mt-2 text-center">
              <span className="text-xs font-mono text-dvd-cyan">
                {index === 0 ? 'Video.mp4' : 
                 index === 1 ? 'Photo.jpg' : 
                 index === 2 ? 'Edit.psd' : 
                 index === 3 ? 'Design.ai' : 
                 index === 4 ? 'Motion.aep' : 
                 'Software.png'}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
