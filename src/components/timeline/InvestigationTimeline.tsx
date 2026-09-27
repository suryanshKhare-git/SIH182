'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Building2,
  Coins,
  Layers
} from 'lucide-react';
import { formatCurrency, formatTxHash } from '@/utils/formatters';

interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'genesis' | 'major_tx' | 'intermediary' | 'vasp_deposit' | 'latest_activity';
  title: string;
  description: string;
  valueUsd?: number;
  txHash?: string;
  actorAddress?: string;
  vaspEntity?: string;
}

const SAMPLE_TIMELINE: TimelineEvent[] = [
  {
    id: 'evt-1',
    timestamp: '2026-08-12 04:12 UTC',
    type: 'genesis',
    title: 'Wallet First Observed on Chain',
    description: 'Initial funding transaction originating from unclustered mining pool address. Genesis balance 0.25 ETH.',
    actorAddress: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
    txHash: '0xaa12893847291039847102938471920384719203948102938471920384710293'
  },
  {
    id: 'evt-2',
    timestamp: '2026-08-18 19:44 UTC',
    type: 'major_tx',
    title: 'High-Value Extortion Inflow Observed',
    description: 'Victim treasury wallet completed automated ransom disbursement in single transaction tranche.',
    valueUsd: 1425000,
    actorAddress: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
    txHash: '0xbb29384719203847192038471920384719203847192038471920384719203847'
  },
  {
    id: 'evt-3',
    timestamp: '2026-08-19 02:10 UTC',
    type: 'intermediary',
    title: 'Dispersal to Peeling Intermediary Relays',
    description: 'Target wallet partitioned funds across 3 rapid intermediary relays within 14 blocks.',
    valueUsd: 840000,
    actorAddress: '0x3f9821049281a948210382947192837192839211',
    txHash: '0xcc39481029384710293847102938471029384710293847102938471029384710'
  },
  {
    id: 'evt-4',
    timestamp: '2026-09-24 11:32 UTC',
    type: 'vasp_deposit',
    title: 'Direct Inflow to Binance Global Cluster',
    description: 'Intermediary Relay 0x3f9 executed confirmed batch deposit into Binance Hot Wallet 6.',
    valueUsd: 412000,
    vaspEntity: 'Binance Global Hot Wallet 6',
    txHash: '0xdd49582039481029384710293847102938471029384710293847102938471029'
  },
  {
    id: 'evt-5',
    timestamp: '2026-09-26 14:15 UTC',
    type: 'latest_activity',
    title: 'Residual Liquidity Shift Observed',
    description: 'Remaining unspent balance forwarded to secondary custodian deposit sweep.',
    valueUsd: 142580,
    vaspEntity: 'Kraken Exchange Internal Sweep',
    txHash: '0xee59683049582039481029384710293847102938471029384710293847102938'
  }
];

export function InvestigationTimeline() {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents =
    filterType === 'all'
      ? SAMPLE_TIMELINE
      : SAMPLE_TIMELINE.filter((e) => e.type === filterType);

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'genesis':
        return {
          icon: Calendar,
          color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900',
          label: 'FIRST OBSERVED'
        };
      case 'major_tx':
        return {
          icon: Coins,
          color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900',
          label: 'MAJOR CAPITAL TRANSFER'
        };
      case 'intermediary':
        return {
          icon: Layers,
          color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900',
          label: 'NEW INTERMEDIARY'
        };
      case 'vasp_deposit':
        return {
          icon: Building2,
          color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900',
          label: 'VASP INTERACTION'
        };
      case 'latest_activity':
      default:
        return {
          icon: Clock,
          color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900',
          label: 'LATEST ACTIVITY'
        };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Chronological Forensic Investigation Timeline
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {filteredEvents.length} Key Milestones
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Temporal reconstruction of wallet lifecycle from creation to nearest VASP deposit liquidation.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-slate-400 text-[10px] uppercase">Filter:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium cursor-pointer"
          >
            <option value="all">All Milestones</option>
            <option value="genesis">First Observed</option>
            <option value="major_tx">Major Transactions</option>
            <option value="intermediary">New Intermediaries</option>
            <option value="vasp_deposit">VASP Interactions</option>
            <option value="latest_activity">Latest Activity</option>
          </select>
        </div>
      </div>

      <div className="p-6 relative">
        <div className="absolute left-9 top-8 bottom-8 w-0.5 bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-6">
          {filteredEvents.map((evt) => {
            const badge = getEventBadge(evt.type);
            const Icon = badge.icon;

            return (
              <div key={evt.id} className="relative flex items-start gap-5">
                <div
                  className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 z-10 ${badge.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 mb-2 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                        {evt.title}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {evt.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {evt.valueUsd && (
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        Value: {formatCurrency(evt.valueUsd)}
                      </span>
                    )}
                    {evt.vaspEntity && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        VASP: {evt.vaspEntity}
                      </span>
                    )}
                    {evt.txHash && (
                      <span className="text-slate-400">Tx: {formatTxHash(evt.txHash)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
