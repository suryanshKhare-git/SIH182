'use client';

import React, { useState } from 'react';
import { RiskProfile } from '@/types/risk';
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info,
  CheckCircle2,
  FileSearch,
  Scale,
  Activity
} from 'lucide-react';
import { getRiskLevelBadge } from '@/utils/formatters';

interface RiskSignalBreakdownProps {
  riskProfile: RiskProfile;
}

export function RiskSignalBreakdown({ riskProfile }: RiskSignalBreakdownProps) {
  const [expandedSignalId, setExpandedSignalId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedSignalId(expandedSignalId === id ? null : id);
  };

  const getSignalBadge = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      case 'low':
      case 'negligible':
      default:
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
    }
  };

  const overallBadge = getRiskLevelBadge(riskProfile.overallLevel);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Explainable Risk Signal Breakdown
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              METHODOLOGY {riskProfile.methodologyVersion}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Individual behavioral and on-chain indicators evaluated independently without black-box scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Composite Index:</span>
          <span
            className={`px-2.5 py-1 rounded font-mono font-bold text-xs border ${overallBadge.bg} ${overallBadge.text} ${overallBadge.border}`}
          >
            {riskProfile.overallScore}/100 ({riskProfile.overallLevel.toUpperCase()})
          </span>
        </div>
      </div>

      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/30">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-bold text-slate-900 dark:text-slate-100 font-mono uppercase tracking-wide mb-0.5">
              Analytical Signal Summary
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {riskProfile.analyticalSummary}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {riskProfile.signals.map((sig) => {
          const isExpanded = expandedSignalId === sig.id;
          const badgeClass = getSignalBadge(sig.level);

          return (
            <div key={sig.id} className="transition-colors">
              <div
                onClick={() => toggleExpand(sig.id)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/40 select-none"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0 mt-0.5">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                        {sig.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {sig.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {sig.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono shrink-0 sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Observed Metric</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {sig.metricValue}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] border ${badgeClass}`}
                  >
                    {sig.level}
                  </span>

                  <button
                    type="button"
                    className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-medium hover:underline ml-1"
                  >
                    <span>Why am I seeing this?</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 bg-slate-50/60 dark:bg-slate-800/20 text-xs space-y-3 animate-in fade-in-50 duration-150 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-1.5 font-mono font-bold uppercase text-[10px] text-slate-400 mb-1">
                        <FileSearch className="w-3 h-3 text-blue-500" />
                        <span>On-Chain Forensic Observation</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                        {sig.forensicObservation}
                      </p>
                      <div className="mt-2 text-[10px] font-mono text-slate-400">
                        Baseline Comparison: {sig.benchmark}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-1.5 font-mono font-bold uppercase text-[10px] text-slate-400 mb-1">
                        <Scale className="w-3 h-3 text-emerald-500" />
                        <span>Investigator Action Guidance</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                        {sig.investigatorGuidance}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-slate-100/50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <span className="font-mono font-bold uppercase text-[10px] text-slate-400 block mb-1">
            FATF Travel Rule Compliance Flags
          </span>
          <ul className="space-y-1">
            {riskProfile.fatfTravelRuleFlags.map((flag, idx) => (
              <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
                <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="font-mono font-bold uppercase text-[10px] text-slate-400 block mb-1">
            Recommended Law Enforcement Steps
          </span>
          <ul className="space-y-1">
            {riskProfile.recommendedLawEnforcementSteps.map((step, idx) => (
              <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
