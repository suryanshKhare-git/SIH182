'use client';

import React, { useState } from 'react';
import { MOCK_API_ENDPOINTS, MOCK_API_SUMMARY } from '@/data/mockApis';
import {
  CheckCircle2,
  RefreshCw,
  Lock
} from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

export default function ApiMonitorPage() {
  const [endpoints, setEndpoints] = useState(MOCK_API_ENDPOINTS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setEndpoints((prev) =>
        prev.map((e) => ({
          ...e,
          latencyMs: Math.max(30, e.latencyMs + Math.floor(Math.random() * 15 - 7)),
          lastPing: 'Just now'
        }))
      );
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
              Blockchain Intelligence API & Node Telemetry
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time latency, request quotas, and health status for integrated on-chain indexers and VASP registries.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-3 py-1.5 rounded text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 flex items-center gap-1.5 font-mono transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Test Ping & Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Overall Health</span>
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5" />
            <span>{MOCK_API_SUMMARY.overallHealth}</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {MOCK_API_SUMMARY.operationalCount} / {MOCK_API_SUMMARY.totalApis} endpoints up
          </span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Average Latency</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
            {MOCK_API_SUMMARY.avgLatencyMs} ms
          </div>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            Optimal LE query latency
          </span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">24h Queries Processed</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
            {formatNumber(MOCK_API_SUMMARY.totalRequestsToday)}
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Across 4 blockchains
          </span>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Global Sync Clock</span>
          <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
            Synced UTC
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            99.98% 90-day SLA
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
            Active Intelligence API Services
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-mono text-[11px] uppercase tracking-wider select-none">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Service Name</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold">Latency</th>
                <th className="py-2.5 px-3 font-semibold">90d Uptime</th>
                <th className="py-2.5 px-3 font-semibold">24h Quota Used</th>
                <th className="py-2.5 px-3 font-semibold">Security / Auth</th>
                <th className="py-2.5 px-4 font-semibold text-right">Last Ping</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {endpoints.map((ep) => (
                <tr key={ep.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{ep.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{ep.provider} · {ep.network}</div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono">
                      {ep.category}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {ep.status}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                    <span
                      className={
                        ep.latencyMs < 100
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : ep.latencyMs < 150
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }
                    >
                      {ep.latencyMs} ms
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">
                    {ep.uptime90d}%
                  </td>

                  <td className="py-3 px-3 font-mono">
                    <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mb-1 overflow-hidden">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${ep.rateLimitUsed}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">{ep.rateLimitUsed}% quota</span>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      {ep.authType}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                    {ep.lastPing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
