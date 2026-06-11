import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FilePreviewModal = ({ isOpen, url, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
      return;
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Transform Google Drive view link to preview link for iframe
  let previewUrl = url;
  if (url && url.includes('drive.google.com/file/d/') && url.includes('/view')) {
    previewUrl = url.replace(/\/view.*$/, '/preview');
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-navy/95 backdrop-blur-xl flex flex-col items-center justify-center p-0 md:p-8"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="w-full max-w-6xl h-full flex flex-col relative bg-navy border border-white/10 md:rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-navy/90 backdrop-blur">
            <h3 className={`text-white font-medium ${isArabic ? 'font-cairo' : ''}`}>
              {isArabic ? 'معاينة المستند' : 'Document Preview'}
            </h3>
            <div className="flex items-center gap-3 md:gap-4">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-xs md:text-sm hover:text-white hover:bg-gold/10 transition-colors px-3 py-1.5 md:px-4 md:py-2 border border-gold/30 rounded-full flex items-center gap-2"
              >
                <span className="hidden md:inline">{isArabic ? 'فتح في نافذة جديدة' : 'Open in new tab'}</span>
                <ExternalLink size={16} />
              </a>
              <button
                onClick={onClose}
                className="text-white bg-white/5 border border-white/10 rounded-full hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-colors p-2 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="flex-1 relative w-full h-full bg-white">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy text-gold gap-4 z-10">
                <Loader2 size={40} className="animate-spin" />
                <p className={`text-sm ${isArabic ? 'font-cairo' : ''}`}>
                  {isArabic ? 'جاري تحميل المستند...' : 'Loading document...'}
                </p>
              </div>
            )}
            <iframe
              src={previewUrl}
              className="w-full h-full border-none"
              onLoad={() => setIsLoading(false)}
              title="Document Preview"
              allow="autoplay"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
