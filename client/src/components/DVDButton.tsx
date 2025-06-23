import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DVDButtonProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick: () => void;
  delay?: number;
}

export default function DVDButton({ icon: Icon, title, subtitle, onClick, delay = 0 }: DVDButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="dvd-button rounded-lg p-8 text-center cursor-pointer animate-float"
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <Icon className="mx-auto text-6xl text-dvd-gold mb-4" size={64} />
      </motion.div>
      <h3 className="text-2xl font-bold mb-2 font-retro">{title}</h3>
      <p className="text-dvd-cyan font-mono">{subtitle}</p>
      <div className="mt-4 flex justify-center space-x-1">
        {[0, 0.2, 0.4].map((animDelay, index) => (
          <motion.div
            key={index}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: animDelay 
            }}
            className="w-2 h-2 bg-dvd-gold rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
