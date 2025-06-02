import React from "react";

export default function Dashboard() {
  return (
    <div className="cards-grid">
      {/* Hoofdkaart: AI/ML hero */}
      <div className="card main">
        <div>
          <div className="metric-value ai-bots mb-3 text-3xl">The Power of AI and ML</div>
          <div className="metric mb-3 text-xl">Unlock the potential of AI-powered Machine Learning to optimize your trades and stay ahead of the market.</div>
          <button className="mt-6 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold shadow-lg hover:scale-105 transition">
            Optimaliseer met AI
          </button>
        </div>
        <div>
          {/* Hier kan een AI-image/icon komen, of animatie */}
          <span className="text-6xl">🤖</span>
        </div>
      </div>

      {/* Portfolio Balance */}
      <div className="card">
        <div className="metric">Portfolio Balance</div>
        <div className="metric-value portfolio">$45.2K</div>
      </div>

      {/* Risk Level */}
      <div className="card">
        <div className="metric">Risk Level</div>
        <div className="metric-value risk">Medium</div>
      </div>

      {/* Accuracy */}
      <div className="card">
        <div className="metric">Accuracy</div>
        <div className="metric-value accuracy">87%</div>
      </div>

      {/* Total Trades */}
      <div className="card">
        <div className="metric">Total Trades</div>
        <div className="metric-value trades">312</div>
      </div>

      {/* Profitable Trades */}
      <div className="card">
        <div className="metric">Profitable Trades</div>
        <div className="metric-value profit">202</div>
      </div>

      {/* Losing Trades */}
      <div className="card">
        <div className="metric">Losing Trades</div>
        <div className="metric-value loss">110</div>
      </div>

      {/* Open positions (voorbeeld) */}
      <div className="card">
        <div className="metric">Open Positions</div>
        <div className="metric-value">3</div>
      </div>

      {/* Laatste card als dummy of evt. in de toekomst grafiek */}
      <div className="card">
        <div className="metric">24h Volume</div>
        <div className="metric-value">$1.5M</div>
      </div>
    </div>
  );
}
