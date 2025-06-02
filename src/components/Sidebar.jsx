import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <div className="logo">🤖</div>
        <span className="brand">AICrypto</span>
      </div>
      <nav className="menu">
        <Link to="/" className="menu-item">Dashboard</Link>
        <Link to="/trades" className="menu-item">Trades</Link>
        <Link to="/accounts" className="menu-item">Accounts</Link>
        <Link to="/assets" className="menu-item">Assets</Link>

        <div className="menu-section">AI & ML Bots</div>
        <Link to="/ai-ml/my-bots" className="menu-item">My Bots</Link>
        <Link to="/ai-ml/backtesting" className="menu-item">Backtesting</Link>
        <Link to="/ai-ml/ml-log" className="menu-item">Machine Learning Log</Link>

        <div className="menu-section">Signal Bots & Tradingview Bots</div>
        <Link to="/signal-bots" className="menu-item">My Bots</Link>
        <Link to="/signal-bots/backtesting" className="menu-item">Backtesting</Link>

        <div className="menu-section">DCA & GRID Bots</div>
        <Link to="/dca-bots" className="menu-item">DCA Bots (Public Presets)</Link>
        <Link to="/grid-bots" className="menu-item">GRID Bots (Public Presets)</Link>

        <div className="menu-section">Live Trading & Signal</div>
        <Link to="/live-trading-terminal" className="menu-item">Live Trading Terminal</Link>
        <Link to="/signal-marketplace" className="menu-item">Signal Marketplace</Link>
        <Link to="/signals" className="menu-item">Signals</Link>
        <Link to="/watchlist-markets" className="menu-item">Watchlist & Markets</Link>
        <Link to="/group-subscriptions" className="menu-item">Group Subscriptions</Link>

        <div className="menu-section">Account</div>
        <Link to="/upgrade" className="menu-item">Upgrade</Link>
        <Link to="/billing" className="menu-item">Billing</Link>
        <Link to="/settings" className="menu-item">Settings</Link>
      </nav>
    </aside>
  );
}
