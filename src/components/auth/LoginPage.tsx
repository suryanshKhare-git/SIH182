'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Shield,
  Lock,
  UserCheck,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  KeyRound,
  Sun,
  Moon,
  CheckCircle2,
  FileCode2
} from 'lucide-react';

export function LoginPage() {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [investigatorId, setInvestigatorId] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = login(investigatorId, pin);
    if (!result.success) {
      setErrorMessage(result.error || 'Invalid Investigator ID or PIN.');
      setIsSubmitting(false);
    } else {
      router.push('/');
    }
  };

  const handleUseDemoCredentials = () => {
    setInvestigatorId('DEMO-26182');
    setPin('123456');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors select-none">
      {/* Top Utility Bar */}
      <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold text-xs tracking-wider text-slate-900 dark:text-slate-100 font-mono">
            CHAINTRACE
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
            SIH PS-26182
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Auth Gateway Operational</span>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </header>

      {/* Center Login Box */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-6 sm:p-8 space-y-6 transition-colors">
          {/* Brand & Titles */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Shield className="w-6 h-6" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                ChainTrace
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Blockchain Intelligence & Investigation Platform
              </p>
            </div>

            {/* Demo Environment Badge & Label */}
            <div className="pt-1 flex flex-col items-center gap-1">
              <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                DEMO ENVIRONMENT
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Demo authentication for presentation purposes.
              </span>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field 1: Investigator ID */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                Investigator ID
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="DEMO-26182"
                  value={investigatorId}
                  onChange={(e) => {
                    setInvestigatorId(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors uppercase"
                />
              </div>
            </div>

            {/* Field 2: PIN */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                  PIN
                </label>
                <span className="text-[10px] text-slate-400 font-mono">6-Digit Security Code</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  maxLength={6}
                  placeholder="••••••"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full pl-9 pr-10 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="p-1 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title={showPin ? 'Hide PIN' : 'Show PIN'}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <span>SIGN IN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Banner */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                  Demo Presentation Credentials
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  READY
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">ID: </span>
                  <strong className="text-slate-800 dark:text-slate-200">DEMO-26182</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">PIN: </span>
                  <strong className="text-slate-800 dark:text-slate-200">123456</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleUseDemoCredentials}
                className="w-full mt-1 py-1.5 px-3 rounded text-xs font-mono font-semibold bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-blue-700 dark:text-blue-300 border border-slate-300/80 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Use Demo Credentials</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Login Footer */}
      <footer className="py-4 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] font-mono text-slate-400 bg-white/50 dark:bg-slate-900/50">
        <span>Authorized Law Enforcement & Compliance Access Only · PS-26182 · Smart India Hackathon</span>
      </footer>
    </div>
  );
}
