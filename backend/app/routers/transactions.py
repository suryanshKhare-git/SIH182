from fastapi import APIRouter
from ..services.analysis_service import analyze_wallet

router = APIRouter(
    prefix="/api/v1/transactions",
    tags=["Transactions"]
)


@router.get("/{wallet}")
def get_transactions(wallet: str):

    result = analyze_wallet(wallet, "Ethereum")

    return {
        "wallet": wallet,
        "transactions": result["transactions"]
    }