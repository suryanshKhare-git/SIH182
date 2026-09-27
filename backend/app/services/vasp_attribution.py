from datetime import datetime


VASP_DATABASE = [
    {
        "name": "Coinbase",
        "code": "CB",
        "type": "Centralized Exchange (CEX)",
        "jurisdiction": "United States",
        "regulator": "FinCEN / State Regulators"
    },
    {
        "name": "Binance",
        "code": "BNB",
        "type": "Centralized Exchange (CEX)",
        "jurisdiction": "Global",
        "regulator": "Multiple Jurisdictions"
    },
    {
        "name": "Kraken",
        "code": "KRK",
        "type": "Centralized Exchange (CEX)",
        "jurisdiction": "United States",
        "regulator": "FinCEN"
    }
]


def get_vasp_connections(case):
    vasp = next(
        (
            x for x in VASP_DATABASE
            if x["name"].lower() == case["nearestVasp"].lower()
        ),
        VASP_DATABASE[0]
    )

    evidence = [
        {
            "id": "EV-001",
            "type": "direct_transfer",
            "title": "VASP Deposit Relationship",
            "description": f'Observed transaction relationship with {vasp["name"]}.',
            "confidenceContribution": case["confidence"],
            "verified": True,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "txHash": "0xsample_transaction",
            "blockNumber": 21000000,
            "sourceApi": "Blockchain Intelligence API",
            "legalRelevance": "Potential attribution evidence requiring lawful verification."
        },
        {
            "id": "EV-002",
            "type": "multi_hop_path",
            "title": "Multi-Hop Transaction Path",
            "description": "Transaction path connects the target wallet to a known VASP-associated cluster.",
            "confidenceContribution": 18,
            "verified": True,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "sourceApi": "Graph Intelligence Engine",
            "legalRelevance": "Supports investigative tracing."
        }
    ]

    return [
        {
            "id": "VASPCONN-001",
            "vaspName": vasp["name"],
            "vaspCode": vasp["code"],
            "vaspType": vasp["type"],
            "jurisdiction": vasp["jurisdiction"],
            "regulatoryStatus": "Registered / Compliance Monitoring",
            "fatfCompliant": True,
            "network": case["network"],
            "hopDistance": case["nearestHop"],
            "txCount": max(case["txCount"] // 4, 1),
            "volumeUsd": case["incomingVolumeUsd"],
            "firstObserved": case["firstObserved"],
            "lastObserved": case["lastActive"],
            "confidenceScore": case["confidence"],
            "confidenceRating": (
                "high" if case["confidence"] >= 80
                else "medium" if case["confidence"] >= 60
                else "low"
            ),
            "attributionMethod": "Graph proximity + transaction flow + cluster correlation",
            "depositClusterAddress": "0xVASP_CLUSTER_SAMPLE",
            "clusterSize": 42,
            "evidenceCount": len(evidence),
            "evidenceList": evidence,
            "subpoenaProcess": {
                "lawEnforcementPortal": "VASP Legal Compliance Portal",
                "avgResponseDays": 5,
                "requiredLegalInstrument": "Applicable lawful request / preservation order",
                "complianceOffice": "Law Enforcement Compliance Desk"
            }
        }
    ]


def get_vasp_directory():
    result = []

    for index, vasp in enumerate(VASP_DATABASE):
        result.append({
            "id": f"VASP-{index + 1:03}",
            "name": vasp["name"],
            "code": vasp["code"],
            "type": vasp["type"],
            "headquarters": vasp["jurisdiction"],
            "jurisdiction": vasp["jurisdiction"],
            "regulator": vasp["regulator"],
            "fatfStatus": "Fully Compliant",
            "riskRating": "Moderate",
            "knownHotWallets": 1250 + index * 300,
            "associatedClusters": 85 + index * 20,
            "supportedNetworks": [
                "Ethereum",
                "Bitcoin",
                "Polygon",
                "BNB Chain"
            ],
            "leFocalPointEmail": f"compliance@{vasp['name'].lower()}.example",
            "verifiedDepositPatterns": [
                "Known custodial deposit cluster",
                "Hot wallet sweep pattern"
            ]
        })

    return result