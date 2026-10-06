import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  MapPin,
  Flame,
  BarChart3,
  User,
  Globe,
  Menu,
  X,
  Shield,
  Building2,
  Users,
  Accessibility
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { lang, toggleLang, t } = useLanguage();
  const { role, loginAs } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isAr = lang === 'ar';

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Compass },
    { id: 'plan', label: t.nav.plan, icon: MapPin },
    { id: 'explore', label: t.nav.explore, icon: Compass },
    { id: 'challenges', label: t.nav.challenges, icon: Flame },
    { id: 'dashboard', label: t.nav.dashboard, icon: BarChart3 },
    { id: 'about', label: t.nav.about, icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#022C22]/95 backdrop-blur-md border-b border-[#C5A059]/30 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div
          onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-2 border border-[#C5A059]/50 shadow-md group-hover:border-[#C5A059] transition-all flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Darb Al Istidama" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-emerald-100 to-[#FDE68A] bg-clip-text text-transparent">
                Darb Al Istidama
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#C5A059] tracking-wider uppercase">
              {isAr ? 'درب الاستدامة • أبوظبي' : 'Abu Dhabi Net-Zero Mobility'}
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-900/80 text-[#FDE68A] border border-[#C5A059]/40 shadow-sm'
                    : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools: Role Selector, Language, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Role Switcher for Testing (USER / GOVERNMENT / CORPORATE) */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              type="button"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 hover:border-[#C5A059] transition-all cursor-pointer"
              title="Switch user perspective for review"
            >
              {role === 'GOVERNMENT' ? (
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
              ) : role === 'CORPORATE' ? (
                <Users className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <User className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span className="font-mono text-[11px]">{role}</span>
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#022C22] border border-[#C5A059]/40 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] text-emerald-400 uppercase font-bold border-b border-emerald-900">
                  Select Perspective
                </div>
                <button
                  type="button"
                  onClick={() => { loginAs('USER'); setRoleDropdownOpen(false); }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-900/60 flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-white">Resident / Traveler</div>
                    <div className="text-[10px] text-emerald-300">Fatima Al Mansoori</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => { loginAs('GOVERNMENT'); setRoleDropdownOpen(false); onNavigate('dashboard'); }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-900/60 flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <div>
                    <div className="font-semibold text-white">Abu Dhabi DMT Planner</div>
                    <div className="text-[10px] text-amber-200">Urban Analytics Access</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => { loginAs('CORPORATE'); setRoleDropdownOpen(false); onNavigate('dashboard'); }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-900/60 flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <div>
                    <div className="font-semibold text-white">Corporate Partner</div>
                    <div className="text-[10px] text-cyan-200">ADGM Wellness Lead</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Language Toggle: English | العربية */}
          <button
            onClick={toggleLang}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#044E3B] hover:bg-[#065F46] border border-[#C5A059]/40 text-[#FDE68A] transition-all shadow-sm cursor-pointer"
            aria-label="Toggle Language English / Arabic"
          >
            <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* Profile CTA */}
          <button
            onClick={() => onNavigate('profile')}
            type="button"
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              currentPage === 'profile'
                ? 'bg-[#C5A059] text-[#022C22] border-white shadow-sm'
                : 'bg-emerald-950 border-emerald-700/50 text-emerald-200 hover:text-white hover:border-[#C5A059]'
            }`}
            title="User Profile"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-2 rounded-xl bg-emerald-950 border border-emerald-700/50 text-emerald-200 hover:text-white"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#022C22] border-b border-[#C5A059]/30 px-4 pt-2 pb-6 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-900 text-[#FDE68A] border border-[#C5A059]/40'
                    : 'text-emerald-100 hover:bg-emerald-900/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-emerald-900/80 flex items-center justify-between">
            <button
              onClick={() => { onNavigate('accessibility'); setMobileMenuOpen(false); }}
              type="button"
              className="flex items-center gap-2 text-xs text-emerald-300 py-1"
            >
              <Accessibility className="w-4 h-4" />
              <span>{t.nav.accessibility}</span>
            </button>
            <button
              onClick={() => { onNavigate('privacy'); setMobileMenuOpen(false); }}
              type="button"
              className="text-xs text-emerald-300 py-1"
            >
              {t.nav.privacy}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
