import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lightboxImages } from "@/lib/portfolioData";

interface LightboxProps {
  isOpen: boolean;
  imageIndex: number;
  onClose: () => void;
}

export default function Lightbox({ isOpen, imageIndex, onClose }: LightboxProps) {
  const image = lightboxImages[imageIndex];

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative max-w-4xl max-h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-dvd-blue rounded-full w-10 h-10 hover:bg-dvd-light transition-colors z-10"
            >
              <X size={20} />
            </Button>
            
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={image.src}
              alt={image.caption}
              className="max-w-full max-h-full object-contain border-2 border-dvd-cyan rounded"
            />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-4"
            >
              <p className="text-dvd-cyan font-mono text-lg">{image.caption}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
