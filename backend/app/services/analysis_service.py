from datetime import datetime
from .risk_engine import calculate_risk
from .vasp_attribution import get_vasp_connections


DEMO_CASES = [
    {
        "id": "INV-2026-001",
        "caseReference": "CASE-CRYPTO-001",
        "title": "Unknown Wallet Attribution Investigation",
        "targetWallet": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
        "network": "Ethereum",
        "status": "active",
        "priority": "high",
        "assignedInvestigator": "Digital Forensics Unit",
        "agency": "Cyber Crime Investigation Division",
        "createdAt": "2026-09-01T10:00:00Z",
        "updatedAt": "2026-09-27T15:30:00Z",
        "firstObserved": "2026-08-14T11:20:00Z",
        "lastActive": "2026-09-27T12:30:00Z",
        "balanceUsd": 184250.50,
        "balanceNative": "72.41 ETH",
        "txCount": 248,
        "incomingVolumeUsd": 582400.00,
        "outgoingVolumeUsd": 398149.50,
        "riskScore": 87,
        "riskLevel": "high",
        "riskSummary": "Wallet exhibits rapid forwarding, intermediary clustering and proximity to a known VASP-associated deposit cluster.",
        "vaspCount": 3,
        "nearestVasp": "Coinbase",
        "nearestHop": 2,
        "confidence": 91,
        "tags": ["VASP", "HIGH_RISK", "MULTI_HOP"],
        "notes": "Synthetic demonstration investigation."
    }
]


def get_case(wallet_address, network):
    normalized = wallet_address.strip().lower()

    for case in DEMO_CASES:
        if case["targetWallet"].lower() == normalized:
            case["network"] = network
            return case

    case = dict(DEMO_CASES[0])
    case["targetWallet"] = wallet_address
    case["network"] = network
    return case


def generate_transactions(case):
    wallet = case["targetWallet"]

    return [
        {
            "id": "TX-001",
            "txHash": "0xabc123sample001",
            "timestamp": "2026-09-27T10:20:00Z",
            "direction": "inflow",
            "counterparty": "0xINTERMEDIARY001",
            "amountNative": "12.40 ETH",
            "amountUsd": 31400,
            "token": "ETH",
            "status": "confirmed"
        },
        {
            "id": "TX-002",
            "txHash": "0xabc123sample002",
            "timestamp": "2026-09-27T10:58:00Z",
            "direction": "outflow",
            "counterparty": "0xINTERMEDIARY002",
            "amountNative": "11.90 ETH",
            "amountUsd": 30100,
            "token": "ETH",
            "status": "confirmed"
        },
        {
            "id": "TX-003",
            "txHash": "0xabc123sample003",
            "timestamp": "2026-09-27T11:32:00Z",
            "direction": "outflow",
            "counterparty": "0xVASPCONNECTOR",
            "amountNative": "8.20 ETH",
            "amountUsd": 20750,
            "token": "ETH",
            "status": "confirmed"
        }
    ]


def generate_graph(case):
    nodes = [
        {
            "id": "node-target",
            "label": "Target Wallet",
            "subLabel": "Unknown Wallet",
            "role": "unknown_wallet",
            "network": case["network"],
            "address": case["targetWallet"],
            "hopDistance": 0,
            "balanceUsd": case["balanceUsd"],
            "balanceNative": case["balanceNative"],
            "txCount": case["txCount"],
            "totalSentUsd": case["outgoingVolumeUsd"],
            "totalReceivedUsd": case["incomingVolumeUsd"],
            "riskScore": case["riskScore"],
            "clusterTag": "TARGET-CLUSTER",
            "confidence": case["confidence"],
            "isSuspect": True,
            "isFlagged": True
        },
        {
            "id": "node-intermediary-1",
            "label": "Relay Cluster A",
            "subLabel": "Intermediate Wallet",
            "role": "intermediary",
            "network": case["network"],
            "address": "0xINTERMEDIARY001",
            "hopDistance": 1,
            "txCount": 42,
            "riskScore": 71,
            "clusterTag": "CLUSTER-A",
            "isSuspect": True
        },
        {
            "id": "node-intermediary-2",
            "label": "Deposit Cluster",
            "subLabel": case["nearestVasp"],
            "role": "vasp",
            "network": case["network"],
            "address": "0xVASPCONNECTOR",
            "hopDistance": 2,
            "txCount": 120,
            "riskScore": 35,
            "vaspName": case["nearestVasp"],
            "confidence": case["confidence"],
            "isFlagged": True
        }
    ]

    edges = [
        {
            "id": "edge-001",
            "source": "node-target",
            "target": "node-intermediary-1",
            "valueUsd": 30100,
            "valueNative": "11.90 ETH",
            "txCount": 4,
            "txHashSample": "0xabc123sample002",
            "direction": "outflow",
            "timestamp": "2026-09-27T10:58:00Z",
            "timeDelta": "38 minutes",
            "token": "ETH",
            "isPrimaryPath": True,
            "confidenceScore": 88
        },
        {
            "id": "edge-002",
            "source": "node-intermediary-1",
            "target": "node-intermediary-2",
            "valueUsd": 20750,
            "valueNative": "8.20 ETH",
            "txCount": 2,
            "txHashSample": "0xabc123sample003",
            "direction": "outflow",
            "timestamp": "2026-09-27T11:32:00Z",
            "timeDelta": "34 minutes",
            "token": "ETH",
            "isPrimaryPath": True,
            "confidenceScore": case["confidence"]
        }
    ]

    paths = [
        {
            "id": "PATH-001",
            "pathName": "Primary VASP Attribution Path",
            "targetVasp": case["nearestVasp"],
            "hopCount": case["nearestHop"],
            "totalVolumeUsd": case["incomingVolumeUsd"],
            "confidenceScore": case["confidence"],
            "evidenceStrength": "Strong",
            "averageTimeDelta": "36 minutes",
            "nodes": nodes,
            "edges": edges,
            "summary": f'Primary transaction path connects the target wallet to a {case["nearestVasp"]}-associated deposit cluster.'
        }
    ]

    return nodes, edges, paths


def analyze_wallet(wallet_address, network):
    case = get_case(wallet_address, network)

    transactions = generate_transactions(case)
    nodes, edges, paths = generate_graph(case)

    risk_profile = calculate_risk(case)
    vasp_connections = get_vasp_connections(case)

    evidence = []

    for connection in vasp_connections:
        evidence.extend(connection["evidenceList"])

    return {
        "targetWallet": case["targetWallet"],
        "network": case["network"],
        "caseId": case["id"],
        "caseData": case,
        "vaspConnections": vasp_connections,
        "graphNodes": nodes,
        "graphEdges": edges,
        "paths": paths,
        "riskProfile": risk_profile,
        "ledgerTransactions": transactions,
        "transactions": transactions,
        "evidenceList": evidence
    }