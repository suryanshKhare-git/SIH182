from fastapi import APIRouter

router = APIRouter(
    prefix="/api/v1/watchlist",
    tags=["Watchlist"]
)


WATCHLIST = [
    {
        "id": "WL-001",
        "address": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
        "label": "High Risk Investigation Wallet",
        "network": "Ethereum",
        "addedAt": "2026-09-01T10:00:00Z",
        "lastActivity": "2026-09-27T12:30:00Z",
        "unseenTxs": 4,
        "riskScore": 87,
        "recentVasp": "Coinbase",
        "recentHop": 2,
        "changeStatus": "vasp_attributed"
    }
]


@router.get("")
def get_watchlist():
    return WATCHLIST


@router.post("")
def add_to_watchlist(wallet: dict):

    wallet["id"] = f"WL-{len(WATCHLIST) + 1:03}"

    WATCHLIST.append(wallet)

    return wallet