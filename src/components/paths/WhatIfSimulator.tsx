'use client';

import React from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { Sliders, RefreshCw, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export function WhatIfSimulator() {
  const { whatIfFilters, setWhatIfFilters, analysisResult } = useInvestigation();

  const handleHopChange = (hops: number) => {
    setWhatIfFilters((prev) => ({ ...prev, maxHops: hops }));
  };

  const handleMinValueChange = (val: number) => {
    setWhatIfFilters((prev) => ({ ...prev, minValueUsd: val }));
  };

  const handleReset = () => {
    setWhatIfFilters({
      maxHops: 3,
      minValueUsd: 0,
      startDate: '',
      endDate: ''
    });
  };

  const totalVaspsAvailable = analysisResult ? analysisResult.vaspConnections.length : 3;
  const filteredVaspsCount = analysisResult
    ? analysisResult.vaspConnections.filter(
        (v) => v.hopDistance <= whatIfFilters.maxHops && v.volumeUsd >= whatIfFilters.minValueUsd
      ).length
    : 2;

  const totalSimulatedVolume = analysisResult
    ? analysisResult.vaspConnections
        .filter((v) => v.hopDistance <= whatIfFilters.maxHops && v.volumeUsd >= whatIfFilters.minValueUsd)
        .reduce((acc, curr) => acc + curr.volumeUsd, 0)
    : 1420000;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Dynamic "What-If" Multi-Hop Simulator
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
              EXPLORATORY REASONING
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Test counterfactual hypotheses by modifying hop depth thresholds, minimum capital thresholds, and time windows.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-mono"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Parameters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">
              MAXIMUM HOP RADIUS
            </span>
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {whatIfFilters.maxHops} {whatIfFilters.maxHops === 1 ? 'Hop' : 'Hops'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((hop) => (
              <button
                key={hop}
                onClick={() => handleHopChange(hop)}
                className={`flex-1 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                  whatIfFilters.maxHops === hop
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600'
                }`}
              >
                {hop}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Higher hops reveal distant laundering endpoints; 1-2 hops isolate direct counterparties.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">
              MINIMUM TX VALUE
            </span>
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
              {whatIfFilters.minValueUsd === 0 ? 'No Threshold' : `≥ ${formatCurrency(whatIfFilters.minValueUsd)}`}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[
              { label: '$0', val: 0 },
              { label: '$5k', val: 5000 },
              { label: '$25k', val: 25000 },
              { label: '$100k', val: 100000 }
            ].map((preset) => (
              <button
                key={preset.val}
                onClick={() => handleMinValueChange(preset.val)}
                className={`py-1.5 rounded text-xs font-mono font-medium transition-all ${
                  whatIfFilters.minValueUsd === preset.val
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'bg-white dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Filters out dust transfers and micro-peels to isolate primary capital flows.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-blue-900 dark:text-blue-300 font-bold mb-1">
              <span>HYPOTHETICAL ATTRIBUTIONS</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-200 dark:bg-blue-900 text-[10px]">
                LIVE RE-CALC
              </span>
            </div>
            <div className="text-xl font-bold font-mono text-blue-900 dark:text-blue-100 mt-1">
              {filteredVaspsCount} of {totalVaspsAvailable} VASPs Connected
            </div>
            <div className="text-xs font-mono text-blue-700 dark:text-blue-300 mt-0.5">
              Cumulative Attributable Volume: {formatCurrency(totalSimulatedVolume)}
            </div>
          </div>

          <div className="text-[11px] text-blue-800/80 dark:text-blue-300/80 mt-2 pt-2 border-t border-blue-200/60 dark:border-blue-900/60 flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Graph topology and attribution tables adjust dynamically</span>
          </div>
        </div>
      </div>
    </div>
  );
}
