import { Network } from '@/types/investigation';

export interface CrossChainTransition {
  id: string;
  sourceChain: Network;
  destChain: Network;
  bridgeProtocol: string;
  sourceTxHash: string;
  destTxHash: string;
  senderAddress: string;
  receiverAddress: string;
  asset: string;
  amount: number;
  amountUsd: number;
  timestamp: string;
  status: 'confirmed' | 'pending' | 'flagged';
  latencyMinutes: number;
  connectedVasp: {
    name: string;
    confidence: number;
    hopDistance: number;
  };
}

export interface CrossChainWalletProfile {
  chain: Network;
  address: string;
  balanceNative: string;
  balanceUsd: number;
  txCount: number;
  volumeUsd: number;
  intermediaryCount: number;
  likelyVasp: string;
  confidenceScore: number;
  hopDistance: number;
  status: 'active' | 'dormant' | 'swept';
  evidenceSummary: {
    hopDistanceDesc: string;
    txFrequencyDesc: string;
    volumeDesc: string;
    relationshipDesc: string;
  };
}

export const MOCK_CROSS_CHAIN_PROFILES: Record<string, CrossChainWalletProfile[]> = {
  'INV-2026-001': [
    {
      chain: 'Ethereum',
      address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      balanceNative: '54.21 ETH',
      balanceUsd: 142580,
      txCount: 47,
      volumeUsd: 1845000,
      intermediaryCount: 3,
      likelyVasp: 'Exchange Alpha (Binance Global)',
      confidenceScore: 89,
      hopDistance: 2,
      status: 'active',
      evidenceSummary: {
        hopDistanceDesc: '2 Hops: Direct counterparty peel relay into custodial hot cluster within 38 minutes',
        txFrequencyDesc: '18 Transactions: Recurring 4-hour settlement cadence following extortion event',
        volumeDesc: '$1,420,000 USD (84.2% of total target wallet outflow attributed to this conduit)',
        relationshipDesc: 'Deposit Cluster Signature: Deterministic sweeping into verified Binance Hot Wallet 6'
      }
    },
    {
      chain: 'Polygon',
      address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      balanceNative: '45,200 POL',
      balanceUsd: 31640,
      txCount: 28,
      volumeUsd: 450000,
      intermediaryCount: 1,
      likelyVasp: 'Kraken Institutional',
      confidenceScore: 94,
      hopDistance: 1,
      status: 'active',
      evidenceSummary: {
        hopDistanceDesc: '1 Hop: Direct conduit from Stargate bridge output into Kraken custody account',
        txFrequencyDesc: '24 Transactions: High velocity intraday liquidity routing via QuickSwap router',
        volumeDesc: '$425,000 USD (94.4% of total bridged Polygon liquidity)',
        relationshipDesc: 'KYC Verified Hot Vault #3: Direct attribution to Kraken EU Clearing Pool'
      }
    },
    {
      chain: 'BNB Chain',
      address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      balanceNative: '82.4 BNB',
      balanceUsd: 48616,
      txCount: 19,
      volumeUsd: 310000,
      intermediaryCount: 2,
      likelyVasp: 'OKX Global',
      confidenceScore: 79,
      hopDistance: 2,
      status: 'active',
      evidenceSummary: {
        hopDistanceDesc: '2 Hops: Layered across 2 intermediary liquidity pools before VASP ingestion',
        txFrequencyDesc: '14 Transactions: Batched weekly settlements matching programmatic schedule',
        volumeDesc: '$295,000 USD (95.1% of bridged capital reaching destination)',
        relationshipDesc: 'Sub-Account Identifier: Destination address tagged with OKX memo deposit pattern'
      }
    },
    {
      chain: 'Bitcoin',
      address: 'bc1q9x3d82a7f5l098k2n9m4p6r1t8w5y3z7q2c4e6',
      balanceNative: '1.84 BTC',
      balanceUsd: 123280,
      txCount: 34,
      volumeUsd: 360000,
      intermediaryCount: 3,
      likelyVasp: 'Bitfinex Cluster',
      confidenceScore: 82,
      hopDistance: 3,
      status: 'dormant',
      evidenceSummary: {
        hopDistanceDesc: '3 Hops: UTXO peeling chain with change address consolidation',
        txFrequencyDesc: '31 Transactions: Unspent output aggregation over 14 calendar days',
        volumeDesc: '$360,000 USD (76.8% of identified Bitcoin cluster volume)',
        relationshipDesc: 'Common-Input Heuristic: Co-spend cluster verified against Bitfinex cold treasury reserve'
      }
    }
  ]
};

export const MOCK_CROSS_CHAIN_TRANSITIONS: Record<string, CrossChainTransition[]> = {
  'INV-2026-001': [
    {
      id: 'bridge-tx-01',
      sourceChain: 'Ethereum',
      destChain: 'Polygon',
      bridgeProtocol: 'Stargate Finance (LayerZero Bridge)',
      sourceTxHash: '0x89fa21ace84b1298d0092cbe381923fa12984128941029831209381029831092',
      destTxHash: '0x2289cf0192847192837491028374910283749102837491028374910283749102',
      senderAddress: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      receiverAddress: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      asset: 'USDC',
      amount: 450000,
      amountUsd: 450000,
      timestamp: '2026-09-14T17:42:00Z',
      status: 'confirmed',
      latencyMinutes: 12,
      connectedVasp: {
        name: 'Kraken Institutional',
        confidence: 94,
        hopDistance: 1
      }
    },
    {
      id: 'bridge-tx-02',
      sourceChain: 'Polygon',
      destChain: 'BNB Chain',
      bridgeProtocol: 'Hop Protocol (Arbitrage Router)',
      sourceTxHash: '0x32de00ef91823746192837461928374619283746192837461928374619283746',
      destTxHash: '0x991823abce847192837461928374619283746192837461928374619283746192',
      senderAddress: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      receiverAddress: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      asset: 'USDT',
      amount: 310000,
      amountUsd: 310000,
      timestamp: '2026-09-15T09:18:00Z',
      status: 'confirmed',
      latencyMinutes: 8,
      connectedVasp: {
        name: 'OKX Global',
        confidence: 79,
        hopDistance: 2
      }
    },
    {
      id: 'bridge-tx-03',
      sourceChain: 'Bitcoin',
      destChain: 'Ethereum',
      bridgeProtocol: 'ThorChain Native Cross-Chain Vault',
      sourceTxHash: '7f8a129038472910283746192837461928374619283746192837461928374619',
      destTxHash: '0x5519827364819283746192837461928374619283746192837461928374619283',
      senderAddress: 'bc1q9x3d82a7f5l098k2n9m4p6r1t8w5y3z7q2c4e6',
      receiverAddress: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      asset: 'BTC ➔ ETH',
      amount: 5.4,
      amountUsd: 361800,
      timestamp: '2026-09-13T22:05:00Z',
      status: 'confirmed',
      latencyMinutes: 24,
      connectedVasp: {
        name: 'Exchange Alpha (Binance Global)',
        confidence: 89,
        hopDistance: 2
      }
    }
  ]
};
