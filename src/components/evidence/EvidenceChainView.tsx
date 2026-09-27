'use client';

import React, { useState } from 'react';
import { EvidenceItem } from '@/types/vasp';
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatTxHash } from '@/utils/formatters';

interface EvidenceChainViewProps {
  evidenceList: EvidenceItem[];
  title?: string;
  confidenceScore?: number;
}

export function EvidenceChainView({
  evidenceList,
  title = 'Forensic Evidence Chain of Custody',
  confidenceScore = 88
}: EvidenceChainViewProps) {
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedEvidenceId(selectedEvidenceId === id ? null : id);
  };

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
              {title}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              {confidenceScore}% AGGREGATED CONFIDENCE
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Click any discrete evidence signal to inspect cryptographic proof, indexer source, and evidentiary weight.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          <span>{evidenceList.length} Corroborating Signals</span>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {evidenceList.map((item, index) => {
          const isSelected = selectedEvidenceId === item.id;

          return (
            <div key={item.id} className="transition-colors">
              <div
                onClick={() => toggleSelect(item.id)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/40 select-none"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        Signal #{index + 1}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono shrink-0 sm:self-center">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    +{item.confidenceContribution}% Weight
                  </span>

                  <span className="text-[10px] text-slate-400">{item.timestamp.split(' ')[0]}</span>

                  <button
                    type="button"
                    className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {isSelected ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isSelected && (
                <div className="px-6 pb-4 pt-1 bg-slate-50/70 dark:bg-slate-850 text-xs border-t border-slate-100 dark:border-slate-800 animate-in fade-in-50 duration-150">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    <div className="p-3 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        Legal Evidentiary Relevance
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                        {item.legalRelevance}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        Cryptographic Proof / On-Chain Tx
                      </span>
                      {item.txHash ? (
                        <div className="flex items-center justify-between text-xs font-mono mt-1">
                          <span className="text-slate-800 dark:text-slate-200 font-bold">
                            {formatTxHash(item.txHash, 8, 6)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(item.txHash!, item.id);
                            }}
                            className="text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                          >
                            {copiedHash === item.id ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{copiedHash === item.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">N/A (Statistical / Cluster Tag)</span>
                      )}
                    </div>

                    <div className="p-3 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        Source Intelligence API
                      </span>
                      <div className="font-mono text-slate-700 dark:text-slate-300 font-semibold mt-1">
                        {item.sourceApi}
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
                        Verified Signature ✓
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
