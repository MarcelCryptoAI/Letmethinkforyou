#!/bin/bash

set -e

echo "---- [FRONTEND SETUP: STAP 1] ----"
echo "Verwijder oude frontend map..."
rm -rf crypto-platform

echo "Start scaffolding van Vite/React-project..."
npm create vite@latest crypto-platform -- --template react --force

echo ""
echo "---- FRONTEND SCAFFOLD KLAAR ----"
echo "Voer nu handmatig of in stap 2 de dependencies-installatie uit!"
