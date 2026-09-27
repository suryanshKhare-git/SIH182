import { WatchlistWallet } from '@/types/investigation';

export const MOCK_WATCHLIST: WatchlistWallet[] = [
  {
    id: 'watch-1',
    address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
    label: 'Ransomware Extortion Primary (INV-001)',
    network: 'Ethereum',
    addedAt: '2026-09-14T10:00:00Z',
    lastActivity: '12 mins ago',
    unseenTxs: 2,
    riskScore: 88,
    recentVasp: 'Binance Global',
    recentHop: 2,
    changeStatus: 'vasp_attributed'
  },
  {
    id: 'watch-2',
    address: 'bc1q9x3d82a7f5l098k2n9m4p6r1t8w5y3z7q2c4e6',
    label: 'Darknet UTXO Feeder (INV-002)',
    network: 'Bitcoin',
    addedAt: '2026-09-21T14:30:00Z',
    lastActivity: '4 hours ago',
    unseenTxs: 1,
    riskScore: 74,
    recentVasp: 'Bitfinex Securities (Unconfirmed)',
    recentHop: 3,
    changeStatus: 'new_transaction'
  },
  {
    id: 'watch-3',
    address: '0x3892ac77b9d5206ab1f5a9e3e9d89283921a9f02',
    label: 'DeFi Exploit Liquidator (INV-003)',
    network: 'Polygon',
    addedAt: '2026-09-26T03:00:00Z',
    lastActivity: '25 mins ago',
    unseenTxs: 4,
    riskScore: 94,
    recentVasp: 'Kraken Institutional',
    recentHop: 1,
    changeStatus: 'high_velocity'
  },
  {
    id: 'watch-4',
    address: '0x8829104820192830192830192830192830192830',
    label: 'Suspected Lazarus Group Mule #8',
    network: 'Ethereum',
    addedAt: '2026-09-10T12:00:00Z',
    lastActivity: '3 days ago',
    unseenTxs: 0,
    riskScore: 96,
    recentVasp: 'Huobi / HTX Relay',
    recentHop: 2,
    changeStatus: 'idle'
  }
];
