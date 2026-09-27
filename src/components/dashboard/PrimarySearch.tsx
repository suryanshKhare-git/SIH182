'use client';

import React, { useState } from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { Network } from '@/types/investigation';
import { Search, Loader2, ArrowRight, CornerDownLeft, Cpu } from 'lucide-react';

export function PrimarySearch() {
  const {
    currentCase,
    selectedNetwork,
    setSelectedNetwork,
    runAnalysis,
    isAnalyzing,
    analysisStepMessage,
    analysisStepIndex
  } = useInvestigation();

  const [inputVal, setInputVal] = useState(currentCase.targetWallet);

  const sampleWallets = [
    {
      label: 'LockBit Ransomware Extortion',
      address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      network: 'Ethereum' as Network
    },
    {
      label: 'Darknet Market Syndicate (BTC)',
      address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      network: 'Bitcoin' as Network
    },
    {
      label: 'Phishing Token Drainer Cluster',
      address: '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be',
      network: 'Polygon' as Network
    },
    {
      label: 'Tornado Cash Peeling Chain',
      address: '0x0d0707963952f2fba59dd06f2b425ace40b492fe',
      network: 'BNB Chain' as Network
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim() && !isAnalyzing) {
      runAnalysis(inputVal.trim(), selectedNetwork);
    }
  };

  const handleSelectSample = (sample: (typeof sampleWallets)[0]) => {
    setInputVal(sample.address);
    setSelectedNetwork(sample.network);
    runAnalysis(sample.address, sample.network);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase font-mono">
              Blockchain Intelligence
            </h1>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
              VASP ATTRIBUTION V2.6
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Trace unknown wallets, deconstruct transaction pathways, and identify nearest Virtual Asset Service Providers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span>GLOBAL INDEXER ONLINE</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="w-full sm:w-44 shrink-0">
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value as Network)}
            disabled={isAnalyzing}
            className="w-full h-10 px-3 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors"
          >
            <option value="Ethereum">Ethereum (ETH)</option>
            <option value="Bitcoin">Bitcoin (BTC)</option>
            <option value="Polygon">Polygon (MATIC)</option>
            <option value="BNB Chain">BNB Chain (BSC)</option>
          </select>
        </div>

        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Enter unknown subject wallet address (0x... or bc1...)"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isAnalyzing}
            className="w-full h-10 pl-9 pr-24 text-xs font-mono rounded bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-[10px] text-slate-400 font-mono px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
            <span>ENTER</span>
            <CornerDownLeft className="w-2.5 h-2.5" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="h-10 px-5 text-xs font-bold tracking-wide text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed uppercase font-mono"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Analyze Wallet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {isAnalyzing && (
        <div className="mt-3 p-2.5 rounded bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center gap-3">
          <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin shrink-0" />
          <div className="text-xs font-mono text-blue-900 dark:text-blue-200 flex-1">
            <span className="font-bold mr-2">ANALYSIS PIPELINE ACTIVE:</span>
            <span>{analysisStepMessage || 'Retrieving on-chain intelligence...'}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {analysisStepIndex}/5
          </span>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px] font-medium flex items-center gap-1">
          <Cpu className="w-3 h-3" />
          Preset Dossiers:
        </span>
        {sampleWallets.map((sample) => (
          <button
            key={sample.address}
            onClick={() => handleSelectSample(sample)}
            type="button"
            className="px-2.5 py-1 rounded text-[11px] font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>{sample.label}</span>
            <span className="text-[10px] text-slate-400 font-mono">({sample.network})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
