import React from 'react';
import { BADGES } from '../../data/abuDhabiData';
import { useLanguage } from '../../context/LanguageContext';
import { Award, Lock, CheckCircle2 } from 'lucide-react';

export const BadgesList: React.FC = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C5A059]" />
            <span>{isAr ? 'الأوسمة والإنجازات البيئية' : 'Earned Badges & Milestones'}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr ? '5 من أصل 6 أوسمة مكتملة' : '5 of 6 Milestones Unlocked'}
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          83% Complete
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {BADGES.map(badge => (
          <div
            key={badge.id}
            className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between relative ${
              badge.earned
                ? 'bg-gradient-to-b from-emerald-50/70 to-white border-emerald-200 shadow-sm hover:shadow-md'
                : 'bg-slate-50 border-slate-200/70 opacity-60'
            }`}
          >
            {/* Lock / Check indicator */}
            <div className="absolute top-2 right-2">
              {badge.earned ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-400" />
              )}
            </div>

            <div className="text-4xl my-2 select-none filter drop-shadow-sm">
              {badge.icon}
            </div>

            <div>
              <h4 className="font-extrabold text-xs text-slate-900 mb-1">
                {isAr ? badge.titleAr : badge.title}
              </h4>
              <p className="text-[10px] text-slate-500 leading-tight">
                {isAr ? badge.descriptionAr : badge.description}
              </p>
            </div>

            {badge.dateEarned && (
              <span className="text-[9px] font-mono text-emerald-700 font-bold mt-2">
                {badge.dateEarned}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
