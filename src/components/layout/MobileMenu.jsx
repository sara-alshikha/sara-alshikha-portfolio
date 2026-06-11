import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/personalInfo';
import { useLanguage } from '../../context/LanguageContext';

const MobileMenu = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const isArabic = language === 'ar';

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { labelKey: 'nav.home', path: '/' },
    { labelKey: 'nav.about', path: '/about' },
    { labelKey: 'nav.portfolio', path: '/portfolio' },
    { labelKey: 'nav.photography', path: '/photography' },
    { labelKey: 'nav.awards', path: '/awards' },
    { labelKey: 'nav.contact', path: '/contact' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: isArabic ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isArabic ? '-100%' : '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={`fixed top-0 ${isArabic ? 'left-0 border-r' : 'right-0 border-l'} h-full w-[80%] max-w-sm bg-navy z-50 flex flex-col lg:hidden border-white/5`}
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <div className="p-8 flex justify-between items-center">
              <span className="font-playfair text-sm tracking-widest text-white">
                SA<span className="text-gold">.</span>
              </span>
              <button onClick={onClose} className="text-white/80 hover:text-white transition-colors" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-grow flex flex-col p-8 pt-4 space-y-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `text-xl tracking-wide transition-colors ${isActive ? 'text-gold' : 'text-white/80 hover:text-white'} `
                  }
                >
                  {t(link.labelKey)}
                </NavLink>
              ))}
            </nav>

            <div className="p-8 border-t border-white/5">
              <p className="text-white/80 font-cairo text-right text-sm" dir="rtl">
                {personalInfo.nameAr}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
