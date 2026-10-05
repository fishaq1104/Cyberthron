import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Users,
  TrendingUp,
  Leaf,
  Footprints,
  ShieldCheck,
  Building,
  Award,
  Sparkles
} from 'lucide-react';

interface CorporateWellnessProps {
  demoCorp?: any;
}

export const CorporateWellness: React.FC<CorporateWellnessProps> = ({ demoCorp }) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const corp = demoCorp || {
    partnerCompany: 'Demo UAE Enterprise (Abu Dhabi Global Market)',
    totalRegisteredEmployees: 126,
    activeParticipantsThisMonth: 104,
    totalSustainableTrips: 2481,
    co2AvoidedKg: 312.4,
    caloriesBurnedKcal: 489200,
    walkingChallengePercentCompleted: 78,
    teamRanking: 'Top 5% Abu Dhabi Corporate Sustainability Index'
  };

  return (
    <div className="bg-gradient-to-br from-[#022C22] via-[#044E3B] to-[#022C22] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059]/40 shadow-xl text-white relative overflow-hidden bg-arabesque-dark">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-emerald-800/80 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-[#FDE68A]" />
            <span className="text-xs uppercase tracking-widest text-[#FDE68A] font-bold">
              {isAr ? 'برنامج استدامة الشركات في الإمارات (B2B)' : 'UAE Corporate Sustainability & Wellness Grid'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {t.dashboard.corporateWellness}
          </h3>
          <p className="text-xs text-emerald-200/80 mt-0.5">
            {corp.partnerCompany}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-500/40 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isAr ? 'بيانات الموظفين مشفرة ومجهولة الهوية' : '100% Anonymized Telemetry'}</span>
        </div>
      </div>

      {/* 4 Core B2B Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        
        {/* Employees */}
        <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
          <span className="text-xs text-emerald-300 block mb-1">
            {isAr ? 'الموظفون المشاركون' : 'Employees Active'}
          </span>
          <div className="text-2xl font-black text-white">
            {corp.totalRegisteredEmployees}
          </div>
          <span className="text-[10px] text-emerald-400">
            {corp.activeParticipantsThisMonth} active this month
          </span>
        </div>

        {/* Sustainable Trips */}
        <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
          <span className="text-xs text-emerald-300 block mb-1">
            {isAr ? 'الرحلات المستدامة' : 'Sustainable Trips'}
          </span>
          <div className="text-2xl font-black text-white">
            {corp.totalSustainableTrips.toLocaleString()}
          </div>
          <span className="text-[10px] text-cyan-300">
            Commute & lunch walks
          </span>
        </div>

        {/* CO2 Avoided */}
        <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
          <span className="text-xs text-emerald-300 block mb-1">
            {isAr ? 'وفر الكربون' : 'CO₂ Avoided'}
          </span>
          <div className="text-2xl font-black text-[#FDE68A]">
            {corp.co2AvoidedKg} kg
          </div>
          <span className="text-[10px] text-emerald-300">
            ESG Scope 3 reduction
          </span>
        </div>

        {/* Walking Challenge */}
        <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
          <span className="text-xs text-emerald-300 block mb-1">
            {isAr ? 'تحدي المشي' : 'Challenge Completion'}
          </span>
          <div className="text-2xl font-black text-emerald-400">
            {corp.walkingChallengePercentCompleted}%
          </div>
          <span className="text-[10px] text-[#FDE68A]">
            {corp.teamRanking}
          </span>
        </div>

      </div>

      {/* Progress highlight */}
      <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#FDE68A]" />
          <span>
            {isAr
              ? 'مبادرة "امشِ في أبوظبي": 78% من المستهدف الشهري قد تحقق عبر ممرات التظليل.'
              : 'Corporate "Walk Abu Dhabi" Initiative: 78% of monthly target reached via shaded corridors.'}
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#FDE68A] bg-black/40 px-3 py-1 rounded-full border border-[#C5A059]/40">
          ESG Certified
        </span>
      </div>

    </div>
  );
};
