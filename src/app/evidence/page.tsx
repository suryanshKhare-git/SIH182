'use client';

import React from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { EvidenceChainView } from '@/components/evidence/EvidenceChainView';
import { WalletOverviewCard } from '@/components/investigation/WalletOverviewCard';

export default function EvidencePage() {
  const { analysisResult, currentCase } = useInvestigation();

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
            Evidence Chain of Custody & On-Chain Proofs
          </h1>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            CHAIN OF CUSTODY VERIFIED
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Auditable cryptographic evidence items, transaction hashes, timing correlations, and multi-hop receipts.
        </p>
      </div>

      <WalletOverviewCard caseData={currentCase} />

      {analysisResult && (
        <EvidenceChainView
          evidenceList={analysisResult.evidenceList}
          title={`Forensic Evidence Ledger for Case ${currentCase.id}`}
          confidenceScore={currentCase.confidence}
        />
      )}
    </div>
  );
}
