import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Accessibility, Leaf, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <footer className="bg-[#022C22] text-white border-t border-[#C5A059]/30 pt-14 pb-20 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Positioning Statement Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#044E3B] to-emerald-950 border border-[#C5A059]/40 text-center shadow-lg">
          <span className="inline-block text-xs uppercase tracking-widest text-[#FDE68A] font-bold mb-2">
            {isAr ? 'الرؤية الوطنية للتنقل المستدام' : 'UAE SMART MOBILITY CHARTER'}
          </span>
          <h3 className="text-lg sm:text-2xl font-extrabold text-white">
            {t.positioning}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200/80 max-w-2xl mx-auto mt-2">
            {isAr
              ? 'ندعم المبادرة الاستراتيجية للحياد المناخي 2050 لدولة الإمارات عبر تحويل التنقل الفردي إلى تجربة آمنة ومظللة وخالية من الانبعاثات في أبوظبي.'
              : 'Empowering Abu Dhabi’s Net-Zero 2050 commitment through climate-adapted walking, cycling, and electric transit corridors.'}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-emerald-900/60">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 p-1.5 border border-[#C5A059]/40 flex items-center justify-center">
                <img src="/logo.svg" alt="Darb Al Istidama Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-bold text-lg text-white">Darb Al Istidama</span>
                <p className="text-[11px] text-[#C5A059]">{isAr ? 'درب الاستدامة' : 'Abu Dhabi, UAE'}</p>
              </div>
            </div>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              {isAr
                ? 'منصة ذكية ترسم مسارات المشي والدراجات والنقل العام استناداً إلى الحرارة المباشرة، ونسب التظليل، والممرات المكيفة، ومراعاة أصحاب الهمم.'
                : 'Climate-responsive engine designing pedestrian, cycling and transit routes around Abu Dhabi’s heat index, shade canopies, and accessibility.'}
            </p>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="font-semibold text-sm text-[#FDE68A] uppercase tracking-wider mb-3">
              {isAr ? 'استكشف المنصة' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <button type="button" onClick={() => onNavigate('plan')} className="hover:text-[#FDE68A] transition-colors cursor-pointer">
                  {t.nav.plan}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('explore')} className="hover:text-[#FDE68A] transition-colors cursor-pointer">
                  {t.nav.explore}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('challenges')} className="hover:text-[#FDE68A] transition-colors cursor-pointer">
                  {t.nav.challenges}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('dashboard')} className="hover:text-[#FDE68A] transition-colors cursor-pointer">
                  {t.nav.dashboard}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Governance */}
          <div>
            <h4 className="font-semibold text-sm text-[#FDE68A] uppercase tracking-wider mb-3">
              {isAr ? 'السياسات والمعايير' : 'Governance & Trust'}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <button type="button" onClick={() => onNavigate('privacy')} className="hover:text-[#FDE68A] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{t.nav.privacy}</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('accessibility')} className="hover:text-[#FDE68A] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Accessibility className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{t.nav.accessibility}</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('about')} className="hover:text-[#FDE68A] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Leaf className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{t.nav.about}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Abu Dhabi Pillars */}
          <div>
            <h4 className="font-semibold text-sm text-[#FDE68A] uppercase tracking-wider mb-3">
              {isAr ? 'ركائز أبوظبي' : 'Abu Dhabi Pillars'}
            </h4>
            <div className="space-y-2 text-xs text-emerald-200/70">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Masdar City Zero-Carbon Blueprint</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Abu Dhabi Corniche & Hudayriyat Cycleways</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>ITC Low-Emission Electric Bus Network</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Department of Community Development (POD)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <p>{t.footerCopyright}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#FDE68A]">
              <HeartHandshake className="w-3.5 h-3.5 text-[#C5A059]" />
              {isAr ? 'صنع بروح الابتكار في الإمارات' : 'Engineered with UAE Innovation Spirit'}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
