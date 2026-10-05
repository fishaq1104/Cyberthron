import React from 'react';
import { AlertTriangle, Info, ShieldAlert, ThermometerSun } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useClimate } from '../../context/ClimateContext';

export const HeatAlert: React.FC = () => {
  const { lang, t } = useLanguage();
  const { climate } = useClimate();
  const isAr = lang === 'ar';

  if (!climate.alerts?.isExtremeHeat) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-900/90 via-rose-950/90 to-amber-950/90 border-l-4 border-amber-500 text-white p-4 rounded-2xl shadow-lg my-3 border border-amber-500/30">
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400 shrink-0 mt-0.5 border border-amber-500/30">
          <AlertTriangle className="w-5 h-5 animate-bounce" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-amber-300 text-sm md:text-base">
              {t.climate.extremeHeatAlert}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-500/30 text-rose-200 border border-rose-500/40">
              <ThermometerSun className="w-3.5 h-3.5" />
              {isAr ? `مؤشر الحرارة: ${climate.heatIndex}° م` : `Heat Index: ${climate.heatIndex}°C`}
            </span>
          </div>

          <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed">
            {t.climate.alertWarning}
          </p>

          <div className="mt-2.5 pt-2 border-t border-amber-500/20 flex items-center gap-1.5 text-[11px] text-amber-200/70">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{t.climate.disclaimer}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
