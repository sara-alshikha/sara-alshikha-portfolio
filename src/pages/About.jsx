import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading, GoldButton } from '../components/ui';
import { CareerTimeline } from '../components/sections/CareerTimeline';
import { AnimatedCounter, ScrollReveal } from '../components/ui/animations';
import { FilePreviewModal } from '../components/ui/FilePreviewModal';
import { achievements } from '../data/achievements';
import { Download, Camera, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { language, t } = useLanguage();
  const isArabic = language === 'ar';
  const [cvModalOpen, setCvModalOpen] = React.useState(false);
  const cvUrl = "https://drive.google.com/file/d/1Al2fv7tRpNN0HA2gZgY_2mvlu84Eu8Mt/view?usp=drive_link";

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-light/30 to-transparent" />
        <div className={`absolute top-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 ${isArabic ? 'left-0' : 'right-0'}`} />
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium block mb-6">{t('nav.about')}</span>
            <h1 className={`text-5xl md:text-7xl font-bold text-white mb-8 max-w-4xl ${isArabic ? "font-cairo" : "font-playfair"}`}>
              {isArabic ? 'بناء العلامات. قيادة ' : 'Building Brands. Leading '}
              <span className={`${isArabic ? "" : "italic"} text-gold/80 ${isArabic ? "font-cairo" : "font-playfair"}`}>
                {isArabic ? 'الإعلام.' : 'Media.'}
              </span>
            </h1>
            <div className="w-24 h-[1px] bg-gold/40" />
          </ScrollReveal>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="container mx-auto px-6 lg:px-16 pb-32">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium block mb-4">{t('about.overview')}</span>
              <h2 className={`text-3xl font-bold text-white ${isArabic ? "font-cairo" : "font-playfair"}`}>{t('about.summary')}</h2>
            </div>
            <div className="lg:col-span-8">
              <div className={`${isArabic ? 'border-r pr-8 lg:pr-12' : 'border-l pl-8 lg:pl-12'} border-gold/20`}>
                <p className={`text-lg text-white/90 leading-[1.9] font-light font-inter`}>
                  {t('about.summary_p1')}
                </p>
                <p className={`text-lg text-white/90 leading-[1.9] font-light mt-8 font-inter`}>
                  {t('about.summary_p2')}
                </p>
                {t('about.summary_p3') && (
                  <p className={`text-lg text-white/90 leading-[1.9] font-light mt-8 font-inter`}>
                    {t('about.summary_p3')}
                  </p>
                )}
                {t('about.summary_p4') && (
                  <p className={`text-lg text-white/90 leading-[1.9] font-light mt-8 font-inter`}>
                    {t('about.summary_p4')}
                  </p>
                )}
                {t('about.summary_p5') && (
                  <p className={`text-lg text-white/90 leading-[1.9] font-light mt-8 font-inter`}>
                    {t('about.summary_p5')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Career Timeline */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
              <div>
                <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium block mb-4">{t('about.exp')}</span>
                <h2 className={`text-4xl md:text-5xl font-bold text-white ${isArabic ? "font-cairo" : "font-playfair"}`}>{t('about.trajectory')}</h2>
              </div>
              <span className={`text-white/80 text-lg mt-4 md:mt-0 ${isArabic ? "font-cairo" : "font-playfair"}`}>2004 — 2025</span>
            </div>
          </ScrollReveal>
          <CareerTimeline isArabic={isArabic} />
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium block mb-4">{t('about.impact')}</span>
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-20 ${isArabic ? "font-cairo" : "font-playfair"}`}>{t('about.achievements')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5">
            {achievements.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.1}>
                <div className="bg-navy p-10 h-full flex flex-col">
                  <div className={`text-5xl font-bold text-gold mb-6 ${isArabic ? "font-cairo" : "font-playfair"}`}>
                    <AnimatedCounter value={item.percentage.toString()} suffix="%" />
                  </div>
                  <h4 className={`text-white font-medium text-lg mb-3 font-inter`}>
                    {isArabic && item.achievementAr ? item.achievementAr : item.achievement}
                  </h4>
                  <div className="mt-auto pt-6">
                    <span className="text-xs text-white/80 block mb-1">{item.period}</span>
                    <span className={`text-sm text-white/80 font-inter`}>
                      {isArabic && item.titleAr ? item.titleAr : item.title}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photography + CV */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5">
            <ScrollReveal>
              <div className="bg-navy p-12 md:p-16 h-full flex flex-col">
                <Camera size={28} className="text-gold mb-8" />
                <h3 className={`text-3xl font-bold text-white mb-4 ${isArabic ? "font-cairo" : "font-playfair"}`}>{t('about.beyond')}</h3>
                <p className={`text-white/80 leading-relaxed mb-8 flex-grow font-inter`}>
                  {t('about.beyond_text')}
                </p>
                <div className="flex items-center gap-3 text-gold text-sm mb-8">
                  <Award size={16} />
                  <span className={`tracking-wider `}>{t('stats.epa')}</span>
                </div>
                <Link to="/photography" className={`inline-flex items-center gap-2 text-white text-sm tracking-[0.15em] uppercase hover:text-gold transition-colors group w-fit ${isArabic ? 'flex-row-reverse' : ''}`}>
                  {t('btn.viewGallery')} 
                  {isArabic ? <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-navy p-12 md:p-16 h-full flex flex-col">
                <Download size={28} className="text-gold mb-8" />
                <h3 className={`text-3xl font-bold text-white mb-4 ${isArabic ? "font-cairo" : "font-playfair"}`}>{t('about.resume')}</h3>
                <p className={`text-white/80 leading-relaxed mb-8 flex-grow font-inter`}>
                  {t('about.resume_text')}
                </p>
                <button onClick={() => setCvModalOpen(true)} className={`inline-flex items-center gap-2 text-white text-sm tracking-[0.15em] uppercase hover:text-gold transition-colors group w-fit ${isArabic ? 'flex-row-reverse' : ''}`}>
                  {t('btn.downloadCV')} 
                  {isArabic ? <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FilePreviewModal 
        isOpen={cvModalOpen} 
        url={cvUrl} 
        onClose={() => setCvModalOpen(false)} 
      />
    </div>
  );
};

export default About;
