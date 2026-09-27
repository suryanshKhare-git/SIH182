'use client';

import React from 'react';
import { CrossChainTracker } from '@/components/crosschain/CrossChainTracker';
import { Globe, ArrowRightLeft } from 'lucide-react';
import { useInvestigation } from '@/context/InvestigationContext';

export default function CrossChainPage() {
  const { currentCase } = useInvestigation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
              Cross-Chain Intelligence & Bridge Tracing
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              MULTI-CHAIN SURVEILLANCE
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Follow suspect funds across Ethereum, Bitcoin, Polygon, and BNB Chain. Trace cross-chain bridge transitions, liquidity swaps, and connected VASP endpoints.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700">
          <span className="text-slate-400">Target Dossier:</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{currentCase.id}</span>
          <span className="text-slate-400">({currentCase.network})</span>
        </div>
      </div>

      <CrossChainTracker showTitle={true} />

      <div className="p-4 rounded-lg bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-blue-600 text-white shrink-0">
            <ArrowRightLeft className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-slate-100">
              Cross-Chain Bridge Laundering Typology (FATF Typologies Report)
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
              Illicit entities frequently hop across EVM and non-EVM chains using decentralized bridges to break traditional single-chain heuristics. ChainTrace matches sender/recipient signatures, timestamp windows, and volume amounts to attribute the cross-chain destination to the nearest VASP.
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-900/60">
            Analytical Proximity Score
          </span>
        </div>
      </div>
    </div>
  );
}
