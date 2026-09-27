import { ApiHealthSummary, BlockchainApiEndpoint } from '@/types/api';

export const MOCK_API_ENDPOINTS: BlockchainApiEndpoint[] = [
  {
    id: 'api-eth-trace',
    name: 'Ethereum Intelligence Forensics RPC',
    provider: 'ChainIndex Forensics / BlockNative LE',
    category: 'Layer 1 Indexer',
    network: 'Ethereum Mainnet',
    status: 'operational',
    latencyMs: 142,
    uptime90d: 99.98,
    requests24h: 842190,
    errorRate: 0.01,
    lastPing: '3 seconds ago',
    endpointUrl: 'https://rpc-forensics.internal.le/v2/eth/mainnet',
    authType: 'mTLS',
    rateLimitUsed: 38
  },
  {
    id: 'api-btc-utxo',
    name: 'Bitcoin UTXO & Peeling Cluster Engine',
    provider: 'TraceCore Analytics',
    category: 'UTXO Cluster Engine',
    network: 'Bitcoin Core',
    status: 'operational',
    latencyMs: 188,
    uptime90d: 99.94,
    requests24h: 421090,
    errorRate: 0.03,
    lastPing: '8 seconds ago',
    endpointUrl: 'https://utxo-cluster.le-forensics.net/v1/cluster',
    authType: 'Signed JWT',
    rateLimitUsed: 47
  },
  {
    id: 'api-poly-trace',
    name: 'Polygon FastTrace Forensics Gateway',
    provider: 'Polygon Forensic Labs',
    category: 'Layer 1 Indexer',
    network: 'Polygon PoS',
    status: 'operational',
    latencyMs: 110,
    uptime90d: 99.99,
    requests24h: 312800,
    errorRate: 0.01,
    lastPing: '5 seconds ago',
    endpointUrl: 'https://polygon-trace.gov-intelligence.org/rpc',
    authType: 'mTLS',
    rateLimitUsed: 22
  },
  {
    id: 'api-vasp-registry',
    name: 'Global VASP Identity & Custody Registry',
    provider: 'FATF Contact Group & Inter-Agency Feed',
    category: 'VASP Registry',
    network: 'Cross-Chain Universal',
    status: 'operational',
    latencyMs: 82,
    uptime90d: 99.99,
    requests24h: 120400,
    errorRate: 0.00,
    lastPing: '2 seconds ago',
    endpointUrl: 'https://vasp-directory.int-fiu.net/api/v3/entities',
    authType: 'API Key',
    rateLimitUsed: 19
  },
  {
    id: 'api-sanctions',
    name: 'OFAC / UN / EU Consolidated Sanctions Feed',
    provider: 'Treasury Watchlist Sentinel',
    category: 'Sanctions / OFAC',
    network: 'Global Specially Designated Nationals',
    status: 'operational',
    latencyMs: 64,
    uptime90d: 100.0,
    requests24h: 981200,
    errorRate: 0.00,
    lastPing: '1 second ago',
    endpointUrl: 'https://sanctions-feed.fincen.gov/v1/addresses',
    authType: 'Signed JWT',
    rateLimitUsed: 29
  },
  {
    id: 'api-mempool',
    name: 'Universal Mempool & Zero-Confirmation Stream',
    provider: 'Darkpool & Zero-Hop Monitor',
    category: 'Mempool Stream',
    network: 'ETH / BTC / BNB / POL',
    status: 'operational',
    latencyMs: 45,
    uptime90d: 99.89,
    requests24h: 1840000,
    errorRate: 0.04,
    lastPing: 'Just now',
    endpointUrl: 'wss://mempool-stream.cyber-intel.org/stream',
    authType: 'mTLS',
    rateLimitUsed: 61
  }
];

export const MOCK_API_SUMMARY: ApiHealthSummary = {
  overallHealth: 'Healthy',
  operationalCount: 6,
  totalApis: 6,
  avgLatencyMs: 105,
  totalRequestsToday: 4518480,
  lastSyncTimestamp: '2026-09-27T10:28:40Z'
};
