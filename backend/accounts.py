import json
from fastapi import APIRouter, HTTPException, Body
from typing import List, Optional
from pydantic import BaseModel
from pathlib import Path

# ---- ACCOUNTS STORAGE (gewoon json-file, per account type/type field) ----

DATA_FILE = Path("accounts.json")

class BrokerAccount(BaseModel):
    id: str
    name: str
    broker: str  # 'Bybit', 'Binance', etc.
    api_key: str
    api_secret: str
    status: str  # 'active'/'inactive'

router = APIRouter(prefix="/api/accounts")

def load_accounts():
    if DATA_FILE.exists():
        with open(DATA_FILE) as f:
            return json.load(f)
    return []

def save_accounts(accounts):
    with open(DATA_FILE, "w") as f:
        json.dump(accounts, f, indent=2)

@router.get("/")
async def list_accounts():
    """Lijst van alle gekoppelde broker-accounts (zonder geheimen tonen)"""
    accounts = load_accounts()
    for acc in accounts:
        acc['api_key'] = acc['api_key'][:6] + "****"
        acc['api_secret'] = "****"
    return accounts

@router.post("/")
async def add_account(account: BrokerAccount):
    accounts = load_accounts()
    accounts.append(account.dict())
    save_accounts(accounts)
    return {"status": "ok"}

@router.delete("/{account_id}")
async def delete_account(account_id: str):
    accounts = load_accounts()
    accounts = [a for a in accounts if a["id"] != account_id]
    save_accounts(accounts)
    return {"status": "deleted"}

@router.post("/{account_id}/deactivate")
async def deactivate_account(account_id: str):
    accounts = load_accounts()
    for a in accounts:
        if a["id"] == account_id:
            a["status"] = "inactive"
    save_accounts(accounts)
    return {"status": "deactivated"}

@router.post("/{account_id}/activate")
async def activate_account(account_id: str):
    accounts = load_accounts()
    for a in accounts:
        if a["id"] == account_id:
            a["status"] = "active"
    save_accounts(accounts)
    return {"status": "activated"}

# ---- BYBIT BALANCE ----
from pybit.unified_trading import HTTP

@router.get("/{account_id}/balance")
async def get_balance(account_id: str):
    accounts = load_accounts()
    acc = next((a for a in accounts if a["id"] == account_id), None)
    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")
    if acc["broker"].lower() == "bybit":
        session = HTTP(api_key=acc["api_key"], api_secret=acc["api_secret"])
        # Zie Bybit v5 docs voor /v5/account/wallet-balance:
        data = session.get_wallet_balance(accountType="UNIFIED")
        return data
    # (Uitbreiden voor andere brokers)
    raise HTTPException(status_code=400, detail="Onbekend broker-type")

from datetime import datetime, timedelta

@router.get("/{account_id}/history")
async def get_account_history(account_id: str):
    accounts = load_accounts()
    acc = next((a for a in accounts if a["id"] == account_id), None)
    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")
    if acc["broker"].lower() == "bybit":
        session = HTTP(api_key=acc["api_key"], api_secret=acc["api_secret"])
        now = datetime.utcnow()
        # Simulatie: fetch 24u punten met evenwichtig gespreid saldo, vervang door echte Bybit API logic!
        history = []
        for h in range(24):
            ts = (now - timedelta(hours=23-h)).isoformat()
            value = 29.07 + h * 0.3 + (0.5 if h > 12 else 0)  # Dummy data, replace by echte saldo's
            history.append({"timestamp": ts, "balance": value})
        return {"history": history}
    raise HTTPException(status_code=400, detail="Onbekend broker-type")
