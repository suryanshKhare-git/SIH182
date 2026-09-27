'use client';

import React, { useState, useMemo } from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import {
  FolderOpen,
  Search,
  ArrowRight
} from 'lucide-react';
import { formatAddress, getConfidenceColor } from '@/utils/formatters';
import Link from 'next/link';

export default function InvestigationsPage() {
  const { allCases, currentCase, loadCase } = useInvestigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [networkFilter, setNetworkFilter] = useState<string>('all');

  const filteredCases = useMemo(() => {
    return allCases.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.targetWallet.toLowerCase().includes(q) ||
        c.assignedInvestigator.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchesNetwork = networkFilter === 'all' || c.network === networkFilter;

      return matchesSearch && matchesStatus && matchesNetwork;
    });
  }, [allCases, searchQuery, statusFilter, networkFilter]);

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
              Investigation Dossiers Repository
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {allCases.length} ACTIVE CASES
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Classified cybercrime, extortion, and laundering dossiers managed by authorized investigative teams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Active Workspace: <span className="font-bold text-slate-900 dark:text-slate-100">{currentCase.id}</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search dossier ID, title, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-slate-400 text-[10px] uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-1.5 text-xs rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="in_progress">In Progress</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-slate-400 text-[10px] uppercase">Chain:</span>
            <select
              value={networkFilter}
              onChange={(e) => setNetworkFilter(e.target.value)}
              className="p-1.5 text-xs rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Chains</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Polygon">Polygon</option>
              <option value="BNB Chain">BNB Chain</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map((c) => {
          const isSelected = c.id === currentCase.id;

          return (
            <div
              key={c.id}
              className={`p-5 rounded-lg border transition-all bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-500 dark:border-blue-600 ring-1 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                      {c.id}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {c.network}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded border ${getPriorityBadge(
                        c.priority
                      )}`}
                    >
                      {c.priority}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    Updated {c.updatedAt.split(' ')[0]}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {c.notes}
                </p>

                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 mb-3">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
                    Target Subject Wallet
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 break-all select-all">
                    {c.targetWallet}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-4">
                  <div className="p-2 rounded bg-slate-50/70 dark:bg-slate-800/30">
                    <span className="text-[10px] text-slate-400 block">Balance</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {c.balanceNative}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-50/70 dark:bg-slate-800/30">
                    <span className="text-[10px] text-slate-400 block">Nearest VASP</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 truncate block">
                      {c.nearestVasp} ({c.nearestHop}h)
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-50/70 dark:bg-slate-800/30">
                    <span className="text-[10px] text-slate-400 block">Attribution</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {c.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  Officer: {c.assignedInvestigator}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/investigations/${c.id}`}
                    className="px-3 py-1.5 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700 transition-colors"
                  >
                    View File
                  </Link>

                  <button
                    onClick={() => loadCase(c.id)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors font-mono flex items-center gap-1 ${
                      isSelected
                        ? 'bg-blue-600 text-white cursor-default'
                        : 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900'
                    }`}
                  >
                    <span>{isSelected ? 'Loaded in Session' : 'Load Workstation'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
