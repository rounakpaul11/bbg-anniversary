import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Hero = ({ onOpen }) => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-red-50 py-16 md:py-20">
      <motion.div 
        className="z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* 1. Heading on top */}
        <h1 className="font-playfair text-4xl md:text-7xl font-bold text-gray-800 mb-8 drop-shadow-sm leading-tight">
          Happy 1 Month Anniversary, MOU
        </h1>

        {/* 2. Our pics (Polaroids side-by-side) */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-10 select-none">
          {/* Left Polaroid (Baby Girl) */}
          <motion.div
            initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
            animate={{ rotate: -6, scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05, rotate: -2, zIndex: 10 }}
            className="w-28 h-36 md:w-40 md:h-52 bg-white p-2 md:p-3 shadow-xl rounded-sm border border-gray-100 flex flex-col justify-between items-center"
          >
            <img src="/2.jpeg" alt="Mou" className="w-full aspect-square object-cover rounded-sm" />
            <span className="font-playfair italic font-bold text-[11px] md:text-sm text-rose-500 pb-0.5 md:pb-1.5 tracking-wide">Baby Girl</span>
          </motion.div>

          {/* Heart divider */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-rose-500 z-10"
          >
            <Heart className="w-8 h-8 fill-rose-500 animate-pulse" />
          </motion.div>

          {/* Right Polaroid (Daddy) */}
          <motion.div
            initial={{ rotate: 15, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 6, scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
            className="w-28 h-36 md:w-40 md:h-52 bg-white p-2 md:p-3 shadow-xl rounded-sm border border-gray-100 flex flex-col justify-between items-center"
          >
            <img src="/me.jpeg" alt="Rounak" className="w-full aspect-square object-cover rounded-sm" />
            <span className="font-playfair italic font-bold text-[11px] md:text-sm text-rose-500 pb-0.5 md:pb-1.5 tracking-wide">Daddy</span>
          </motion.div>
        </div>

        {/* 3. Rest of the text */}
        <p className="font-inter text-base md:text-lg text-gray-600 mb-8 max-w-xl font-light leading-relaxed">
          A website dedicated to MOU by her nerdy boyfriend Rounak 🤓.
          <span className="text-xs md:text-sm text-gray-400 mt-2 block font-normal">Celebrating the most gorgeous girl to walk the earth.</span>
        </p>

        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center justify-center px-8 py-3.5 text-base md:text-lg font-medium tracking-wide text-white transition-all duration-200 bg-rose-500 font-inter rounded-full hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          Tap to Open
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="font-inter text-xs text-rose-500 font-semibold mt-6 animate-pulse select-none"
        >
          Scroll all the way down to find a secret, spicy gift... 🤫🔥
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
