import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Placeholder } from './index';

export const Lightbox = ({ isOpen, currentIndex, total, images, onClose, onNext, onPrev, isArabic }) => {
  const handleLeftAction = () => {
    isArabic ? onNext() : onPrev();
  };

  const handleRightAction = () => {
    isArabic ? onPrev() : onNext();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleRightAction();
      if (e.key === 'ArrowLeft') handleLeftAction();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev, isArabic]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl flex flex-col items-center justify-center"
      >
        {/* Controls */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-4 md:gap-6 z-50">
          <span className="text-muted font-medium tracking-widest text-sm bg-navy/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
            {currentIndex + 1} / {total}
          </span>
          <button
            onClick={onClose}
            className="text-white bg-navy/50 border border-white/10 rounded-full hover:text-gold hover:border-gold/50 transition-colors p-2 md:p-3 backdrop-blur-sm flex items-center gap-2"
          >
            <span className="hidden md:block text-xs uppercase tracking-widest px-2">{isArabic ? 'إغلاق' : 'Close'}</span>
            <X size={24} className="md:w-8 md:h-8" />
          </button>
        </div>

        <button
          onClick={handleLeftAction}
          className="absolute left-6 text-white hover:text-gold transition-colors p-4 z-10 hidden md:block"
        >
          <ChevronLeft size={48} />
        </button>

        <button
          onClick={handleRightAction}
          className="absolute right-6 text-white hover:text-gold transition-colors p-4 z-10 hidden md:block"
        >
          <ChevronRight size={48} />
        </button>

        {/* Image Container */}
        <motion.div
          key={currentIndex}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset }) => {
            if (offset.x > 50) {
              handleLeftAction();
            } else if (offset.x < -50) {
              handleRightAction();
            }
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-5xl px-4 md:px-20 h-[70vh] flex flex-col items-center justify-center relative touch-none cursor-grab active:cursor-grabbing"
        >
          <div className="w-full h-full relative flex items-center justify-center pointer-events-none">
            {images && images[currentIndex] && (
              <img src={images[currentIndex].url} alt={`Gallery Image ${currentIndex + 1}`} loading="lazy" decoding="async" className="max-w-full max-h-full object-contain drop-shadow-2xl" />
            )}
          </div>

          <div className="absolute bottom-[-60px] md:bottom-[-40px] text-center w-full">
            <p className="text-white/60 font-medium text-sm tracking-widest uppercase">{isArabic ? 'صورة' : 'Image'} {currentIndex + 1} {isArabic ? 'من' : 'of'} {total}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
