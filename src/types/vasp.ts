import { Network } from './investigation';

export type VaspType = 
  | 'Centralized Exchange (CEX)'
  | 'Custodial Broker'
  | 'DeFi Liquidity Hub'
  | 'Payment Gateway'
  | 'OTC Trading Desk'
  | 'P2P Platform';

export interface EvidenceItem {
  id: string;
  type: 'direct_transfer' | 'multi_hop_path' | 'co_spend_cluster' | 'timing_correlation' | 'deposit_tag' | 'mempool_signature';
  title: string;
  description: string;
  confidenceContribution: number;
  verified: boolean;
  timestamp: string;
  txHash?: string;
  blockNumber?: number;
  sourceApi: string;
  legalRelevance: string;
}

export interface VaspConnection {
  id: string;
  vaspName: string;
  vaspCode: string;
  vaspType: VaspType;
  jurisdiction: string;
  regulatoryStatus: string;
  fatfCompliant: boolean;
  network: Network;
  hopDistance: number;
  txCount: number;
  volumeUsd: number;
  firstObserved: string;
  lastObserved: string;
  confidenceScore: number;
  confidenceRating: 'high' | 'medium' | 'low';
  attributionMethod: string;
  depositClusterAddress: string;
  clusterSize: number;
  evidenceCount: number;
  evidenceList: EvidenceItem[];
  subpoenaProcess: {
    lawEnforcementPortal: string;
    avgResponseDays: number;
    requiredLegalInstrument: string;
    complianceOffice: string;
  };
}

export interface VaspEntity {
  id: string;
  name: string;
  code: string;
  type: VaspType;
  headquarters: string;
  jurisdiction: string;
  regulator: string;
  fatfStatus: 'Fully Compliant' | 'Partial' | 'Non-Compliant';
  riskRating: 'Low' | 'Moderate' | 'High';
  knownHotWallets: number;
  associatedClusters: number;
  supportedNetworks: Network[];
  leFocalPointEmail: string;
  verifiedDepositPatterns: string[];
}
