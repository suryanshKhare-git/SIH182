from fastapi import APIRouter, Query
from ..services.analysis_service import DEMO_CASES

router = APIRouter(prefix="/api/v1", tags=["Search"])


@router.get("/search")
def global_search(q: str = Query(...)):

    query = q.lower().strip()

    if not query:
        return {
            "cases": [],
            "wallets": [],
            "vasps": []
        }

    cases = [
        c for c in DEMO_CASES
        if (
            query in c["id"].lower()
            or query in c["caseReference"].lower()
            or query in c["title"].lower()
            or query in c["targetWallet"].lower()
            or query in c["nearestVasp"].lower()
        )
    ]

    wallets = [
        {
            "address": c["targetWallet"],
            "network": c["network"],
            "caseId": c["id"],
            "vasp": c["nearestVasp"]
        }
        for c in cases
    ]

    return {
        "cases": cases,
        "wallets": wallets,
        "vasps": []
    }