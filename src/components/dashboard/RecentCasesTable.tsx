'use client';

import React from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { FolderOpen, Building2, ChevronRight } from 'lucide-react';
import { formatAddress, getConfidenceColor } from '@/utils/formatters';
import Link from 'next/link';

export function RecentCasesTable() {
  const { allCases, currentCase, loadCase } = useInvestigation();

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20';
      case 'high':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Active Investigation Dossiers
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {allCases.length} Managed Inquiries
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Classified blockchain intelligence investigations underway across cybercrime task forces.
          </p>
        </div>

        <Link
          href="/investigations"
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono"
        >
          <span>View All Dossiers</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-mono text-[11px] uppercase tracking-wider select-none">
            <tr>
              <th className="py-2.5 px-4 font-semibold">Case Reference</th>
              <th className="py-2.5 px-3 font-semibold">Subject Target Wallet</th>
              <th className="py-2.5 px-3 font-semibold">Network</th>
              <th className="py-2.5 px-3 font-semibold">Priority</th>
              <th className="py-2.5 px-3 font-semibold">Nearest VASP Found</th>
              <th className="py-2.5 px-3 font-semibold">Attribution Conf.</th>
              <th className="py-2.5 px-3 font-semibold">Lead Investigator</th>
              <th className="py-2.5 px-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {allCases.map((c) => {
              const isCurrent = c.id === currentCase.id;
              const confStyle = getConfidenceColor(c.confidence);

              return (
                <tr
                  key={c.id}
                  className={`transition-colors ${
                    isCurrent
                      ? 'bg-blue-50/60 dark:bg-blue-950/30'
                      : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="font-bold font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <FolderOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{c.id}</span>
                      {isCurrent && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-600 text-white font-mono">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs mt-0.5">
                      {c.title}
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">
                    <span className="font-semibold">{formatAddress(c.targetWallet, 6, 4)}</span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono">
                      {c.network}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded font-mono uppercase text-[10px] font-bold border ${getPriorityBadge(
                        c.priority
                      )}`}
                    >
                      {c.priority}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {c.nearestVasp}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono ml-1">
                          ({c.nearestHop} {c.nearestHop === 1 ? 'hop' : 'hops'})
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${confStyle.bg} ${confStyle.text} ${confStyle.border}`}
                    >
                      {c.confidence}%
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                    <div>{c.assignedInvestigator}</div>
                    <div className="text-[10px] text-slate-400">{c.agency}</div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => loadCase(c.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors font-mono ${
                        isCurrent
                          ? 'bg-blue-600 text-white cursor-default'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700'
                      }`}
                    >
                      {isCurrent ? 'Viewing' : 'Load Case'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
