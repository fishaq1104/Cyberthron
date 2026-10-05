import React from 'react';
import { Hero } from '../components/home/Hero';
import { StorySection } from '../components/home/StorySection';
import { ClimateIntelligenceCard } from '../components/planner/ClimateIntelligenceCard';
import { HeritageSection } from '../components/explore/HeritageSection';
import { HeatAlert } from '../components/common/HeatAlert';
import { useLanguage } from '../context/LanguageContext';
import { Compass, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSetDemoScenario: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSetDemoScenario }) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="space-y-12">
      {/* Extreme Heat Alert Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <HeatAlert />
      </div>

      {/* Hero Section */}
      <Hero
        onPlanClick={() => onNavigate('plan')}
        onExploreClick={() => onNavigate('explore')}
        onScenarioClick={() => { onSetDemoScenario(); onNavigate('plan'); }}
      />

      {/* Landing Story: Problem, Solution, Impact */}
      <StorySection />

      {/* Climate Intelligence Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClimateIntelligenceCard />
      </section>

      {/* Heritage Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeritageSection />
      </section>

      {/* Bottom CTA Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#022C22] via-[#044E3B] to-[#022C22] text-white border-2 border-[#C5A059]/40 shadow-2xl text-center relative overflow-hidden bg-arabesque-dark">
          <div className="max-w-2xl mx-auto relative z-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#FDE68A] font-bold">
              {isAr ? 'ابدأ رحلتك الخضراء اليوم' : 'Ready to Move Smarter?'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {isAr ? 'اكتشف أبوظبي بطريقة مستدامة ومريحة' : 'Experience Abu Dhabi With Climate-Smart Mobility'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {t.heroDescription}
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('plan')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                {t.secondaryCta}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm transition-all cursor-pointer"
              >
                {t.primaryCta}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
