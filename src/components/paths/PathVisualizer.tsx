'use client';

import React, { useState } from 'react';
import { TransactionPath } from '@/types/graph';
import {
  ArrowDown,
  Copy,
  Check,
  Clock
} from 'lucide-react';
import { formatCurrency, formatTxHash, getConfidenceColor } from '@/utils/formatters';

interface PathVisualizerProps {
  paths: TransactionPath[];
  onSelectWallet?: (walletAddress: string) => void;
}

export function PathVisualizer({ paths, onSelectWallet }: PathVisualizerProps) {
  const [selectedPathId, setSelectedPathId] = useState<string>(paths[0]?.id || '');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activePath = paths.find((p) => p.id === selectedPathId) || paths[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (!activePath) {
    return (
      <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
        No active transaction paths resolved for this query.
      </div>
    );
  }

  const confStyle = getConfidenceColor(activePath.confidenceScore);

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Detected Multi-Hop Attribution Pathways ({paths.length})
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Ranked by topological confidence
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {paths.map((p) => {
            const isSelected = p.id === activePath.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPathId(p.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-400 dark:border-blue-700 text-blue-900 dark:text-blue-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold">{p.pathName}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700">
                    {p.hopCount} Hops
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                  <span>Destination: {p.targetVasp}</span>
                  <span>·</span>
                  <span className="font-mono font-bold">{formatCurrency(p.totalVolumeUsd)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
                {activePath.pathName}: {activePath.targetVasp}
              </h2>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${confStyle.bg} ${confStyle.text} ${confStyle.border}`}
              >
                {activePath.confidenceScore}% Confidence ({activePath.evidenceStrength} Evidence)
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {activePath.summary}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0">
            <div>
              <span className="block text-[10px] uppercase text-slate-400">Total Path Volume</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {formatCurrency(activePath.totalVolumeUsd)}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-slate-400">Avg Time Delta</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {activePath.averageTimeDelta}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {activePath.nodes.map((node, index) => {
            const edge = activePath.edges[index];
            const isTarget = node.role === 'unknown_wallet';
            const isVasp = node.role === 'vasp';

            return (
              <div key={node.id} className="relative">
                <div
                  className={`p-4 rounded-lg border transition-all ${
                    isTarget
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/60'
                      : isVasp
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-md font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                          isTarget
                            ? 'bg-indigo-600 text-white'
                            : isVasp
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-700 text-white'
                        }`}
                      >
                        {node.hopDistance}h
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                            {node.label}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {node.role.replace('_', ' ')}
                          </span>
                          {node.vaspName && (
                            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                              Identified VASP: {node.vaspName}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                          <span>{node.address}</span>
                          <button
                            onClick={() => handleCopy(node.address)}
                            className="hover:text-slate-800 dark:hover:text-slate-200"
                            title="Copy address"
                          >
                            {copiedText === node.address ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                          {onSelectWallet && (
                            <button
                              onClick={() => onSelectWallet(node.address)}
                              className="text-blue-600 dark:text-blue-400 hover:underline text-[10px]"
                            >
                              Inspect Wallet
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-right">
                      {node.balanceNative && (
                        <div>
                          <span className="text-[10px] text-slate-400 block">Balance</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {node.balanceNative}
                          </span>
                        </div>
                      )}
                      {node.txCount !== undefined && (
                        <div>
                          <span className="text-[10px] text-slate-400 block">Total Txs</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {node.txCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {edge && (
                  <div className="py-2 px-6 flex items-center justify-between text-xs bg-slate-100/60 dark:bg-slate-800/20 my-1 rounded border border-dashed border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                      <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-bounce" />
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {formatCurrency(edge.valueUsd)}
                      </span>
                      <span>({edge.valueNative})</span>
                      <span className="text-slate-400">·</span>
                      <span>{edge.txCount} txs recorded</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {edge.timeDelta || '12 mins'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span>Hash: {formatTxHash(edge.txHashSample)}</span>
                      <button
                        onClick={() => handleCopy(edge.txHashSample)}
                        className="hover:text-blue-500"
                        title="Copy Tx Hash"
                      >
                        {copiedText === edge.txHashSample ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
