import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', language);
    const htmlEl = document.documentElement;
    htmlEl.lang = language;
    htmlEl.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Add a class for global font overrides based on language
    if (language === 'ar') {
      htmlEl.classList.add('lang-ar');
      htmlEl.classList.remove('lang-en');
    } else {
      htmlEl.classList.add('lang-en');
      htmlEl.classList.remove('lang-ar');
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key) => {
    // Basic translation dictionary for static UI elements
    const dict = {
      en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.portfolio': 'Portfolio',
        'nav.photography': 'Photography',
        'nav.awards': 'Awards',
        'nav.contact': 'Contact',
        'hero.title': 'Building Brands. Leading Media.',
        'hero.subtitle': 'A 19-year journey at the intersection of executive leadership, media innovation, and visual artistry.',
        'hero.collab': "Let's Collaborate",
        'stats.years': 'Years Mastery',
        'stats.projects': 'Flagship Projects',
        'stats.epa': 'Gold Winner \'25',
        'stats.core': 'Core Disciplines',
        'btn.viewArchive': 'View Archive',
        'btn.exploreGallery': 'Explore Gallery',
        'btn.startProject': 'Start a Project',
        'footer.rights': 'All rights reserved.',
        // About
        'about.overview': 'Overview',
        'about.summary': 'Professional Summary',
        'about.summary_p1': 'An executive media professional and journalist with over 19 years of experience in corporate media, strategic communication, content management, and editorial leadership. My career is defined by a strong track record of working alongside executive leaders and senior management in high-level professional environments.',
        'about.summary_p2': 'Over the years, I have overseen numerous media campaigns, corporate projects, and specialized publications. I have played a pivotal role in building brand image and enhancing the media presence of the organizations I have worked with, delivering professional content that combines precision, strategic vision, and a refined corporate identity.',
        'about.summary_p3': 'I possess advanced expertise in managing and developing media content, writing news and press reports, proofreading and professional editing, and drafting executive speeches and correspondence. Alongside this, I effectively lead teams and manage corporate coordination to ensure high-quality output and the achievement of media and marketing objectives.',
        'about.summary_p4': 'I have also co-directed specialized media publications and projects, as well as large-scale communication campaigns. These efforts have directly contributed to highlighting corporate achievements, building trust, and establishing an impactful and sustainable media presence.',
        'about.summary_p5': 'I believe that elevated media is a direct extension of an organization\'s identity and its image to the world. Therefore, I am always committed to delivering content that reflects professionalism, creates impact, and leaves a sustainable footprint that transcends traditional publishing to create genuine value and trust.',
        'about.exp': 'Experience',
        'about.trajectory': 'Career Trajectory',
        'about.impact': 'Impact',
        'about.achievements': 'Key Achievements',
        'about.beyond': 'Beyond Work',
        'about.beyond_text': 'A genuine passion for photography — an eye that captures human moments with depth and authenticity.',
        'about.resume': 'Full Resume',
        'about.resume_text': 'Download the complete professional history, including detailed project work and certifications.',
        'btn.downloadCV': 'Download CV',
        'btn.viewGallery': 'View Gallery',
        // Portfolio
        'portfolio.title': 'Selected Works',
        'filter.all': 'All',
        'filter.media': 'Media',
        'filter.management': 'Management',
        'filter.digital': 'Digital',
        'project.notFound': 'Project Not Found',
        'project.notFoundText': "The case study you're looking for doesn't exist.",
        'project.back': 'Back to Portfolio',
        'project.overview': 'Overview',
        'project.challenge': 'The Challenge',
        'project.role': 'My Role',
        'project.solution': 'The Solution',
        'project.outcome': 'The Outcome',
        'project.doc': 'Associated Document',
        'project.gallery': 'Project Gallery',
        'project.prev': 'Previous',
        'project.next': 'Next',
        // Photography
        'photo.title': 'The Eye Behind',
        'photo.title_italic': 'the Lens',
        'photo.desc': 'A genuine passion for professional photography running parallel to a media career spanning two decades — capturing human moments with depth, authenticity, and a quiet storytelling instinct.',
        'photo.category': 'Category',
        'photo.work': 'Winning Work',
        'photo.gallery': 'Gallery',
        'photo.works': 'works',
        'photo.view': 'View',
        // Awards
        'awards.recognition': 'Recognition',
        'awards.title': 'Awards & Certifications',
        'awards.dev': 'Development',
        'awards.featured': 'Featured Certificates',
        'awards.additional': 'Additional Certifications',
        // Contact
        'contact.title': "Let's Connect",
        'contact.form_title': 'Send a Message',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.message': 'Message',
        'contact.send': 'Send Message',
        'contact.direct': 'Direct Contact',
        'contact.direct_text': 'Whether you have a question about my work, are interested in a collaboration, or simply want to connect, feel free to reach out.',
        'contact.downloadFull': 'Download Full CV'
      },
      ar: {
        'nav.home': 'الرئيسية',
        'nav.about': 'نبذة',
        'nav.portfolio': 'الأعمال',
        'nav.photography': 'التصوير',
        'nav.awards': 'الجوائز',
        'nav.contact': 'تواصل',
        'hero.title': 'نبني العلامات. نقود الإعلام.',
        'hero.subtitle': 'رحلة استمرت 19 عاماً في تقاطع القيادة التنفيذية والابتكار الإعلامي والفن البصري.',
        'hero.collab': 'لنتعاون معاً',
        'stats.years': 'عام من الخبرة',
        'stats.projects': 'مشروع رائد',
        'stats.epa': 'فائز ذهبي ٢٠٢٥',
        'stats.core': 'تخصصات أساسية',
        'btn.viewArchive': 'تصفح الأرشيف',
        'btn.exploreGallery': 'استكشف المعرض',
        'btn.startProject': 'ابدأ مشروعاً',
        'footer.rights': 'جميع الحقوق محفوظة.',
        // About
        'about.overview': 'نظرة عامة',
        'about.summary': 'نبذة',
        'about.summary_p1': 'إعلامية وصحفية تنفيذية بخبرة مهنية تمتد لأكثر من 19 عامًا في مجالات الإعلام المؤسسي، الاتصال الاستراتيجي، وإدارة المحتوى والتحرير الصحفي، مع مسيرة احترافية حافلة بالعمل إلى جانب القيادات التنفيذية والإدارات العليا في بيئات عمل عالية المستوى.',
        'about.summary_p2': 'على مدار سنوات الخبرة، تولّيت الإشراف على العديد من الحملات الإعلامية والمشاريع المؤسسية والإصدارات المتخصصة، مع دور محوري في بناء الصورة الذهنية وتعزيز الحضور الإعلامي للجهات التي عملت معها، من خلال تقديم محتوى احترافي يجمع بين الدقة، والرؤية الاستراتيجية، والهوية المؤسسية الراقية.',
        'about.summary_p3': 'أمتلك خبرة متقدمة في إدارة وتطوير المحتوى الإعلامي، كتابة الأخبار والتقارير الصحفية، المراجعة اللغوية والتحرير الاحترافي، إعداد الخطابات والمراسلات التنفيذية، إلى جانب إدارة فرق العمل والتنسيق المؤسسي بكفاءة عالية تضمن جودة المخرجات وتحقيق الأهداف الإعلامية والتسويقية.',
        'about.summary_p4': 'كما شاركت في الإشراف على إصدارات ومشاريع إعلامية متخصصة، وحملات اتصالية واسعة النطاق، ساهمت في إبراز الإنجازات المؤسسية وتعزيز الثقة وبناء حضور إعلامي مؤثر ومستدام.',
        'about.summary_p5': 'أؤمن بأن الإعلام الراقي هو امتداد لهوية المؤسسة وصورتها أمام العالم، لذلك أحرص دائمًا على تقديم محتوى يعكس الاحترافية، ويصنع التأثير، ويترك بصمة مستدامة تتجاوز حدود النشر التقليدي إلى صناعة القيمة والثقة',
        'about.exp': 'الخبرة',
        'about.trajectory': 'المسار المهني',
        'about.impact': 'الأثر',
        'about.achievements': 'أبرز الإنجازات',
        'about.beyond': 'شغف آخر',
        'about.beyond_text': 'شغف حقيقي بالتصوير — عين تلتقط اللحظات الإنسانية بعمق وأصالة.',
        'about.resume': 'السيرة الذاتية',
        'about.resume_text': 'قم بتنزيل السجل المهني الكامل بما في ذلك تفاصيل المشاريع والشهادات.',
        'btn.downloadCV': 'تحميل السيرة الذاتية',
        'btn.viewGallery': 'تصفح المعرض',
        // Portfolio
        'portfolio.title': 'الأعمال المختارة',
        'filter.all': 'الكل',
        'filter.media': 'الإعلام',
        'filter.management': 'الإدارة',
        'filter.digital': 'الرقمي',
        'project.notFound': 'المشروع غير موجود',
        'project.notFoundText': 'دراسة الحالة التي تبحث عنها غير موجودة.',
        'project.back': 'العودة للأعمال',
        'project.overview': 'نظرة عامة',
        'project.challenge': 'التحديات',
        'project.role': 'دوري',
        'project.solution': 'الحلول',
        'project.outcome': 'المخرجات',
        'project.doc': 'مستند ذو صلة',
        'project.gallery': 'معرض المشروع',
        'project.prev': 'السابق',
        'project.next': 'التالي',
        // Photography
        'photo.title': 'العين خلف ',
        'photo.title_italic': 'العدسة',
        'photo.desc': 'شغف حقيقي بالتصوير الفوتوغرافي الاحترافي يسير بالتوازي مع مسيرة إعلامية امتدت لعقدين من الزمن — التقاط اللحظات الإنسانية بعمق وأصالة وغريزة سردية هادئة.',
        'photo.category': 'الفئة',
        'photo.work': 'العمل الفائز',
        'photo.gallery': 'المعرض',
        'photo.works': 'أعمال',
        'photo.view': 'عرض',
        // Awards
        'awards.recognition': 'التقدير',
        'awards.title': 'الجوائز والشهادات',
        'awards.dev': 'التطوير',
        'awards.featured': 'شهادات بارزة',
        'awards.additional': 'شهادات إضافية',
        // Contact
        'contact.title': 'لنتواصل',
        'contact.form_title': 'أرسل رسالة',
        'contact.name': 'الاسم',
        'contact.email': 'البريد الإلكتروني',
        'contact.message': 'الرسالة',
        'contact.send': 'إرسال الرسالة',
        'contact.direct': 'تواصل مباشر',
        'contact.direct_text': 'سواء كان لديك سؤال حول عملي، أو كنت مهتماً بالتعاون، أو ترغب ببساطة في التواصل، فلا تتردد في مراسلتي.',
        'contact.downloadFull': 'تنزيل السيرة كاملة'
      }
    };
    return dict[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
