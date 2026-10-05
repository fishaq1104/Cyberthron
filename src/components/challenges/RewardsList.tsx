import React from 'react';
import { REWARDS } from '../../data/abuDhabiData';
import { useLanguage } from '../../context/LanguageContext';
import { Gift, Sparkles, AlertCircle, Building2 } from 'lucide-react';

export const RewardsList: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Gift className="w-5 h-5 text-emerald-700" />
            <span>{t.challenges.rewardsTitle}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr ? 'استبدل نقاطك الخضراء بخصومات التنقل والشركاء المحليين' : 'Redeem Green Points for sustainable mobility perks'}
          </p>
        </div>

        {/* Coming Soon Notice Pill */}
        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
          {t.challenges.comingSoon}
        </span>
      </div>

      {/* Explicit prototype disclaimer banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 mb-6 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>{t.challenges.rewardsNote}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REWARDS.map(r => (
          <div
            key={r.id}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/20 text-[#856404] text-xs font-black border border-[#C5A059]/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>{r.points} Points</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Mock Benefit
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-900 mb-2 leading-snug">
                {isAr ? r.titleAr : r.title}
              </h4>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{isAr ? r.partnerAr : r.partner}</span>
              </div>
            </div>

            <button
              disabled
              type="button"
              className="w-full py-2.5 rounded-xl bg-slate-200 text-slate-500 text-xs font-bold cursor-not-allowed text-center"
            >
              {isAr ? r.statusAr : r.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
