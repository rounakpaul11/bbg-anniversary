import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate initial particles (mainly red roses, pink petals, and occasional hearts)
    const newParticles = Array.from({ length: 35 }).map((_, i) => {
      const rand = Math.random();
      let symbol = '🌹';
      let sizeScale = 1.0;
      
      if (rand < 0.5) {
        symbol = '🌹'; // Red Rose
        sizeScale = 1.3;
      } else if (rand < 0.8) {
        symbol = '🌸'; // Pink Petal
        sizeScale = 0.9;
      } else {
        symbol = '❤️'; // Red Heart
        sizeScale = 1.0;
      }

      const xStart = Math.random() * 100;
      const xDrift = Math.random() * 20 - 10; // Drift left or right by up to 10vw
      
      return {
        id: i,
        symbol,
        xStart,
        xEnd: xStart + xDrift,
        size: (Math.random() * 0.7 + 0.6) * sizeScale, // randomized scale
        delay: Math.random() * 10, // spread start times
        duration: Math.random() * 5 + 6, // slow fall duration (6 to 11 seconds)
        rotateSpeed: Math.random() * 360 - 180, // degrees of rotation
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
            opacity: [0, 0.75, 0.75, 0] // Fade in at top, stay visible, fade out at bottom
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            fontSize: `${p.size * 1.6}rem`,
            filter: 'drop-shadow(0 4px 8px rgba(225, 29, 72, 0.15))'
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
