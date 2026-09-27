'use client';

import React, { useState, useMemo } from 'react';
import { WalletTransactionItem } from '@/data/mockTransactions';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Copy,
  Check,
  Building2
} from 'lucide-react';
import { formatCurrency, formatAddress, formatTxHash } from '@/utils/formatters';

interface TransactionLedgerProps {
  transactions: WalletTransactionItem[];
}

export function TransactionLedger({ transactions }: TransactionLedgerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [directionFilter, setDirectionFilter] = useState<'all' | 'inflow' | 'outflow'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTxs = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesDir = directionFilter === 'all' || tx.direction === directionFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        tx.txHash.toLowerCase().includes(q) ||
        tx.counterpartyAddress.toLowerCase().includes(q) ||
        tx.counterpartyLabel.toLowerCase().includes(q) ||
        (tx.vaspAssociated && tx.vaspAssociated.toLowerCase().includes(q));
      return matchesDir && matchesSearch;
    });
  }, [transactions, directionFilter, searchQuery]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              On-Chain Transaction Forensics Ledger
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {filteredTxs.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cryptographic ledger entries with hop lineage and counterparty VASP correlations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setDirectionFilter('all')}
              className={`px-2 py-1 rounded text-xs font-mono font-medium transition-colors ${
                directionFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDirectionFilter('inflow')}
              className={`px-2 py-1 rounded text-xs font-mono font-medium transition-colors ${
                directionFilter === 'inflow'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Inflow
            </button>
            <button
              onClick={() => setDirectionFilter('outflow')}
              className={`px-2 py-1 rounded text-xs font-mono font-medium transition-colors ${
                directionFilter === 'outflow'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Outflow
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tx hash or counterparty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 text-xs rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono w-56"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-mono text-[11px] uppercase tracking-wider select-none">
            <tr>
              <th className="py-2.5 px-4 font-semibold">Direction / Hash</th>
              <th className="py-2.5 px-3 font-semibold">Timestamp</th>
              <th className="py-2.5 px-3 font-semibold">Counterparty Entity</th>
              <th className="py-2.5 px-3 font-semibold">Hop Dist.</th>
              <th className="py-2.5 px-3 font-semibold">Value</th>
              <th className="py-2.5 px-3 font-semibold">VASP Correlation</th>
              <th className="py-2.5 px-3 font-semibold">Risk Signal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredTxs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 font-mono">
                  No transaction records match the specified filters.
                </td>
              </tr>
            ) : (
              filteredTxs.map((tx) => {
                const isInflow = tx.direction === 'inflow';

                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1.5 rounded-full shrink-0 ${
                            isInflow
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {isInflow ? (
                            <ArrowDownLeft className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div>
                          <div className="font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                            <span>{formatTxHash(tx.txHash, 6, 4)}</span>
                            <button
                              onClick={() => handleCopy(tx.txHash, tx.id)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                              title="Copy transaction hash"
                            >
                              {copiedId === tx.id ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Block #{tx.blockNumber}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      {tx.timestamp.replace('T', ' ')}
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {tx.counterpartyLabel}
                      </div>
                      <div className="font-mono text-[10px] text-slate-400">
                        {formatAddress(tx.counterpartyAddress, 5, 4)}
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">
                        {tx.hopDistance} {tx.hopDistance === 1 ? 'hop' : 'hops'}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-mono">
                      <div
                        className={`font-bold ${
                          isInflow
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {formatCurrency(tx.valueUsd)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {tx.valueNative}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      {tx.vaspAssociated ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{tx.vaspAssociated}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">—</span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      {tx.riskSignal ? (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                          {tx.riskSignal}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">Normal</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
