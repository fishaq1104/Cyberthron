import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Flame,
  Award,
  Footprints,
  Bike,
  Leaf,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface UserStatsBannerProps {
  points?: number;
  streak?: number;
  co2?: number;
  walkKm?: number;
  cycleKm?: number;
}

export const UserStatsBanner: React.FC<UserStatsBannerProps> = ({
  points = 1280,
  streak = 7,
  co2 = 4.8,
  walkKm = 24.6,
  cycleKm = 8.2
}) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const stats = [
    {
      label: t.challenges.greenPoints,
      val: points.toLocaleString(),
      sub: isAr ? 'رصيد قابل للاستبدال' : 'Redeemable Balance',
      icon: Sparkles,
      color: 'text-[#C5A059]',
      bg: 'bg-[#C5A059]/15'
    },
    {
      label: t.challenges.streak,
      val: `${streak} ${isAr ? 'أيام' : 'days'}`,
      sub: isAr ? 'نشاط مستمر' : 'Active Multiplier',
      icon: Flame,
      color: 'text-amber-500',
      bg: 'bg-amber-500/15'
    },
    {
      label: t.challenges.co2Saved,
      val: `${co2} kg`,
      sub: isAr ? 'مقارنة بالسيارة' : 'vs Gasoline Car',
      icon: Leaf,
      color: 'text-emerald-600',
      bg: 'bg-emerald-600/15'
    },
    {
      label: t.challenges.walkDist,
      val: `${walkKm} km`,
      sub: isAr ? 'عبر مسارات مظللة' : 'Shaded Footpaths',
      icon: Footprints,
      color: 'text-indigo-600',
      bg: 'bg-indigo-600/15'
    },
    {
      label: t.challenges.cycleDist,
      val: `${cycleKm} km`,
      sub: isAr ? 'مسارات الكورنيش والحديريات' : 'Dedicated Cycleways',
      icon: Bike,
      color: 'text-blue-600',
      bg: 'bg-blue-600/15'
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#022C22] via-[#044E3B] to-[#022C22] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059]/40 shadow-2xl text-white relative overflow-hidden bg-arabesque-dark">
      
      {/* Top Banner Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-emerald-800/80 mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#FDE68A] font-bold block mb-1">
            {isAr ? 'لوحة الإنجازات البيئية الفردية' : 'Personal Sustainability Dashboard'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t.challenges.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200">
          <Award className="w-4 h-4 text-[#FDE68A]" />
          <span>{isAr ? 'المستوى 3: رائد الاستدامة بأبوظبي' : 'Tier 3: Abu Dhabi Green Pioneer'}</span>
        </div>
      </div>

      {/* 5 Prominent User Stat Badges required in prompt */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-black/30 border border-white/5 backdrop-blur-sm hover:border-[#C5A059]/40 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-200/80">{s.label}</span>
                <div className={`p-1.5 rounded-xl ${s.bg} ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{s.val}</div>
              <div className="text-[10px] text-emerald-300/70 truncate mt-0.5">{s.sub}</div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
