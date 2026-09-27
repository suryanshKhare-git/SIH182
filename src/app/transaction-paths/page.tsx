'use client';

import React, { useState } from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { PathVisualizer } from '@/components/paths/PathVisualizer';
import { PathComparisonModal } from '@/components/paths/PathComparisonModal';
import { WhatIfSimulator } from '@/components/paths/WhatIfSimulator';
import { GitCompare } from 'lucide-react';

export default function TransactionPathsPage() {
  const { analysisResult, currentCase, runAnalysis } = useInvestigation();
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
              Transaction Path Explorer
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              MULTI-HOP LINEAGE
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Trace fund dispersion hops through peeling chains, mixer proxies, and intermediary relays to identified VASPs.
          </p>
        </div>

        {analysisResult && analysisResult.paths.length >= 2 && (
          <button
            onClick={() => setShowComparison(true)}
            className="px-3 py-1.5 rounded text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 flex items-center gap-2 shadow-xs transition-colors font-mono"
          >
            <GitCompare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Compare Pathways Side-by-Side</span>
          </button>
        )}
      </div>

      <WhatIfSimulator />

      {analysisResult && (
        <PathVisualizer
          paths={analysisResult.paths}
          onSelectWallet={(addr) => runAnalysis(addr, currentCase.network)}
        />
      )}

      {analysisResult && (
        <PathComparisonModal
          paths={analysisResult.paths}
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
}
