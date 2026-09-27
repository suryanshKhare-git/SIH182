'use client';

import React from 'react';
import { WatchlistManager } from '@/components/watchlist/WatchlistManager';
import { Radio } from 'lucide-react';

export default function WatchlistPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
              Surveillance Watchlist & Real-Time Alerts
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              ACTIVE MONITORING
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Maintain active surveillance on flagged wallets, monitor transaction deltas, and automatically recalculate nearest VASP hops.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-900/60">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Mempool Daemon Listening</span>
        </div>
      </div>

      <WatchlistManager />
    </div>
  );
}
