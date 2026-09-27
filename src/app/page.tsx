'use client';

import React from 'react';
import { PrimarySearch } from '@/components/dashboard/PrimarySearch';
import { StatCards } from '@/components/dashboard/StatCards';
import { ForensicsGraph } from '@/components/graph/ForensicsGraph';
import { VaspAttributionTable } from '@/components/vasp/VaspAttributionTable';
import { WhatIfSimulator } from '@/components/paths/WhatIfSimulator';
import { RecentCasesTable } from '@/components/dashboard/RecentCasesTable';
import { useInvestigation } from '@/context/InvestigationContext';

export default function DashboardPage() {
  const { analysisResult, currentCase } = useInvestigation();

  return (
    <div className="space-y-6">
      <PrimarySearch />
      <StatCards />

      {analysisResult && (
        <ForensicsGraph
          nodes={analysisResult.graphNodes}
          edges={analysisResult.graphEdges}
          paths={analysisResult.paths}
          title={`Transaction Path & VASP Relationship Graph: ${currentCase.id}`}
          subtitle={`Multi-hop flow topology for target wallet ${currentCase.targetWallet.substring(0, 14)}...`}
        />
      )}

      {analysisResult && (
        <VaspAttributionTable vaspConnections={analysisResult.vaspConnections} />
      )}

      <WhatIfSimulator />
      <RecentCasesTable />
    </div>
  );
}
