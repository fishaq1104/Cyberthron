import { useLanguage } from '../context/LanguageContext';
import { Accessibility, Eye } from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
            {isAr ? 'تمكين أصحاب الهمم وسهولة الوصول' : 'Universal Access & People of Determination'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#022C22]">
          {isAr ? 'التزامنا بسهولة الوصول والشمولية الكاملة' : 'Accessibility & People of Determination Commitment'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          {isAr
            ? 'تطبيق أعلى المعايير العالمية (WCAG 2.1 AA) لضمان تنقل رقمي وميداني كريم وشامل لجميع أفراد المجتمع.'
            : 'Adhering to WCAG 2.1 AA standards and Abu Dhabi Department of Community Development guidelines.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        {/* Core Accessibility Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-100">
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
              <Accessibility className="w-5 h-5 text-indigo-700" />
              <span>Step-Free & Wheelchair Routing</span>
            </div>
            <p className="text-xs text-slate-600">
              Our routing algorithm filters for 100% ramp-accessible corridors, elevator-connected skybridges (e.g. Maryah Island), and low-floor electric bus connections.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
              <Eye className="w-5 h-5 text-emerald-700" />
              <span>High Contrast & Scalable Typography</span>
            </div>
            <p className="text-xs text-slate-600">
              Color contrast ratios meet or exceed 4.5:1. Heat warnings and route indicators never rely on color alone and are supplemented with icons and explicit text tags.
            </p>
          </div>
        </div>

        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">Digital Accessibility Standards</h3>
          <ul className="space-y-1.5 list-disc pl-5 text-slate-600">
            <li>Semantic HTML5 structure throughout all navigation, headings, and cards.</li>
            <li>Full keyboard accessibility (`Tab`, `Enter`, `Escape`) with visible focus outlines.</li>
            <li>ARIA live regions for real-time climate alerts and route calculation notifications.</li>
            <li>Full Arabic typography support with bidirectional rendering (`dir="rtl"`).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">Physical Infrastructure Verification</h3>
          <p>
            In collaboration with Abu Dhabi smart-city surveys, our routes flag tactile ground indicators, audible pedestrian signals at Corniche crossings, and air-conditioned transit shelters equipped with motorized wheelchair boarding ramps.
          </p>
        </section>

      </div>
    </div>
  );
};
