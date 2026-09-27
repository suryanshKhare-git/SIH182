'use client';

import React, { useState } from 'react';
import { InvestigationCase } from '@/types/investigation';
import {
  Copy,
  Check,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownLeft,
  Bookmark
} from 'lucide-react';
import { formatCurrency, getRiskLevelBadge } from '@/utils/formatters';
import { useInvestigation } from '@/context/InvestigationContext';

interface WalletOverviewCardProps {
  caseData: InvestigationCase;
}

export function WalletOverviewCard({ caseData }: WalletOverviewCardProps) {
  const { toggleBookmark, isBookmarked } = useInvestigation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(caseData.targetWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const riskBadge = getRiskLevelBadge(caseData.riskLevel);
  const isPinned = isBookmarked(caseData.targetWallet);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
              {caseData.id}
            </span>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {caseData.network}
            </span>
            <span
              className={`text-[11px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${riskBadge.bg} ${riskBadge.text} ${riskBadge.border}`}
            >
              Risk Signal: {caseData.riskLevel}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
              Assigned: {caseData.assignedInvestigator} ({caseData.agency})
            </span>
          </div>

          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-2 tracking-tight">
            {caseData.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              toggleBookmark({
                type: 'wallet',
                title: caseData.title,
                subtitle: `${caseData.id} · ${caseData.targetWallet.substring(0, 10)}... (${caseData.network})`,
                targetId: caseData.targetWallet
              })
            }
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
              isPinned
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300/60 dark:border-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>{isPinned ? 'Bookmarked' : 'Bookmark Case'}</span>
          </button>
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
              Subject Unknown Wallet Address
            </span>
            <div className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 break-all select-all">
              {caseData.targetWallet}
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80 flex items-center gap-1.5 transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Address'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Current Balance</span>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
            {caseData.balanceNative}
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {formatCurrency(caseData.balanceUsd)}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Transactions</span>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
            {caseData.txCount} txs
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Recorded on-chain</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block flex items-center gap-1">
            <ArrowDownLeft className="w-3 h-3 text-emerald-500" />
            Incoming Volume
          </span>
          <div className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
            {formatCurrency(caseData.incomingVolumeUsd)}
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Total credited</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3 text-rose-500" />
            Outgoing Volume
          </span>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
            {formatCurrency(caseData.outgoingVolumeUsd)}
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Dispersed funds</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">First Seen</span>
          <div className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
            {caseData.firstObserved.split(' ')[0]}
          </div>
          <span className="text-[10px] font-mono text-slate-400">Genesis record</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Last Active</span>
          <div className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
            {caseData.lastActive.split(' ')[0]}
          </div>
          <span className="text-[10px] font-mono text-slate-400">Latest block activity</span>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 mr-1">
            Analytical Signal Summary:
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            {caseData.riskSummary}
          </span>
        </div>
      </div>
    </div>
  );
}
