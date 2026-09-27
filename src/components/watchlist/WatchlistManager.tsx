'use client';

import React, { useState } from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { Network, WatchlistWallet } from '@/types/investigation';
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Building2,
  ArrowRight
} from 'lucide-react';
import { formatAddress } from '@/utils/formatters';

export function WatchlistManager() {
  const { watchlist, addToWatchlist, removeFromWatchlist, runAnalysis } = useInvestigation();

  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newNetwork, setNewNetwork] = useState<Network>('Ethereum');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.trim() && newLabel.trim()) {
      addToWatchlist({
        address: newAddress.trim(),
        label: newLabel.trim(),
        network: newNetwork,
        lastActivity: 'Just now',
        unseenTxs: 0,
        riskScore: 65,
        recentVasp: 'Pending Scan',
        recentHop: 1,
        changeStatus: 'idle'
      });
      setNewAddress('');
      setNewLabel('');
      setIsAdding(false);
    }
  };

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: WatchlistWallet['changeStatus']) => {
    switch (status) {
      case 'new_transaction':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-900';
      case 'vasp_attributed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900';
      case 'high_velocity':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-900';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Surveillance Watchlist & Delta Monitor
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {watchlist.length} Targets Under Active Watch
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time alerting on newly observed transactions and automated VASP hop attribution updates.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-3 py-1.5 rounded text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition-colors font-mono"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Subject to Watchlist</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-xs">
          <div className="font-bold text-slate-800 dark:text-slate-200 mb-2 font-mono uppercase">
            Enroll New Address for Surveillance
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                Target Label
              </label>
              <input
                type="text"
                placeholder="e.g. Syndicate Cashier Relay"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                required
                className="w-full p-2 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                Wallet Address
              </label>
              <input
                type="text"
                placeholder="0x... or bc1..."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                required
                className="w-full p-2 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                Network
              </label>
              <select
                value={newNetwork}
                onChange={(e) => setNewNetwork(e.target.value as Network)}
                className="w-full p-2 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs"
              >
                <option value="Ethereum">Ethereum</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Polygon">Polygon</option>
                <option value="BNB Chain">BNB Chain</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
            >
              Save to Watchlist
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-mono text-[11px] uppercase tracking-wider select-none">
            <tr>
              <th className="py-2.5 px-4 font-semibold">Subject Target</th>
              <th className="py-2.5 px-3 font-semibold">Network</th>
              <th className="py-2.5 px-3 font-semibold">Status / Change Delta</th>
              <th className="py-2.5 px-3 font-semibold">Unseen Txs</th>
              <th className="py-2.5 px-3 font-semibold">Recent VASP Attribution</th>
              <th className="py-2.5 px-3 font-semibold">Risk Index</th>
              <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {watchlist.map((w) => (
              <tr key={w.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900 dark:text-slate-100">{w.label}</div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    <span>{formatAddress(w.address, 6, 4)}</span>
                    <button
                      onClick={() => handleCopy(w.address, w.id)}
                      className="hover:text-blue-500"
                      title="Copy Address"
                    >
                      {copiedId === w.id ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </td>

                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono">
                    {w.network}
                  </span>
                </td>

                <td className="py-3 px-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${getStatusBadge(
                      w.changeStatus
                    )}`}
                  >
                    {w.changeStatus.replace('_', ' ')}
                  </span>
                </td>

                <td className="py-3 px-3 font-mono font-bold">
                  {w.unseenTxs > 0 ? (
                    <span className="text-amber-600 dark:text-amber-400">+{w.unseenTxs} new</span>
                  ) : (
                    <span className="text-slate-400 font-normal">None</span>
                  )}
                </td>

                <td className="py-3 px-3">
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{w.recentVasp}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({w.recentHop}h)</span>
                  </div>
                </td>

                <td className="py-3 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                  {w.riskScore}/100
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => runAnalysis(w.address, w.network)}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 transition-colors flex items-center gap-1"
                    >
                      <span>Analyze</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromWatchlist(w.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Remove from Watchlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
