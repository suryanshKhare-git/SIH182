'use client';

import React, { useState } from 'react';
import { Network } from '@/types/investigation';
import {
  MOCK_CROSS_CHAIN_PROFILES,
  MOCK_CROSS_CHAIN_TRANSITIONS,
  CrossChainWalletProfile,
  CrossChainTransition
} from '@/data/mockCrossChain';
import {
  Globe,
  ArrowRight,
  ShieldCheck,
  Building2,
  Copy,
  Check,
  Layers,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  Info,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatCurrency, formatAddress, formatTxHash, getConfidenceColor } from '@/utils/formatters';
import { useInvestigation } from '@/context/InvestigationContext';

interface CrossChainTrackerProps {
  initialChain?: Network | 'all';
  showTitle?: boolean;
}

export function CrossChainTracker({
  initialChain = 'all',
  showTitle = true
}: CrossChainTrackerProps) {
  const { currentCase } = useInvestigation();
  const [selectedChainFilter, setSelectedChainFilter] = useState<Network | 'all'>(initialChain);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [expandedProfile, setExpandedProfile] = useState<string | null>('Ethereum');

  const caseId = currentCase?.id || 'INV-2026-001';
  const profiles = MOCK_CROSS_CHAIN_PROFILES[caseId] || MOCK_CROSS_CHAIN_PROFILES['INV-2026-001'];
  const transitions = MOCK_CROSS_CHAIN_TRANSITIONS[caseId] || MOCK_CROSS_CHAIN_TRANSITIONS['INV-2026-001'];

  const filteredProfiles = selectedChainFilter === 'all'
    ? profiles
    : profiles.filter((p) => p.chain === selectedChainFilter);

  const filteredTransitions = selectedChainFilter === 'all'
    ? transitions
    : transitions.filter(
        (t) => t.sourceChain === selectedChainFilter || t.destChain === selectedChainFilter
      );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getChainBadgeColor = (chain: Network) => {
    switch (chain) {
      case 'Ethereum':
        return 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'Bitcoin':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Polygon':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'BNB Chain':
        return 'bg-yellow-100 dark:bg-yellow-950/80 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
      {/* Header */}
      {showTitle && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
                Cross-Chain Tracking & VASP Attribution
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                4 CHAINS INDEXED
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Correlate suspect addresses, atomic bridge transitions, and connected VASPs across Ethereum, Bitcoin, Polygon, and BNB Chain.
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300 shrink-0">
            <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-mono">Analytical Confidence — Not Confirmed Ownership</span>
          </div>
        </div>
      )}

      {/* Chain Selector Filter Bar */}
      <div className="px-4 py-2.5 bg-slate-100/60 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
          <span className="text-slate-400 uppercase text-[10px] mr-1 hidden sm:inline">Active Scope:</span>
          {(['all', 'Ethereum', 'Bitcoin', 'Polygon', 'BNB Chain'] as const).map((chain) => {
            const isActive = selectedChainFilter === chain;
            return (
              <button
                key={chain}
                onClick={() => setSelectedChainFilter(chain)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {chain === 'all' ? 'All Chains (Unified Trace)' : chain}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          Showing <strong className="text-slate-800 dark:text-slate-200">{filteredProfiles.length}</strong> Chains · <strong className="text-slate-800 dark:text-slate-200">{filteredTransitions.length}</strong> Bridge Events
        </div>
      </div>

      {/* Visual Cross-Chain Pathway Flow Graphic */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/40">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-500" />
          <span>Cross-Chain Capital Routing Topology</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {/* Step 1: Ethereum Target */}
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative">
            <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
              <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                ETHEREUM
              </span>
              <span className="text-slate-400">Origin Target</span>
            </div>
            <div className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              0x7a25...488d
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Initial Extortion Inflow: <strong>$1.84M USD</strong>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-blue-600 dark:text-blue-400 flex items-center justify-between">
              <span>Likely VASP:</span>
              <strong className="text-slate-800 dark:text-slate-200">Binance (89%)</strong>
            </div>
          </div>

          {/* Step 2: Bridge to Polygon */}
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative">
            <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
              <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                POLYGON
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Stargate Bridge</span>
            </div>
            <div className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              0x7a25...488d
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Bridged Capital: <strong>$450,000 USDC</strong>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-blue-600 dark:text-blue-400 flex items-center justify-between">
              <span>Likely VASP:</span>
              <strong className="text-slate-800 dark:text-slate-200">Kraken (94%)</strong>
            </div>
          </div>

          {/* Step 3: Bridge to BNB Chain */}
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative">
            <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
              <span className="px-1.5 py-0.5 rounded bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300 font-bold">
                BNB CHAIN
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Hop Protocol</span>
            </div>
            <div className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              0x7a25...488d
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Layering Sweep: <strong>$310,000 USDT</strong>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-blue-600 dark:text-blue-400 flex items-center justify-between">
              <span>Likely VASP:</span>
              <strong className="text-slate-800 dark:text-slate-200">OKX (79%)</strong>
            </div>
          </div>

          {/* Step 4: Bitcoin Co-Spend Swap */}
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs relative">
            <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
              <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
                BITCOIN
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">ThorChain Swap</span>
            </div>
            <div className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              bc1q9x...2c4e
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Atomic Swap Outflow: <strong>5.40 BTC ($361k)</strong>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-blue-600 dark:text-blue-400 flex items-center justify-between">
              <span>Likely VASP:</span>
              <strong className="text-slate-800 dark:text-slate-200">Bitfinex (82%)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Chain Wallet Profiles & Evidence Grid */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
          Chain-Specific Attribution Profiles & Evidence Scores
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProfiles.map((p) => {
            const conf = getConfidenceColor(p.confidenceScore);

            return (
              <div
                key={p.chain}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 p-4 transition-all hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${getChainBadgeColor(p.chain)}`}>
                      {p.chain}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span>{formatAddress(p.address, 8, 6)}</span>
                        <button
                          onClick={() => handleCopy(p.address, p.chain)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          title="Copy Address"
                        >
                          {copiedText === p.chain ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Balance: {p.balanceNative} ({formatCurrency(p.balanceUsd)}) · {p.txCount} txs
                      </div>
                    </div>
                  </div>

                  {/* Likely VASP headline badge */}
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Attributed Endpoint</div>
                    <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs border ${conf.bg} ${conf.text} ${conf.border}`}>
                      {p.confidenceScore}% Confidence
                    </span>
                  </div>
                </div>

                {/* Likely VASP Headline statement */}
                <div className="mt-3 p-2.5 rounded bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
                        Likely VASP: <span className="text-blue-700 dark:text-blue-300">{p.likelyVasp}</span> — {p.confidenceScore}% Confidence
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {p.hopDistance} {p.hopDistance === 1 ? 'hop' : 'hops'}
                    </span>
                  </div>

                  {/* 4 Core Evidence Drivers */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-1.5 text-[11px]">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-slate-400 font-medium shrink-0 w-28">1. Hop Distance:</span>
                      <span className="text-slate-700 dark:text-slate-300">{p.evidenceSummary.hopDistanceDesc}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-slate-400 font-medium shrink-0 w-28">2. Frequency:</span>
                      <span className="text-slate-700 dark:text-slate-300">{p.evidenceSummary.txFrequencyDesc}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-slate-400 font-medium shrink-0 w-28">3. Total Volume:</span>
                      <span className="text-slate-700 dark:text-slate-300">{p.evidenceSummary.volumeDesc}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-slate-400 font-medium shrink-0 w-28">4. Relationships:</span>
                      <span className="text-slate-700 dark:text-slate-300">{p.evidenceSummary.relationshipDesc}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Intermediary Nodes: <strong>{p.intermediaryCount}</strong></span>
                  <span className="text-amber-600 dark:text-amber-400">Analytical confidence · Verification required</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cross-Chain Bridge & Atomic Swap Transactions Table */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Cross-Chain Transitions & Bridge Transactions
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Deterministic Bridge Relays
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-md">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-mono text-[10px] uppercase tracking-wider select-none">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Route</th>
                <th className="py-2.5 px-3 font-semibold">Bridge Protocol</th>
                <th className="py-2.5 px-3 font-semibold">Asset & Amount</th>
                <th className="py-2.5 px-3 font-semibold">Source Tx Hash</th>
                <th className="py-2.5 px-3 font-semibold">Destination Tx Hash</th>
                <th className="py-2.5 px-3 font-semibold">Attributed Destination VASP</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTransitions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-xs">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${getChainBadgeColor(t.sourceChain)}`}>
                        {t.sourceChain}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${getChainBadgeColor(t.destChain)}`}>
                        {t.destChain}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Latency: {t.latencyMinutes} min
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {t.bridgeProtocol}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Timestamp: {t.timestamp.replace('T', ' ').replace('Z', ' UTC')}
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono">
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      {formatCurrency(t.amountUsd)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {t.amount} {t.asset}
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-600 dark:text-slate-300">
                        {formatTxHash(t.sourceTxHash, 6, 4)}
                      </span>
                      <button
                        onClick={() => handleCopy(t.sourceTxHash, `${t.id}-src`)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        title="Copy Tx Hash"
                      >
                        {copiedText === `${t.id}-src` ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-600 dark:text-slate-300">
                        {formatTxHash(t.destTxHash, 6, 4)}
                      </span>
                      <button
                        onClick={() => handleCopy(t.destTxHash, `${t.id}-dest`)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        title="Copy Tx Hash"
                      >
                        {copiedText === `${t.id}-dest` ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-800 dark:text-slate-200 font-mono text-xs">
                      Likely VASP: {t.connectedVasp.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {t.connectedVasp.confidence}% Confidence ({t.connectedVasp.hopDistance} hops)
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
                      <Check className="w-3 h-3" />
                      CONFIRMED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
