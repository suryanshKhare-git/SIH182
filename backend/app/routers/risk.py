from fastapi import APIRouter
from ..services.analysis_service import analyze_wallet

router = APIRouter(prefix="/api/v1/risk", tags=["Risk"])


@router.get("/{wallet}")
def get_risk(wallet: str):

    result = analyze_wallet(wallet, "Ethereum")

    return result["riskProfile"]