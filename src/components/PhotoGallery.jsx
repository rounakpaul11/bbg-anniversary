import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  '/3.jpeg', '/4.jpeg', '/5.jpeg', '/6.jpeg', '/7.jpeg', 
  '/8.jpeg', '/9.jpeg', '/10.jpeg', '/11.jpeg', '/12.jpeg',
  '/13.jpeg'
];

const captions = [
  "Damn, baby girl... absolute perfection. 😍",
  "My bauni bombshell looking absolutely irresistible. 🔥",
  "How are you even real? 😩❤️",
  "Breathtaking. Every single time. ✨",
  "Looking at you drives me crazy. I want to rip your clothes off. 🥵😈",
  "You make my heart race so fast, baby girl. 💓",
  "Absolute perfection from head to toe. 👑",
  "I could stare at this picture all day long. 🌹",
  "Genuinely the most beautiful girl in the world. 🌎❤️",
  "That look you give me... makes me want to do bad things to you. 💦🔥",
  "The happiest moment of my life: the exact second my baby girl said YES. 💍❤️"
];

const PhotoGallery = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  // Touch handlers for swiping
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-off-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-gray-800 font-bold mb-3">
            The Most Gorgeous Girl
          </h2>
          <p className="font-inter text-sm md:text-base text-rose-500 font-medium mb-6 animate-pulse">
            Tap on any picture to see exactly how you make me feel... 😉💖
          </p>
          <div className="w-24 h-1 bg-rose-300 mx-auto rounded-full"></div>
        </motion.div>

        {/* Masonry Photo Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((src, index) => {
            const isProposalPhoto = src === '/13.jpeg';
            return (
              <div
                key={index}
                className={`break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                  isProposalPhoto 
                    ? 'border-2 border-rose-400 shadow-rose-300/50 shadow-lg scale-[1.01]' 
                    : ''
                }`}
                onClick={() => setSelectedPhotoIndex(index)}
              >
                {isProposalPhoto && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-inter text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-20 flex items-center gap-1 border border-white/20 uppercase tracking-wider animate-pulse select-none">
                    💍 She Said Yes!
                  </div>
                )}
                <img 
                  src={src} 
                  alt={`Memory ${index + 1}`} 
                  className="w-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  loading="lazy"
                />
              {/* Fade gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Desktop Hover Glassmorphism Overlay */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-black/75 border border-white/10 rounded-xl p-3 shadow-lg">
                  <p className="text-white font-inter text-xs text-center font-medium drop-shadow-sm">
                    {captions[index]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Lightbox / Slideshow Overlay */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/95 p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox container */}
            <div 
              className="relative w-full max-w-3xl flex flex-col items-center justify-center h-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Image container */}
              <div className="relative flex items-center justify-center w-full flex-grow">
                {/* Left navigation arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-[-5rem] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all z-40 hidden md:block cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <motion.img
                  key={selectedPhotoIndex}
                  src={photos[selectedPhotoIndex]}
                  alt={`Memory ${selectedPhotoIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[60vh] max-w-full object-contain rounded-2xl shadow-2xl select-none"
                />

                {/* Right navigation arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-[-5rem] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all z-40 hidden md:block cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Swipe / Drag Hint & Caption Card */}
              <div className="w-full flex flex-col items-center mt-6">
                <motion.div
                  key={`caption-${selectedPhotoIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-neutral-900/90 border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl max-w-lg w-full text-center"
                >
                  <p className="text-white font-inter text-base md:text-lg font-medium tracking-wide drop-shadow-sm">
                    {captions[selectedPhotoIndex]}
                  </p>
                </motion.div>
                <p className="text-white/40 text-xs mt-3 md:hidden font-inter">Swipe left or right to browse • Tap outside to close</p>
                <p className="text-white/40 text-xs mt-3 hidden md:block font-inter">Use arrow keys or click arrows to browse • Escape to close</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
