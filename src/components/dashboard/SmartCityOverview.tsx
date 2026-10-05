import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  TrendingUp,
  Footprints,
  Bike,
  Bus,
  Car,
  Leaf,
  ThermometerSnowflake,
  Trees,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface SmartCityOverviewProps {
  data: any;
}

export const SmartCityOverview: React.FC<SmartCityOverviewProps> = ({ data }) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const overview = data?.mobilityOverview || {
    totalSustainableTrips: 148290,
    walkingTrips: 62110,
    cyclingTrips: 28450,
    publicTransportTrips: 57730,
    carTripsAvoided: 84200
  };

  const env = data?.environmentalImpact || {
    co2ReductionTons: 142.6,
    averageHeatExposureReductionPercent: 34.2,
    averageRouteShadeCoveragePercent: 68.4
  };

  const tripStats = [
    {
      label: isAr ? 'إجمالي الرحلات المستدامة' : 'Total Sustainable Trips',
      val: overview.totalSustainableTrips.toLocaleString(),
      icon: TrendingUp,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200'
    },
    {
      label: isAr ? 'رحلات المشي المظللة' : 'Walking Trips',
      val: overview.walkingTrips.toLocaleString(),
      icon: Footprints,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200'
    },
    {
      label: isAr ? 'رحلات الدراجات الهوائية' : 'Cycling Trips',
      val: overview.cyclingTrips.toLocaleString(),
      icon: Bike,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200'
    },
    {
      label: isAr ? 'رحلات الحافلات الكهربائية' : 'Public Transport Trips',
      val: overview.publicTransportTrips.toLocaleString(),
      icon: Bus,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200'
    },
    {
      label: isAr ? 'رحلات سيارات تم تجنبها' : 'Car Trips Avoided',
      val: overview.carTripsAvoided.toLocaleString(),
      icon: Car,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200'
    },
  ];

  const envStats = [
    {
      label: isAr ? 'خفض انبعاثات الكربون' : 'Estimated CO₂ Reduction',
      val: `${env.co2ReductionTons} Tons`,
      sub: isAr ? 'وفر كربوني مكافئ لـ 6,200 شجرة قرم' : 'Equivalent to 6,200 mangrove trees',
      icon: Leaf,
      color: 'text-emerald-700'
    },
    {
      label: isAr ? 'انخفاض التعرض للحرارة' : 'Avg Outdoor Heat Exposure',
      val: `-${env.averageHeatExposureReductionPercent}%`,
      sub: isAr ? 'بفضل ممرات التكييف والتظليل' : 'Via AC skywalks & date palm corridors',
      icon: ThermometerSnowflake,
      color: 'text-cyan-600'
    },
    {
      label: isAr ? 'متوسط نسبة تظليل المسارات' : 'Avg Route Shade Coverage',
      val: `${env.averageRouteShadeCoveragePercent}%`,
      sub: isAr ? 'تغطية بالمظلات والشجر الطبيعي' : 'Urban canopy & photovoltaic arbors',
      icon: Trees,
      color: 'text-green-600'
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Target Authority Notice Banner */}
      <div className="p-4 rounded-2xl bg-[#022C22] text-white border border-[#C5A059]/40 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-900 border border-[#C5A059]/40 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#FDE68A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-[#FDE68A]">
                {isAr ? 'منصة التخطيط الحضري الموحدة لإمارة أبوظبي' : 'Abu Dhabi Unified Urban Planning Grid'}
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                DMT & EAD
              </span>
            </div>
            <p className="text-xs text-emerald-100/80">
              {isAr
                ? 'بيانات تحليلية مجمعة ومجهولة الهوية لتطوير شبكات الظل ومسارات الدراجات'
                : 'Aggregated, anonymized mobility telemetry for Department of Municipalities and Transport'}
            </p>
          </div>
        </div>

        {/* Prototype label requested in prompt:
            "Clearly label: DEMO MODE — Prototype Data. Do not present fictional numbers as real government data."
        */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE68A] text-[#022C22] text-xs font-black uppercase tracking-wider shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PROTOTYPE DATA — Sample Data</span>
        </div>
      </div>

      {/* Mobility Overview Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {t.dashboard.mobilityOverview}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr ? 'إحصاءات آخر 30 يوماً عبر شبكة أبوظبي' : 'Last 30 Days Across Abu Dhabi Grid'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tripStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className={`p-4 rounded-2xl border ${stat.bg} flex flex-col justify-between`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-600 truncate">{stat.label}</span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-2xl font-black text-slate-900">{stat.val}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Environmental Impact Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
        <div className="pb-4 border-b border-slate-100 mb-6">
          <h3 className="text-xl font-black text-slate-900">
            {t.dashboard.environmentalImpact}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr ? 'قياس تقليل الانبعاثات والوقاية من الإجهاد الحراري' : 'CO₂ Abatement & Heat Stress Mitigation Telemetry'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {envStats.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100 shrink-0">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                    {item.label}
                  </span>
                  <div className="text-2xl font-black text-slate-900 my-1">{item.val}</div>
                  <p className="text-xs text-slate-500">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
