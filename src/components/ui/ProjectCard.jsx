import React from 'react';
import { Link } from 'react-router-dom';
import { Placeholder } from './index';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const ProjectCard = ({ project, isArabic = false, priority = false }) => {
  return (
    <Link to={`/portfolio/${project.slug}`} className="block group">
      <div className="h-full">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-light">
          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
            {project.thumbnail ? (
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                loading={priority ? undefined : "lazy"} 
                decoding={priority ? "sync" : "async"}
                fetchpriority={priority ? "high" : "auto"}
                className="w-full h-full object-cover" 
              />
            ) : (
              <Placeholder className="w-full h-full" />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="pt-6 pb-8" dir={isArabic ? 'rtl' : 'ltr'}>
          <span className={`text-gold/60 text-[11px] tracking-[0.2em] uppercase block mb-3 font-inter`}>
            {isArabic ? project.axisAr : project.axis}
          </span>
          <h3 className={`text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300 leading-snug ${isArabic ? "font-cairo" : "font-playfair"}`}>
            {isArabic ? project.titleAr : project.title}
          </h3>
          <p className={`text-white/80 text-sm leading-relaxed line-clamp-2 mb-6 font-inter`}>
            {isArabic ? project.overviewAr : project.overview}
          </p>
          <span className={`inline-flex items-center gap-2 text-gold/70 text-xs tracking-[0.2em] uppercase group-hover:text-gold group-hover:gap-3 transition-all duration-300 ${isArabic ? 'flex-row-reverse w-fit' : ''}`}>
            {isArabic ? 'عرض المشروع' : 'View Project'}
            {isArabic ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
          </span>
        </div>
      </div>
    </Link>
  );
};
