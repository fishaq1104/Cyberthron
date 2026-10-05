import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { TransportMode, RouteOption } from '../../types';
import {
  ABU_DHABI_PRESET_LOCATIONS,
  SUPPORTED_CITIES
} from '../../data/abuDhabiData';
import {
  MapPin,
  Navigation,
  Footprints,
  Bike,
  Bus,
  Car,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface RoutePlannerProps {
  onCalculate: (from: string, to: string, mode: TransportMode) => void;
  isLoading: boolean;
  onSetDemoScenario: () => void;
}

export const RoutePlanner: React.FC<RoutePlannerProps> = ({
  onCalculate,
  isLoading,
  onSetDemoScenario
}) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const [selectedCity, setSelectedCity] = useState('abu-dhabi');
  const [fromLoc, setFromLoc] = useState('Al Reem Island');
  const [toLoc, setToLoc] = useState('Abu Dhabi Corniche');
  const [mode, setMode] = useState<TransportMode>('walk');

  const modes: { id: TransportMode; label: string; icon: any; sustainable: boolean }[] = [
    { id: 'walk', label: t.planner.modes.walk, icon: Footprints, sustainable: true },
    { id: 'cycle', label: t.planner.modes.cycle, icon: Bike, sustainable: true },
    { id: 'transit', label: t.planner.modes.transit, icon: Bus, sustainable: true },
    { id: 'car', label: t.planner.modes.car, icon: Car, sustainable: false },
  ];

  const handleSwap = () => {
    const temp = fromLoc;
    setFromLoc(toLoc);
    setToLoc(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(fromLoc, toLoc, mode);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl">
      
      {/* UAE Location Selector Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇦🇪</span>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {isAr ? 'المدينة المعتمدة في النموذج' : 'Prototype Target City'}
            </span>
            <div className="flex items-center gap-2">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="font-black text-slate-900 bg-transparent border-none text-base cursor-pointer focus:ring-0 p-0"
              >
                {SUPPORTED_CITIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {isAr ? c.nameAr : c.name} {c.isPrimary ? '★' : ''}
                  </option>
                ))}
              </select>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                Primary Supported
              </span>
            </div>
          </div>
        </div>

        {/* Demo Scenario Button */}
        <button
          type="button"
          onClick={onSetDemoScenario}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-all cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{isAr ? 'سيناريو: الريم إلى الكورنيش' : 'Demo: Al Reem ➔ Corniche'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* From & To Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
          
          {/* From Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              {t.planner.from}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                value={fromLoc}
                onChange={(e) => setFromLoc(e.target.value)}
                className="w-full pl-9 pr-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#065F46] focus:border-transparent transition-all cursor-pointer"
              >
                {ABU_DHABI_PRESET_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button on desktop */}
          <button
            type="button"
            onClick={handleSwap}
            className="hidden sm:flex absolute left-1/2 top-8 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-white border border-slate-300 shadow-md items-center justify-center text-slate-500 hover:text-emerald-700 hover:border-emerald-500 transition-all cursor-pointer"
            title="Swap Origin and Destination"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* To Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              {t.planner.to}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-rose-500">
                <Navigation className="w-4 h-4" />
              </div>
              <select
                value={toLoc}
                onChange={(e) => setToLoc(e.target.value)}
                className="w-full pl-9 pr-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#065F46] focus:border-transparent transition-all cursor-pointer"
              >
                {ABU_DHABI_PRESET_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Transport Modes Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2.5">
            {isAr ? 'وسيلة التنقل المفضلة' : 'Preferred Travel Mode'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {modes.map(m => {
              const Icon = m.icon;
              const isSelected = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#044E3B] text-white border-[#044E3B] shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FDE68A]' : 'text-slate-500'}`} />
                  <span className="truncate">{m.label}</span>
                  {m.sustainable && (
                    <span className="text-[10px] ml-auto opacity-75">🌱</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculate Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#044E3B] via-[#065F46] to-[#044E3B] hover:from-[#065F46] hover:to-[#044E3B] text-white font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {t.planner.calculating}
            </span>
          ) : (
            <>
              <span>{t.planner.calculateBtn}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>

      </form>
    </div>
  );
};
