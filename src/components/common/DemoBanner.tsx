import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Play, ShieldCheck } from 'lucide-react';

interface DemoBannerProps {
  onRunDemoScenario?: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ onRunDemoScenario }) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="bg-gradient-to-r from-[#044E3B] via-[#065F46] to-[#044E3B] text-white border-b border-[#C5A059]/40 py-2.5 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FDE68A] text-[#064E3B] font-bold text-xs uppercase tracking-wide shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.demoModeBadge}
          </span>
          <span className="text-emerald-100 hidden sm:inline">
            {isAr
              ? 'نموذج محاكاة واقعي لظروف الطقس والتنقل في إمارة أبوظبي'
              : 'Calibrated simulation for Abu Dhabi climate conditions & net-zero routes'}
          </span>
        </div>

        {onRunDemoScenario && (
          <button
            onClick={onRunDemoScenario}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C5A059] hover:bg-[#D97706] text-white font-medium text-xs shadow transition-all transform active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.runDemoScenario}</span>
          </button>
        )}
      </div>
    </div>
  );
};
