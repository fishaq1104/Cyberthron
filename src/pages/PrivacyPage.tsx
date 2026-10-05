import { useLanguage } from '../context/LanguageContext';
import { Lock, EyeOff, Database } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
            {isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy & Data Governance'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#022C22]">
          {isAr ? 'الخصوصية بحسب التصميم في درب الاستدامة' : 'Privacy-by-Design at Darb Al Istidama'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          {isAr
            ? 'متوافق مع القانون الاتحادي رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية في دولة الإمارات.'
            : 'Fully aligned with UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center text-center">
            <EyeOff className="w-6 h-6 text-emerald-700 mb-2" />
            <h4 className="font-bold text-slate-900 mb-1">Zero Precise Tracking</h4>
            <p className="text-[11px] text-slate-600">Home/work addresses are never permanently logged.</p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col items-center text-center">
            <Database className="w-6 h-6 text-indigo-700 mb-2" />
            <h4 className="font-bold text-slate-900 mb-1">Aggregated Telemetry</h4>
            <p className="text-[11px] text-slate-600">City dashboards only see anonymized density numbers.</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center text-center">
            <Lock className="w-6 h-6 text-amber-700 mb-2" />
            <h4 className="font-bold text-slate-900 mb-1">Secure API Proxy</h4>
            <p className="text-[11px] text-slate-600">No third-party trackers or exposed client API keys.</p>
          </div>
        </div>

        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">1. Why We Access Location</h3>
          <p>
            Darb Al Istidama requests temporary browser location solely to compute the coolest shaded route from your current position to your destination. You can choose to enter a neighborhood name manually instead of enabling GPS.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">2. Smart City Telemetry (Government & Urban Planners)</h3>
          <p>
            When users complete sustainable journeys, the platform aggregates distance counts (e.g. "+2.4 km walked in Al Reem") to help the Abu Dhabi Department of Municipalities and Transport (DMT) evaluate where shaded trees, canopies, and cycling lanes are needed. Individual travel trails are never shared or published.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">3. Leaderboards & Gamification</h3>
          <p>
            Public leaderboards exclusively display anonymous pseudonyms (e.g. "Anonymous EcoWalker #88"). Your actual name and email are strictly restricted to your private personal profile view.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">4. Right to Erasure</h3>
          <p>
            You can visit your Profile page at any time and click "Purge All Location Data" to permanently wipe any cached route telemetry from your browser.
          </p>
        </section>

      </div>
    </div>
  );
};
