import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export const Placeholder = ({ className = "" }) => (
  <div className={`bg-navy-light flex flex-col items-center justify-center text-white/80 p-6 ${className}`}>
    <ImageIcon size={28} className="mb-2 opacity-40" />
    <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Image Pending</span>
  </div>
);

export const SectionHeading = ({ title, subtitle, className = "", align = "center", isArabic = false }) => (
  <div className={`mb-20 ${align === "center" ? "text-center mx-auto" : "text-left"} max-w-3xl ${className}`}>
    {subtitle && (
      <span className="text-gold text-xs tracking-[0.3em] uppercase mb-5 block font-medium">
        {subtitle}
      </span>
    )}
    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight ${isArabic ? 'font-cairo text-right' : 'font-playfair'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {title}
    </h2>
    <div className={`h-[1px] w-20 bg-gold/30 mt-8 ${align === "center" ? "mx-auto" : ""}`} />
  </div>
);

export { MagneticWrapper } from './MagneticWrapper';
export { FilePreviewModal } from './FilePreviewModal';
import { MagneticWrapper } from './MagneticWrapper';

export const GoldButton = ({ children, onClick, href, type = "button", className = "", download = false }) => {
  const baseClasses = "group inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-gold hover:text-white transition-colors duration-300 " + className;

  if (href) {
    return (
      <MagneticWrapper>
        <a href={href} className={baseClasses} download={download}>
          {children}
          <span className="w-6 h-[1px] bg-gold group-hover:w-10 transition-all duration-300" />
        </a>
      </MagneticWrapper>
    );
  }

  return (
    <MagneticWrapper>
      <button type={type} onClick={onClick} className={baseClasses}>
        {children}
        <span className="w-6 h-[1px] bg-gold group-hover:w-10 transition-all duration-300" />
      </button>
    </MagneticWrapper>
  );
};

export const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
