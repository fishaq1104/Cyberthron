import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface MapLayerState {
  walking: boolean;
  cycling: boolean;
  transit: boolean;
  shadeZones: boolean;
  acPaths: boolean;
  heatRisk: boolean;
  accessible: boolean;
}

interface MapLayersLegendProps {
  layers: MapLayerState;
  onToggleLayer: (layer: keyof MapLayerState) => void;
}

export const MapLayersLegend: React.FC<MapLayersLegendProps> = ({ layers, onToggleLayer }) => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const layerItems: { key: keyof MapLayerState; label: string; labelAr: string; icon: string; color: string }[] = [
    { key: 'walking', label: 'Walking routes', labelAr: 'مسارات المشي', icon: '🟢', color: 'text-emerald-500' },
    { key: 'cycling', label: 'Cycling tracks', labelAr: 'مسارات الدراجات', icon: '🔵', color: 'text-blue-500' },
    { key: 'transit', label: 'Public transport', labelAr: 'حافلات النقل العام', icon: '🟡', color: 'text-amber-500' },
    { key: 'shadeZones', label: 'Shade zones & canopies', labelAr: 'مناطق الظل والأشجار', icon: '🌳', color: 'text-green-600' },
    { key: 'acPaths', label: 'Air-conditioned links', labelAr: 'ممرات مكيفة ومكيفة الهواء', icon: '❄️', color: 'text-cyan-400' },
    { key: 'heatRisk', label: 'Heat-risk areas (unshaded)', labelAr: 'مناطق حرارة مكشوفة', icon: '⚠️', color: 'text-rose-500' },
    { key: 'accessible', label: 'Step-free & accessible routes', labelAr: 'مسارات أصحاب الهمم', icon: '♿', color: 'text-indigo-400' },
  ];

  return (
    <div className="bg-[#022C22]/95 backdrop-blur-md border border-[#C5A059]/30 rounded-2xl p-4 text-white shadow-xl text-xs md:text-sm">
      <div className="flex items-center justify-between pb-2 border-b border-emerald-900/60 mb-2">
        <span className="font-semibold text-[#FDE68A] uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          {isAr ? 'طبقات خريطة أبوظبي' : 'Abu Dhabi Map Layers'}
        </span>
        <span className="text-[11px] text-emerald-300/70 font-mono">
          {Object.values(layers).filter(Boolean).length}/7 Active
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pt-1">
        {layerItems.map(item => {
          const isActive = layers[item.key];
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onToggleLayer(item.key)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all text-left ${
                isActive
                  ? 'bg-emerald-900/50 border-emerald-500/50 text-white shadow-sm'
                  : 'bg-black/20 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-black/30'
              }`}
            >
              <span className="text-base select-none">{item.icon}</span>
              <span className="truncate font-medium">{isAr ? item.labelAr : item.label}</span>
              <span className={`w-1.5 h-1.5 rounded-full ml-auto ${isActive ? 'bg-emerald-400' : 'bg-transparent'}`}></span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
