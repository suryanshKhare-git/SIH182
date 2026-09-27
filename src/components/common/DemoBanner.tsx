'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function DemoBanner() {
  return (
    <div className="print:hidden bg-slate-900 border-b border-slate-800 text-xs px-3 sm:px-4 py-1.5 flex items-center justify-between text-slate-300">
      <div className="flex items-center gap-2 shrink-0">
        <span className="flex h-2 w-2 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold tracking-wide text-sky-400 font-mono text-[11px] sm:text-xs shrink-0">DEMO ENVIRONMENT</span>
        <span className="text-slate-500 shrink-0">|</span>
        <span className="text-slate-300 hidden sm:inline text-xs truncate">
          Simulated Blockchain Intelligence & VASP Attribution Engine (SIH PS-26182)
        </span>
        <span className="text-amber-400 font-mono text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 hidden md:inline shrink-0">
          Analytical Signals Require Investigator Verification
        </span>
      </div>
      <div className="flex items-center gap-3 text-slate-400 shrink-0">
        <span className="hidden lg:inline text-[11px] font-mono">FATF Rec. 16 Compliant Parser</span>
        <span className="text-slate-600 hidden lg:inline">•</span>
        <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px] shrink-0">
          <CheckCircle2 className="w-3 h-3 shrink-0" /> 6 APIs Operational
        </span>
      </div>
    </div>
  );
}
