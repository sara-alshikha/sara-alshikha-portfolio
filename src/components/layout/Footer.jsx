import React from 'react';
import { Mail } from 'lucide-react';
import { LinkedinIcon } from '../ui';
import { personalInfo } from '../../data/personalInfo';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <span className="font-playfair text-white text-sm tracking-widest">SA<span className="text-gold">.</span></span>
            <p className="text-white/80 text-xs tracking-wider">
              &copy; {year} {personalInfo.nameEn}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href={`mailto:${personalInfo.email}`} className="text-white/80 hover:text-gold transition-colors duration-300" aria-label="Email">
              <Mail size={16} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-gold transition-colors duration-300" aria-label="LinkedIn">
              <LinkedinIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
