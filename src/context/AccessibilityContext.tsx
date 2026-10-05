import React, { createContext, useContext, useState } from 'react';
import { AccessibilityPreferences } from '../types';

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  isAccessibilityActive: boolean;
  togglePreference: (key: keyof AccessibilityPreferences) => void;
  resetPreferences: () => void;
  setAllAccessible: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  wheelchair: false,
  avoidStairs: false,
  stepFree: false,
  strollerFriendly: false,
  elderFriendly: false,
  reducedWalking: false,
  visualAssist: false,
  hearingAssist: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultPreferences);

  const togglePreference = (key: keyof AccessibilityPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  const setAllAccessible = () => {
    setPreferences({
      wheelchair: true,
      avoidStairs: true,
      stepFree: true,
      strollerFriendly: true,
      elderFriendly: true,
      reducedWalking: true,
      visualAssist: false,
      hearingAssist: false,
    });
  };

  const isAccessibilityActive = Object.values(preferences).some(Boolean);

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        isAccessibilityActive,
        togglePreference,
        resetPreferences,
        setAllAccessible
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
