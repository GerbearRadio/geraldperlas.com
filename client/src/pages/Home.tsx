import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import MainMenu from "@/components/MainMenu";
import PortfolioSection from "@/components/PortfolioSection";
import Lightbox from "@/components/Lightbox";
import DVDLogo from "@/components/DVDLogo";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId);
  };

  const handleSectionClose = () => {
    setSelectedSection(null);
  };

  const handleLightboxOpen = (index: number) => {
    setLightboxIndex(index);
  };

  const handleLightboxClose = () => {
    setLightboxIndex(-1);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSectionClose();
        handleLightboxClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative min-h-screen scanlines video-noise">
      <LoadingScreen isVisible={isLoading} />

      {/* DVD Bouncing Logo */}
      <DVDLogo />

      {/* Animated Scanline */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-dvd-cyan to-transparent opacity-50 animate-scanline"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: isLoading ? 2.5 : 0 }}
        className="relative z-10 p-6 border-b-2 border-dvd-blue"
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Play className="text-3xl text-dvd-gold" size={32} />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-black tracking-wider animate-glow font-retro">
              CREATIVE.PORTFOLIO
            </h1>
          </div>
          <div className="hidden md:flex space-x-2 text-sm font-mono">
            <span className="px-2 py-1 bg-dvd-blue rounded border border-dvd-cyan">16:9</span>
            <span className="px-2 py-1 bg-dvd-blue rounded border border-dvd-cyan">STEREO</span>
            <span className="px-2 py-1 bg-dvd-blue rounded border border-dvd-cyan">HD</span>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: isLoading ? 3 : 0.5 }}
      >
        <MainMenu 
          onSectionSelect={handleSectionSelect}
          onLightboxOpen={handleLightboxOpen}
        />
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: isLoading ? 3.5 : 1 }}
        className="relative z-10 border-t-2 border-dvd-blue bg-dvd-dark bg-opacity-90 p-6 mt-16"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="font-mono text-dvd-cyan">&copy; 2024 CREATIVE.PORTFOLIO - All rights reserved</p>
              <p className="text-sm text-gray-400 font-mono">Optimized for GitHub Pages deployment</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="px-4 py-2 bg-dvd-blue border border-dvd-cyan rounded font-mono hover:bg-dvd-light transition-colors">
                📧 CONTACT
              </button>
              <button className="px-4 py-2 bg-dvd-blue border border-dvd-cyan rounded font-mono hover:bg-dvd-light transition-colors">
                📄 RESUME
              </button>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Modals */}
      <PortfolioSection
        sectionId={selectedSection || ''}
        isOpen={!!selectedSection}
        onClose={handleSectionClose}
      />

      <Lightbox
        isOpen={lightboxIndex >= 0}
        imageIndex={lightboxIndex}
        onClose={handleLightboxClose}
      />
    </div>
  );
}
