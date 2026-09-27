import { VaspConnection, VaspEntity } from '@/types/vasp';

export const MOCK_VASP_DIRECTORY: VaspEntity[] = [
  {
    id: 'vasp-binance',
    name: 'Binance Global',
    code: 'BINANCE-INTL',
    type: 'Centralized Exchange (CEX)',
    headquarters: 'George Town, Cayman Islands',
    jurisdiction: 'Multiple (VASP registered in France, UAE, Japan)',
    regulator: 'AMF (France), VARA (Dubai), JFSA (Japan)',
    fatfStatus: 'Fully Compliant',
    riskRating: 'Low',
    knownHotWallets: 184,
    associatedClusters: 92,
    supportedNetworks: ['Ethereum', 'Bitcoin', 'Polygon', 'BNB Chain', 'Arbitrum', 'Solana'],
    leFocalPointEmail: 'case-inquiry@compliance.binance.com',
    verifiedDepositPatterns: ['Single-use forwarders', 'Consolidation sweeps every 4 hours', 'Memo-tagged UTXOs']
  },
  {
    id: 'vasp-coinbase',
    name: 'Coinbase Inc. / Prime',
    code: 'COINBASE-US',
    type: 'Centralized Exchange (CEX)',
    headquarters: 'San Francisco, California, USA',
    jurisdiction: 'United States (FinCEN MSB & NYDFS BitLicense)',
    regulator: 'FinCEN, NYDFS, SEC Regulated Custodian',
    fatfStatus: 'Fully Compliant',
    riskRating: 'Low',
    knownHotWallets: 240,
    associatedClusters: 110,
    supportedNetworks: ['Ethereum', 'Bitcoin', 'Polygon', 'Solana', 'Arbitrum'],
    leFocalPointEmail: 'lawenforcement@coinbase.com',
    verifiedDepositPatterns: ['Deterministic user addresses', 'Automated hot-to-cold vault sweep', 'FATF Travel Rule Payload Verified']
  },
  {
    id: 'vasp-kraken',
    name: 'Kraken (Payward Inc.)',
    code: 'KRAKEN-US-EU',
    type: 'Centralized Exchange (CEX)',
    headquarters: 'Cheyenne, Wyoming, USA',
    jurisdiction: 'United States / European Union (DASP Ireland)',
    regulator: 'FinCEN MSB, Central Bank of Ireland, FCA UK',
    fatfStatus: 'Fully Compliant',
    riskRating: 'Low',
    knownHotWallets: 98,
    associatedClusters: 46,
    supportedNetworks: ['Ethereum', 'Bitcoin', 'Polygon', 'Arbitrum'],
    leFocalPointEmail: 'le-requests@kraken.com',
    verifiedDepositPatterns: ['Hierarchical deterministic deposit wallets', 'Multi-sig settlement aggregation']
  },
  {
    id: 'vasp-okx',
    name: 'OKX Global',
    code: 'OKX-INTL',
    type: 'Centralized Exchange (CEX)',
    headquarters: 'Seychelles / Dubai Regional HQ',
    jurisdiction: 'Seychelles, Dubai (VARA Full Operational License)',
    regulator: 'VARA Dubai, SCB Bahamas',
    fatfStatus: 'Fully Compliant',
    riskRating: 'Moderate',
    knownHotWallets: 72,
    associatedClusters: 38,
    supportedNetworks: ['Ethereum', 'Bitcoin', 'Polygon', 'BNB Chain', 'Arbitrum'],
    leFocalPointEmail: 'investigations@okx.com',
    verifiedDepositPatterns: ['Sub-account address routing', 'Batch withdrawal contracts']
  },
  {
    id: 'vasp-bitstamp',
    name: 'Bitstamp Europe S.A.',
    code: 'BITSTAMP-EU',
    type: 'Custodial Broker',
    headquarters: 'Luxembourg',
    jurisdiction: 'European Union (CSSF Licensed)',
    regulator: 'CSSF (Luxembourg), AMF (France)',
    fatfStatus: 'Fully Compliant',
    riskRating: 'Low',
    knownHotWallets: 44,
    associatedClusters: 18,
    supportedNetworks: ['Ethereum', 'Bitcoin'],
    leFocalPointEmail: 'compliance@bitstamp.net',
    verifiedDepositPatterns: ['Custodial segregation', 'Single deposit sweep']
  }
];

export const MOCK_CASE_VASPS: Record<string, VaspConnection[]> = {
  'INV-2026-001': [
    {
      id: 'conn-001-binance',
      vaspName: 'Binance Global',
      vaspCode: 'BINANCE-INTL',
      vaspType: 'Centralized Exchange (CEX)',
      jurisdiction: 'Multiple (EU/UAE Licensed)',
      regulatoryStatus: 'FATF Recommendation 16 Compliant / MSB',
      fatfCompliant: true,
      network: 'Ethereum',
      hopDistance: 2,
      txCount: 18,
      volumeUsd: 1420000,
      firstObserved: '2026-09-14T15:20:00Z',
      lastObserved: '2026-09-26T21:40:00Z',
      confidenceScore: 89,
      confidenceRating: 'high',
      attributionMethod: 'Deposit Cluster Signature & Multi-Input Sweeping',
      depositClusterAddress: '0x28c6c06298d514db089934071355e5743bf21d60',
      clusterSize: 42,
      evidenceCount: 4,
      evidenceList: [
        {
          id: 'ev-01',
          type: 'multi_hop_path',
          title: 'Direct 2-Hop Settlement Path',
          description: 'Suspect wallet transferred 450 ETH to intermediary 0x3f9... which deposited directly to Binance Hot Wallet 6 within 38 minutes.',
          confidenceContribution: 35,
          verified: true,
          timestamp: '2026-09-14T15:58:12Z',
          txHash: '0x8a92bc44e138a0f983198031dcf87a29e46a18842718cf2305a4ecb12398da11',
          blockNumber: 20741982,
          sourceApi: 'Ethereum Intelligence Forensics RPC',
          legalRelevance: 'Confirms asset movement from extortion wallet into custodial exchange account.'
        },
        {
          id: 'ev-02',
          type: 'co_spend_cluster',
          title: 'VASP Deposit Cluster Attribution',
          description: 'Receiving address matched known Binance Deposit Cluster #42 via repeated sweeping heuristics with 99.4% cluster certainty.',
          confidenceContribution: 28,
          verified: true,
          timestamp: '2026-09-14T16:15:00Z',
          txHash: '0x99cb1152a48df02847291a27e3650cf2a091873210948ac01948ba98127361ab',
          blockNumber: 20741995,
          sourceApi: 'Clustering & Graph Engine v4.2',
          legalRelevance: 'Associates the intermediary sweep with exchange internal account pool.'
        },
        {
          id: 'ev-03',
          type: 'timing_correlation',
          title: 'Automated Forwarding Timing Signature',
          description: 'Time delta of 2,280 seconds between ransom receipt and VASP deposit matches automated bot sweeping scripts.',
          confidenceContribution: 16,
          verified: true,
          timestamp: '2026-09-14T16:22:00Z',
          sourceApi: 'Behavioral & Velocity Heuristics',
          legalRelevance: 'Demonstrates programmatic laundering attempt rather than passive recipient behavior.'
        },
        {
          id: 'ev-04',
          type: 'deposit_tag',
          title: 'Consolidated Outflow to Cold Vault',
          description: 'Deposit was batched into Binance Cold Storage 0x5a52e... confirming exchange internal ledger custody.',
          confidenceContribution: 10,
          verified: true,
          timestamp: '2026-09-14T20:10:00Z',
          txHash: '0x1111928471928374910283749102837491028374910283749102837491028374',
          blockNumber: 20742110,
          sourceApi: 'Custody Reserve Indexer',
          legalRelevance: 'Provides indisputable proof that funds reached exchange reserve custody.'
        }
      ],
      subpoenaProcess: {
        lawEnforcementPortal: 'https://kodex.binance.com',
        avgResponseDays: 3,
        requiredLegalInstrument: 'Formal Court Order / MLAT / LE Subpoena',
        complianceOffice: 'Binance Special Investigations & Law Enforcement Liaison'
      }
    },
    {
      id: 'conn-001-coinbase',
      vaspName: 'Coinbase Inc.',
      vaspCode: 'COINBASE-US',
      vaspType: 'Centralized Exchange (CEX)',
      jurisdiction: 'United States',
      regulatoryStatus: 'FinCEN MSB / NYDFS',
      fatfCompliant: true,
      network: 'Ethereum',
      hopDistance: 3,
      txCount: 4,
      volumeUsd: 282420,
      firstObserved: '2026-09-18T11:00:00Z',
      lastObserved: '2026-09-24T18:15:00Z',
      confidenceScore: 72,
      confidenceRating: 'medium',
      attributionMethod: 'Secondary Peel Route to Verified Deposit Forwarder',
      depositClusterAddress: '0x71c7656ec7ab88b098defb751b7401b5f6d8976f',
      clusterSize: 18,
      evidenceCount: 2,
      evidenceList: [
        {
          id: 'ev-05',
          type: 'multi_hop_path',
          title: '3-Hop Secondary Off-Ramp Path',
          description: 'Suspect wallet routed 85 ETH through two relay wallets before depositing to Coinbase Prime forwarder.',
          confidenceContribution: 42,
          verified: true,
          timestamp: '2026-09-18T11:42:00Z',
          txHash: '0x4422bb9910298384920192830192830192830192830192830192830192830192',
          sourceApi: 'Ethereum Intelligence Forensics RPC',
          legalRelevance: 'Identifies alternative secondary off-ramp used by syndicate.'
        },
        {
          id: 'ev-06',
          type: 'deposit_tag',
          title: 'Coinbase Prime Settlement Tag',
          description: 'Address matches verified Coinbase Prime institutional deposit format.',
          confidenceContribution: 30,
          verified: true,
          timestamp: '2026-09-18T12:00:00Z',
          sourceApi: 'VASP Identity Registry',
          legalRelevance: 'Enables targeted subpoena to US-based legal entity.'
        }
      ],
      subpoenaProcess: {
        lawEnforcementPortal: 'https://le.coinbase.com',
        avgResponseDays: 2,
        requiredLegalInstrument: '18 U.S.C. § 2703(c)(2) Subpoena or Court Order',
        complianceOffice: 'Coinbase Legal Investigations Team'
      }
    }
  ],
  'INV-2026-002': [
    {
      id: 'conn-002-bitfinex',
      vaspName: 'Bitfinex Securities',
      vaspCode: 'BITFINEX-BVI',
      vaspType: 'Centralized Exchange (CEX)',
      jurisdiction: 'British Virgin Islands',
      regulatoryStatus: 'Offshore Financial Center',
      fatfCompliant: false,
      network: 'Bitcoin',
      hopDistance: 3,
      txCount: 8,
      volumeUsd: 180000,
      firstObserved: '2026-09-10T02:00:00Z',
      lastObserved: '2026-09-22T19:30:00Z',
      confidenceScore: 42,
      confidenceRating: 'low',
      attributionMethod: 'Weak Multi-Input UTXO Heuristic & Change Guessing',
      depositClusterAddress: 'bc1q70z9a8w72e61y3808p4m12v78c2e680a112233',
      clusterSize: 9,
      evidenceCount: 1,
      evidenceList: [
        {
          id: 'ev-07',
          type: 'multi_hop_path',
          title: '3-Hop Peeling Sequence',
          description: 'Change output peeling sequence of 2.1 BTC routed through intermediary cluster with high entropy.',
          confidenceContribution: 42,
          verified: false,
          timestamp: '2026-09-22T19:30:00Z',
          sourceApi: 'Bitcoin UTXO Cluster Engine',
          legalRelevance: 'Analytical signal only; requires further block confirmations and counterparty confirmation.'
        }
      ],
      subpoenaProcess: {
        lawEnforcementPortal: 'compliance@bitfinex.com',
        avgResponseDays: 14,
        requiredLegalInstrument: 'BVI High Court Subpoena / Letters Rogatory',
        complianceOffice: 'iFinex Legal & Compliance'
      }
    }
  ],
  'INV-2026-003': [
    {
      id: 'conn-003-kraken',
      vaspName: 'Kraken Institutional',
      vaspCode: 'KRAKEN-US-EU',
      vaspType: 'Centralized Exchange (CEX)',
      jurisdiction: 'United States & Ireland',
      regulatoryStatus: 'FinCEN MSB / CBI Regulated',
      fatfCompliant: true,
      network: 'Polygon',
      hopDistance: 1,
      txCount: 12,
      volumeUsd: 2150000,
      firstObserved: '2026-09-26T03:15:00Z',
      lastObserved: '2026-09-27T07:40:00Z',
      confidenceScore: 94,
      confidenceRating: 'high',
      attributionMethod: 'Direct Smart Contract Swap and Custody Deposit',
      depositClusterAddress: '0x2910543af39aba0cd09dbb2d50200b3e800a63d2',
      clusterSize: 64,
      evidenceCount: 3,
      evidenceList: [
        {
          id: 'ev-08',
          type: 'direct_transfer',
          title: 'Direct 1-Hop Transfer to Verified VASP Deposit Address',
          description: 'Suspect address transferred 1,200,000 USDC directly to Payward Inc. (Kraken) registered Polygon custody vault.',
          confidenceContribution: 48,
          verified: true,
          timestamp: '2026-09-26T03:15:10Z',
          txHash: '0x55aa198201928301928301928301928301928301928301928301928301928301',
          blockNumber: 62410982,
          sourceApi: 'Polygon Forensics Indexer',
          legalRelevance: 'High evidential weight for immediate preservation letter under 18 U.S.C. § 2703(f).'
        },
        {
          id: 'ev-09',
          type: 'deposit_tag',
          title: 'Institutional Account Routing Metadata',
          description: 'Transaction input payload correlates with high-tier KYC institutional account on Kraken.',
          confidenceContribution: 30,
          verified: true,
          timestamp: '2026-09-26T03:15:10Z',
          sourceApi: 'VASP Identity Registry',
          legalRelevance: 'Direct link to KYC identity package.'
        },
        {
          id: 'ev-10',
          type: 'timing_correlation',
          title: 'Immediate Post-Exploit Dumping',
          description: 'Transfer occurred 4 minutes and 12 seconds following protocol exploit transaction.',
          confidenceContribution: 16,
          verified: true,
          timestamp: '2026-09-26T03:19:22Z',
          sourceApi: 'Behavioral & Velocity Heuristics',
          legalRelevance: 'Proves direct mens rea and swift flight of criminal proceeds.'
        }
      ],
      subpoenaProcess: {
        lawEnforcementPortal: 'https://le.kraken.com',
        avgResponseDays: 1,
        requiredLegalInstrument: 'Emergency Preservation Request / Grand Jury Subpoena',
        complianceOffice: 'Kraken Financial Crime Intelligence Unit (FCIU)'
      }
    }
  ],
  'INV-2026-004': [
    {
      id: 'conn-004-okx',
      vaspName: 'OKX Global',
      vaspCode: 'OKX-INTL',
      vaspType: 'Centralized Exchange (CEX)',
      jurisdiction: 'Dubai / Seychelles',
      regulatoryStatus: 'VARA Licensed',
      fatfCompliant: true,
      network: 'BNB Chain',
      hopDistance: 2,
      txCount: 6,
      volumeUsd: 610000,
      firstObserved: '2026-09-22T08:00:00Z',
      lastObserved: '2026-09-24T12:00:00Z',
      confidenceScore: 68,
      confidenceRating: 'medium',
      attributionMethod: 'Mixer Unmasking & Denomination Timing Correlation',
      depositClusterAddress: '0xa123456789abcdef0123456789abcdef01234567',
      clusterSize: 22,
      evidenceCount: 2,
      evidenceList: [
        {
          id: 'ev-11',
          type: 'timing_correlation',
          title: 'Equal-Value Mixer Withdrawal Attribution',
          description: 'Withdrawal of 100 BNB from mixer relay wallet matches suspect deposit timestamp within 90-minute window.',
          confidenceContribution: 38,
          verified: true,
          timestamp: '2026-09-22T09:30:00Z',
          txHash: '0x77bb881928301928301928301928301928301928301928301928301928301928',
          sourceApi: 'Mempool Ingestion & Mixer Tracer',
          legalRelevance: 'Circumstantial correlation linking obfuscated withdrawal to exchange cash-out.'
        },
        {
          id: 'ev-12',
          type: 'deposit_tag',
          title: 'OKX Hot Inflow Gateway',
          description: 'Destination wallet verified as internal OKX user collection forwarder.',
          confidenceContribution: 30,
          verified: true,
          timestamp: '2026-09-22T10:00:00Z',
          sourceApi: 'VASP Identity Registry',
          legalRelevance: 'Subpoena target confirmed for user account records.'
        }
      ],
      subpoenaProcess: {
        lawEnforcementPortal: 'compliance-le@okx.com',
        avgResponseDays: 4,
        requiredLegalInstrument: 'International MLAT / UAE Court Order',
        complianceOffice: 'OKX Compliance & AML Investigations'
      }
    }
  ]
};
