'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserSession {
  id: string;
  name: string;
  badge: string;
  role: string;
  unit: string;
  clearance: string;
  loginTime: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: UserSession | null;
  login: (id: string, pin: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'chaintrace_auth_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.id) {
          setUser(parsed);
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      console.error('Failed to parse auth session from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = (idInput: string, pinInput: string) => {
    const cleanId = (idInput || '').trim().toUpperCase();
    const cleanPin = (pinInput || '').trim();

    // Required demo credentials: ID: DEMO-26182, PIN: 123456
    if (cleanId === 'DEMO-26182' && cleanPin === '123456') {
      const sessionData: UserSession = {
        id: 'DEMO-26182',
        name: 'Inv. S. Khare',
        badge: 'NCF-842',
        role: 'Lead Blockchain Forensics Investigator',
        unit: 'Cyber Forensics Unit #842',
        clearance: 'Level 4 Special Access',
        loginTime: new Date().toISOString()
      };

      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      } catch (e) {
        console.error('Failed to save auth session', e);
      }

      setUser(sessionData);
      setIsAuthenticated(true);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid Investigator ID or PIN.'
    };
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove auth session', e);
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
