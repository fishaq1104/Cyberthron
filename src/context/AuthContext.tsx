import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  role: 'USER' | 'ADMIN' | 'GOVERNMENT' | 'CORPORATE';
  token: string | null;
  loginAs: (role: 'USER' | 'GOVERNMENT' | 'CORPORATE') => void;
  logout: () => void;
}

const DEMO_PROFILES: Record<string, UserProfile> = {
  USER: {
    id: 'user-001',
    name: 'Fatima Al Mansoori',
    email: 'resident@darbalistidama.ae',
    role: 'USER',
    greenPoints: 1280,
    streakDays: 7
  },
  GOVERNMENT: {
    id: 'gov-001',
    name: 'Eng. Rashid Al Nuaimi',
    email: 'dmt.planner@abudhabi.gov.ae',
    role: 'GOVERNMENT',
    organization: 'Abu Dhabi Department of Municipalities and Transport (DMT)',
    greenPoints: 2450,
    streakDays: 14
  },
  CORPORATE: {
    id: 'corp-001',
    name: 'Sara Al Zaabi',
    email: 'hr.sustainability@adgm-demo.ae',
    role: 'CORPORATE',
    organization: 'Abu Dhabi Global Market Corp Partner',
    greenPoints: 1980,
    streakDays: 10
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEMO_PROFILES.USER);
  const [token, setToken] = useState<string | null>('demo_jwt_token_2026');

  const loginAs = (roleType: 'USER' | 'GOVERNMENT' | 'CORPORATE') => {
    setUser(DEMO_PROFILES[roleType]);
    setToken(`demo_jwt_token_${roleType.toLowerCase()}`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'USER',
        token,
        loginAs,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
