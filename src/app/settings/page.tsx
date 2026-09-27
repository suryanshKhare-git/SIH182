'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useInvestigation } from '@/context/InvestigationContext';
import { Network } from '@/types/investigation';
import {
  Moon,
  Sun,
  Monitor,
  Bell,
  Sliders,
  Key,
  Shield,
  Save,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  Lock,
  Layers
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { selectedNetwork, setSelectedNetwork } = useInvestigation();

  const [savedSection, setSavedSection] = useState<string | null>(null);

  // Appearance
  const [density, setDensity] = useState<'compact' | 'comfortable'>('compact');

  // Notifications
  const [notifyHighRisk, setNotifyHighRisk] = useState(true);
  const [notifyVaspMatch, setNotifyVaspMatch] = useState(true);
  const [notifyLargeTransfers, setNotifyLargeTransfers] = useState(true);

  // Investigation Preferences
  const [defaultHops, setDefaultHops] = useState(3);
  const [minTxFilter, setMinTxFilter] = useState(1000);
  const [strictTravelRule, setStrictTravelRule] = useState(true);
  const [autoDetectNetwork, setAutoDetectNetwork] = useState(true);

  // API Configuration (Masked Demo Keys)
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [apiKeys, setApiKeys] = useState({
    ethApi: 'eth_live_89fa920bc84d8912e98a3b',
    btcApi: 'btc_mainnet_6182_secret_cluster_9a',
    polyApi: 'poly_node_2026_98cfb12984a',
    bscApi: 'bsc_archive_4421_indexer_87b',
    vaspRegistryApi: 'fatf_vasp_auth_travelrule_v2_9982'
  });
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  // Security
  const [sessionTimeout, setSessionTimeout] = useState('30m');
  const [auditLevel, setAuditLevel] = useState('detailed');

  const toggleKeyVisibility = (key: string) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (section: string) => {
    setSavedSection(section);
    setTimeout(() => setSavedSection(null), 2000);
  };

  const testApiConnection = () => {
    setPingStatus('testing');
    setTimeout(() => {
      setPingStatus('success');
      setTimeout(() => setPingStatus(null), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
            Workstation Settings & Configuration
          </h1>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            SYSTEM PREFERENCES
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure forensic visualization, threshold heuristics, API connection keys, and operational security parameters.
        </p>
      </div>

      {/* 1. Appearance */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Appearance
            </h2>
          </div>
          {savedSection === 'appearance' && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-2 font-semibold">
              Interface Color Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
                  theme === 'dark'
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/60 ring-1 ring-blue-600/30 font-bold text-blue-900 dark:text-blue-200'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Dark Mode</div>
                  <div className="text-[10px] text-slate-400">Cyber Forensics Command</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
                  theme === 'light'
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/60 ring-1 ring-blue-600/30 font-bold text-blue-900 dark:text-blue-200'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded bg-white border border-slate-300 flex items-center justify-center text-amber-500">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Light Mode</div>
                  <div className="text-[10px] text-slate-400">High Contrast Audit</div>
                </div>
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                Data Density Mode
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Compact layout maximizes visible transaction nodes and table records.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDensity('compact')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                  density === 'compact'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Compact (Forensic)
              </button>
              <button
                type="button"
                onClick={() => setDensity('comfortable')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                  density === 'comfortable'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Comfortable
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => handleSave('appearance')}
              className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs flex items-center gap-1.5"
            >
              <Save className="w-3 h-3" />
              <span>Save Appearance</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Notifications */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Notifications
            </h2>
          </div>
          {savedSection === 'notifications' && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">High-Risk Signal Trigger</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Notify immediately when subject address initiates mixer interaction or rapid peeling sweep.
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifyHighRisk}
              onChange={(e) => setNotifyHighRisk(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">VASP Attribution Match Alert</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Send workstation alert when transaction flows reach a verified exchange hot wallet within 3 hops.
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifyVaspMatch}
              onChange={(e) => setNotifyVaspMatch(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">High-Value Transfer Threshold Alert</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Alert on single transaction flows exceeding FATF $10,000 Travel Rule benchmark.
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifyLargeTransfers}
              onChange={(e) => setNotifyLargeTransfers(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => handleSave('notifications')}
              className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs flex items-center gap-1.5"
            >
              <Save className="w-3 h-3" />
              <span>Save Notifications</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Default Blockchain */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Default Blockchain
            </h2>
          </div>
          {savedSection === 'blockchain' && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-1 font-semibold">
              Primary Chain for New Investigation Workspaces
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Ethereum', 'Bitcoin', 'Polygon', 'BNB Chain'] as Network[]).map((net) => (
                <button
                  key={net}
                  type="button"
                  onClick={() => setSelectedNetwork(net)}
                  className={`p-2.5 rounded-lg border font-mono text-center transition-all ${
                    selectedNetwork === net
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold ring-1 ring-blue-600/30'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {net}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                Auto-Detect Chain from Address Syntax
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Automatically switch indexer to Bitcoin for bc1/1/3 prefixes, and EVM for 0x format.
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoDetectNetwork}
              onChange={(e) => setAutoDetectNetwork(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => handleSave('blockchain')}
              className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs flex items-center gap-1.5"
            >
              <Save className="w-3 h-3" />
              <span>Save Default Chain</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Investigation Preferences */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Investigation Preferences
            </h2>
          </div>
          {savedSection === 'preferences' && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-1 font-semibold">
                Default Max Hop Radius (1 - 5)
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((hop) => (
                  <button
                    key={hop}
                    type="button"
                    onClick={() => setDefaultHops(hop)}
                    className={`flex-1 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                      defaultHops === hop
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {hop}h
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Default analysis depth for newly entered addresses.</p>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-1 font-semibold">
                Minimum Transaction Value Cutoff (USD)
              </label>
              <select
                value={minTxFilter}
                onChange={(e) => setMinTxFilter(Number(e.target.value))}
                className="w-full p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs"
              >
                <option value={0}>No Threshold ($0 - Include Dust)</option>
                <option value={1000}>$1,000 (Standard Forensic)</option>
                <option value={5000}>$5,000 (Substantial Transfers)</option>
                <option value={10000}>$10,000 (FATF Red Flag Minimum)</option>
              </select>
              <p className="text-[10px] text-slate-400 mt-1">Filters micro-relays and spam transactions from graph.</p>
            </div>
          </div>

          <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                Strict FATF Travel Rule Validation
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Only attribute VASPs that possess registered legal compliance intake portals and LE guidelines.
              </div>
            </div>
            <input
              type="checkbox"
              checked={strictTravelRule}
              onChange={(e) => setStrictTravelRule(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => handleSave('preferences')}
              className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs flex items-center gap-1.5"
            >
              <Save className="w-3 h-3" />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. API Configuration */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
                API Configuration
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Configured blockchain indexer credentials (masked demo environment values).
            </p>
          </div>

          <button
            onClick={testApiConnection}
            className="px-3 py-1.5 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 font-mono transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${pingStatus === 'testing' ? 'animate-spin text-blue-500' : ''}`} />
            <span>
              {pingStatus === 'testing'
                ? 'Pinging APIs...'
                : pingStatus === 'success'
                ? 'All Nodes OK ✓'
                : 'Test API Health'}
            </span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {[
            { id: 'ethApi', label: 'Ethereum Archive Node / Etherscan API Key', net: 'Ethereum' },
            { id: 'btcApi', label: 'Bitcoin UTXO Indexer / Blockstream API', net: 'Bitcoin' },
            { id: 'polyApi', label: 'Polygonscan Enterprise Gateway', net: 'Polygon' },
            { id: 'bscApi', label: 'BNB Smart Chain Archive Cluster', net: 'BNB Chain' },
            { id: 'vaspRegistryApi', label: 'Global VASP Identity Registry (FATF Travel Rule)', net: 'Custodial Registry' }
          ].map((api) => {
            const isVisible = showKeys[api.id];
            const currentVal = apiKeys[api.id as keyof typeof apiKeys];

            return (
              <div
                key={api.id}
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-750 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {api.label}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Scope: {api.net}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative font-mono">
                    <input
                      type={isVisible ? 'text' : 'password'}
                      value={currentVal}
                      onChange={(e) =>
                        setApiKeys({ ...apiKeys, [api.id]: e.target.value })
                      }
                      className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs w-56 sm:w-64"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleKeyVisibility(api.id)}
                    className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                    title={isVisible ? 'Mask key' : 'Show key'}
                  >
                    {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => handleSave('api')}
              className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs flex items-center gap-1.5"
            >
              <Save className="w-3 h-3" />
              <span>Save API Credentials</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. Security */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Security & Audit
            </h2>
          </div>
          {savedSection === 'security' && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                Session Idle Lockout
              </label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs"
              >
                <option value="15m">15 Minutes</option>
                <option value="30m">30 Minutes (Recommended)</option>
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                Audit Log Verbosity
              </label>
              <select
                value={auditLevel}
                onChange={(e) => setAuditLevel(e.target.value)}
                className="w-full p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs"
              >
                <option value="detailed">Detailed (Includes Query Hashes)</option>
                <option value="forensic">Court-Admissible Full Forensic</option>
                <option value="standard">Standard Operation</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                Hardware Token Authentication
              </label>
              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 font-mono text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>YubiKey FIDO2 Active</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-750 font-mono text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
            <div>Cryptographic Integrity Signature: <span className="font-bold text-slate-700 dark:text-slate-300">SHA256:4a88f...109bc</span></div>
            <div>Database Encryption: AES-256-GCM (At Rest & In Transit)</div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => handleSave('security')}
              className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs flex items-center gap-1.5"
            >
              <Save className="w-3 h-3" />
              <span>Save Security Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
