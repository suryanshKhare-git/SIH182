from typing import List, Optional, Literal
from pydantic import BaseModel


Network = Literal[
    "Ethereum",
    "Bitcoin",
    "Polygon",
    "BNB Chain",
    "Arbitrum",
    "Solana"
]


class AnalyzeRequest(BaseModel):
    walletAddress: str
    network: Network = "Ethereum"


class CaseResponse(BaseModel):
    id: str
    caseReference: str
    title: str
    targetWallet: str
    network: str
    status: str
    priority: str

    assignedInvestigator: str
    agency: str

    createdAt: str
    updatedAt: str
    firstObserved: str
    lastActive: str

    balanceUsd: float
    balanceNative: str
    txCount: int

    incomingVolumeUsd: float
    outgoingVolumeUsd: float

    riskScore: float
    riskLevel: str
    riskSummary: str

    vaspCount: int
    nearestVasp: str
    nearestHop: int
    confidence: float

    tags: List[str]
    notes: str


class EvidenceItem(BaseModel):
    id: str
    type: str
    title: str
    description: str
    confidenceContribution: float
    verified: bool
    timestamp: str
    txHash: Optional[str] = None
    blockNumber: Optional[int] = None
    sourceApi: str
    legalRelevance: str


class VaspConnection(BaseModel):
    id: str
    vaspName: str
    vaspCode: str
    vaspType: str
    jurisdiction: str
    regulatoryStatus: str
    fatfCompliant: bool

    network: str
    hopDistance: int
    txCount: int
    volumeUsd: float

    firstObserved: str
    lastObserved: str

    confidenceScore: float
    confidenceRating: str
    attributionMethod: str

    depositClusterAddress: str
    clusterSize: int
    evidenceCount: int

    evidenceList: List[EvidenceItem]

    subpoenaProcess: dict


class RiskSignal(BaseModel):
    id: str
    name: str
    category: str
    level: str
    score: float
    metricValue: str
    benchmark: str
    description: str
    forensicObservation: str
    investigatorGuidance: str


class RiskProfile(BaseModel):
    overallScore: float
    overallLevel: str
    methodologyVersion: str
    evaluatedAt: str

    signals: List[RiskSignal]

    analyticalSummary: str
    fatfTravelRuleFlags: List[str]
    recommendedLawEnforcementSteps: List[str]


class ForensicsNode(BaseModel):
    id: str
    label: str
    subLabel: Optional[str] = None

    role: str
    network: str
    address: str

    hopDistance: int

    balanceUsd: Optional[float] = None
    balanceNative: Optional[str] = None

    txCount: Optional[int] = None
    totalSentUsd: Optional[float] = None
    totalReceivedUsd: Optional[float] = None

    riskScore: Optional[float] = None
    clusterTag: Optional[str] = None
    vaspName: Optional[str] = None
    confidence: Optional[float] = None

    isSuspect: Optional[bool] = None
    isFlagged: Optional[bool] = None

    x: Optional[float] = None
    y: Optional[float] = None


class ForensicsEdge(BaseModel):
    id: str
    source: str
    target: str

    valueUsd: float
    valueNative: str
    txCount: int

    txHashSample: str
    direction: str
    timestamp: str

    timeDelta: Optional[str] = None
    token: str

    isPrimaryPath: Optional[bool] = None
    confidenceScore: Optional[float] = None


class TransactionPath(BaseModel):
    id: str
    pathName: str
    targetVasp: str
    hopCount: int

    totalVolumeUsd: float
    confidenceScore: float

    evidenceStrength: str
    averageTimeDelta: str

    nodes: List[ForensicsNode]
    edges: List[ForensicsEdge]

    summary: str


class Transaction(BaseModel):
    id: str
    txHash: str
    timestamp: str
    direction: str
    counterparty: str
    amountNative: str
    amountUsd: float
    token: str
    status: str


class WalletAnalysisResult(BaseModel):
    targetWallet: str
    network: str
    caseId: str

    caseData: CaseResponse

    vaspConnections: List[VaspConnection]

    graphNodes: List[ForensicsNode]
    graphEdges: List[ForensicsEdge]
    paths: List[TransactionPath]

    riskProfile: RiskProfile

    ledgerTransactions: List[Transaction]
    transactions: List[Transaction]

    evidenceList: List[EvidenceItem]