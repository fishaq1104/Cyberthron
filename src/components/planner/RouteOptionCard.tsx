import React from 'react';
import { RouteOption } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import {
  Clock,
  Trees,
  Footprints,
  Flame,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Accessibility
} from 'lucide-react';

interface RouteOptionCardProps {
  route: RouteOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const RouteOptionCard: React.FC<RouteOptionCardProps> = ({ route, isSelected, onSelect }) => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const isCoolest = route.type === 'coolest';
  const isFastest = route.type === 'fastest';
  const isSustainable = route.type === 'sustainable';

  return (
    <div
      onClick={onSelect}
      className={`rounded-3xl p-6 transition-all cursor-pointer border-2 relative overflow-hidden ${
        isSelected
          ? 'bg-white border-[#065F46] shadow-2xl ring-2 ring-[#065F46]/20'
          : 'bg-white/90 border-slate-200 hover:border-emerald-300 hover:shadow-lg'
      }`}
    >
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isCoolest
                ? 'bg-emerald-600 text-white shadow-sm'
                : isSustainable
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            {route.name}
          </span>

          {route.isRecommended && (
            <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              ⭐ {isAr ? 'موصى به للطقس الحار' : 'Recommended for Hot Weather'}
            </span>
          )}
        </div>

        <span className="text-xs font-mono font-bold text-slate-500">
          {route.distanceKm} km
        </span>
      </div>

      {/* Main Core Highlights Row: Time & Key Metric */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        
        {/* Travel Time */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isAr ? 'المدة التقديرية' : 'Duration'}</span>
          </div>
          <div className="text-xl font-black text-slate-900">
            {route.durationMinutes} min
          </div>
        </div>

        {/* Shade Coverage */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <Trees className="w-3.5 h-3.5 text-green-600" />
            <span>{isAr ? 'نسبة التظليل' : 'Shade Factor'}</span>
          </div>
          <div className="text-xl font-black text-emerald-700">
            {route.shadeCoveragePercent}%
          </div>
        </div>

        {/* Heat Exposure */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>{isAr ? 'التعرض للحرارة' : 'Heat Exposure'}</span>
          </div>
          <div className={`text-xs font-bold mt-1 ${isFastest ? 'text-rose-600' : 'text-emerald-700'}`}>
            {isFastest ? '⚠️ High Sun' : isCoolest ? '🛡️ Lower Exposure' : '❄️ Minimal Heat'}
          </div>
        </div>

        {/* CO2 Saved */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isAr ? 'وفر الكربون' : 'CO₂ Avoided'}</span>
          </div>
          <div className="text-xl font-black text-emerald-800">
            {route.co2SavedKg} kg
          </div>
        </div>

      </div>

      {/* Feature Bullet Points */}
      <div className="space-y-1.5 mb-5 text-xs text-slate-600">
        {route.highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>{h}</span>
          </div>
        ))}
      </div>

      {/* Accessibility Score pill */}
      <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200/70 flex items-center justify-between text-xs text-indigo-900">
        <span className="flex items-center gap-1.5 font-medium">
          <Accessibility className="w-3.5 h-3.5 text-indigo-700" />
          <span>{route.accessibilityScore}</span>
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          className={`font-bold flex items-center gap-1 cursor-pointer ${
            isSelected ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>{isSelected ? (isAr ? 'المسار النشط' : 'Active Route') : (isAr ? 'اختيار' : 'Select')}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
        </button>
      </div>

    </div>
  );
};
