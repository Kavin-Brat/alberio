"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, TrendingUp, BarChart3, Clock, AlertTriangle, Calendar, RefreshCw, X, FileText, CheckCircle } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, Cell } from "recharts";

interface Trade {
  id: string;
  date: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrice: number;
  exitPrice: number;
  stopLoss: number;
  takeProfit: number;
  size: number;
  pnl: number;
  rr: number;
  strategy: string;
  psychology: string;
  session: "London" | "New York" | "Tokyo" | "Sydney";
  notes: string;
}

const DEFAULT_TRADES: Trade[] = [
  {
    id: "t1",
    date: "2026-07-28T09:15",
    symbol: "EUR/USD",
    direction: "LONG",
    entryPrice: 1.0850,
    exitPrice: 1.0910,
    stopLoss: 1.0820,
    takeProfit: 1.0910,
    size: 2.0,
    pnl: 1200,
    rr: 2.0,
    strategy: "Order Block",
    psychology: "Disciplined",
    session: "London",
    notes: "Clean mitigation of 15m order block. Exited at TP."
  },
  {
    id: "t2",
    date: "2026-07-29T14:30",
    symbol: "Gold (XAU)",
    direction: "SHORT",
    entryPrice: 2420,
    exitPrice: 2432,
    stopLoss: 2432,
    takeProfit: 2400,
    size: 1.5,
    pnl: -1800,
    rr: 1.6,
    strategy: "Breakout",
    psychology: "FOMO",
    session: "New York",
    notes: "Chased price after volatility index spiked. Stop loss hit."
  },
  {
    id: "t3",
    date: "2026-07-30T08:45",
    symbol: "GBP/USD",
    direction: "LONG",
    entryPrice: 1.2650,
    exitPrice: 1.2750,
    stopLoss: 1.2610,
    takeProfit: 1.2750,
    size: 2.5,
    pnl: 2500,
    rr: 2.5,
    strategy: "Fair Value Gap",
    psychology: "Disciplined",
    session: "London",
    notes: "Liquidity grab below Asian lows, entry at FVG fill."
  },
  {
    id: "t4",
    date: "2026-08-01T15:20",
    symbol: "EUR/USD",
    direction: "SHORT",
    entryPrice: 1.0920,
    exitPrice: 1.0880,
    stopLoss: 1.0940,
    takeProfit: 1.0860,
    size: 2.0,
    pnl: 800,
    rr: 2.0,
    strategy: "Trend",
    psychology: "Early Exit",
    session: "New York",
    notes: "Exited early ahead of economic release. Closed +40 pips."
  },
  {
    id: "t5",
    date: "2026-08-02T02:00",
    symbol: "Bitcoin",
    direction: "LONG",
    entryPrice: 65000,
    exitPrice: 66500,
    stopLoss: 64200,
    takeProfit: 66600,
    size: 0.5,
    pnl: 750,
    rr: 2.0,
    strategy: "Order Block",
    psychology: "Disciplined",
    session: "Tokyo",
    notes: "Asia session range deviation. Exited manually near high range."
  }
];

export default function TradeJournal() {
  const [mounted, setMounted] = useState(false);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);

  // Form Fields
  const [symbol, setSymbol] = useState("EUR/USD");
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [date, setDate] = useState("2026-08-03T11:00");
  const [entryPrice, setEntryPrice] = useState(1.0850);
  const [exitPrice, setExitPrice] = useState(1.0900);
  const [stopLoss, setStopLoss] = useState(1.0820);
  const [takeProfit, setTakeProfit] = useState(1.0910);
  const [size, setSize] = useState(1.0);
  const [pnl, setPnl] = useState(500);
  const [strategy, setStrategy] = useState("Order Block");
  const [psychology, setPsychology] = useState("Disciplined");
  const [session, setSession] = useState<"London" | "New York" | "Tokyo" | "Sydney">("London");
  const [notes, setNotes] = useState("");

  // Load from local storage
  useEffect(() => {
    setMounted(true);
    const localData = localStorage.getItem("albireo_trade_log");
    if (localData) {
      try {
        setTrades(JSON.parse(localData));
      } catch (e) {
        setTrades(DEFAULT_TRADES);
      }
    } else {
      setTrades(DEFAULT_TRADES);
      localStorage.setItem("albireo_trade_log", JSON.stringify(DEFAULT_TRADES));
    }
  }, []);

  // Sync to local storage
  const saveToLocalStorage = (updatedTrades: Trade[]) => {
    setTrades(updatedTrades);
    localStorage.setItem("albireo_trade_log", JSON.stringify(updatedTrades));
  };

  // Reset form to defaults
  const resetForm = () => {
    setSymbol("EUR/USD");
    setDirection("LONG");
    setDate(new Date().toISOString().substring(0, 16));
    setEntryPrice(1.0);
    setExitPrice(1.0);
    setStopLoss(0.9);
    setTakeProfit(1.2);
    setSize(1.0);
    setPnl(0);
    setStrategy("Order Block");
    setPsychology("Disciplined");
    setSession("London");
    setNotes("");
    setEditingTrade(null);
  };

  // Trigger modal for New Trade
  const handleNewTrade = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Trigger modal for Edit Trade
  const handleEditTrade = (trade: Trade) => {
    setEditingTrade(trade);
    setSymbol(trade.symbol);
    setDirection(trade.direction);
    setDate(trade.date);
    setEntryPrice(trade.entryPrice);
    setExitPrice(trade.exitPrice);
    setStopLoss(trade.stopLoss);
    setTakeProfit(trade.takeProfit);
    setSize(trade.size);
    setPnl(trade.pnl);
    setStrategy(trade.strategy);
    setPsychology(trade.psychology);
    setSession(trade.session);
    setNotes(trade.notes);
    setIsModalOpen(true);
  };

  // Handle Save
  const handleSaveTrade = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-calculate risk/reward if possible
    const diff = Math.abs(entryPrice - stopLoss);
    const reward = Math.abs(exitPrice - entryPrice);
    const calculatedRR = diff > 0 ? parseFloat((reward / diff).toFixed(1)) : 1.0;

    const newTradeRecord: Trade = {
      id: editingTrade ? editingTrade.id : "t-" + Date.now(),
      date,
      symbol,
      direction,
      entryPrice,
      exitPrice,
      stopLoss,
      takeProfit,
      size,
      pnl,
      rr: calculatedRR,
      strategy,
      psychology,
      session,
      notes
    };

    let updatedList: Trade[];
    if (editingTrade) {
      updatedList = trades.map((t) => (t.id === editingTrade.id ? newTradeRecord : t));
    } else {
      updatedList = [newTradeRecord, ...trades];
    }

    saveToLocalStorage(updatedList);
    setIsModalOpen(false);
    resetForm();
  };

  // Handle Delete
  const handleDeleteTrade = (id: string) => {
    if (confirm("Are you sure you want to delete this trade log?")) {
      const updatedList = trades.filter((t) => t.id !== id);
      saveToLocalStorage(updatedList);
    }
  };

  // Metrics Calculations
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const totalTrades = trades.length;
  const winTrades = trades.filter((t) => t.pnl > 0).length;
  const winRate = totalTrades > 0 ? parseFloat(((winTrades / totalTrades) * 100).toFixed(1)) : 0;
  
  const grossProfit = trades.filter((t) => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0);
  const grossLoss = Math.abs(trades.filter((t) => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0));
  const profitFactor = grossLoss > 0 ? parseFloat((grossProfit / grossLoss).toFixed(2)) : grossProfit > 0 ? 9.99 : 0;
  
  const avgRR = totalTrades > 0 ? parseFloat((trades.reduce((sum, t) => sum + t.rr, 0) / totalTrades).toFixed(1)) : 0;

  // Drawdown experienced logic
  let peak = 0;
  let runningBal = 0;
  let maxDD = 0;
  // Sort trades by date for chronological curve calculations
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  sortedTrades.forEach((t) => {
    runningBal += t.pnl;
    if (runningBal > peak) peak = runningBal;
    const currentDD = peak - runningBal;
    if (currentDD > maxDD) maxDD = currentDD;
  });

  // 1. Recharts Equity Curve Data
  let cumulativePnL = 0;
  const equityCurveData = sortedTrades.map((t, idx) => {
    cumulativePnL += t.pnl;
    return {
      index: idx + 1,
      date: new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      "Cumulative P&L": cumulativePnL
    };
  });
  // Prefix starting point
  equityCurveData.unshift({ index: 0, date: "Start", "Cumulative P&L": 0 });

  // 2. Recharts Session Win Rate Data
  const sessions = ["London", "New York", "Tokyo", "Sydney"] as const;
  const sessionData = sessions.map((sess) => {
    const sessionTrades = trades.filter((t) => t.session === sess);
    const totalSess = sessionTrades.length;
    const winsSess = sessionTrades.filter((t) => t.pnl > 0).length;
    const rate = totalSess > 0 ? Math.round((winsSess / totalSess) * 100) : 0;
    return { name: sess, "Win Rate %": rate, count: totalSess };
  });

  // 3. Recharts P&L by Currency Pair
  const pairPnLMap: Record<string, number> = {};
  trades.forEach((t) => {
    pairPnLMap[t.symbol] = (pairPnLMap[t.symbol] || 0) + t.pnl;
  });
  const assetData = Object.entries(pairPnLMap).map(([symbol, pnl]) => ({
    name: symbol,
    "Net P&L": pnl
  })).sort((a, b) => b["Net P&L"] - a["Net P&L"]);

  return (
    <div className="w-full flex-1 bg-albireo-blue px-4 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header Dashboard section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-custom/50 pb-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-profit uppercase tracking-widest">
              Performance metrics & analytics
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight">
              SaaS Trade Journal
            </h1>
            <p className="text-text-muted text-xs md:text-sm max-w-xl">
              Track win ratios, profit factor curves, and psychology slips. Logs are persisted locally inside your browser storage for safety.
            </p>
          </div>
          <button
            onClick={handleNewTrade}
            className="flex items-center gap-2 px-5 py-3 bg-cygnus-gold hover:bg-cygnus-gold/90 text-albireo-blue font-extrabold rounded-xl shadow-lg shadow-cygnus-gold/20 hover:shadow-cygnus-gold/35 transition-all self-start md:self-center"
          >
            <Plus className="w-4 h-4" /> Log Trade Record
          </button>
        </div>

        {/* SECTION 1: KEY PERFORMANCE METRICS BANNER */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Net PnL Card */}
          <div className="bg-surface-card border border-border-custom rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Net P&L</span>
            <span className={`text-xl md:text-2xl font-black mt-2 ${totalPnL >= 0 ? "text-profit" : "text-loss"}`}>
              {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString()}
            </span>
            <span className="text-[10px] text-text-muted/70 mt-1">{totalTrades} logged positions</span>
          </div>

          {/* Win Rate Card */}
          <div className="bg-surface-card border border-border-custom rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Win Rate</span>
            <span className="text-xl md:text-2xl font-black text-text-primary mt-2">
              {winRate}%
            </span>
            <span className="text-[10px] text-text-muted/70 mt-1">{winTrades} winning trades</span>
          </div>

          {/* Profit Factor Card */}
          <div className="bg-surface-card border border-border-custom rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Profit Factor</span>
            <span className="text-xl md:text-2xl font-black text-electric-cyan mt-2">
              {profitFactor}
            </span>
            <span className="text-[10px] text-text-muted/70 mt-1">Ratio of wins to losses</span>
          </div>

          {/* Avg Risk Reward Card */}
          <div className="bg-surface-card border border-border-custom rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Avg Risk-Reward</span>
            <span className="text-xl md:text-2xl font-black text-cygnus-gold mt-2">
              1:{avgRR}
            </span>
            <span className="text-[10px] text-text-muted/70 mt-1">Projected average target</span>
          </div>

          {/* Max Drawdown Card */}
          <div className="bg-surface-card border border-border-custom rounded-2xl p-5 flex flex-col justify-between col-span-2 lg:col-span-1">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Max Drawdown</span>
            <span className="text-xl md:text-2xl font-black text-loss mt-2">
              -${maxDD.toLocaleString()}
            </span>
            <span className="text-[10px] text-text-muted/70 mt-1">Peak-to-valley variance</span>
          </div>

        </div>

        {/* SECTION 2: PERFORMANCE CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cumulative Equity Curve (8 Cols) */}
          <div className="lg:col-span-8 bg-surface-card border border-border-custom rounded-2xl p-5 md:p-6 flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">Cumulative Net P&L Curve</h3>
              <span className="text-[11px] text-text-muted">Account growth trajectory over trade log history</span>
            </div>

            <div className="w-full h-72 mt-2">
              {mounted && trades.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={equityCurveData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94A3B8" fontSize={9} />
                    <YAxis
                      stroke="#94A3B8"
                      fontSize={9}
                      tickFormatter={(value) => `${value >= 0 ? "+" : ""}$${value}`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }}
                      labelStyle={{ color: "#F8FAFC" }}
                      itemStyle={{ color: "#06B6D4" }}
                      formatter={(value: any) => [`$${value.toLocaleString()}`, "PnL"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="Cumulative P&L"
                      stroke="#06B6D4"
                      strokeWidth={2.5}
                      dot={{ r: 4, strokeWidth: 1 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-albireo-blue/30 rounded-xl flex items-center justify-center text-text-muted text-xs">
                  {trades.length === 0 ? "Log trades to build your growth curve" : "Loading charts..."}
                </div>
              )}
            </div>
          </div>

          {/* Side Charts: Session Performance (4 Cols) */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            
            {/* Session Win Rates */}
            <div className="bg-surface-card border border-border-custom rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">Win Rate by Session</h3>
                <span className="text-[10px] text-text-muted block mt-0.5">Performance breakdown by timezone</span>
              </div>
              
              <div className="w-full h-40 mt-4">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sessionData}
                      margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} />
                      <YAxis stroke="#94A3B8" fontSize={9} unit="%" domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }}
                        formatter={(v: any) => [`${v}%`, "Win Rate"]}
                      />
                      <Bar dataKey="Win Rate %" fill="#F59E0B" radius={[3, 3, 0, 0]}>
                        {sessionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.name === "London" ? "#06B6D4" : entry.name === "New York" ? "#F59E0B" : "#10B981"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full bg-albireo-blue/30 rounded-xl flex items-center justify-center text-text-muted text-xs">
                    Loading...
                  </div>
                )}
              </div>
            </div>

            {/* Asset P&L Distribution */}
            <div className="bg-surface-card border border-border-custom rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">P&L by Currency Pair</h3>
                <span className="text-[10px] text-text-muted block mt-0.5">Asset profit distribution</span>
              </div>
              
              <div className="w-full h-40 mt-4">
                {mounted && assetData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={assetData}
                      layout="vertical"
                      margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis type="number" stroke="#94A3B8" fontSize={9} />
                      <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={9} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }}
                        formatter={(v: any) => [`$${v}`, "P&L"]}
                      />
                      <Bar dataKey="Net P&L" radius={[0, 3, 3, 0]}>
                        {assetData.map((entry: any, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry["Net P&L"] >= 0 ? "#10B981" : "#EF4444"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full bg-albireo-blue/30 rounded-xl flex items-center justify-center text-text-muted text-xs">
                    {trades.length === 0 ? "Log trades to analyze pairs" : "Loading..."}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: SORTABLE TRADE LOG TABLE */}
        <div className="bg-surface-card border border-border-custom rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border-custom/40 pb-3">
            <h3 className="font-bold text-base text-text-primary uppercase tracking-wider">Logged Positions</h3>
            <span className="text-xs text-text-muted">{trades.length} Positions total</span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border-custom/50 text-text-muted font-bold">
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Symbol</th>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2">Size</th>
                  <th className="py-3 px-2">Entry & Exit</th>
                  <th className="py-3 px-2">P&L ($)</th>
                  <th className="py-3 px-2">R:R</th>
                  <th className="py-3 px-2">Strategy</th>
                  <th className="py-3 px-2">Psychology</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom/30 text-text-primary/95">
                {trades.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-text-muted">
                      No trades logged yet. Click "+ Log Trade" to record one!
                    </td>
                  </tr>
                ) : (
                  trades.map((trade) => (
                    <tr key={trade.id} className="hover:bg-albireo-blue/35 transition-colors">
                      <td className="py-3 px-2 text-[10px] text-text-muted font-medium">
                        {new Date(trade.date).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="py-3 px-2 font-bold text-text-primary">{trade.symbol}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          trade.direction === "LONG"
                            ? "bg-profit/15 text-profit border border-profit/20"
                            : "bg-loss/15 text-loss border border-loss/20"
                        }`}>
                          {trade.direction}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-medium">{trade.size} Lots</td>
                      <td className="py-3 px-2 text-[11px] font-medium text-text-muted">
                        <span>{trade.entryPrice}</span> &rarr; <span>{trade.exitPrice}</span>
                      </td>
                      <td className={`py-3 px-2 font-black ${trade.pnl >= 0 ? "text-profit" : "text-loss"}`}>
                        {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 font-bold text-cygnus-gold">1:{trade.rr}</td>
                      <td className="py-3 px-2">
                        <span className="bg-surface-card border border-border-custom px-2 py-0.5 rounded text-[10px] font-semibold text-text-primary">
                          {trade.strategy}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          trade.psychology === "Disciplined"
                            ? "bg-profit/10 text-profit"
                            : trade.psychology === "Early Exit"
                            ? "bg-electric-cyan/10 text-electric-cyan"
                            : "bg-loss/10 text-loss"
                        }`}>
                          {trade.psychology}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditTrade(trade)}
                            className="p-1 hover:bg-surface-card border border-transparent hover:border-border-custom rounded text-text-muted hover:text-cygnus-gold transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTrade(trade.id)}
                            className="p-1 hover:bg-surface-card border border-transparent hover:border-border-custom rounded text-text-muted hover:text-loss transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: INTERACTIVE LOG MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surface-card border border-border-custom rounded-2xl p-6 max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-border-custom/50 pb-3">
                <h3 className="text-base font-extrabold uppercase text-text-primary tracking-wide">
                  {editingTrade ? "Edit Position Log" : "Log New Position"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-albireo-blue border border-border-custom rounded text-text-muted hover:text-text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTrade} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                
                {/* Symbol */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Symbol / Pair</label>
                  <select
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                  >
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="GBP/USD">GBP/USD</option>
                    <option value="Gold (XAU)">Gold (XAU)</option>
                    <option value="Crude Oil">Crude Oil</option>
                    <option value="Bitcoin">Bitcoin</option>
                    <option value="S&P 500">S&P 500</option>
                  </select>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Execution Date</label>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                    required
                  />
                </div>

                {/* Direction */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Direction</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDirection("LONG")}
                      className={`py-2 border text-xs font-bold rounded-lg ${
                        direction === "LONG"
                          ? "bg-profit/15 border-profit text-profit"
                          : "bg-albireo-blue/50 border-border-custom text-text-muted hover:text-text-primary"
                      }`}
                    >
                      LONG
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirection("SHORT")}
                      className={`py-2 border text-xs font-bold rounded-lg ${
                        direction === "SHORT"
                          ? "bg-loss/15 border-loss text-loss"
                          : "bg-albireo-blue/50 border-border-custom text-text-muted hover:text-text-primary"
                      }`}
                    >
                      SHORT
                    </button>
                  </div>
                </div>

                {/* Size */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Lot / Contract Size</label>
                  <input
                    type="number"
                    step="0.01"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                    required
                  />
                </div>

                {/* Entry Price */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Entry Price</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                    required
                  />
                </div>

                {/* Exit Price */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Exit Price</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={exitPrice}
                    onChange={(e) => setExitPrice(Number(e.target.value))}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                    required
                  />
                </div>

                {/* Stop Loss */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Stop Loss (SL)</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(Number(e.target.value))}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                    required
                  />
                </div>

                {/* Take Profit */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Take Profit (TP)</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(Number(e.target.value))}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                    required
                  />
                </div>

                {/* Realized PnL */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Realized PnL ($)</label>
                  <input
                    type="number"
                    value={pnl}
                    onChange={(e) => setPnl(Number(e.target.value))}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                    required
                  />
                </div>

                {/* Strategy Tag */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Strategy setup</label>
                  <select
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value)}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                  >
                    <option value="Order Block">Order Block</option>
                    <option value="Fair Value Gap">Fair Value Gap</option>
                    <option value="Breakout">Breakout</option>
                    <option value="Trend">Trend Following</option>
                  </select>
                </div>

                {/* Psychology Tag */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Psychological State</label>
                  <select
                    value={psychology}
                    onChange={(e) => setPsychology(e.target.value)}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                  >
                    <option value="Disciplined">Disciplined (System Exited)</option>
                    <option value="FOMO">FOMO (Fear of Missing Out)</option>
                    <option value="Revenge Trade">Revenge Trade</option>
                    <option value="Early Exit">Early Exit (Fear of loss)</option>
                  </select>
                </div>

                {/* Session */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Trading Session</label>
                  <select
                    value={session}
                    onChange={(e) => setSession(e.target.value as any)}
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold"
                  >
                    <option value="London">London (Open/Overlap)</option>
                    <option value="New York">New York (Open/News)</option>
                    <option value="Tokyo">Tokyo (Asian range)</option>
                    <option value="Sydney">Sydney (Asian open)</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Trade Notes & Reflections</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Price mitigated supply range, entered on lower-timeframe shift..."
                    className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cygnus-gold placeholder:text-text-muted/40"
                  />
                </div>

                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-cygnus-gold text-albireo-blue font-extrabold rounded-xl text-xs shadow-md shadow-cygnus-gold/10 hover:shadow-cygnus-gold/25 transition-all uppercase tracking-wider"
                  >
                    {editingTrade ? "Update Trade Record" : "Save Trade Record"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
