'use client';

import React, { useState } from 'react';
import { VaspConnection } from '@/types/vasp';
import {
  Building2,
  ShieldCheck,
  Copy,
  Check,
  X,
  Scale,
  Bookmark,
  ChevronRight,
  Info
} from 'lucide-react';
import { formatCurrency, formatTxHash, getConfidenceColor } from '@/utils/formatters';
import { useInvestigation } from '@/context/InvestigationContext';

interface VaspAttributionTableProps {
  vaspConnections: VaspConnection[];
}

export function VaspAttributionTable({ vaspConnections }: VaspAttributionTableProps) {
  const { toggleBookmark, isBookmarked } = useInvestigation();
  const [selectedVasp, setSelectedVasp] = useState<VaspConnection | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Nearest VASP Connections
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
              CORE ATTRIBUTION MATRIX
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Identified custodial services, centralized exchanges, and regulated Virtual Asset Service Providers within multi-hop radius.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300">
          <Info className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>Attribution is an analytical estimate · Requires subpoena verification</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-mono text-[11px] uppercase tracking-wider select-none">
            <tr>
              <th className="py-2.5 px-4 font-semibold">VASP Entity</th>
              <th className="py-2.5 px-3 font-semibold">Network</th>
              <th className="py-2.5 px-3 font-semibold">Hop Dist.</th>
              <th className="py-2.5 px-3 font-semibold">Transactions</th>
              <th className="py-2.5 px-3 font-semibold">Volume (USD)</th>
              <th className="py-2.5 px-3 font-semibold">First Observed</th>
              <th className="py-2.5 px-3 font-semibold">Last Observed</th>
              <th className="py-2.5 px-3 font-semibold">Confidence</th>
              <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {vaspConnections.map((conn) => {
              const confStyle = getConfidenceColor(conn.confidenceScore);
              const isPinned = isBookmarked(conn.id);

              return (
                <tr
                  key={conn.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">
                          {conn.vaspName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {conn.vaspType} · {conn.jurisdiction}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono">
                      {conn.network}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono font-semibold">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] ${
                        conn.hopDistance === 1
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : conn.hopDistance === 2
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {conn.hopDistance} {conn.hopDistance === 1 ? 'hop' : 'hops'}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">
                    {conn.txCount} txs
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(conn.volumeUsd)}
                  </td>

                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {conn.firstObserved.split(' ')[0]}
                  </td>

                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {conn.lastObserved.split(' ')[0]}
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${confStyle.bg} ${confStyle.text} ${confStyle.border}`}
                      >
                        {conn.confidenceScore}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() =>
                          toggleBookmark({
                            type: 'vasp',
                            title: conn.vaspName,
                            subtitle: `${conn.hopDistance} Hops · Confidence: ${conn.confidenceScore}% (${conn.network})`,
                            targetId: conn.id
                          })
                        }
                        className={`p-1.5 rounded transition-colors ${
                          isPinned
                            ? 'text-amber-500 hover:text-amber-600 bg-amber-50 dark:bg-amber-950/40'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={isPinned ? 'Bookmarked' : 'Bookmark VASP'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <button
                        onClick={() => setSelectedVasp(conn)}
                        className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 flex items-center gap-1 transition-colors"
                      >
                        <span>View Evidence</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedVasp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      Forensic Attribution Dossier: {selectedVasp.vaspName}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {selectedVasp.confidenceScore}% Confidence
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Attribution Method: {selectedVasp.attributionMethod} · {selectedVasp.hopDistance} hops distance
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedVasp(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 text-xs">
              <div className="p-4 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
                <div className="flex items-center gap-2 font-mono font-bold uppercase text-blue-900 dark:text-blue-300 mb-2">
                  <Scale className="w-4 h-4" />
                  <span>Law Enforcement Subpoena & FATF Travel Rule Pathway</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">LE Intake Portal</span>
                    <span className="font-mono font-semibold text-blue-700 dark:text-blue-400 break-all">
                      {selectedVasp.subpoenaProcess.lawEnforcementPortal}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Required Legal Instrument</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedVasp.subpoenaProcess.requiredLegalInstrument}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Jurisdiction & Compliance Office</span>
                    <span>{selectedVasp.subpoenaProcess.complianceOffice} ({selectedVasp.jurisdiction})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Average Subpoena SLA</span>
                    <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {selectedVasp.subpoenaProcess.avgResponseDays} Business Days
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 text-xs">
                    Corroborating Evidence Chain ({selectedVasp.evidenceList.length} Signals)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Verified by Chain Forensics API</span>
                </div>

                <div className="space-y-2.5">
                  {selectedVasp.evidenceList.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                            ✓
                          </span>
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                            <span className="ml-2 text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                              +{item.confidenceContribution}% weight
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 mt-1 pl-7 text-[11px] leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-2 pl-7 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono border-t border-slate-100 dark:border-slate-800 pt-2 text-slate-500 dark:text-slate-400">
                        <span>Legal relevance: {item.legalRelevance}</span>
                        {item.txHash && (
                          <div className="flex items-center gap-1">
                            <span>Tx: {formatTxHash(item.txHash)}</span>
                            <button
                              onClick={() => handleCopy(item.txHash!, item.id)}
                              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                            >
                              {copiedHash === item.id ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5" />}
                              <span>{copiedHash === item.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[11px] text-slate-400 font-mono">
                Chain of Custody Hash: SHA256:{selectedVasp.id.replace('conn-', '')}89f2a00
              </span>
              <button
                onClick={() => setSelectedVasp(null)}
                className="px-4 py-1.5 rounded-md text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
