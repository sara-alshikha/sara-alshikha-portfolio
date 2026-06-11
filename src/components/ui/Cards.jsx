import React from 'react';
import { Placeholder } from './index';
import { ExternalLink } from 'lucide-react';

export const StatCard = ({ title, value, isGold = false }) => (
  <div className={`py-10 px-8 text-center ${isGold ? '' : ''}`}>
    <div className={`text-4xl ${isArabic ? "font-cairo" : "font-playfair"} font-bold mb-3 ${isGold ? 'text-gold' : 'text-white'}`}>
      {value}
    </div>
    <div className="text-[10px] text-white/80 uppercase tracking-[0.2em]">
      {title}
    </div>
  </div>
);

export const CertificateCard = ({ certificate, isFeatured = false, isArabic = false, onPreview }) => (
  <div className="border border-white/5 hover:border-gold/20 transition-colors duration-500 h-full flex flex-col relative group" dir={isArabic ? 'rtl' : 'ltr'}>
    <div className="aspect-[4/3] overflow-hidden bg-navy-light relative">
      {certificate.image ? (
        <img src={certificate.image} alt={certificate.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
      ) : (
        <Placeholder className="w-full h-full" />
      )}
      {certificate.url && certificate.url !== '#' && (
        <button 
          onClick={() => onPreview && onPreview(certificate.url)}
          className="absolute inset-0 bg-navy/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-10 w-full h-full cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-gold/10 text-gold border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors transform scale-90 group-hover:scale-100 duration-300">
            <ExternalLink size={20} />
          </div>
        </button>
      )}
    </div>
    <div className="p-6 flex-grow flex flex-col z-0">
      <div className="flex justify-between items-start mb-3 gap-4">
        <h4 className={`font-bold text-white leading-tight ${isArabic ? "font-cairo" : "font-playfair"}`}>
          {isArabic ? certificate.titleAr : certificate.title}
        </h4>
        <span className="text-gold text-xs shrink-0 font-inter">
          {certificate.year}
        </span>
      </div>
      <p className={`text-white/80 text-sm mt-auto pt-4 border-t border-white/5 `}>
        {isArabic ? certificate.institutionAr : certificate.institution}
      </p>
    </div>
  </div>
);
