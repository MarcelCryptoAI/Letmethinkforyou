#!/bin/bash

PAGES=(
  Dashboard Trades Accounts Assets
  MyBots Backtesting MLLog
  SignalBots SignalBacktesting
  DCABots GRIDBots
  LiveTradingTerminal
  SignalMarketplace Signals WatchlistMarkets
  GroupSubscriptions Upgrade Billing
  Settings TradeSetup
)

for PAGE in "${PAGES[@]}"; do
  FILE="pages/${PAGE}.jsx"
  if [ ! -f "$FILE" ]; then
    echo "import React from 'react';
export default function ${PAGE}() {
  return <div className=\"content\"><h2>${PAGE//([A-Z])/' $1'}</h2></div>;
}
" > "$FILE"
    echo "Aangemaakt: $FILE"
  else
    echo "Bestaat al: $FILE"
  fi
done
