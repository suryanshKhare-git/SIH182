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
    wallets: Array<{
      address: string;
      network: Network;
      caseId?: string;
      vasp?: string;
    }>;
    vasps: VaspEntity[];
  }> {
    const q = query.trim().toLowerCase();

    if (!q) {
      return {
        cases: [],
        wallets: [],
        vasps: []
      };
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

  static async analyzeWallet(
    walletAddress: string,
    network: Network = 'Ethereum'
  ): Promise<WalletAnalysisResult> {
    const response = await fetch('https://sih182-backend-l0q2.onrender.com/api/v1/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: walletAddress.trim(),
          network
        })
      }
    );

    if (!response.ok) {
      let errorMessage = 'Wallet analysis failed';

      try {
        const error = await response.json();

        if (typeof error?.detail === 'string') {
          errorMessage = error.detail;
        }
      } catch {
        // Keep default error message
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data as WalletAnalysisResult;
  }

  static async getVaspDirectory(): Promise<VaspEntity[]> {
    return [...MOCK_VASP_DIRECTORY];
  }

  static async getApiEndpoints(): Promise<{
    endpoints: BlockchainApiEndpoint[];
    summary: ApiHealthSummary;
  }> {
    return {
      endpoints: [...MOCK_API_ENDPOINTS],
      summary: { ...MOCK_API_SUMMARY }
    };
  }

  static async getWatchlist(): Promise<WatchlistWallet[]> {
    return [...MOCK_WATCHLIST];
  }
}