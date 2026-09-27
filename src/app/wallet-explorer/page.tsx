'use client';

import React, { useState } from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { WalletOverviewCard } from '@/components/investigation/WalletOverviewCard';
import { TransactionLedger } from '@/components/wallet/TransactionLedger';
import { VaspAttributionTable } from '@/components/vasp/VaspAttributionTable';
import { RiskSignalBreakdown } from '@/components/risk/RiskSignalBreakdown';
import { InvestigationTimeline } from '@/components/timeline/InvestigationTimeline';
import { EvidenceChainView } from '@/components/evidence/EvidenceChainView';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { Network } from '@/types/investigation';

export default function WalletExplorerPage() {
  const { currentCase, analysisResult, runAnalysis, isAnalyzing, selectedNetwork, setSelectedNetwork } =
    useInvestigation();

  const [inputAddress, setInputAddress] = useState(currentCase.targetWallet);
  const [activeTab, setActiveTab] = useState<'transactions' | 'vasp' | 'risk' | 'timeline' | 'evidence'>('transactions');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAddress.trim() && !isAnalyzing) {
      runAnalysis(inputAddress.trim(), selectedNetwork);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
          Wallet Intelligence Explorer
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Deep-dive analysis on subject wallets, counterparty clusters, transaction ledgers, and VASP links.
        </p>
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="w-full sm:w-44 shrink-0">
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value as Network)}
              disabled={isAnalyzing}
              className="w-full h-10 px-3 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Ethereum">Ethereum</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Polygon">Polygon</option>
              <option value="BNB Chain">BNB Chain</option>
            </select>
          </div>

          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by wallet address, tx hash, VASP name, or cluster label..."
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              disabled={isAnalyzing}
              className="w-full h-10 pl-9 pr-3 text-xs font-mono rounded bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="h-10 px-5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0 uppercase font-mono"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <span>Inspect Wallet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>

      <WalletOverviewCard caseData={currentCase} />

      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 text-xs font-mono">
        {[
          { id: 'transactions', label: 'Transaction Ledger' },
          { id: 'vasp', label: 'VASP Connections' },
          { id: 'risk', label: 'Risk Analysis' },
          { id: 'timeline', label: 'Timeline' },
          { id: 'evidence', label: 'Evidence Chain' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`py-2 px-3 border-b-2 font-semibold transition-all ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/20'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'transactions' && analysisResult && (
          <TransactionLedger transactions={analysisResult.transactions} />
        )}

        {activeTab === 'vasp' && analysisResult && (
          <VaspAttributionTable vaspConnections={analysisResult.vaspConnections} />
        )}

        {activeTab === 'risk' && analysisResult && (
          <RiskSignalBreakdown riskProfile={analysisResult.riskProfile} />
        )}

        {activeTab === 'timeline' && <InvestigationTimeline />}

        {activeTab === 'evidence' && analysisResult && (
          <EvidenceChainView
            evidenceList={analysisResult.evidenceList}
            title="Wallet Evidentiary Proof Records"
            confidenceScore={currentCase.confidence}
          />
        )}
      </div>
    </div>
  );
}
