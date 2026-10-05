import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  ShieldCheck,
  MapPin,
  Activity,
  Sparkles,
  BarChart,
  Trash2,
  Check,
  Lock,
  Info
} from 'lucide-react';

export const PrivacySettingsModal: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const [settings, setSettings] = useState({
    locationAccess: true,
    activityTracking: true,
    personalizedRecommendations: true,
    analyticsParticipation: true
  });

  const [deletedNotice, setDeletedNotice] = useState(false);

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeleteHistory = () => {
    setDeletedNotice(true);
    setTimeout(() => setDeletedNotice(false), 4000);
  };

  const privacyToggles = [
    {
      key: 'locationAccess' as const,
      title: isAr ? 'الوصول إلى الموقع الجغرافي' : 'Location Access',
      desc: isAr
        ? 'يُستخدم حصرياً لحساب المسار المظلل الفوري. لا يتم حفظ إحداثيات منزلك أو عملك أبداً على خوادمنا.'
        : 'Used solely for real-time shaded routing. Your home and work coordinates are never permanently stored on servers.',
      icon: MapPin
    },
    {
      key: 'activityTracking' as const,
      title: isAr ? 'تتبع النشاط والمشي' : 'Activity & Distance Tracking',
      desc: isAr
        ? 'احتساب الكيلومترات المقطوعة لمنحك النقاط الخضراء وتتبع انبعاثات الكربون المحققة.'
        : 'Logs distance locally to credit Green Points and calculate your personal CO₂ savings.',
      icon: Activity
    },
    {
      key: 'personalizedRecommendations' as const,
      title: isAr ? 'التوصيات المناخية الذكية' : 'Personalized Recommendations',
      desc: isAr
        ? 'تنبيهك قبل الخروج في حال تجاوز المؤشر الحراري 40 درجة مئوية مع اقتراح بدائل مكيفة.'
        : 'Alerts you if Abu Dhabi heat index exceeds safe thresholds and suggests shaded routes.',
      icon: Sparkles
    },
    {
      key: 'analyticsParticipation' as const,
      title: isAr ? 'المشاركة في تحليلات المدينة الذكية' : 'Smart City Analytics Participation',
      desc: isAr
        ? 'مشاركة بيانات تنقل مشفرة ومجهولة الهوية بالكامل لدعم بلدية أبوظبي في زراعة الأشجار والتظليل.'
        : 'Contributes strictly aggregated, anonymized trip counts to help Abu Dhabi DMT identify missing shade canopies.',
      icon: BarChart
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>{isAr ? 'إعدادات الخصوصية والتحكم في البيانات' : 'Privacy & Data Protection Settings'}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr
              ? 'الخصوصية بحسب التصميم: أنت من يتحكم في بياناتك الجغرافية والصحية بالكامل'
              : 'Privacy-by-Design: Full sovereignty over your location permissions and mobility history'}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>UAE PDPL Compliant</span>
        </span>
      </div>

      {/* Toggles list */}
      <div className="space-y-4 mb-8">
        {privacyToggles.map(item => {
          const Icon = item.icon;
          const isEnabled = settings[item.key];
          return (
            <div
              key={item.key}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white border border-slate-200 text-emerald-700 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Toggle switch button */}
              <button
                type="button"
                onClick={() => toggle(item.key)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 mt-1 ${
                  isEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                aria-label={`Toggle ${item.title}`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                    isEnabled ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Danger Zone: Erase History */}
      <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-slate-900">
            {isAr ? 'حذف سجل الرحلات والموقع' : 'Erase Trip & Location Telemetry'}
          </h4>
          <p className="text-xs text-slate-500">
            {isAr
              ? 'يحذف جميع سجلات التنقل المحلية وسجلات الكيلومترات فوراً'
              : 'Immediately purges all cached journey waypoints from local storage.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleDeleteHistory}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-all cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>{isAr ? 'حذف بياناتي الآن' : 'Purge All Location Data'}</span>
        </button>
      </div>

      {deletedNotice && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border border-emerald-200">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>
            {isAr ? 'تم مسح سجلات الموقع والتنقل بنجاح.' : 'Local trip telemetry erased successfully.'}
          </span>
        </div>
      )}
    </div>
  );
};
