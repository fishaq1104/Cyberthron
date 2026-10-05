import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ClimateProvider } from './context/ClimateContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { DemoBanner } from './components/common/DemoBanner';
import { DarbAIChat } from './components/ai/DarbAIChat';

import { HomePage } from './pages/HomePage';
import { PlanPage } from './pages/PlanPage';
import { ExplorePage } from './pages/ExplorePage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ProfilePage } from './pages/ProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AccessibilityPage } from './pages/AccessibilityPage';

const AppContent: React.FC = () => {
  const { lang, dir } = useLanguage();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [demoTriggerCount, setDemoTriggerCount] = useState<number>(0);

  // Sync with URL hash if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'plan', 'explore', 'challenges', 'profile', 'dashboard', 'about', 'privacy', 'accessibility'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunDemoScenario = () => {
    setDemoTriggerCount(prev => prev + 1);
    navigateTo('plan');
  };

  const handlePlanTo = (placeName: string) => {
    navigateTo('plan');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F2] text-slate-800 transition-colors selection:bg-emerald-700 selection:text-white" dir={dir}>
      
      {/* Top Prototype Demo Banner */}
      <DemoBanner onRunDemoScenario={handleRunDemoScenario} />

      {/* Main Navbar */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSetDemoScenario={handleRunDemoScenario}
          />
        )}
        {currentPage === 'plan' && (
          <PlanPage
            demoTriggerCount={demoTriggerCount}
          />
        )}
        {currentPage === 'explore' && (
          <ExplorePage
            onPlanTo={handlePlanTo}
          />
        )}
        {currentPage === 'challenges' && (
          <ChallengesPage />
        )}
        {currentPage === 'profile' && (
          <ProfilePage />
        )}
        {currentPage === 'dashboard' && (
          <DashboardPage />
        )}
        {currentPage === 'about' && (
          <AboutPage />
        )}
        {currentPage === 'privacy' && (
          <PrivacyPage />
        )}
        {currentPage === 'accessibility' && (
          <AccessibilityPage />
        )}
      </main>

      {/* Floating Darb AI Assistant */}
      <DarbAIChat />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav currentPage={currentPage} onNavigate={navigateTo} />

      {/* Universal UAE Footer */}
      <Footer onNavigate={navigateTo} />

    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <ClimateProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </AccessibilityProvider>
      </ClimateProvider>
    </LanguageProvider>
  );
}

export default App;
