import React from 'react';
import { RouteStep } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Navigation, Footprints, ShieldCheck, Sun } from 'lucide-react';

interface TurnByTurnListProps {
  steps: RouteStep[];
  routeName: string;
}

export const TurnByTurnList: React.FC<TurnByTurnListProps> = ({ steps, routeName }) => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
          <Navigation className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-slate-900">
            {isAr ? 'إرشادات المسار خطوة بخطوة' : 'Turn-by-Turn Climate Guidance'}
          </h4>
          <p className="text-[11px] text-slate-500">{routeName}</p>
        </div>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
        {steps.map((step, idx) => (
          <div key={idx} className="relative">
            {/* Step marker node */}
            <div className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-white">
              {idx + 1}
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold text-slate-700">
                  {step.distance}
                </span>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    step.indoor
                      ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {step.indoor ? '❄️ ' : '🌳 '}
                  {step.shade}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {step.instruction}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
