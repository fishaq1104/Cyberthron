import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { BADGES } from '../../data/abuDhabiData';
import {
  User,
  Footprints,
  Bike,
  Bus,
  Leaf,
  Activity,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const PersonalStats: React.FC = () => {
  const { lang, t } = useLanguage();
  const { user } = useAuth();
  const isAr = lang === 'ar';

  return (
    <div className="space-y-8">
      
      {/* Profile Overview Card */}
      <div className="bg-gradient-to-br from-[#022C22] via-[#044E3B] to-[#022C22] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059]/40 shadow-xl text-white bg-arabesque-dark">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-800 to-[#C5A059] p-1 border-2 border-white shadow-lg flex items-center justify-center text-3xl">
              🧕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {user?.name || 'Fatima Al Mansoori'}
                </h2>
                <span className="text-[10px] bg-[#C5A059] text-white px-2 py-0.5 rounded-full font-bold uppercase">
                  {user?.role || 'Resident'}
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                {user?.email || 'resident@darbalistidama.ae'} • Abu Dhabi, UAE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right sm:text-left">
              <span className="text-[11px] text-emerald-300 block">{t.challenges.greenPoints}</span>
              <span className="text-2xl font-black text-[#FDE68A]">
                {user?.greenPoints || 1280}
              </span>
            </div>
            <div className="h-8 w-px bg-emerald-700/60 hidden sm:block"></div>
            <div>
              <span className="text-[11px] text-emerald-300 block">{t.challenges.streak}</span>
              <span className="text-2xl font-black text-amber-400">
                {user?.streakDays || 7} {isAr ? 'أيام' : 'days'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 4 Personal Sections required in prompt:
          1. Your Mobility (Walking 24.6 km, Cycling 8.2 km, Public Transport 12 trips)
          2. Environmental Impact (Estimated CO2 avoided: 4.8 kg)
          3. Health & Activity (Steps: 42,500)
          4. Sustainability (Green Points: 1,280)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Your Mobility */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="font-extrabold text-sm text-slate-900">
                {isAr ? 'حركتك وتنقلاتك' : 'Your Mobility'}
              </h4>
              <Footprints className="w-4 h-4 text-emerald-700" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Footprints className="w-3.5 h-3.5 text-emerald-600" /> Walking:
                </span>
                <span className="font-bold text-slate-900">24.6 km</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5 text-blue-600" /> Cycling:
                </span>
                <span className="font-bold text-slate-900">8.2 km</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Bus className="w-3.5 h-3.5 text-amber-600" /> Public Transport:
                </span>
                <span className="font-bold text-slate-900">12 trips</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Environmental Impact */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="font-extrabold text-sm text-slate-900">
                {isAr ? 'الأثر البيئي' : 'Environmental Impact'}
              </h4>
              <Leaf className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="text-center py-2">
              <span className="text-xs text-slate-500 block mb-1">
                Estimated CO₂ Avoided:
              </span>
              <div className="text-3xl font-black text-emerald-700">
                4.8 kg
              </div>
              <p className="text-[11px] text-emerald-600 mt-2 font-medium">
                🌱 Saved vs. Private Petrol Car
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 text-[11px] text-emerald-800 text-center font-semibold">
            {isAr ? 'مساهم في مبادرة الحياد المناخي 2050' : 'Net-Zero 2050 Contributor'}
          </div>
        </div>

        {/* 3. Health & Activity */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="font-extrabold text-sm text-slate-900">
                {isAr ? 'الصحة والنشاط' : 'Health & Activity'}
              </h4>
              <Activity className="w-4 h-4 text-rose-500" />
            </div>

            <div className="text-center py-2">
              <span className="text-xs text-slate-500 block mb-1">
                Total Steps:
              </span>
              <div className="text-3xl font-black text-slate-900">
                42,500
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                🔥 ~1,720 kcal active burn
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50 text-[11px] text-rose-800 text-center font-semibold">
            {isAr ? 'معدل يومي صحي في طقس معتدل' : 'Optimal Climate-Safe Pacing'}
          </div>
        </div>

        {/* 4. Sustainability Points */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="font-extrabold text-sm text-slate-900">
                {isAr ? 'النقاط الخضراء' : 'Sustainability Points'}
              </h4>
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
            </div>

            <div className="text-center py-2">
              <span className="text-xs text-slate-500 block mb-1">
                Green Points:
              </span>
              <div className="text-3xl font-black text-[#C5A059]">
                1,280
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Available for Mock Partner Perks
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 text-[11px] text-amber-900 text-center font-semibold">
            {isAr ? 'قريباً: استبدال مع حافلات أبوظبي' : 'Coming Soon: ITC Bus Pass Perks'}
          </div>
        </div>

      </div>

      {/* Earned Badges Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
        <h4 className="font-extrabold text-base text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#C5A059]" />
          <span>{isAr ? 'أوسمة الإنجاز الخاصة بك' : 'Your Earned Achievements'}</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BADGES.filter(b => b.earned).map(b => (
            <div key={b.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <div className="text-3xl mb-1 select-none">{b.icon}</div>
              <span className="text-xs font-bold text-slate-900 block">{isAr ? b.titleAr : b.title}</span>
              <span className="text-[10px] text-emerald-700 font-mono font-semibold">{b.dateEarned}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
