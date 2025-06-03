import json
import os
from flask import Flask, jsonify
from pybit.unified_trading import HTTP

PORT = int(os.getenv("PORT", 5000))
BASEDIR = os.path.dirname(os.path.abspath(__file__))
ACCOUNTS_FILE = os.path.join(BASEDIR, "accounts.json")

def load_account():
    try:
        with open(ACCOUNTS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        if not isinstance(data, list) or len(data) == 0:
            raise ValueError("accounts.json is leeg of bevat geen lijst.")
        return data[0]
    except Exception as e:
        print("❌ Fout bij inlezen accounts.json:", e)
        return None

app = Flask(__name__)

def create_bybit_client():
    account = load_account()
    if account is None:
        return None
    try:
        api_key = account.get("api_key")
        api_secret = account.get("api_secret")
        client = HTTP(
            testnet=False,
            api_key=api_key,
            api_secret=api_secret
        )
        return client
    except Exception as e:
        print("❌ Fout bij aanmaken Bybit-client:", e)
        return None

@app.route("/api/positions", methods=["GET"])
def get_positions():
    client = create_bybit_client()
    if client is None:
        return jsonify({"error": "Kon Bybit-client niet aanmaken"}), 500
    try:
        positions = client.get_positions(category="linear", settleCoin="USDT")["result"]["list"]
        return jsonify(positions)
    except Exception as e:
        print("Bybit positions error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/open-orders", methods=["GET"])
def get_open_orders():
    client = create_bybit_client()
    if client is None:
        return jsonify({"error": "Kon Bybit-client niet aanmaken"}), 500
    try:
        # DIT IS DE JUISTE!
        orders = client.get_open_orders(category="linear", settleCoin="USDT")["result"]["list"]
        return jsonify(orders)
    except Exception as e:
        print("Bybit openOrders error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/closed-orders", methods=["GET"])
def get_closed_orders():
    client = create_bybit_client()
    if client is None:
        return jsonify({"error": "Kon Bybit-client niet aanmaken"}), 500
    try:
        executions = client.get_executions(category="linear", settleCoin="USDT")["result"]["list"]
        return jsonify(executions)
    except Exception as e:
        print("Bybit closedOrders error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api", methods=["GET"])
def api_root():
    return jsonify({"message": "Gebruik /api/positions, /api/open-orders of /api/closed-orders"}), 200

if __name__ == "__main__":
    print(f"🚀 Python-Backend luistert op http://localhost:{PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=True)
