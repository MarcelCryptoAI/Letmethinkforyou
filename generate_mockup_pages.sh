#!/bin/bash

# Maak alle benodigde directories aan (indien nog niet aanwezig)
mkdir -p src/pages

# Dashboard.jsx
cat <<EOF > src/pages/Dashboard.jsx
import React from "react";
export default function Dashboard() {
  return <div className="content"><h2>Dashboard</h2></div>;
}
EOF

# Trades.jsx
cat <<EOF > src/pages/Trades.jsx
import React from "react";
export default function Trades() {
  return <div className="content"><h2>Trades</h2></div>;
}
EOF

# Accounts.jsx
cat <<EOF > src/pages/Accounts.jsx
import React from "react";
export default function Accounts() {
  return <div className="content"><h2>Accounts</h2></div>;
}
EOF

# Assets.jsx
cat <<EOF > src/pages/Assets.jsx
import React from "react";
export default function Assets() {
  return <div className="content"><h2>Assets</h2></div>;
}
EOF

# MyBots.jsx (TradeSetup hier plaatsen)
cat <<EOF > src/pages/MyBots.jsx
import React from "react";
import TradeSetup from "./TradeSetup";
export default function MyBots() {
  return (
    <div className="content">
      <h2>My Bots</h2>
      <TradeSetup />
    </div>
  );
}
EOF

# Backtesting.jsx
cat <<EOF > src/pages/Backtesting.jsx
import React from "react";
export default function Backtesting() {
  return <div className="content"><h2>Backtesting</h2></div>;
}
EOF

# MLLog.jsx
cat <<EOF > src/pages/MLLog.jsx
import React from "react";
export default function MLLog() {
  return <div className="content"><h2>Machine Learning Log</h2></div>;
}
EOF

# SignalMarketplace.jsx
cat <<EOF > src/pages/SignalMarketplace.jsx
import React from "react";
export default function SignalMarketplace() {
  return <div className="content"><h2>Signal Marketplace</h2></div>;
}
EOF

# Signals.jsx
cat <<EOF > src/pages/Signals.jsx
import React from "react";
export default function Signals() {
  return <div className="content"><h2>Signals</h2></div>;
}
EOF

# WatchlistMarkets.jsx
cat <<EOF > src/pages/WatchlistMarkets.jsx
import React from "react";
export default function WatchlistMarkets() {
  return <div className="content"><h2>Watchlist & Markets</h2></div>;
}
EOF

# GroupSubscriptions.jsx
cat <<EOF > src/pages/GroupSubscriptions.jsx
import React from "react";
export default function GroupSubscriptions() {
  return <div className="content"><h2>Group Subscriptions</h2></div>;
}
EOF

# Upgrade.jsx
cat <<EOF > src/pages/Upgrade.jsx
import React from "react";
export default function Upgrade() {
  return <div className="content"><h2>Upgrade</h2></div>;
}
EOF

# Billing.jsx
cat <<EOF > src/pages/Billing.jsx
import React from "react";
export default function Billing() {
  return <div className="content"><h2>Billing</h2></div>;
}
EOF

echo "Alle pagina's zijn succesvol aangemaakt in src/pages."
