import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Award } from 'lucide-react';
import { SectionHeading, Placeholder } from '../components/ui';
import { CertificateCard } from '../components/ui/Cards';
import { ScrollReveal } from '../components/ui/animations';
import { FilePreviewModal } from '../components/ui/FilePreviewModal';
import { certificates } from '../data/certificates';
import { useLanguage } from '../context/LanguageContext';

const Awards = () => {
  const [showMore, setShowMore] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { language, t } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-light/30 to-transparent" />
        <div className={`absolute top-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 ${isArabic ? 'right-0' : 'left-0'}`} />
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium block mb-6">{t('awards.recognition')}</span>
            <h1 className={`text-5xl md:text-7xl font-bold text-white mb-8 ${isArabic ? "font-cairo" : "font-playfair"}`}>
              {t('awards.title')}
            </h1>
            <div className="w-24 h-[1px] bg-gold/40" />
          </ScrollReveal>
        </div>
      </section>

      {/* EPA Highlight */}
      <section className="container mx-auto px-6 lg:px-16 pb-32">
        <ScrollReveal>
          <div className={`border border-gold/20 bg-navy-light/20 flex flex-col md:flex-row items-center gap-12 p-8 md:p-16 relative overflow-hidden ${isArabic ? 'md:flex-row-reverse' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
            <div className="w-full md:w-1/2 relative z-10">
              <img 
                src="https://res.cloudinary.com/dbh7fresh/image/upload/v1780440213/WhatsApp_Image_2026-05-06_at_4.21.14_PM_djhzt3.jpg" 
                alt="EPA 2025 Gold Winner" 
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain rounded shadow-2xl border border-gold/10"
              />
            </div>
            <div className={`w-full md:w-1/2 relative z-10 ${isArabic ? 'text-right' : 'text-left'}`}>
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

      {/* Featured Certificates */}
      <section className="container mx-auto px-6 lg:px-16 pb-24">
        <ScrollReveal>
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium block mb-4">{t('awards.dev')}</span>
          <h2 className={`text-4xl font-bold text-white mb-16 ${isArabic ? "font-cairo" : "font-playfair"}`}>{t('awards.featured')}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.featured.map((cert, index) => (
            <ScrollReveal key={cert.id} delay={index * 0.08}>
              <CertificateCard certificate={cert} isFeatured={true} isArabic={isArabic} onPreview={setPreviewUrl} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Additional Certificates */}
      <section className="container mx-auto px-6 lg:px-16 pb-32">
        <ScrollReveal>
          <button
            onClick={() => setShowMore(!showMore)}
            className="w-full border border-white/5 hover:border-white/10 transition-colors p-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className={`text-lg text-white ${isArabic ? "font-cairo" : "font-playfair"}`}>{t('awards.additional')}</span>
              <span className="text-white/80 text-sm">+{certificates.additional.length}</span>
            </div>
            <ChevronDown className={`text-gold transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} size={20} />
          </button>
          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden border-x border-b border-white/5"
              >
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {certificates.additional.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-baseline py-4 border-b border-white/5 last:border-0">
                      <div className={isArabic ? 'text-right' : 'text-left'}>
                        {cert.url && cert.url !== '#' ? (
                          <button onClick={() => setPreviewUrl(cert.url)} className="text-start text-white text-sm mb-1 hover:text-gold transition-colors underline decoration-white/20 underline-offset-4 cursor-pointer">
                            {isArabic && cert.titleAr ? cert.titleAr : cert.title}
                          </button>
                        ) : (
                          <h4 className={`text-white text-sm mb-1 `}>{isArabic && cert.titleAr ? cert.titleAr : cert.title}</h4>
                        )}
                        <p className={`text-white/80 text-xs `}>{isArabic && cert.institutionAr ? cert.institutionAr : cert.institution}</p>
                      </div>
                      <span className={`text-gold text-xs shrink-0 ${isArabic ? 'mr-4' : 'ml-4'}`}>{cert.year}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </section>

      <FilePreviewModal
        isOpen={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        url={previewUrl}
      />
    </div>
  );
};

export default Awards;
