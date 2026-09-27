'use client';

import React, { use, useEffect } from 'react';
import { useInvestigation } from '@/context/InvestigationContext';
import { InvestigationStepper } from '@/components/investigation/InvestigationStepper';
import { WalletOverviewCard } from '@/components/investigation/WalletOverviewCard';
import { ForensicsGraph } from '@/components/graph/ForensicsGraph';
import { CrossChainTracker } from '@/components/crosschain/CrossChainTracker';
import { NearestVaspCards } from '@/components/dashboard/NearestVaspCards';
import { VaspAttributionTable } from '@/components/vasp/VaspAttributionTable';
import { RiskSignalBreakdown } from '@/components/risk/RiskSignalBreakdown';
import { InvestigationTimeline } from '@/components/timeline/InvestigationTimeline';
import { EvidenceChainView } from '@/components/evidence/EvidenceChainView';
import { ArrowLeft, FileText, Globe } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function InvestigationDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { currentCase, allCases, loadCase, analysisResult } = useInvestigation();

  useEffect(() => {
    if (resolvedParams.id && resolvedParams.id !== currentCase.id) {
      loadCase(resolvedParams.id);
    }
  }, [resolvedParams.id, currentCase.id, loadCase]);

  const targetCase = allCases.find((c) => c.id === resolvedParams.id) || currentCase;

  return (
    <div className="space-y-6">
      {/* Dossier Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/investigations"
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                {targetCase.id}
              </span>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase font-mono">
                {targetCase.title}
              </h1>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Agency: {targetCase.agency} · Investigator: {targetCase.assignedInvestigator}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/cross-chain"
            className="px-3 py-1.5 rounded text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 flex items-center gap-1.5 font-mono transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Cross-Chain Trace</span>
          </Link>
          <Link
            href="/reports"
            className="px-3 py-1.5 rounded text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 flex items-center gap-1.5 font-mono transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </Link>
        </div>
      </div>

      {/* 1. Lifecycle Stepper */}
      <InvestigationStepper />

      {/* Wallet Overview Summary Card */}
      <WalletOverviewCard caseData={targetCase} />

      {/* 2. AI Transaction Graph */}
      {analysisResult && (
        <ForensicsGraph
          nodes={analysisResult.graphNodes}
          edges={analysisResult.graphEdges}
          paths={analysisResult.paths}
          title={`Attribution Topology: ${targetCase.id}`}
          subtitle={`Multi-hop transaction paths leading to identified VASPs and custodial points`}
        />
      )}

      {/* 3. Cross-Chain Tracking */}
      <CrossChainTracker showTitle={true} />

      {/* 4. VASP Confidence & Evidence Scores */}
      {analysisResult && (
        <NearestVaspCards vaspConnections={analysisResult.vaspConnections} />
      )}

      {/* Detailed VASP Core Table */}
      {analysisResult && (
        <VaspAttributionTable vaspConnections={analysisResult.vaspConnections} />
      )}

      {/* 5. Explainable Forensic Signals */}
      {analysisResult && (
        <RiskSignalBreakdown riskProfile={analysisResult.riskProfile} />
      )}

      {/* Forensic Timeline */}
      <InvestigationTimeline />

      {/* Cryptographic Evidence Chain */}
      {analysisResult && (
        <EvidenceChainView
          evidenceList={analysisResult.evidenceList}
          title="Consolidated On-Chain Evidence Chain"
          confidenceScore={targetCase.confidence}
        />
      )}
    </div>
  );
}
