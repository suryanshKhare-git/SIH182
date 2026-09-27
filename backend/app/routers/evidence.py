from fastapi import APIRouter
from ..services.analysis_service import analyze_wallet

router = APIRouter(
    prefix="/api/v1/evidence",
    tags=["Evidence"]
)


@router.get("/{wallet}")
def get_evidence(wallet: str):

    result = analyze_wallet(wallet, "Ethereum")

    return {
        "wallet": wallet,
        "evidence": result["evidenceList"]
    }