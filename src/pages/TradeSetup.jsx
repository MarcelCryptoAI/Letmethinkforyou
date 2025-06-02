// crypto-platform/src/pages/TradeSetup.jsx
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
