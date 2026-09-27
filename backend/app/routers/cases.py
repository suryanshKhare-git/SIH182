from fastapi import APIRouter
from ..services.analysis_service import DEMO_CASES

router = APIRouter(prefix="/api/v1/cases", tags=["Cases"])


@router.get("")
def get_cases():
    return DEMO_CASES


@router.get("/{case_id}")
def get_case(case_id: str):

    for case in DEMO_CASES:
        if case["id"].lower() == case_id.lower():
            return case

    return {
        "error": "Case not found"
    }