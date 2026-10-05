import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  Accessibility,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  Footprints,
  Baby,
  UserCheck,
  Sliders,
  Volume2
} from 'lucide-react';

export const AccessibilityPanel: React.FC = () => {
  const { lang, t } = useLanguage();
  const {
    preferences,
    isAccessibilityActive,
    togglePreference,
    resetPreferences,
    setAllAccessible
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(true);
  const isAr = lang === 'ar';

  const options: { key: keyof typeof preferences; label: string; icon: any }[] = [
    { key: 'wheelchair', label: t.accessibility.wheelchair, icon: Accessibility },
    { key: 'stepFree', label: t.accessibility.stepFree, icon: Check },
    { key: 'avoidStairs', label: t.accessibility.avoidStairs, icon: Sliders },
    { key: 'strollerFriendly', label: t.accessibility.stroller, icon: Baby },
    { key: 'elderFriendly', label: t.accessibility.elder, icon: UserCheck },
    { key: 'reducedWalking', label: t.accessibility.reducedWalking, icon: Footprints },
    { key: 'visualAssist', label: t.accessibility.visual, icon: Eye },
    { key: 'hearingAssist', label: t.accessibility.hearing, icon: Volume2 },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-indigo-100 shadow-md transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-indigo-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
            <Accessibility className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-900">
                {t.accessibility.title}
              </h3>
              {isAccessibilityActive && (
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider animate-pulse shadow-sm">
                  {t.accessibility.activeBadge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {isAr ? 'خيارات مخصصة لأصحاب الهمم وكبار السن والعائلات' : 'Customized for People of Determination & Families'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer"
        >
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Active notification requested in prompt:
          “Showing step-free routes with accessible crossings.”
      */}
      {isAccessibilityActive && (
        <div className="mt-3 p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between">
          <span className="font-medium">
            ♿ {t.accessibility.activeNotice}
          </span>
          <button
            type="button"
            onClick={resetPreferences}
            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 underline cursor-pointer ml-2"
          >
            {isAr ? 'إعادة ضبط' : 'Reset'}
          </button>
        </div>
      )}

      {/* Options Grid */}
      {isOpen && (
        <div className="mt-4 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {options.map(opt => {
              const Icon = opt.icon;
              const isChecked = preferences[opt.key];
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => togglePreference(opt.key)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all text-left cursor-pointer ${
                    isChecked
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                      isChecked ? 'bg-white text-indigo-700 border-white' : 'border-slate-300'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick presets */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              {isAr ? 'معايير الوصول الشامل لأبوظبي' : 'Universal Abu Dhabi Accessibility'}
            </span>
            <button
              type="button"
              onClick={setAllAccessible}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
            >
              {isAr ? 'تفعيل الوضع الشامل لأصحاب الهمم ➔' : 'Enable Full POD Accessible Mode ➔'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
