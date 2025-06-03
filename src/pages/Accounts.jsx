import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import { FaTrash, FaEdit, FaPowerOff, FaToggleOn, FaToggleOff } from "react-icons/fa";

// Accent kleuren
const COLORS = ["#36bffa", "#b692f6", "#2dd4bf", "#f59e42", "#38bdf8"];

function toCurrency(v) {
  return "$" + (+v).toLocaleString("en-US", { minimumFractionDigits: 2 });
}

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState({});
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("1d");

  // Ophalen accounts en balances
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const accRes = await axios.get("/api/accounts/");
        setAccounts(accRes.data);

        let bal = {};
        await Promise.all(accRes.data.map(async (acc) => {
          if (acc.id) {
            try {
              const bRes = await axios.get(`/api/accounts/${acc.id}/balance`);
              bal[acc.id] = bRes.data?.result?.list?.[0]?.totalEquity || 0;
            } catch {
              bal[acc.id] = 0;
            }
          }
        }));
        setBalances(bal);

        // **Hier echte Bybit portfolio data ophalen (dummy als fallback)**
        // Vervang door jouw eigen endpoint als deze bestaat!
        // Voor nu simuleer ik het even.
        // const pfRes = await axios.get(`/api/bybit/portfolio?period=${period}`);
        // setPortfolioData(pfRes.data);

        setPortfolioData([
          { time: "11PM", value: 12.8 },
          { time: "4AM", value: 12.8 },
          { time: "9AM", value: 12.8 },
          { time: "2PM", value: 47.8 },
          { time: "7PM", value: 29.1 }
        ]);
      } catch {
        setAccounts([]);
        setPortfolioData([]);
      }
      setLoading(false);
    }
    fetchData();
  }, [period]);

  // Pie chart data
  const pieData = accounts.map((acc, i) => ({
    name: acc.name,
    value: +balances[acc.id] || 0
  }));
  const total = Object.values(balances).reduce((a, b) => +a + +b, 0);

  // Tabel actie handlers (simpele placeholders)
  function handleActivate(id) { /* ... */ }
  function handleDeactivate(id) { /* ... */ }
  function handleEdit(id) { /* ... */ }
  function handleDelete(id) { /* ... */ }

  return (
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-2 gap-8 mb-10">
        {/* Accounts Allocation */}
        <div className="card shadow-xl glass-effect p-8 flex flex-col items-center relative">
          <div className="font-semibold text-blue-100 mb-4 text-lg tracking-wide">Accounts allocation</div>
          <div className="w-[250px] h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-3xl font-extrabold mt-2 mb-1 text-white tracking-tight">{toCurrency(total)}</div>
          <div className="text-blue-300 text-xs mb-4">Total</div>
          <div className="flex flex-col gap-1 mt-1">
            {pieData.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2 text-blue-200 text-xs">
                <span style={{ background: COLORS[i % COLORS.length], borderRadius: '50%', display: 'inline-block', width: 10, height: 10 }}></span>
                {p.name}
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Change */}
        <div className="card shadow-xl glass-effect p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-blue-100 text-lg tracking-wide">Portfolio Change</div>
            <div>
              <span className="text-green-400 text-lg font-bold mr-3">{toCurrency(16.2)}</span>
              <span className="bg-green-900/60 text-green-300 px-2 py-1 rounded text-xs font-bold">+125.87%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={175}>
            <LineChart data={portfolioData}>
              <CartesianGrid stroke="rgba(57,181,255,0.14)" strokeDasharray="4 6" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} stroke="#9be7fd" fontSize={14} />
              <YAxis domain={['auto', 'auto']} hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#18c0fa" strokeWidth={3.2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          {/* Period-selector: mooie pill-switch */}
          <div className="flex gap-2 mt-4 self-end">
            {["1d", "3d", "1w", "1m", "3m", "1y"].map(p => (
              <button
                key={p}
                className={`rounded-full px-4 py-1 text-sm font-bold transition border border-blue-900 shadow-sm ${period === p
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg scale-105"
                  : "bg-blue-950 text-blue-200 hover:bg-blue-900"}`}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="card shadow-xl glass-effect p-7">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-extrabold text-white">Accounts <span className="text-blue-400">({accounts.length})</span></div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-6 py-2 font-semibold shadow transition">+ Add Account</button>
        </div>
        <table className="w-full text-left table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-blue-300 text-xs uppercase">
              <th className="px-4 py-2 border-b border-blue-900">Name</th>
              <th className="px-2 py-2 border-b border-blue-900">Status</th>
              <th className="px-2 py-2 border-b border-blue-900">Total</th>
              <th className="px-2 py-2 border-b border-blue-900">Available</th>
              <th className="px-2 py-2 border-b border-blue-900">Broker</th>
              <th className="px-2 py-2 border-b border-blue-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, i) => (
              <tr key={acc.id} className="bg-gradient-to-r from-blue-900/60 to-blue-900/20 text-white rounded-2xl shadow border-b border-blue-900">
                <td className="py-3 px-4 font-bold rounded-l-2xl flex items-center gap-3">
                  <span className="text-2xl">🌐</span>
                  <span>{acc.name}</span>
                  <span className="ml-2 text-blue-400 text-xs">{acc.broker}</span>
                </td>
                <td>
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${acc.status === "active"
                    ? "bg-green-900/60 text-green-300"
                    : "bg-gray-900 text-gray-400"}`}>
                    {acc.status.charAt(0).toUpperCase() + acc.status.slice(1)}
                  </span>
                </td>
                <td>{toCurrency(balances[acc.id] || 0)}</td>
                <td>{toCurrency(balances[acc.id] || 0)}</td>
                <td>{acc.broker}</td>
               <td className="flex gap-2">
  {acc.status === "active" ? (
    <button title="Deactivate" className="rounded-full p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 shadow transition" onClick={() => handleDeactivate(acc.id)}>
      <FaPowerOff />
    </button>
  ) : (
    <button title="Activate" className="rounded-full p-2 bg-green-800 hover:bg-green-600 text-green-200 shadow transition" onClick={() => handleActivate(acc.id)}>
      <FaToggleOn />
    </button>
  )}
  <button title="Edit" className="rounded-full p-2 bg-blue-800 hover:bg-blue-700 text-blue-200 shadow transition" onClick={() => handleEdit(acc.id)}>
    <FaEdit />
  </button>
  <button title="Delete" className="rounded-full p-2 bg-pink-700 hover:bg-pink-800 text-white shadow transition" onClick={() => handleDelete(acc.id)}>
    <FaTrash />
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
