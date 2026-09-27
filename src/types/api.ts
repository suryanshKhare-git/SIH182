export type ApiStatus = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface BlockchainApiEndpoint {
  id: string;
  name: string;
  provider: string;
  category: 'Layer 1 Indexer' | 'UTXO Cluster Engine' | 'VASP Registry' | 'Sanctions / OFAC' | 'Mempool Stream';
  network: string;
  status: ApiStatus;
  latencyMs: number;
  uptime90d: number;
  requests24h: number;
  errorRate: number;
  lastPing: string;
  endpointUrl: string;
  authType: 'mTLS' | 'API Key' | 'Signed JWT';
  rateLimitUsed: number;
}

export interface ApiHealthSummary {
  overallHealth: 'Healthy' | 'Degraded' | 'Critical';
  operationalCount: number;
  totalApis: number;
  avgLatencyMs: number;
  totalRequestsToday: number;
  lastSyncTimestamp: string;
}
