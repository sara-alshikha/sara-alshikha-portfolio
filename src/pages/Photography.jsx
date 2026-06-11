import React, { useState } from 'react';
import { SectionHeading, Placeholder } from '../components/ui';
import { Lightbox } from '../components/ui/Lightbox';
import { ScrollReveal } from '../components/ui/animations';
import { photography } from '../data/photography';
import { Award, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Photography = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, t } = useLanguage();
  const isArabic = language === 'ar';

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % photography.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + photography.length) % photography.length);

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-light/30 to-transparent" />
        <div className={`absolute top-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 ${isArabic ? 'left-1/4' : 'right-1/4'}`} />
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium block mb-6">{t('nav.photography')}</span>
            <h1 className={`text-5xl md:text-7xl font-bold text-white mb-8 ${isArabic ? "font-cairo" : "font-playfair"}`}>
              {t('photo.title')} <span className={`${isArabic ? "" : "italic"} text-white/80 `}>{t('photo.title_italic')}</span>
            </h1>
            <div className="w-24 h-[1px] bg-gold/40 mb-8" />
            <p className={`text-lg text-white/80 max-w-2xl leading-relaxed font-light `}>
              {t('photo.desc')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* EPA Award */}
      <section className="container mx-auto px-6 lg:px-16 pb-24">
        <ScrollReveal>
          <div className="border border-white/5 bg-navy-light/20 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img 
                src="https://res.cloudinary.com/dbh7fresh/image/upload/v1780440213/WhatsApp_Image_2026-05-06_at_4.21.14_PM_djhzt3.jpg" 
                alt="EPA 2025 Gold Winner - Long Neck Karen Village" 
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain max-h-[70vh] rounded shadow-2xl border border-white/10"
              />
            </div>
            <div className={`w-full md:w-1/2 ${isArabic ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-4 mb-4">
                <Award size={40} className="text-gold" />
                <h2 className={`text-4xl md:text-5xl font-bold text-white ${isArabic ? "font-cairo" : "font-playfair"} leading-tight`}>
                  {isArabic ? 'الفائز الذهبي' : 'EPA Gold Winner'}
                </h2>
              </div>
              <p className={`text-gold/80 text-sm tracking-[0.2em] uppercase mb-10 font-light`}>
                {isArabic ? 'جوائز التصوير الأوروبية 2025' : 'European Photography Awards 2025'}
              </p>
              
              <div className="space-y-4">
                <div className={`bg-navy/40 border border-white/10 p-6 backdrop-blur-sm hover:border-gold/30 transition-colors duration-300`}>
                  <span className={`text-gold text-xs uppercase tracking-widest block mb-3 font-medium`}>{t('photo.category')}</span>
                  <span className={`text-white text-lg tracking-wide`}>
                    {isArabic ? 'تصوير الأشخاص — الثقافة' : 'People Photography — Culture'}
                  </span>
                </div>
                
                <div className={`bg-navy/40 border border-white/10 p-6 backdrop-blur-sm hover:border-gold/30 transition-colors duration-300`}>
                  <span className={`text-gold text-xs uppercase tracking-widest block mb-3 font-medium`}>{t('photo.work')}</span>
                  <span className={`text-white ${isArabic ? "" : "italic"} text-2xl ${isArabic ? "font-cairo" : "font-playfair"} leading-relaxed block`}>
                    {isArabic ? '"قرية كارين ذات الأعناق الطويلة — شيانغ ماي، تايلاند"' : '"Long Neck Karen Village — Chiang Mai, Thailand"'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-6 lg:px-16 pb-32">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <h2 className={`text-3xl font-bold text-white ${isArabic ? "font-cairo" : "font-playfair"}`}>{t('photo.gallery')}</h2>
            <span className={`text-white/80 text-sm `}>{photography.length} {t('photo.works')}</span>
          </div>
        </ScrollReveal>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {photography.map((photo, idx) => (
            <ScrollReveal key={photo.id} delay={idx * 0.03} className="break-inside-avoid mb-4">
              <div
                className={`relative group cursor-pointer overflow-hidden border border-white/5 hover:border-gold/30 transition-colors duration-500 inline-block w-full`}
                onClick={() => openLightbox(idx)}
              >
                <img src={photo.url} alt={`Gallery Image ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-auto block transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className={`text-white text-xs tracking-[0.3em] uppercase `}>{t('photo.view')}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        total={photography.length}
        images={photography}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
        isArabic={isArabic}
      />
    </div>
  );
};

export default Photography;
