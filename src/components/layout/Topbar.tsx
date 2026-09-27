'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useInvestigation } from '@/context/InvestigationContext';
import { useAuth } from '@/context/AuthContext';
import { Network } from '@/types/investigation';
import {
  Search,
  Sun,
  Moon,
  Bookmark,
  Bell,
  ShieldCheck,
  ChevronDown,
  FolderOpen,
  LogOut
} from 'lucide-react';

export function Topbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const {
    currentCase,
    allCases,
    loadCase,
    selectedNetwork,
    setSelectedNetwork,
    runAnalysis,
    bookmarks
  } = useInvestigation();

  const [searchVal, setSearchVal] = useState('');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showCaseSelector, setShowCaseSelector] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const networks: Network[] = ['Ethereum', 'Bitcoin', 'Polygon', 'BNB Chain'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      runAnalysis(searchVal.trim(), selectedNetwork);
      setSearchVal('');
    }
  };

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 z-20 select-none">
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono shrink-0">
          <span className="text-slate-400 dark:text-slate-500 font-medium shrink-0">CASE:</span>
          <div className="relative shrink-0">
            <button
              onClick={() => setShowCaseSelector(!showCaseSelector)}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-bold border border-slate-300/60 dark:border-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <FolderOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>{currentCase.id}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {showCaseSelector && (
              <div className="absolute left-0 mt-1 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-1.5 z-50">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1">
                  Active Investigation Dossiers
                </div>
                {allCases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      loadCase(c.id);
                      setShowCaseSelector(false);
                    }}
                    className={`w-full text-left p-2 rounded text-xs transition-colors flex flex-col gap-0.5 ${
                      c.id === currentCase.id
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold">{c.id}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {c.network}
                      </span>
                    </div>
                    <span className="text-[11px] truncate text-slate-500 dark:text-slate-400">{c.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <span className="hidden xl:inline text-slate-300 dark:text-slate-700">/</span>
        <span className="hidden xl:inline text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs font-medium">
          {currentCase.title}
        </span>
      </div>

      <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-sm xl:max-w-md items-center mx-2">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search address, tx hash, or entity label..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono transition-all"
          />
        </div>
      </form>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
        <div className="relative shrink-0">
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value as Network)}
            className="appearance-none text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 py-1.5 pl-2.5 pr-7 rounded border border-slate-300/60 dark:border-slate-700 focus:outline-none cursor-pointer transition-colors shrink-0"
          >
            {networks.map((net) => (
              <option key={net} value={net} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                {net}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative transition-colors"
            title="Investigation Bookmarks"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </button>

          {showBookmarks && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-2.5 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Bookmarked Intelligence
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{bookmarks.length} pinned</span>
              </div>
              {bookmarks.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No bookmarks pinned yet. Click bookmark icons in tables & graph to pin targets.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {bookmarks.map((bm) => (
                    <div
                      key={bm.id}
                      className="p-2 rounded bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{bm.title}</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-mono">
                          {bm.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{bm.subtitle}</p>
                      <div className="mt-1 text-[9px] text-slate-400 font-mono">{bm.timestamp}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shrink-0"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600 hover:text-slate-900" />
          )}
        </button>

        <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-0.5 sm:mx-1 shrink-0" />

        <div className="relative shrink-0">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-0.5 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Investigator Profile & Security Actions"
          >
            <div className="w-7 h-7 rounded-full bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="hidden xl:block text-left text-xs leading-none">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {user?.name || 'INV. S. KHARE'}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {user?.id || 'DEMO-26182'}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-3 z-50 animate-in fade-in duration-150">
              <div className="pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {user?.name || 'Inv. S. Khare'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  ID: <span className="font-semibold text-blue-600 dark:text-blue-400">{user?.id || 'DEMO-26182'}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {user?.role || 'Lead Blockchain Forensics Investigator'}
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Session Active · Level 4</span>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                    router.push('/');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded text-xs font-mono font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
