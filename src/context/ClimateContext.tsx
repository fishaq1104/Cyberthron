import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClimateData } from '../types';
import { fetchClimate, fallbackClimate } from '../services/api';

interface ClimateContextType {
  climate: ClimateData;
  isLoading: boolean;
  error: string | null;
  refreshClimate: () => Promise<void>;
  simulateHotWeather: (isExtreme: boolean) => void;
}

const ClimateContext = createContext<ClimateContextType | undefined>(undefined);

export const ClimateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [climate, setClimate] = useState<ClimateData>(fallbackClimate);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchClimate();
      setClimate(data);
      setError(null);
    } catch (err: any) {
      setError('Climate data temporarily unavailable from live network');
      setClimate(fallbackClimate);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateHotWeather = (isExtreme: boolean) => {
    setClimate(prev => ({
      ...prev,
      temperature: isExtreme ? 42 : 29,
      apparentTemperature: isExtreme ? 46 : 31,
      heatIndex: isExtreme ? 46 : 31,
      uvIndex: isExtreme ? 10 : 4,
      alerts: {
        ...prev.alerts,
        isExtremeHeat: isExtreme
      }
    }));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ClimateContext.Provider value={{ climate, isLoading, error, refreshClimate: loadData, simulateHotWeather }}>
      {children}
    </ClimateContext.Provider>
  );
};

export const useClimate = () => {
  const context = useContext(ClimateContext);
  if (!context) {
    throw new Error('useClimate must be used within a ClimateProvider');
  }
  return context;
};
