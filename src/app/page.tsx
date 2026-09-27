'use client';

import React from 'react';
import { PrimarySearch } from '@/components/dashboard/PrimarySearch';
import { StatCards } from '@/components/dashboard/StatCards';
import { ForensicsGraph } from '@/components/graph/ForensicsGraph';
import { CrossChainTracker } from '@/components/crosschain/CrossChainTracker';
import { NearestVaspCards } from '@/components/dashboard/NearestVaspCards';
import { VaspAttributionTable } from '@/components/vasp/VaspAttributionTable';
import { WhatIfSimulator } from '@/components/paths/WhatIfSimulator';
import { RecentCasesTable } from '@/components/dashboard/RecentCasesTable';
import { useInvestigation } from '@/context/InvestigationContext';

export default function DashboardPage() {
  const { analysisResult, currentCase } = useInvestigation();

  return (
    <div className="space-y-6">
      {/* 1. Unknown Wallet Analysis Search */}
      <PrimarySearch />

      {/* High-Level Forensic Metrics */}
      <StatCards />

      {/* 2. AI Transaction Graph (Multi-Hop Forensics with AI Analysis Button) */}
      {analysisResult && (
        <ForensicsGraph
          nodes={analysisResult.graphNodes}
          edges={analysisResult.graphEdges}
          paths={analysisResult.paths}
          title={`AI Transaction Graph & Pathway Forensics: ${currentCase.id}`}
          subtitle={`Multi-hop flow topology for target wallet ${currentCase.targetWallet.substring(0, 14)}...`}
        />
      )}

      {/* 3. Cross-Chain Tracking (Ethereum, Bitcoin, Polygon, BNB Chain) */}
      <CrossChainTracker showTitle={true} />

      {/* 4. VASP Confidence & Evidence Score Cards */}
      {analysisResult && (
        <NearestVaspCards vaspConnections={analysisResult.vaspConnections} />
      )}

      {/* Detailed VASP Core Table */}
      {analysisResult && (
        <VaspAttributionTable vaspConnections={analysisResult.vaspConnections} />
      )}

      {/* 5. What-If Counterfactual Simulator */}
      <WhatIfSimulator />

      {/* Active Investigations Dossier Table */}
      <RecentCasesTable />
    </div>
  );
}
