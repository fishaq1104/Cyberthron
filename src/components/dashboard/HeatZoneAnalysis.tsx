import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Map, Flame, Trees, Sparkles } from 'lucide-react';

interface ZoneItem {
  name: string;
  sustainableTrips: number;
  shadeScore: number;
  comfortIndex: string;
}

interface HeatZoneAnalysisProps {
  zones?: ZoneItem[];
}

export const HeatZoneAnalysis: React.FC<HeatZoneAnalysisProps> = ({ zones }) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const defaultZones: ZoneItem[] = [
    { name: 'Abu Dhabi Corniche', sustainableTrips: 34200, shadeScore: 78, comfortIndex: 'Optimal' },
    { name: 'Al Reem Island', sustainableTrips: 29800, shadeScore: 72, comfortIndex: 'Good' },
    { name: 'Saadiyat Cultural District', sustainableTrips: 21500, shadeScore: 91, comfortIndex: 'Very High' },
    { name: 'Al Maryah Island', sustainableTrips: 24300, shadeScore: 88, comfortIndex: 'Very High' },
    { name: 'Masdar City', sustainableTrips: 18900, shadeScore: 95, comfortIndex: 'Exemplary' },
    { name: 'Yas Island Promenade', sustainableTrips: 19590, shadeScore: 65, comfortIndex: 'Moderate' }
  ];

  const zoneData = zones && zones.length > 0 ? zones : defaultZones;
  const maxTrips = Math.max(...zoneData.map(z => z.sustainableTrips));

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Map className="w-5 h-5 text-emerald-700" />
            <span>{t.dashboard.heatMapTitle}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr
              ? 'مقارنة حجم الإقبال على المشي واستخدام الدراجات مقابل مؤشرات التظليل في كل منطقة'
              : 'Trip Density vs. Shade & Comfort Infrastructure by Abu Dhabi Precinct'}
          </p>
        </div>

        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          6 Key Urban Precincts
        </span>
      </div>

      <div className="space-y-4">
        {zoneData.map((z, idx) => {
          const tripPercent = Math.round((z.sustainableTrips / maxTrips) * 100);
          return (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-extrabold text-sm text-slate-900">{z.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-emerald-800 font-bold">
                    {z.sustainableTrips.toLocaleString()} trips
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    🌳 {z.shadeScore}% Shaded
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
                    {z.comfortIndex}
                  </span>
                </div>
              </div>

              {/* Density Bar */}
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 via-[#C5A059] to-emerald-800 rounded-full transition-all duration-500"
                  style={{ width: `${tripPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
