'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  Search,
  GitFork,
  Building2,
  ShieldAlert,
  FileCheck2,
  FileText,
  BookmarkCheck,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  UserCheck,
  Globe,
  LogOut
} from 'lucide-react';
import { useInvestigation } from '@/context/InvestigationContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Investigations', href: '/investigations', icon: FolderGit2 },
  { name: 'Wallet Explorer', href: '/wallet-explorer', icon: Search },
  { name: 'Transaction Paths', href: '/transaction-paths', icon: GitFork },
  { name: 'Cross-Chain Tracking', href: '/cross-chain', icon: Globe },
  { name: 'VASP Intelligence', href: '/vasp-intelligence', icon: Building2 },
  { name: 'Risk Analysis', href: '/risk-analysis', icon: ShieldAlert },
  { name: 'Evidence', href: '/evidence', icon: FileCheck2 },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Watchlist', href: '/watchlist', icon: BookmarkCheck },
  { name: 'API Monitor', href: '/api-monitor', icon: Activity },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { currentCase } = useInvestigation();
  const { user, logout } = useAuth();

  return (
    <aside
      className={cn(
        'print:hidden border-r transition-all duration-300 flex flex-col justify-between shrink-0 select-none z-30',
        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Header */}
        <div
          className={cn(
            'h-14 flex items-center border-b border-slate-200 dark:border-slate-800 shrink-0',
            collapsed ? 'justify-center px-1 relative' : 'justify-between px-3'
          )}
        >
          {collapsed ? (
            <div className="flex items-center justify-center relative w-full">
              <Link href="/" title="ChainTrace Dashboard" className="flex items-center justify-center">
                <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs hover:bg-blue-700 transition-colors">
                  <Shield className="w-4 h-4" />
                </div>
              </Link>
              <button
                onClick={() => setCollapsed(false)}
                aria-label="Expand sidebar"
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 z-30 transition-colors shadow-xs"
                title="Expand sidebar"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <>
              <Link href="/" className="flex items-center gap-2.5 overflow-hidden group">
                <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs group-hover:bg-blue-700 transition-colors">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-mono">
                    CHAINTRACE
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tight">
                    Blockchain Intelligence
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setCollapsed(true)}
                aria-label="Collapse sidebar"
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Active Case Badge (if not collapsed) */}
        {!collapsed && currentCase && (
          <div className="mx-3 mt-3 p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shrink-0">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">{currentCase.id}</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold uppercase text-[9px]">
                {currentCase.status}
              </span>
            </div>
            <div
              className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate"
              title={currentCase.title}
            >
              {currentCase.title}
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              <span>
                Nearest: <strong className="text-slate-700 dark:text-slate-300">{currentCase.nearestVasp}</strong>
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{currentCase.confidence}%</span>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <nav className="p-2 space-y-0.5 mt-1 overflow-y-auto flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.name : undefined}
                className={cn(
                  'flex items-center gap-3 px-2.5 py-2 rounded-md text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/70 dark:border-blue-900/60'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                )}
              >
                <Icon
                  className={cn(
                    'w-4 h-4 shrink-0',
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                  )}
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom of Sidebar */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
        {!collapsed ? (
          <div className="space-y-3">
            {/* System Status */}
            <div className="p-2 rounded bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                System Status
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>All systems operational</span>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {user?.name || 'Inv. S. Khare'}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                    {user?.id || 'DEMO-26182'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                title="Logout / End Session"
                className="p-1.5 rounded-md hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors shrink-0 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer" title="System Status: All systems operational">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="w-7 h-7 rounded-full bg-blue-600 hover:bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer transition-colors"
              title={`${user?.name || 'Inv. S. Khare'} (${user?.id || 'DEMO-26182'}) · Click to Logout`}
            >
              <UserCheck className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
