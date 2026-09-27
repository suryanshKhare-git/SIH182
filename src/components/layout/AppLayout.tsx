'use client';
import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DemoBanner } from '../common/DemoBanner';
export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <DemoBanner />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/70 dark:bg-slate-950">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
