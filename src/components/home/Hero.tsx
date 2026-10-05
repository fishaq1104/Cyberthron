import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useClimate } from '../../context/ClimateContext';
import { ArrowRight, Compass, Shield, Wind, TreePine, Footprints, Bike, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onPlanClick: () => void;
  onExploreClick: () => void;
  onScenarioClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlanClick, onExploreClick, onScenarioClick }) => {
  const { lang, t } = useLanguage();
  const { climate } = useClimate();
  const isAr = lang === 'ar';

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#022C22] via-[#044E3B] to-[#065F46] text-white pt-8 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/40 bg-arabesque-dark">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-emerald-500/15 via-[#C5A059]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top UAE Smart City Pill */}
        <div className="flex items-center justify-center md:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-[#C5A059]/50 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FDE68A]">
              {isAr ? 'منصة التنقل المناخي الذكي • أبوظبي' : 'Abu Dhabi Net-Zero Mobility Engine'}
            </span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              <span className="block text-white">Darb Al Istidama</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FDE68A] mt-2 font-arabic">
                {isAr ? 'درب الاستدامة' : 'Your Climate-Smart Way Around Abu Dhabi'}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
              {t.heroDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>{t.primaryCta}</span>
              </button>

              <button
                type="button"
                onClick={onPlanClick}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-[#C5A059]/50 text-white font-bold text-sm backdrop-blur-md shadow-lg transition-all cursor-pointer"
              >
                <span>{t.secondaryCta}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Quick Demo Scenario Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onScenarioClick}
                className="inline-flex items-center gap-2 text-xs text-[#FDE68A] hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t.runDemoScenario}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual & Example Climate Route Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Card Container */}
              <div className="rounded-3xl bg-gradient-to-br from-[#022C22] via-[#044E3B] to-[#022C22] p-6 border-2 border-[#C5A059]/40 shadow-2xl relative overflow-hidden">
                
                {/* Header of Interactive Card */}
                <div className="flex items-center justify-between pb-4 border-b border-emerald-800/80 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-900/80 border border-[#C5A059]/40 flex items-center justify-center text-lg">
                      🇦🇪
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">Abu Dhabi Smart Corridor</h4>
                      <p className="text-[11px] text-[#C5A059]">Al Reem Island ➔ Corniche</p>
                    </div>
                  </div>

                  {/* Small Label: Climate-Adaptive Route */}
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-[#FDE68A] border border-emerald-400/40 text-[11px] font-bold">
                    {t.climateAdaptiveRoute}
                  </span>
                </div>

                {/* Live Example Route Metrics requested in Prompt:
                    🌡️ Heat: 39°C
                    🌬️ Air Quality: Good
                    🌳 Shade Coverage: 68%
                    🚶 Walking Time: 18 min
                    🚲 Cycling Time: 7 min
                */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  
                  {/* Heat */}
                  <div className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center gap-3">
                    <span className="text-2xl select-none">🌡️</span>
                    <div>
                      <span className="text-[11px] text-emerald-300 block">{t.climate.heat}</span>
                      <span className="text-base font-extrabold text-white">39°C</span>
                      <span className="text-[10px] text-amber-300 block">Heat Index 44°C</span>
                    </div>
                  </div>

                  {/* Air Quality */}
                  <div className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center gap-3">
                    <span className="text-2xl select-none">🌬️</span>
                    <div>
                      <span className="text-[11px] text-emerald-300 block">{t.climate.airQuality}</span>
                      <span className="text-base font-extrabold text-emerald-400">AQI 38</span>
                      <span className="text-[10px] text-emerald-200 block">Good (Clean)</span>
                    </div>
                  </div>

                  {/* Shade Coverage */}
                  <div className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center gap-3">
                    <span className="text-2xl select-none">🌳</span>
                    <div>
                      <span className="text-[11px] text-emerald-300 block">{t.climate.shadeCoverage}</span>
                      <span className="text-base font-extrabold text-[#FDE68A]">68%</span>
                      <span className="text-[10px] text-emerald-200 block">Date Palms & AC</span>
                    </div>
                  </div>

                  {/* Walking & Cycling Times */}
                  <div className="p-3 rounded-2xl bg-black/30 border border-white/5 flex flex-col justify-center">
                    <div className="flex items-center justify-between text-xs py-0.5">
                      <span className="text-emerald-300 flex items-center gap-1">
                        <Footprints className="w-3.5 h-3.5" /> 🚶 {t.climate.walkingTime}:
                      </span>
                      <span className="font-bold text-white">18 min</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-0.5 border-t border-white/5 mt-1 pt-1">
                      <span className="text-blue-300 flex items-center gap-1">
                        <Bike className="w-3.5 h-3.5" /> 🚲 {t.climate.cyclingTime}:
                      </span>
                      <span className="font-bold text-white">7 min</span>
                    </div>
                  </div>

                </div>

                {/* Corridor Highlight & Action */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs text-emerald-200 font-medium">
                      {isAr ? 'ممر آمن ومكيف عبر جزيرة الماريه' : 'AC Galleria & Shaded Colonnade'}
                    </span>
                  </div>
                  <button
                    onClick={onPlanClick}
                    type="button"
                    className="text-xs font-bold text-[#FDE68A] hover:underline cursor-pointer"
                  >
                    {isAr ? 'عرض المسار ➔' : 'View Path ➔'}
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
