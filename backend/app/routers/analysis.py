from fastapi import APIRouter, HTTPException
from ..schemas import AnalyzeRequest, WalletAnalysisResult
from ..services.analysis_service import analyze_wallet

router = APIRouter(prefix="/api/v1", tags=["Analysis"])


@router.post("/analyze", response_model=WalletAnalysisResult)
def analyze(request: AnalyzeRequest):

    if not request.walletAddress.strip():
        raise HTTPException(
            status_code=400,
            detail="Wallet address is required."
        )

    return analyze_wallet(
        request.walletAddress,
        request.network
    )