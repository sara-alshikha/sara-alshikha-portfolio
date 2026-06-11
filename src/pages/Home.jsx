import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/personalInfo';
import { projects } from '../data/projects';
import { GoldButton, LinkedinIcon } from '../components/ui';
import { AnimatedCounter, ScrollReveal } from '../components/ui/animations';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ArrowRight, Award, ChevronDown, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import heroImg from '../assets/Hero_img.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // Custom easing for premium feel
    },
  },
};

const Home = () => {
  const featuredProjects = projects.filter((p) => [3, 4, 5].includes(p.id));
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const { language, t } = useLanguage();

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="bg-navy min-h-screen text-white relative overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* ─── HERO ─── */}
      <section
        ref={containerRef}
        className="relative h-screen flex flex-col justify-center overflow-hidden pt-20"
      >
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-gold/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-navy-light/40 rounded-full blur-[150px] pointer-events-none" />

        {/* ─── MAGICAL HERO IMAGE REVEAL (DESKTOP) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          style={{ opacity: heroOpacity }}
          className={`hidden lg:flex absolute bottom-0 ${language === 'ar' ? 'lg:left-[2%]' : 'lg:right-[2%]'} h-[82%] w-auto z-0 pointer-events-none items-end ${language === 'ar' ? 'justify-start' : 'justify-end'}`}
        >
          {/* Breathing gold aura behind the subject */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute bottom-[15%] ${language === 'ar' ? 'lg:left-[20%]' : 'lg:right-[20%]'} w-[60%] h-[50%] bg-gold/30 rounded-full blur-[120px] -z-10 mix-blend-screen`}
          />

          <img
            src={heroImg}
            alt="Sara Alshikha"
            fetchpriority="high"
            decoding="sync"
            className={`h-full w-auto object-contain object-bottom opacity-[0.92] max-w-none drop-shadow-[0_0_35px_rgba(200,160,80,0.12)] contrast-[1.05] ${language === 'ar' ? 'scale-x-[-1]' : ''}`}
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 95%)'
            }}
          />
        </motion.div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10 h-full flex flex-col justify-start lg:justify-center pt-20 lg:pt-0">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`flex flex-col items-center text-center lg:items-start lg:text-start ${language === 'ar' ? 'lg:text-right' : ''} mt-0`}
          >
            <motion.div variants={itemVariants} className="overflow-hidden mb-4 flex items-center justify-center lg:justify-start gap-4">
              <div className="w-8 lg:w-12 h-[1px] bg-gold" />
              <p className="text-gold/80 text-xs lg:text-base tracking-[0.2em] lg:tracking-[0.3em] uppercase">
                {language === 'ar' ? personalInfo.titleAr : personalInfo.titleEn}
              </p>
              <div className="w-8 lg:w-12 h-[1px] bg-gold lg:hidden" />
            </motion.div>

            <div className={language === 'ar' ? 'mb-0' : 'mb-0 lg:mb-2'}>
              <motion.h1
                variants={itemVariants}
                className={`text-6xl sm:text-7xl md:text-8xl lg:text-[10vw] font-bold text-white lowercase ${language === 'ar' ? 'font-thuluth leading-normal tracking-normal' : 'font-playfair leading-[0.85] tracking-tighter'}`}
              >
                {language === 'ar' ? 'سارة' : 'sara'}
              </motion.h1>
            </div>

            <div className={`${language === 'ar' ? '-mt-6 md:mt-0 mb-3 md:mb-5 lg:mb-6 lg:mr-[10vw]' : 'mt-2 md:mt-0 mb-4 md:mb-8 lg:mb-12 lg:ml-[10vw]'}`}>
              <motion.h1
                variants={itemVariants}
                className={`text-6xl sm:text-7xl md:text-8xl lg:text-[10vw] text-white/90 lowercase ${language === 'ar' ? 'font-thuluth font-light leading-normal tracking-normal' : 'font-playfair font-normal italic leading-[0.85] tracking-tighter'}`}
              >
                {language === 'ar' ? 'الشيخه' : 'alshikha.'}
              </motion.h1>
            </div>

            <motion.div variants={itemVariants} className="max-w-xl md:max-w-2xl text-white/80 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6 md:mb-10 lg:mb-16 px-4 md:px-8 lg:px-0">
              {t('hero.subtitle')}
            </motion.div>

            {/* ─── CREATIVE MOBILE AVATAR (ONLY MOBILE) ─── */}
            <motion.div 
              variants={itemVariants}
              className="lg:hidden relative w-52 h-52 sm:w-60 sm:h-60 md:w-80 md:h-80 mb-6 md:mb-10 flex-shrink-0 mx-auto"
            >
              {/* Outer decorative spinning dashed ring */}
              <div className="absolute inset-0 rounded-full border border-gold/40 border-dashed animate-[spin_20s_linear_infinite]" />
              {/* Inner continuous ring rotating opposite */}
              <div className="absolute inset-2 rounded-full border border-gold/20 animate-[spin_15s_linear_infinite_reverse]" />
              {/* Golden glow behind */}
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl animate-pulse" />
              
              {/* Image Container - Removed background to be completely transparent */}
              <div className="absolute inset-3 rounded-full overflow-hidden shadow-[0_0_40px_rgba(200,160,80,0.3)] border border-white/5">
                <img
                  src={heroImg}
                  alt="Sara Alshikha"
                  fetchpriority="high"
                  decoding="sync"
                  className={`w-full h-full object-cover object-[center_top] pt-4 lg:pt-8 ${language === 'ar' ? 'scale-x-[-1]' : ''}`}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full flex justify-center lg:justify-start">
              <a 
                href={`https://wa.me/${personalInfo.phone.replace(/[\s+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-3 px-8 h-[54px] md:h-[58px] lg:h-[60px] min-w-[240px] md:min-w-[260px] lg:min-w-[280px] bg-gold text-navy rounded-full text-sm md:text-base hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(200,160,80,0.4)] transition-all duration-300 ${language === 'ar' ? 'font-cairo font-bold text-base md:text-lg' : 'tracking-[0.2em] font-medium uppercase'}`}
              >
                <MessageCircle size={20} className="lg:w-[22px] lg:h-[22px]" />
                <span>{t('hero.collab')}</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/80"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-gold" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS SECTION ─── */}
      <section className="relative z-20 bg-navy py-24 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {[
              { value: "19", suffix: "+", label: t('stats.years') },
              { value: "16", suffix: "+", label: t('stats.projects') },
              { value: "EPA", suffix: "", label: t('stats.epa'), isText: true },
              { value: "03", suffix: "", label: t('stats.core') },
            ].map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className={`flex flex-col items-center justify-center text-center py-8 ${idx !== 3 ? (language === 'ar' ? 'md:border-l md:border-white/5' : 'md:border-r md:border-white/5') : ''}`}>
                  <div className={`text-5xl md:text-6xl font-medium text-gold mb-4 text-glow ${language === 'ar' ? 'font-cairo' : 'font-playfair'}`}>
                    {stat.isText ? stat.value : <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                  </div>
                  <span className="text-[11px] text-white/80 uppercase tracking-[0.25em]">{stat.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SELECTED WORKS ─── */}
      <section className="py-32 bg-navy relative">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-white/10 pb-12">
              <div>
                <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">{t('nav.portfolio')}</span>
                <h2 className={`text-5xl md:text-6xl text-white ${language === 'ar' ? 'font-cairo font-bold' : 'font-playfair font-normal'}`}>
                  {language === 'ar' ? 'الأعمال المختارة' : 'Selected Works'}
                </h2>
              </div>
              <Link to="/portfolio" className="group inline-flex items-center gap-3 text-white/80 text-sm tracking-[0.2em] uppercase hover:text-gold transition-colors mt-8 md:mt-0 cursor-hover">
                {t('btn.viewArchive')}
                <ArrowRight size={16} className={`transition-transform duration-500 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {featuredProjects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 0.2}>
                <div className={idx % 2 === 1 ? "md:mt-32" : ""}>
                  <ProjectCard project={project} isArabic={language === 'ar'} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHOTOGRAPHY ─── */}
      <section className="py-32 border-t border-white/5 bg-navy-light relative overflow-hidden">
        <div className={`absolute top-0 w-[60vw] h-[60vw] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none ${language === 'ar' ? 'left-0 -translate-x-1/4' : 'right-0 translate-x-1/4'}`} />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className={`lg:col-span-5 ${language === 'ar' ? 'order-1 lg:order-2 lg:col-start-8' : 'order-2 lg:order-1'}`}>
              <ScrollReveal>
                <div className="aspect-[3/4] bg-navy overflow-hidden relative group shadow-2xl border border-white/10 rounded-sm">
                  <motion.div
                    style={{ scale: imageScale }}
                    className="w-full h-full"
                  >
                    <img
                      src="https://res.cloudinary.com/dbh7fresh/image/upload/v1780440213/WhatsApp_Image_2026-05-06_at_4.21.14_PM_djhzt3.jpg"
                      alt={language === 'ar' ? 'معرض السرد البصري' : 'Visual Storytelling Gallery'}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>

            <div className={`lg:col-span-6 order-1 ${language === 'ar' ? 'lg:order-1' : 'lg:order-2 lg:col-start-7'}`}>
              <ScrollReveal>
                <span className="text-gold text-xs tracking-[0.3em] uppercase mb-6 block">Lens & Light</span>
                <h2 className={`text-5xl md:text-7xl text-white mb-8 leading-[1.1] ${language === 'ar' ? 'font-cairo font-bold' : 'font-playfair font-normal'}`}>
                  {language === 'ar' ? 'السرد ' : 'Visual '}<br />
                  <span className={`${language === 'ar' ? '' : 'italic'} text-white/80`}>{language === 'ar' ? 'البصري' : 'Storytelling'}</span>
                </h2>
                <p className="text-white/80 text-lg font-light leading-relaxed mb-12 max-w-lg">
                  {language === 'ar'
                    ? 'شغف حقيقي بالتصوير الفوتوغرافي الاحترافي يسير بالتوازي مع مسيرة إعلامية امتدت لعقدين من الزمن. التقاط جوهر الفخامة البسيطة في كل إطار.'
                    : 'A genuine passion for professional photography running parallel to a media career spanning two decades. Capturing the essence of minimal luxury in every frame.'}
                </p>
                <div className="flex flex-wrap items-center gap-6 mb-12">
                  <div className="flex items-center gap-3 text-gold text-sm tracking-widest uppercase bg-gold/10 px-6 py-3 rounded-full">
                    <Award size={16} />
                    <span>EPA Gold '25</span>
                  </div>
                </div>
                <Link to="/photography" className="group inline-flex items-center gap-4 text-white hover:text-gold transition-colors font-medium tracking-[0.1em] text-sm uppercase cursor-hover">
                  <span className="border-b border-white/50 group-hover:border-gold/50 pb-1 transition-colors">{t('btn.exploreGallery')}</span>
                  <ArrowRight size={18} className={`transition-transform duration-500 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRE-FOOTER CTA ─── */}
      <section className="py-40 bg-navy relative overflow-hidden flex items-center justify-center text-center">
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <h2 className={`text-6xl md:text-[8vw] font-bold text-white mb-10 leading-[0.9] ${language === 'ar' ? 'font-cairo' : 'font-playfair'}`}>
              {language === 'ar' ? 'مستعد ' : 'Ready to '}<br />
              <span className={`${language === 'ar' ? '' : 'italic'} text-white/80`}>{language === 'ar' ? 'للابتكار؟' : 'innovate?'}</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <GoldButton href={`mailto:${personalInfo.email}`}>
                {t('btn.startProject')}
              </GoldButton>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full border border-white/20 text-white/80 hover:text-navy hover:bg-gold hover:border-gold transition-all duration-500 cursor-hover"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
