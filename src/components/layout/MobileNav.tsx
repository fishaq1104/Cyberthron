import React from 'react';
import { Compass, MapPin, Flame, BarChart3, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPage, onNavigate }) => {
  const { t } = useLanguage();

  const items = [
    { id: 'home', label: t.nav.home, icon: Compass },
    { id: 'plan', label: t.nav.plan, icon: MapPin },
    { id: 'explore', label: t.nav.explore, icon: Compass },
    { id: 'challenges', label: t.nav.challenges, icon: Flame },
    { id: 'dashboard', label: t.nav.dashboard, icon: BarChart3 },
    { id: 'profile', label: t.nav.profile, icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#022C22]/98 backdrop-blur-lg border-t border-[#C5A059]/40 px-2 py-2 shadow-2xl">
      <div className="flex items-center justify-around">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#FDE68A] font-bold scale-105'
                  : 'text-emerald-300/70 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] truncate max-w-[55px]">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#C5A059] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
