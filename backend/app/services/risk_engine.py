from datetime import datetime


def calculate_risk(case):
    score = float(case["riskScore"])

    if score >= 90:
        overall_level = "critical"
    elif score >= 75:
        overall_level = "high"
    elif score >= 50:
        overall_level = "medium"
    elif score >= 25:
        overall_level = "low"
    else:
        overall_level = "minimal"

    signals = [
        {
            "id": "sig-velocity",
            "name": "Transaction Velocity & Rapid Forwarding",
            "category": "Velocity",
            "level": "High" if score >= 75 else "Medium",
            "score": min(88, score),
            "metricValue": "38 minutes average forwarding latency",
            "benchmark": "Normal commercial latency > 24 hours",
            "description": "Funds are forwarded through intermediaries within a short time window.",
            "forensicObservation": "Rapid forwarding indicates a high-velocity transaction pattern.",
            "investigatorGuidance": "Review timestamp relationships between incoming and outgoing transfers."
        },
        {
            "id": "sig-peeling",
            "name": "Peeling Chain Structural Pattern",
            "category": "Obfuscation",
            "level": "High",
            "score": 84,
            "metricValue": "2 consecutive split relays detected",
            "benchmark": "0 peel hops in standard merchant flows",
            "description": "Repeated transfers through intermediary addresses create a multi-hop structure.",
            "forensicObservation": "The transaction structure contains repeated relay behavior.",
            "investigatorGuidance": "Review connected intermediary addresses and transaction timing."
        },
        {
            "id": "sig-vasp-proximity",
            "name": "VASP Proximity & Direct Inflow",
            "category": "Proximity",
            "level": "High" if case["nearestHop"] <= 2 else "Medium",
            "score": float(case["confidence"]),
            "metricValue": f'{case["nearestHop"]} Hop(s) to {case["nearestVasp"]}',
            "benchmark": "Attribution confidence threshold >= 70%",
            "description": (
                f'Potential relationship with {case["nearestVasp"]} '
                f'identified at {case["confidence"]}% confidence.'
            ),
            "forensicObservation": (
                "The wallet is located close to a VASP-associated deposit cluster "
                "in the synthetic investigation dataset."
            ),
            "investigatorGuidance": (
                "Review the associated deposit cluster and supporting transaction evidence."
            )
        },
        {
            "id": "sig-mixer",
            "name": "Mixer & Anonymity Tool Exposure",
            "category": "Sanctions",
            "level": "Medium",
            "score": 45,
            "metricValue": "Indirect exposure detected",
            "benchmark": "Zero exposure for ordinary custodial activity",
            "description": "A synthetic indirect exposure signal is included for demonstration.",
            "forensicObservation": "The signal requires additional evidence before attribution.",
            "investigatorGuidance": "Cross-check the relevant transaction history and screening records."
        },
        {
            "id": "sig-counterparties",
            "name": "Repeated Counterparty Clustering",
            "category": "Behavioral",
            "level": "Medium",
            "score": 65,
            "metricValue": "3 shared intermediate clusters",
            "benchmark": "Independent random counterparties",
            "description": "Multiple transactions are associated with recurring intermediary clusters.",
            "forensicObservation": "Repeated counterparties may indicate a connected transaction structure.",
            "investigatorGuidance": "Compare intermediary addresses with historical case data."
        }
    ]

    return {
        "overallScore": score,
        "overallLevel": overall_level,
        "methodologyVersion": "FATF-VASP-Trace Heuristic Engine v4.8",
        "evaluatedAt": datetime.utcnow().isoformat() + "Z",
        "signals": signals,
        "analyticalSummary": case["riskSummary"],
        "fatfTravelRuleFlags": [
            "Originator information may be unavailable across unhosted intermediary hops.",
            "High-value transfer requires review against applicable Travel Rule requirements.",
            "Recipient-side VASP identification should be independently verified."
        ],
        "recommendedLawEnforcementSteps": [
            f'Review available compliance records associated with {case["nearestVasp"]}.',
            "Request relevant KYC and transaction records through applicable legal procedures.",
            "Review the complete transaction ledger for connected intermediary addresses.",
            "Correlate blockchain evidence with other investigative records before attribution."
        ]
    }