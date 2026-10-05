import React from 'react';
import { PersonalStats } from '../components/profile/PersonalStats';
import { PrivacySettingsModal } from '../components/profile/PrivacySettingsModal';
import { useLanguage } from '../context/LanguageContext';

export const ProfilePage: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-[#065F46] uppercase tracking-widest">
            {isAr ? 'لوحة تحكم المستخدم والخصوصية' : 'Personal Mobility & Sovereignty'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#022C22]">
          {isAr ? 'ملفك الشخصي ونشاطك المستدام' : 'Your Mobility & Sustainability Profile'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
          {isAr
            ? 'متابعة مسافات المشي والدراجات، ورصيد النقاط الخضراء، والتحكم التام في إعدادات الخصوصية.'
            : 'Track your personal walking distance, Green Points balance, and exercise full control over your privacy.'}
        </p>
      </div>

      {/* Personal Stats & Mobility */}
      <PersonalStats />

      {/* Privacy Settings & Data Sovereignty */}
      <PrivacySettingsModal />
    </div>
  );
};
