import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FallingTextEffect = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const textOptions = [
      'daddy loves u ❤️',
      'daddy loves u 💖',
      'daddy loves u',
      'daddy loves u 💕'
    ];

    // Generate falling text items
    const generatedItems = Array.from({ length: 22 }).map((_, i) => {
      const xStart = Math.random() * 100;
      const xDrift = Math.random() * 20 - 10; // drift left/right slightly
      
      return {
        id: i,
        text: textOptions[Math.floor(Math.random() * textOptions.length)],
        xStart,
        xEnd: xStart + xDrift,
        size: Math.random() * 0.5 + 0.9, // font size scale (0.9rem to 1.4rem)
        delay: Math.random() * 1.5, // stagger startup
        duration: Math.random() * 2.5 + 3, // fall duration (3 to 5.5s)
        rotate: Math.random() * 30 - 15, // tilt angle
      };
    });

    setItems(generatedItems);

    // Completely unmount/disable after 8 seconds to prevent resource consumption
    const timer = setTimeout(() => {
      setVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none pointer-events-none whitespace-nowrap font-playfair font-black text-rose-500/90 tracking-wide"
          initial={{
            y: '-10vh',
            x: `${item.xStart}vw`,
            rotate: 0,
            scale: 0.8,
            opacity: 0
          }}
          animate={{
            y: '110vh',
            x: `${item.xEnd}vw`,
            rotate: item.rotate,
            scale: [0.8, 1.1, 1.1, 0.8],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: "linear"
          }}
          style={{
            fontSize: `${item.size}rem`,
            textShadow: '0 2px 4px rgba(244, 63, 94, 0.15)'
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingTextEffect;
