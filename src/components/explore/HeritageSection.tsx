import React from 'react';
import { HERITAGE_STORIES } from '../../data/abuDhabiData';
import { useLanguage } from '../../context/LanguageContext';
import { BookOpen, Sparkles, Compass } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="bg-gradient-to-b from-[#F3ECE0] to-[#FBF8F2] rounded-3xl p-8 sm:p-12 border border-[#C5A059]/40 shadow-xl my-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 text-[#856404] text-xs font-extrabold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{isAr ? 'روح الأصالة والهوية الوطنية' : 'UAE Living Heritage'}</span>
        </div>
        <h2 className="text-3xl font-black text-[#022C22]">
          {t.explore.heritageSectionTitle}
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-3">
          {t.explore.heritageSubtitle}
        </p>
      </div>

      {/* Grid of Heritage Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HERITAGE_STORIES.map(story => (
          <div
            key={story.id}
            className="bg-white rounded-3xl p-6 border border-[#C5A059]/30 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl select-none">{story.icon}</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {isAr ? story.tagAr : story.tag}
                </span>
              </div>

              <h4 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                {isAr ? story.titleAr : story.title}
              </h4>
              <p className="text-xs font-semibold text-[#C5A059] mb-3">
                {isAr ? story.subtitleAr : story.subtitle}
              </p>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr ? story.descriptionAr : story.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'اكتشف المسار الثقافي المرتبط' : 'Discover Walking Connection'}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
