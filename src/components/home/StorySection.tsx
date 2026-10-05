import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertCircle, Lightbulb, TrendingUp, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export const StorySection: React.FC = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const storySteps = [
    {
      type: 'problem',
      title: isAr ? 'التحدي' : 'The Problem',
      icon: AlertCircle,
      badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-200',
      iconBg: 'bg-rose-100 text-rose-600',
      description: isAr
        ? 'تمتلك أبوظبي بنية تحتية وطرقات عالمية المستوى، لكن درجات الحرارة المرتفعة صيفاً والاعتماد المفرط على المركبات الخاصة يجعلان التنقل المستدام تحدياً يومياً.'
        : 'Abu Dhabi boasts world-class urban infrastructure, but extreme seasonal heat and personal vehicle dependency make sustainable active mobility challenging.'
    },
    {
      type: 'solution',
      title: isAr ? 'الحل المبتكر' : 'The Solution',
      icon: Lightbulb,
      badgeColor: 'bg-emerald-500/10 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-700',
      description: isAr
        ? 'منصة "درب الاستدامة" تجعل التنقل المستدام واقعياً وعملياً عبر تطويع المسارات بحسب المؤشر الحراري، وتفضيل الممرات المكيفة والمظللة، وسهولة وصول أصحاب الهمم.'
        : 'Darb Al Istidama makes sustainable mobility practical and safe by dynamically adapting routes around real-time heat indices, shaded corridors, indoor links, and accessibility needs.'
    },
    {
      type: 'impact',
      title: isAr ? 'الأثر والتحول' : 'The Impact',
      icon: TrendingUp,
      badgeColor: 'bg-[#C5A059]/20 text-[#856404] border-[#C5A059]/40',
      iconBg: 'bg-[#FDFBF7] text-[#C5A059] border border-[#C5A059]/30',
      description: isAr
        ? 'تشجيع المشي وركوب الدراجات، واستخدام النقل العام الكهربائي، واستكشاف ثقافة أبوظبي، وخفض الانبعاثات الكربونية لبناء مدينة أكثر صحة واستدامة.'
        : 'Walk more, cycle more, leverage electric transit, discover heritage, and reduce car emissions to build a cooler, healthier capital.'
    }
  ];

  const impactPillars = [
    { label: isAr ? 'المشي بأمان' : 'Walk more safely', icon: '🚶' },
    { label: isAr ? 'ركوب الدراجات' : 'Cycle dedicated tracks', icon: '🚲' },
    { label: isAr ? 'استخدام النقل العام' : 'Use electric transit', icon: '🚌' },
    { label: isAr ? 'استكشاف تراث أبوظبي' : 'Discover Abu Dhabi culture', icon: '🕌' },
    { label: isAr ? 'تقليل رحلات السيارات' : 'Reduce vehicle trips', icon: '🌱' },
    { label: isAr ? 'مدينة أكثر صحة' : 'Healthier, net-zero city', icon: '🇦🇪' },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#065F46] bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
          {isAr ? 'قصة التحول نحو الاستدامة' : 'Mobility Transformation Story'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] mt-3">
          {isAr ? 'كيف نعيد تعريف الحركة في أبوظبي؟' : 'Reimagining How We Move Across Abu Dhabi'}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-3">
          {isAr
            ? 'دمج المناخ، والتنقل، والتراث، وسهولة الوصول في محرك ذكي واحد يخدم مجتمع الإمارات.'
            : 'Uniting climate intelligence, active mobility, UAE heritage, and universal accessibility into one platform.'}
        </p>
      </div>

      {/* 3 Step Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {storySteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.type}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.iconBg} shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${step.badgeColor}`}>
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'معيار استراتيجي معتمد' : 'Strategic UAE Alignment'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Impact Pillars Grid */}
      <div className="bg-[#022C22] rounded-3xl p-8 sm:p-10 border border-[#C5A059]/40 text-white shadow-xl relative overflow-hidden bg-arabesque-dark">
        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-[#FDE68A]">
              {isAr ? 'أثرنا الملموس في مجتمع أبوظبي' : 'Tangible Net-Zero Impact for Abu Dhabi'}
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm mt-2">
              {isAr
                ? 'تحويل الأرقام إلى سلوك يومي يعزز صحة الأفراد ويقلل البصمة الكربونية'
                : 'Empowering residents and visitors to make comfortable, environmentally conscious choices every day.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {impactPillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-emerald-950/80 border border-emerald-500/30 rounded-2xl p-4 text-center hover:border-[#C5A059] transition-all"
              >
                <div className="text-3xl mb-2 select-none">{pillar.icon}</div>
                <span className="text-xs font-medium text-emerald-100 block">{pillar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
