import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Accounts from "./pages/Accounts";
import Assets from "./pages/Assets";
import MyBots from "./pages/MyBots";
import Backtesting from "./pages/Backtesting";
import MLLog from "./pages/MLLog";
import SignalBots from "./pages/SignalBots";
import SignalBacktesting from "./pages/SignalBacktesting";
import DCABots from "./pages/DCABots";
import GRIDBots from "./pages/GRIDBots";
import LiveTradingTerminal from "./pages/LiveTradingTerminal";
import SignalMarketplace from "./pages/SignalMarketplace";
import Signals from "./pages/Signals";
import WatchlistMarkets from "./pages/WatchlistMarkets";
import GroupSubscriptions from "./pages/GroupSubscriptions";
import Upgrade from "./pages/Upgrade";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import TradeSetup from "./pages/TradeSetup";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="trades" element={<Trades />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="assets" element={<Assets />} />
          <Route path="ai-ml/my-bots" element={<MyBots />} />
          <Route path="ai-ml/backtesting" element={<Backtesting />} />
          <Route path="ai-ml/ml-log" element={<MLLog />} />
          <Route path="signal-bots" element={<SignalBots />} />
          <Route path="signal-bots/backtesting" element={<SignalBacktesting />} />
          <Route path="dca-bots" element={<DCABots />} />
          <Route path="grid-bots" element={<GRIDBots />} />
          <Route path="live-trading-terminal" element={<LiveTradingTerminal />} />
          <Route path="signal-marketplace" element={<SignalMarketplace />} />
          <Route path="signals" element={<Signals />} />
          <Route path="watchlist-markets" element={<WatchlistMarkets />} />
          <Route path="group-subscriptions" element={<GroupSubscriptions />} />
          <Route path="upgrade" element={<Upgrade />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
          <Route path="trade-setup" element={<TradeSetup />} />
        </Route>
      </Routes>
    </Router>
  );
}
