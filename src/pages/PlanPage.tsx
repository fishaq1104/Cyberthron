import React, { useState, useEffect } from 'react';
import { RoutePlanner } from '../components/planner/RoutePlanner';
import { RouteOptionCard } from '../components/planner/RouteOptionCard';
import { TurnByTurnList } from '../components/planner/TurnByTurnList';
import { AccessibilityPanel } from '../components/planner/AccessibilityPanel';
import { ClimateIntelligenceCard } from '../components/planner/ClimateIntelligenceCard';
import { MapView } from '../components/map/MapView';
import { HeatAlert } from '../components/common/HeatAlert';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { calculateRoutes } from '../services/api';
import { RouteOption, TransportMode } from '../types';
import { Sparkles, MapPin, Navigation, Info } from 'lucide-react';

interface PlanPageProps {
  demoTriggerCount: number;
}

export const PlanPage: React.FC<PlanPageProps> = ({ demoTriggerCount }) => {
  const { lang, t } = useLanguage();
  const { preferences } = useAccessibility();
  const isAr = lang === 'ar';

  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-coolest');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentOrigin, setCurrentOrigin] = useState<string>('Al Reem Island');
  const [currentDestination, setCurrentDestination] = useState<string>('Abu Dhabi Corniche');
  const [routeError, setRouteError] = useState<string | null>(null);

  const executeRouting = async (from: string, to: string, mode: TransportMode) => {
    setIsLoading(true);
    setRouteError(null);
    setCurrentOrigin(from);
    setCurrentDestination(to);
    try {
      const calculated = await calculateRoutes(from, to, mode, preferences);
      setRoutes(calculated);
      if (calculated.length > 0) {
        setSelectedRouteId(calculated[0].id);
      } else {
        setRouteError(isAr ? 'تعذر حساب المسار. حاول مرة أخرى.' : 'The route could not be calculated. Please try again.');
      }
    } catch (error) {
      console.error('Route calculation failed:', error);
      setRoutes([]);
      setRouteError(isAr ? 'تعذر الاتصال بخدمة التوجيه.' : 'Unable to calculate the route. Check the server and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Run initial route calculation for default Abu Dhabi corridor on mount
  useEffect(() => {
    executeRouting('Al Reem Island', 'Abu Dhabi Corniche', 'walk');
  }, [preferences, demoTriggerCount]);

  const activeRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-[#065F46] uppercase tracking-widest">
            {isAr ? 'محرك التوجيه الذكي المتكيف مع المناخ' : 'Abu Dhabi Climate Navigation Engine'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#022C22]">
          {t.planner.title}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
          {t.planner.subtitle}
        </p>
      </div>

      {/* Extreme Heat Advisory Banner */}
      <HeatAlert />

      {/* Main Grid: Left Controls & Right Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 Cols): Route Inputs & Accessibility */}
        <div className="lg:col-span-5 space-y-6">
          <RoutePlanner
            onCalculate={(from, to, mode) => executeRouting(from, to, mode)}
            isLoading={isLoading}
            onSetDemoScenario={() => executeRouting('Al Reem Island', 'Abu Dhabi Corniche', 'walk')}
          />
          {routeError && (
            <div
              role="alert"
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800"
            >
              {routeError}
            </div>
          )}

          <AccessibilityPanel />
        </div>

        {/* Right Column (7 Cols): Interactive Map */}
        <div className="lg:col-span-7 space-y-6">
          <MapView
            selectedRoute={activeRoute}
            heightClass="h-[480px] lg:h-[560px]"
          />
        </div>

      </div>

      {/* Route Options Comparison Section */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              {isAr ? 'خيارات المسارات المتكيفة مناخياً' : 'Climate-Adaptive Route Options'}
            </h3>
            <p className="text-xs text-slate-500">
              {currentOrigin} ➔ {currentDestination}
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            🌱 Multi-Modal Sustainability Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map(r => (
            <RouteOptionCard
              key={r.id}
              route={r}
              isSelected={r.id === selectedRouteId}
              onSelect={() => setSelectedRouteId(r.id)}
            />
          ))}
        </div>
      </div>

      {/* Turn-by-Turn Guidance & Climate Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          {activeRoute && (
            <TurnByTurnList
              steps={activeRoute.steps}
              routeName={activeRoute.name}
            />
          )}
        </div>

        <div className="lg:col-span-5">
          <ClimateIntelligenceCard />
        </div>
      </div>

    </div>
  );
};
