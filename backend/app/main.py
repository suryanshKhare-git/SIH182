from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine

from .routers import (
    analysis,
    cases,
    search,
    vasps,
    risk,
    transactions,
    evidence,
    watchlist,
    api_health
)


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="SIH 182 Blockchain Intelligence Backend",
    description="Blockchain wallet attribution and VASP intelligence backend",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(analysis.router)
app.include_router(cases.router)
app.include_router(search.router)
app.include_router(vasps.router)
app.include_router(risk.router)
app.include_router(transactions.router)
app.include_router(evidence.router)
app.include_router(watchlist.router)
app.include_router(api_health.router)


@app.get("/")
def root():
    return {
        "service": "SIH 182 Blockchain Intelligence Backend",
        "status": "operational",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }