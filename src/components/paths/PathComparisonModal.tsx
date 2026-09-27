'use client';

import React, { useState } from 'react';
import { TransactionPath } from '@/types/graph';
import { GitCompare, X } from 'lucide-react';
import { formatCurrency, getConfidenceColor } from '@/utils/formatters';

interface PathComparisonModalProps {
  paths: TransactionPath[];
  isOpen: boolean;
  onClose: () => void;
}

export function PathComparisonModal({ paths, isOpen, onClose }: PathComparisonModalProps) {
  const [pathAId, setPathAId] = useState<string>(paths[0]?.id || '');
  const [pathBId, setPathBId] = useState<string>(paths[1]?.id || paths[0]?.id || '');

  if (!isOpen || paths.length < 2) return null;

  const pathA = paths.find((p) => p.id === pathAId) || paths[0];
  const pathB = paths.find((p) => p.id === pathBId) || paths[1];

  const confA = getConfidenceColor(pathA.confidenceScore);
  const confB = getConfidenceColor(pathB.confidenceScore);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono uppercase tracking-wide">
                Side-by-Side Transaction Path Comparison
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Contrast topological pathways to evaluate why one route yields higher analytical confidence.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
              <label className="block text-[10px] font-mono uppercase font-bold text-blue-900 dark:text-blue-300 mb-1">
                Select Pathway Alpha:
              </label>
              <select
                value={pathAId}
                onChange={(e) => setPathAId(e.target.value)}
                className="w-full p-2 text-xs font-semibold rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                {paths.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.pathName} ({p.targetVasp})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60">
              <label className="block text-[10px] font-mono uppercase font-bold text-indigo-900 dark:text-indigo-300 mb-1">
                Select Pathway Beta:
              </label>
              <select
                value={pathBId}
                onChange={(e) => setPathBId(e.target.value)}
                className="w-full p-2 text-xs font-semibold rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                {paths.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.pathName} ({p.targetVasp})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
            <table className="w-full text-left">
              <thead className="bg-slate-100/70 dark:bg-slate-800/60 font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Forensic Metric</th>
                  <th className="py-2.5 px-4 text-blue-700 dark:text-blue-300 font-bold">
                    {pathA.pathName}
                  </th>
                  <th className="py-2.5 px-4 text-indigo-700 dark:text-indigo-300 font-bold">
                    {pathB.pathName}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Attributed VASP Endpoint
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                    {pathA.targetVasp}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                    {pathB.targetVasp}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Topological Hop Distance
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                    {pathA.hopCount} Hops
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                    {pathB.hopCount} Hops
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Cumulative Capital Volume
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(pathA.totalVolumeUsd)}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(pathB.totalVolumeUsd)}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Average Transfer Latency
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-700 dark:text-slate-300">
                    {pathA.averageTimeDelta}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-700 dark:text-slate-300">
                    {pathB.averageTimeDelta}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Evidence Strength Rating
                  </td>
                  <td className="py-2.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                    {pathA.evidenceStrength}
                  </td>
                  <td className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    {pathB.evidenceStrength}
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Analytical Confidence Score
                  </td>
                  <td className="py-2.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${confA.bg} ${confA.text} ${confA.border}`}
                    >
                      {pathA.confidenceScore}%
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${confB.bg} ${confB.text} ${confB.border}`}
                    >
                      {pathB.confidenceScore}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <span className="font-mono font-bold uppercase text-[10px] text-slate-400 block mb-1">
              Comparative Intelligence Analysis
            </span>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              <strong>{pathA.pathName}</strong> demonstrates shorter distance ({pathA.hopCount} hops vs{' '}
              {pathB.hopCount} hops) and tighter transaction velocity, yielding a higher attribution
              confidence of {pathA.confidenceScore}%. For formal subpoena preparation, Priority is recommended
              for {pathA.targetVasp}.
            </p>
          </div>
        </div>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-800/40">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
