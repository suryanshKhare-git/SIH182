import { ForensicsEdge, ForensicsNode, TransactionPath } from '@/types/graph';

export interface WalletTransactionItem {
  id: string;
  txHash: string;
  timestamp: string;
  direction: 'inflow' | 'outflow';
  counterpartyAddress: string;
  counterpartyLabel: string;
  counterpartyRole: string;
  valueUsd: number;
  valueNative: string;
  token: string;
  feeUsd: number;
  blockNumber: number;
  hopDistance: number;
  riskSignal?: string;
  vaspAssociated?: string;
}

export const MOCK_GRAPH_DATA: Record<string, { nodes: ForensicsNode[]; edges: ForensicsEdge[]; paths: TransactionPath[] }> = {
  'INV-2026-001': {
    nodes: [
      {
        id: 'node-suspect',
        label: 'Suspect Extortion Wallet',
        subLabel: 'Unknown Attacker Wallet',
        role: 'unknown_wallet',
        network: 'Ethereum',
        address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
        hopDistance: 0,
        balanceUsd: 142580,
        balanceNative: '54.21 ETH',
        txCount: 47,
        totalSentUsd: 1702420,
        totalReceivedUsd: 1845000,
        riskScore: 88,
        isSuspect: true,
        x: 80,
        y: 200
      },
      {
        id: 'node-inter-1',
        label: 'Peel Relay 0x3f9',
        subLabel: 'Intermediary Wallet (Hop 1)',
        role: 'intermediary',
        network: 'Ethereum',
        address: '0x3f9821049281a948210382947192837192839211',
        hopDistance: 1,
        balanceUsd: 12400,
        balanceNative: '4.7 ETH',
        txCount: 8,
        totalSentUsd: 1180000,
        totalReceivedUsd: 1192400,
        riskScore: 78,
        clusterTag: 'Peeling Syndicate A',
        x: 280,
        y: 120
      },
      {
        id: 'node-inter-2',
        label: 'Secondary Split 0x88b',
        subLabel: 'Intermediary Wallet (Hop 1)',
        role: 'intermediary',
        network: 'Ethereum',
        address: '0x88b1238471928471928374918237491827394812',
        hopDistance: 1,
        balanceUsd: 8200,
        balanceNative: '3.1 ETH',
        txCount: 6,
        totalSentUsd: 510000,
        totalReceivedUsd: 518200,
        riskScore: 72,
        clusterTag: 'Peeling Syndicate B',
        x: 280,
        y: 300
      },
      {
        id: 'node-inter-3',
        label: 'Batch Aggregator 0x11c',
        subLabel: 'Intermediary Wallet (Hop 2)',
        role: 'intermediary',
        network: 'Ethereum',
        address: '0x11c9823471928374918273491827394817293847',
        hopDistance: 2,
        balanceUsd: 2100,
        balanceNative: '0.8 ETH',
        txCount: 14,
        totalSentUsd: 1160000,
        totalReceivedUsd: 1162100,
        riskScore: 82,
        clusterTag: 'Binance Ingestion Conduit',
        x: 480,
        y: 120
      },
      {
        id: 'node-inter-4',
        label: 'Sub-Relay 0x66e',
        subLabel: 'Intermediary Wallet (Hop 2)',
        role: 'intermediary',
        network: 'Ethereum',
        address: '0x66e9283749182739481729384719283749182739',
        hopDistance: 2,
        balanceUsd: 1500,
        balanceNative: '0.57 ETH',
        txCount: 5,
        totalSentUsd: 280000,
        totalReceivedUsd: 281500,
        riskScore: 65,
        x: 480,
        y: 300
      },
      {
        id: 'node-vasp-binance',
        label: 'Binance Global Hot 6',
        subLabel: 'VASP Custody Cluster (Hop 2/3)',
        role: 'vasp',
        network: 'Ethereum',
        address: '0x28c6c06298d514db089934071355e5743bf21d60',
        hopDistance: 2,
        vaspName: 'Binance Global',
        confidence: 89,
        balanceUsd: 485000000,
        balanceNative: '184,500 ETH',
        txCount: 92841,
        totalReceivedUsd: 1420000,
        riskScore: 12,
        x: 700,
        y: 120
      },
      {
        id: 'node-vasp-coinbase',
        label: 'Coinbase Custody 14',
        subLabel: 'VASP Custody Cluster (Hop 3)',
        role: 'vasp',
        network: 'Ethereum',
        address: '0x71c7656ec7ab88b098defb751b7401b5f6d8976f',
        hopDistance: 3,
        vaspName: 'Coinbase Inc.',
        confidence: 72,
        balanceUsd: 890000000,
        balanceNative: '338,500 ETH',
        txCount: 148209,
        totalReceivedUsd: 282420,
        riskScore: 8,
        x: 700,
        y: 300
      },
      {
        id: 'node-mixer-flag',
        label: 'Sanctioned Pool Proxy',
        subLabel: 'Suspicious / Mixer Pool',
        role: 'mixer',
        network: 'Ethereum',
        address: '0xd90e2f925da726b50c4ed8d0fb90ad053324f31b',
        hopDistance: 1,
        balanceUsd: 4120000,
        balanceNative: '1,568 ETH',
        txCount: 1420,
        riskScore: 98,
        isFlagged: true,
        x: 280,
        y: 440
      }
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'node-suspect',
        target: 'node-inter-1',
        valueUsd: 1192400,
        valueNative: '450.0 ETH',
        txCount: 1,
        txHashSample: '0x8a92bc44e138a0f983198031dcf87a29e46a18842718cf2305a4ecb12398da11',
        direction: 'outflow',
        timestamp: '2026-09-14T15:20:00Z',
        timeDelta: '0 min',
        token: 'ETH',
        isPrimaryPath: true,
        confidenceScore: 92
      },
      {
        id: 'edge-2',
        source: 'node-inter-1',
        target: 'node-inter-3',
        valueUsd: 1162100,
        valueNative: '438.5 ETH',
        txCount: 2,
        txHashSample: '0x99cb1152a48df02847291a27e3650cf2a091873210948ac01948ba98127361ab',
        direction: 'outflow',
        timestamp: '2026-09-14T15:42:10Z',
        timeDelta: '+22 mins',
        token: 'ETH',
        isPrimaryPath: true,
        confidenceScore: 90
      },
      {
        id: 'edge-3',
        source: 'node-inter-3',
        target: 'node-vasp-binance',
        valueUsd: 1160000,
        valueNative: '437.8 ETH',
        txCount: 3,
        txHashSample: '0x3344119284719283749102837491028374910283749102837491028374910283',
        direction: 'outflow',
        timestamp: '2026-09-14T15:58:12Z',
        timeDelta: '+16 mins',
        token: 'ETH',
        isPrimaryPath: true,
        confidenceScore: 89
      },
      {
        id: 'edge-4',
        source: 'node-suspect',
        target: 'node-inter-2',
        valueUsd: 518200,
        valueNative: '195.5 ETH',
        txCount: 2,
        txHashSample: '0x2211998471928374918273948172938471928374918273948172938471928374',
        direction: 'outflow',
        timestamp: '2026-09-14T16:05:00Z',
        timeDelta: '+45 mins',
        token: 'ETH',
        confidenceScore: 78
      },
      {
        id: 'edge-5',
        source: 'node-inter-2',
        target: 'node-inter-4',
        valueUsd: 281500,
        valueNative: '106.2 ETH',
        txCount: 1,
        txHashSample: '0x77aa112233445566778899001122334455667788990011223344556677889900',
        direction: 'outflow',
        timestamp: '2026-09-18T10:30:00Z',
        timeDelta: '+3.7 days',
        token: 'ETH',
        confidenceScore: 75
      },
      {
        id: 'edge-6',
        source: 'node-inter-4',
        target: 'node-vasp-coinbase',
        valueUsd: 280000,
        valueNative: '105.6 ETH',
        txCount: 2,
        txHashSample: '0x4422bb9910298384920192830192830192830192830192830192830192830192',
        direction: 'outflow',
        timestamp: '2026-09-18T11:42:00Z',
        timeDelta: '+72 mins',
        token: 'ETH',
        confidenceScore: 72
      },
      {
        id: 'edge-7',
        source: 'node-suspect',
        target: 'node-mixer-flag',
        valueUsd: 26000,
        valueNative: '10.0 ETH',
        txCount: 1,
        txHashSample: '0x9900aa1122334455667788990011223344556677889900112233445566778899',
        direction: 'outflow',
        timestamp: '2026-09-15T02:10:00Z',
        timeDelta: '+10.8 hrs',
        token: 'ETH',
        confidenceScore: 98
      }
    ],
    paths: [
      {
        id: 'path-001-primary',
        pathName: 'Path Alpha: Rapid Automated Peel to Binance Hot 6',
        targetVasp: 'Binance Global',
        hopCount: 2,
        totalVolumeUsd: 1160000,
        confidenceScore: 89,
        evidenceStrength: 'Strong',
        averageTimeDelta: '19 minutes / hop',
        nodes: [],
        edges: [],
        summary: 'Direct peeling path with rapid programmatic forwarding (sub-40 min end-to-end), terminating at verified Binance Hot 6 deposit pool with 4 verifiable chain receipts.'
      },
      {
        id: 'path-001-secondary',
        pathName: 'Path Beta: Delayed Secondary Off-Ramp to Coinbase',
        targetVasp: 'Coinbase Inc.',
        hopCount: 3,
        totalVolumeUsd: 280000,
        confidenceScore: 72,
        evidenceStrength: 'Moderate',
        averageTimeDelta: '1.8 days / hop',
        nodes: [],
        edges: [],
        summary: 'Secondary diversion path delayed by nearly 4 days to circumvent automated velocity triggers, terminating at Coinbase institutional custody.'
      }
    ]
  },
  'INV-2026-003': {
    nodes: [
      {
        id: 'node-drainer',
        label: 'Suspect Exploit Drainer',
        subLabel: 'Smart Contract Exploit Initiator',
        role: 'unknown_wallet',
        network: 'Polygon',
        address: '0x3892ac77b9d5206ab1f5a9e3e9d89283921a9f02',
        hopDistance: 0,
        balanceUsd: 312000,
        balanceNative: '680,450 POL',
        txCount: 89,
        totalSentUsd: 3098000,
        totalReceivedUsd: 3410000,
        riskScore: 94,
        isSuspect: true,
        x: 80,
        y: 200
      },
      {
        id: 'node-router',
        label: 'DEX Routing Contract',
        subLabel: 'QuickSwap V3 Aggregator (Hop 1)',
        role: 'bridge',
        network: 'Polygon',
        address: '0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff',
        hopDistance: 1,
        balanceUsd: 14200000,
        balanceNative: '31,000,000 POL',
        txCount: 42098,
        totalSentUsd: 2150000,
        totalReceivedUsd: 2150000,
        riskScore: 18,
        x: 320,
        y: 120
      },
      {
        id: 'node-vasp-kraken-poly',
        label: 'Kraken Institutional Deposit',
        subLabel: 'VASP Custody (Hop 1/2 Direct)',
        role: 'vasp',
        network: 'Polygon',
        address: '0x2910543af39aba0cd09dbb2d50200b3e800a63d2',
        hopDistance: 1,
        vaspName: 'Kraken Institutional',
        confidence: 94,
        balanceUsd: 184000000,
        balanceNative: '400,000,000 POL',
        txCount: 88120,
        totalReceivedUsd: 2150000,
        riskScore: 10,
        x: 640,
        y: 120
      },
      {
        id: 'node-inter-bridge',
        label: 'Hop Protocol Bridge Relayer',
        subLabel: 'Cross-Chain Conduit (Hop 1)',
        role: 'bridge',
        network: 'Polygon',
        address: '0x2424872918237491827394817293847192837491',
        hopDistance: 1,
        balanceUsd: 920000,
        balanceNative: '2,000,000 POL',
        txCount: 512,
        totalSentUsd: 948000,
        totalReceivedUsd: 948000,
        riskScore: 68,
        x: 320,
        y: 300
      },
      {
        id: 'node-vasp-coinbase-prime',
        label: 'Coinbase Prime Settlement',
        subLabel: 'VASP Custody (Hop 2)',
        role: 'vasp',
        network: 'Polygon',
        address: '0x9920192830192830192830192830192830192830',
        hopDistance: 2,
        vaspName: 'Coinbase Prime',
        confidence: 86,
        balanceUsd: 320000000,
        balanceNative: '700,000,000 POL',
        txCount: 42109,
        totalReceivedUsd: 948000,
        riskScore: 12,
        x: 640,
        y: 300
      }
    ],
    edges: [
      {
        id: 'edge-p1',
        source: 'node-drainer',
        target: 'node-vasp-kraken-poly',
        valueUsd: 2150000,
        valueNative: '2,150,000 USDC',
        txCount: 3,
        txHashSample: '0x55aa198201928301928301928301928301928301928301928301928301928301',
        direction: 'outflow',
        timestamp: '2026-09-26T03:15:10Z',
        timeDelta: 'Direct Inflow',
        token: 'USDC',
        isPrimaryPath: true,
        confidenceScore: 94
      },
      {
        id: 'edge-p2',
        source: 'node-drainer',
        target: 'node-inter-bridge',
        valueUsd: 948000,
        valueNative: '948,000 DAI',
        txCount: 2,
        txHashSample: '0x66bb293847192837491827394817293847192837491827394817293847192837',
        direction: 'outflow',
        timestamp: '2026-09-26T04:10:00Z',
        timeDelta: '+55 mins',
        token: 'DAI',
        confidenceScore: 86
      },
      {
        id: 'edge-p3',
        source: 'node-inter-bridge',
        target: 'node-vasp-coinbase-prime',
        valueUsd: 948000,
        valueNative: '948,000 DAI',
        txCount: 1,
        txHashSample: '0x88cc394857192837491827394817293847192837491827394817293847192837',
        direction: 'outflow',
        timestamp: '2026-09-26T04:45:00Z',
        timeDelta: '+35 mins',
        token: 'DAI',
        confidenceScore: 86
      }
    ],
    paths: [
      {
        id: 'path-003-primary',
        pathName: 'Path Alpha: High-Volume Direct Deposit to Kraken',
        targetVasp: 'Kraken Institutional',
        hopCount: 1,
        totalVolumeUsd: 2150000,
        confidenceScore: 94,
        evidenceStrength: 'Strong',
        averageTimeDelta: '4 mins post-exploit',
        nodes: [],
        edges: [],
        summary: 'Direct un-obfuscated transfer of 2.15M USDC into Kraken registered deposit address within minutes of exploit execution.'
      },
      {
        id: 'path-003-secondary',
        pathName: 'Path Beta: Cross-Bridge Route to Coinbase Prime',
        targetVasp: 'Coinbase Prime',
        hopCount: 2,
        totalVolumeUsd: 948000,
        confidenceScore: 86,
        evidenceStrength: 'Strong',
        averageTimeDelta: '45 mins post-bridge',
        nodes: [],
        edges: [],
        summary: 'Cross-chain bridge relaying to institutional account forwarder, establishing independent jurisdiction nexus.'
      }
    ]
  }
};

export const MOCK_LEDGER_TRANSACTIONS: Record<string, WalletTransactionItem[]> = {
  '0x7a250d5630b4cf539739df2c5dacb4c659f2488d': [
    {
      id: 'tx-1',
      txHash: '0x8a92bc44e138a0f983198031dcf87a29e46a18842718cf2305a4ecb12398da11',
      timestamp: '2026-09-14T15:20:00Z',
      direction: 'outflow',
      counterpartyAddress: '0x3f9821049281a948210382947192837192839211',
      counterpartyLabel: 'Peel Relay 0x3f9',
      counterpartyRole: 'Intermediary Wallet (Hop 1)',
      valueUsd: 1192400,
      valueNative: '450.0 ETH',
      token: 'ETH',
      feeUsd: 14.20,
      blockNumber: 20741982,
      hopDistance: 1,
      riskSignal: 'Peeling Inflow',
      vaspAssociated: 'Binance Global'
    },
    {
      id: 'tx-2',
      txHash: '0x2211998471928374918273948172938471928374918273948172938471928374',
      timestamp: '2026-09-14T16:05:00Z',
      direction: 'outflow',
      counterpartyAddress: '0x88b1238471928471928374918273948182739481',
      counterpartyLabel: 'Secondary Split 0x88b',
      counterpartyRole: 'Intermediary Wallet (Hop 1)',
      valueUsd: 518200,
      valueNative: '195.5 ETH',
      token: 'ETH',
      feeUsd: 16.80,
      blockNumber: 20742010,
      hopDistance: 1,
      riskSignal: 'High Volume Split',
      vaspAssociated: 'Coinbase Inc.'
    },
    {
      id: 'tx-3',
      txHash: '0x9900aa1122334455667788990011223344556677889900112233445566778899',
      timestamp: '2026-09-15T02:10:00Z',
      direction: 'outflow',
      counterpartyAddress: '0xd90e2f925da726b50c4ed8d0fb90ad053324f31b',
      counterpartyLabel: 'Sanctioned Pool Proxy',
      counterpartyRole: 'Mixer / Darknet Pool',
      valueUsd: 26000,
      valueNative: '10.0 ETH',
      token: 'ETH',
      feeUsd: 8.50,
      blockNumber: 20744901,
      hopDistance: 1,
      riskSignal: 'OFAC Sanctioned Entity'
    },
    {
      id: 'tx-4',
      txHash: '0xfe19028374918273948172938471928374918273948172938471928374918273',
      timestamp: '2026-09-12T14:22:18Z',
      direction: 'inflow',
      counterpartyAddress: '0x5511223344556677889900112233445566778899',
      counterpartyLabel: 'Victim Corporate Hot Vault',
      counterpartyRole: 'Victim Treasury',
      valueUsd: 1845000,
      valueNative: '655.5 ETH',
      token: 'ETH',
      feeUsd: 22.40,
      blockNumber: 20738012,
      hopDistance: 0,
      riskSignal: 'Extortion Ransom Payment'
    }
  ]
};
