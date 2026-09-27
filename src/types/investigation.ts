export type Network = 'Ethereum' | 'Bitcoin' | 'Polygon' | 'BNB Chain' | 'Arbitrum' | 'Solana';

export type EntityRole = 
  | 'unknown_wallet' 
  | 'intermediary' 
  | 'vasp' 
  | 'cluster' 
  | 'suspicious' 
  | 'mixer' 
  | 'bridge';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export type CaseStatus = 'active' | 'in_progress' | 'flagged' | 'completed' | 'archived';

export interface InvestigationCase {
  id: string;
  caseReference: string;
  title: string;
  targetWallet: string;
  network: Network;
  status: CaseStatus;
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignedInvestigator: string;
  agency: string;
  createdAt: string;
  updatedAt: string;
  firstObserved: string;
  lastActive: string;
  balanceUsd: number;
  balanceNative: string;
  txCount: number;
  incomingVolumeUsd: number;
  outgoingVolumeUsd: number;
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  riskSummary: string;
  vaspCount: number;
  nearestVasp: string;
  nearestHop: number;
  confidence: number;
  tags: string[];
  notes: string;
}

export interface WatchlistWallet {
  id: string;
  address: string;
  label: string;
  network: Network;
  addedAt: string;
  lastActivity: string;
  unseenTxs: number;
  riskScore: number;
  recentVasp: string;
  recentHop: number;
  changeStatus: 'new_transaction' | 'vasp_attributed' | 'idle' | 'high_velocity';
}
