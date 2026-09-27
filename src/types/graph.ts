import { EntityRole, Network } from './investigation';

export interface ForensicsNode {
  id: string;
  label: string;
  subLabel?: string;
  role: EntityRole;
  network: Network;
  address: string;
  hopDistance: number;
  balanceUsd?: number;
  balanceNative?: string;
  txCount?: number;
  totalSentUsd?: number;
  totalReceivedUsd?: number;
  riskScore?: number;
  clusterTag?: string;
  vaspName?: string;
  confidence?: number;
  isSuspect?: boolean;
  isFlagged?: boolean;
  x?: number;
  y?: number;
}

export interface ForensicsEdge {
  id: string;
  source: string;
  target: string;
  valueUsd: number;
  valueNative: string;
  txCount: number;
  txHashSample: string;
  direction: 'inflow' | 'outflow';
  timestamp: string;
  timeDelta?: string;
  token: string;
  isPrimaryPath?: boolean;
  confidenceScore?: number;
}

export interface TransactionPath {
  id: string;
  pathName: string;
  targetVasp: string;
  hopCount: number;
  totalVolumeUsd: number;
  confidenceScore: number;
  evidenceStrength: 'Strong' | 'Moderate' | 'Indirect';
  averageTimeDelta: string;
  nodes: ForensicsNode[];
  edges: ForensicsEdge[];
  summary: string;
}
