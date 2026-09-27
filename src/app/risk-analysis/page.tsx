'use client';

import React from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { RiskSignalBreakdown } from '@/components/risk/RiskSignalBreakdown';
import { WalletOverviewCard } from '@/components/investigation/WalletOverviewCard';

export default function RiskAnalysisPage() {
  const { analysisResult, currentCase } = useInvestigation();

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
            Explainable Risk & Compliance Signals
          </h1>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
            TRANSPARENT FORENSICS
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Dissected forensic risk signals, FATF Travel Rule red flags, and judicial preservation guidelines.
        </p>
      </div>

      <WalletOverviewCard caseData={currentCase} />

      {analysisResult && (
        <RiskSignalBreakdown riskProfile={analysisResult.riskProfile} />
      )}
    </div>
  );
}
