'use client';

import React, { useState } from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { VaspAttributionTable } from '@/components/vasp/VaspAttributionTable';
import { MOCK_VASP_DIRECTORY } from '@/data/mockVasps';
import {
  Building2,
  Search,
  Mail
} from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

export default function VaspIntelligencePage() {
  const { analysisResult } = useInvestigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('all');

  const filteredDirectory = MOCK_VASP_DIRECTORY.filter((v) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      v.name.toLowerCase().includes(q) ||
      v.code.toLowerCase().includes(q) ||
      v.jurisdiction.toLowerCase().includes(q);
    const matchesJur = selectedJurisdiction === 'all' || v.jurisdiction.includes(selectedJurisdiction);
    return matchesSearch && matchesJur;
  });

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
            Virtual Asset Service Provider (VASP) Intelligence
          </h1>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            FATF TRAVEL RULE REGISTRY
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Directory of registered crypto asset custodians, centralized exchanges, compliance focal points, and attribution clusters.
        </p>
      </div>

      {analysisResult && (
        <VaspAttributionTable vaspConnections={analysisResult.vaspConnections} />
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
                Global VASP Compliance & Subpoena Directory
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {filteredDirectory.length} Indexed Entities
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified legal intake coordinates, compliance offices, and registered clustering heuristics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search VASP name or jurisdiction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono w-56"
              />
            </div>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDirectory.map((vasp) => (
            <div
              key={vasp.id}
              className="p-4 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80 dark:border-slate-750">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      {vasp.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                    {vasp.fatfStatus}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Classification:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{vasp.type}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Jurisdiction:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{vasp.jurisdiction}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Primary Regulator:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">{vasp.regulator}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Known Hot Wallets:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {formatNumber(vasp.knownHotWallets)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-750 text-[11px] font-mono text-blue-600 dark:text-blue-400 flex items-center justify-between">
                <span className="flex items-center gap-1 truncate max-w-[190px]">
                  <Mail className="w-3 h-3 shrink-0" />
                  <span>{vasp.leFocalPointEmail}</span>
                </span>
                <span className="text-slate-400 font-mono text-[10px]">LE Subpoena Desk</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
