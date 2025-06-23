import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/lib/portfolioData";

interface PortfolioSectionProps {
  sectionId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PortfolioSection({ sectionId, isOpen, onClose }: PortfolioSectionProps) {
  if (!isOpen) return null;

  const section = portfolioData[sectionId];
  if (!section) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dvd-dark bg-opacity-95 z-40 overflow-y-auto"
    >
      <div className="container mx-auto px-6 py-12 h-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-black animate-glow font-retro">
            {section.title}
          </h2>
          <Button
            onClick={onClose}
            className="dvd-button px-6 py-3 rounded font-mono"
            variant="ghost"
          >
            <ArrowLeft className="mr-2" size={20} />
            BACK TO MENU
          </Button>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          {section.content ? (
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items?.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="dvd-button rounded-lg p-4 group"
                >
                  <img 
                    src={item.src} 
                    alt={item.caption}
                    className="w-full h-48 object-cover rounded mb-4 border-2 border-dvd-cyan group-hover:border-dvd-gold transition-colors duration-300" 
                  />
                  <h4 className="font-mono text-dvd-cyan text-sm mb-2">{item.caption}</h4>
                  {item.description && (
                    <p className="text-xs text-gray-400 font-mono">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
