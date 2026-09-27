'use client';

import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { useInvestigation } from '@/context/InvestigationContext';

interface Step {
  step: number;
  label: string;
  subtext: string;
}

const STEPS: Step[] = [
  { step: 1, label: 'Wallet Identified', subtext: 'Address validation & chain parsing' },
  { step: 2, label: 'Transactions Retrieved', subtext: 'Ledger topology & mempool logs' },
  { step: 3, label: 'Paths Analyzed', subtext: 'Multi-hop peeling & relay mapping' },
  { step: 4, label: 'VASPs Detected', subtext: 'FATF cluster attribution' },
  { step: 5, label: 'Evidence Generated', subtext: 'Cryptographic proof dossier' }
];

export function InvestigationStepper() {
  const { isAnalyzing, analysisStepIndex } = useInvestigation();
  const currentStep = isAnalyzing ? analysisStepIndex : 5;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-xs transition-colors">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Investigation Lifecycle Progress
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          {currentStep >= 5 ? 'Status: Analysis Complete & Verified' : `Processing Pipeline: Step ${currentStep} of 5`}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {STEPS.map((s) => {
          const isCompleted = currentStep > s.step || (currentStep === 5 && !isAnalyzing);
          const isCurrent = isAnalyzing && currentStep === s.step;

          return (
            <div
              key={s.step}
              className={`p-3 rounded-lg border transition-all ${
                isCurrent
                  ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 shadow-xs'
                  : isCompleted
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                  : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  Step 0{s.step}
                </span>
              </div>

              <div className="font-bold text-xs text-slate-800 dark:text-slate-200 leading-snug">
                {s.label}
              </div>

              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                {s.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
