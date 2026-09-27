from fastapi import APIRouter
from ..services.vasp_attribution import get_vasp_directory

router = APIRouter(prefix="/api/v1/vasps", tags=["VASP"])


@router.get("")
def get_vasps():
    return get_vasp_directory()


@router.get("/{vasp_id}")
def get_vasp(vasp_id: str):

    for vasp in get_vasp_directory():
        if vasp["id"].lower() == vasp_id.lower():
            return vasp

    return {
        "error": "VASP not found"
    }