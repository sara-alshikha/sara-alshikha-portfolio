import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timeline } from '../../data/timeline';
import { useLanguage } from '../../context/LanguageContext';
export const CareerTimeline = () => {
  const [activeNode, setActiveNode] = useState(timeline[0]);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="relative mt-16 mb-24">
      {/* Desktop Horizontal Line */}
      <div className="hidden md:block absolute top-[28px] left-0 right-0 h-0.5 bg-navy-light border-t border-gold/20" />
      
      {/* Mobile Vertical Line */}
      <div className={`md:hidden absolute top-0 bottom-0 ${isArabic ? 'right-[28px] border-r' : 'left-[28px] border-l'} w-0.5 bg-navy-light border-gold/20`} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-8 md:gap-2 w-full pb-8">
        {timeline.map((node, index) => {
          const isActive = activeNode.id === node.id;
          return (
            <div 
              key={node.id} 
              className="flex md:flex-col items-center gap-6 md:gap-4 flex-1 w-full md:w-auto cursor-pointer group"
              onClick={() => setActiveNode(node)}
            >
              {/* Node Dot */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]' : 'bg-navy-light border border-gold/30 group-hover:border-gold/70'}`}>
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-navy' : 'bg-gold/50 group-hover:bg-gold'}`} />
              </div>
              
              {/* Year Label */}
              <div className={`font-medium tracking-wider transition-colors ${isActive ? 'text-gold text-lg' : 'text-white/80'}`}>
                {node.period}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-8 glass-card p-8 max-w-3xl mx-auto text-center"
        >
          <h3 className={`text-2xl font-bold text-white mb-2 ${isArabic ? "font-cairo" : "font-playfair"}`}>
            {isArabic ? activeNode.titleAr : activeNode.title}
          </h3>
          <p className="text-gold font-medium mb-6">
            {isArabic ? activeNode.organizationAr : activeNode.organization}
          </p>
          <div className="bg-navy p-4 rounded border border-gold/10 inline-block">
            <span className="text-sm text-white/80 uppercase tracking-widest block mb-1">
              {isArabic ? 'أبرز الإنجازات' : 'Key Achievement'}
            </span>
            <span className="text-lg text-white font-medium">{isArabic ? activeNode.keyAchievementAr : activeNode.keyAchievement}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
