import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import pkg from "bybit-api";

// Probeer eerst LinearClient rechtstreeks te pakken, anders uit pkg.default
const LinearClient = pkg.LinearClient ?? pkg.default?.LinearClient;

if (typeof LinearClient !== "function") {
  console.error("❌ Kon LinearClient niet vinden in bybit-api. In pkg zit:", Object.keys(pkg), "en in pkg.default zit:", Object.keys(pkg.default || {}));
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 8000;

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Zet CORS aan zodat de frontend op poort 5173 mag fetchen
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET"],
  })
);

// Path naar accounts.json (zelfde map als server.js)
const ACCOUNTS_FILE = path.join(__dirname, "accounts.json");

// accounts.json inlezen
function loadAccounts() {
  try {
    const raw = fs.readFileSync(ACCOUNTS_FILE, "utf-8");
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error("Geen accountgegevens gevonden in accounts.json");
    }
    return arr[0];
  } catch (err) {
    console.error("Fout bij inlezen accounts.json:", err);
    return null;
  }
}

// Maak de Bybit LinearClient aan (v4.x)
function createBybitClient() {
  const account = loadAccounts();
  if (!account) return null;

  // LinearClient(apiKey, apiSecret, useLivenet: boolean)
  return new LinearClient(account.api_key, account.api_secret, false);
}

// GET /api/positions → open posities
app.get("/api/positions", async (req, res) => {
  const client = createBybitClient();
  if (!client) {
    return res.status(500).json({ error: "Kon Bybit client niet aanmaken" });
  }
  try {
    const resp = await client.getPositions({ category: "linear" });
    res.json(resp.result.list || []);
  } catch (err) {
    console.error("Bybit positions error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/open-orders → openstaande orders
app.get("/api/open-orders", async (req, res) => {
  const client = createBybitClient();
  if (!client) {
    return res.status(500).json({ error: "Kon Bybit client niet aanmaken" });
  }
  try {
    const resp = await client.getOpenOrders({
      category: "linear",
      openOnly: 0,
      limit: 50,
    });
    res.json(resp.result.list || []);
  } catch (err) {
    console.error("Bybit openOrders error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/closed-orders → gesloten (historische) orders
app.get("/api/closed-orders", async (req, res) => {
  const client = createBybitClient();
  if (!client) {
    return res.status(500).json({ error: "Kon Bybit client niet aanmaken" });
  }
  try {
    const resp = await client.getOrderHistory({
      category: "linear",
      limit: 50,
    });
    res.json(resp.result.list || []);
  } catch (err) {
    console.error("Bybit closedOrders error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend luistert op http://localhost:${PORT}`);
});
