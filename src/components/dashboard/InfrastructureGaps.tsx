import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  AlertTriangle,
  Lightbulb,
  Trees,
  Bike,
  Accessibility,
  Footprints,
  ArrowUpRight
} from 'lucide-react';

interface InfrastructureGapsProps {
  insights?: any[];
}

export const InfrastructureGaps: React.FC<InfrastructureGapsProps> = ({ insights = [] }) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const defaultGaps = [
    {
      id: 'gap-1',
      zone: 'Hamdan St / Al Zahiyah Corridor',
      type: 'Shade Infrastructure',
      priority: 'High',
      walkingDemandScore: 92,
      currentShadeCoverage: 28,
      recommendation: isAr
        ? 'تركيب مظلات شمسية مزودة بألواح كهرضوئية وزراعة أشجار الغاف المحلية لتظليل الرصيف.'
        : 'Install integrated photovoltaic solar shade arbors & native Ghaf tree planting along the central corridor.'
    },
    {
      id: 'gap-2',
      zone: 'Al Reem to Maryah Pedestrian Connection',
      type: 'Active Mobility Bottleneck',
      priority: 'Medium',
      walkingDemandScore: 88,
      currentShadeCoverage: 76,
      recommendation: isAr
        ? 'تمديد مسار الجسر المكيف وتوفير مراوح رذاذ مائي خلال ساعات الذروة 11:30 إلى 3:30.'
        : 'Extend air-conditioned skybridge connection during peak 11:30am-3:30pm heat hours.'
    },
    {
      id: 'gap-3',
      zone: 'Mussafah Eco-Link to Central Bus Terminal',
      type: 'Cycling Track Gap',
      priority: 'High',
      walkingDemandScore: 64,
      currentShadeCoverage: 18,
      recommendation: isAr
        ? 'إنشاء مسار دراجات محمي ومفصول بطول 3.2 كم مزود بإنارة شمسية ومظلات استراحة.'
        : 'Construct a 3.2 km protected segregated cycleway with solar lighting and shade rest shelters.'
    },
    {
      id: 'gap-4',
      zone: 'Tourist Club Area (Al Zahiyah) Sector 2',
      type: 'Accessibility Retrofit',
      priority: 'High',
      walkingDemandScore: 78,
      currentShadeCoverage: 52,
      recommendation: isAr
        ? 'تعديل 14 منحدراً للرصيف مع علامات تحذير لمسية لتسهيل حركة الكراسي المتحركة وعربات الأطفال.'
        : 'Retrofit 14 curb cuts with ADA tactile indicators for wheelchair & stroller access.'
    }
  ];

  const items = insights.length > 0 ? insights : defaultGaps;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>{t.dashboard.infrastructureInsights}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr
              ? 'توصيات هندسية ذكية لسد فجوات التظليل ومسارات أصحاب الهمم والدراجات'
              : 'Actionable urban planning gaps identified by resident walking telemetry'}
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          4 Priority Actions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(gap => (
          <div
            key={gap.id}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-extrabold text-sm text-slate-900">{gap.zone}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    gap.priority === 'High'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {gap.priority} Priority
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 font-semibold">
                  {gap.type}
                </span>
                <span>• Demand Score: {gap.walkingDemandScore}/100</span>
                <span>• Shade: {gap.currentShadeCoverage}%</span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-100">
                👉 {gap.recommendation}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
              <span>{isAr ? 'تم إرسال المقترح إلى بلدية أبوظبي' : 'Flagged to Abu Dhabi DMT Masterplan'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
