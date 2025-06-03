#!/bin/bash

set -e

echo "---- [FRONTEND DEPENDENCIES & BACKEND SETUP: STAP 2] ----"

cd crypto-platform
echo "Nu: npm install"
npm install

echo "Nu: extra npm install (tailwind, axios, router, postcss, etc)"
npm install tailwindcss postcss autoprefixer axios react-router-dom

npx tailwindcss init -p

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

echo "Aanmaken en activeren van Python-omgeving..."
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

cat <<EOL > start_all.sh
#!/bin/bash
cd crypto-platform
npm run dev &
cd ../backend
source env/bin/activate
uvicorn main:app --reload &
EOL
chmod +x start_all.sh

echo ""
echo "---- INSTALLATIE & SETUP KLAAR ----"
echo "Frontend: cd crypto-platform && npm run dev"
echo "Backend:  cd backend && source env/bin/activate && uvicorn main:app --reload"
echo "Of start alles tegelijk: ./start_all.sh"
