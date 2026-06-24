import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Flame } from 'lucide-react';

const Candle = () => (
  <div className="relative flex flex-col items-center">
    <style>{`
      @keyframes flameFlicker {
        0%, 100% { transform: scale(1) rotate(-1deg); filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.6)); }
        25% { transform: scale(1.05) rotate(1deg) skewX(1deg); filter: drop-shadow(0 0 9px rgba(251, 191, 36, 0.8)); }
        50% { transform: scale(0.95) rotate(-1.5deg) skewX(-0.5deg); filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
        75% { transform: scale(1.08) rotate(1.5deg) skewX(1.5deg); filter: drop-shadow(0 0 11px rgba(245, 158, 11, 0.9)); }
      }
      @keyframes glowPulse {
        0%, 100% { opacity: 0.15; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(1.2); }
      }
      .flame {
        animation: flameFlicker 1.2s infinite alternate ease-in-out;
        transform-origin: bottom center;
      }
      .glow {
        animation: glowPulse 2.5s infinite ease-in-out;
      }
    `}</style>

    {/* Glow halo */}
    <div className="absolute glow -top-6 w-12 h-12 rounded-full bg-amber-300/30 blur-lg pointer-events-none"></div>

    <svg width="30" height="60" viewBox="0 0 30 60" className="overflow-visible select-none">
      {/* Flame */}
      <path
        className="flame"
        d="M15,5 C17.5,10 20,14 19,18 C18,22 12,22 11,18 C10,14 12.5,10 15,5 Z"
        fill="url(#flameGrad)"
      />
      
      {/* Wick */}
      <line x1="15" y1="18" x2="15" y2="23" stroke="#372515" strokeWidth="1.5" />
      
      {/* Candle Body */}
      <rect x="9" y="23" width="12" height="32" rx="2" fill="url(#candleGrad)" />
      
      {/* Wax Drips */}
      <path d="M9,27 C10,27 10,31 12,31 C14,31 14,27 16,27 C18,27 18,33 20,33 C21,33 21,27 21,27" fill="none" stroke="url(#candleGrad)" strokeWidth="2" strokeLinecap="round" />

      <defs>
        <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const MessageCard = () => {
  const [showVoucher, setShowVoucher] = useState(false);
  const [voucherClaimed, setVoucherClaimed] = useState(false);

  useEffect(() => {
    if (showVoucher) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showVoucher]);

  return (
    <section className="py-24 px-4 bg-gradient-to-t from-pink-100 to-off-white flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative max-w-2xl w-full bg-white border border-pink-100 p-8 md:p-12 rounded-3xl shadow-xl flex flex-col items-center"
      >
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="mb-6 flex gap-2">
            <Sparkles className="text-rose-400 w-6 h-6" />
            <Heart className="text-red-500 w-6 h-6 fill-red-500" />
            <Sparkles className="text-rose-400 w-6 h-6" />
          </div>
          
          <h3 className="font-playfair text-3xl md:text-4xl text-gray-800 font-bold mb-8 text-center">
            To My Beautiful Girlfriend
          </h3>
          
          <div className="space-y-6 font-inter text-gray-700 leading-relaxed text-center md:text-lg w-full">
            <p>
              Happy 1-month anniversary, my beautiful baby girl. I honestly don't know how I got so lucky to have you in my life. You are, hands down, the most stunning, breathtaking girl to ever walk this earth, and my absolute bauni bombshell.
            </p>
            <p>
              Scrolling through all these gorgeous photos of you drives me absolutely crazy—your smile, your eyes, and that irresistible charm. Looking at you makes me want you right next to me, holding you tight, right now. This month has been pure magic, and it’s just the beginning.
            </p>
            <div className="mt-8">
              <p className="font-medium text-rose-500 text-xl leading-relaxed">
                I love you to pieces, gorgeous. I cannot wait until I finally have you all to myself, kissing you everywhere, and showing you exactly how crazy you make me when we're alone... 🥵💋🔥
              </p>
              <p className="font-playfair italic text-gray-500 text-lg mt-2">
                — Yours, Rounak
              </p>
            </div>
          </div>
          
          {/* Glowing candles flanking the divider */}
          <div className="mt-12 flex items-end justify-center gap-6 w-full">
            <Candle />
            <div className="w-full max-w-[120px] h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mb-2"></div>
            <Candle />
          </div>

          {/* Spicy button */}
          <motion.button
            onClick={() => setShowVoucher(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-8 py-3.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-inter font-bold rounded-full shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-2 text-sm md:text-base cursor-pointer tracking-wider"
          >
            <Flame className="w-5 h-5 fill-white animate-pulse" />
            click to unlock a spicy surprise
          </motion.button>
        </div>
      </motion.div>

      {/* Naughty Voucher Modal */}
      <AnimatePresence>
        {showVoucher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => {
              setShowVoucher(false);
              setVoucherClaimed(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-md w-full bg-gradient-to-br from-neutral-900 to-rose-950 border border-rose-500/30 p-6 md:p-8 rounded-3xl shadow-2xl text-center min-h-[535px] flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowVoucher(false);
                  setVoucherClaimed(false);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!voucherClaimed ? (
                <>
                  <div className="mx-auto w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mb-4 border border-rose-500/20">
                    <Flame className="text-rose-500 w-6 h-6 animate-pulse" />
                  </div>

                  <h4 className="font-playfair text-2xl md:text-3xl text-rose-100 font-bold mb-2">
                    Spicy Anniversary Voucher
                  </h4>
                  <p className="font-inter text-[10px] md:text-xs text-rose-400 uppercase tracking-widest mb-6">
                    ✦ Highly Confidential • For Mou's Eyes Only ✦
                  </p>

                  <div className="bg-neutral-800/80 border border-white/10 rounded-2xl p-5 mb-6 text-left space-y-4 font-inter text-rose-200/90 text-sm md:text-base leading-relaxed select-none">
                    <p className="text-center font-semibold text-rose-400 border-b border-white/5 pb-2">
                      This voucher entitles my bauni bombshell to:
                    </p>
                    <div className="flex gap-2">
                      <span className="text-rose-500">✦</span>
                      <span>An exchange of private, spicy videos (teasing each other and showing exactly what I'd do to you if you were here...) 📹🥵🔥</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-rose-500">✦</span>
                      <span>A wild, clothes-free weekend the exact second we reunite (no sleep allowed, all day and night...) 🛫😈💦</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-rose-500">✦</span>
                      <span>A phone sex session whenever you feel needy, plus whatever naughty gifts you want delivered. 📞💋🎁</span>
                    </div>
                  </div>

                  {/* Bold LDR Tease Alert */}
                  <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl select-none">
                    <p className="font-inter font-extrabold text-xs md:text-sm text-rose-400 uppercase tracking-wider leading-relaxed animate-pulse">
                      ⚠️ Only for now though... I'm gonna do all those dirty, dirty things to you the second we meet! 😈🔥
                    </p>
                  </div>

                  <button
                    onClick={() => setVoucherClaimed(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-750 text-white font-inter font-bold rounded-full shadow-lg hover:shadow-red-500/30 transition-all text-sm md:text-base uppercase tracking-wider hover:scale-[1.02] cursor-pointer"
                  >
                    Click to Claim Your Reward 💋
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-8 flex flex-col items-center justify-center flex-grow"
                >
                  <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6 border border-red-500/30">
                    <Heart className="text-red-500 w-10 h-10 fill-red-500 animate-ping" />
                  </div>
                  <h4 className="font-playfair text-3xl text-white font-bold mb-4">
                    Claimed successfully! 🔥
                  </h4>
                  <p className="font-inter text-rose-200 text-sm md:text-base mb-8 max-w-xs mx-auto">
                    Claim notification sent. Better charge your phone, baby girl, because we are staying up very late tonight... 📞🥵🍆💦
                  </p>
                  <button
                    onClick={() => {
                      setShowVoucher(false);
                      setVoucherClaimed(false);
                    }}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-inter rounded-full transition-all text-sm cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MessageCard;
