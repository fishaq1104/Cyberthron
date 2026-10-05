import React from 'react';
import { Place } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import {
  MapPin,
  Clock,
  Bike,
  Trees,
  Bus,
  Accessibility,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface CulturalCardProps {
  place: Place;
  onPlanTo: (placeName: string) => void;
}

export const CulturalCard: React.FC<CulturalCardProps> = ({ place, onPlanTo }) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group">
      
      {/* Top Image with Badge Overlays */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-[#022C22]/90 backdrop-blur-md text-[#FDE68A] text-xs font-bold border border-[#C5A059]/40">
            {isAr ? place.categoryAr : place.category}
          </span>
        </div>

        {/* Shade Level Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
            <Trees className="w-3.5 h-3.5" />
            <span>{place.shadeCoveragePercent}% Shade</span>
          </span>
        </div>

        {/* Bottom Destination Title */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-extrabold text-lg text-white">
            {isAr ? place.nameAr : place.name}
          </h3>
          <p className="text-xs text-emerald-200 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{place.distanceKm} km from Abu Dhabi Central</span>
          </p>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-500 block text-[10px]">{t.climate.walkingTime}</span>
                <span className="font-bold text-slate-800">{place.walkingTimeMins} min</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
              <Bike className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-500 block text-[10px]">{t.climate.cyclingTime}</span>
                <span className="font-bold text-slate-800">{place.cyclingTimeMins} min</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {place.description}
          </p>

          {/* Heritage Note Callout */}
          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 mb-3">
            <span className="font-bold block text-[11px] text-amber-800 mb-0.5">
              🇦🇪 {isAr ? 'لمحة تراثية وبيئية:' : 'Heritage & Eco Insight:'}
            </span>
            <span>{place.heritageNote}</span>
          </div>

          {/* Transport & Accessibility Badges */}
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <Bus className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{place.sustainableTransit}</span>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-900 font-medium">
              <Accessibility className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="truncate">{place.accessibility}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onPlanTo(place.name)}
            className="w-full py-3 rounded-xl bg-[#044E3B] hover:bg-[#065F46] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>{isAr ? 'تخطيط مسار مظلل إلى هنا' : 'Plan Shaded Route Here'}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>

    </div>
  );
};
