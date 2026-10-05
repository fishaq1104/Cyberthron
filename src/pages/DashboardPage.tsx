import React, { useEffect, useState } from 'react';
import { SmartCityOverview } from '../components/dashboard/SmartCityOverview';
import { InfrastructureGaps } from '../components/dashboard/InfrastructureGaps';
import { HeatZoneAnalysis } from '../components/dashboard/HeatZoneAnalysis';
import { CorporateWellness } from '../components/dashboard/CorporateWellness';
import { useLanguage } from '../context/LanguageContext';
import { fetchAnalytics } from '../services/api';
import { BarChart3, Building2, ShieldCheck, Download, RefreshCw } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await fetchAnalytics();
      setAnalytics(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Page Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              {isAr ? 'بوابة التخطيط الحكومي والتحليلات المجمعة' : 'Abu Dhabi Government & Urban Analytics Portal'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#022C22]">
            {t.dashboard.title}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            {t.dashboard.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadAnalytics}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{isAr ? 'تحديث البيانات' : 'Refresh Telemetry'}</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Exporting aggregated Abu Dhabi DMT sustainability report (PDF/CSV)...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#044E3B] hover:bg-[#065F46] text-white text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isAr ? 'تصدير التقرير' : 'Export DMT Report'}</span>
          </button>
        </div>
      </div>

      {/* 1. Mobility & Environmental Overview */}
      <SmartCityOverview data={analytics} />

      {/* 2. Mobility Demand vs. Shade Distribution Heat Zone Analysis */}
      <HeatZoneAnalysis zones={analytics?.zoneDemand} />

      {/* 3. Infrastructure & Shade Planning Gaps */}
      <InfrastructureGaps insights={analytics?.infrastructureInsights} />

      {/* 4. Corporate Wellness B2B Module */}
      <CorporateWellness demoCorp={analytics?.corporateWellnessDemo} />

    </div>
  );
};
