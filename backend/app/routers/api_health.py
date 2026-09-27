from fastapi import APIRouter
from datetime import datetime

router = APIRouter(
    prefix="/api/v1",
    tags=["API Monitor"]
)


@router.get("/api-health")
def api_health():

    endpoints = [
        {
            "id": "api-001",
            "name": "Ethereum Indexer",
            "provider": "Internal Blockchain Intelligence",
            "category": "Layer 1 Indexer",
            "network": "Ethereum",
            "status": "operational",
            "latencyMs": 142,
            "uptime90d": 99.92,
            "requests24h": 28452,
            "errorRate": 0.08,
            "lastPing": datetime.utcnow().isoformat() + "Z",
            "endpointUrl": "https://api.example.local/ethereum",
            "authType": "API Key",
            "rateLimitUsed": 34
        },
        {
            "id": "api-002",
            "name": "Bitcoin Cluster Engine",
            "provider": "Internal Blockchain Intelligence",
            "category": "UTXO Cluster Engine",
            "network": "Bitcoin",
            "status": "operational",
            "latencyMs": 188,
            "uptime90d": 99.70,
            "requests24h": 14321,
            "errorRate": 0.11,
            "lastPing": datetime.utcnow().isoformat() + "Z",
            "endpointUrl": "https://api.example.local/bitcoin",
            "authType": "Signed JWT",
            "rateLimitUsed": 41
        }
    ]

    return {
        "endpoints": endpoints,
        "summary": {
            "overallHealth": "Healthy",
            "operationalCount": len(endpoints),
            "totalApis": len(endpoints),
            "avgLatencyMs": 165,
            "totalRequestsToday": sum(
                x["requests24h"] for x in endpoints
            ),
            "lastSyncTimestamp": datetime.utcnow().isoformat() + "Z"
        }
    }