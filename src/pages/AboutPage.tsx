import { useLanguage } from '../context/LanguageContext';
import { Leaf } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#022C22] via-[#044E3B] to-[#022C22] rounded-3xl p-8 sm:p-12 text-white border-2 border-[#C5A059]/40 shadow-2xl relative overflow-hidden bg-arabesque-dark">
        <div className="max-w-3xl relative z-10 space-y-4">
          <span className="px-3 py-1 rounded-full bg-[#C5A059]/20 text-[#FDE68A] text-xs font-bold uppercase tracking-widest border border-[#C5A059]/40">
            {isAr ? 'عن مبادرة درب الاستدامة' : 'About Darb Al Istidama'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {t.appTagline}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            {t.positioning}
          </p>
        </div>
      </div>

      {/* 5 Core Pillars */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-[#022C22]">
          {isAr ? 'الركائز الخمس لمنظومة درب الاستدامة' : 'The Five Core Innovations'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              title: isAr ? 'المناخ والحرارة' : 'Climate Intelligence',
              desc: isAr ? 'رصد دقيق للمؤشر الحراري، والرطوبة، والأشعة فوق البنفسجية في أبوظبي.' : 'Real-time heat index, humidity, and UV sensing tailored to Abu Dhabi weather.',
              icon: '🌡️'
            },
            {
              title: isAr ? 'التنقل المستدام' : 'Active Mobility',
              desc: isAr ? 'أولوية للمشي المظلل، ومسارات الدراجات، والحافلات الكهربائية.' : 'Prioritizing shaded walking, dedicated cycleways, and electric public transit.',
              icon: '🚲'
            },
            {
              title: isAr ? 'التراث الإماراتي' : 'UAE Heritage',
              desc: isAr ? 'ربط التنقل باستكشاف الهوية الوطنية، ومسارات الطعام التراثي كالهريس، والعمارة المستدامة كالبراجيل.' : 'Connecting routes to Emirati heritage trails, food traditions, and architectural wisdom.',
              icon: '🕌'
            },
            {
              title: isAr ? 'أصحاب الهمم' : 'Universal Access',
              desc: isAr ? 'مسارات خالية تماماً من الدرج، منحدرات ومصاعد معتمدة، وممرات مكيفة.' : 'Step-free corridors, verified ramps, elevator links, and stroller compatibility.',
              icon: '♿'
            },
            {
              title: isAr ? 'التحليلات الذكية' : 'Smart Analytics',
              desc: isAr ? 'بيانات مجمعة ومجهولة الهوية لدعم المخططين الحضريين في تحديد أماكن نقص التظليل.' : 'Aggregated, privacy-preserving telemetry for urban shade canopy expansion.',
              icon: '📊'
            },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-3xl mb-2 select-none block">{p.icon}</span>
                <h3 className="font-extrabold text-sm text-slate-900 mb-1">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alignment with UAE Net Zero 2050 */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {isAr ? 'التوافق مع المبادرة الاستراتيجية للحياد المناخي 2050' : 'Alignment with UAE Net Zero 2050'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAr ? 'دولة الإمارات العربية المتحدة • إمارة أبوظبي' : 'United Arab Emirates • Emirate of Abu Dhabi'}
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {isAr
            ? 'تلتزم دولة الإمارات بخفض الانبعاثات الكربونية إلى الصفر بحلول عام 2050. يمثل قطاع النقل البري الفردي أحد أكبر مصادر الانبعاثات الحضرية. من خلال "درب الاستدامة"، نثبت أن التغلب على عائق حرارة الصيف ممكن تماماً عبر الذكاء الاصطناعي الذي يدمج ممرات التظليل الطبيعية وممرات التكييف البينية مع النقل العام الكهربائي.'
            : 'The UAE is committed to achieving net-zero greenhouse gas emissions by 2050. Urban transportation represents a critical frontier. Darb Al Istidama demonstrates that extreme regional heat is not a permanent barrier to active mobility when journeys are dynamically adapted through climate intelligence, urban shade canopies, and passive cooling infrastructure.'}
        </p>
      </div>

    </div>
  );
};
