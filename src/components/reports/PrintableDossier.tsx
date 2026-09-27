'use client';

import React from 'react';
import { InvestigationCase } from '@/types/investigation';
import { VaspConnection } from '@/types/vasp';
import { TransactionPath } from '@/types/graph';
import { RiskProfile } from '@/types/risk';
import { Printer, Download } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface PrintableDossierProps {
  caseData: InvestigationCase;
  vaspConnections: VaspConnection[];
  paths: TransactionPath[];
  riskProfile: RiskProfile;
}

export function PrintableDossier({
  caseData,
  vaspConnections,
  paths,
  riskProfile
}: PrintableDossierProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const data = {
      caseData,
      vaspConnections,
      paths,
      riskProfile,
      generatedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VASP-FORENSIC-DOSSIER-${caseData.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="print:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono uppercase">
            Courtroom Forensic Dossier Generator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Export a certified chain-of-custody intelligence brief ready for judicial submission or mutual legal assistance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJson}
            className="px-3 py-1.5 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-xs flex items-center gap-1.5 transition-colors uppercase font-mono"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Forensic Report</span>
          </button>
        </div>
      </div>

      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-lg border border-slate-200 shadow-md print:shadow-none print:border-none print:p-0 max-w-4xl mx-auto">
        <div className="border-b-2 border-slate-900 pb-4 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                CONFIDENTIAL LAW ENFORCEMENT INTELLIGENCE REPORT
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1 uppercase font-serif">
                Blockchain Attribution & VASP Nexus Dossier
              </h1>
              <div className="text-xs font-mono text-slate-600 mt-1">
                SIH Problem Statement 26182 · Automated VASP Attribution Engine v2.6
              </div>
            </div>

            <div className="text-right font-mono text-xs text-slate-600 space-y-0.5">
              <div>
                <span className="font-bold text-slate-900">DOSSIER REF:</span> {caseData.id}
              </div>
              <div>
                <span className="font-bold text-slate-900">DATE:</span> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div>
                <span className="font-bold text-slate-900">CUSTODY HASH:</span> SHA256:7f9a2c...b81
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-slate-50 border border-slate-200 rounded mb-6 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Investigator</span>
            <span className="font-bold text-slate-900">{caseData.assignedInvestigator}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Jurisdiction Agency</span>
            <span className="font-bold text-slate-900">{caseData.agency}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Case Priority</span>
            <span className="font-bold uppercase text-slate-900">{caseData.priority}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Investigation Status</span>
            <span className="font-bold uppercase text-slate-900">{caseData.status}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase font-mono tracking-wider border-b border-slate-300 pb-1 mb-3 text-slate-800">
            1. Target Subject Wallet Profile
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded col-span-2">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">
                Target Address ({caseData.network})
              </span>
              <span className="font-mono font-bold text-slate-900 break-all select-all">
                {caseData.targetWallet}
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">Current Balance</span>
              <span className="font-mono font-bold text-slate-900">
                {caseData.balanceNative} ({formatCurrency(caseData.balanceUsd)})
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">Total Dispersed</span>
              <span className="font-mono font-bold text-slate-900">
                {formatCurrency(caseData.outgoingVolumeUsd)}
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">First Observed</span>
              <span className="font-mono text-slate-900">{caseData.firstObserved}</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">Last Active</span>
              <span className="font-mono text-slate-900">{caseData.lastActive}</span>
            </div>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-2.5 rounded border border-slate-200">
            <strong>Case Synopsis:</strong> {caseData.notes}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase font-mono tracking-wider border-b border-slate-300 pb-1 mb-3 text-slate-800">
            2. Attributed Virtual Asset Service Providers (VASPs)
          </h2>
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 font-mono uppercase text-[10px] text-slate-600 border-b border-slate-200">
              <tr>
                <th className="p-2">VASP Name</th>
                <th className="p-2">Network</th>
                <th className="p-2">Hops</th>
                <th className="p-2">Transactions</th>
                <th className="p-2">Volume</th>
                <th className="p-2">Confidence</th>
                <th className="p-2">Subpoena Jurisdiction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {vaspConnections.map((conn) => (
                <tr key={conn.id}>
                  <td className="p-2 font-bold text-slate-900">{conn.vaspName}</td>
                  <td className="p-2 font-mono">{conn.network}</td>
                  <td className="p-2 font-mono">{conn.hopDistance} hops</td>
                  <td className="p-2 font-mono">{conn.txCount} txs</td>
                  <td className="p-2 font-mono font-bold">{formatCurrency(conn.volumeUsd)}</td>
                  <td className="p-2 font-mono font-bold text-slate-900">{conn.confidenceScore}%</td>
                  <td className="p-2 text-slate-600">{conn.jurisdiction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase font-mono tracking-wider border-b border-slate-300 pb-1 mb-3 text-slate-800">
            3. Forensic Risk Signal Evaluation
          </h2>
          <div className="space-y-2 text-xs">
            {riskProfile.signals.map((sig) => (
              <div key={sig.id} className="p-2 border border-slate-200 rounded flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900">{sig.name} ({sig.category})</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">{sig.forensicObservation}</div>
                </div>
                <div className="text-right font-mono shrink-0 ml-3">
                  <span className="font-bold text-slate-900">{sig.level} Risk</span>
                  <div className="text-[10px] text-slate-500">{sig.metricValue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded text-xs">
          <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-900 mb-2">
            4. Recommended Subpoena & Legal Actions
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            {riskProfile.recommendedLawEnforcementSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-slate-900 flex justify-between items-end text-xs font-mono">
          <div>
            <div className="font-bold uppercase text-slate-900">CERTIFIED DIGITAL EVIDENCE RECORD</div>
            <div className="text-slate-500 text-[10px]">
              Produced in compliance with Federal Rules of Evidence Rule 902(13) / (14)
            </div>
          </div>
          <div className="text-right">
            <div className="border-b border-slate-400 w-48 mb-1" />
            <div className="font-bold text-slate-900">{caseData.assignedInvestigator}</div>
            <div className="text-[10px] text-slate-500">Forensics Officer Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
}
