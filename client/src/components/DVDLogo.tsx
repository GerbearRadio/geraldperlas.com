import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function DVDLogo() {
  const [position, setPosition] = useState({ x: Math.random() * 200 + 50, y: Math.random() * 200 + 50 });
  const [velocity, setVelocity] = useState({ x: 1.8, y: 1.4 });
  const [color, setColor] = useState('#00BCD4'); // Default cyan
  const logoRef = useRef<HTMLDivElement>(null);

  const colors = ['#00BCD4', '#2196F3', '#FFD700', '#FF6B35', '#9C27B0', '#4CAF50', '#FF1744', '#00E676'];

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        const logoWidth = 120;
        const logoHeight = 60;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;

        // Bounce off edges and change color
        if (newX <= 0 || newX >= windowWidth - logoWidth) {
          newVelX = -newVelX;
          setColor(colors[Math.floor(Math.random() * colors.length)]);
          newX = newX <= 0 ? 0 : windowWidth - logoWidth;
        }

        if (newY <= 0 || newY >= windowHeight - logoHeight) {
          newVelY = -newVelY;
          setColor(colors[Math.floor(Math.random() * colors.length)]);
          newY = newY <= 0 ? 0 : windowHeight - logoHeight;
        }

        setVelocity({ x: newVelX, y: newVelY });

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(animate, 16); // ~60fps
    return () => clearInterval(interval);
  }, [velocity]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const logoWidth = 120;
      const logoHeight = 60;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      setPosition(prev => ({
        x: Math.min(prev.x, windowWidth - logoWidth),
        y: Math.min(prev.y, windowHeight - logoHeight)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={logoRef}
      className="fixed pointer-events-none z-0 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: 'none'
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 3 }}
        className="relative w-30 h-15 opacity-30"
        style={{
          filter: `drop-shadow(0 0 10px ${color})`
        }}
      >
        <svg
          width="120"
          height="60"
          viewBox="0 0 120 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DVD Logo Background */}
          <rect
            width="120"
            height="60"
            rx="8"
            fill={color}
            fillOpacity="0.8"
          />
          
          {/* DVD Text */}
          <text
            x="60"
            y="25"
            textAnchor="middle"
            className="font-bold text-lg fill-white"
            style={{ fontSize: '14px' }}
          >
            DVD
          </text>
          
          {/* Video/Digital text */}
          <text
            x="60"
            y="42"
            textAnchor="middle"
            className="font-mono text-xs fill-white"
            style={{ fontSize: '8px' }}
          >
            VIDEO
          </text>
          
          {/* Decorative elements */}
          <circle cx="20" cy="30" r="3" fill="white" fillOpacity="0.7" />
          <circle cx="100" cy="30" r="3" fill="white" fillOpacity="0.7" />
          
          {/* Border highlight */}
          <rect
            width="120"
            height="60"
            rx="8"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </svg>
      </motion.div>
    </div>
  );
}