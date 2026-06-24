import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate optimized particles (using only red hearts for better performance)
    const newParticles = Array.from({ length: 12 }).map((_, i) => {
      const symbol = '❤️';
      const xStart = Math.random() * 100;
      const xDrift = Math.random() * 16 - 8; // slight drift left or right by up to 8vw
      
      return {
        id: i,
        symbol,
        xStart,
        xEnd: xStart + xDrift,
        size: Math.random() * 0.5 + 0.5, // scale between 0.5 and 1.0
        delay: Math.random() * 8, // spread start times
        duration: Math.random() * 5 + 7, // slow fall duration (7 to 12 seconds)
        rotateSpeed: Math.random() * 180 - 90, // degrees of rotation
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none pointer-events-none"
          initial={{ 
            y: '-10vh', 
            x: `${p.xStart}vw`,
            scale: p.size,
            rotate: 0,
            opacity: 0
          }}
          animate={{ 
            y: '110vh',
            x: [`${p.xStart}vw`, `${(p.xStart + p.xEnd) / 2}vw`, `${p.xEnd}vw`],
            rotate: p.rotateSpeed,
            opacity: [0, 0.6, 0.6, 0] // Fade in, stay visible, fade out
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            fontSize: `${p.size * 1.5}rem`,
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;

