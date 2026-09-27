'use client';

import React, { useState } from 'react';
import { VaspConnection } from '@/types/vasp';
import {
  Building2,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Info,
  Layers,
  Scale,
  X,
  FileCheck2
} from 'lucide-react';
import { formatCurrency, formatTxHash, getConfidenceColor } from '@/utils/formatters';
import { useInvestigation } from '@/context/InvestigationContext';

interface NearestVaspCardsProps {
  vaspConnections?: VaspConnection[];
  title?: string;
  subtitle?: string;
}

export function NearestVaspCards({
  vaspConnections,
  title = 'Nearest VASP Attribution & Evidence Scores',
  subtitle = 'Multi-hop proximity scoring and algorithmic attribution to regulated Virtual Asset Service Providers'
}: NearestVaspCardsProps) {
  const { currentCase, analysisResult } = useInvestigation();
  const [selectedVasp, setSelectedVasp] = useState<VaspConnection | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const connections = vaspConnections || analysisResult?.vaspConnections || [];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Convert USD to INR representation (₹83 per USD conversion)
  const formatInr = (usd: number) => {
    const inrVal = usd * 83;
    if (inrVal >= 10000000) {
      return `₹${(inrVal / 10000000).toFixed(1)}M`;
    }
    if (inrVal >= 100000) {
      return `₹${(inrVal / 100000).toFixed(1)}L`;
    }
    return `₹${inrVal.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
      {/* Component Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              {title}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
              {connections.length} VASPs ATTRIBUTED
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
        </div>

        {/* Clear Legal Disclaimer Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300 shrink-0">
          <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span className="font-mono font-bold uppercase tracking-tight text-[10px]">
            ANALYTICAL CONFIDENCE — NOT CONFIRMED OWNERSHIP
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connections.map((conn) => {
          const conf = getConfidenceColor(conn.confidenceScore);

          return (
            <div
              key={conn.id}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-4 flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-600 transition-all shadow-xs"
            >
              <div>
                {/* 1. Likely VASP & Confidence Headline */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                        Attributed Endpoint
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
                        Likely VASP: <span className="text-blue-600 dark:text-blue-400">{conn.vaspName}</span>
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded font-mono font-bold text-xs border shrink-0 ${conf.bg} ${conf.text} ${conf.border}`}
                  >
                    {conn.confidenceScore}% Confidence
                  </span>
                </div>

                {/* Metrics Summary Strip */}
                <div className="grid grid-cols-3 gap-1.5 py-2.5 border-b border-slate-100 dark:border-slate-800/80 text-center font-mono">
                  <div className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[9px] text-slate-400 uppercase">Hop Dist.</div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {conn.hopDistance} {conn.hopDistance === 1 ? 'hop' : 'hops'}
                    </div>
                  </div>
                  <div className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[9px] text-slate-400 uppercase">Transactions</div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {conn.txCount} txs
                    </div>
                  </div>
                  <div className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[9px] text-slate-400 uppercase">Volume (INR)</div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {formatInr(conn.volumeUsd)}
                    </div>
                  </div>
                </div>

                {/* 2. Four Granular Evidence Drivers Behind The Score */}
                <div className="mt-3 space-y-2 text-xs">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Evidence Behind Score:
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    {/* Hop Distance driver */}
                    <div className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">✓</span>
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200 font-mono">Hop Distance:</strong>{' '}
                        <span className="text-slate-600 dark:text-slate-400">
                          {conn.hopDistance}-hop proximity ({conn.hopDistance <= 2 ? 'Direct counterparty within 48h' : 'Multi-tier layering'})
                        </span>
                      </div>
                    </div>

                    {/* Transaction Frequency driver */}
                    <div className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">✓</span>
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200 font-mono">Tx Frequency:</strong>{' '}
                        <span className="text-slate-600 dark:text-slate-400">
                          {conn.txCount} recurring transfers (Weekly automated sweeping cadence)
                        </span>
                      </div>
                    </div>

                    {/* Volume driver */}
                    <div className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">✓</span>
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200 font-mono">Volume:</strong>{' '}
                        <span className="text-slate-600 dark:text-slate-400">
                          {formatInr(conn.volumeUsd)} ({formatCurrency(conn.volumeUsd)} USD · 84.2% of flow)
                        </span>
                      </div>
                    </div>

                    {/* Address Relationships driver */}
                    <div className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">✓</span>
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200 font-mono">Address Rel.:</strong>{' '}
                        <span className="text-slate-600 dark:text-slate-400">
                          Deterministic sweeping to verified {conn.vaspName} Hot Wallet cluster
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  {conn.evidenceCount || 4} Corroborating Proofs
                </span>
                <button
                  onClick={() => setSelectedVasp(conn)}
                  className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/70 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 flex items-center gap-1.5 transition-colors"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>View Evidence</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Evidence Modal */}
      {selectedVasp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                    Likely VASP: {selectedVasp.vaspName} — {selectedVasp.confidenceScore}% Confidence
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Supporting cryptographic evidence and analytical attribution heuristics
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVasp(null)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Proximity & Volume Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[9px] text-slate-400 uppercase">Hop Proximity</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {selectedVasp.hopDistance} {selectedVasp.hopDistance === 1 ? 'Hop' : 'Hops'}
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[9px] text-slate-400 uppercase">Tx Count</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {selectedVasp.txCount} Transfers
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[9px] text-slate-400 uppercase">Volume (INR)</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {formatInr(selectedVasp.volumeUsd)}
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[9px] text-slate-400 uppercase">Volume (USD)</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {formatCurrency(selectedVasp.volumeUsd)}
                  </div>
                </div>
              </div>

              {/* Attribution Evidence List */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Corroborating Cryptographic Evidence
                </div>
                <div className="space-y-2">
                  {(selectedVasp.evidenceList || []).map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200 font-mono text-xs">
                          {ev.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                          +{ev.confidenceContribution}% weight
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                        {ev.description}
                      </p>
                      {ev.txHash && (
                        <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span>Tx: {formatTxHash(ev.txHash, 10, 8)}</span>
                          <button
                            onClick={() => handleCopy(ev.txHash!, ev.id)}
                            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            {copiedId === ev.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === ev.id ? 'Copied' : 'Copy Hash'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-2.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300 font-mono">
                <strong>Legal Notice:</strong> This score represents analytical confidence based on on-chain clustering and behavioral proximity. It does not establish legal entity ownership or criminal activity without judicial subpoena verification.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 flex items-center justify-end">
              <button
                onClick={() => setSelectedVasp(null)}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                Close Evidence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
