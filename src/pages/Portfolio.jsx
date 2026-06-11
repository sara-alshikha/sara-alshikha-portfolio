import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/ui';
import { FilterTabs } from '../components/ui/FilterTabs';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ScrollReveal } from '../components/ui/animations';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { language, t } = useLanguage();
  const isArabic = language === 'ar';
  
  // Real tab data with translations would be better handled in FilterTabs, but since it expects strings, we map the translated values
  const tabs = [
    { id: 'All', label: t('filter.all') },
    { id: 'Media', label: t('filter.media') },
    { id: 'Management', label: t('filter.management') },
    { id: 'Digital', label: t('filter.digital') }
  ];
  
  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.axis === activeTab);

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-light/30 to-transparent" />
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium block mb-6">{t('nav.portfolio')}</span>
            <h1 className={`text-5xl md:text-7xl font-bold text-white mb-8 ${isArabic ? "font-cairo" : "font-playfair"}`}>
              {t('portfolio.title')}
            </h1>
            <div className="w-24 h-[1px] bg-gold/40" />
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-16 pb-32">
        <ScrollReveal delay={0.15}>
          <FilterTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </ScrollReveal>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} isArabic={isArabic} priority={idx < 4} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default Portfolio;
