import React from 'react';

export const FilterTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-8 mb-16">
      {tabs.map((tab) => {
        const id = typeof tab === 'string' ? tab : tab.id;
        const label = typeof tab === 'string' ? tab : tab.label;
        const isArabic = typeof label === 'string' && /[\u0600-\u06FF]/.test(label);
        
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b  ${
              activeTab === id
                ? 'text-gold border-gold'
                : 'text-white/80 border-transparent hover:text-white/80'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
