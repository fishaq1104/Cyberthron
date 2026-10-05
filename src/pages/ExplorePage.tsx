import React, { useState } from 'react';
import { ABU_DHABI_PLACES } from '../data/abuDhabiData';
import { CulturalCard } from '../components/explore/CulturalCard';
import { HeritageSection } from '../components/explore/HeritageSection';
import { useLanguage } from '../context/LanguageContext';
import { Filter } from 'lucide-react';

interface ExplorePageProps {
  onPlanTo: (placeName: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ onPlanTo }) => {
  const { lang, t } = useLanguage();
  const isAr = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t.explore.categories.all },
    { id: 'cultural', label: t.explore.categories.cultural },
    { id: 'nature', label: t.explore.categories.nature },
    { id: 'urban', label: t.explore.categories.urban },
    { id: 'active', label: t.explore.categories.active },
  ];

  const filteredPlaces = ABU_DHABI_PLACES.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'cultural') return p.category.includes('Cultural') || p.category.includes('Heritage');
    if (activeCategory === 'nature') return p.category.includes('Nature') || p.category.includes('Ecological');
    if (activeCategory === 'urban') return p.category.includes('Net-Zero') || p.category.includes('Innovation');
    if (activeCategory === 'active') return p.category.includes('Cycling') || p.category.includes('Active');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-[#065F46] uppercase tracking-widest">
            {isAr ? 'اكتشف معالم أبوظبي المستدامة' : 'Abu Dhabi Sustainable Heritage & Discovery'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#022C22]">
          {t.explore.title}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
          {t.explore.subtitle}
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {categories.map(c => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeCategory === c.id
                ? 'bg-[#044E3B] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Destination Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlaces.map(place => (
          <CulturalCard
            key={place.id}
            place={place}
            onPlanTo={onPlanTo}
          />
        ))}
      </div>

      {/* Heritage & Living Culture Section */}
      <HeritageSection />

    </div>
  );
};
