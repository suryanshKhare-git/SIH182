'use client';

import React from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { ShieldAlert, Building2, Network, FolderGit2 } from 'lucide-react';

export function StatCards() {
  const { allCases, analysisResult } = useInvestigation();

  const activeCasesCount = allCases.length;
  const walletsCount = 384;
  const vaspCount = analysisResult ? analysisResult.vaspConnections.length : 5;
  const highRiskAlerts = 14;

  const stats = [
    {
      title: 'Active Investigations',
      value: activeCasesCount.toString(),
      subtext: '4 High priority LE dossiers',
      icon: FolderGit2,
      trend: '+2 this week',
      accentColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Wallets Analyzed',
      value: walletsCount.toLocaleString(),
      subtext: 'Across 4 indexed blockchains',
      icon: Network,
      trend: '1,280 hops indexed',
      accentColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10'
    },
    {
      title: 'VASP Connections Found',
      value: (vaspCount * 28 + 14).toString(),
      subtext: 'Attributed custodial entities',
      icon: Building2,
      trend: 'Avg 2.1 hops distance',
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'High-Risk Signals',
      value: highRiskAlerts.toString(),
      subtext: 'Requires investigator verification',
      icon: ShieldAlert,
      trend: '3 mixer interactions',
      accentColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {stat.title}
              </span>
              <div className={`p-2 rounded-md ${stat.bgColor} ${stat.accentColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-slate-100">
                {stat.value}
              </span>
              <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                {stat.trend}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              {stat.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
