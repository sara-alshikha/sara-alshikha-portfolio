import React, { useState } from 'react';
import { SectionHeading, GoldButton, LinkedinIcon } from '../components/ui';
import { FilePreviewModal } from '../components/ui/FilePreviewModal';
import { ScrollReveal } from '../components/ui/animations';
import { personalInfo } from '../data/personalInfo';
import { Mail, Phone, MapPin, Download, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const { language, t } = useLanguage();
  const isArabic = language === 'ar';
  const cvUrl = "https://drive.google.com/file/d/1FzaFLkSQAhzXQwNgDyfT1beWUMaKqiu3/view?usp=drive_link";

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: isArabic ? 'يرجى ملء جميع الحقول.' : 'Please fill out all fields.' });
      setIsSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: 'error', message: isArabic ? 'يرجى إدخال عنوان بريد إلكتروني صالح.' : 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xaqzjgzd", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus({ type: 'success', message: isArabic ? 'تم إرسال الرسالة بنجاح! سنرد عليك قريباً.' : 'Message sent successfully! We will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: isArabic ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.' : 'Oops! There was a problem submitting your form.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: isArabic ? 'تعذر الاتصال. تأكد من اتصالك بالإنترنت.' : 'Network error. Please check your connection.' });
    }
    
    setIsSubmitting(false);
  };

  const contactMethods = [
    { icon: <Mail size={20} />, title: 'Email', titleAr: 'البريد الإلكتروني', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: <Phone size={20} />, title: 'Phone', titleAr: 'الهاتف', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s+/g, '')}` },
    { icon: <LinkedinIcon size={20} />, title: 'LinkedIn', titleAr: 'لينكد إن', value: isArabic ? personalInfo.nameAr : personalInfo.nameEn, href: personalInfo.linkedin },
    { icon: <MapPin size={20} />, title: 'Location', titleAr: 'الموقع', value: isArabic ? 'السعودية' : personalInfo.location, href: null }
  ];

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-light/30 to-transparent" />
        <div className={`absolute top-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 ${isArabic ? 'left-0' : 'right-0'}`} />
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium block mb-6">{t('nav.contact')}</span>
            <h1 className={`text-5xl md:text-7xl font-bold text-white mb-8 ${isArabic ? "font-cairo" : "font-playfair"}`}>
              {t('contact.title')}
            </h1>
            <div className="w-24 h-[1px] bg-gold/40" />
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <ScrollReveal className="lg:col-span-7">
            <div className="border border-white/5 p-10 md:p-14">
              <h3 className={`text-2xl text-white mb-10 ${isArabic ? "font-cairo" : "font-playfair"}`}>{t('contact.form_title')}</h3>

              {status.message && (
                <div className={`p-4 flex items-start gap-3 mb-8 text-sm border ${status.type === 'success' ? 'border-green-500/20 text-green-400 bg-green-500/5' : 'border-red-500/20 text-red-400 bg-red-500/5'} `}>
                  {status.type === 'success' ? <CheckCircle size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className={`block text-xs text-white/80 uppercase tracking-[0.2em] mb-3 `}>{t('contact.name')}</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    className={`w-full bg-transparent border-b border-white/10 focus:border-gold/50 py-3 text-white placeholder-white/20 focus:outline-none transition-colors `} placeholder={isArabic ? 'الاسم الكريم' : 'Your Name'} />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-xs text-white/80 uppercase tracking-[0.2em] mb-3 `}>{t('contact.email')}</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    className={`w-full bg-transparent border-b border-white/10 focus:border-gold/50 py-3 text-white placeholder-white/20 focus:outline-none transition-colors text-left ${isArabic ? 'font-inter' : ''}`} placeholder="your.email@example.com" dir="ltr" />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-xs text-white/80 uppercase tracking-[0.2em] mb-3 `}>{t('contact.message')}</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5"
                    className={`w-full bg-transparent border-b border-white/10 focus:border-gold/50 py-3 text-white placeholder-white/20 focus:outline-none transition-colors resize-none `} placeholder={isArabic ? 'كيف يمكننا التعاون؟' : 'How can we work together?'} />
                </div>
                <button type="submit" className={`group flex items-center gap-3 text-gold text-sm tracking-[0.2em] uppercase hover:text-white transition-colors pt-4 ${isArabic ? 'flex-row-reverse w-fit' : ''}`}>
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className={isArabic ? 'font-cairo font-medium' : ''}>{t('contact.send')}</span>
                      {isArabic ? <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.15} className="lg:col-span-5">
            <div className="space-y-12">
              <div>
                <h3 className={`text-2xl text-white mb-4 ${isArabic ? "font-cairo" : "font-playfair"}`}>{t('contact.direct')}</h3>
                <p className={`text-white/80 leading-relaxed text-sm `}>
                  {t('contact.direct_text')}
                </p>
              </div>

              <div className="space-y-8">
                {contactMethods.map((method, idx) => (
                  <div key={idx} className="flex items-start gap-5">
                    <div className="text-gold mt-1">{method.icon}</div>
                    <div>
                      <span className={`text-xs text-white/80 uppercase tracking-widest block mb-1 `}>{isArabic ? method.titleAr : method.title}</span>
                      {method.href ? (
                        <a href={method.href} target={method.title === 'LinkedIn' ? '_blank' : '_self'} rel="noopener noreferrer" className={`text-white hover:text-gold transition-colors `} dir="ltr">
                          {method.value}
                        </a>
                      ) : (
                        <span className={`text-white `}>{method.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5">
                <button onClick={() => setCvModalOpen(true)} className={`inline-flex items-center gap-2 text-white text-sm tracking-[0.15em] uppercase hover:text-gold transition-colors group ${isArabic ? 'flex-row-reverse w-fit' : ''}`}>
                  <Download size={16} />
                  <span className={isArabic ? 'font-cairo font-medium' : ''}>{t('contact.downloadFull')}</span>
                  {isArabic ? <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </div>
          </ScrollReveal>
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

export default Contact;
