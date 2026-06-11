import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { projects } from '../data/projects';
import { Placeholder, FilePreviewModal } from '../components/ui';
import { ScrollReveal } from '../components/ui/animations';
import { useLanguage } from '../context/LanguageContext';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const isArabic = language === 'ar';
  const [previewUrl, setPreviewUrl] = useState(null);

  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32" dir={isArabic ? 'rtl' : 'ltr'}>
        <h2 className={`text-3xl text-white mb-4 ${isArabic ? 'font-cairo' : 'font-playfair'}`}>{t('project.notFound')}</h2>
        <p className="text-white/80 mb-8">{t('project.notFoundText')}</p>
        <Link to="/portfolio" className="text-gold text-sm tracking-[0.15em] uppercase hover:text-white transition-colors">
          {t('project.back')}
        </Link>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
          <ScrollReveal>
            <Link to="/portfolio" className={`inline-flex items-center gap-2 text-white/80 hover:text-gold transition-colors text-xs tracking-[0.2em] uppercase mb-12 block ${isArabic ? 'flex-row-reverse' : ''}`}>
              {isArabic ? <ArrowRight size={14} /> : <ArrowLeft size={14} />} {t('project.back')}
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className={`text-gold text-xs tracking-[0.3em] uppercase ${isArabic ? 'font-cairo' : ''}`}>{isArabic ? project.axisAr : project.axis}</span>
              <span className="w-4 h-[1px] bg-white/10" />
              <span className="text-white/80 text-xs tracking-wider" dir="ltr">{project.period}</span>
            </div>

            <h1 className={`text-4xl md:text-6xl text-white mb-6 leading-tight ${isArabic ? 'font-cairo font-bold' : 'font-playfair font-bold'}`}>
              {isArabic ? project.titleAr : project.title}
            </h1>
            <p className={`text-gold/60 text-lg ${isArabic ? 'font-cairo' : ''}`}>
              {isArabic ? project.organizationAr : project.organization}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 lg:px-16 max-w-5xl pb-32">
        <div className="space-y-24">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className={isArabic ? 'text-sm text-white/80 tracking-normal font-bold' : 'text-xs text-white/80 uppercase tracking-[0.2em]'}>{t('project.overview')}</span>
              </div>
              <div className="lg:col-span-8">
                <p className={`text-white/80 text-lg leading-[1.9] ${isArabic ? 'font-cairo' : ''}`}>{isArabic ? project.overviewAr : project.overview}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className={isArabic ? 'text-sm text-white/80 tracking-normal font-bold' : 'text-xs text-white/80 uppercase tracking-[0.2em]'}>{t('project.challenge')}</span>
              </div>
              <div className="lg:col-span-8">
                <p className={`text-white/80 text-lg leading-[1.9] ${isArabic ? 'font-cairo' : ''}`}>{isArabic ? project.challengeAr : project.challenge}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className={isArabic ? 'text-sm text-white/80 tracking-normal font-bold' : 'text-xs text-white/80 uppercase tracking-[0.2em]'}>{t('project.role')}</span>
              </div>
              <div className="lg:col-span-8">
                <p className={`text-white/80 text-lg leading-[1.9] ${isArabic ? 'font-cairo' : ''}`}>{isArabic ? project.roleAr : project.role}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border border-white/5 p-10 md:p-14">
              <span className={`block mb-6 ${isArabic ? 'text-gold text-sm tracking-normal font-bold' : 'text-gold text-xs tracking-[0.3em] uppercase'}`}>{t('project.solution')}</span>
              <p className={`text-white/90 text-lg leading-[1.9] ${isArabic ? 'font-cairo' : ''}`}>{isArabic ? project.solutionAr : project.solution}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={`${isArabic ? 'border-r-2 pr-10 md:pr-14' : 'border-l-2 pl-10 md:pl-14'} border-gold/30`}>
              <span className={`block mb-6 ${isArabic ? 'text-sm text-white/80 tracking-normal font-bold' : 'text-xs text-white/80 uppercase tracking-[0.2em]'}`}>{t('project.outcome')}</span>
              <p className={`text-white text-lg leading-[1.9] ${isArabic ? 'font-cairo' : ''}`}>{isArabic ? project.outcomeAr : project.outcome}</p>
            </div>
          </ScrollReveal>

          {(project.pdfRef || project.pdfUrl || project.pdfUrls) && (
            <ScrollReveal>
              <div className="pt-8 mt-12 border-t border-white/5 flex flex-col gap-4">
                {project.pdfUrls ? (
                  project.pdfUrls.map((pdf, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPreviewUrl(pdf.url)}
                      className="group flex items-center justify-between p-6 md:p-8 bg-navy-light/40 border border-white/10 hover:border-gold/50 hover:bg-gold/5 transition-all duration-500 cursor-pointer text-start"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-full bg-navy border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-gold/40 transition-all duration-500 shadow-lg shrink-0">
                          <FileText size={24} className="text-gold" />
                        </div>
                        <div>
                          <h4 className={`text-white text-lg font-medium mb-1 group-hover:text-gold transition-colors ${isArabic ? 'font-cairo' : ''}`}>
                            {isArabic ? pdf.labelAr : pdf.label}
                          </h4>
                          <p className="text-white/60 text-sm">
                            {isArabic ? 'عرض المستند' : 'View Document'}
                          </p>
                        </div>
                      </div>
                      <div className={`w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center transform group-hover:bg-gold group-hover:text-navy group-hover:scale-110 transition-all duration-500`}>
                        {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                      </div>
                    </button>
                  ))
                ) : project.pdfUrl ? (
                  <button
                    onClick={() => setPreviewUrl(project.pdfUrl)}
                    className="group flex items-center justify-between p-6 md:p-8 bg-navy-light/40 border border-white/10 hover:border-gold/50 hover:bg-gold/5 transition-all duration-500 cursor-pointer text-start"
                    dir={isArabic ? 'rtl' : 'ltr'}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-full bg-navy border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-gold/40 transition-all duration-500 shadow-lg shrink-0">
                        <FileText size={24} className="text-gold" />
                      </div>
                      <div>
                        <h4 className={`text-white text-lg font-medium mb-1 group-hover:text-gold transition-colors ${isArabic ? 'font-cairo' : ''}`}>
                          {isArabic && project.titleAr ? project.titleAr : project.title}
                        </h4>
                        <p className="text-white/60 text-sm">
                          {isArabic ? 'عرض المستند' : 'View Document'}
                        </p>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center transform group-hover:bg-gold group-hover:text-navy group-hover:scale-110 transition-all duration-500`}>
                      {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                    </div>
                  </button>
                ) : (
                  <div className="flex items-center justify-between p-6 md:p-8 bg-navy-light/20 border border-white/5">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-full bg-navy border border-white/5 flex items-center justify-center shrink-0">
                        <FileText size={24} className="text-gold/60" />
                      </div>
                      <div>
                        <h4 className={`text-white/60 text-lg font-medium mb-1 ${isArabic ? 'font-cairo' : ''}`}>
                          {t('project.doc')}
                        </h4>
                        <p className="text-white/40 text-sm">
                          {project.pdfRef || (isArabic ? 'غير متوفر حالياً' : 'Not available currently')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}


        </div>

        {/* Navigation */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start gap-12">
          {prevProject ? (
            <Link to={`/portfolio/${prevProject.slug}`} className="group">
              <span className={`text-white/80 text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-2 group-hover:text-gold transition-colors ${isArabic ? 'flex-row-reverse w-fit' : ''}`}>
                {isArabic ? <ArrowRight size={12} /> : <ArrowLeft size={12} />} {t('project.prev')}
              </span>
              <span className={`text-lg text-white group-hover:text-gold transition-colors ${isArabic ? 'font-cairo' : 'font-playfair'}`}>
                {isArabic && prevProject.titleAr ? prevProject.titleAr : prevProject.title}
              </span>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link to={`/portfolio/${nextProject.slug}`} className={`group ${isArabic ? 'text-left md:mr-auto md:ml-0' : 'text-right md:ml-auto md:mr-0'}`}>
              <span className={`text-white/80 text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-2 group-hover:text-gold transition-colors ${isArabic ? 'flex-row-reverse justify-start' : 'justify-end'}`}>
                {t('project.next')} {isArabic ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
              </span>
              <span className={`text-lg text-white group-hover:text-gold transition-colors ${isArabic ? 'font-cairo' : 'font-playfair'}`}>
                {isArabic && nextProject.titleAr ? nextProject.titleAr : nextProject.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </section>

      <FilePreviewModal
        isOpen={!!previewUrl}
        url={previewUrl}
        onClose={() => setPreviewUrl(null)}
      />
    </div>
  );
};

export default ProjectDetail;
