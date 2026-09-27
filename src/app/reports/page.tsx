'use client';

import React, { useState } from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { PrintableDossier } from '@/components/reports/PrintableDossier';
import {
  FileText,
  Plus,
  Eye,
  Download,
  Archive,
  Printer,
  X,
  FileCheck2
} from 'lucide-react';
import { formatAddress } from '@/utils/formatters';

interface ReportItem {
  id: string;
  investigationId: string;
  caseTitle: string;
  wallet: string;
  network: string;
  created: string;
  analyst: string;
  status: 'Certified' | 'Judicial Review' | 'Archived';
  confidence: number;
  nearestVasp: string;
}

export default function ReportsPage() {
  const { currentCase, analysisResult } = useInvestigation();

  const [reports, setReports] = useState<ReportItem[]>([
    {
      id: 'REP-2026-081',
      investigationId: 'INV-2026-001',
      caseTitle: 'LockBit Ransomware Extortion Campaign',
      wallet: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      network: 'Ethereum',
      created: '2026-09-26 14:22',
      analyst: 'Inv. S. Khare (CCU-842)',
      status: 'Certified',
      confidence: 89,
      nearestVasp: 'Exchange Alpha'
    },
    {
      id: 'REP-2026-074',
      investigationId: 'INV-2026-002',
      caseTitle: 'Darknet Narcotics Syndicate Laundering',
      wallet: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      network: 'Bitcoin',
      created: '2026-09-25 18:45',
      analyst: 'Agent M. Thorne (DEA-CI)',
      status: 'Judicial Review',
      confidence: 94,
      nearestVasp: 'Exchange Beta'
    },
    {
      id: 'REP-2026-068',
      investigationId: 'INV-2026-003',
      caseTitle: 'ERC-20 Phishing Token Drainer',
      wallet: '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be',
      network: 'Polygon',
      created: '2026-09-24 11:10',
      analyst: 'Analyst P. Verma (CERT-In)',
      status: 'Certified',
      confidence: 76,
      nearestVasp: 'Exchange Gamma'
    },
    {
      id: 'REP-2026-052',
      investigationId: 'INV-2026-004',
      caseTitle: 'DeFi Exploit & Peeling Chain Flow',
      wallet: '0x0d0707963952f2fba59dd06f2b425ace40b492fe',
      network: 'BNB Chain',
      created: '2026-09-21 09:30',
      analyst: 'Special Agent D. Ross (FBI-IC3)',
      status: 'Archived',
      confidence: 68,
      nearestVasp: 'Exchange Delta'
    }
  ]);

  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [analystNotes, setAnalystNotes] = useState(
    'Subject wallet demonstrates algorithmic peeling activity within 42 minutes of primary ransom deposit. Two-hop proximity to Tier-1 VASP with KYC onboarding mandates warrant immediate preservation order.'
  );

  const activeReport = reports.find((r) => r.id === activeReportId);

  const handleGenerateReport = () => {
    const newReport: ReportItem = {
      id: `REP-2026-${String(Math.floor(Math.random() * 800) + 100).padStart(3, '0')}`,
      investigationId: currentCase.id,
      caseTitle: currentCase.title,
      wallet: currentCase.targetWallet,
      network: currentCase.network,
      created: new Date().toISOString().replace('T', ' ').substring(0, 16),
      analyst: `${currentCase.assignedInvestigator} (${currentCase.agency})`,
      status: 'Certified',
      confidence: currentCase.confidence,
      nearestVasp: currentCase.nearestVasp
    };

    setReports([newReport, ...reports]);
    setActiveReportId(newReport.id);
    setShowGenerateModal(false);
  };

  const handleArchive = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Archived' } : r))
    );
  };

  const handleExportJson = (report: ReportItem) => {
    const data = {
      reportId: report.id,
      investigationId: report.investigationId,
      caseTitle: report.caseTitle,
      wallet: report.wallet,
      network: report.network,
      created: report.created,
      analyst: report.analyst,
      confidenceScore: report.confidence,
      nearestVaspAttributed: report.nearestVasp,
      analystNotes,
      evidenceSummary: analysisResult?.evidenceList || []
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CHAINTRACE-${report.id}-DOSSIER.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: ReportItem['status']) => {
    switch (status) {
      case 'Certified':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Judicial Review':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Archived':
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
              Forensic Reports & Evidence Dossiers
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              AUDITED RECORDS
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Export courtroom-certified intelligence dossiers with complete chain-of-custody, VASP attributions, and analyst notes.
          </p>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="px-4 py-2 rounded text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-xs flex items-center gap-1.5 transition-colors uppercase font-mono"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>GENERATE REPORT</span>
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              Generated Investigative Reports
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select any report to inspect preview, print formal brief, or export certified JSON.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">{reports.length} Reports Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-mono text-[11px] uppercase tracking-wider select-none">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Report ID</th>
                <th className="py-2.5 px-3 font-semibold">Investigation</th>
                <th className="py-2.5 px-3 font-semibold">Created</th>
                <th className="py-2.5 px-3 font-semibold">Analyst</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {reports.map((rep) => {
                const isSelected = activeReportId === rep.id;
                return (
                  <tr
                    key={rep.id}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-blue-50/70 dark:bg-blue-950/40'
                        : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold font-mono text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{rep.id}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {rep.network} · {rep.confidence}% Conf.
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {rep.investigationId}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs">
                        {rep.caseTitle}
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                      {rep.created}
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300 text-[11px]">
                      {rep.analyst}
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getStatusBadge(
                          rep.status
                        )}`}
                      >
                        {rep.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setActiveReportId(isSelected ? null : rep.id)}
                          className="px-2 py-1 rounded text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 flex items-center gap-1 font-mono transition-colors"
                          title="View Report Preview"
                        >
                          <Eye className="w-3 h-3" />
                          <span>{isSelected ? 'Hide' : 'View'}</span>
                        </button>

                        <button
                          onClick={() => handleExportJson(rep)}
                          className="px-2 py-1 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700 flex items-center gap-1 font-mono transition-colors"
                          title="Export JSON"
                        >
                          <Download className="w-3 h-3" />
                          <span>Export</span>
                        </button>

                        <button
                          onClick={() => handleArchive(rep.id)}
                          disabled={rep.status === 'Archived'}
                          className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-30 transition-colors"
                          title="Archive Report"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Preview Section if a report is selected */}
      {activeReport && analysisResult && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-lg border border-slate-800">
            <div>
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                Viewing Report: {activeReport.id}
              </div>
              <h3 className="text-sm font-bold mt-0.5">
                {activeReport.caseTitle} — {activeReport.investigationId}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Dossier</span>
              </button>
              <button
                onClick={() => setActiveReportId(null)}
                className="p-1.5 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <PrintableDossier
            caseData={currentCase}
            vaspConnections={analysisResult.vaspConnections}
            paths={analysisResult.paths}
            riskProfile={analysisResult.riskProfile}
          />
        </div>
      )}

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl p-5 text-xs select-none">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-bold font-mono text-sm text-slate-900 dark:text-slate-100 uppercase">
                    Generate Certified Investigation Dossier
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Case: {currentCase.id} · {currentCase.network}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 space-y-3">
              <div className="p-3 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 font-mono text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Wallet:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {formatAddress(currentCase.targetWallet, 10, 8)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nearest Attributed VASP:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {currentCase.nearestVasp} ({currentCase.nearestHop} hops)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Topological Confidence:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {currentCase.confidence}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lead Investigator:</span>
                  <span>{currentCase.assignedInvestigator}</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1 font-semibold">
                  Analyst Investigative Findings & Notes:
                </label>
                <textarea
                  rows={4}
                  value={analystNotes}
                  onChange={(e) => setAnalystNotes(e.target.value)}
                  className="w-full p-2.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="p-2.5 rounded bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                The generated dossier bundles complete topological graphs, multi-hop pathways, corroborating transaction hashes, and court-admissible disclaimers compliant with FATF Recommendation 16.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="px-3 py-1.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold font-mono"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold font-mono shadow-xs"
              >
                Confirm & Certify Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
