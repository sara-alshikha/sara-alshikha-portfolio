import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { labelKey: 'nav.home', path: '/' },
    { labelKey: 'nav.about', path: '/about' },
    { labelKey: 'nav.portfolio', path: '/portfolio' },
    { labelKey: 'nav.photography', path: '/photography' },
    { labelKey: 'nav.awards', path: '/awards' },
    { labelKey: 'nav.contact', path: '/contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-navy/90 backdrop-blur-md py-6' : 'bg-transparent py-9'}`}>
      <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
        <Link to="/" className="font-playfair text-xl text-white tracking-widest hover:text-gold transition-colors duration-300">
          SA<span className="text-gold">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? 'text-gold' : 'text-white/80 hover:text-white'} ${language === 'ar' ? 'font-cairo text-sm font-medium' : 'text-[11px]'}`
                }
              >
                {t(link.labelKey)}
              </NavLink>
            ))}
          </nav>

          <div className="w-[1px] h-4 bg-white/20"></div>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/80 hover:text-gold transition-colors"
          >
            <Globe size={14} />
            {language === 'en' ? 'AR' : 'EN'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-6">
          <button
            onClick={toggleLanguage}
            className="text-white/80 hover:text-gold transition-colors text-xs font-medium"
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>
          <button
            className="text-white/80 hover:text-white transition-colors"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
