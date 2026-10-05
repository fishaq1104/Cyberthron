import React from 'react';
import { CHALLENGES } from '../../data/abuDhabiData';
import { useLanguage } from '../../context/LanguageContext';
import { Flame, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

export const ChallengesList: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <span>{t.challenges.weeklyChallenge}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr ? 'أكمل التحديات لكسب النقاط الخضراء وخصومات النقل' : 'Complete active challenges to earn Green Points'}
          </p>
        </div>

        <span className="text-xs font-mono text-slate-500">
          Reset in 3 days
        </span>
      </div>

      <div className="space-y-4">
        {CHALLENGES.map(ch => (
          <div
            key={ch.id}
            className={`p-5 rounded-2xl border transition-all ${
              ch.isCompleted
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {ch.category === 'walking' ? '🚶' : ch.category === 'cycling' ? '🚲' : '🚌'}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900">
                  {isAr ? ch.titleAr : ch.title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#C5A059]/20 text-[#856404] text-xs font-bold border border-[#C5A059]/40 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>+{ch.rewardPoints} {t.challenges.greenPoints}</span>
                </span>

                {ch.isCompleted && (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Done</span>
                  </span>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1 mt-3">
              <div className="flex justify-between text-xs text-slate-500">
                <span>{ch.currentValue} / {ch.targetValue}</span>
                <span className="font-mono font-bold text-slate-700">{ch.progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    ch.isCompleted ? 'bg-emerald-600' : 'bg-gradient-to-r from-emerald-600 to-[#C5A059]'
                  }`}
                  style={{ width: `${ch.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{ch.deadline}</span>
              </span>
              <span className="text-emerald-800 font-semibold">
                {isAr ? 'مسارات أبوظبي المعتمدة' : 'Abu Dhabi Verified Routes'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
