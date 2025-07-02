import { motion } from "framer-motion";
import { Disc } from "lucide-react";

interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-dvd-dark z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-32 w-32 border-4 border-dvd-cyan border-t-transparent"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Disc className="text-4xl text-dvd-gold" size={48} />
          </motion.div>
        </div>
        <motion.h2
          animate={{ 
            textShadow: [
              "0 0 10px rgb(0, 188, 212), 0 0 20px rgb(0, 188, 212), 0 0 30px rgb(0, 188, 212)",
              "0 0 20px rgb(33, 150, 243), 0 0 30px rgb(33, 150, 243), 0 0 40px rgb(33, 150, 243)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="text-2xl font-bold font-retro"
        >
          LOADING...
        </motion.h2>
        <div className="mt-4 w-64 bg-dvd-gray rounded-full h-2">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="bg-gradient-to-r from-dvd-cyan to-dvd-light h-2 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
