#!/bin/bash

set -e

echo "--------------------------------------"
echo "⚡️ VERNIEUWD INSTALLATIE & STARTSCRIPT"
echo "--------------------------------------"

echo "[0/7] Opruimen oude omgeving..."
rm -rf crypto-platform backend

echo "[1/7] Frontend scaffolding..."
npm create vite@latest crypto-platform -- --template react --force

echo "[2/7] Frontend dependencies installeren..."
cd crypto-platform
npm install
npm install tailwindcss postcss autoprefixer axios react-router-dom
npx tailwindcss init -p

echo "[3/7] Tailwind configureren..."
cat <<EOL > tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
EOL

cat <<EOL > ./src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

mkdir -p ./src/pages

cat <<EOL > ./src/pages/Settings.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  const saveSettings = async () => {
    await axios.post('/api/save-keys', { apiKey, apiSecret });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">API Settings</h2>
      <input placeholder="API Key" value={apiKey} onChange={e => setApiKey(e.target.value)} className="border p-2 rounded w-full mb-2" />
      <input placeholder="API Secret" value={apiSecret} onChange={e => setApiSecret(e.target.value)} className="border p-2 rounded w-full mb-2" />
      <button onClick={saveSettings} className="bg-blue-500 text-white p-2 rounded">Save</button>
    </div>
  );
}
EOL

cat <<EOL > ./src/pages/TradeSetup.jsx
import React, { useState } from 'react';

export default function TradeSetup() {
  const [coin, setCoin] = useState('BTCUSDT');
  const [timeframe, setTimeframe] = useState('5m');
  const [indicator, setIndicator] = useState('RSI');
  const [indicatorSettings, setIndicatorSettings] = useState({ period: 14 });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Trade Setup</h2>
      <select value={coin} onChange={e => setCoin(e.target.value)} className="border p-2 rounded w-full mb-2">
        <option>BTCUSDT</option>
        <option>ETHUSDT</option>
      </select>
      <select value={timeframe} onChange={e => setTimeframe(e.target.value)} className="border p-2 rounded w-full mb-2">
        <option>1m</option>
        <option>5m</option>
        <option>1h</option>
      </select>
      <select value={indicator} onChange={e => setIndicator(e.target.value)} className="border p-2 rounded w-full mb-2">
        <option>RSI</option>
        <option>MACD</option>
        <option>KDJ</option>
        <option>Supertrend</option>
      </select>
      <input type="number" value={indicatorSettings.period} onChange={e => setIndicatorSettings({ period: e.target.value })} placeholder="Indicator Period" className="border p-2 rounded w-full mb-2" />
      <button className="bg-blue-500 text-white p-2 rounded">Optimaliseer met AI (Dummy)</button>
    </div>
  );
}
EOL

cd ..

echo "[4/7] Backend omgeving en dependencies..."
python3 -m venv backend/env
source backend/env/bin/activate
pip install --upgrade pip
pip install fastapi uvicorn python-dotenv pybit

mkdir -p backend

cat <<EOL > backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import set_key

app = FastAPI()

class APIKeys(BaseModel):
    apiKey: str
    apiSecret: str

@app.post("/api/save-keys")
async def save_keys(keys: APIKeys):
    set_key(".env", "BYBIT_API_KEY", keys.apiKey)
    set_key(".env", "BYBIT_API_SECRET", keys.apiSecret)
    return {"message": "API keys opgeslagen"}
EOL

cat <<EOL > backend/.env
BYBIT_API_KEY=
BYBIT_API_SECRET=
EOL

echo "[5/7] Startscript genereren..."

cat <<EOL > start_all.sh
#!/bin/bash
cd crypto-platform
npm run dev &
cd ../backend
source env/bin/activate
uvicorn main:app --reload &
EOL
chmod +x start_all.sh

echo "[6/7] Rechten goedzetten en opschonen..."
chmod -R 755 .

echo ""
echo "--------------------------------------"
echo "🚀 Installatie voltooid!"
echo "Start alles met: ./start_all.sh"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8000"
echo "--------------------------------------"
echo ""

