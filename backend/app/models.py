from sqlalchemy import Column, Integer, String, Float, Boolean, Text
from .database import Base


class InvestigationCaseDB(Base):
    __tablename__ = "investigation_cases"

    id = Column(String, primary_key=True)
    case_reference = Column(String)
    title = Column(String)
    target_wallet = Column(String, index=True)
    network = Column(String)
    status = Column(String)
    priority = Column(String)

    assigned_investigator = Column(String)
    agency = Column(String)

    created_at = Column(String)
    updated_at = Column(String)
    first_observed = Column(String)
    last_active = Column(String)

    balance_usd = Column(Float)
    balance_native = Column(String)
    tx_count = Column(Integer)

    incoming_volume_usd = Column(Float)
    outgoing_volume_usd = Column(Float)

    risk_score = Column(Float)
    risk_level = Column(String)
    risk_summary = Column(Text)

    vasp_count = Column(Integer)
    nearest_vasp = Column(String)
    nearest_hop = Column(Integer)
    confidence = Column(Float)

    tags = Column(Text)
    notes = Column(Text)


class VaspDB(Base):
    __tablename__ = "vasps"

    id = Column(String, primary_key=True)
    name = Column(String)
    code = Column(String)
    type = Column(String)

    headquarters = Column(String)
    jurisdiction = Column(String)
    regulator = Column(String)

    fatf_status = Column(String)
    risk_rating = Column(String)

    known_hot_wallets = Column(Integer)
    associated_clusters = Column(Integer)

    supported_networks = Column(Text)

    le_focal_point_email = Column(String)
    verified_deposit_patterns = Column(Text)


class WatchlistDB(Base):
    __tablename__ = "watchlist"

    id = Column(String, primary_key=True)
    address = Column(String, index=True)
    label = Column(String)
    network = Column(String)

    added_at = Column(String)
    last_activity = Column(String)

    unseen_txs = Column(Integer)
    risk_score = Column(Float)

    recent_vasp = Column(String)
    recent_hop = Column(Integer)

    change_status = Column(String)