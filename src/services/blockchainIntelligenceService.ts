import { InvestigationCase, Network, WatchlistWallet } from '@/types/investigation';
import { VaspConnection, VaspEntity, EvidenceItem } from '@/types/vasp';
import { ForensicsEdge, ForensicsNode, TransactionPath } from '@/types/graph';
import { RiskProfile } from '@/types/risk';
import { BlockchainApiEndpoint, ApiHealthSummary } from '@/types/api';
import { MOCK_CASES } from '@/data/mockCases';
import { MOCK_VASP_DIRECTORY, MOCK_CASE_VASPS } from '@/data/mockVasps';
import { MOCK_GRAPH_DATA, MOCK_LEDGER_TRANSACTIONS, WalletTransactionItem } from '@/data/mockTransactions';
import { MOCK_API_ENDPOINTS, MOCK_API_SUMMARY } from '@/data/mockApis';
import { MOCK_WATCHLIST } from '@/data/mockWatchlist';

export interface WalletAnalysisResult {
  targetWallet: string;
  network: Network;
  caseId: string;
  caseData: InvestigationCase;
  vaspConnections: VaspConnection[];
  graphNodes: ForensicsNode[];
  graphEdges: ForensicsEdge[];
  paths: TransactionPath[];
  riskProfile: RiskProfile;
  ledgerTransactions: WalletTransactionItem[];
  transactions: WalletTransactionItem[];
  evidenceList: EvidenceItem[];
}

export class BlockchainIntelligenceService {
  static async getCases(): Promise<InvestigationCase[]> {
    return [...MOCK_CASES];
  }

  static async getCaseById(caseId: string): Promise<InvestigationCase | null> {
    const found = MOCK_CASES.find((c) => c.id.toLowerCase() === caseId.toLowerCase());
    return found || null;
  }

  static async globalSearch(query: string): Promise<{
    cases: InvestigationCase[];
    wallets: Array<{ address: string; network: Network; caseId?: string; vasp?: string }>;
    vasps: VaspEntity[];
  }> {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { cases: [], wallets: [], vasps: [] };
    }

    const matchedCases = MOCK_CASES.filter(
      (c) =>
        c.id.toLowerCase().includes(q) ||
        c.caseReference.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.targetWallet.toLowerCase().includes(q) ||
        c.nearestVasp.toLowerCase().includes(q)
    );

    const matchedWallets = MOCK_CASES.filter(
      (c) => c.targetWallet.toLowerCase().includes(q)
    ).map((c) => ({
      address: c.targetWallet,
      network: c.network,
      caseId: c.id,
      vasp: c.nearestVasp
    }));

    const matchedVasps = MOCK_VASP_DIRECTORY.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.code.toLowerCase().includes(q) ||
        v.jurisdiction.toLowerCase().includes(q)
    );

    return {
      cases: matchedCases,
      wallets: matchedWallets,
      vasps: matchedVasps
    };
  }

  static async analyzeWallet(walletAddress: string, network: Network = 'Ethereum'): Promise<WalletAnalysisResult> {
    const normalized = walletAddress.trim().toLowerCase();
    const existingCase = MOCK_CASES.find(
      (c) => c.targetWallet.toLowerCase() === normalized || c.id.toLowerCase() === normalized
    ) || MOCK_CASES[0];

    const caseId = existingCase.id;
    const vaspConnections = MOCK_CASE_VASPS[caseId] || MOCK_CASE_VASPS['INV-2026-001'];
    const graphData = MOCK_GRAPH_DATA[caseId] || MOCK_GRAPH_DATA['INV-2026-001'];
    const ledger = MOCK_LEDGER_TRANSACTIONS[existingCase.targetWallet] || MOCK_LEDGER_TRANSACTIONS['0x7a250d5630b4cf539739df2c5dacb4c659f2488d'] || [];

    const riskProfile: RiskProfile = {
      overallScore: existingCase.riskScore,
      overallLevel: existingCase.riskLevel,
      methodologyVersion: 'FATF-VASP-Trace Heuristic Engine v4.8 (LE Forensics Edition)',
      evaluatedAt: new Date().toISOString(),
      signals: [
        {
          id: 'sig-velocity',
          name: 'Transaction Velocity & Rapid Forwarding',
          category: 'Velocity',
          level: existingCase.riskScore > 80 ? 'High' : 'Medium',
          score: existingCase.riskScore > 80 ? 88 : 55,
          metricValue: '38 minutes avg forwarding latency',
          benchmark: 'Normal commercial latency > 24 hours',
          description: 'Funds received were swept through intermediaries within an automated sub-hour window.',
          forensicObservation: 'Sub-hour consolidation across multiple hops indicates programmatic obfuscation rather than personal holding.',
          investigatorGuidance: 'Cross-reference timestamp delta with known automated tumbler or script schedules.'
        },
        {
          id: 'sig-peeling',
          name: 'Peeling Chain Structural Pattern',
          category: 'Obfuscation',
          level: 'High',
          score: 84,
          metricValue: '2 consecutive split relays detected',
          benchmark: '0 peel hops in standard merchant flows',
          description: 'Repeated deduction of round numbers with residual change passed to secondary relays.',
          forensicObservation: 'Classic structuring pattern designed to bypass exchange AML single-threshold limits.',
          investigatorGuidance: 'Request subpoena covering both primary and secondary change addresses.'
        },
        {
          id: 'sig-vasp-proximity',
          name: 'VASP Proximity & Direct Inflow',
          category: 'Proximity',
          level: existingCase.nearestHop <= 2 ? 'High' : 'Medium',
          score: existingCase.nearestHop <= 2 ? 92 : 60,
          metricValue: existingCase.nearestHop + ' Hop(s) to ' + existingCase.nearestVasp,
          benchmark: 'Attribution confidence threshold >= 70%',
          description: 'Discovered qualifying deposit relationship into ' + existingCase.nearestVasp + ' with ' + existingCase.confidence + '% confidence.',
          forensicObservation: 'Deposit cluster matches known custodial hot wallet sweep structures.',
          investigatorGuidance: 'Immediate preservation letter recommended to seize KYC logs.'
        },
        {
          id: 'sig-mixer',
          name: 'Mixer & Anonymity Tool Exposure',
          category: 'Sanctions',
          level: existingCase.network === 'BNB Chain' || existingCase.id === 'INV-2026-001' ? 'Medium' : 'Low',
          score: 45,
          metricValue: '1 Indirect hop to OFAC-flagged proxy',
          benchmark: 'Zero exposure for legitimate custodial accounts',
          description: 'Minor outflow (10 ETH) detected to known mixer relay contract.',
          forensicObservation: 'Diversionary flow intended to test liquidity or taint-tracking vigilance.',
          investigatorGuidance: 'Flag address in OFAC screening; request full IP logs from VASP compliance.'
        },
        {
          id: 'sig-counterparties',
          name: 'Repeated Counterparty Clustering',
          category: 'Behavioral',
          level: 'Medium',
          score: 65,
          metricValue: '3 shared intermediate clusters',
          benchmark: 'Independent random counterparties',
          description: 'Intermediate wallets share historical funding sources from previous illicit campaigns.',
          forensicObservation: 'Syndicate uses recycled infrastructure for multiple extortion campaigns.',
          investigatorGuidance: 'Cross-check cluster ID against ongoing federal and state task force dossiers.'
        }
      ],
      analyticalSummary: existingCase.riskSummary,
      fatfTravelRuleFlags: [
        'FATF Recommendation 16: Originator information missing in unhosted intermediary hops.',
        'High-value transfer exceeding ,000 / EUR 1,000 threshold without verified PII exchange.',
        'Recipient identified as Tier-1 licensed VASP subject to Travel Rule compliance obligations.'
      ],
      recommendedLawEnforcementSteps: [
        'Serve formal preservation notice to ' + existingCase.nearestVasp + ' Legal Compliance team.',
        'Request account KYC documentation (legal name, IP addresses, linked bank accounts, login device fingerprints).',
        'Request transactional ledger for internal off-chain book transfers from deposit cluster.',
        'Coordinate with FinCEN / FIU for possible suspicious activity report (SAR/STR) matching.'
      ]
    };

    return {
      targetWallet: existingCase.targetWallet,
      network: existingCase.network,
      caseId: existingCase.id,
      caseData: existingCase,
      vaspConnections,
      graphNodes: graphData.nodes,
      graphEdges: graphData.edges,
      paths: graphData.paths,
      riskProfile,
      ledgerTransactions: ledger,
      transactions: ledger,
      evidenceList: vaspConnections.flatMap((v) => v.evidenceList)
    };
  }

  static async getVaspDirectory(): Promise<VaspEntity[]> {
    return [...MOCK_VASP_DIRECTORY];
  }

  static async getApiEndpoints(): Promise<{ endpoints: BlockchainApiEndpoint[]; summary: ApiHealthSummary }> {
    return {
      endpoints: [...MOCK_API_ENDPOINTS],
      summary: { ...MOCK_API_SUMMARY }
    };
  }

  static async getWatchlist(): Promise<WatchlistWallet[]> {
    return [...MOCK_WATCHLIST];
  }
}
