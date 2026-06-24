import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FallingTextEffect = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const textOptions = [
      'daddy loves u ❤️',
      'DADDY LOVES U 💖',
      'daddy loves you 💕',
      'DADDY LOVES YOU! 👑',
      'daddy loves u 💋'
    ];

    const count = 10;
    const bucketWidth = 100 / count;

    // Generate falling text items
    const generatedItems = Array.from({ length: count }).map((_, i) => {
      // Distribute x position evenly across the screen width to avoid jumbling
      const xStart = (i * bucketWidth) + (Math.random() * (bucketWidth - 10) + 5);
      const xDrift = Math.random() * 8 - 4; // very minimal drift for readability
      
      return {
        id: i,
        text: textOptions[Math.floor(Math.random() * textOptions.length)],
        xStart,
        xEnd: xStart + xDrift,
        size: Math.random() * 0.4 + 1.2, // larger size scale (1.2rem to 1.6rem)
        delay: i * 0.45, // beautifully staggered waterfall entry
        duration: Math.random() * 2 + 5.5, // slower fall duration (5.5s to 7.5s)
        rotate: Math.random() * 16 - 8, // slight tilt for charm but highly readable
      };
    });

    setItems(generatedItems);

    // Completely unmount/disable after 12 seconds to allow slow elements to finish
    const timer = setTimeout(() => {
      setVisible(false);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none pointer-events-none whitespace-nowrap font-playfair font-black text-rose-500 tracking-wider"
          initial={{
            y: '-10vh',
            x: `${item.xStart}vw`,
            rotate: 0,
            scale: 0.9,
            opacity: 0
          }}
          animate={{
            y: '110vh',
            x: `${item.xEnd}vw`,
            rotate: item.rotate,
            scale: [0.9, 1.15, 1.15, 0.9],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: "easeOut"
          }}
          style={{
            fontSize: `${item.size}rem`,
            textShadow: '0 4px 12px rgba(244, 63, 94, 0.25)'
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingTextEffect;
