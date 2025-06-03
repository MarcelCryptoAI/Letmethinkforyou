import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";

export default function Trades() {
  const [currentPositions, setCurrentPositions] = useState([]);
  const [openOrders, setOpenOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1) Huidige posities ophalen
        const posRes = await fetch("/api/positions");
        if (!posRes.ok) throw new Error(`Positions HTTP ${posRes.status}`);
        const posJson = await posRes.json();

        // 2) Open orders ophalen
        const openRes = await fetch("/api/open-orders");
        if (!openRes.ok) throw new Error(`OpenOrders HTTP ${openRes.status}`);
        const openJson = await openRes.json();

        // 3) Closed orders ophalen
        const closedRes = await fetch("/api/closed-orders");
        if (!closedRes.ok) throw new Error(`ClosedOrders HTTP ${closedRes.status}`);
        const closedJson = await closedRes.json();

        setCurrentPositions(posJson);
        setOpenOrders(openJson);
        setClosedOrders(closedJson);
      } catch (err) {
        console.error("Fetch error in Trades:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Laden…</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">Fout: {error}</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Huidige Posities */}
      <Card>
        <CardHeader>
          <CardTitle>Huidige Posities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbool</TableHead>
                <TableHead>Aantal</TableHead>
                <TableHead>Gem. Prijs</TableHead>
                <TableHead>Huidige Prijs</TableHead>
                <TableHead>P/L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPositions.map((pos) => (
                <TableRow key={pos.symbol + (pos.positionIdx || "")}>
                  <TableCell>{pos.symbol}</TableCell>
                  <TableCell>{pos.size ?? pos.qty}</TableCell>
                  <TableCell>€{(pos.entry_price ?? 0).toFixed(2)}</TableCell>
                  <TableCell>€{(pos.mark_price ?? 0).toFixed(2)}</TableCell>
                  <TableCell
                    className={
                      (pos.unrealised_pnl ?? 0) >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {(pos.unrealised_pnl ?? 0) >= 0 ? "+" : ""}
                    €{Math.abs(pos.unrealised_pnl ?? 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              {currentPositions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-gray-400 text-center">
                    Geen posities gevonden.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Open Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Open Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order-ID</TableHead>
                <TableHead>Symbool</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Aantal</TableHead>
                <TableHead>Prijs</TableHead>
                <TableHead>Datum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openOrders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.symbol}</TableCell>
                  <TableCell>{order.side}</TableCell>
                  <TableCell>{order.qty ?? order.size}</TableCell>
                  <TableCell>€{(order.price ?? 0).toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(order.create_time).toLocaleString("nl-NL")}
                  </TableCell>
                </TableRow>
              ))}
              {openOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-gray-400 text-center">
                    Geen open orders gevonden.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Closed Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Closed Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order-ID</TableHead>
                <TableHead>Symbool</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Aantal</TableHead>
                <TableHead>Prijs</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {closedOrders.map((order) => (
                <TableRow key={order.exec_id}>
                  <TableCell>{order.exec_id}</TableCell>
                  <TableCell>{order.symbol}</TableCell>
                  <TableCell>{order.side}</TableCell>
                  <TableCell>{order.qty ?? order.size}</TableCell>
                  <TableCell>€{(order.price ?? 0).toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(order.exec_time_ms).toLocaleString("nl-NL")}
                  </TableCell>
                  <TableCell>{order.order_status}</TableCell>
                </TableRow>
              ))}
              {closedOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-gray-400 text-center">
                    Geen gesloten orders gevonden.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
